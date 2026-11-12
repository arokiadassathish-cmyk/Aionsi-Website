export const prerender = false;

const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';
const clean = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });

// Lightweight route probe for deployment diagnostics. Never expose the secret itself.
export async function GET() {
  return json({
    ok: true,
    service: 'resource-lead-capture',
    configured: Boolean(process.env.HUBSPOT_PRIVATE_APP_TOKEN),
  });
}

const resources: Record<string, { label: string; source: string }> = {
  'presilicon-checklist': {
    label: 'Pre-Silicon Verification Sign-off Checklist',
    source: 'LinkedIn Ads - Verification Readiness - Pre-Silicon Checklist',
  },
  'pcie-readiness-guide': {
    label: 'PCIe Verification Readiness Guide',
    source: 'LinkedIn Ads - Verification Readiness - PCIe Guide',
  },
};

export async function POST({ request }: { request: Request }) {
  const token = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
  if (!token) return json({ ok: false, message: 'Lead capture is not configured yet. Please email dass.kishore@aionsi.com.' }, 503);

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, message: 'Please submit the form again.' }, 400);
  }

  if (clean(input.website, 200)) return json({ ok: true, ignored: true });

  const firstname = clean(input.firstname, 80);
  const lastname = clean(input.lastname, 80);
  const email = clean(input.email, 254).toLowerCase();
  const company = clean(input.company, 120);
  const jobtitle = clean(input.jobtitle, 120);
  const resourceId = clean(input.resource_id, 80);
  const resource = resources[resourceId];
  const consent = input.consent === 'yes';

  if (!firstname || !lastname || !email || !company || !jobtitle || !resource || !consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ ok: false, message: 'Please complete all required fields and confirm the resource-request consent.' }, 400);
  }

  const optional: Record<string, string> = {
    lead_source_detail: resource.source,
    resource_interest: resource.label,
    resource_campaign: 'verification-readiness-linkedin',
    resource_landing_page_url: clean(input.page_url, 1000),
    hs_analytics_source: 'PAID_SOCIAL',
    utm_source: clean(input.utm_source, 200),
    utm_medium: clean(input.utm_medium, 200),
    utm_campaign: clean(input.utm_campaign, 200),
    utm_content: clean(input.utm_content, 200),
    utm_term: clean(input.utm_term, 200),
  };

  if (input.marketing_consent === 'yes') optional.marketing_opt_in = 'true';

  const properties: Record<string, string> = {
    firstname,
    lastname,
    email,
    company,
    jobtitle,
    lifecyclestage: 'lead',
  };

  try {
    const propertyResponse = await fetch('https://api.hubapi.com/crm/v3/properties/contacts', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (propertyResponse.ok) {
      const propertyData = await propertyResponse.json() as { results?: { name: string }[] };
      const available = new Set((propertyData.results || []).map((property) => property.name));
      for (const [key, value] of Object.entries(optional)) {
        if (available.has(key) && value) properties[key] = value;
      }
    }

    const create = await fetch(HUBSPOT_API, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ properties }),
    });

    if (create.ok) return json({ ok: true }, 201);

    const detail = await create.text();
    if (create.status === 409 || (create.status === 400 && /already exists|duplicate/i.test(detail))) {
      const search = await fetch(`${HUBSPOT_API}/search`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
          properties: ['firstname', 'lastname', 'email', 'company', 'jobtitle'],
          limit: 1,
        }),
      });
      const searchData = await search.json().catch(() => ({})) as { results?: { id: string }[] };
      const id = searchData.results?.[0]?.id;
      if (search.ok && id) {
        const update = await fetch(`${HUBSPOT_API}/${encodeURIComponent(id)}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ properties }),
        });
        if (update.ok) return json({ ok: true, updated: true });
      }
    }

    console.error('HubSpot resource lead capture failed', create.status, detail.slice(0, 500));
    return json({ ok: false, message: 'We could not save your request right now. Please try again or email dass.kishore@aionsi.com.' }, 502);
  } catch (error) {
    console.error('HubSpot resource lead capture request failed', error);
    return json({ ok: false, message: 'We could not save your request right now. Please try again or email dass.kishore@aionsi.com.' }, 502);
  }
}
