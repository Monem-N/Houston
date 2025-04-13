/**
 * Houston 2025 - Menu Component
 * JavaScript functionality for the navigation menu
 */

document.addEventListener('DOMContentLoaded', function() {
  initMenu();
});

/**
 * Initialize the menu functionality
 */
function initMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;
  
  // Create menu overlay for mobile
  const menuOverlay = document.createElement('div');
  menuOverlay.className = 'menu-overlay';
  body.appendChild(menuOverlay);
  
  if (menuToggle && navMenu) {
    // Toggle menu when button is clicked
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      toggleMenu(!expanded);
    });
    
    // Close menu when overlay is clicked
    menuOverlay.addEventListener('click', function() {
      toggleMenu(false);
    });
    
    // Close menu when escape key is pressed
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
      }
    });
    
    // Handle submenu toggles if they exist
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function(event) {
        event.preventDefault();
        const submenu = this.nextElementSibling;
        const expanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !expanded);
        submenu.classList.toggle('active');
      });
    });
    
    // Add active class to current page link
    highlightCurrentPage();
  }
  
  /**
   * Toggle the menu state
   * @param {boolean} open - Whether to open the menu
   */
  function toggleMenu(open) {
    menuToggle.setAttribute('aria-expanded', open);
    navMenu.classList.toggle('active', open);
    menuOverlay.classList.toggle('active', open);
    
    // Prevent body scrolling when menu is open on mobile
    if (window.innerWidth <= 768) {
      body.style.overflow = open ? 'hidden' : '';
    }
    
    // Announce menu state to screen readers
    announceToScreenReader(open ? 'Menu opened' : 'Menu closed');
  }
  
  /**
   * Highlight the current page in the navigation
   */
  function highlightCurrentPage() {
    const currentPath = window.location.pathname;
    const filename = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    
    // Find the matching link and add active class
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      const href = link.getAttribute('href');
      
      // Remove any existing active class
      link.classList.remove('active');
      
      // Add active class if this is the current page
      if ((filename === '' || filename === 'index.html') && href === 'index.html') {
        link.classList.add('active');
      } else if (href === filename) {
        link.classList.add('active');
      }
    });
  }
  
  /**
   * Announce a message to screen readers
   * @param {string} message - The message to announce
   */
  function announceToScreenReader(message) {
    let announcer = document.getElementById('sr-announcer');
    
    if (!announcer) {
      announcer = document.createElement('div');
      announcer.id = 'sr-announcer';
      announcer.setAttribute('aria-live', 'polite');
      announcer.className = 'screen-reader-text';
      document.body.appendChild(announcer);
    }
    
    announcer.textContent = message;
  }
}

/**
 * Update menu on window resize
 */
window.addEventListener('resize', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Reset menu state on larger screens
  if (window.innerWidth > 768 && menuToggle && navMenu) {
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
      
      if (menuOverlay) {
        menuOverlay.classList.remove('active');
      }
    }
  }
});
