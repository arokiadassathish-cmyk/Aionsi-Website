export type ESGWorkspaceStatus = 'New' | 'In progress' | 'Needs evidence' | 'Ready for approval' | 'Submitted';

export type ESGWorkspaceQuestion = {
  id: string;
  question: string;
  category: string;
  mappingId?: string;
  status: ESGWorkspaceStatus;
  draftResponse?: string;
  evidenceRequired?: string;
  owner?: string;
  notes?: string;
};

export const workspaceStatusOrder: ESGWorkspaceStatus[] = [
  'New',
  'In progress',
  'Needs evidence',
  'Ready for approval',
  'Submitted'
];

export const workspaceQuestionTemplate: ESGWorkspaceQuestion[] = [
  {
    id: 'ENV-001',
    question: 'Does your organization maintain an environmental responsibility policy or equivalent framework?',
    category: 'Environment',
    mappingId: 'ENV-001',
    status: 'In progress'
  },
  {
    id: 'ENV-002',
    question: 'Can you provide energy consumption or greenhouse-gas emissions data?',
    category: 'Environment',
    mappingId: 'ENV-002',
    status: 'Needs evidence'
  },
  {
    id: 'SOC-001',
    question: 'Does your organization prohibit forced labor, child labor and human trafficking?',
    category: 'Social',
    mappingId: 'SOC-001',
    status: 'In progress'
  },
  {
    id: 'SOC-002',
    question: 'Do you provide employee training and maintain workplace safety processes?',
    category: 'Social',
    mappingId: 'SOC-002',
    status: 'Needs evidence'
  },
  {
    id: 'GOV-001',
    question: 'Does your organization maintain a code of conduct and anti-bribery / anti-corruption requirements?',
    category: 'Governance',
    mappingId: 'GOV-001',
    status: 'In progress'
  },
  {
    id: 'GOV-002',
    question: 'Is there a whistleblower or grievance mechanism with non-retaliation protections?',
    category: 'Governance',
    mappingId: 'GOV-002',
    status: 'In progress'
  },
  {
    id: 'SUP-001',
    question: 'Do suppliers have to meet environmental, labor, ethics and responsible-business expectations?',
    category: 'Supply Chain',
    mappingId: 'SUP-001',
    status: 'Needs evidence'
  },
  {
    id: 'SUP-002',
    question: 'Can you support responsible sourcing or minerals due-diligence requirements?',
    category: 'Supply Chain',
    mappingId: 'SUP-002',
    status: 'Needs evidence'
  },
  {
    id: 'SEC-001',
    question: 'Do you maintain information security and data privacy controls?',
    category: 'Information Security',
    mappingId: 'SEC-001',
    status: 'Needs evidence'
  }
];
