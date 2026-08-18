# Stage 6B-2 — Physical Design Evidence Detail Review

## Objective
Elevate the Physical Design representative evidence detail page from a generic verification-oriented template into a credible, technically structured Physical Design evidence page.

## Required content direction
- Use the approved Physical Design terminology already present in the capability page: netlist, floorplanning, placement, CTS, routing, timing closure, congestion, physical verification, sign-off.
- Preserve the evidence-safe positioning: representative AionSi engineering experience; no unsupported customer attribution or performance claims.
- Replace verification-specific labels and generic verification architecture language on the Physical Design detail page.
- Add a Physical Design engineering-flow panel covering: Netlist → Floorplan → Placement → CTS → Routing → Timing / Physical Verification → Sign-Off.
- Add closure-oriented architecture/context content covering hierarchy, macro/power-domain planning, congestion, timing feedback, routing/ECO and sign-off readiness.
- Make the CTA explicitly Physical Design oriented and route to `/contact`.

## Acceptance criteria
- The Physical Design evidence detail page reads as Physical Design throughout, without references to reusable UVM verification architecture unless the evidence item itself is the UVM architecture entry.
- Desktop page clearly communicates engineering scope, execution flow, methodology and sign-off outcome.
- All existing evidence routes continue to build.
- `/contact` CTA works.
- `npm run check` returns 0 errors.
- `npm run build` succeeds.
