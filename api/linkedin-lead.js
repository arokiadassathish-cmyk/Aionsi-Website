const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';
const clean = (value, max = 500) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const json = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

async function handlePost(request) {
  const token = typeof process !== 'undefined' ? process.env?.HUBSPOT_PRIVATE_APP_TOKEN : '';
  if (!token) return json({ message: 'Lead capture is not configured yet. Please email dass.kishore@aionsi.com.' }, 503);
  let input;
  try { input = await request.json(); } catch { return json({ message: 'Please submit the form again.' }, 400); }
  if (clean(input.website, 200)) return json({ ok: true });
  const firstname = clean(input.firstname, 80);
  const lastname = clean(input.lastname, 80);
  const email = clean(input.email, 254).toLowerCase();
  const company = clean(input.company, 120);
  const jobtitle = clean(input.jobtitle, 120);
  const consent = input.consent === 'yes';
  if (!firstname || !lastname || !email || !company || !jobtitle || !consent || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) return json({ message: 'Please complete the required fields and consent checkbox.' }, 400);

  const properties = {
    firstname, lastname, email, company, jobtitle, lifecyclestage: 'lead',
    lead_source_detail: 'LinkedIn Ads - Physical Design ODC Landing Page',
    pd_workstream: clean(input.pd_workstream, 120), pd_team_size: clean(input.pd_team_size, 80),
    pd_start_timeline: clean(input.pd_start_timeline, 80), message: clean(input.message, 2000),
    linkedin_landing_page_url: clean(input.page_url, 1000), hs_analytics_source: 'PAID_SOCIAL',
    utm_source: clean(input.utm_source, 200), utm_medium: clean(input.utm_medium, 200),
    utm_campaign: clean(input.utm_campaign, 200), utm_content: clean(input.utm_content, 200),
    utm_term: clean(input.utm_term, 200), li_fat_id: clean(input.li_fat_id, 300),
  };
  const payloadProperties = { firstname, lastname, email, company, jobtitle, lifecyclestage: 'lead' };
  const optionalNames = Object.keys(properties).filter((key) => !(key in payloadProperties));
  try {
    const propertyRes = await fetch('https://api.hubapi.com/crm/v3/properties/contacts', { headers: { Authorization: `Bearer ${token}` } });
    if (propertyRes.ok) {
      const propertyData = await propertyRes.json();
      const available = new Set((propertyData.results || []).map((prop) => prop.name));
      for (const key of optionalNames) if (available.has(key) && properties[key]) payloadProperties[key] = properties[key];
    }
  } catch { /* Standard contact fields remain sufficient for capture. */ }

  const payload = { properties: payloadProperties };
  try {
    const hubspotRes = await fetch(HUBSPOT_API, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    if (hubspotRes.ok) return json({ ok: true }, 201);
    const detail = await hubspotRes.text();
    if (hubspotRes.status === 409 || (hubspotRes.status === 400 && /already exists|duplicate/i.test(detail))) {
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }], properties: ['firstname', 'lastname', 'email', 'company', 'jobtitle'], limit: 1 }) });
      const searchBody = await searchRes.json().catch(() => ({}));
      const existingId = searchBody.results?.[0]?.id;
      if (searchRes.ok && existingId) {
        const updateRes = await fetch(`${HUBSPOT_API}/${encodeURIComponent(existingId)}`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (updateRes.ok) return json({ ok: true, updated: true });
      }
    }
    console.error('HubSpot LinkedIn lead capture failed', hubspotRes.status, detail.slice(0, 500));
    return json({ message: 'We could not save your enquiry right now. Please try again or email dass.kishore@aionsi.com.' }, 502);
  } catch (error) {
    console.error('HubSpot LinkedIn lead capture request failed', error);
    return json({ message: 'We could not save your enquiry right now. Please try again or email dass.kishore@aionsi.com.' }, 502);
  }
}

export default { fetch(request) { if (request.method === 'POST') return handlePost(request); return json({ message: 'Method not allowed.' }, 405); } };
