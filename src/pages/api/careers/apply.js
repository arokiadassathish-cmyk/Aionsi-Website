import careerApplicationHandler from '../../../../api/careers/apply.js';

export async function POST({ request }) {
  return careerApplicationHandler.fetch(request);
}
