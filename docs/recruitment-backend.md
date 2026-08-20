# AionSi Recruitment Backend

The Careers application flow is separated from the engineering-discovery contact flow.

## Flow

1. Candidate selects an approved role or General / Future Opportunity.
2. Candidate submits profile details, consent and CV at `/careers/apply`.
3. `POST /api/careers/apply` validates the request.
4. The backend creates a Candidate in Zoho Recruit.
5. The CV is uploaded to the candidate as a Resume attachment.
6. If the role has a configured Zoho Job Opening ID, the candidate is associated with that opening.
7. The website returns a success message without exposing Zoho credentials to the browser.

## Required deployment variables

```text
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_RECRUIT_API_BASE_URL=https://recruit.zoho.in/recruit/v2
ZOHO_CLIENT_ID=...
ZOHO_CLIENT_SECRET=...
ZOHO_RECRUIT_REFRESH_TOKEN=...
ZOHO_RECRUIT_JOB_OPENINGS_JSON={}
```

The job-opening mapping uses the public role slug as its key, for example:

```json
{
  "soc-dv-manager": "<Zoho Job Opening ID>",
  "emulation-engineer": "<Zoho Job Opening ID>",
  "physical-verification-engineer": "<Zoho Job Opening ID>",
  "dv-engineer": "<Zoho Job Opening ID>",
  "physical-design-iii": "<Zoho Job Opening ID>",
  "dft-engineer": "<Zoho Job Opening ID>"
}
```

Do not commit real OAuth credentials or tokens.

## Zoho permissions

The OAuth client needs permission to create/update candidate records, upload candidate attachments and associate candidates with job openings. Use the narrowest scopes appropriate to the Zoho Recruit account.

## Current limitation

The public site contains the approved job descriptions and public role slugs. The actual Zoho Job Opening IDs are account-specific and therefore are intentionally not hard-coded. Once management/HR provides the corresponding Zoho Job Opening IDs, add them only to the deployment environment variable `ZOHO_RECRUIT_JOB_OPENINGS_JSON`.

The application endpoint uses a 4 MB CV limit so it remains compatible with common serverless request limits. If the final hosting platform supports larger request bodies, the limit can be increased safely up to the Zoho Recruit attachment limit.
