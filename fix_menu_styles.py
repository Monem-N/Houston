#!/usr/bin/env python3
"""
Script pour restaurer les améliorations du menu
"""

import os
import re
from bs4 import BeautifulSoup

def fix_menu_styles():
    """Restaure les améliorations du menu"""
    print("Restauration des améliorations du menu...")
    
    # Vérifie si le fichier maps-improved.css existe
    if not os.path.exists('assets/css/maps-improved.css'):
        print("❌ Le fichier maps-improved.css n'existe pas")
        return
    
    # Lit le contenu du fichier maps-improved.css
    with open('assets/css/maps-improved.css', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifie si le fichier contient déjà des styles pour le menu
    if 'nav-menu' in content:
        print("✓ Le fichier maps-improved.css contient déjà des styles pour le menu")
    else:
        print("Ajout des styles du menu au fichier maps-improved.css...")
        
        # Ajoute les styles du menu à la fin du fichier
        menu_styles = """
/* 
 * Styles du menu
 * Ces styles sont nécessaires pour le bon fonctionnement du menu
 */

/* Menu toggle button */
.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: var(--spacing-sm);
  z-index: var(--z-index-controls);
}

.hamburger-icon,
.hamburger-icon::before,
.hamburger-icon::after {
  display: block;
  width: 24px;
  height: 3px;
  background: var(--primary-color);
  position: relative;
  transition: all var(--transition-fast);
}

.hamburger-icon::before,
.hamburger-icon::after {
  content: '';
  position: absolute;
  left: 0;
}

.hamburger-icon::before {
  top: -8px;
}

.hamburger-icon::after {
  bottom: -8px;
}

.menu-toggle[aria-expanded="true"] .hamburger-icon {
  background: transparent;
}

.menu-toggle[aria-expanded="true"] .hamburger-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.menu-toggle[aria-expanded="true"] .hamburger-icon::after {
  bottom: 0;
  transform: rotate(-45deg);
}

/* Navigation */
.nav-menu {
  background-color: var(--primary-color);
  padding: var(--spacing-md);
  border-radius: var(--border-radius);
  margin-bottom: var(--spacing-lg);
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  z-index: var(--z-index-controls);
}

.nav-menu a {
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  transition: background-color var(--transition-fast);
  text-decoration: none;
}

.nav-menu a:hover,
.nav-menu a:focus,
.nav-menu a.active {
  background-color: rgba(255, 255, 255, 0.2);
  text-decoration: none;
}

/* Mobile Navigation */
@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-menu {
    display: none;
    width: 100%;
    flex-direction: column;
    padding: var(--spacing-sm);
  }
  
  .nav-menu.is-active {
    display: flex;
  }
  
  .nav-menu a {
    display: block;
    padding: var(--spacing-md);
    text-align: center;
  }
}
"""
        
        # Ajoute les styles du menu à la fin du fichier
        with open('assets/css/maps-improved.css', 'a', encoding='utf-8') as f:
            f.write(menu_styles)
        
        print("✅ Styles du menu ajoutés au fichier maps-improved.css")
    
    # Vérifie si le fichier main.js existe
    if not os.path.exists('assets/js/main.js'):
        print("❌ Le fichier main.js n'existe pas")
        return
    
    # Lit le contenu du fichier main.js
    with open('assets/js/main.js', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Vérifie si le fichier contient déjà le code pour le menu
    if 'menuToggle' in content and 'navMenu' in content:
        print("✓ Le fichier main.js contient déjà le code pour le menu")
    else:
        print("Ajout du code pour le menu au fichier main.js...")
        
        # Ajoute le code pour le menu au début du fichier
        menu_code = """/**
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
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
"""
        
        # Remplace le contenu du fichier
        with open('assets/js/main.js', 'w', encoding='utf-8') as f:
            f.write(menu_code)
        
        print("✅ Code pour le menu ajouté au fichier main.js")
    
    print("\nRestauration terminée")

if __name__ == "__main__":
    fix_menu_styles()
