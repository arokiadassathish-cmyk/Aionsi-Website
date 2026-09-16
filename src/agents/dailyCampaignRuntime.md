# Daily Campaign Runtime

`runDailyCampaign` is the operational control loop for the AionSi outbound agents.

## Lifecycle

1. Sort and cap the day's target accounts.
2. Apply the net-new customer gate before external research.
3. Load HubSpot campaign context.
4. Collect external research through the injected research provider.
5. Run Research Agent and Match Agent.
6. Return qualified accounts as `ready_for_approval`.
7. Keep blocked accounts with explicit blockers.
8. Only an explicit caller-supplied execution function can move an approved item to `executed` in live mode.

## Safety boundary

Dry-run is the default. The runtime does not approve campaigns, enroll Apollo contacts, activate sequences, or send email implicitly. Production scheduling should invoke the runtime with real HubSpot/research/Apollo adapters and keep the approval boundary outside the daily research pass.

## Intended daily operation

A scheduler should call the runtime once per business day. The result should be persisted to the Campaign Control Panel approval queue. The operator approves individual packages; only approved packages are passed to the Apollo execution adapter. Apollo then owns scheduled Day-3/Day-7 sequence timing while response/stop-condition handling remains part of the campaign control plane.
