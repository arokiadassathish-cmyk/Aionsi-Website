# AionSi outbound dry-run readiness

## Safety boundary

The daily campaign runtime defaults to `dry_run`. A dry run does not receive an Apollo execution callback, does not enroll contacts, does not activate an Apollo sequence, and does not send email.

## 25-account scenario

Use `runDailyDryRunScenario` from `src/agents/dryRunScenario.ts` with the configured AionSi target list. The helper caps processing at 25 targets unless an explicit lower cap is supplied.

## Required runtime configuration

Before running the production dry-run endpoint, confirm:

- `AIONSI_AGENT_RUNNER_KEY` is configured for the protected runner API.
- `HUBSPOT_ACCESS_TOKEN` is configured and can read the target companies/contacts.
- `AIONSI_DAILY_TARGETS_JSON` is valid JSON and every configured `slug` exists in `src/data/targetAccounts.ts`.
- `AIONSI_RESEARCH_SEARCH_ENDPOINT` and its API key are configured for the live research provider.
- The runner remains in `dry_run` mode.

## Review gate

The expected output is a queue of up to 25 campaign items with research evidence, capability match, blockers, and `ready_for_approval` status where eligible. No item should be considered approved or executed merely because it is eligible.

Live Apollo execution remains separately gated by explicit human approval and production-readiness checks.
