import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminDisableUserCommand,
  AdminEnableUserCommand,
  AdminGetUserCommand,
  AdminRemoveUserFromGroupCommand,
  AdminResetUserPasswordCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  ChangePasswordCommand,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ForgotPasswordCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from "@aws-sdk/client-cognito-identity-provider"
import { REGION, USER_POOL_CLIENT_ID, USER_POOL_ID } from "../config.js"
import { generateTempPassword } from "./ids.js"

const cognito = new CognitoIdentityProviderClient({ region: REGION })

function attr(name, value) {
  if (value === undefined || value === null || value === "") return null
  return { Name: name, Value: String(value) }
}

function e164(phone) {
  if (!phone) return null
  const compact = String(phone).replace(/[^\d+]/g, "")
  if (/^\+[1-9]\d{6,14}$/.test(compact)) return compact
  return null
}

export async function inviteEmployee({
  email,
  firstName,
  lastName,
  phone,
  employeeId,
  roleId,
  suppressEmail = false,
}) {
  const temporaryPassword = generateTempPassword()
  const attributes = [
    attr("email", email),
    attr("email_verified", "true"),
    attr("given_name", firstName),
    attr("family_name", lastName),
    attr("phone_number", e164(phone)),
    attr("custom:employee_id", employeeId),
    attr("custom:role", roleId),
  ].filter(Boolean)

  await cognito.send(
    new AdminCreateUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      TemporaryPassword: temporaryPassword,
      DesiredDeliveryMediums: suppressEmail ? undefined : ["EMAIL"],
      MessageAction: suppressEmail ? "SUPPRESS" : undefined,
      UserAttributes: attributes,
    })
  )

  await cognito.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      GroupName: roleId,
    })
  )

  return { username: email, temporaryPasswordSet: true }
}

export async function resendInvite(email) {
  await cognito.send(
    new AdminResetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
    })
  )
}

export async function setPermanentPassword(email, password) {
  await cognito.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      Password: password,
      Permanent: true,
    })
  )
}

export async function disableLogin(email) {
  await cognito.send(
    new AdminDisableUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
    })
  )
}

export async function enableLogin(email) {
  await cognito.send(
    new AdminEnableUserCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
    })
  )
}

export async function getCognitoUser(email) {
  try {
    const result = await cognito.send(
      new AdminGetUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
      })
    )
    return result
  } catch (err) {
    if (err.name === "UserNotFoundException") return null
    throw err
  }
}

export async function updateCognitoProfile(email, { firstName, lastName, phone, roleId, employeeId }) {
  const attributes = [
    attr("given_name", firstName),
    attr("family_name", lastName),
    attr("phone_number", phone),
    attr("custom:role", roleId),
    attr("custom:employee_id", employeeId),
  ].filter(Boolean)
  if (!attributes.length) return
  await cognito.send(
    new AdminUpdateUserAttributesCommand({
      UserPoolId: USER_POOL_ID,
      Username: email,
      UserAttributes: attributes,
    })
  )
}

export async function replaceCognitoGroup(email, previousRole, nextRole) {
  if (previousRole && previousRole !== nextRole) {
    try {
      await cognito.send(
        new AdminRemoveUserFromGroupCommand({
          UserPoolId: USER_POOL_ID,
          Username: email,
          GroupName: previousRole,
        })
      )
    } catch {
      // Group membership may already be absent.
    }
  }
  if (nextRole) {
    await cognito.send(
      new AdminAddUserToGroupCommand({
        UserPoolId: USER_POOL_ID,
        Username: email,
        GroupName: nextRole,
      })
    )
  }
}

export async function login(email, password) {
  return cognito.send(
    new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    })
  )
}

export async function respondNewPassword({ email, newPassword, session }) {
  return cognito.send(
    new RespondToAuthChallengeCommand({
      ClientId: USER_POOL_CLIENT_ID,
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      Session: session,
      ChallengeResponses: {
        USERNAME: email,
        NEW_PASSWORD: newPassword,
      },
    })
  )
}

export async function refresh(refreshToken) {
  return cognito.send(
    new InitiateAuthCommand({
      AuthFlow: "REFRESH_TOKEN_AUTH",
      ClientId: USER_POOL_CLIENT_ID,
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    })
  )
}

export async function forgotPassword(email) {
  return cognito.send(
    new ForgotPasswordCommand({
      ClientId: USER_POOL_CLIENT_ID,
      Username: email,
    })
  )
}

export async function confirmForgotPassword({ email, code, password }) {
  return cognito.send(
    new ConfirmForgotPasswordCommand({
      ClientId: USER_POOL_CLIENT_ID,
      Username: email,
      ConfirmationCode: code,
      Password: password,
    })
  )
}

export async function changePassword({ accessToken, previousPassword, proposedPassword }) {
  return cognito.send(
    new ChangePasswordCommand({
      AccessToken: accessToken,
      PreviousPassword: previousPassword,
      ProposedPassword: proposedPassword,
    })
  )
}

export function authResult(result) {
  if (result.ChallengeName) {
    return {
      challengeName: result.ChallengeName,
      session: result.Session,
      challengeParameters: result.ChallengeParameters || {},
    }
  }
  const auth = result.AuthenticationResult || {}
  return {
    challengeName: null,
    tokens: {
      idToken: auth.IdToken,
      accessToken: auth.AccessToken,
      refreshToken: auth.RefreshToken,
      expiresIn: auth.ExpiresIn,
      tokenType: auth.TokenType || "Bearer",
    },
  }
}
