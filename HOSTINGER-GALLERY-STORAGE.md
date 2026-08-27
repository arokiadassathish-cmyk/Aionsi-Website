# Hostinger Gallery Storage

The gallery upload layer stores media outside GitHub so redeployments do not replace uploaded event photos/videos.

## Required environment variable

`GALLERY_STORAGE_ROOT`

Set this to a persistent writable directory available to the AionSi Node.js app on Hostinger. Example:

```text
/home/u123456789/domains/aionsi.com/private/gallery-media
```

Use the actual path shown by the Hostinger account; do not copy the example path verbatim.

## Validation endpoint

After setting the variable and redeploying, check:

`/api/gallery/storage-check`

Expected response:

```json
{"status":"ok","writable":true,"storageConfigured":true}
```

## Security

- Do not expose `GALLERY_STORAGE_ROOT` to the browser.
- Do not store credentials in GitHub.
- Keep upload endpoints behind the authenticated admin session.
- Keep large media files out of the repository.
