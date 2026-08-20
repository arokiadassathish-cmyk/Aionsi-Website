import { useMemo, useState } from 'react';

const stages = [
  { id: 'IP', title: 'IP Engineering', short: 'IP', description: 'Engineering focus across reusable semiconductor IP and interface-ready building blocks.', scope: ['IP architecture', 'RTL development', 'IP integration readiness'], outcome: 'Reusable, integration-ready engineering assets.' },
  { id: 'SUBSYSTEM', title: 'Subsystem Engineering', short: 'SUBSYSTEM', description: 'Connect IP blocks into coherent subsystem architecture with clear interfaces and verification intent.', scope: ['Subsystem integration', 'Interface definition', 'Architecture alignment'], outcome: 'Integrated subsystem foundations prepared for SoC development.' },
  { id: 'SoC', title: 'SoC Engineering', short: 'SoC', description: 'Engineering support across complex SoC integration and heterogeneous system development.', scope: ['SoC integration', 'System architecture', 'IP / subsystem coordination'], outcome: 'System-level engineering alignment for silicon programs.' },
  { id: 'VERIFICATION', title: 'Design Verification', short: 'VERIFICATION', description: 'Verification across block, subsystem and SoC levels with disciplined methodology and coverage closure.', scope: ['SystemVerilog / UVM', 'Coverage & assertions', 'Regression & debug'], outcome: 'Confidence in functional correctness before implementation.' },
  { id: 'PHYSICAL DESIGN', title: 'Physical Design', short: 'PHYSICAL', description: 'Physical implementation engineering for complex silicon programs from planning through signoff.', scope: ['Floorplanning', 'Placement / CTS', 'Routing / signoff'], outcome: 'Implementation-ready silicon with physical closure focus.' },
  { id: 'DFT', title: 'Design for Test', short: 'DFT', description: 'DFT engineering integrated into the silicon lifecycle to support manufacturability and test strategy.', scope: ['Test architecture', 'Scan / ATPG', 'DFT verification'], outcome: 'Test-ready silicon strategy aligned to manufacturing needs.' },
  { id: 'SILICON', title: 'Silicon', short: 'SILICON', description: 'The engineering journey converges on silicon delivery, where architecture, verification, implementation and DFT meet.', scope: ['Engineering handoff', 'Program readiness', 'Silicon outcome'], outcome: 'A connected engineering path from IP to silicon.' },
];

export default function LifecycleExplorer() {
  const [activeId, setActiveId] = useState('VERIFICATION');
  const active = useMemo(() => stages.find((stage) => stage.id === activeId) ?? stages[0], [activeId]);

  return (
    <div className="w-full">
      <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(2,11,39,.08)] md:p-7">
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex min-w-max items-center">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <button type="button" aria-pressed={activeId === stage.id} onClick={() => setActiveId(stage.id)} className={`group relative whitespace-nowrap rounded-full border px-4 py-3 text-[11px] font-semibold tracking-[.14em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--aionsi-orange)] focus-visible:ring-offset-2 ${activeId === stage.id ? 'border-[var(--aionsi-orange)] bg-[var(--aionsi-orange)] text-white shadow-[0_8px_20px_rgba(244,81,30,.18)]' : 'border-slate-200 bg-white text-[var(--aionsi-navy)] hover:border-[var(--aionsi-blue)] hover:text-[var(--aionsi-blue)]'}`}>
                  <span className="md:hidden">{stage.short}</span><span className="hidden md:inline">{stage.id}</span>
                </button>
                {index < stages.length - 1 && <span className={`mx-2 h-px w-7 shrink-0 ${index < stages.findIndex((item) => item.id === activeId) ? 'bg-[var(--aionsi-orange)]' : 'bg-slate-200'}`} aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-start">
          <div><div className="text-xs font-semibold uppercase tracking-[.18em] text-[var(--aionsi-orange)]">Engineering Stage</div><h3 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--aionsi-navy)] md:text-4xl">{active.title}</h3><p className="mt-4 text-base leading-7 text-slate-600">{active.description}</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border border-slate-200 bg-[var(--aionsi-surface-alt)] p-5"><div className="text-xs font-semibold tracking-[.16em] text-[var(--aionsi-blue)]">ENGINEERING FOCUS</div><ul className="mt-4 grid gap-2 text-sm leading-6 text-slate-700">{active.scope.map((item) => <li key={item} className="flex gap-2"><span className="text-[var(--aionsi-orange)]">•</span><span>{item}</span></li>)}</ul></div>
            <div className="border border-[var(--aionsi-navy)] bg-[var(--aionsi-deep-navy)] p-5 text-white"><div className="text-xs font-semibold tracking-[.16em] text-[var(--aionsi-orange)]">PROGRAM OUTCOME</div><p className="mt-4 text-sm leading-6 text-white/75">{active.outcome}</p><div className="mt-7 text-xs font-semibold tracking-[.16em] text-white/40">AIONSI · IP → SILICON</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
