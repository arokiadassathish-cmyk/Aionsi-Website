const MAX_FILE_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set(['pdf', 'doc', 'docx']);
const INDIA_ACCOUNTS_URL = 'https://accounts.zoho.in';
const INDIA_RECRUIT_URL = 'https://recruit.zoho.in/recruit/v2';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  });
}

function clean(value) {
  return String(value ?? '').trim();
}

function experienceToNumber(value) {
  const match = clean(value).match(/\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : undefined;
}

function extensionOf(filename) {
  const name = clean(filename).toLowerCase();
  const index = name.lastIndexOf('.');
  return index >= 0 ? name.slice(index + 1) : '';
}

function getJobOpeningMap() {
  try {
    const parsed = JSON.parse(process.env.ZOHO_RECRUIT_JOB_OPENINGS_JSON || '{}');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

async function getZohoAccessToken() {
  if (process.env.ZOHO_RECRUIT_REFRESH_TOKEN && process.env.ZOHO_CLIENT_ID && process.env.ZOHO_CLIENT_SECRET) {
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || INDIA_ACCOUNTS_URL;
    const body = new URLSearchParams({
      refresh_token: process.env.ZOHO_RECRUIT_REFRESH_TOKEN,
      client_id: process.env.ZOHO_CLIENT_ID,
      client_secret: process.env.ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token',
    });
    const response = await fetch(`${accountsUrl}/oauth/v2/token`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    });
    const result = await response.json();
    if (!response.ok || !result.access_token) {
      console.error('Zoho OAuth token refresh failed:', response.status, result?.error || result?.message || 'unknown error');
      throw new Error('Recruitment service authentication failed.');
    }
    return result.access_token;
  }

  if (process.env.ZOHO_RECRUIT_ACCESS_TOKEN) return process.env.ZOHO_RECRUIT_ACCESS_TOKEN;
  throw new Error('Recruitment service is not configured.');
}

async function zohoRequest(path, options = {}) {
  const token = await getZohoAccessToken();
  const baseUrl = process.env.ZOHO_RECRUIT_API_BASE_URL || INDIA_RECRUIT_URL;
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  let payload;
  try {
    payload = text ? JSON.parse(text) : {};
  } catch {
    payload = { raw: text };
  }
  if (!response.ok) {
    const message = payload?.message || payload?.data?.[0]?.message || `Zoho Recruit returned HTTP ${response.status}.`;
    console.error('Zoho Recruit API error:', { path, status: response.status, message });
    throw new Error(message);
  }
  return payload;
}

function candidateIdFromResponse(payload) {
  return payload?.data?.[0]?.details?.id || payload?.details?.id || payload?.data?.[0]?.id || null;
}

export default {
  async fetch(request) {
    if (request.method !== 'POST') return json({ message: 'Method not allowed.' }, 405);

    try {
      const form = await request.formData();
      const website = clean(form.get('website'));
      if (website) return json({ message: 'Application received.' }, 200);

      const firstName = clean(form.get('firstName'));
      const lastName = clean(form.get('lastName'));
      const email = clean(form.get('email'));
      const phone = clean(form.get('phone'));
      const currentLocation = clean(form.get('currentLocation'));
      const currentCompany = clean(form.get('currentCompany')) || 'Not provided';
      const currentTitle = clean(form.get('currentTitle'));
      const experience = clean(form.get('experience'));
      const preferredLocation = clean(form.get('preferredLocation'));
      const noticePeriod = clean(form.get('noticePeriod'));
      const jobSlug = clean(form.get('jobSlug')) || 'general';
      const profileUrl = clean(form.get('profileUrl'));
      const candidateNote = clean(form.get('candidateNote'));
      const consent = clean(form.get('consent'));
      const resume = form.get('resume');

      if (!firstName || !lastName || !email || !phone || !currentLocation || !experience || consent !== 'yes') {
        return json({ message: 'Please complete all required application fields.' }, 400);
      }

      if (!(resume instanceof File)) return json({ message: 'Please attach your resume.' }, 400);
      if (resume.size > MAX_FILE_BYTES) return json({ message: 'Resume must be 4 MB or smaller.' }, 400);
      const extension = extensionOf(resume.name);
      if (!ALLOWED_EXTENSIONS.has(extension)) return json({ message: 'Resume must be PDF, DOC or DOCX.' }, 400);

      const experienceYears = experienceToNumber(experience);
      const jobOpeningMap = getJobOpeningMap();
      const jobOpeningId = clean(jobOpeningMap[jobSlug]);
      const roleLabel = jobSlug === 'general' ? 'General / Future Opportunity' : jobSlug.replaceAll('-', ' ');

      const additionalInfo = [
        `Role of interest: ${roleLabel}`,
        `Preferred location: ${preferredLocation || 'Not specified'}`,
        `Notice period: ${noticePeriod || 'Not specified'}`,
        currentTitle ? `Current designation: ${currentTitle}` : '',
        candidateNote ? `Candidate note: ${candidateNote}` : '',
        'Application source: AionSi Careers website',
      ].filter(Boolean).join('\n');

      const candidate = {
        data: [{
          First_Name: firstName,
          Last_Name: lastName,
          Email: email,
          Mobile: phone,
          City: currentLocation,
          Current_Employer: currentCompany,
          Experience_in_Years: experienceYears,
          Website: profileUrl || undefined,
          Skill_Set: roleLabel,
          Additional_Info: additionalInfo,
          Source: 'API',
          Candidate_Status: 'New',
        }],
      };

      const candidateResponse = await zohoRequest('/Candidates', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(candidate),
      });

      const candidateId = candidateIdFromResponse(candidateResponse);
      if (!candidateId) throw new Error('Candidate was not created in Zoho Recruit.');

      const attachmentForm = new FormData();
      attachmentForm.append('file', resume, resume.name);
      attachmentForm.append('attachments_category', 'Resume');
      await zohoRequest(`/Candidates/${candidateId}/Attachments`, {
        method: 'POST',
        body: attachmentForm,
      });

      let associated = false;
      if (jobOpeningId) {
        try {
          await zohoRequest('/Candidates/actions/associate', {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              data: [{
                jobids: [jobOpeningId],
                ids: [String(candidateId)],
                comments: 'Applied through AionSi Careers website',
              }],
            }),
          });
          associated = true;
        } catch (error) {
          console.error('Zoho job association failed:', error);
        }
      }

      return json({
        success: true,
        associated,
        message: associated
          ? 'Application received and routed to the relevant AionSi hiring workflow.'
          : 'Application received. The AionSi recruitment team will review your profile.',
      });
    } catch (error) {
      console.error('Career application error:', error);
      return json({
        message: error instanceof Error && error.message === 'Recruitment service is not configured.'
          ? 'Our recruitment service is temporarily unavailable. Please try again shortly.'
          : 'We could not submit the application. Please try again shortly or email careers@aionsi.com with your CV.',
      }, 500);
    }
  },
};
