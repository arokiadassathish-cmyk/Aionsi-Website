export type CampaignStage =
  | 'RESEARCH'
  | 'QUALIFIED'
  | 'MATCHED'
  | 'DRAFTED'
  | 'QA_PASSED'
  | 'APPROVAL_REQUIRED'
  | 'APPROVED'
  | 'ENROLLED'
  | 'ACTIVE'
  | 'REPLIED'
  | 'MEETING'
  | 'PAUSED'
  | 'COMPLETED'
  | 'BLOCKED';

export type CampaignMode = 'dry-run' | 'live';

export interface CampaignInput {
  campaignId: string;
  accountId: string;
  contactIds: string[];
  region?: string;
  meetingMode?: string;
  goal?: string;
  mode: CampaignMode;
}

export interface CampaignArtifact {
  researchId?: string;
  intelligenceId?: string;
  landingPageSlug?: string;
  evaluationId?: string;
  sequenceId?: string;
}

export interface CampaignState {
  input: CampaignInput;
  stage: CampaignStage;
  artifacts: CampaignArtifact;
  history: Array<{ stage: CampaignStage; at: string; reason?: string }>;
  blockers: string[];
  requiresHumanApproval: boolean;
  executionEnabled: boolean;
}

export type CampaignEvent =
  | { type: 'RESEARCH_COMPLETE'; artifactId: string }
  | { type: 'QUALIFICATION_PASSED' }
  | { type: 'MATCH_COMPLETE'; artifactId: string }
  | { type: 'DRAFT_COMPLETE'; intelligenceId: string; landingPageSlug?: string }
  | { type: 'QA_PASSED'; evaluationId: string }
  | { type: 'APPROVE' }
  | { type: 'REJECT'; reason: string }
  | { type: 'ENROLL'; sequenceId: string }
  | { type: 'ACTIVATE' }
  | { type: 'REPLY_RECEIVED' }
  | { type: 'MEETING_BOOKED' }
  | { type: 'PAUSE'; reason: string }
  | { type: 'COMPLETE'; reason?: string };

const transitions: Record<CampaignStage, Partial<Record<CampaignEvent['type'], CampaignStage>>> = {
  RESEARCH: { RESEARCH_COMPLETE: 'QUALIFIED' },
  QUALIFIED: { MATCH_COMPLETE: 'MATCHED', PAUSE: 'PAUSED' },
  MATCHED: { DRAFT_COMPLETE: 'DRAFTED', PAUSE: 'PAUSED' },
  DRAFTED: { QA_PASSED: 'QA_PASSED', REJECT: 'BLOCKED', PAUSE: 'PAUSED' },
  QA_PASSED: { APPROVE: 'APPROVED', REJECT: 'BLOCKED' },
  APPROVAL_REQUIRED: { APPROVE: 'APPROVED', REJECT: 'BLOCKED' },
  APPROVED: { ENROLL: 'ENROLLED', PAUSE: 'PAUSED' },
  ENROLLED: { ACTIVATE: 'ACTIVE', PAUSE: 'PAUSED' },
  ACTIVE: { REPLY_RECEIVED: 'REPLIED', MEETING_BOOKED: 'MEETING', PAUSE: 'PAUSED', COMPLETE: 'COMPLETED' },
  REPLIED: { MEETING_BOOKED: 'MEETING', PAUSE: 'PAUSED', COMPLETE: 'COMPLETED' },
  MEETING: { COMPLETE: 'COMPLETED' },
  PAUSED: { APPROVE: 'APPROVED', COMPLETE: 'COMPLETED' },
  COMPLETED: {},
  BLOCKED: {},
};

export function createCampaignState(input: CampaignInput): CampaignState {
  return {
    input,
    stage: 'RESEARCH',
    artifacts: {},
    history: [{ stage: 'RESEARCH', at: new Date().toISOString() }],
    blockers: [],
    requiresHumanApproval: true,
    // The orchestrator is deliberately non-executing until approval and adapter-level checks pass.
    executionEnabled: false,
  };
}

