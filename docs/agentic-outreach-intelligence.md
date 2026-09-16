# Agentic Outreach Intelligence

## Purpose

Turn an account + mapped contact into a reviewable outreach package without sending anything automatically.

The system should produce four artifacts:

1. Account brief — what the company does, relevant engineering signals, and source confidence.
2. Persona brief — role, likely engineering responsibility, and the outreach angle.
3. Capability match — only AionSi capabilities supported by evidence from the account and AionSi source library.
4. Outreach package — concise email + prospect-specific collaboration page data.

## Pipeline

`CRM/Apollo input → Research → Evidence normalization → Persona mapping → Capability matching → Message generation → Landing-page generation → Evaluation → Human approval → Send`

### 1. Input

Required:
- company name
- company domain
- contact name
- contact title
- contact LinkedIn URL when available

Optional:
- geography
- account notes
- recent company signal
- Apollo enrichment
- existing CRM activity

Never invent missing contact information. Unknown fields remain unknown.

### 2. Research agent

Collect only information useful to an engineering outreach decision:
- products / silicon focus
- target markets
- engineering locations
- current technology or program signals
- funding / hiring / expansion signals when relevant
- recent public announcements

Every research claim must retain a source URL and date where available.

### 3. Evidence normalization

Convert research into structured signals:

```ts
interface EvidenceSignal {
  claim: string;
  sourceUrl: string;
  sourceDate?: string;
  confidence: 'high' | 'medium' | 'low';
  relevance: 'direct' | 'supporting' | 'weak';
}
```

Rules:
- Direct company or executive sources receive the strongest preference.
- Do not turn an inference into a stated fact.
- Low-confidence signals may influence research prioritization but should not appear as factual claims in the email.

### 4. Persona mapping

Map the contact to one primary outreach objective:

- CTO / Founder → engineering scale, architecture-to-silicon ownership, strategic capacity
- VP Engineering / Engineering Head → delivery bandwidth, multi-workstream execution, team extension
- Director Engineering → defined work packages, RTL/DV/SoC execution, milestone support
- Verification Lead → UVM, regression, coverage, protocol/subsystem verification
- Physical Design Lead → implementation, timing, physical-design capacity
- DFT Lead → DFT execution and sign-off support

The model may select a different angle when strong account evidence supports it.

### 5. Capability matching

Match account signals to the smallest useful AionSi capability set.

Each match must contain:

```ts
interface CapabilityMatch {
  capability: string;
  accountSignal: string;
  reason: string;
  evidence: string[];
  confidence: 'high' | 'medium' | 'low';
}
```

Do not list the full AionSi service catalogue by default. A first-touch email should normally use 1–3 relevant capability areas.

### 6. Outreach generation

The master email structure is:

**Subject:** company-specific engineering topic

**Opening:** one credible reason for contacting the person/company.

**Company relevance:** one or two sentences connecting the account signal to an engineering problem or milestone.

**AionSi fit:** concise description of the matched capability, not a generic company pitch.

**Low-friction CTA:** ask for a short conversation to understand the requirement; do not force a sales meeting.

Tone:
- engineering-led
- concise
- peer-to-peer
- specific
- no hype
- no generic sales language

Avoid:
- "industry-leading"
- "cutting-edge"
- "revolutionary"
- unsupported customer claims
- exaggerated ROI claims
- long capability lists
- fabricated personalisation

### 7. Landing-page generation

The page uses the reusable `/collaboration/[slug]` template.

Only these variables change per prospect/account:
- company
- relevant engineering problem
- capability match
- pilot/work package
- technical evidence links
- engagement model
- meeting mode / geography
- disclosure

The page must not imply that the prospect is already a customer or that an active program exists.

All outreach pages remain `noindex,nofollow,noarchive`.

### 8. Evaluation gate

Before a message can enter the approval queue, evaluate:

| Check | Pass condition |
|---|---|
| Account relevance | At least one credible account signal is present |
| Persona relevance | Message reflects the contact's role |
| Evidence | Claims have supporting source/evidence |
| Specificity | Company is explicitly referenced in a meaningful way |
| Brevity | First email is approximately 120–170 words |
| Sales pressure | No aggressive or generic sales language |
| Capability fit | 1–3 relevant AionSi capabilities |
| CTA | One simple next step |
| Hallucination | No unsupported facts or relationships |
| Landing page | Same claims and angle as email |

A failed evaluation does not send. It returns the package for regeneration or human editing.

### 9. Human approval gate

The system must stop before dispatch.

Approval view should show:
- account
- contact
- research signals
- capability match
- email
- landing page preview/link
- evaluation results
- sources

Only after explicit approval should the outbound sending system be allowed to act.

## GreatAsic pilot

GreatAsic is the first test account for this pipeline. The current landing-page implementation already provides the reusable page model and GreatAsic seed data. The next implementation task is to connect structured research/persona/capability inputs to that model rather than creating another one-off page.
