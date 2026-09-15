# hr-management-backend
Serverless employee APIs for TekkzyWork. Region: `us-east-2`.

## Deploy
```bash
cd hr-management-backend
npm install
npx serverless deploy --region us-east-2 --stage dev
```

Live (us-east-2):
- API: `https://8btzzqxb5l.execute-api.us-east-2.amazonaws.com`
- Cognito user pool: `us-east-2_eHG9pgagv`
- App client: `530i5390e307oq937227gi4jje`

Optional env vars: `HR_ENCRYPTION_KEY`, `HR_BOOTSTRAP_SECRET`.

## First admin
```bash
curl -X POST "$API_URL/auth/bootstrap-admin" \
  -H "Content-Type: application/json" \
  -d '{"secret":"tekkzywork-beta-bootstrap","first_name":"Aarav","last_name":"Sharma","work_email":"aarav.sharma@tekkzy.com","password":"ChangeMe#2026"}'
```

Creating an employee (HR token required) also creates the Cognito user, assigns the role group, and emails a temporary password. The employee signs in, sets a new password, reviews `/me`, then `POST /me/verify`.
