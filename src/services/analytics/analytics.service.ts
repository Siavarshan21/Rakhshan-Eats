// ---------------------------------------------------------------------------
// Analytics Service
// ---------------------------------------------------------------------------

import { ANALYTICS_EVENTS } from './events';

/**
 * Lightweight analytics facade.
 *
 * - In development or when analytics is disabled via the
 *   `VITE_ENABLE_ANALYTICS` env var, events are logged to the console instead
 *   of being dispatched to a third-party provider.
 * - The service is intentionally provider-agnostic: swap the implementation
 *   inside each method to wire up Google Analytics, Mixpanel, PostHog, etc.
 */
export const AnalyticsService = {
  /**
   * Track a custom event.
   *
   * @param eventName - One of the constants exported from `./events.ts`.
   * @param properties - Arbitrary key/value payload attached to the event.
   */
  trackEvent(
    eventName: string,
    properties?: Record<string, unknown>,
  ): void {
    if (!isEnabled()) {
      logDev('trackEvent', eventName, properties);
      return;
    }

    // -------------------------------------------------------------------
    // Provider integration point
    // -------------------------------------------------------------------
    // Example – Google Analytics 4:
    //   window.gtag?.('event', eventName, properties);
    //
    // Example – Mixpanel:
    //   mixpanel.track(eventName, properties);
    // -------------------------------------------------------------------

    logDev('trackEvent [SENT]', eventName, properties);
  },

  /**
   * Track a page view.
   *
   * @param path - The URL path being viewed (e.g. `/grocery`).
   * @param title - Optional page title.
   */
  trackPageView(path: string, title?: string): void {
    if (!isEnabled()) {
      logDev('trackPageView', path, title);
      return;
    }

    // -------------------------------------------------------------------
    // Provider integration point
    // -------------------------------------------------------------------
    // Example – Google Analytics 4:
    //   window.gtag?.('event', 'page_view', {
    //     page_path: path,
    //     page_title: title,
    //   });
    // -------------------------------------------------------------------

    logDev('trackPageView [SENT]', path, title);
  },
};

// ---- Internal helpers -------------------------------------------------------

/**
 * Returns `true` when analytics tracking is enabled via the environment
 * variable `VITE_ENABLE_ANALYTICS`.
 */
function isEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
}

/**
 * Logs analytics calls to the console during development so engineers can
 * verify events without a real provider.
 */
function logDev(...args: unknown[]): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug('[Analytics]', ...args);
  }
}

// Re-export event constants for convenience
export { ANALYTICS_EVENTS };
