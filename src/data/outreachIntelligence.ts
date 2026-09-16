export type Confidence = 'high' | 'medium' | 'low';
export type EvidenceRelevance = 'direct' | 'supporting' | 'weak';

export interface EvidenceSignal {
  claim: string;
  sourceUrl: string;
  sourceDate?: string;
  confidence: Confidence;
  relevance: EvidenceRelevance;
}

export interface PersonaBrief {
  contactName: string;
  title: string;
  objective: string;
  angle: string;
  confidence: Confidence;
}

export interface CapabilityMatch {
  capability: string;
  accountSignal: string;
  reason: string;
  evidence: string[];
  confidence: Confidence;
}

export interface OutreachIntelligence {
  company: string;
  domain: string;
  region?: string;
  contact: {
    name: string;
    title: string;
    linkedinUrl?: string;
  };
  accountSignals: EvidenceSignal[];
  persona: PersonaBrief;
  capabilityMatches: CapabilityMatch[];
  landingPage: {
    slug: string;
    meetingMode: 'in-person' | 'video' | 'flexible';
  };
}

export interface OutreachEvaluation {
  accountRelevance: boolean;
  personaRelevance: boolean;
  evidenceSupported: boolean;
  companySpecific: boolean;
  concise: boolean;
  lowPressure: boolean;
  capabilityFit: boolean;
  singleCta: boolean;
  noUnsupportedClaims: boolean;
  landingPageAligned: boolean;
  passed: boolean;
}

export function evaluateOutreach(input: {
  emailWordCount: number;
  intelligence: OutreachIntelligence;
  email: string;
  landingPageText: string;
  ctaCount: number;
}): OutreachEvaluation {
  const lowerEmail = input.email.toLowerCase();
  const accountRelevance = input.intelligence.accountSignals.some(
    (signal) => signal.confidence !== 'low' && signal.relevance !== 'weak',
  );
  const personaRelevance = Boolean(input.intelligence.persona.objective && input.intelligence.persona.angle);
  const evidenceSupported = input.intelligence.accountSignals.every((signal) => Boolean(signal.sourceUrl));
  const companySpecific = lowerEmail.includes(input.intelligence.company.toLowerCase());
  const concise = input.emailWordCount >= 80 && input.emailWordCount <= 190;
  const lowPressure = !/(act now|limited time|exclusive offer|guaranteed|revolutionary|industry-leading)/i.test(input.email);
  const capabilityFit = input.intelligence.capabilityMatches.length >= 1 && input.intelligence.capabilityMatches.length <= 3;
  const singleCta = input.ctaCount === 1;
  const noUnsupportedClaims = !/(our customer|already working with|approved partner|active program)/i.test(input.email);
  const landingPageAligned =
    input.landingPageText.toLowerCase().includes(input.intelligence.company.toLowerCase()) &&
    input.intelligence.capabilityMatches.some((match) => input.landingPageText.toLowerCase().includes(match.capability.toLowerCase()));

  const passed = [
    accountRelevance,
    personaRelevance,
    evidenceSupported,
    companySpecific,
    concise,
    lowPressure,
    capabilityFit,
    singleCta,
    noUnsupportedClaims,
    landingPageAligned,
  ].every(Boolean);

  return {
    accountRelevance,
    personaRelevance,
    evidenceSupported,
    companySpecific,
    concise,
    lowPressure,
    capabilityFit,
    singleCta,
    noUnsupportedClaims,
    landingPageAligned,
    passed,
  };
}
