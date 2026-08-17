# Stage 7.3A v1.1 — Customer Situation → Engineering Impact → Why AionSi → Capability → Evidence → Workstream → Engagement → Expansion → CTA

## Purpose

This document is the source-of-truth for the AionSi website conversion layer. It translates technical capability into an enterprise semiconductor engineering buying path without inventing customer, program, completion, quantitative, or confidential claims.

## Conversion model

`Customer Situation → Engineering Impact → Why AionSi → AionSi Capability → Technical Evidence → Potential Workstream → Engagement Model → Expansion Path → CTA`

## Evidence discipline

- **Methodology**: describes how AionSi approaches engineering work.
- **Engineering reference**: reusable architecture, flow, or technical model.
- **Case-study evidence**: approved program-specific evidence.
- **Customer-specific confidential material**: only referenced as available under appropriate confidentiality; never exposed as a public claim.
- Do not infer named customers, completion status, quantitative outcomes, or confidential program details from generic technical artifacts.

## Commercial principle

AionSi should not present itself as only a source of engineering headcount. The website should show how AionSi can enter a program at different responsibility levels:

`Specialist Engineering → Managed Workstream → Project / Turnkey → Dedicated Engineering ODC`

The engagement models are intentionally progressive. A customer can begin with focused engineering capacity and expand into larger managed scopes or an ODC after technical trust and delivery scope are established.

## Pilot: Protocol Verification

| Customer situation | Engineering impact | Why AionSi | AionSi capability response | Evidence to surface | Potential workstream | Engagement model | Expansion path | CTA intent |
|---|---|---|---|---|---|---|---|---|
| Verification team needs additional experienced engineers to meet program milestones | Ramp pressure, milestone risk and limited senior DV bandwidth | Protocol-focused engineering capacity that can integrate with an existing DV organization | Protocol-focused verification engineers | Reusable UVM Verification Architecture; protocol verification methodology | Add protocol specialists to the customer's existing team | Specialist Engineering | Specialist team → managed workstream | Discuss protocol engineering capacity |
| Verification closure is becoming a schedule constraint | Regression backlog, coverage gaps, debug load and milestone risk | Structured verification execution spanning stimulus, checking, coverage and closure | Managed verification workstream with defined scope and milestones | Reusable UVM architecture; verification methodology | Own a defined protocol verification scope through agreed closure objectives | Managed Workstream | Workstream → project / broader verification ownership | Discuss a managed verification workstream |
| A new high-speed protocol/interface needs to be brought into verification | New environment, stimulus, checking and coverage infrastructure must be established | Protocol-aware UVM methodology and reusable verification infrastructure | Protocol-specific verification environment and execution | Approved protocol architectures and protocol-specific evidence where available | Define protocol scope, environment, scenarios, checks and closure criteria | Project / Turnkey | Project → recurring support / managed workstream | Discuss a protocol verification project |
| Existing verification environments are being repeatedly rebuilt across programs | Engineering duplication, inconsistent environments and slower ramp-up | Reusable UVM components and standardized verification patterns | Reusable sequencers, drivers/BFMs, monitors, scoreboards, predictors, assertions and coverage | Reusable UVM Verification Architecture | Environment creation, extension or modernization toward reusable infrastructure | Managed Workstream / Project | Infrastructure → multiple related programs | Discuss reusable verification infrastructure |
| Regression failures and coverage gaps are slowing verification closure | Debug bottlenecks, unresolved failures and closure uncertainty | Coverage-driven verification and structured failure analysis | Regression ownership, triage and coverage-gap closure | Coverage, assertions, scoreboard, reporting and regression methodology | Regression triage, coverage analysis and closure activities | Managed Workstream | Closure workstream → broader DV ownership | Discuss verification closure |
| Program needs protocol-specific expertise that is not available internally | Specialist knowledge gap and slower issue resolution | Protocol-focused engineering capacity across approved interface domains | Targeted protocol expertise augmentation | PCIe, USB, DDR/LPDDR, HBM, AMBA/AXI and adjacent evidence supported by approved material | Targeted protocol expertise augmentation | Specialist Engineering | Specialist support → managed workstream | Discuss specialist protocol support |
| Multiple verification programs require scalable external engineering capacity | Team scaling, governance and resource-planning complexity | Repeatable verification methodology plus reusable infrastructure and scalable engineering delivery | Multi-workstream verification organization | Reusable architecture + methodology + approved evidence set | Multiple related verification workstreams with shared governance and infrastructure | Dedicated Engineering ODC | ODC team → additional capabilities / programs | Discuss a dedicated verification ODC |

