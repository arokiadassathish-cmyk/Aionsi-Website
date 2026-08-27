# AionSi Gallery — Hostinger Setup

The gallery manager uses persistent filesystem storage so event photos and videos survive application redeployments.

## Required Hostinger environment variables

Set these on the `aionsi.com` Node.js application:

- `GALLERY_ADMIN_PASSWORD` — strong admin password
- `GALLERY_ADMIN_SESSION_TOKEN` — long random session token
- `GALLERY_STORAGE_ROOT` — absolute writable persistent path allocated to the AionSi Node.js app on Hostinger

Do not commit real values to GitHub.

## Validation

After redeploying, sign in at `/admin/gallery/login` and verify the authenticated manager is reachable.

Then call `/api/gallery/storage-check` while authenticated. Expected response:

```json
{
  "status": "ok",
  "writable": true,
  "storageConfigured": true
}
```

The storage-check endpoint must report the configured state without exposing the actual filesystem path.

## Upload activation gate

Do not enable photo/video upload endpoints until the storage check returns writable=true and storageConfigured=true on Hostinger. This prevents media from being written to an ephemeral application path.
