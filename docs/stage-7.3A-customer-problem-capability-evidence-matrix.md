# Stage 7.3A — Customer Problem → Capability → Evidence → Engagement Matrix

## Purpose

This document is the source-of-truth for the next AionSi website conversion layer. It translates technical capability into an enterprise engineering buying path without inventing customer or program claims.

## Conversion model

`Customer Engineering Problem → AionSi Capability → Technical Evidence → Potential Workstream → Engagement Model → CTA`

## Evidence discipline

- **Methodology**: describes how AionSi approaches engineering work.
- **Engineering reference**: reusable architecture, flow, or technical model.
- **Case-study evidence**: approved program-specific evidence.
- **Customer-specific confidential material**: only referenced as available under appropriate confidentiality; never exposed as a public claim.
- Do not infer named customers, completion status, quantitative outcomes, or confidential program details from generic technical artifacts.

## Pilot: Protocol Verification

| Customer engineering problem | AionSi capability response | Evidence to surface | Potential workstream | Engagement model | CTA intent |
|---|---|---|---|---|---|
| Verification capacity shortage | Protocol-focused verification engineers | Reusable UVM Verification Architecture; protocol verification methodology | Add protocol specialists to existing team | Specialist Engineering | Discuss protocol engineering capacity |
| Verification schedule / closure pressure | Structured verification workstream spanning stimulus, checking, coverage and closure | Reusable UVM architecture; verification methodology | Own a defined protocol verification scope and milestones | Managed Workstream | Discuss a managed verification workstream |
| New high-speed protocol verification requirement | Protocol-specific UVM environments for high-speed interfaces | Approved protocol architectures and protocol-specific evidence where available | Define protocol scope, environment, scenarios, checks and closure criteria | Project / Turnkey | Discuss a protocol verification project |
| Reusable UVM infrastructure requirement | Reusable sequencers, drivers/BFMs, monitors, scoreboards, predictors, assertions and coverage | Reusable UVM Verification Architecture | Environment creation / extension and migration to reusable infrastructure | Managed Workstream / Project | Discuss reusable verification infrastructure |
| Regression / coverage closure requirement | Coverage-driven verification and structured failure analysis | Coverage, assertions, scoreboard, reporting and regression methodology | Regression ownership, triage, coverage-gap closure | Managed Workstream | Discuss verification closure |
| Specialist protocol expertise requirement | Protocol-focused engineering capacity | PCIe, USB, DDR/LPDDR, HBM, AMBA/AXI and adjacent protocol evidence supported by approved material | Targeted protocol expertise augmentation | Specialist Engineering | Discuss specialist protocol support |
| Need to scale beyond a single workstream | Repeatable verification methodology and reusable components | Reusable architecture + methodology + approved evidence set | Multiple related workstreams with governance and common infrastructure | Dedicated Engineering ODC | Discuss a dedicated verification ODC |

## Engagement model definitions

### 01 — Specialist Engineering

For customers that already own the verification program but need experienced protocol-focused engineering capacity.

### 02 — Managed Workstream

For a defined verification scope with agreed milestones, ownership and closure objectives.

### 03 — Project / Turnkey

For a bounded verification package where AionSi is expected to deliver agreed outputs.

### 04 — Dedicated Engineering ODC

For customers seeking a scalable, longer-term engineering organization aligned to their roadmap, methodology and governance model.

## CTA architecture

Use a technical CTA rather than a generic contact request.

- `Discuss protocol engineering capacity`
- `Discuss a managed verification workstream`
- `Discuss a protocol verification project`
- `Discuss verification closure`
- `Discuss a dedicated verification ODC`

## Reusable structure for other capabilities

The same matrix should later be produced for:

1. Design Verification
2. Protocol Verification
3. Physical Design
4. DFT
5. RTL / SoC / IP-related capabilities as supported by approved AionSi evidence
6. Other engineering capabilities only after evidence review

## Implementation rule

Stage 7.3A is a content/strategy specification first. Do not redesign the frozen Stage 7.2B page while this matrix is being reviewed. Once approved, Stage 7.3B can translate the matrix into page components, CTA routing and qualification flows.