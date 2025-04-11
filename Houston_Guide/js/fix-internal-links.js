/**
 * Script pour corriger les liens internes dans le document HTML modernisé
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour corriger les liens internes
async function fixInternalLinks() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Correction des liens internes...');
    
    // Collecter tous les IDs dans le document
    const allIds = new Set();
    const elementsWithId = document.querySelectorAll('[id]');
    elementsWithId.forEach(el => {
      allIds.add(el.id);
    });
    
    console.log(`Nombre d'IDs trouvés dans le document: ${allIds.size}`);
    
    // Corriger les liens internes
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    let fixedCount = 0;
    let brokenCount = 0;
    
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#') return; // Ignorer les liens vides
      
      const targetId = href.substring(1); // Enlever le # du début
      
      // Vérifier si l'ID existe dans le document
      if (!allIds.has(targetId)) {
        console.log(`Lien cassé trouvé: ${href}`);
        brokenCount++;
        
        // Essayer de trouver un ID similaire
        const similarIds = Array.from(allIds).filter(id => 
          id.includes(targetId) || targetId.includes(id)
        );
        
        if (similarIds.length > 0) {
          // Utiliser l'ID le plus similaire
          const newId = similarIds[0];
          console.log(`  Correction: ${href} -> #${newId}`);
          link.setAttribute('href', `#${newId}`);
          fixedCount++;
        }
      }
    });
    
    console.log(`Liens cassés trouvés: ${brokenCount}`);
    console.log(`Liens corrigés: ${fixedCount}`);
    
    // Ajouter un script pour améliorer la navigation interne
    const script = document.createElement('script');
    script.textContent = `
      // Améliorer la navigation interne
      document.addEventListener('DOMContentLoaded', function() {
        // Fonction pour gérer les clics sur les liens internes
        document.addEventListener('click', function(event) {
          const target = event.target.closest('a[href^="#"]');
          if (!target) return;
          
          const href = target.getAttribute('href');
          if (href === '#') return;
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            event.preventDefault();
            
            // Faire défiler jusqu'à l'élément cible avec un décalage pour l'en-tête fixe
            const headerHeight = document.querySelector('.main-header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - headerHeight - 20;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            
            // Mettre à jour l'URL sans recharger la page
            history.pushState(null, null, href);
            
            // Mettre en évidence brièvement l'élément cible
            targetElement.classList.add('highlight-target');
            setTimeout(() => {
              targetElement.classList.remove('highlight-target');
            }, 2000);
          }
        });
      });
    `;
    document.body.appendChild(script);
    
    // Ajouter un style pour mettre en évidence les éléments cibles
    const style = document.createElement('style');
    style.textContent = `
      .highlight-target {
        animation: highlight-fade 2s ease-out;
      }
      
      @keyframes highlight-fade {
        0% { background-color: rgba(37, 99, 235, 0.2); }
        100% { background-color: transparent; }
      }
    `;
    document.head.appendChild(style);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, dom.serialize(), 'utf8');
    
    console.log('Liens internes corrigés avec succès !');
  } catch (error) {
    console.error('Erreur lors de la correction des liens internes :', error);
  }
}

// Exécuter la fonction
fixInternalLinks();
