import type { HubSpotCampaignContext } from '../integrations/hubspotAdapter';

export type ResearchSourceType = 'hubspot' | 'company-site' | 'public-web' | 'linkedin' | 'other';

export interface ResearchSignal {
  id: string;
  claim: string;
  sourceUrl: string;
  sourceType: ResearchSourceType;
  observedAt?: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface DecisionMakerResearch {
  contactId: string;
  name?: string;
  title?: string;
  roleRelevance: string;
  signals: ResearchSignal[];
}

export interface ResearchBrief {
  researchId: string;
  accountId: string;
  companyName: string;
  domain?: string;
  geography?: string;
  engineeringThemes: string[];
  signals: ResearchSignal[];
  decisionMakers: DecisionMakerResearch[];
  crmContextUsed: boolean;
  blockers: string[];
}

export interface ResearchAgentInput {
  context: HubSpotCampaignContext;
  contactIds?: string[];
  externalResearch?: ResearchSignal[];
}

export interface ResearchAgent {
  run(input: ResearchAgentInput): Promise<ResearchBrief>;
}

function geographyFor(context: HubSpotCampaignContext): string | undefined {
  const { city, state, country } = context.account;
  return [city, state, country].filter(Boolean).join(', ') || undefined;
}

/**
 * Creates a deterministic research brief from CRM context plus explicitly supplied
 * external evidence. External browsing/search is intentionally injected so the
 * agent cannot silently invent research or sources.
 */
export function createResearchAgent(): ResearchAgent {
  return {
    async run(input) {
      const { context, contactIds, externalResearch = [] } = input;
      const selected = contactIds?.length
        ? context.contacts.filter((contact) => contactIds.includes(contact.id))
        : context.contacts;

      const blockers: string[] = [];
      if (!context.account.id || !context.account.name) {
        blockers.push('Account identity is incomplete.');
      }
      if (selected.length === 0) {
        blockers.push('No selected contacts are available for research.');
      }

      const signals: ResearchSignal[] = [
        ...externalResearch,
        {
          id: `hubspot-company-${context.account.id}`,
          claim: `${context.account.name} is represented in HubSpot as a target account.`,
          sourceUrl: `hubspot://company/${context.account.id}`,
          sourceType: 'hubspot',
          confidence: 'high',
        },
      ];

      return {
        researchId: `research-${context.account.id}-${Date.now()}`,
        accountId: context.account.id,
        companyName: context.account.name,
        domain: context.account.domain,
        geography: geographyFor(context),
        engineeringThemes: [],
        signals,
        decisionMakers: selected.map((contact) => ({
          contactId: contact.id,
          name: [contact.firstName, contact.lastName].filter(Boolean).join(' ') || undefined,
          title: contact.jobTitle,
          roleRelevance: contact.jobTitle
            ? `CRM-listed role: ${contact.jobTitle}`
            : 'Role relevance requires external evidence.',
          signals: [],
        })),
        crmContextUsed: true,
        blockers,
      };
    },
  };
}
