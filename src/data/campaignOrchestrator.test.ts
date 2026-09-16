import { createCampaignState, transitionCampaign } from './campaignOrchestrator';

const input = {
  campaignId: 'test-campaign',
  accountId: 'test-account',
  contactIds: ['test-contact'],
  region: 'Malaysia',
  meetingMode: 'virtual',
  goal: 'technical discovery',
  mode: 'dry-run' as const,
};

const state0 = createCampaignState(input);
if (state0.stage !== 'RESEARCH' || state0.executionEnabled) {
  throw new Error('Initial campaign state must be non-executing and start in RESEARCH.');
}

const state1 = transitionCampaign(state0, { type: 'RESEARCH_COMPLETE', artifactId: 'research-1' });
const state2 = transitionCampaign(state1, { type: 'QUALIFICATION_PASSED' });
const state3 = transitionCampaign(state2, { type: 'MATCH_COMPLETE', artifactId: 'match-1' });
const state4 = transitionCampaign(state3, { type: 'DRAFT_COMPLETE', intelligenceId: 'intel-1', landingPageSlug: 'test-account' });
const state5 = transitionCampaign(state4, { type: 'QA_PASSED', evaluationId: 'eval-1' });
const state6 = transitionCampaign(state5, { type: 'APPROVE' });

if (state6.stage !== 'APPROVED' || state6.executionEnabled) {
  throw new Error('Dry-run approval must not enable live execution.');
}

let rejected = false;
try {
  transitionCampaign(state0, { type: 'ACTIVATE' });
} catch {
  rejected = true;
}
if (!rejected) {
  throw new Error('Activation from RESEARCH must be rejected.');
}
