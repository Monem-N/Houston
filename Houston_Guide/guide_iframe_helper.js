// Script à injecter dans le fichier HTML original
(function() {
    // Fonction pour basculer la visibilité de la table des matières
    function toggleToc() {
        const toc = document.getElementById('toc');
        if (toc) {
            if (toc.style.display === 'none') {
                toc.style.display = 'block';
            } else {
                toc.style.display = 'none';
            }
        }
    }

    // Fonction pour masquer la table des matières
    function hideToc() {
        const toc = document.getElementById('toc');
        if (toc) {
            toc.style.display = 'none';
        }
    }

    // Écouter les messages du parent
    window.addEventListener('message', function(event) {
        if (event.data === 'toggleToc') {
            toggleToc();
        } else if (event.data === 'hideToc') {
            hideToc();
        }
    });

    // Ajouter un gestionnaire d'événements pour tous les liens internes
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
            // Informer le parent que nous avons cliqué sur un lien interne
            window.parent.postMessage('scrollToTop', '*');
        }
    });

    // Masquer la table des matières au chargement si on est dans une iframe
    if (window !== window.parent) {
        window.addEventListener('load', function() {
            // Attendre un peu pour s'assurer que tout est chargé
            setTimeout(hideToc, 100);
        });
    }
})();
