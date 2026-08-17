export const engineeringDiscoveryFields = [
  { name: 'firstName', label: 'First name', type: 'text', required: true },
  { name: 'lastName', label: 'Last name', type: 'text', required: true },
  { name: 'businessEmail', label: 'Business email', type: 'email', required: true },
  { name: 'company', label: 'Company', type: 'text', required: true },
  { name: 'programType', label: 'Program / project type', type: 'select', required: false },
  { name: 'protocolInterface', label: 'Protocol / interface', type: 'text', required: false },
  { name: 'verificationStage', label: 'Engineering stage', type: 'select', required: false },
  { name: 'primaryBottleneck', label: 'Primary bottleneck', type: 'select', required: false },
  { name: 'engagementModel', label: 'Preferred engagement model', type: 'select', required: false },
  { name: 'ndaStatus', label: 'NDA / technical review status', type: 'select', required: false },
  { name: 'expectedTimeline', label: 'Expected timeline', type: 'select', required: false },
  { name: 'engineeringCapacity', label: 'Required engineering capacity', type: 'select', required: false },
  { name: 'engineeringRequirement', label: 'Engineering requirement', type: 'textarea', required: true },
] as const;

export const engineeringDiscoveryOptions = {
  programType: ['IP development', 'Subsystem', 'SoC / ASIC', 'Verification program', 'Physical implementation', 'DFT / test', 'Silicon bring-up', 'Other'],
  verificationStage: ['Architecture / planning', 'RTL / environment development', 'Stimulus / scenarios', 'Checking / assertions', 'Coverage / regression', 'Debug / closure', 'Physical implementation / sign-off', 'DFT / test sign-off', 'Silicon bring-up'],
  primaryBottleneck: ['Engineering capacity', 'New interface / protocol', 'Verification closure', 'Environment reuse', 'Protocol expertise', 'Physical-design closure', 'DFT / test readiness', 'Scalable external execution'],
  engagementModel: ['Specialist engineering', 'Managed workstream', 'Project / turnkey', 'Dedicated engineering ODC'],
  ndaStatus: ['NDA already available', 'NDA required', 'Technical discussion possible before NDA', 'Not sure'],
  expectedTimeline: ['Immediate', 'Within 1 month', '1–3 months', '3–6 months', '6+ months'],
  engineeringCapacity: ['1–2 engineers', '3–5 engineers', '6–10 engineers', '10+ engineers', 'To be determined'],
} as const;

export const engineeringDiscoveryRouting = [
  'Customer requirement',
  'Technical qualification',
  'Opportunity',
  'Engineering discovery',
  'NDA / technical review',
  'Pilot / workstream / project',
  'ODC expansion',
] as const;
