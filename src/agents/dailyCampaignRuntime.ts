import type { HubSpotAdapter } from '../integrations/hubspotAdapter';
import { evaluateOutboundTarget, type TargetAccountCandidate } from '../data/outboundTargetPolicy';
import { runResearchMatchRuntime, type ExternalResearchProvider as ResearchMatchProvider } from './researchMatchRuntime';
import type { MatchAgentOutput } from '../data/matchAgent';
import type { ResearchBrief } from './researchAgent';

export type DailyCampaignItemStatus =
  | 'blocked'
  | 'ready_for_approval'
  | 'approved'
  | 'executed'
  | 'stopped';

export interface DailyCampaignTarget extends TargetAccountCandidate {
  accountId: string;
  contactIds?: string[];
  domain?: string;
  priority?: number;
}

export interface DailyCampaignItem {
  accountId: string;
  accountName: string;
  slug: string;
  status: DailyCampaignItemStatus;
  blockers: string[];
  research?: ResearchBrief;
  match?: MatchAgentOutput;
  createdAt: string;
}

export interface DailyCampaignRunResult {
  runId: string;
  mode: 'dry_run' | 'live';
  startedAt: string;
  completedAt: string;
  items: DailyCampaignItem[];
  summary: {
    targets: number;
    eligible: number;
    blocked: number;
    readyForApproval: number;
    executed: number;
  };
}

export interface DailyCampaignRuntimeOptions {
  now?: () => Date;
  maxTargetsPerRun?: number;
  executeApproved?: (item: DailyCampaignItem) => Promise<void>;
}

/**
 * Daily operational control loop.
 *
 * This runtime deliberately stops at the human approval boundary unless the
 * caller explicitly supplies an execution function and asks for live mode.
 * It never enrolls or activates Apollo contacts by itself.
 */
export async function runDailyCampaign(
  hubspot: HubSpotAdapter,
  researchProvider: ResearchMatchProvider,
  targets: DailyCampaignTarget[],
  options: DailyCampaignRuntimeOptions = {},
  mode: 'dry_run' | 'live' = 'dry_run',
): Promise<DailyCampaignRunResult> {
  const now = options.now ?? (() => new Date());
  const startedAt = now().toISOString();
  const runId = `daily-${startedAt.replace(/[^0-9]/g, '').slice(0, 14)}`;
  const maxTargets = Math.max(1, options.maxTargetsPerRun ?? 25);
  const selected = [...targets]
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
    .slice(0, maxTargets);

  const items: DailyCampaignItem[] = [];

  for (const target of selected) {
    const targetCheck = evaluateOutboundTarget(target);
    if (!targetCheck.eligible) {
      items.push({
        accountId: target.accountId,
        accountName: target.name,
        slug: target.slug,
        status: 'blocked',
        blockers: targetCheck.blockers,
        createdAt: now().toISOString(),
      });
      continue;
    }

    try {
      const result = await runResearchMatchRuntime(hubspot, researchProvider, {
        accountId: target.accountId,
        contactIds: target.contactIds,
        targetSlug: target.slug,
      });

      const item: DailyCampaignItem = {
        accountId: target.accountId,
        accountName: target.name,
        slug: target.slug,
        status: result.eligible ? 'ready_for_approval' : 'blocked',
        blockers: result.blockers,
        research: result.research,
        match: result.match,
        createdAt: now().toISOString(),
      };

      if (mode === 'live' && item.status === 'ready_for_approval' && options.executeApproved) {
        // Explicit approval is represented by the caller invoking this runtime
        // with an already-approved execution function. No implicit approval.
        await options.executeApproved(item);
        item.status = 'executed';
      }

      items.push(item);
    } catch (error) {
      items.push({
        accountId: target.accountId,
        accountName: target.name,
        slug: target.slug,
        status: 'blocked',
        blockers: [error instanceof Error ? error.message : 'Campaign runtime failed for this target.'],
        createdAt: now().toISOString(),
      });
    }
  }

  const completedAt = now().toISOString();
  return {
    runId,
    mode,
    startedAt,
    completedAt,
    items,
    summary: {
      targets: selected.length,
      eligible: items.filter((item) => ['ready_for_approval', 'approved', 'executed'].includes(item.status)).length,
      blocked: items.filter((item) => item.status === 'blocked').length,
      readyForApproval: items.filter((item) => item.status === 'ready_for_approval').length,
      executed: items.filter((item) => item.status === 'executed').length,
    },
  };
}
