export type HubSpotObjectType = 'contact' | 'company' | 'deal' | 'ticket';

export interface HubSpotContact {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  city?: string;
  state?: string;
  country?: string;
  companyId?: string;
  lifecycleStage?: string;
  leadStatus?: string;
  ownerId?: string;
  lastContactedAt?: string;
  properties: Record<string, string | null>;
}

export interface HubSpotCompany {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  city?: string;
  state?: string;
  country?: string;
  ownerId?: string;
  lifecycleStage?: string;
  properties: Record<string, string | null>;
}

export interface HubSpotCampaignContext {
  account: HubSpotCompany;
  contacts: HubSpotContact[];
  priorOutreach?: Array<{
    contactId: string;
    occurredAt: string;
    channel: 'email' | 'linkedin' | 'call' | 'other';
    outcome?: string;
    summary?: string;
  }>;
}

export interface HubSpotAdapter {
  getCompany(companyId: string): Promise<HubSpotCompany>;
  getContactsForCompany(companyId: string): Promise<HubSpotContact[]>;
  getContact(contactId: string): Promise<HubSpotContact>;
  getCampaignContext(companyId: string, contactIds?: string[]): Promise<HubSpotCampaignContext>;

  updateContact(contactId: string, properties: Record<string, string | null>): Promise<void>;
  updateCompany(companyId: string, properties: Record<string, string | null>): Promise<void>;
}

/**
 * Deliberately transport-agnostic adapter boundary.
 * A runtime implementation can use the HubSpot connector/API without coupling
 * agent code to HTTP details or credentials.
 */
export class HubSpotNotConfiguredError extends Error {
  constructor(message = 'HubSpot adapter is not configured for runtime execution.') {
    super(message);
    this.name = 'HubSpotNotConfiguredError';
  }
}

export function createUnconfiguredHubSpotAdapter(): HubSpotAdapter {
  const fail = async (): Promise<never> => {
    throw new HubSpotNotConfiguredError();
  };

  return {
    getCompany: fail,
    getContactsForCompany: fail,
    getContact: fail,
    getCampaignContext: fail,
    updateContact: fail,
    updateCompany: fail,
  };
}
