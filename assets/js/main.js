/**
 * Houston 2025 Guide - Main JavaScript
 * Handles mobile menu, back to top button, and other interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      navMenu.classList.toggle('is-active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('is-active')) {
        navMenu.classList.remove('is-active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Back to top button
  const backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Set active menu item based on current page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-menu a');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Add smooth scrolling to all links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });

          // Update URL without page reload
          history.pushState(null, null, targetId);
        }
      }
    });
  });

  // Add touch feedback to cards
  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'translateY(-3px)';
      this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
    });

    card.addEventListener('touchend', function() {
      this.style.transform = '';
      this.style.boxShadow = '';
    });
  });

  // Enhance quick navigation
  const quickNavs = document.querySelectorAll('.quick-nav');

  quickNavs.forEach(nav => {
    // Create header and toggle button
    const navContent = nav.innerHTML;
    const header = document.createElement('div');
    header.className = 'quick-nav-header';

    // Get the heading
    const heading = nav.querySelector('h4');
    if (heading) {
      // Move the heading to the header
      header.appendChild(heading);
    } else {
      // Create a default heading if none exists
      const defaultHeading = document.createElement('h4');
      defaultHeading.textContent = 'Navigation rapide';
      header.appendChild(defaultHeading);
    }

    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'quick-nav-toggle';
    toggleButton.setAttribute('aria-label', 'Réduire/Agrandir la navigation');
    toggleButton.innerHTML = '−'; // Minus sign
    header.appendChild(toggleButton);

    // Clear the nav and add the new structure
    nav.innerHTML = '';
    nav.appendChild(header);

    // Create a container for the content
    const contentContainer = document.createElement('div');
    contentContainer.className = 'quick-nav-content';
    contentContainer.innerHTML = navContent;

    // Remove the heading from content container to avoid duplication
    const oldHeading = contentContainer.querySelector('h4');
    if (oldHeading) {
      oldHeading.remove();
    }

    nav.appendChild(contentContainer);

    // Toggle functionality
    toggleButton.addEventListener('click', function() {
      nav.classList.toggle('collapsed');
      toggleButton.innerHTML = nav.classList.contains('collapsed') ? '+' : '−';
    });

    // Make the whole header clickable
    header.addEventListener('click', function(e) {
      if (e.target !== toggleButton) {
        toggleButton.click();
      }
    });

    // Check if we should start collapsed on mobile
    if (window.innerWidth <= 768) {
      nav.classList.add('collapsed');
      toggleButton.innerHTML = '+';
    }
  });

  // Update quick nav state on scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const st = window.pageYOffset || document.documentElement.scrollTop;

    // If scrolling down more than 50px, collapse the nav
    if (st > lastScrollTop && st > 50) {
      quickNavs.forEach(nav => {
        if (!nav.classList.contains('collapsed')) {
          nav.classList.add('collapsed');
          const toggleButton = nav.querySelector('.quick-nav-toggle');
          if (toggleButton) toggleButton.innerHTML = '+';
        }
      });
    }

    lastScrollTop = st <= 0 ? 0 : st;
  }, false);
});