export function transitionCampaign(
  state: CampaignState,
  event: CampaignEvent,
): CampaignState {
  const nextStage = transitions[state.stage]?.[event.type];

  if (!nextStage) {
    throw new Error(`Invalid campaign transition: ${state.stage} + ${event.type}`);
  }

  if (event.type === 'ACTIVATE' && (!state.requiresHumanApproval || !state.executionEnabled)) {
    throw new Error('Campaign activation requires explicit human approval and execution enablement.');
  }

  const next: CampaignState = {
    ...state,
    stage: nextStage,
    history: [...state.history, { stage: nextStage, at: new Date().toISOString(), reason: 'reason' in event ? event.reason : undefined }],
  };

  switch (event.type) {
    case 'RESEARCH_COMPLETE':
      next.artifacts = { ...next.artifacts, researchId: event.artifactId };
      break;
    case 'MATCH_COMPLETE':
      next.artifacts = { ...next.artifacts, intelligenceId: event.artifactId };
      break;
    case 'DRAFT_COMPLETE':
      next.artifacts = { ...next.artifacts, intelligenceId: event.intelligenceId, landingPageSlug: event.landingPageSlug };
      break;
    case 'QA_PASSED':
      next.artifacts = { ...next.artifacts, evaluationId: event.evaluationId };
      next.requiresHumanApproval = true;
      break;
    case 'APPROVE':
      next.requiresHumanApproval = false;
      next.executionEnabled = state.input.mode === 'live';
      break;
    case 'REJECT':
      next.blockers = [...next.blockers, event.reason];
      next.executionEnabled = false;
      break;
    case 'ENROLL':
      next.artifacts = { ...next.artifacts, sequenceId: event.sequenceId };
      break;
    case 'PAUSE':
      next.executionEnabled = false;
      break;
    case 'COMPLETE':
      next.executionEnabled = false;
      break;
  }

  return next;
}

export interface OrchestratorAdapters {
  research: (input: CampaignInput) => Promise<{ artifactId: string }>;
  match: (input: CampaignInput, researchId: string) => Promise<{ artifactId: string }>;
  draft: (input: CampaignInput, matchId: string) => Promise<{ intelligenceId: string; landingPageSlug?: string }>;
  evaluate: (input: CampaignInput, intelligenceId: string) => Promise<{ evaluationId: string; passed: boolean; blockers?: string[] }>;
  enroll?: (input: CampaignInput) => Promise<{ sequenceId: string }>;
  activate?: (input: CampaignInput, sequenceId: string) => Promise<void>;
}

export async function runCampaignDryRun(
  input: CampaignInput,
  adapters: Pick<OrchestratorAdapters, 'research' | 'match' | 'draft' | 'evaluate'>,
): Promise<CampaignState> {
  let state = createCampaignState({ ...input, mode: 'dry-run' });
  const research = await adapters.research(input);
  state = transitionCampaign(state, { type: 'RESEARCH_COMPLETE', artifactId: research.artifactId });
  state = transitionCampaign(state, { type: 'QUALIFICATION_PASSED' });

  const match = await adapters.match(input, research.artifactId);
  state = transitionCampaign(state, { type: 'MATCH_COMPLETE', artifactId: match.artifactId });

  const draft = await adapters.draft(input, match.artifactId);
  state = transitionCampaign(state, {
    type: 'DRAFT_COMPLETE',
    intelligenceId: draft.intelligenceId,
    landingPageSlug: draft.landingPageSlug,
  });

  const evaluation = await adapters.evaluate(input, draft.intelligenceId);
  if (!evaluation.passed) {
    return transitionCampaign(state, {
      type: 'REJECT',
      reason: evaluation.blockers?.join('; ') || 'Outreach evaluation failed.',
    });
  }

  state = transitionCampaign(state, { type: 'QA_PASSED', evaluationId: evaluation.evaluationId });
  return transitionCampaign(state, { type: 'APPROVE' });
}

/**
 * Live execution is intentionally a separate explicit operation.
 * Enrollment and activation must never happen implicitly during orchestration.
 */
export async function executeApprovedCampaign(
  state: CampaignState,
  adapters: Pick<OrchestratorAdapters, 'enroll' | 'activate'>,
): Promise<CampaignState> {
  if (state.stage !== 'APPROVED') {
    throw new Error(`Campaign must be APPROVED before execution; current stage is ${state.stage}.`);
  }
  if (state.input.mode !== 'live' || !state.executionEnabled || state.requiresHumanApproval) {
    throw new Error('Live execution is not enabled for this campaign.');
  }
  if (!adapters.enroll || !adapters.activate) {
    throw new Error('Live Apollo adapters are not configured.');
  }

  const enrollment = await adapters.enroll(state.input);
  const enrolled = transitionCampaign(state, { type: 'ENROLL', sequenceId: enrollment.sequenceId });
  await adapters.activate(enrolled.input, enrollment.sequenceId);
  return transitionCampaign(enrolled, { type: 'ACTIVATE' });
}
