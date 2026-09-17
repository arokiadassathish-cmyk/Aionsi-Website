export type ESGQuestionnaireItem = {
  id: string;
  category: 'Environment' | 'Social' | 'Governance' | 'Supply Chain' | 'Information Security';
  question: string;
  responseMode: 'Policy reference' | 'Evidence required' | 'Metric required' | 'Customer-specific validation';
  framework: string;
  control: string;
  evidence: string;
  responseTemplate: string;
  owner: string;
  review: string;
};

export const esgQuestionnaire: ESGQuestionnaireItem[] = [
  {
    id: 'ENV-001',
    category: 'Environment',
    question: 'Does your organization maintain an environmental responsibility policy or equivalent framework?',
    responseMode: 'Policy reference',
    framework: 'Environmental Responsibility Policy',
    control: 'Define environmental responsibility expectations for resource use, IT assets, travel and improvement activities.',
    evidence: 'Approved Environmental Responsibility Policy and supporting operational records where applicable.',
    responseTemplate: 'AionSi maintains an Environmental Responsibility Policy covering resource use, IT asset lifecycle, relevant operational impacts and continuous improvement. Quantitative environmental claims are provided only when the underlying records and methodology have been validated.',
    owner: 'Operations / Facilities',
    review: 'FY2026 periodic review'
  },
  {
    id: 'ENV-002',
    category: 'Environment',
    question: 'Can you provide energy consumption or greenhouse-gas emissions data?',
    responseMode: 'Metric required',
    framework: 'ESG Metrics & Evidence',
    control: 'Collect relevant electricity, fuel and emission-source information and document reporting boundaries and methodology.',
    evidence: 'Utility records, source inventory, location data and calculation methodology where applicable.',
    responseTemplate: 'AionSi is consolidating relevant FY2026 environmental source records. Numerical energy or emissions figures should be provided only after reporting boundaries, source records and calculation methods are validated.',
    owner: 'Operations / Finance',
    review: 'FY2026 periodic review'
  },
  {
    id: 'SOC-001',
    category: 'Social',
    question: 'Does your organization prohibit forced labor, child labor and human trafficking?',
    responseMode: 'Policy reference',
    framework: 'Human Rights & Labor Policy',
    control: 'Prohibit forced labor, child labor, trafficking, discrimination, harassment and abusive workplace practices.',
    evidence: 'Approved Human Rights & Labor Policy and grievance mechanism.',
    responseTemplate: 'AionSi maintains a Human Rights & Labor Policy addressing forced labor, child labor, human trafficking, discrimination and harassment, together with channels for raising concerns.',
    owner: 'HR / Leadership',
    review: 'FY2026 periodic review'
  },
  {
    id: 'SOC-002',
    category: 'Social',
    question: 'Do you provide employee training and maintain workplace safety processes?',
    responseMode: 'Evidence required',
    framework: 'ESG Metrics & Evidence',
    control: 'Track relevant training participation and maintain processes for workplace incident and hazard reporting.',
    evidence: 'Training registers, attendance records, incident logs and corrective-action records where applicable.',
    responseTemplate: 'AionSi tracks relevant employee development and workplace safety activities. Specific participation or incident figures should be supplied only after the reporting population and period are validated.',
    owner: 'HR / People Operations',
    review: 'FY2026 periodic review'
  },
  {
    id: 'GOV-001',
    category: 'Governance',
    question: 'Does your organization maintain a code of conduct and anti-bribery / anti-corruption requirements?',
    responseMode: 'Policy reference',
    framework: 'Code of Business Conduct & Ethics / Anti-Bribery & Anti-Corruption Policy',
    control: 'Set expectations for integrity, conflicts of interest, gifts, anti-bribery, records and escalation of concerns.',
    evidence: 'Approved policies, acknowledgements, training records or communication logs.',
    responseTemplate: 'AionSi maintains business conduct and anti-bribery / anti-corruption frameworks covering ethical conduct, conflicts, gifts and hospitality, records and speak-up expectations.',
    owner: 'Leadership / Finance / HR',
    review: 'FY2026 periodic review'
  },
  {
    id: 'GOV-002',
    category: 'Governance',
    question: 'Is there a whistleblower or grievance mechanism with non-retaliation protections?',
    responseMode: 'Policy reference',
    framework: 'Whistleblower & Grievance Mechanism',
    control: 'Provide channels for good-faith reporting, review, confidentiality and non-retaliation expectations.',
    evidence: 'Published mechanism and approved case-handling records where applicable.',
    responseTemplate: 'AionSi maintains a whistleblower and grievance mechanism for raising responsible-business concerns. Confidential case information is not disclosed; approved process evidence can be provided where appropriate.',
    owner: 'HR / Leadership',
    review: 'Annual and incident-driven review'
  },
  {
    id: 'SUP-001',
    category: 'Supply Chain',
    question: 'Do suppliers have to meet environmental, labor, ethics and responsible-business expectations?',
    responseMode: 'Evidence required',
    framework: 'Supplier Code of Conduct',
    control: 'Set supplier expectations covering labor, ethics, environment, health and safety, sourcing and information/IP.',
    evidence: 'Supplier Code of Conduct, onboarding records, assessments and corrective actions where applicable.',
    responseTemplate: 'AionSi uses a Supplier Code of Conduct to communicate relevant legal, ethical, labor, environmental, health and safety and responsible-sourcing expectations. Customer-specific supplier requirements may require additional validation.',
    owner: 'Procurement / Operations',
    review: 'FY2026 periodic review and supplier reassessment'
  },
  {
    id: 'SUP-002',
    category: 'Supply Chain',
    question: 'Can you support responsible sourcing or minerals due-diligence requirements?',
    responseMode: 'Customer-specific validation',
    framework: 'Responsible Sourcing Statement',
    control: 'Address applicable supplier information and customer requirements concerning responsible sourcing.',
    evidence: 'Supplier declarations, customer questionnaires and due-diligence records where applicable.',
    responseTemplate: 'AionSi addresses responsible sourcing requirements according to applicable customer, contractual and supplier expectations. The response should identify the current evidence position and should not state that due diligence is complete unless supported by validated records.',
    owner: 'Procurement / Operations',
    review: 'Customer request and FY2026 periodic review'
  },
  {
    id: 'SEC-001',
    category: 'Information Security',
    question: 'Do you maintain information security and data privacy controls?',
    responseMode: 'Evidence required',
    framework: 'Information Security & Data Privacy Policy',
    control: 'Protect confidential information, intellectual property and personal data through access, handling and incident-response practices.',
    evidence: 'Policy, access reviews, awareness records and incident documentation where applicable.',
    responseTemplate: 'AionSi maintains an Information Security & Data Privacy Policy covering confidentiality, access control, information handling and incident-response expectations. Any certification or independent assurance claim requires separate supporting evidence.',
    owner: 'IT / Engineering',
    review: 'FY2026 periodic and incident-driven review'
  }
];
