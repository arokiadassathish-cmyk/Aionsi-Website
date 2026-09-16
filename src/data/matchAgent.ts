export type MatchConfidence = 'high' | 'medium' | 'low';

export interface ResearchSignalInput {
  id: string;
  claim: string;
  sourceUrl: string;
  sourceType: 'company' | 'executive' | 'news' | 'technical' | 'crm' | 'other';
  confidence?: MatchConfidence;
}

export interface AionSiCapability {
  id: string;
  name: string;
  description: string;
  evidenceRefs: string[];
  keywords: string[];
}

export interface CapabilityMatch {
  capabilityId: string;
  capabilityName: string;
  requirement: string;
  matchedSignalIds: string[];
  evidenceRefs: string[];
  confidence: MatchConfidence;
  rationale: string;
}

export interface MatchAgentInput {
  accountId: string;
  companyName: string;
  researchSignals: ResearchSignalInput[];
  capabilities: AionSiCapability[];
  personaTitle?: string;
  personaObjective?: string;
}

export interface MatchAgentOutput {
  accountId: string;
  companyName: string;
  matches: CapabilityMatch[];
  engineeringAngle: string;
  blockers: string[];
  readyForOutreach: boolean;
}

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

export function runMatchAgent(input: MatchAgentInput): MatchAgentOutput {
  const blockers: string[] = [];
  const signals = input.researchSignals.filter((signal) => signal.sourceUrl.trim().length > 0);

  if (!input.accountId.trim()) blockers.push('Missing accountId.');
  if (!input.companyName.trim()) blockers.push('Missing companyName.');
  if (signals.length === 0) blockers.push('No sourced research signals available.');
  if (input.capabilities.length === 0) blockers.push('No AionSi capabilities configured.');

  const matches: CapabilityMatch[] = input.capabilities
    .map((capability) => {
      const capabilityText = normalize([capability.name, capability.description, ...capability.keywords].join(' '));
      const capabilityTerms = capabilityText.split(' ').filter((term) => term.length >= 4);
      const matchedSignals = signals.filter((signal) => {
        const signalText = normalize(signal.claim);
        return capabilityTerms.some((term) => signalText.includes(term));
      });

      if (matchedSignals.length === 0) return null;

      const confidence: MatchConfidence = matchedSignals.length >= 2
        ? 'high'
        : matchedSignals[0]?.confidence ?? 'medium';

      return {
        capabilityId: capability.id,
        capabilityName: capability.name,
        requirement: matchedSignals[0].claim,
        matchedSignalIds: matchedSignals.map((signal) => signal.id),
        evidenceRefs: capability.evidenceRefs,
        confidence,
        rationale: `Matched ${matchedSignals.length} sourced engineering signal${matchedSignals.length === 1 ? '' : 's'} to ${capability.name}.`,
      } satisfies CapabilityMatch;
    })
    .filter((match): match is CapabilityMatch => Boolean(match))
    .sort((a, b) => {
      const rank: Record<MatchConfidence, number> = { high: 3, medium: 2, low: 1 };
      return rank[b.confidence] - rank[a.confidence];
    });

  const topMatches = matches.slice(0, 3);
  const engineeringAngle = topMatches.length > 0
    ? `Explore how AionSi could support ${topMatches.map((match) => match.capabilityName).join(', ')} against the observed engineering signals.`
    : '';

  return {
    accountId: input.accountId,
    companyName: input.companyName,
    matches: topMatches,
    engineeringAngle,
    blockers,
    readyForOutreach: blockers.length === 0 && topMatches.length > 0,
  };
}

export function validateMatchOutput(output: MatchAgentOutput): string[] {
  const errors: string[] = [];
  if (!output.accountId.trim()) errors.push('Match output must retain CRM account identity.');
  if (!output.companyName.trim()) errors.push('Match output must retain company identity.');
  if (output.matches.length > 3) errors.push('Match output must contain at most three capability matches.');
  if (output.matches.some((match) => match.matchedSignalIds.length === 0)) {
    errors.push('Every capability match must reference at least one research signal.');
  }
  if (output.matches.some((match) => match.evidenceRefs.length === 0)) {
    errors.push('Every capability match must include at least one AionSi evidence reference.');
  }
  return errors;
}
