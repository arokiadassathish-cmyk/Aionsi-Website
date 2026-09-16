import type {
  HubSpotAdapter,
  HubSpotCampaignContext,
  HubSpotCompany,
  HubSpotContact,
} from './hubspotAdapter';

export interface HubSpotTransport {
  get<T>(path: string, query?: Record<string, string | string[] | undefined>): Promise<T>;
  patch<T>(path: string, body: Record<string, unknown>): Promise<T>;
}

interface HubSpotApiResponse<T> {
  id?: string;
  properties?: Record<string, string | null>;
  results?: T[];
}

interface HubSpotRawObject {
  id: string;
  properties?: Record<string, string | null>;
}

function value(properties: Record<string, string | null> | undefined, key: string): string | undefined {
  const result = properties?.[key];
  return result == null || result === '' ? undefined : result;
}

function mapContact(raw: HubSpotRawObject): HubSpotContact {
  const p = raw.properties ?? {};
  return {
    id: raw.id,
    email: value(p, 'email'),
    firstName: value(p, 'firstname'),
    lastName: value(p, 'lastname'),
    jobTitle: value(p, 'jobtitle'),
    linkedinUrl: value(p, 'linkedin_url') ?? value(p, 'hs_linkedin_url'),
    city: value(p, 'city'),
    state: value(p, 'state'),
    country: value(p, 'country'),
    companyId: value(p, 'associatedcompanyid'),
    lifecycleStage: value(p, 'lifecyclestage'),
    leadStatus: value(p, 'hs_lead_status'),
    ownerId: value(p, 'hubspot_owner_id'),
    lastContactedAt: value(p, 'notes_last_updated'),
    properties: p,
  };
}

function mapCompany(raw: HubSpotRawObject): HubSpotCompany {
  const p = raw.properties ?? {};
  return {
    id: raw.id,
    name: value(p, 'name') ?? '',
    domain: value(p, 'domain'),
    industry: value(p, 'industry'),
    city: value(p, 'city'),
    state: value(p, 'state'),
    country: value(p, 'country'),
    ownerId: value(p, 'hubspot_owner_id'),
    lifecycleStage: value(p, 'lifecyclestage'),
    properties: p,
  };
}

/**
 * Runtime transport contract for a real HubSpot API/connector implementation.
 * Authentication is deliberately injected by the host application rather than
 * stored in the agent layer.
 */
export function createHubSpotApiAdapter(transport: HubSpotTransport): HubSpotAdapter {
  const companyProperties = [
    'name', 'domain', 'industry', 'city', 'state', 'country',
    'hubspot_owner_id', 'lifecyclestage',
  ];
  const contactProperties = [
    'email', 'firstname', 'lastname', 'jobtitle', 'linkedin_url', 'hs_linkedin_url',
    'city', 'state', 'country', 'associatedcompanyid', 'lifecyclestage',
    'hs_lead_status', 'hubspot_owner_id', 'notes_last_updated',
  ];

  return {
    async getCompany(companyId) {
      const response = await transport.get<HubSpotApiResponse<HubSpotRawObject>>(
        `/crm/v3/objects/companies/${encodeURIComponent(companyId)}`,
        { properties: companyProperties },
      );
      return mapCompany({ id: response.id ?? companyId, properties: response.properties });
    },

    async getContactsForCompany(companyId) {
      const response = await transport.get<HubSpotApiResponse<HubSpotRawObject>>(
        `/crm/v3/objects/companies/${encodeURIComponent(companyId)}/associations/contacts`,
      );
      const ids = (response.results ?? []).map((item) => item.id).filter(Boolean);
      return Promise.all(ids.map((id) => this.getContact(id)));
    },

    async getContact(contactId) {
      const response = await transport.get<HubSpotApiResponse<HubSpotRawObject>>(
        `/crm/v3/objects/contacts/${encodeURIComponent(contactId)}`,
        { properties: contactProperties },
      );
      return mapContact({ id: response.id ?? contactId, properties: response.properties });
    },

    async getCampaignContext(companyId, contactIds) {
      const account = await this.getCompany(companyId);
      const contacts = contactIds?.length
        ? await Promise.all(contactIds.map((id) => this.getContact(id)))
        : await this.getContactsForCompany(companyId);

      return { account, contacts } satisfies HubSpotCampaignContext;
    },

    async updateContact(contactId, properties) {
      await transport.patch(`/crm/v3/objects/contacts/${encodeURIComponent(contactId)}`, {
        properties,
      });
    },

    async updateCompany(companyId, properties) {
      await transport.patch(`/crm/v3/objects/companies/${encodeURIComponent(companyId)}`, {
        properties,
      });
    },
  };
}

/**
 * Minimal fetch-based transport. The runtime supplies the access token and base
 * URL; no secrets are persisted in source control.
 */
export function createHubSpotFetchTransport(config: {
  accessToken: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}): HubSpotTransport {
  const baseUrl = config.baseUrl ?? 'https://api.hubapi.com';
  const fetchImpl = config.fetchImpl ?? fetch;

  return {
    async get<T>(path, query) {
      const url = new URL(`${baseUrl}${path}`);
      Object.entries(query ?? {}).forEach(([key, raw]) => {
        if (raw == null) return;
        for (const value of Array.isArray(raw) ? raw : [raw]) url.searchParams.append(key, value);
      });

      const response = await fetchImpl(url, {
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          Accept: 'application/json',
        },
      });
      if (!response.ok) throw new Error(`HubSpot GET ${path} failed with ${response.status}.`);
      return (await response.json()) as T;
    },

    async patch<T>(path, body) {
      const response = await fetchImpl(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`HubSpot PATCH ${path} failed with ${response.status}.`);
      return (await response.json()) as T;
    },
  };
}
