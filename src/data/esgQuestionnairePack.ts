export type ESGQuestionnairePackItem = {
  field: string;
  instruction: string;
  required: boolean;
};

export const esgQuestionnairePack: ESGQuestionnairePackItem[] = [
  { field: 'Customer questionnaire', instruction: 'Store the original customer questions and instructions exactly as received.', required: true },
  { field: 'Question classification', instruction: 'Assign each question to Environment, Social, Governance, Supply Chain or Information Security.', required: true },
  { field: 'Framework mapping', instruction: 'Map each question to the applicable AionSi policy, statement, metrics register or control.', required: true },
  { field: 'Evidence validation', instruction: 'Confirm source record, reporting period, scope, calculation method and disclosure permission before using evidence.', required: true },
  { field: 'Response approval', instruction: 'Route responses that contain commitments, quantitative claims, legal interpretations or customer-specific attestations for the appropriate internal review.', required: true },
  { field: 'Submission record', instruction: 'Retain the submitted response, evidence references, approval trail and submission date for future refreshes.', required: true },
  { field: 'Refresh trigger', instruction: 'Revalidate responses when policies change, evidence periods roll over, customer requirements change or a material operational event occurs.', required: false },
];
