/*=============== DROPDOWN MENU FUNCTIONALITY ===============*/

// Show/hide menu function
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
  
  // Validate that variables exist
  if (toggle && nav) {
    // Use passive event listener for better performance
    toggle.addEventListener('click', () => {
      // Add show-menu class to nav menu
      nav.classList.toggle('show-menu');
      
      // Add show-icon to show and hide the menu icon
      toggle.classList.toggle('show-icon');
    }, { passive: true });
  }
};

// Call the function with the IDs
document.addEventListener('DOMContentLoaded', () => {
  showMenu('nav-toggle', 'nav-menu');
  
  // Handle dropdown menu clicks
  const dropdownItems = document.querySelectorAll('.dropdown__item');
  const dropdownSubitems = document.querySelectorAll('.dropdown__subitem');
  
  // Function to handle dropdown toggle
  function toggleDropdown(item, event) {
    // Only handle clicks on the dropdown header, not the links inside
    const isHeader = event.target.closest('.nav__link') || 
                     (event.target.closest('.dropdown__link') && 
                      event.target.closest('.dropdown__subitem'));
    
    if (!isHeader) return;
    
    // Prevent default only for dropdown headers without href
    if (isHeader && (!isHeader.hasAttribute('href') || isHeader.getAttribute('href') === '#')) {
      event.preventDefault();
    }
    
    // Toggle show-dropdown class
    item.classList.toggle('show-dropdown');
    
    // Close other dropdowns
    if (item.classList.contains('dropdown__item')) {
      dropdownItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('show-dropdown');
        }
      });
    } else if (item.classList.contains('dropdown__subitem')) {
      dropdownSubitems.forEach(otherItem => {
        if (otherItem !== item && otherItem.closest('.dropdown__item') === item.closest('.dropdown__item')) {
          otherItem.classList.remove('show-dropdown');
        }
      });
    }
  }
  
  // Add click event listeners to dropdown items with passive option
  dropdownItems.forEach(item => {
    item.addEventListener('click', (event) => toggleDropdown(item, event), { passive: false });
  });
  
  // Add click event listeners to dropdown subitems with passive option
  dropdownSubitems.forEach(item => {
    item.addEventListener('click', (event) => toggleDropdown(item, event), { passive: false });
  });
  
  // Close menu when clicking outside - use passive listener for document
  document.addEventListener('click', (e) => {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    // Close mobile menu if clicking outside
    if (navMenu && navToggle) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.classList.remove('show-icon');
      }
    }
    
    // Close dropdowns if clicking outside
    if (!e.target.closest('.dropdown__item')) {
      dropdownItems.forEach(item => {
        item.classList.remove('show-dropdown');
      });
    }
  }, { passive: true });
  
  // Add active class to current page link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav__link, .dropdown__link, .dropdown__sublink');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      
      // If link is in dropdown, also highlight parent
      const parentDropdown = link.closest('.dropdown__item');
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector('.nav__link');
        if (parentLink) {
          parentLink.classList.add('active');
        }
      }
    }
  });
  
  // Add passive scroll event listeners to improve performance
  const passiveSupported = () => {
    let passive = false;
    try {
      const options = Object.defineProperty({}, "passive", {
        get: function() {
          passive = true;
          return true;
        }
      });
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    } catch (err) {}
    return passive;
  };
  
  const passiveOption = passiveSupported() ? { passive: true } : false;
  
  // Use passive listeners for scroll events
  window.addEventListener('scroll', function() {
    // Add any scroll-based functionality here
  }, passiveOption);
  
  // Use passive listeners for touch events
  document.addEventListener('touchstart', function() {
    // Touch start functionality
  }, passiveOption);
  
  document.addEventListener('touchmove', function() {
    // Touch move functionality
  }, passiveOption);
});

// Update menu on window resize with passive option
window.addEventListener('resize', function() {
  const menuToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  const menuOverlay = document.querySelector('.menu-overlay');
  
  // Reset menu state on larger screens
  if (window.innerWidth > 768 && menuToggle && navMenu) {
    if (menuToggle.getAttribute('aria-expanded') === 'true') {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('show-menu');
      document.body.style.overflow = '';
      
      if (menuOverlay) {
        menuOverlay.classList.remove('active');
      }
    }
  }
}, { passive: true });
