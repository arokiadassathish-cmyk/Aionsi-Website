# AionSi Agentic Outbound Build Status

Updated: 2026-09-16

## Current architecture

`Target Account → Existing Customer Check → Research Agent → Match Agent → Outreach Intelligence Agent → Human Approval → Apollo Execution`

Follow-up execution remains downstream of Apollo with stop conditions for replies, meetings, negative responses, unsubscribes and bounces.

## Component status

| Component | Status | Notes |
|---|---|---|
| Target-account gate | Implemented | Net-new eligibility is checked before external research. |
| HubSpot CRM adapter | Implemented | CRM is the system of record; no automatic mutation in research. |
| Research Agent | Implemented | Typed brief, source provenance and blocker handling. |
| Live research provider contract | Implemented | Provider boundary with bounded, validated sources. |
| Google Web Search adapter | Implemented | Uses Google's documented Web Search Service REST endpoint. |
| Production Research runtime | Implemented | HubSpot context → live research → Research Agent signals. |
| Match Agent | Implemented | Deterministic capability matching, capped at three matches. |
| Outreach Intelligence Agent | Implemented | Persona, capability match, email and landing-page evaluation gate. |
| Follow-up Agent | Implemented | Day-3 and Day-7 follow-up generation with stop conditions. |
| Campaign orchestrator | Implemented | Lifecycle/state-machine and explicit human approval boundary. |
| Apollo execution adapter | Pending | Next integration for contact enrollment and sequence activation. |
| End-to-end live HubSpot + Apollo run | Pending | Requires execution adapters and production credentials. |
| CI automated agent QA | Pending | Need an automated gate for agent invariants and runtime checks. |

## Safety boundary

The agent stack currently does not silently enroll contacts, activate sequences or send email. Research can fail closed when credentials/evidence are unavailable, and outbound execution stays behind an explicit approval boundary.

## Immediate next build stage

1. Build the Apollo execution adapter with explicit `dry-run` and `live` modes.
2. Connect Campaign Orchestrator to HubSpot + Apollo while preserving the approval gate.
3. Add an automated CI QA workflow for Research → Match → Outreach evaluation invariants.
4. Run one controlled end-to-end pilot on an approved account before broader campaign use.
