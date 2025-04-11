/**
 * Houston 2025 - Gallery Script
 * Gère les fonctionnalités de galerie d'images et de lightbox
 */

document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner toutes les images de galerie
    const galleryImages = document.querySelectorAll('.image-gallery img');
    
    // Créer les éléments de lightbox une seule fois
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Fermer">&times;</button>
            <img src="" alt="" class="lightbox-image">
            <div class="lightbox-caption"></div>
            <button class="lightbox-prev" aria-label="Image précédente">&#10094;</button>
            <button class="lightbox-next" aria-label="Image suivante">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    // Éléments de la lightbox
    const lightboxElement = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    // Index de l'image actuelle dans la galerie
    let currentImageIndex = 0;
    // Tableau des images de la galerie actuelle
    let currentGallery = [];
    
    // Fonction pour ouvrir la lightbox
    function openLightbox(image, gallery) {
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
        
        // Trouver la légende (figcaption) associée à l'image
        const figure = image.closest('figure');
        const caption = figure ? figure.querySelector('figcaption') : null;
        lightboxCaption.textContent = caption ? caption.textContent : image.alt;
        
        // Stocker la galerie actuelle et l'index de l'image
        currentGallery = gallery;
        currentImageIndex = Array.from(gallery).indexOf(image);
        
        // Afficher/masquer les boutons de navigation selon le nombre d'images
        if (gallery.length <= 1) {
            lightboxPrev.style.display = 'none';
            lightboxNext.style.display = 'none';
        } else {
            lightboxPrev.style.display = 'block';
            lightboxNext.style.display = 'block';
        }
        
        // Afficher la lightbox
        lightboxElement.classList.add('active');
        document.body.style.overflow = 'hidden'; // Empêcher le défilement
        
        // Enregistrer l'événement dans Google Analytics si disponible
        if (typeof gtag === 'function') {
            gtag('event', 'view_image', {
                'event_category': 'engagement',
                'event_label': image.alt || 'Image sans description',
                'value': currentImageIndex + 1
            });
        }
    }
    
    // Fonction pour fermer la lightbox
    function closeLightbox() {
        lightboxElement.classList.remove('active');
        document.body.style.overflow = ''; // Réactiver le défilement
        
        // Vider les sources pour éviter les problèmes de mémoire
        setTimeout(() => {
            lightboxImage.src = '';
            lightboxCaption.textContent = '';
        }, 300);
    }
    
    // Fonction pour naviguer vers l'image précédente
    function showPrevImage() {
        if (currentGallery.length <= 1) return;
        
        currentImageIndex = (currentImageIndex - 1 + currentGallery.length) % currentGallery.length;
        const prevImage = currentGallery[currentImageIndex];
        
        lightboxImage.src = prevImage.src;
        lightboxImage.alt = prevImage.alt;
        
        const figure = prevImage.closest('figure');
        const caption = figure ? figure.querySelector('figcaption') : null;
        lightboxCaption.textContent = caption ? caption.textContent : prevImage.alt;
    }
    
    // Fonction pour naviguer vers l'image suivante
    function showNextImage() {
        if (currentGallery.length <= 1) return;
        
        currentImageIndex = (currentImageIndex + 1) % currentGallery.length;
        const nextImage = currentGallery[currentImageIndex];
        
        lightboxImage.src = nextImage.src;
        lightboxImage.alt = nextImage.alt;
        
        const figure = nextImage.closest('figure');
        const caption = figure ? figure.querySelector('figcaption') : null;
        lightboxCaption.textContent = caption ? caption.textContent : nextImage.alt;
    }
    
    // Ajouter des écouteurs d'événements pour chaque image de galerie
    galleryImages.forEach(img => {
        // Trouver toutes les images dans la même galerie
        const gallery = img.closest('.image-gallery').querySelectorAll('img');
        
        img.addEventListener('click', function() {
            openLightbox(this, gallery);
        });
        
        // Ajouter un indicateur visuel que l'image est cliquable
        img.style.cursor = 'pointer';
    });
    
    // Écouteurs d'événements pour les contrôles de la lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevImage);
    lightboxNext.addEventListener('click', showNextImage);
    
    // Fermer la lightbox en cliquant en dehors de l'image
    lightboxElement.addEventListener('click', function(e) {
        if (e.target === lightboxElement) {
            closeLightbox();
        }
    });
    
    // Navigation au clavier
    document.addEventListener('keydown', function(e) {
        if (!lightboxElement.classList.contains('active')) return;
        
        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
    
    // Lazy loading pour les images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
});
