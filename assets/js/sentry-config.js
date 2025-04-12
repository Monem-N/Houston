/**
 * Houston 2025 - Configuration Sentry
 * Ce fichier configure Sentry pour capturer les erreurs JavaScript
 */

// Attend que Sentry soit chargé
document.addEventListener('DOMContentLoaded', function() {
  // Vérifie si Sentry est chargé
  if (typeof Sentry !== 'undefined') {
    console.log('Sentry is loaded and configured');

    // Configure Sentry pour capturer les erreurs non gérées
    window.onerror = function(message, source, lineno, colno, error) {
      if (typeof Sentry !== 'undefined' && typeof Sentry.captureException === 'function') {
        Sentry.captureException(error || new Error(message));
      }
      // Retourne false pour permettre à l'erreur de se propager
      return false;
    };

    // Configure Sentry pour capturer les rejets de promesses non gérés
    window.onunhandledrejection = function(event) {
      if (typeof Sentry !== 'undefined' && typeof Sentry.captureException === 'function') {
        Sentry.captureException(event.reason);
      }
    };

    // Ajoute des informations contextuelles si la fonction est disponible
    if (typeof CONFIG !== 'undefined' && typeof Sentry.setContext === 'function') {
      try {
        Sentry.setContext("config", {
          hasGoogleMapsKey: !!CONFIG.GOOGLE_MAPS_API_KEY,
          hasGoogleAnalyticsId: !!CONFIG.GOOGLE_ANALYTICS_ID
        });
      } catch (error) {
        console.warn('Failed to set Sentry context:', error);
      }
    }

    // Ajoute des informations sur l'utilisateur si la fonction est disponible
    if (typeof Sentry.setUser === 'function') {
      try {
        Sentry.setUser({
          id: 'anonymous',
          type: 'visitor'
        });
      } catch (error) {
        console.warn('Failed to set Sentry user:', error);
      }
    }

    // Ajoute des informations sur la page si la fonction est disponible
    if (typeof Sentry.setTag === 'function') {
      try {
        Sentry.setTag("page", window.location.pathname);
      } catch (error) {
        console.warn('Failed to set Sentry tag:', error);
      }
    }
  } else {
    console.warn('Sentry is not loaded. Error tracking will not be available.');
  }
});
