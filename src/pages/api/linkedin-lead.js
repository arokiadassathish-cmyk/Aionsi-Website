import linkedinLeadHandler from '../../../api/linkedin-lead.js';

export const prerender = false;

export async function POST({ request }) {
  return linkedinLeadHandler.fetch(request);
}
