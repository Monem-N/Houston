// Google Analytics for Houston 2025 Travel Guide
// Replace 'G-XXXXXXXXXX' with your actual Google Analytics measurement ID when you create one

// Google Analytics tag (gtag.js)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX'); // Replace with your actual measurement ID

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
