/**
 * Houston 2025 - Script Loader
 * Optimizes script loading for better performance
 */

// Immediately load critical scripts
loadCriticalScripts();

// Defer non-critical scripts
document.addEventListener('DOMContentLoaded', function() {
  loadNonCriticalScripts();
  
  // Load scripts based on page content
  loadConditionalScripts();
});

/**
 * Load critical scripts that are needed immediately
 */
function loadCriticalScripts() {
  // Add Sentry for error tracking (already loaded in HTML)
  
  // Initialize offline detection
  initOfflineDetection();
}

/**
 * Load non-critical scripts that can be deferred
 */
function loadNonCriticalScripts() {
  // Load image optimizer
  loadScript('assets/js/image-optimizer.js');
  
  // Load analytics with delay
  setTimeout(() => {
    loadScript('assets/js/analytics.js');
  }, 3000); // 3 second delay for analytics
}

/**
 * Load scripts conditionally based on page content
 */
function loadConditionalScripts() {
  // Load maps script only if map elements exist
  if (document.getElementById('main-map') || document.getElementById('page-map')) {
    loadScript('assets/js/maps-improved.js');
  }
  
  // Load gallery script only if gallery elements exist
  if (document.querySelector('.image-gallery')) {
    loadScript('assets/js/gallery.js');
  }
  
  // Load itineraries script only if itinerary elements exist
  if (document.querySelector('.itinerary-map')) {
    loadScript('assets/js/itineraries.js');
  }
}

/**
 * Helper function to load a script dynamically
 * @param {string} src - Script source URL
 * @param {boolean} async - Whether to load async (default: true)
 * @param {Function} callback - Optional callback after loading
 */
function loadScript(src, async = true, callback) {
  const script = document.createElement('script');
  script.src = src;
  script.async = async;
  
  if (callback) {
    script.onload = callback;
  }
  
  document.head.appendChild(script);
}

/**
 * Initialize offline detection
 */
function initOfflineDetection() {
  const offlineIndicator = document.getElementById('offline-indicator');
  if (!offlineIndicator) return;
  
  // Update offline status
  function updateOfflineStatus() {
    if (navigator.onLine) {
      offlineIndicator.style.display = 'none';
    } else {
      offlineIndicator.style.display = 'block';
    }
  }
  
  // Add event listeners for online/offline events
  window.addEventListener('online', updateOfflineStatus);
  window.addEventListener('offline', updateOfflineStatus);
  
  // Initial check
  updateOfflineStatus();
}
