/**
 * Accounts that must never be treated as net-new outbound targets.
 * Keep this registry separate from targetAccounts so customer status is
 * explicit and reusable by future research/orchestration gates.
 */
export const existingCustomerSlugs = ['skyechip'] as const;

export const isExistingCustomer = (slug: string): boolean =>
  existingCustomerSlugs.includes(slug as (typeof existingCustomerSlugs)[number]);
