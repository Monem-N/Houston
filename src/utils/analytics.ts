/**
 * Google Analytics utility
 * 
 * This file provides a centralized way to track events with Google Analytics.
 */

import { GOOGLE_ANALYTICS_ID } from './env';

// Define the gtag function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

/**
 * Track a page view
 */
export const trackPageView = (path: string): void => {
  if (!GOOGLE_ANALYTICS_ID || !window.gtag) {
    return;
  }

  window.gtag('config', GOOGLE_ANALYTICS_ID, {
    page_path: path,
  });
};

/**
 * Track an event
 */
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
): void => {
  if (!GOOGLE_ANALYTICS_ID || !window.gtag) {
    return;
  }

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
