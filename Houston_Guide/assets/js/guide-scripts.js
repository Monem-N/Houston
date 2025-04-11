/**
 * Guide de Voyage Houston 2025
 * Scripts pour améliorer l'expérience utilisateur
 */

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const backToTopBtn = document.getElementById('back-to-top');
    const printBtn = document.getElementById('print-btn');
    const tocToggleBtn = document.getElementById('toc-toggle');
    const tocContainer = document.getElementById('toc-container');
    
    // Fonction pour afficher/masquer le bouton de retour en haut
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    // Écouteur d'événement pour le défilement
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Fonction de retour en haut
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Fonction d'impression
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Fonction pour afficher/masquer la table des matières
    if (tocToggleBtn && tocContainer) {
        tocToggleBtn.addEventListener('click', function() {
            if (tocContainer.style.display === 'none') {
                tocContainer.style.display = 'block';
                tocToggleBtn.innerHTML = '<i class="fas fa-times"></i><span>Masquer le sommaire</span>';
            } else {
                tocContainer.style.display = 'none';
                tocToggleBtn.innerHTML = '<i class="fas fa-list"></i><span>Afficher le sommaire</span>';
            }
        });
    }
    
    // Chargement paresseux des images
    if ('loading' in HTMLImageElement.prototype) {
        // Le navigateur prend en charge le chargement paresseux natif
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback pour les navigateurs qui ne prennent pas en charge le chargement paresseux natif
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Ajouter des ancres aux titres pour faciliter la navigation
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
        if (heading.id) {
            const anchor = document.createElement('a');
            anchor.className = 'heading-anchor';
            anchor.href = '#' + heading.id;
            anchor.innerHTML = '<i class="fas fa-link"></i>';
            anchor.title = 'Lien direct vers cette section';
            heading.appendChild(anchor);
        }
    });
});
