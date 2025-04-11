/**
 * Guide de Voyage Houston 2025
 * Scripts pour les fonctionnalités interactives
 */

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour basculer le thème clair/sombre
    document.getElementById('theme-toggle').addEventListener('click', function() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);

        // Changer l'icône
        const icon = this.querySelector('i');
        if (newTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }

        // Sauvegarder la préférence
        localStorage.setItem('theme', newTheme);
    });

    // Appliquer le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            const icon = document.querySelector('#theme-toggle i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Afficher/masquer le bouton de retour en haut
    window.addEventListener('scroll', function() {
        const backToTop = document.getElementById('back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // Fonction de retour en haut
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Fonction d'impression
    document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
    });

    // Redimensionner les images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '60%';
        img.loading = 'lazy'; // Ajouter le chargement paresseux

        // Ajouter des attributs width et height si absents
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.setAttribute('width', 'auto');
            img.setAttribute('height', 'auto');
        }
    });
});

// Fonction pour basculer le menu de navigation
function toggleNavMenu() {
    var menu = document.getElementById('nav-menu');
    menu.classList.toggle('active');
}

// Fermer le menu si on clique ailleurs
document.addEventListener('click', function(event) {
    var menu = document.getElementById('nav-menu');
    var nav = document.getElementById('floating-nav');
    if (menu && menu.classList.contains('active') &&
        !menu.contains(event.target) &&
        event.target !== nav) {
        menu.classList.remove('active');
    }
});
