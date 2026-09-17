export type ESGDueDiligenceItem = {
  category: 'Environment' | 'Social' | 'Governance' | 'Supply Chain' | 'Information Security';
  requirement: string;
  framework: string;
  control: string;
  evidence: string;
  responseGuidance: string;
  owner: string;
  review: string;
};

export const esgDueDiligence: ESGDueDiligenceItem[] = [
  {
    category: 'Environment',
    requirement: 'Environmental responsibility policy',
    framework: 'Environmental Responsibility Policy',
    control: 'Define responsible resource use, IT asset lifecycle and environmental improvement practices.',
    evidence: 'Published policy plus validated operational records where requested.',
    responseGuidance: 'Reference the approved policy and provide quantitative metrics only when source records and methodology are validated.',
    owner: 'Operations / Facilities',
    review: 'FY2026 periodic review'
  },
  {
    category: 'Environment',
    requirement: 'Energy and emissions data',
    framework: 'ESG Metrics & Evidence',
    control: 'Collect relevant electricity, fuel and emission-source information and document reporting boundaries.',
    evidence: 'Utility records, operational source inventory and calculation methodology where applicable.',
    responseGuidance: 'Do not introduce numerical claims from estimates that have not been validated.',
    owner: 'Operations / Finance',
    review: 'FY2026 periodic review'
  },
  {
    category: 'Social',
    requirement: 'Human rights and labor standards',
    framework: 'Human Rights & Labor Policy',
    control: 'Address forced labor, child labor, trafficking, discrimination, harassment and respectful workplace expectations.',
    evidence: 'Policy, grievance mechanism and supporting records where applicable.',
    responseGuidance: 'Use policy language for framework questions and attach case or training evidence only when approved for disclosure.',
    owner: 'HR / Leadership',
    review: 'FY2026 periodic review'
  },
  {
    category: 'Social',
    requirement: 'Employee training and workplace practices',
    framework: 'ESG Metrics & Evidence',
    control: 'Track relevant training participation, development activity and workplace safety records.',
    evidence: 'Training registers, attendance records and incident/corrective-action records where applicable.',
    responseGuidance: 'Report participation or incident figures only after the reporting population and cut-off are validated.',
    owner: 'HR / People Operations',
    review: 'FY2026 periodic review'
  },
  {
    category: 'Governance',
    requirement: 'Code of conduct and anti-bribery',
    framework: 'Code of Business Conduct & Ethics / Anti-Bribery & Anti-Corruption Policy',
    control: 'Set expectations for integrity, conflicts, gifts, anti-bribery, records and speak-up channels.',
    evidence: 'Approved policies, acknowledgements, training records or communication logs.',
    responseGuidance: 'Map questionnaire wording to the relevant policy section before responding.',
    owner: 'Leadership / Finance / HR',
    review: 'FY2026 periodic review'
  },
  {
    category: 'Governance',
    requirement: 'Whistleblower and grievance process',
    framework: 'Whistleblower & Grievance Mechanism',
    control: 'Provide channels for good-faith reporting, review, confidentiality and non-retaliation expectations.',
    evidence: 'Published mechanism and approved case-handling records where applicable.',
    responseGuidance: 'Do not disclose confidential case details; provide process evidence or aggregate information when approved.',
    owner: 'HR / Leadership',
    review: 'Annual and incident-driven review'
  },
  {
    category: 'Supply Chain',
    requirement: 'Supplier code of conduct',
    framework: 'Supplier Code of Conduct',
    control: 'Set supplier expectations across labor, ethics, environment, health, safety, sourcing and information/IP.',
    evidence: 'Supplier Code of Conduct, onboarding records, assessments and corrective actions where applicable.',
    responseGuidance: 'Reference the supplier framework and identify any customer-specific requirements requiring additional assessment.',
    owner: 'Procurement / Operations',
    review: 'FY2026 periodic review and supplier reassessment'
  },
  {
    category: 'Supply Chain',
    requirement: 'Responsible sourcing / minerals due diligence',
    framework: 'Responsible Sourcing Statement',
    control: 'Address relevant supplier information and customer requirements concerning responsible sourcing.',
    evidence: 'Supplier declarations, customer questionnaires or due-diligence records where applicable.',
    responseGuidance: 'State the current evidence position precisely and avoid claiming completed due diligence where records are not validated.',
    owner: 'Procurement / Operations',
    review: 'Customer request and FY2026 periodic review'
  },
  {
    category: 'Information Security',
    requirement: 'Information security and privacy controls',
    framework: 'Information Security & Data Privacy Policy',
    control: 'Protect confidential information, IP and personal data through access, handling and incident-response practices.',
    evidence: 'Policy, access reviews, awareness records and incident documentation where applicable.',
    responseGuidance: 'Differentiate policy/framework controls from certifications or independent assurance that AionSi has not separately established.',
    owner: 'IT / Engineering',
    review: 'FY2026 periodic and incident-driven review'
  }
];
