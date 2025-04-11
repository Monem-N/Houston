// Houston 2025 Travel Guide - JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Add classes to special sections
  addClassesToSections();
  
  // Make checkboxes interactive
  setupCheckboxes();
  
  // Add back to top button
  addBackToTopButton();
  
  // Add navigation highlighting
  highlightCurrentSection();
});

// Function to add classes to special sections
function addClassesToSections() {
  // Add class to checklist sections
  const checklistSections = document.querySelectorAll('h2:contains("Checklist"), h3:contains("Checklist")');
  checklistSections.forEach(section => {
    const nextElement = section.nextElementSibling;
    if (nextElement && (nextElement.tagName === 'UL' || nextElement.tagName === 'OL')) {
      nextElement.classList.add('checklist');
    }
  });
  
  // Add class to important info sections
  const infoSections = document.querySelectorAll('h2:contains("Points Importants"), h3:contains("Points Importants")');
  infoSections.forEach(section => {
    const nextElement = section.nextElementSibling;
    if (nextElement) {
      nextElement.classList.add('important-info');
    }
  });
  
  // Add class to alert sections
  const alertSections = document.querySelectorAll('h2:contains("Alertes"), h3:contains("Alertes")');
  alertSections.forEach(section => {
    const nextElement = section.nextElementSibling;
    if (nextElement) {
      nextElement.classList.add('alert');
    }
  });
  
  // Add class to kids sections
  const kidsSections = document.querySelectorAll('h2:contains("Enfants"), h3:contains("Enfants")');
  kidsSections.forEach(section => {
    const nextElement = section.nextElementSibling;
    if (nextElement) {
      nextElement.classList.add('kids-section');
    }
  });
}

// Function to make checkboxes interactive
function setupCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    // Load saved state
    const savedState = localStorage.getItem('checkbox_' + checkbox.id);
    if (savedState === 'true') {
      checkbox.checked = true;
    }
    
    // Save state on change
    checkbox.addEventListener('change', function() {
      localStorage.setItem('checkbox_' + this.id, this.checked);
    });
  });
}

// Function to add back to top button
function addBackToTopButton() {
  const backToTopButton = document.createElement('a');
  backToTopButton.innerHTML = '↑';
  backToTopButton.className = 'back-to-top';
  backToTopButton.href = '#';
  document.body.appendChild(backToTopButton);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  // Smooth scroll to top
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Function to highlight current section in navigation
function highlightCurrentSection() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-container a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href').split('/').pop();
    if (linkPage === currentPage) {
      link.style.fontWeight = 'bold';
      link.style.textDecoration = 'underline';
    }
  });
}

// Helper function for jQuery-like contains selector
HTMLElement.prototype.contains = function(text) {
  return this.textContent.includes(text);
};
