# AionSi Hostinger Production Deployment

## Production architecture

```text
GitHub main
    ↓
Hostinger Node.js Web App
    ↓
aionsi.com
```

Vercel is not the production host for AionSi. Any Vercel project may be retained only as a preview/QA environment if desired.

## Application runtime

- Framework: Astro
- Output: `server`
- Production adapter: `@astrojs/node`
- Node.js: use a Hostinger-supported LTS/current Node version compatible with the repository
- Build command: `npm run build`
- Start command: `npm run start`

## Repository deployment

1. Connect the Hostinger Node.js Web App to the GitHub repository `arokiadassathish-cmyk/Aionsi-Website`.
2. Select branch `main` for production.
3. Configure the Node.js application to run the built Astro server.
4. Add production environment variables in Hostinger's environment configuration. Do not upload or commit `.env`.
5. Deploy first to the Hostinger temporary application URL.
6. Run smoke tests before connecting `aionsi.com`.

## Required production environment variables

Only add credentials for integrations that are actually enabled in production. Examples include:

- `HUBSPOT_ACCESS_TOKEN` or the final approved HubSpot authentication variables
- `ZOHO_ACCOUNTS_URL`
- `ZOHO_RECRUIT_API_BASE_URL`
- `ZOHO_CLIENT_ID`
- `ZOHO_CLIENT_SECRET`
- `ZOHO_RECRUIT_REFRESH_TOKEN`

Never commit real secrets to GitHub.

## Production smoke test

Verify:

- `/`
- `/customers/`
- `/leadership/`
- `/aionsi-ip/`
- `/evidence/`
- `/insights/`
- `/experience/`
- `/capabilities/`
- `/technology/`
- `/solutions/`
- `/solutions/extended-engineering/`
- `/solutions/dedicated-engineering/`
- `/solutions/project-engineering/`
- `/solutions/odc/`
- `/contact/`
- direct browser refresh on deep routes
- desktop and mobile navigation
- static assets and customer/leadership images
- careers submission only after Zoho credentials are validated
- engineering requirement submission only after HubSpot authentication is validated

## Domain cutover

Only after the temporary Hostinger URL passes smoke testing:

1. Connect `aionsi.com`.
2. Connect `www.aionsi.com`.
3. Use Hostinger's exact DNS records; do not guess values.
4. Enable HTTPS.
5. Confirm the canonical host and alternate-host redirect.
6. Re-run smoke tests on the public domain.

## Rollback

Keep the previous working deployment available until the new Hostinger deployment and domain cutover are verified.
