# AionSi Agent Production Setup

The daily campaign agent is intentionally split into preparation and execution.

## Preparation

The weekday GitHub Actions workflow calls `/api/admin/campaigns/run` at 09:00 IST. The endpoint runs in `dry_run` mode and persists the result for the Campaign Control Panel.

Preparation performs:

1. Target-account selection and priority ordering.
2. Net-new/customer gate.
3. HubSpot company/contact context loading.
4. External research.
5. Research Agent and Match Agent.
6. Outreach QA.
7. `ready_for_approval` or `blocked` queue state.

## Required server environment

- `AIONSI_AGENT_RUNNER_KEY`
- `HUBSPOT_ACCESS_TOKEN`
- Live research-provider configuration
- `AIONSI_DAILY_TARGETS_JSON`
- Optional: `AIONSI_DAILY_MAX_TARGETS` (default 25)
- Optional: `AIONSI_CAMPAIGN_STORE_DIR` (default `./data/campaign-runs`)

`AIONSI_DAILY_TARGETS_JSON` must contain HubSpot company IDs, not company names as IDs. Example shape:

```json
[
  {"accountId":"123456789","name":"Example Semiconductor","slug":"example-semiconductor","domain":"example.com","contactIds":["987654321"],"priority":100}
]
```

## Required GitHub Actions secrets

- `AIONSI_AGENT_RUNNER_URL` — production URL ending in `/api/admin/campaigns/run`
- `AIONSI_AGENT_RUNNER_KEY` — same secret value as the server runner key

## Safety

The scheduler cannot approve a campaign and cannot call Apollo execution. Apollo enrollment/activation remains a separate explicit execution boundary.

Do not put HubSpot, Apollo, or research API credentials into repository files or target JSON.

## First production test

Use `workflow_dispatch` for the first run. Confirm the API returns a `DailyCampaignRunResult`, confirm the persisted result appears in the Campaign Control Panel, and review blockers/ready-for-approval items before enabling any live Apollo execution.
