export type ESGGovernanceItem = {
  area: 'Environment' | 'Social' | 'Governance' | 'Supply Chain' | 'Customer Due Diligence';
  topic: string;
  responsibleFunction: string;
  evidenceOwner: string;
  reviewCadence: string;
  escalation: string;
  status: 'Framework established' | 'Ownership to be confirmed' | 'Assessment in progress';
  publicNote?: string;
};

export const esgGovernance: ESGGovernanceItem[] = [
  {
    area: 'Environment',
    topic: 'Energy and environmental performance',
    responsibleFunction: 'Operations / Facilities',
    evidenceOwner: 'Operations / Facilities',
    reviewCadence: 'FY2026 periodic review',
    escalation: 'Leadership review for material gaps, exceptions or customer requests.',
    status: 'Ownership to be confirmed',
    publicNote: 'Functional ownership is shown as a framework pending formal internal assignment.'
  },
  {
    area: 'Environment',
    topic: 'Electronic waste and IT asset lifecycle',
    responsibleFunction: 'IT / Operations',
    evidenceOwner: 'IT / Operations',
    reviewCadence: 'FY2026 periodic review',
    escalation: 'Escalate disposal, vendor or regulatory exceptions to Operations leadership.',
    status: 'Framework established'
  },
  {
    area: 'Social',
    topic: 'People, training and workplace practices',
    responsibleFunction: 'HR / People Operations',
    evidenceOwner: 'HR / People Operations',
    reviewCadence: 'FY2026 periodic review',
    escalation: 'Escalate material workplace concerns through HR and leadership channels.',
    status: 'Ownership to be confirmed'
  },
  {
    area: 'Social',
    topic: 'Human rights and grievance mechanism',
    responsibleFunction: 'HR / Leadership',
    evidenceOwner: 'HR / Leadership',
    reviewCadence: 'At least annually and as incidents arise',
    escalation: 'Material or unresolved concerns escalate to leadership under the applicable grievance process.',
    status: 'Framework established'
  },
  {
    area: 'Social',
    topic: 'Health, safety and workplace incidents',
    responsibleFunction: 'HR / Operations',
    evidenceOwner: 'HR / Operations',
    reviewCadence: 'FY2026 periodic review and incident-driven review',
    escalation: 'Escalate significant incidents and corrective actions to leadership.',
    status: 'Framework established'
  },
  {
    area: 'Governance',
    topic: 'Business ethics and anti-bribery',
    responsibleFunction: 'Leadership / Finance / HR',
    evidenceOwner: 'Leadership / Finance / HR',
    reviewCadence: 'FY2026 periodic review',
    escalation: 'Potential violations escalate through management and the applicable reporting mechanism.',
    status: 'Framework established'
  },
  {
    area: 'Governance',
    topic: 'Information security and data privacy',
    responsibleFunction: 'IT / Engineering',
    evidenceOwner: 'IT / Engineering',
    reviewCadence: 'FY2026 periodic review and incident-driven review',
    escalation: 'Security or privacy incidents escalate through the incident-response process and leadership.',
    status: 'Framework established'
  },
  {
    area: 'Supply Chain',
    topic: 'Supplier responsibility and ESG assessment',
    responsibleFunction: 'Procurement / Operations',
    evidenceOwner: 'Procurement / Operations',
    reviewCadence: 'FY2026 periodic review and supplier onboarding / reassessment',
    escalation: 'Material supplier concerns may require corrective action, management escalation or further review.',
    status: 'Assessment in progress'
  },
  {
    area: 'Supply Chain',
    topic: 'Responsible sourcing and customer requirements',
    responsibleFunction: 'Procurement / Operations / Leadership',
    evidenceOwner: 'Procurement / Operations',
    reviewCadence: 'Periodic review and customer-specific request review',
    escalation: 'Customer or sourcing requirements that exceed the current framework escalate to leadership for disposition.',
    status: 'Assessment in progress'
  },
  {
    area: 'Customer Due Diligence',
    topic: 'ESG questionnaire and evidence responses',
    responsibleFunction: 'Sales / Delivery / Leadership',
    evidenceOwner: 'Assigned response owner by customer request',
    reviewCadence: 'Per customer request and FY2026 framework review',
    escalation: 'Questions requiring new commitments, unsupported claims or non-standard evidence escalate to leadership before submission.',
    status: 'Framework established',
    publicNote: 'Customer responses should use validated policies, controls and evidence and should not introduce unsupported claims.'
  }
];
