import { readFile } from 'node:fs/promises';

const [layout, consent, policy, application, api] = await Promise.all([
  readFile('src/layouts/BaseLayout.astro', 'utf8'),
  readFile('src/components/global/CookieConsent.astro', 'utf8'),
  readFile('src/pages/privacy-policy.astro', 'utf8'),
  readFile('src/pages/careers/apply/index.astro', 'utf8'),
  readFile('src/pages/api/careers/apply.ts', 'utf8'),
]);

const checks = [
  ['shared layout uses the consent component', layout.includes('CookieConsent')],
  ['Google Analytics is not directly injected by the shared layout', !layout.includes('googletagmanager.com/gtag/js')],
  ['consent stores a versioned decision', consent.includes('aionsi-privacy-consent') && consent.includes('consentVersion')],
  ['analytics loads only after accepted consent', consent.includes("readChoice() !== 'accepted'") && consent.includes('googletagmanager.com/gtag/js')],
  ['visitor can reject optional analytics', consent.includes('aionsi-cookie-reject')],
  ['visitor can reopen cookie preferences', consent.includes('[data-cookie-preferences]')],
  ['privacy policy describes explicit analytics choice', policy.includes('not loaded until you accept optional analytics')],
  ['candidate form links the privacy policy', application.includes('href="/privacy-policy"')],
  ['recruitment endpoint requires consent', api.includes("text(form, 'consent', 20) !== 'yes'")],
  ['recruitment endpoint validates upload size and signature', api.includes('MAX_RESUME_BYTES') && api.includes('validResumeSignature')],
  ['recruitment email secrets are server-side environment values', api.includes('RESEND_API_KEY') && !api.includes('PUBLIC_RESEND_API_KEY')],
  ['analytics event handler excludes candidate application submissions', consent.includes("form.id === 'engineering-discovery-form-inner'")],
];

const failures = checks.filter(([, passed]) => !passed);
for (const [label, passed] of checks) console.log((passed ? 'PASS' : 'FAIL') + ' — ' + label);
if (failures.length) process.exit(1);
console.log('Privacy implementation static QA passed: ' + checks.length + ' checks.');
