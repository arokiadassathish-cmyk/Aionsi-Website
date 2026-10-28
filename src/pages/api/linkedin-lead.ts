export const prerender = false;

const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';

const clean = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export async function POST({ request }: { request: Request }) {
  if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    return new Response(JSON.stringify({ message: 'Lead capture is not configured yet. Please email dass.kishore@aionsi.com.' }), {
      status: 503,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }

  let input: Record<string, unknown>;
  try {
    input = await request.json();
  } catch {
    return new Response(JSON.stringify({ message: 'Please submit the form again.' }), { status: 400, headers: { 'content-type': 'application/json; charset=utf-8' } });
  }

  // Honeypot field: silently accept bot submissions without forwarding them.
  if (clean(input.website, 200)) {
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } });
  }

  const firstname = clean(input.firstname, 80);
  const lastname = clean(input.lastname, 80);
  const email = clean(input.email, 254).toLowerCase();
  const company = clean(input.company, 120);
  const jobtitle = clean(input.jobtitle, 120);
  const consent = input.consent === 'yes';

  if (!firstname || !lastname || !email || !company || !jobtitle || !consent || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ message: 'Please complete the required fields and consent checkbox.' }), { status: 400, headers: { 'content-type': 'application/json; charset=utf-8' } });
  }

  const properties: Record<string, string> = {
    firstname,
    lastname,
    email,
    company,
    jobtitle,
    lifecyclestage: 'lead',
    lead_source_detail: 'LinkedIn Ads - Physical Design ODC Landing Page',
    pd_workstream: clean(input.pd_workstream, 120),
    pd_team_size: clean(input.pd_team_size, 80),
    pd_start_timeline: clean(input.pd_start_timeline, 80),
    message: clean(input.message, 2000),
    linkedin_landing_page_url: clean(input.page_url, 1000),
    hs_analytics_source: 'PAID_SOCIAL',
    utm_source: clean(input.utm_source, 200),
    utm_medium: clean(input.utm_medium, 200),
    utm_campaign: clean(input.utm_campaign, 200),
    utm_content: clean(input.utm_content, 200),
    utm_term: clean(input.utm_term, 200),
    li_fat_id: clean(input.li_fat_id, 300),
  };

  // HubSpot requires standard or already-created custom properties.
  // Filter to the guaranteed standard contact properties first; custom campaign/PD fields are included only
  // when an admin has created them in HubSpot to avoid losing a valid lead to an unknown property.
  const standardProperties: Record<string, string> = {
    firstname: properties.firstname,
    lastname: properties.lastname,
    email: properties.email,
    company: properties.company,
    jobtitle: properties.jobtitle,
    lifecyclestage: properties.lifecyclestage,
  };

  const optionalPropertyNames = Object.keys(properties).filter((key) => !(key in standardProperties));
  let propertyNames = optionalPropertyNames;
  try {
    const propertyRes = await fetch('https://api.hubapi.com/crm/v3/properties/contacts', {
      headers: { Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}` },
    });
    if (propertyRes.ok) {
      const propertyData = await propertyRes.json() as { results?: { name: string }[] };
      const available = new Set((propertyData.results || []).map((prop) => prop.name));
      propertyNames = optionalPropertyNames.filter((name) => available.has(name));
    } else {
      propertyNames = [];
    }
  } catch {
    propertyNames = [];
  }

  for (const key of propertyNames) {
    if (properties[key]) standardProperties[key] = properties[key];
  }

  const payload = { properties: standardProperties };
  try {
    const hubspotRes = await fetch(HUBSPOT_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!hubspotRes.ok) {
      const detail = await hubspotRes.text();
      // Handle existing contacts explicitly so repeat campaign leads can be updated instead of discarded.
      if (hubspotRes.status === 409 || (hubspotRes.status === 400 && /already exists|duplicate/i.test(detail))) {
        const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
            properties: ['firstname', 'lastname', 'email', 'company', 'jobtitle'],
            limit: 1,
          }),
        });
        const searchBody = await searchRes.json().catch(() => ({})) as { results?: { id: string }[] };
        const existingId = searchBody.results?.[0]?.id;
        if (searchRes.ok && existingId) {
          const updateRes = await fetch(`${HUBSPOT_API}/${encodeURIComponent(existingId)}`, {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${process.env.HUBSPOT_PRIVATE_APP_TOKEN}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          if (updateRes.ok) {
            return new Response(JSON.stringify({ ok: true, updated: true }), { status: 200, headers: { 'content-type': 'application/json; charset=utf-8' } });
          }
        }
      }
      console.error('HubSpot lead upsert failed', hubspotRes.status, detail.slice(0, 500));
      return new Response(JSON.stringify({ message: 'We could not save your enquiry right now. Please try again or email dass.kishore@aionsi.com.' }), { status: 502, headers: { 'content-type': 'application/json; charset=utf-8' } });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (error) {
    console.error('HubSpot lead capture request failed', error);
    return new Response(JSON.stringify({ message: 'We could not save your enquiry right now. Please try again or email dass.kishore@aionsi.com.' }), { status: 502, headers: { 'content-type': 'application/json; charset=utf-8' } });
  }
}
