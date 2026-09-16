import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { createHubSpotCampaignContextProvider } from '../integrations/crmCampaignContext';
import { runMatchAgent, validateMatchOutput, type AionSiCapability, type MatchAgentOutput } from '../data/matchAgent';
import { aionSiMatchCapabilities } from '../data/matchAgentConfig';
import { evaluateOutboundTarget } from '../data/outboundTargetPolicy';
import { createResearchAgent, type ResearchBrief, type ResearchSignal } from './researchAgent';

export interface ExternalResearchProvider {
  collect(input: {
    companyName: string;
    domain?: string;
    geography?: string;
    contactIds: string[];
  }): Promise<ResearchSignal[]>;
}

export interface ResearchMatchRuntimeInput {
  accountId: string;
  contactIds?: string[];
  targetSlug?: string;
  capabilities?: AionSiCapability[];
}

export interface ResearchMatchRuntimeResult {
  eligible: boolean;
  blockers: string[];
  research?: ResearchBrief;
  match?: MatchAgentOutput;
}

/**
 * Production composition boundary for the Research -> Match path.
 *
 * Order is intentional:
 * 1. Net-new target gate
 * 2. HubSpot CRM context
 * 3. External evidence collection
 * 4. Research brief composition
 * 5. Deterministic AionSi capability matching
 * 6. Output validation
 *
 * This function never sends email, enrolls Apollo contacts, or mutates CRM.
 */
export async function runResearchMatchRuntime(
  hubspot: HubSpotAdapter,
  researchProvider: ExternalResearchProvider,
  input: ResearchMatchRuntimeInput,
): Promise<ResearchMatchRuntimeResult> {
  const provider = createHubSpotCampaignContextProvider(hubspot);
  const context = await provider.load({
    accountId: input.accountId,
    contactIds: input.contactIds,
  });

  const targetCheck = evaluateOutboundTarget({
    slug: input.targetSlug ?? context.account.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    name: context.account.name,
  });

  if (!targetCheck.eligible) {
    return { eligible: false, blockers: targetCheck.blockers };
  }

  const selectedContactIds = input.contactIds?.length
    ? input.contactIds
    : context.contacts.map((contact) => contact.id);

  const externalResearch = await researchProvider.collect({
    companyName: context.account.name,
    domain: context.account.domain,
    geography: [context.account.city, context.account.state, context.account.country].filter(Boolean).join(', ') || undefined,
    contactIds: selectedContactIds,
  });

  const research = await createResearchAgent().run({
    context,
    contactIds: selectedContactIds,
    externalResearch,
  });

  if (research.blockers.length > 0) {
    return { eligible: false, blockers: research.blockers, research };
  }

  const match = runMatchAgent({
    accountId: research.accountId,
    companyName: research.companyName,
    researchSignals: research.signals.map((signal) => ({
      id: signal.id,
      claim: signal.claim,
      sourceUrl: signal.sourceUrl,
      sourceType: signal.sourceType === 'company-site' ? 'company' : signal.sourceType === 'linkedin' ? 'executive' : signal.sourceType === 'public-web' ? 'news' : signal.sourceType === 'hubspot' ? 'crm' : 'other',
      confidence: signal.confidence,
    })),
    capabilities: input.capabilities ?? aionSiMatchCapabilities,
    personaTitle: context.contacts[0]?.jobTitle,
  });

  const validationErrors = validateMatchOutput(match);
  const blockers = [...match.blockers, ...validationErrors];

  return {
    eligible: blockers.length === 0 && match.readyForOutreach,
    blockers,
    research,
    match,
  };
}
