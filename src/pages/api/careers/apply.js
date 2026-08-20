import careerApplicationHandler from '../../../../api/careers/apply.js';

// This endpoint receives multipart/form-data (including the candidate resume),
// so it must always execute on demand rather than being prerendered as a static endpoint.
export const prerender = false;

export async function POST({ request }) {
  return careerApplicationHandler.fetch(request);
}
