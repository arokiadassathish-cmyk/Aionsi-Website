# AionSi 25-Account Dry-Run — Production Checklist

## Purpose

This checklist is the final operational gate before the first production dry run. The run must remain side-effect free: it may read HubSpot, collect external research, build Research and Match artifacts, and save the run result, but it must not enroll or activate Apollo sequences.

## Application safeguards

- Daily campaign runtime defaults to `dry_run`.
- The dry-run scenario helper forces `dry_run` and does not accept an Apollo execution callback.
- Live execution remains separately gated by explicit human approval, execution enablement, configured Apollo, required environment variables, and a blocker-free item.
- Research-to-Match now carries the HubSpot `accountId` separately from the company name and passes actual contact names/titles to external research.
- Target dashboard is read-only and does not expose HubSpot IDs or secrets.

## Hostinger deployment gate

Confirm in Hostinger that the managed Node.js Web App is connected to:

- Repository: `arokiadassathish-cmyk/Aionsi-Website`
- Branch: `main`
- Automatic redeploy on push: enabled
- Node.js runtime: compatible with the repository build (Node 24 is used by the GitHub build workflow)

Then verify the production target dashboard responds successfully:

`https://aionsi.com/admin/campaigns/targets`

The page should show **Target configuration**.

## Required runtime configuration

Set these values in Hostinger's application environment. Never commit them to GitHub.

- `AIONSI_AGENT_RUNNER_KEY`
- `HUBSPOT_ACCESS_TOKEN`
- `AIONSI_DAILY_TARGETS_JSON`
- A live research provider, using either:
  - `AIONSI_RESEARCH_SEARCH_ENDPOINT` + `AIONSI_RESEARCH_SEARCH_API_KEY`, or
  - `AIONSI_GOOGLE_WSS_API_KEY` + `AIONSI_GOOGLE_WSS_CLIENT_ID` + `AIONSI_GOOGLE_WSS_USER_IP`
- Optional: `AIONSI_DAILY_MAX_TARGETS=25`

The scheduled runner must remain dry-run only until the dry-run output has been reviewed. Do not provide Apollo execution credentials to the dry-run endpoint or add an execution callback to the dry-run scenario helper.

## Target-universe gate

Open the target configuration dashboard and confirm:

1. Configured targets are the intended campaign universe.
2. Every configured slug exists in the public target-account registry.
3. Contact counts are non-zero for targets expected to enter research.
4. Priorities produce the intended top 25 selection.
5. No secrets, HubSpot IDs, or Apollo credentials are rendered.

## Execute the dry run

Use the protected daily runner endpoint with the `x-aionsi-agent-key` header. Keep the request in its existing dry-run path.

Expected result:

- `mode = dry_run`
- `targets <= 25`
- each target is either `ready_for_approval` or `blocked`
- `executed = 0`
- no Apollo enrollment or sequence activation
- no HubSpot mutations

## Review gate

For each ready item, inspect:

- research evidence and source URLs
- company identity
- selected contacts and titles
- capability matches
- match blockers
- target-page slug
- personalization inputs before any future email generation

Block any item where evidence is weak, contact identity is wrong, the account is not net-new, or the proposed AionSi capability match is unsupported.

## After the first run

Do not move directly to bulk live execution. First review the 25-account artifact set, fix deterministic or research-quality issues, repeat the dry run, and only then use the existing human approval and Apollo execution gates for a controlled live test.
