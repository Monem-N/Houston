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
});
