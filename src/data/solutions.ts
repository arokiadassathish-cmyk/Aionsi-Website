export interface Solution {
  slug: string;
  number: string;
  title: string;
  summary: string;
  idealFor: string[];
  engagement: string[];
  outcome: string;
  ctaLabel: string;
}

export const solutions: Solution[] = [
  { slug:'dedicated-engineering', number:'01', title:'Dedicated Engineering', summary:'Dedicated semiconductor engineering capacity aligned to a defined roadmap, capability or workstream.', idealFor:['Program capacity gaps','Specialist engineering needs','Roadmap-aligned teams','Longer-term ownership'], engagement:['Define scope','Assemble team','Integrate workflows','Execute and scale'], outcome:'Engineering continuity with dedicated ownership.', ctaLabel:'Discuss Dedicated Engineering' },
  { slug:'extended-engineering', number:'02', title:'Extended Engineering', summary:'Extend an existing customer engineering organization with specialist capacity and technical continuity.', idealFor:['Capacity augmentation','Specialist gaps','Existing customer teams','Rapid expansion'], engagement:['Identify gap','Add capability','Integrate with team','Scale as needed'], outcome:'Additional engineering capacity without disrupting the core organization.', ctaLabel:'Discuss Extended Engineering' },
  { slug:'odc', number:'03', title:'Engineering ODC', summary:'Build a dedicated semiconductor engineering organization with leadership, governance and scalable capacity.', idealFor:['Multi-disciplinary programs','Roadmap ownership','Long-term engineering scale','Dedicated delivery organizations'], engagement:['Define','Build','Integrate','Operate','Scale'], outcome:'A governed engineering organization aligned to the silicon roadmap.', ctaLabel:'Discuss Your ODC Requirement' },
  { slug:'project-engineering', number:'04', title:'Project Engineering', summary:'Engage AionSi around a defined scope, milestones, deliverables and technical ownership.', idealFor:['Defined technical scope','Turnkey work packages','Subsystem delivery','Time-bound programs'], engagement:['Scope','Plan','Execute','Validate','Deliver'], outcome:'Outcome-oriented engineering delivery around defined milestones.', ctaLabel:'Discuss a Project Requirement' },
];

export const getSolution = (slug: string) => solutions.find((solution) => solution.slug === slug);
