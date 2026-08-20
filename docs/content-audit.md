# AionSi Website Content & Evidence Architecture Audit

## Objective
Reduce repetitive marketing copy and make technical evidence the source of credibility across the site.

## Page roles
- Home: positioning, breadth, proof cues, conversion.
- Capabilities: what AionSi can engineer.
- Evidence: technical proof, methodology, architecture, representative artifacts.
- Experience: representative engineering delivery stories.
- Technology: domain/protocol depth with evidence links.
- Solutions: customer engagement and delivery models.
- AIV: AI-assisted verification proposition, workflow, controls, pilot model and evidence links.
- AionSi IP: reusable IP/subsystem engineering story, integration context and evidence-backed technical depth; do not imply unsupported IP ownership.
- AionSi SoC: end-to-end SoC integration story across IP, subsystems, interconnect, verification, DFT, physical implementation and sign-off.
- Customers: approved customer proof.
- Leadership: people, engineering credibility and governance.

## Anti-duplication rules
1. Home should summarize, not reproduce detailed capability narratives.
2. Capabilities should describe scope, not repeat case studies.
3. Evidence should prove claims, not restate service descriptions.
4. Experience should explain delivery context and engineering ownership, not duplicate evidence pages.
5. Technology pages should connect domains to evidence rather than repeat generic capability lists.
6. Solutions pages should focus on engagement model, ownership, operating model, scope and commercial conversion.
7. AIV should focus on the AI-assisted verification workflow and controls, while linking to verification evidence.
8. AionSi IP should focus on reusable engineering assets, subsystem context and integration evidence, not repeat generic capability copy.
9. AionSi SoC should focus on system integration and engineering ownership across the lifecycle, not duplicate individual capability pages.
10. Customer page owns the approved customer roster; Home uses a compact shared proof component.

## Evidence-led priorities
### AionSi IP
Frame as reusable IP/subsystem engineering and connect relevant evidence for interfaces, protocol verification, integration and sign-off. Avoid unsupported IP ownership or product claims.

### AionSi SoC
Frame as integration across IP, subsystems, interconnect, verification, DFT, physical implementation and sign-off. Link each stage to relevant evidence where available.

### AIV
Use the existing workflow architecture: bottleneck -> AI assistance -> engineer review -> validation -> decision/sign-off. Add evidence links only where repository evidence supports the claim. Do not invent AI productivity metrics.

## Evidence governance
Only publish strong project/customer/technology claims when they are supported by submitted AionSi evidence. Unsupported metrics, tape-out claims, node claims, customer attribution, or product ownership claims must remain unpublished until evidence is supplied.

## Implementation sequence
P0: Home, Capabilities, Evidence, Experience, AIV, AionSi IP, AionSi SoC, Technology, Customers.
P1: Solutions, Industries, Leadership.
P2: Careers, Gallery, Insights/Blogs and supporting pages.

## Implementation rules for the next pass
- Centralize reusable proof relationships in data/components rather than duplicating claim text across pages.
- Every substantive technical claim should link to at least one relevant evidence item when such evidence exists.
- Home may summarize a capability or technology, but detailed methodology belongs on the capability/evidence page.
- Evidence pages should link back to the capability/technology context they substantiate.
- AIV, IP and SoC pages should favor architecture, workflow and proof over generic marketing adjectives.
- Keep customer, leadership and company-wide positioning statements short and authoritative; avoid repeating them verbatim across multiple pages.
