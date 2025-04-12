// Google Analytics for Houston 2025 Travel Guide
// The measurement ID is loaded from the CONFIG object

// Check if CONFIG is defined
if (typeof CONFIG === 'undefined') {
    console.warn('CONFIG object is not defined. Make sure config.js is loaded before analytics.js');
}

// Google Analytics tag (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

// Use the measurement ID from the CONFIG object if available, otherwise use a placeholder
const measurementId = (typeof CONFIG !== 'undefined' && CONFIG.GOOGLE_ANALYTICS_ID)
    ? CONFIG.GOOGLE_ANALYTICS_ID
    : 'G-KHZ18QKRHG';

// Check if gtag function is blocked by an ad blocker
try {
    gtag('config', measurementId);
} catch (error) {
    console.warn('Google Analytics might be blocked by an ad blocker or browser extension.');
}

// Custom event tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track navigation menu clicks
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'navigation_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        });
    });

    // Track quick navigation clicks
    const quickNavLinks = document.querySelectorAll('.quick-nav a');
    quickNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'quick_nav_click', {
                'event_category': 'engagement',
                'event_label': this.textContent.trim(),
                'value': 1
            });
        });
    });

    // Track back to top button clicks
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            gtag('event', 'back_to_top_click', {
                'event_category': 'engagement',
                'event_label': 'Back to top',
                'value': 1
            });
        });
    }

    // Track external links
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'external_link_click', {
                'event_category': 'outbound',
                'event_label': this.href,
                'value': 1
            });
        });
    });

    // Track time on page
    let startTime = new Date();
    window.addEventListener('beforeunload', function() {
        let endTime = new Date();
        let timeSpent = Math.round((endTime - startTime) / 1000);
        gtag('event', 'time_on_page', {
            'event_category': 'engagement',
            'event_label': document.title,
            'value': timeSpent
        });
    });
});
