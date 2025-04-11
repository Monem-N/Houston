/**
 * Guide de Voyage Houston 2025
 * Scripts modernes avec fonctionnalités améliorées
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser toutes les fonctionnalités
    initThemeToggle();
    initBackToTop();
    initNavMenu();
    initImageGallery();
    initSmoothScrolling();
    initPrintButton();
    initTableOfContents();
    enhanceImages();
    initInfoCards();
});

// Fonction pour basculer le thème clair/sombre
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    // Ajouter l'écouteur d'événement pour le basculement
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Mettre à jour l'icône du thème
function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (!icon) return;
    
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Fonction pour le bouton de retour en haut
function initBackToTop() {
    const backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;
    
    // Afficher/masquer le bouton en fonction du défilement
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    // Ajouter l'écouteur d'événement pour le clic
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Fonction pour le menu de navigation
function initNavMenu() {
    const floatingNav = document.getElementById('floating-nav');
    const navMenu = document.getElementById('nav-menu');
    if (!floatingNav || !navMenu) return;
    
    // Basculer le menu de navigation
    floatingNav.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(event.target) &&
            event.target !== floatingNav) {
            navMenu.classList.remove('active');
        }
    });
    
    // Fermer le menu après avoir cliqué sur un lien
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
}

// Fonction pour améliorer la galerie d'images
function initImageGallery() {
    const gallery = document.querySelector('.image-gallery');
    if (!gallery) return;
    
    // Ajouter des effets de survol et des légendes
    const images = gallery.querySelectorAll('img');
    images.forEach(img => {
        // Créer un conteneur pour chaque image
        const container = document.createElement('div');
        container.className = 'image-container';
        
        // Créer une légende si l'attribut title existe
        if (img.title) {
            const caption = document.createElement('div');
            caption.className = 'image-caption';
            caption.textContent = img.title;
            container.appendChild(caption);
        }
        
        // Remplacer l'image par le conteneur
        img.parentNode.insertBefore(container, img);
        container.appendChild(img);
    });
}

// Fonction pour le défilement fluide
function initSmoothScrolling() {
    // Sélectionner tous les liens internes
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Empêcher le comportement par défaut
            e.preventDefault();
            
            // Obtenir l'ID cible
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            // Faire défiler jusqu'à la cible
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Mettre à jour l'URL sans recharger la page
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Fonction pour le bouton d'impression
function initPrintButton() {
    const printBtn = document.getElementById('print-btn');
    if (!printBtn) return;
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// Fonction pour améliorer la table des matières
function initTableOfContents() {
    const toc = document.getElementById('toc');
    if (!toc) return;
    
    // Ajouter un bouton pour masquer/afficher la table des matières sur mobile
    const tocTitle = toc.querySelector('h2');
    if (tocTitle) {
        tocTitle.style.cursor = 'pointer';
        tocTitle.innerHTML += ' <i class="fas fa-chevron-down"></i>';
        
        const tocList = toc.querySelector('ul');
        
        tocTitle.addEventListener('click', function() {
            tocList.style.display = tocList.style.display === 'none' ? 'block' : 'none';
            const icon = tocTitle.querySelector('i');
            icon.className = tocList.style.display === 'none' ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });
        
        // Masquer la table des matières par défaut sur mobile
        if (window.innerWidth < 768) {
            tocList.style.display = 'none';
        }
    }
    
    // Mettre en évidence l'élément actif de la table des matières
    highlightActiveTocItem();
    window.addEventListener('scroll', highlightActiveTocItem);
}

// Fonction pour mettre en évidence l'élément actif de la table des matières
function highlightActiveTocItem() {
    const sections = document.querySelectorAll('.content-section');
    const tocLinks = document.querySelectorAll('#toc a');
    
    // Trouver la section actuellement visible
    let currentSection = null;
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
            currentSection = section;
        }
    });
    
    // Mettre en évidence le lien correspondant
    if (currentSection) {
        const id = currentSection.id;
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
            }
        });
    }
}

// Fonction pour améliorer les images
function enhanceImages() {
    const images = document.querySelectorAll('img:not(.image-gallery img)');
    images.forEach(img => {
        // Ajouter l'attribut loading="lazy" s'il n'existe pas
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Créer un conteneur pour chaque image si elle n'est pas déjà dans un conteneur
        if (!img.parentNode.classList.contains('image-container') && !img.classList.contains('no-container')) {
            const container = document.createElement('div');
            container.className = 'image-container';
            
            // Créer une légende si l'attribut title existe
            if (img.title) {
                const caption = document.createElement('div');
                caption.className = 'image-caption';
                caption.textContent = img.title;
                container.appendChild(caption);
            }
            
            // Remplacer l'image par le conteneur
            img.parentNode.insertBefore(container, img);
            container.appendChild(img);
        }
    });
}

// Fonction pour créer des cartes d'information
function initInfoCards() {
    // Convertir les paragraphes contenant des informations importantes en cartes d'information
    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => {
        const text = p.textContent.toLowerCase();
        
        // Vérifier si le paragraphe contient des informations importantes
        if (text.includes('important') || text.includes('note') || text.includes('conseil') || 
            text.includes('astuce') || text.includes('attention') || text.includes('rappel')) {
            
            // Créer une carte d'information
            const card = document.createElement('div');
            card.className = 'info-card';
            
            // Ajouter un titre à la carte
            const title = document.createElement('h4');
            if (text.includes('attention') || text.includes('avertissement')) {
                title.textContent = 'Attention';
                card.classList.add('warning-card');
            } else if (text.includes('conseil') || text.includes('astuce')) {
                title.textContent = 'Conseil';
            } else if (text.includes('note')) {
                title.textContent = 'Note';
            } else {
                title.textContent = 'Information importante';
            }
            
            // Remplacer le paragraphe par la carte
            p.parentNode.insertBefore(card, p);
            card.appendChild(title);
            card.appendChild(p);
        }
    });
}
