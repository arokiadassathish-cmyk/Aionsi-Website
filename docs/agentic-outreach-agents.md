# AionSi Agentic Outreach System

## Architecture

```text
Apollo enrichment + HubSpot CRM + public research
                    |
                    v
             Research Agent
                    |
                    v
       Outreach Intelligence Agent
          |                    |
          v                    v
   Personalized email   Collaboration page
          |
          v
      Evaluation gate
          |
          v
     Human approval
          |
          v
        Apollo
          |
     +----+----+
     |         |
   Day 3     Day 7
 Follow-up  Follow-up
     |         |
     +----+----+
          |
          v
       HubSpot
```

## Agent 1 — Research Agent

**Purpose:** create an evidence-backed account and persona brief.

Inputs:
- HubSpot company/contact context
- Apollo enrichment
- Public web research
- Campaign context

Outputs:
- Account signals with source URL/date/confidence
- Persona objective and outreach angle
- Research notes
- Blockers when evidence is insufficient

Rules:
- Never invent an email address, phone number, program, customer relationship or technology signal.
- Every externally sourced claim must retain a source URL.
- Low-confidence signals cannot be the sole basis for personalization.

## Agent 2 — Outreach Intelligence Agent

**Purpose:** produce the first-touch package.

Outputs:
- Subject
- Personalized email
- 1–3 capability matches
- Collaboration landing-page payload
- Deterministic pre-send evaluation

Rules:
- Engineering-led and concise.
- One clear CTA.
- No unsupported customer/partner/program claims.
- Prefer a defined engineering problem or milestone over a generic capability catalogue.
- Landing page and email must tell the same story.
- Human approval is mandatory before dispatch.

## Agent 3 — Follow-up Agent

The follow-up agent has two scheduled steps:

### Day 3

After 3 days, check the latest engagement state.

If there is no reply or stop condition, generate a short follow-up that adds context rather than repeating the first email.

### Day 7

Seven days after the first outreach (or according to the configured sequence cadence), check again.

If there is still no reply or stop condition, generate a final concise follow-up and then end the sequence.

### Stop conditions

Do not send a follow-up when any of these are true:

- Prospect replied
- Positive reply
- Negative reply
- Meeting booked
- Unsubscribe / do-not-contact request
- Bounce / invalid mailbox
- Manual stop

An out-of-office response can remain eligible for a later follow-up according to the configured return date.

## Sending and CRM ownership

- **Apollo:** outbound sending, sequence cadence and mailbox execution.
- **HubSpot:** CRM system of record, company/contact ownership and activity history.
- **AionSi website:** personalized collaboration landing pages.
- **Agent layer:** research, personalization, evaluation and follow-up decisioning.

## Approval boundaries

The code in this stage does not send email, enroll contacts or activate Apollo sequences. Those actions remain explicit operational steps requiring review and confirmation.

## Reusability

The system is account-agnostic. Geography, meeting mode, campaign objective, evidence and landing-page slug are parameters. GreatAsic is the first end-to-end test account, not a hard-coded campaign model.
