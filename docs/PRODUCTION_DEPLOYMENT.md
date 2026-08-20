# AionSi Production Deployment

## Launch target
Friday, 21 August 2026.

## Current application configuration
Astro is configured with the production site URL `https://aionsi.com` and builds to `dist/`.

## Recommended production host
Vercel is the intended production host for this launch candidate.

## Vercel project setup
1. Create or select a Vercel project for the AionSi website.
2. Import the GitHub repository `arokiadassathish-cmyk/Aionsi-Website`.
3. Set the production branch to `main`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Framework preset: Astro (or equivalent static-site build configuration).
7. Connect the production domain `aionsi.com` and `www.aionsi.com`.
8. Configure the preferred canonical host and redirect the alternate host.
9. Enable HTTPS through the hosting provider.
10. Trigger a production deployment from `main` after the launch QA gate passes.

## Launch QA gate
Before DNS cutover, run:

```bash
npm install
npm run check
npm run build
npm run preview
```

Verify:
- `/`
- `/capabilities/`
- all six core capability detail routes
- `/technology/`
- all six source-backed technology evidence routes
- `/evidence/`
- representative evidence detail routes
- `/solutions/odc/`
- `/solutions/dedicated-engineering/`
- `/contact/`
- navigation, footer and primary CTAs
- deep-link refreshes on detail pages
- mobile navigation and responsive layout

## DNS
The production host must provide the DNS records required by Vercel for `aionsi.com` and `www.aionsi.com`. These values are provider-specific and must be copied from the Vercel project rather than guessed.

## Rollback
Keep the previous production deployment available in the hosting provider so the domain can be rolled back immediately if a launch defect is found.
