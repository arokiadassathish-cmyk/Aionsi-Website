import { existingCustomerSlugs } from './existingCustomers';

export interface TargetAccountRecord {
  slug: string;
  name: string;
  status: 'prospect' | 'existing-customer';
}

/** Canonical outbound eligibility view. Existing customers are never prospects. */
export const targetAccountRegistry: TargetAccountRecord[] = [
  { slug: 'skyechip', name: 'SkyeChip', status: 'existing-customer' },
];

export const netNewTargetAccounts = targetAccountRegistry.filter(
  (account) => !existingCustomerSlugs.includes(account.slug as (typeof existingCustomerSlugs)[number]),
);
