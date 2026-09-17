import { targetAccounts, type TargetAccount } from '../data/targetAccounts';

export interface ConfiguredTargetAccount {
  accountId: string;
  name?: string;
  slug: string;
  domain?: string;
  contactIds?: string[];
  priority?: number;
}

export interface ResolvedTargetAccount extends ConfiguredTargetAccount {
  name: string;
  registry: TargetAccount;
}

const registryBySlug = new Map(targetAccounts.map((account) => [account.slug, account]));

export function getAionSiTargetAccountRegistry(): readonly TargetAccount[] {
  return targetAccounts;
}

export function resolveConfiguredTargetAccount(target: ConfiguredTargetAccount): ResolvedTargetAccount {
  const slug = target.slug.trim();
  const registry = registryBySlug.get(slug);
  if (!slug) throw new Error('Configured campaign target is missing slug.');
  if (!registry) throw new Error(`Configured campaign target slug is not present in AionSi target-account registry: ${slug}`);
  if (!target.accountId.trim()) throw new Error(`Configured campaign target ${slug} is missing a HubSpot accountId.`);
  return { ...target, slug, name: registry.name, registry };
}

export function resolveConfiguredTargetAccounts(targets: ConfiguredTargetAccount[]): ResolvedTargetAccount[] {
  return targets.map(resolveConfiguredTargetAccount);
}

export function parseConfiguredTargetAccounts(raw: string | undefined): ConfiguredTargetAccount[] {
  if (!raw?.trim()) throw new Error('AIONSI_DAILY_TARGETS_JSON is not configured.');
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('AIONSI_DAILY_TARGETS_JSON must contain valid JSON.');
  }
  if (!Array.isArray(parsed)) throw new Error('AIONSI_DAILY_TARGETS_JSON must be a JSON array.');
  return parsed.map((item, index) => {
    if (!item || typeof item !== 'object') throw new Error(`AIONSI_DAILY_TARGETS_JSON item ${index + 1} must be an object.`);
    const candidate = item as Record<string, unknown>;
    const accountId = typeof candidate.accountId === 'string' ? candidate.accountId.trim() : '';
    const slug = typeof candidate.slug === 'string' ? candidate.slug.trim() : '';
    if (!accountId || !slug) throw new Error(`AIONSI_DAILY_TARGETS_JSON item ${index + 1} requires accountId and slug.`);
    const contactIds = Array.isArray(candidate.contactIds)
      ? candidate.contactIds.filter((value): value is string => typeof value === 'string').map((value) => value.trim()).filter(Boolean)
      : undefined;
    return {
      accountId,
      name: typeof candidate.name === 'string' ? candidate.name.trim() || undefined : undefined,
      slug,
      domain: typeof candidate.domain === 'string' ? candidate.domain.trim() || undefined : undefined,
      contactIds,
      priority: typeof candidate.priority === 'number' && Number.isFinite(candidate.priority) ? candidate.priority : undefined,
    };
  });
}
