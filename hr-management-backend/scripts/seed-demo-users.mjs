import { randomUUID } from "node:crypto"
import {
  AdminAddUserToGroupCommand,
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
  AdminUpdateUserAttributesCommand,
  CognitoIdentityProviderClient,
  UsernameExistsException,
} from "@aws-sdk/client-cognito-identity-provider"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb"

const REGION = "us-east-2"
const USER_POOL_ID = "us-east-2_eHG9pgagv"
const PASSWORD = "Password@123"

const TABLES = {
  employees: "beta_hr_management_employees",
  personal: "beta_hr_management_employee_personal",
  access: "beta_hr_management_employee_access",
}

const users = [
  {
    email: "admin@tekkzy.com",
    first_name: "Aarav",
    last_name: "Sharma",
    role_id: "SUPER_ADMIN",
    designation_id: "Super Admin",
    department_id: "Human Resources",
    employee_code: "TW-ADMIN-0001",
  },
  {
    email: "hr@tekkzy.com",
    first_name: "Ananya",
    last_name: "Iyer",
    role_id: "HR_LEAD",
    designation_id: "HR Lead",
    department_id: "Human Resources",
    employee_code: "TW-HR-0001",
  },
  {
    email: "finance@tekkzy.com",
    first_name: "Kabir",
    last_name: "Mehta",
    role_id: "FINANCE",
    designation_id: "Finance Officer",
    department_id: "Finance",
    employee_code: "TW-FIN-0001",
  },
  {
    email: "manager@tekkzy.com",
    first_name: "Vikram",
    last_name: "Malhotra",
    role_id: "MANAGER",
    designation_id: "Engineering Manager",
    department_id: "Engineering",
    employee_code: "TW-MGR-0001",
  },
  {
    email: "employee@tekkzy.com",
    first_name: "Rohan",
    last_name: "Varma",
    role_id: "EMPLOYEE",
    designation_id: "Staff Employee",
    department_id: "Engineering",
    employee_code: "TW-EMP-0001",
  },
]

const cognito = new CognitoIdentityProviderClient({ region: REGION })
const ddb = DynamoDBDocumentClient.from(new DynamoDBClient({ region: REGION }), {
  marshallOptions: { removeUndefinedValues: true },
})

async function upsertCognitoUser(user, employeeId) {
  const attributes = [
    { Name: "email", Value: user.email },
    { Name: "email_verified", Value: "true" },
    { Name: "given_name", Value: user.first_name },
    { Name: "family_name", Value: user.last_name },
    { Name: "custom:employee_id", Value: employeeId },
    { Name: "custom:role", Value: user.role_id },
  ]

  try {
    await cognito.send(
      new AdminCreateUserCommand({
        UserPoolId: USER_POOL_ID,
        Username: user.email,
        TemporaryPassword: PASSWORD,
        MessageAction: "SUPPRESS",
        UserAttributes: attributes,
      })
    )
    console.log(`created cognito user ${user.email}`)
  } catch (err) {
    if (err instanceof UsernameExistsException || err.name === "UsernameExistsException") {
      await cognito.send(
        new AdminUpdateUserAttributesCommand({
          UserPoolId: USER_POOL_ID,
          Username: user.email,
          UserAttributes: attributes.filter((attr) => attr.Name !== "custom:employee_id"),
        })
      )
      console.log(`updated existing cognito user ${user.email}`)
    } else {
      throw err
    }
  }

  await cognito.send(
    new AdminSetUserPasswordCommand({
      UserPoolId: USER_POOL_ID,
      Username: user.email,
      Password: PASSWORD,
      Permanent: true,
    })
  )

  await cognito.send(
    new AdminAddUserToGroupCommand({
      UserPoolId: USER_POOL_ID,
      Username: user.email,
      GroupName: user.role_id,
    })
  )
}

async function putRecords(user, employeeId) {
  const now = new Date().toISOString()
  await ddb.send(
    new PutCommand({
      TableName: TABLES.employees,
      Item: {
        _id: employeeId,
        employee_code: user.employee_code,
        first_name: user.first_name,
        last_name: user.last_name,
        work_email: user.email,
        personal_email: null,
        phone: null,
        date_of_joining: now.slice(0, 10),
        employment_type: "full_time",
        department_id: user.department_id,
        designation_id: user.designation_id,
        manager_id: null,
        work_location_id: "Bengaluru, India",
        status: "active",
        cognito_username: user.email,
        profile_verification_status: "verified",
        profile_verified_at: now,
        invitation_sent_at: now,
        created_at: now,
        updated_at: now,
      },
    })
  )
  await ddb.send(
    new PutCommand({
      TableName: TABLES.personal,
      Item: {
        employee_id: employeeId,
        date_of_birth: null,
        gender: null,
        addresses: [],
        other_personal_details: {},
        updated_at: now,
      },
    })
  )
  await ddb.send(
    new PutCommand({
      TableName: TABLES.access,
      Item: {
        employee_id: employeeId,
        role_id: user.role_id,
        permissions: user.role_id === "SUPER_ADMIN" ? ["*"] : [],
        login_enabled: true,
        created_at: now,
      },
    })
  )
}

for (const user of users) {
  const employeeId = randomUUID()
  await upsertCognitoUser(user, employeeId)
  await putRecords(user, employeeId)
  console.log(`ready ${user.email} (${user.role_id})`)
}

console.log("\nDefault password for all accounts: Password@123")
