/**
 * Environment variables utility
 *
 * This file provides a centralized way to access environment variables
 * with proper fallbacks and type checking.
 */

// Google Maps API key
export const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

// Google Maps Map ID
export const GOOGLE_MAPS_MAP_ID = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || '';

// Google Analytics ID
export const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '';

// Sentry DSN
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN || '';

// Check if environment variables are set
export const validateEnv = (): { valid: boolean; missing: string[] } => {
  const requiredVars = [
    { name: 'VITE_GOOGLE_MAPS_API_KEY', value: GOOGLE_MAPS_API_KEY },
    { name: 'VITE_GOOGLE_MAPS_MAP_ID', value: GOOGLE_MAPS_MAP_ID },
    { name: 'VITE_GOOGLE_ANALYTICS_ID', value: GOOGLE_ANALYTICS_ID },
    { name: 'VITE_SENTRY_DSN', value: SENTRY_DSN }
  ];

  const missing = requiredVars.filter(({ value }) => !value).map(({ name }) => name);

  return {
    valid: missing.length === 0,
    missing,
  };
};
