# AionSi Hostinger Node.js Deployment

This site is an Astro server application and should be deployed as a Node.js Web App on Hostinger.

## Recommended Hostinger settings

- Source: GitHub repository `arokiadassathish-cmyk/Aionsi-Website`
- Branch: `main`
- Framework: Astro
- Node.js: 24.x (or the current supported Node.js 24 runtime)
- Package manager: npm
- Build command: `npm run build`
- Start command: `npm run start`
- Application entry: `scripts/start-hostinger.mjs` via the `start` script
- Production environment: `NODE_ENV=production`

## Required Zoho Recruit environment variables

Configure these in Hostinger Environment Variables. Never commit the values to GitHub.

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_RECRUIT_REFRESH_TOKEN`
- `ZOHO_ACCOUNTS_URL=https://accounts.zoho.in`
- `ZOHO_RECRUIT_API_BASE_URL=https://recruit.zoho.in/recruit/v2`
- `ZOHO_RECRUIT_JOB_OPENINGS_JSON`

The Job Openings JSON should map the website role slugs to the Zoho Recruit Job Opening IDs, for example:

```json
{"physical-design-engineer":"<JOB_ID>","design-verification-engineer":"<JOB_ID>"}
```

## Verification sequence

1. Deploy `main` from Hostinger Node.js Web App.
2. Confirm the public site loads.
3. Open `/api/health` and confirm a JSON response with `status: "ok"`.
4. Submit a test candidate through the Careers application.
5. Confirm the candidate appears in Zoho Recruit.
6. Confirm the resume is attached.
7. Confirm the candidate is associated with the expected Job Opening.

If environment variables are changed after deployment, redeploy the application so the new values take effect.
