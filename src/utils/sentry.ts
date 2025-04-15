/**
 * Sentry utility
 *
 * This file provides a centralized way to initialize and use Sentry
 * for error monitoring.
 */

import * as Sentry from '@sentry/browser';
import { SENTRY_DSN } from './env';

/**
 * Initialize Sentry
 */
export const initSentry = (): void => {
  if (!SENTRY_DSN) {
    console.warn('Sentry DSN is not set. Error monitoring is disabled.');
    return;
  }

  Sentry.init({
    dsn: `https://${SENTRY_DSN}@o4505754391592960.ingest.sentry.io/4505754393165824`,
    // Simplified integrations due to missing types
    integrations: [],
    // Performance monitoring sample rate
    tracesSampleRate: 1.0,
    // Session replay sample rate
    replaysSessionSampleRate: 0.1,
    // Error replay sample rate
    replaysOnErrorSampleRate: 1.0,
  });
};

/**
 * Capture an exception
 */
export const captureException = (error: unknown): void => {
  if (SENTRY_DSN) {
    Sentry.captureException(error);
  } else {
    console.error('Error captured (Sentry disabled):', error);
  }
};

/**
 * Set user information
 */
export const setUser = (user: { id?: string; email?: string; username?: string } | null): void => {
  if (SENTRY_DSN) {
    Sentry.setUser(user);
  }
};

/**
 * Add breadcrumb
 */
export const addBreadcrumb = (breadcrumb: Sentry.Breadcrumb): void => {
  if (SENTRY_DSN) {
    Sentry.addBreadcrumb(breadcrumb);
  }
};
