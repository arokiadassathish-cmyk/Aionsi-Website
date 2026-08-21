const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HUBSPOT_BASE = 'https://api.hubapi.com';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

function clean(value) {
  return String(value ?? '').trim();
}

async function hubspotRequest(path, options = {}) {
  if (!HUBSPOT_TOKEN) throw new Error('HubSpot integration is not configured.');
  const response = await fetch(`${HUBSPOT_BASE}${path}`, {
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

async function readRequest(request) {
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) return await request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export const prerender = false;

export async function POST({ request }) {
  try {
    const data = await readRequest(request);
    const firstName = clean(data.firstName);
    const lastName = clean(data.lastName);
    const email = clean(data.businessEmail).toLowerCase();
    const company = clean(data.company);
    const requirement = clean(data.engineeringRequirement);

    if (!firstName || !lastName || !email || !company || !requirement) {
      return json({ message: 'Please complete the required engineering requirement fields.' }, 400);
    }

    const details = [
      `Program / project type: ${clean(data.programType)}`,
      `Protocol / interface: ${clean(data.protocolInterface)}`,
      `Engineering stage: ${clean(data.verificationStage)}`,
      `Primary bottleneck: ${clean(data.primaryBottleneck)}`,
      `Engagement model: ${clean(data.engagementModel)}`,
      `NDA / technical review status: ${clean(data.ndaStatus)}`,
      `Expected timeline: ${clean(data.expectedTimeline)}`,
      `Required engineering capacity: ${clean(data.engineeringCapacity)}`,
      `Engineering requirement: ${requirement}`,
      'Source: AionSi Engineering Discovery website',
    ].join('\n');

    const properties = {
      firstname: firstName,
      lastname: lastName,
      email,
      company,
      ...(clean(data.phone) ? { phone: clean(data.phone) } : {}),
      ...(clean(data.jobTitle) ? { jobtitle: clean(data.jobTitle) } : {}),
      hs_lead_status: 'NEW',
    };

    const search = await hubspotRequest('/crm/v3/objects/contacts/search', {
      method: 'POST',
      body: JSON.stringify({
        filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }],
        properties: ['firstname', 'lastname', 'email', 'company', 'phone', 'jobtitle', 'hs_lead_status'],
        limit: 1,
      }),
    });

    let contact;
    if (search.results?.[0]?.id) {
      contact = await hubspotRequest(`/crm/v3/objects/contacts/${search.results[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify({ properties }),
      });
    } else {
      contact = await hubspotRequest('/crm/v3/objects/contacts', {
        method: 'POST',
        body: JSON.stringify({ properties }),
      });
    }

    let noteCreated = true;
    try {
      await hubspotRequest('/crm/v3/objects/notes', {
        method: 'POST',
        body: JSON.stringify({
          properties: {
            hs_timestamp: new Date().toISOString(),
            hs_note_body: details.replace(/\n/g, '<br>'),
          },
          associations: [{
            to: { id: contact.id },
            types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }],
          }],
        }),
      });
    } catch (noteError) {
      noteCreated = false;
      console.error('HubSpot contact saved but requirement note creation failed:', noteError);
    }

    return json({
      success: true,
      id: contact.id,
      noteCreated,
      message: noteCreated
        ? 'Engineering requirement submitted successfully.'
        : 'Engineering requirement received. The contact was saved, but the detailed requirement note could not be attached.',
    });
  } catch (error) {
    console.error('Engineering requirement submission failed:', error);
    return json({ message: error instanceof Error ? error.message : 'Unable to submit the engineering requirement.' }, 500);
  }
}
