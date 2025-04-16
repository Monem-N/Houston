/**
 * Initialize Google Analytics
 */
import { GOOGLE_ANALYTICS_ID } from './env';

export const initAnalytics = (): void => {
  if (!GOOGLE_ANALYTICS_ID) {
    return;
  }

  // Load Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`;
  script.async = true;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date().toString());
  window.gtag('config', GOOGLE_ANALYTICS_ID);
};
