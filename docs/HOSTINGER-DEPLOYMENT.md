# Hostinger production deployment

## Runtime

AionSi is an Astro server application using the Node adapter in standalone mode. The Hostinger Node.js app should run the production server from `dist/server/entry.mjs` via `npm run start`.

## Expected configuration

- Framework: Astro
- Node.js: 24.x
- Build command: `npm run build`
- Start command: `npm run start`
- Repository: `Aionsi-Website`
- Branch: `main`

## Zoho Recruit environment

Keep these values in Hostinger environment variables; never commit secrets:

- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_RECRUIT_REFRESH_TOKEN`
- `ZOHO_ACCOUNTS_URL=https://accounts.zoho.in`
- `ZOHO_RECRUIT_API_BASE_URL=https://recruit.zoho.in/recruit/v2`
- `ZOHO_RECRUIT_JOB_OPENINGS_JSON`

## Validation order

1. Confirm the Hostinger Node app is Running.
2. Open `/api/health` and verify HTTP 200 with `status: ok`.
3. Open `/careers/apply` and verify the application UI loads.
4. Submit a test candidate with a PDF resume.
5. Verify candidate creation and resume attachment in Zoho Recruit.
6. Verify Job Opening association when the submitted `jobSlug` exists in `ZOHO_RECRUIT_JOB_OPENINGS_JSON`.

Do not connect or switch the production `aionsi.com` DNS until `/api/health` works on the Hostinger application URL.
