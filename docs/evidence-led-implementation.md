# AionSi Evidence-Led Website Implementation

## PR55 Objective
Implement the approved content architecture from PR54 across the customer-facing website without introducing unsupported technical, customer, product, performance, tape-out, process-node, or IP-ownership claims.

## Core rule
Each page has one primary job. Reusable proof relationships are centralized in data/components. Supporting pages link to authoritative evidence rather than repeating detailed narrative.

## Page jobs
- Home: positioning, breadth, selected proof, conversion.
- Capabilities: engineering scope and ownership model.
- Evidence: technical proof, methodology, architecture and representative artifacts.
- Experience: representative delivery context and engineering ownership.
- Technology: domain/protocol depth connected to evidence.
- AIV: AI-assisted verification workflow, controls, pilot path and supported evidence.
- AionSi IP: reusable IP/subsystem engineering context and integration evidence; avoid unsupported ownership claims.
- AionSi SoC: end-to-end SoC integration across IP, subsystems, interconnect, verification, DFT, physical implementation and sign-off.
- Solutions: engagement and delivery models.
- Customers: approved customer roster.
- Leadership: technical leadership and governance.

## Deduplication checks
1. Do not repeat the same company positioning paragraph on multiple pages.
2. Do not repeat detailed capability descriptions on evidence pages.
3. Do not turn evidence titles into broad product claims.
4. Do not copy technology lists across Home, Capabilities and Technology pages; link to the authoritative technology/evidence source.
5. Do not repeat AIV principles on every AIV-related page; AIV owns its workflow and governance narrative.
6. Do not repeat the approved customer roster outside the shared customer data/component.
7. Do not duplicate leadership bios outside Leadership unless a page needs a short attribution.

## Evidence linkage rules
- When an evidence item substantiates a capability, technology, IP/subsystem or SoC stage, link to that evidence instead of rewriting the evidence narrative.
- When no relevant evidence exists, keep the statement at capability-level and do not imply proof that has not been supplied.
- AIV must not publish AI productivity metrics unless supplied evidence supports the metric.

## P0 implementation targets
1. Home proof and positioning cleanup.
2. AIV evidence links and differentiated workflow story.
3. AionSi IP architecture and evidence relationships.
4. AionSi SoC lifecycle/integration story and evidence relationships.
5. Experience/Evidence boundary cleanup.
6. Technology-to-evidence mapping.
7. Customers/Leadership messaging deduplication.

## Acceptance gate
- `npm run qa` passes.
- No new route failures or broken internal links.
- No new image 404s.
- Desktop and mobile visual review passes.
- Technical claims trace to evidence where evidence exists.
- No unsupported customer attribution, metrics, tape-out, node, product, or IP ownership claims.
