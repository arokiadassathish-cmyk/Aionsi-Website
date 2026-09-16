import type {
  CapabilityMatch,
  EvidenceSignal,
  OutreachEvaluation,
  OutreachIntelligence,
} from './outreachIntelligence';

export type AgentStatus = 'ready' | 'blocked' | 'needs_review';

export interface AgentRunContext {
  account: {
    company: string;
    domain: string;
    region?: string;
    recentSignals?: EvidenceSignal[];
  };
  contact: {
    name: string;
    title: string;
    linkedinUrl?: string;
  };
  campaign: {
    goal: string;
    meetingMode: 'in-person' | 'video' | 'flexible';
    landingPageSlug: string;
  };
}

export interface ResearchAgentOutput {
  status: AgentStatus;
  accountSignals: EvidenceSignal[];
  researchNotes: string[];
  blockers: string[];
}

export interface OutreachAgentOutput {
  status: AgentStatus;
  intelligence: OutreachIntelligence;
  subject: string;
  email: string;
  landingPageSlug: string;
  evaluation?: OutreachEvaluation;
  blockers: string[];
}

export interface FollowUpAgentOutput {
  status: AgentStatus;
  step: 'day-3' | 'day-7';
  subject: string;
  email: string;
  stopReason?:
    | 'replied'
    | 'positive-reply'
    | 'negative-reply'
    | 'meeting-booked'
    | 'out-of-office'
    | 'unsubscribe'
    | 'bounce'
    | 'manual-stop';
}

export interface OutboundAgentSystem {
  research: {
    name: 'Research Agent';
    purpose: string;
    platformInputs: string[];
    output: string[];
  };
  outreach: {
    name: 'Outreach Intelligence Agent';
    purpose: string;
    platformInputs: string[];
    output: string[];
  };
  followUp: {
    name: 'Follow-up Agent';
    purpose: string;
    platformInputs: string[];
    output: string[];
  };
}

export const outboundAgentSystem: OutboundAgentSystem = {
  research: {
    name: 'Research Agent',
    purpose:
      'Build an evidence-backed account and persona brief without inventing missing contact or program information.',
    platformInputs: ['Apollo enrichment', 'HubSpot CRM context', 'public web research'],
    output: ['account signals', 'persona context', 'source-backed research notes'],
  },
  outreach: {
    name: 'Outreach Intelligence Agent',
    purpose:
      'Turn verified research into a concise, company-specific first email and matching collaboration page.',
    platformInputs: ['Research Agent output', 'AionSi capability library', 'landing-page data model'],
    output: ['personalized email', '1–3 capability matches', 'landing-page payload', 'pre-send evaluation'],
  },
  followUp: {
    name: 'Follow-up Agent',
    purpose:
      'Handle day-3 and day-7 follow-ups while stopping automatically when the prospect has replied or should no longer be contacted.',
    platformInputs: ['Apollo sequence state', 'reply/engagement state', 'HubSpot activity context', 'original outreach package'],
    output: ['day-3 follow-up', 'day-7 follow-up', 'stop/continue decision'],
  },
};

export function shouldContinueFollowUp(input: {
  hasReply: boolean;
  replyCategory?: FollowUpAgentOutput['stopReason'];
  bounced: boolean;
  unsubscribed: boolean;
  meetingBooked: boolean;
}): boolean {
  if (input.hasReply || input.bounced || input.unsubscribed || input.meetingBooked) return false;
  if (input.replyCategory && input.replyCategory !== 'out-of-office') return false;
  return true;
}

export function buildFollowUp(input: {
  step: 'day-3' | 'day-7';
  contactName: string;
  company: string;
  capability: CapabilityMatch;
  landingPageUrl: string;
}): FollowUpAgentOutput {
  if (input.step === 'day-3') {
    return {
      status: 'ready',
      step: 'day-3',
      subject: 'Re: engineering support for {{company}}',
      email: `Hi ${input.contactName},\n\nJust following up on my note about supporting ${input.company} around ${input.capability.capability}.\n\nIf this is relevant to a current engineering milestone, I can share a short outline of how we would structure a bounded work package.\n\n${input.landingPageUrl}\n\nBest,\nDass`,
    };
  }

  return {
    status: 'ready',
    step: 'day-7',
    subject: 'Re: engineering support for {{company}}',
    email: `Hi ${input.contactName},\n\nOne last note from me. If additional ${input.capability.capability.toLowerCase()} capacity becomes useful for a defined milestone at ${input.company}, we can start with a small, clearly scoped workstream and work alongside the existing team.\n\n${input.landingPageUrl}\n\nBest,\nDass`,
  };
}