## Engineering workstream definition

To make an engagement concrete, future capability pages should show the likely inputs, AionSi-owned execution scope and outputs for a defined workstream.

### Typical inputs

- Protocol / interface specification
- DUT or subsystem specification
- Existing verification environment, where applicable
- Verification plan and closure criteria
- Program milestone expectations

### Typical AionSi execution scope

- UVM environment development or extension
- Sequence and stimulus development
- Drivers / BFMs and protocol agents
- Monitoring and transaction observation
- Scoreboards and predictors / reference models
- Assertions / protocol checking
- Functional and cross coverage
- Regression execution and failure triage
- Coverage-gap analysis and verification closure support

### Typical outputs

- Verification environment or environment extensions
- Test / sequence library
- Checking and assertion infrastructure
- Coverage results and gap analysis
- Regression reports
- Defect / failure triage outputs
- Verification closure status against agreed objectives

These are engagement-pattern examples, not claims that every listed activity has been completed for a specific customer program.

## Engagement model definitions

### 01 — Specialist Engineering

**Customer owns the program; AionSi supplies engineering capacity.**

For customers that already own the verification program but need experienced protocol-focused engineers.

Typical entry point: a defined number of protocol engineers aligned to an existing team and methodology.

### 02 — Managed Workstream

**AionSi owns a defined engineering scope.**

For a defined verification scope with agreed milestones, ownership and closure objectives.

Typical entry point: protocol or subsystem verification with explicit work-package boundaries and execution responsibility.

### 03 — Project / Turnkey

**AionSi owns the defined deliverable.**

For a bounded verification package where AionSi is expected to deliver agreed outputs and acceptance criteria.

Typical entry point: environment creation, verification package development or another clearly bounded engineering deliverable.

### 04 — Dedicated Engineering ODC

**AionSi becomes an extension of the customer's engineering organization.**

For customers seeking a scalable, longer-term engineering organization aligned to their roadmap, methodology and governance model.

Typical entry point: multiple related workstreams requiring common engineering leadership, governance and reusable infrastructure.

## CTA architecture

Use a technical CTA rather than a generic contact request.

- `Discuss protocol engineering capacity`
- `Discuss a managed verification workstream`
- `Discuss a protocol verification project`
- `Discuss reusable verification infrastructure`
- `Discuss verification closure`
- `Discuss a dedicated verification ODC`

CTA intent should match the customer's situation rather than forcing every visitor into one generic contact path.

## Expansion path principle

The website should support a realistic account expansion sequence:

`Specialist Engineering → Proven Workstream → Project / Turnkey → Multiple Workstreams → Dedicated ODC`

This is a commercial journey model, not a promise that every customer will follow the same path.

## Protocol segmentation for later stages

The Protocol Verification capability should eventually support more precise journeys where evidence permits:

### High-speed interfaces

- PCIe
- USB

### Memory interfaces

- DDR / LPDDR
- HBM

### SoC / interconnect

- AMBA / AXI

### Additional protocol areas

- UFS
- MIPI
- Ethernet

Individual protocol pages or journeys must use only the evidence level approved for that protocol. A generic portfolio listing must not be interpreted as proof of a customer-specific completed engagement.

## Reusable structure for other capabilities

The same matrix should later be produced for:

1. Design Verification
2. Protocol Verification
3. Physical Design
4. DFT
5. RTL / SoC / IP-related capabilities as supported by approved AionSi evidence
6. Other engineering capabilities only after evidence review

Each new capability must preserve the same structure:

`Customer Situation → Engineering Impact → Why AionSi → Capability → Evidence → Workstream → Engagement → Expansion → CTA`

## Implementation rule

Stage 7.3A is a content/strategy specification first. Do not redesign the frozen Stage 7.2B page while this matrix is being reviewed. Once approved, Stage 7.3B can translate the matrix into page components, CTA routing and qualification flows.