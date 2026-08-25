const GA_ID = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;

export function trackEvent(name: string, params: Record<string, string | number | boolean> = {}) {
  if (typeof window === 'undefined' || !GA_ID) return;
  window.dispatchEvent(new CustomEvent('aionsi:analytics', { detail: { name, params } }));
}

export function getGaMeasurementId() {
  return GA_ID;
}
