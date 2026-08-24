# Zoho Recruit Integration

## Goal

Send website career applications into Zoho Recruit while keeping Zoho credentials server-side.

## Existing implementation

The website already contains the career application endpoint at `api/careers/apply.js`, with:

- Zoho India OAuth endpoints
- refresh-token based authentication
- candidate creation
- resume attachment
- optional job-opening association
- `ZOHO_RECRUIT_JOB_OPENINGS_JSON` mapping
- 4 MB PDF/DOC/DOCX resume validation
- honeypot and consent validation

## Required environment variables

```env
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
ZOHO_RECRUIT_REFRESH_TOKEN=
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_RECRUIT_API_BASE_URL=https://recruit.zoho.in/recruit/v2
ZOHO_RECRUIT_JOB_OPENINGS_JSON={}
```

Do not commit secrets to GitHub.

## Job mapping

`ZOHO_RECRUIT_JOB_OPENINGS_JSON` should map website job slugs to Zoho Recruit Job Opening IDs, for example:

```json
{
  "physical-design-engineer": "<zoho-job-opening-id>",
  "design-verification-engineer": "<zoho-job-opening-id>"
}
```

## Validation checklist

1. Configure Zoho OAuth credentials in the hosting environment.
2. Confirm the API user has permission to create candidates and upload attachments.
3. Add current Zoho Job Opening IDs to the environment mapping.
4. Submit a test application from the Careers site.
5. Verify the candidate record in Zoho Recruit.
6. Verify the resume attachment.
7. Verify the correct Job Opening association.
8. Confirm failure handling does not expose credentials or internal API details to candidates.

## Security

The browser must call the website application endpoint only. Zoho OAuth credentials and access tokens must never be exposed client-side.
