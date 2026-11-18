const LEADS_TABLE = 'website_leads';
const NOTIFICATION_TO = 'dass.kishore@aionsi.com';

type LeadInput = Record<string, unknown>;

const clean = (value: unknown, max = 500): string =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] || character);

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  try {
    const host = new URL(origin).hostname.toLowerCase();
    return host === 'aionsi.com' || host === 'www.aionsi.com' ||
      host === 'localhost' || host === '127.0.0.1' || host.endsWith('.vercel.app');
  } catch {
    return false;
  }
}

async function sendNotification(lead: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEADS_FROM_EMAIL?.trim();
  if (!apiKey || !from) return { status: 'pending' as const };

  const rows = [
    ['Name', clean(lead.full_name)],
    ['Email', clean(lead.email)],
    ['Company', clean(lead.company)],
    ['Job title', clean(lead.job_title)],
    ['Phone', clean(lead.phone)],
    ['Lead source', clean(lead.lead_source)],
    ['Resource', clean(lead.resource_slug)],
    ['Message', clean(lead.message, 10000)],
    ['Created at', clean(lead.created_at)],
  ];
  const html = rows
    .filter(([, value]) => value)
    .map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br />${escapeHtml(value).replace(/\n/g, '<br />')}</p>`)
    .join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [NOTIFICATION_TO],
      subject: `New AionSi website enquiry — ${clean(lead.company) || clean(lead.full_name)}`,
      html: `<h2>New AionSi website lead</h2>${html}<p><small>Lead ID: ${escapeHtml(clean(lead.id))}</small></p>`,
      reply_to: clean(lead.email),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error('Resend lead notification failed', response.status, detail.slice(0, 400));
    return { status: 'failed' as const };
  }
  const result = await response.json().catch(() => ({})) as { id?: string };
  return { status: 'sent' as const, messageId: result.id || null };
}

async function updateNotificationStatus(id: string, status: 'sent' | 'failed') {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  const patch: Record<string, unknown> = {
    email_notification_status: status,
    notification_attempts: 1,
    email_sent_at: status === 'sent' ? new Date().toISOString() : null,
    email_last_error: status === 'failed' ? 'Resend delivery failed; retry required.' : null,
  };
  const response = await fetch(`${url}/rest/v1/${LEADS_TABLE}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(patch),
  });
  if (!response.ok) {
    const detail = await response.text();
    console.error('Could not update lead notification status', response.status, detail.slice(0, 300));
  }
}

export async function captureLead(request: Request, input: LeadInput, defaults: {
  source: string;
  requireConsent?: boolean;
  resourceSlug?: string;
}) {
  if (!isAllowedOrigin(request)) return json({ ok: false, message: 'Request origin is not allowed.' }, 403);

  // Honeypot: accept silently, but do not store or notify.
  if (clean(input.website, 200)) return json({ ok: true }, 200);

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  if (!url || !key) {
    return json({ ok: false, message: 'Lead capture is being configured. Please email dass.kishore@aionsi.com.' }, 503);
  }

  const firstName = clean(input.firstname ?? input.firstName, 100);
  const lastName = clean(input.lastname ?? input.lastName, 100);
  const fullName = clean(input.full_name, 180) || [firstName, lastName].filter(Boolean).join(' ');
  const email = clean(input.email ?? input.businessEmail, 254).toLowerCase();
  const company = clean(input.company, 200);
  const jobTitle = clean(input.jobtitle ?? input.jobTitle, 160);
  const consent = input.consent === true || input.consent === 'yes';
  const requireConsent = defaults.requireConsent ?? true;

  if (!fullName || fullName.length < 2 || !email || !isValidEmail(email) ||
      (requireConsent && !consent)) {
    return json({ ok: false, message: 'Please provide your name, a valid business email and the required consent.' }, 400);
  }

  const message = clean(input.message ?? input.requirementSummary, 10000);
  const metadata = {
    program_type: clean(input.programType, 160),
    protocol_interface: clean(input.protocolInterface, 160),
    verification_stage: clean(input.verificationStage, 160),
    primary_bottleneck: clean(input.primaryBottleneck, 200),
    engagement_model: clean(input.engagementModel, 160),
    nda_status: clean(input.ndaStatus, 160),
    pd_workstream: clean(input.pd_workstream, 160),
    pd_team_size: clean(input.pd_team_size, 100),
    pd_start_timeline: clean(input.pd_start_timeline, 100),
    page_url: clean(input.page_url, 1000),
    utm_source: clean(input.utm_source, 200),
    utm_medium: clean(input.utm_medium, 200),
    utm_campaign: clean(input.utm_campaign, 200),
    utm_content: clean(input.utm_content, 200),
    utm_term: clean(input.utm_term, 200),
    li_fat_id: clean(input.li_fat_id, 300),
    marketing_consent: input.marketing_consent === true || input.marketing_consent === 'yes',
  };

  const lead = {
    full_name: fullName,
    email,
    company: company || null,
    job_title: jobTitle || null,
    phone: clean(input.phone, 40) || null,
    lead_source: clean(input.lead_source, 80) || defaults.source,
    resource_slug: clean(input.resource_id, 160) || defaults.resourceSlug || null,
    message: message || null,
    consent,
    metadata,
  };

  let saved: { id: string; created_at: string };
  try {
    const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${LEADS_TABLE}`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(lead),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !Array.isArray(result) || !result[0]?.id) {
      console.error('Supabase lead insert failed', response.status, JSON.stringify(result).slice(0, 500));
      return json({ ok: false, message: 'We could not save your enquiry. Please try again or email dass.kishore@aionsi.com.' }, 502);
    }
    saved = result[0] as { id: string; created_at: string };
  } catch (error) {
    console.error('Supabase lead capture request failed', error);
    return json({ ok: false, message: 'We could not save your enquiry. Please try again or email dass.kishore@aionsi.com.' }, 502);
  }

  const notificationLead = { ...lead, ...saved };
  try {
    const notification = await sendNotification(notificationLead);
    if (notification.status !== 'pending') {
      await updateNotificationStatus(saved.id, notification.status);
    }
    return json({
      ok: true,
      leadId: saved.id,
      notificationStatus: notification.status,
      message: notification.status === 'failed'
        ? 'Your enquiry was saved. Email notification is delayed; the AionSi team can still retrieve it.'
        : 'Thank you. Your enquiry has been received.',
    }, 201);
  } catch (error) {
    console.error('Lead notification processing failed', error);
    await updateNotificationStatus(saved.id, 'failed');
    return json({
      ok: true,
      leadId: saved.id,
      notificationStatus: 'failed',
      message: 'Your enquiry was saved. Email notification is delayed; the AionSi team can still retrieve it.',
    }, 201);
  }
}

export function jsonError(message: string, status = 400) {
  return json({ ok: false, message }, status);
}
