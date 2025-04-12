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
      if (typeof Sentry !== 'undefined') {
        Sentry.captureException(error || new Error(message));
      }
      // Retourne false pour permettre à l'erreur de se propager
      return false;
    };
    
    // Configure Sentry pour capturer les rejets de promesses non gérés
    window.onunhandledrejection = function(event) {
      if (typeof Sentry !== 'undefined') {
        Sentry.captureException(event.reason);
      }
    };
    
    // Ajoute des informations contextuelles
    if (typeof CONFIG !== 'undefined') {
      Sentry.setContext("config", {
        hasGoogleMapsKey: !!CONFIG.GOOGLE_MAPS_API_KEY,
        hasGoogleAnalyticsId: !!CONFIG.GOOGLE_ANALYTICS_ID
      });
    }
    
    // Ajoute des informations sur l'utilisateur
    Sentry.setUser({
      id: 'anonymous',
      type: 'visitor'
    });
    
    // Ajoute des informations sur la page
    Sentry.setTag("page", window.location.pathname);
  } else {
    console.warn('Sentry is not loaded. Error tracking will not be available.');
  }
});
