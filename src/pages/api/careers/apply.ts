import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';

export const prerender = false;

const MAX_RESUME_BYTES = 4 * 1024 * 1024;
const MAX_REQUEST_BYTES = 5 * 1024 * 1024;

const json = (status: number, body: Record<string, string>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

function text(form: FormData, key: string, max = 500): string {
  const value = form.get(key);
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character] ?? character);
}

function validResumeSignature(bytes: Uint8Array, extension: string): boolean {
  if (extension === 'pdf') return bytes.length >= 5 && String.fromCharCode(...bytes.slice(0, 5)) === '%PDF-';
  if (extension === 'doc') return bytes.length >= 4 && bytes[0] === 0xd0 && bytes[1] === 0xcf && bytes[2] === 0x11 && bytes[3] === 0xe0;
  if (extension === 'docx') return bytes.length >= 4 && bytes[0] === 0x50 && bytes[1] === 0x4b && [0x03, 0x05, 0x07].includes(bytes[2]) && [0x04, 0x06, 0x08].includes(bytes[3]);
  return false;
}

export const POST: APIRoute = async ({ request }) => {
  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_REQUEST_BYTES) return json(413, { message: 'The application is too large. Please attach a CV smaller than 4 MB.' });

  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.CAREERS_FROM_EMAIL;
  const to = import.meta.env.CAREERS_TO_EMAIL || 'careers@aionsi.com';
  if (!apiKey || !from || !to) {
    return json(503, { message: 'Online applications are temporarily unavailable. Please email careers@aionsi.com with your CV.' });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json(400, { message: 'The application could not be read. Please check the form and try again.' });
  }

  // Quietly accept bot submissions without forwarding any candidate data.
  if (text(form, 'website', 200)) return json(200, { message: 'Application received. Thank you for your interest in AionSi.' });
  if (text(form, 'consent', 20) !== 'yes') return json(400, { message: 'Please confirm the recruitment privacy notice before submitting.' });

  const candidate = {
    firstName: text(form, 'firstName', 100),
    lastName: text(form, 'lastName', 100),
    email: text(form, 'email', 254),
    phone: text(form, 'phone', 40),
    jobSlug: text(form, 'jobSlug', 120),
    experience: text(form, 'experience', 50),
    currentLocation: text(form, 'currentLocation', 120),
    currentCompany: text(form, 'currentCompany', 160),
    currentTitle: text(form, 'currentTitle', 120),
    preferredLocation: text(form, 'preferredLocation', 80),
    noticePeriod: text(form, 'noticePeriod', 80),
    profileUrl: text(form, 'profileUrl', 500),
    candidateNote: text(form, 'candidateNote', 3000),
  };
  if (!candidate.firstName || !candidate.lastName || !candidate.email || !candidate.phone || !candidate.jobSlug || !candidate.experience || !candidate.currentLocation) {
    return json(400, { message: 'Please complete all required fields.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate.email)) return json(400, { message: 'Please enter a valid email address.' });
  if (candidate.profileUrl) {
    try {
      const url = new URL(candidate.profileUrl);
      if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Invalid protocol');
    } catch {
      return json(400, { message: 'Please enter a valid profile or portfolio URL.' });
    }
  }

  const resumeValue = form.get('resume');
  if (!(resumeValue instanceof File) || !resumeValue.size) return json(400, { message: 'Please attach your CV in PDF, DOC or DOCX format.' });
  if (resumeValue.size > MAX_RESUME_BYTES) return json(413, { message: 'Your CV exceeds the 4 MB limit. Please attach a smaller file.' });

  const extension = resumeValue.name.split('.').pop()?.toLowerCase() || '';
  if (!['pdf', 'doc', 'docx'].includes(extension)) return json(400, { message: 'Please attach your CV in PDF, DOC or DOCX format.' });
  const bytes = new Uint8Array(await resumeValue.arrayBuffer());
  if (!validResumeSignature(bytes, extension)) return json(400, { message: 'The uploaded file does not appear to be a valid PDF, DOC or DOCX document.' });

  const safeFilename = (resumeValue.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120) || 'resume.' + extension);
  const details = [
    ['Candidate', candidate.firstName + ' ' + candidate.lastName],
    ['Email', candidate.email],
    ['Phone', candidate.phone],
    ['Role of interest', candidate.jobSlug],
    ['Experience', candidate.experience],
    ['Current location', candidate.currentLocation],
    ['Current company', candidate.currentCompany],
    ['Current designation', candidate.currentTitle],
    ['Preferred location', candidate.preferredLocation],
    ['Notice period', candidate.noticePeriod],
    ['Profile / portfolio', candidate.profileUrl],
    ['Candidate note', candidate.candidateNote],
  ];
  const textBody = details.map(([label, value]) => label + ': ' + (value || 'Not provided')).join('\n');
  const htmlBody = '<h2>AionSi candidate application</h2><table>' + details.map(([label, value]) =>
    '<tr><th align="left" style="padding:6px 12px 6px 0">' + escapeHtml(label) + '</th><td style="padding:6px 0">' + escapeHtml(value || 'Not provided').replace(/\n/g, '<br>') + '</td></tr>'
  ).join('') + '</table><p>Candidate confirmed the recruitment privacy notice on the application form.</p>';

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: candidate.email,
        subject: 'AionSi application: ' + candidate.firstName + ' ' + candidate.lastName + ' — ' + candidate.jobSlug,
        text: textBody,
        html: htmlBody,
        attachments: [{
          filename: safeFilename,
          content: Buffer.from(bytes).toString('base64'),
        }],
      }),
    });
    if (!response.ok) {
      // Do not log the request, response body, or candidate data.
      return json(502, { message: 'We could not deliver your application by email. Please email careers@aionsi.com with your CV.' });
    }
    return json(200, { message: 'Application sent to the AionSi recruitment team. Thank you for your interest.' });
  } catch {
    return json(502, { message: 'We could not deliver your application by email. Please email careers@aionsi.com with your CV.' });
  }
};
