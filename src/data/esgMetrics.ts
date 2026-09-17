export type ESGMetric = {
  area: string;
  requirement: string;
  control: string;
  evidence: string;
  owner: string;
  status: 'Data collection in progress' | 'Framework established' | 'Assessment in progress';
  review: string;
  publicNote?: string;
};

export const esgMetrics: ESGMetric[] = [
  {
    area: 'Environment',
    requirement: 'Energy consumption',
    control: 'Track electricity and relevant energy-use information for AionSi operating locations where records are available.',
    evidence: 'Utility bills, landlord/facility records, or other source records; FY2026 baseline to be consolidated.',
    owner: 'Operations / Facilities',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review',
    publicNote: 'Quantitative energy figures will be published only after source records are validated.'
  },
  {
    area: 'Environment',
    requirement: 'Scope 1 emissions',
    control: 'Assess whether direct-emission sources are relevant to AionSi operations and document the conclusion.',
    evidence: 'Operational fuel/source inventory and calculation methodology where applicable.',
    owner: 'Operations / Facilities',
    status: 'Assessment in progress',
    review: 'FY2026 periodic review',
    publicNote: 'No numerical Scope 1 claim is made until the relevant source inventory is validated.'
  },
  {
    area: 'Environment',
    requirement: 'Scope 2 emissions',
    control: 'Assess purchased electricity consumption and applicable emission factors for relevant locations.',
    evidence: 'Electricity records, location data and documented emission-factor methodology.',
    owner: 'Operations / Facilities',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review',
    publicNote: 'Scope 2 figures remain under evidence collection and methodology validation.'
  },
  {
    area: 'Environment',
    requirement: 'Business travel',
    control: 'Track relevant business travel information and improve visibility of travel-related activity over time.',
    evidence: 'Travel agency reports, expense records or approved travel data where available.',
    owner: 'Operations / Finance',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Environment',
    requirement: 'Electronic waste and IT asset lifecycle',
    control: 'Use responsible IT asset lifecycle practices and authorized disposal or recycling channels where applicable.',
    evidence: 'Asset register, disposal records, recycler/vendor records where available.',
    owner: 'IT / Operations',
    status: 'Framework established',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Social',
    requirement: 'Employee headcount',
    control: 'Maintain workforce records by relevant organizational categories for internal reporting.',
    evidence: 'HRIS or approved employee records; reporting cut-off to be documented.',
    owner: 'HR / People Operations',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Social',
    requirement: 'Employee training and development',
    control: 'Track relevant training participation and development activities.',
    evidence: 'Training registers, learning records or attendance reports.',
    owner: 'HR / People Operations',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Social',
    requirement: 'Health and safety incidents',
    control: 'Maintain a process for reporting, reviewing and addressing relevant workplace incidents and hazards.',
    evidence: 'Incident logs, corrective-action records and workplace safety records where applicable.',
    owner: 'HR / Operations',
    status: 'Framework established',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Social',
    requirement: 'Human rights and grievance mechanism',
    control: 'Provide channels for concerns relating to harassment, discrimination, labor, ethics and other responsible-business issues.',
    evidence: 'Whistleblower & Grievance Mechanism, case records and periodic review evidence where applicable.',
    owner: 'HR / Leadership',
    status: 'Framework established',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Governance',
    requirement: 'Ethics and anti-bribery training',
    control: 'Communicate business conduct and anti-bribery expectations and track relevant awareness or training activity.',
    evidence: 'Policy acknowledgement, training records or communication logs.',
    owner: 'Leadership / HR / Finance',
    status: 'Data collection in progress',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Governance',
    requirement: 'Supplier ESG assessment',
    control: 'Assess relevant suppliers against legal, ethical, labor, environmental and responsible sourcing expectations where applicable.',
    evidence: 'Supplier Code of Conduct, onboarding records, questionnaires, assessments and corrective-action records where applicable.',
    owner: 'Procurement / Operations',
    status: 'Assessment in progress',
    review: 'FY2026 periodic review'
  },
  {
    area: 'Governance',
    requirement: 'Information security and privacy',
    control: 'Protect confidential information, intellectual property and personal data through access, handling and incident-response controls.',
    evidence: 'Information Security & Data Privacy Policy, access reviews, awareness records and incident documentation where applicable.',
    owner: 'IT / Engineering',
    status: 'Framework established',
    review: 'FY2026 periodic review'
  },
];
