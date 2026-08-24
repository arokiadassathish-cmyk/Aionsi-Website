# Hostinger Production Runtime

This repository is deployed to Hostinger as an Astro server application.

## Production runtime

- Framework: Astro
- Output: server
- Adapter: `@astrojs/node` standalone
- Node.js: 24.x
- Build: `npm run build`
- Start: `npm run start`

## Verification

After a Hostinger deployment completes, verify:

`/api/health`

Expected HTTP 200 JSON:

```json
{"status":"ok","service":"aionsi-website","runtime":"astro-node"}
```

Then verify `/careers/apply` and a test candidate submission before changing production DNS.

## Zoho Recruit

Keep Zoho OAuth credentials only in Hostinger environment variables. Never commit secrets.
