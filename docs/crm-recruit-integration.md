# CRM / Recruitment integration

## Engineering requirements → HubSpot
The Engineering Discovery form is designed to submit structured opportunity information to `/api/engineering-requirement`, which creates/updates a HubSpot contact using a server-side private-app token. The token is never exposed to the browser.

Required environment variable:
- `HUBSPOT_PRIVATE_APP_TOKEN`

The endpoint sends first name, last name, business email, company, phone, and structured engineering requirement context. Before production, the HubSpot portal should have the desired custom contact properties and lifecycle/lead routing configured.

## Careers → Zoho Recruit
The existing careers API already submits candidate data and resumes to Zoho Recruit through server-side OAuth credentials, with optional job-opening association. The browser does not receive Zoho credentials.

Required environment variables:
- `ZOHO_RECRUIT_REFRESH_TOKEN`
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- optional `ZOHO_ACCOUNTS_URL`
- optional `ZOHO_RECRUIT_API_BASE_URL`
- optional `ZOHO_RECRUIT_JOB_OPENINGS_JSON`

Production validation should include one controlled test engineering enquiry and one controlled test candidate application, followed by verification in HubSpot and Zoho Recruit before public launch.
