# AionSi P0 / P1 / P2 Implementation

This branch consolidates the approved enterprise website direction around three priorities:

## P0 — credibility and conversion
- Representative engineering experience index
- Capability-to-evidence pathways
- Solution and delivery-model pathways
- Industry-to-capability pathways
- Strong engineering-discovery CTAs
- Enterprise navigation in footer

## P1 — depth and engagement architecture
- Industry landing and detail architecture
- Solution landing and detail architecture
- Dedicated / Extended / Project / ODC delivery positioning
- Careers architecture for early-career and experienced-engineer paths
- Capability proof surface and evidence discipline

## P2 — technical content and discoverability
- Engineering resources index
- Technical-paper route alias
- Technical evidence references linked from public navigation
- SEO-friendly page titles/descriptions on new public routes

## Source discipline
Public content must use approved engineering evidence only. Do not add customer names, logos, performance claims, quantitative claims, certifications, or silicon attribution unless explicitly approved and sourced in repository evidence.

## QA gate
Run:

```bash
npm run check
npm run build
```

Then review the homepage plus `/capabilities`, `/proof`, `/industries`, `/solutions`, `/careers`, and `/insights` at desktop and responsive widths.
