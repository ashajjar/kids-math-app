// Minimal analytics helper for Umami custom events
// Respects absence of the script and avoids throwing in development/tests.
// Does not collect PII; only send minimal, aggregated data.

export function trackEvent(name, data) {
  try {
    if (typeof window === 'undefined') return;
    const umami = window.umami;
    if (!umami) return; // no-op if script blocked or DNT stops initialization

    // Support both v2 (umami.track) and legacy (function)
    if (typeof umami.track === 'function') {
      // v2 style
      if (data && typeof data === 'object') {
        umami.track(name, data);
      } else {
        umami.track(name);
      }
    } else if (typeof umami === 'function') {
      // legacy style accepts string event name only
      umami(name);
    }
  } catch (e) {
    // swallow errors to avoid breaking UX
    // console.warn('Analytics error', e);
  }
}
