const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_API = 'https://api.hubapi.com/crm/v3/objects/contacts';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(value) {
  return String(value ?? '').trim();
}

async function hubspotRequest(options) {
  if (!HUBSPOT_TOKEN) throw new Error('HubSpot integration is not configured.');
  const response = await fetch(HUBSPOT_API, {
    ...options,
    headers: {
      Authorization: `Bearer ${HUBSPOT_TOKEN}`,
      'content-type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload?.message || `HubSpot returned HTTP ${response.status}.`);
  return payload;
}

export const prerender = false;

export async function POST({ request }) {
  try {
    const form = await request.formData();
    const firstName = clean(form.get('firstName'));
    const lastName = clean(form.get('lastName'));
    const email = clean(form.get('businessEmail'));
    const company = clean(form.get('company'));
    const requirement = clean(form.get('engineeringRequirement'));

    if (!firstName || !lastName || !email || !company || !requirement) {
      return json({ message: 'Please complete the required engineering requirement fields.' }, 400);
    }

    const details = [
      `Program / project type: ${clean(form.get('programType'))}`,
      `Protocol / interface: ${clean(form.get('protocolInterface'))}`,
      `Engineering stage: ${clean(form.get('verificationStage'))}`,
      `Primary bottleneck: ${clean(form.get('primaryBottleneck'))}`,
      `Engagement model: ${clean(form.get('engagementModel'))}`,
      `NDA / technical review status: ${clean(form.get('ndaStatus'))}`,
      `Expected timeline: ${clean(form.get('expectedTimeline'))}`,
      `Required engineering capacity: ${clean(form.get('engineeringCapacity'))}`,
      `Engineering requirement: ${requirement}`,
      'Source: AionSi Engineering Discovery website',
    ].filter(Boolean).join('\n');

    const payload = {
      properties: {
        firstname: firstName,
        lastname: lastName,
        email,
        company,
        phone: clean(form.get('phone')),
        jobtitle: clean(form.get('jobTitle')),
        message: details,
        hs_lead_status: 'NEW',
      },
    };

    const created = await hubspotRequest({ method: 'POST', body: JSON.stringify(payload) });
    return json({ success: true, id: created.id, message: 'Engineering requirement submitted successfully.' });
  } catch (error) {
    console.error('Engineering requirement submission failed:', error);
    return json({ message: error instanceof Error ? error.message : 'Unable to submit the engineering requirement.' }, 500);
  }
}
