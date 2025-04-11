/**
 * Script pour corriger manuellement les liens internes dans le document HTML modernisé
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
    
    console.log('Correction manuelle des liens internes...');
    
    // Collecter tous les IDs dans le document
    const allIds = new Set();
    const elementsWithId = document.querySelectorAll('[id]');
    elementsWithId.forEach(el => {
      allIds.add(el.id);
    });
    
    console.log(`Nombre d'IDs trouvés dans le document: ${allIds.size}`);
    
    // Afficher tous les IDs pour le débogage
    console.log('Liste des IDs disponibles:');
    Array.from(allIds).sort().forEach(id => {
      console.log(`  - ${id}`);
    });
    
    // Mappings manuels pour les liens cassés
    const linkMappings = {
      // Format: 'id-cassé': 'id-correct'
      'Introduction_et_Sommaire---voyage-à-houston': 'Introduction_et_Sommaire',
      'Introduction_et_Sommaire-avril-2025---first-championship-et-découvertes-texanes': 'Introduction_et_Sommaire',
      'Journées_14-15_et_23-24_avril_2025_-_Guide_Arrivée_et_Départ---partie-1--départ-et-arrivée--14-15-avril-': 'Journées_14-15_et_23-24_avril_2025_-_Guide_Arrivée_et_Départ',
      'Journées_14-15_et_23-24_avril_2025_-_Guide_Arrivée_et_Départ---partie-2--départ-et-retour--23-24-avril-': 'Journées_14-15_et_23-24_avril_2025_-_Guide_Arrivée_et_Départ',
      'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final---jours-3-6--16-19-avril-2025': 'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final',
      'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final---présentation-de-l-événement': 'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final',
      'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final---programme-jour-par-jour': 'Journées_16-19_avril_2025_-_Guide_FIRST_Championship_Détaillé_Final',
      'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé---jour-7--dimanche-20-avril-2025': 'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé',
      'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé---space-center-houston': 'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé',
      'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé---kemah-boardwalk': 'Journée_20_avril_2025_-_Guide_Space_Center_&_Kemah_Détaillé',
      'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final----jour-8--lundi-21-avril-2025': 'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final',
      'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final---présentation-de-la-journée': 'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final',
      'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final---comparaison-des-centres-commerciaux': 'Journée_21_avril_2025_-_Guide_Shopping_Détaillé_Final',
      'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé---jour-9--mardi-22-avril-2025': 'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé',
      'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé---présentation-de-la-journée': 'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé',
      'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé----informations-essentielles': 'Journée_22_avril_2025_-_Guide_Museum_District_Détaillé',
      'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé---jour-10--mercredi-23-avril-2025': 'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé',
      'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé---zoo-de-houston': 'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé',
      'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé---hermann-park': 'Journée_23_avril_2025_-_Guide_Hermann_Park_et_Zoo_Détaillé',
      'Guide_Gastronomique_et_Shopping_-_Houston_Authentique-------guide-gastronomique-et-shopping': 'Guide_Gastronomique_et_Shopping_-_Houston_Authentique',
      'Guide_Local_Houston___Manger_Acheter-houston---votre-guide-des-adresses-incontournables-autour-du-crowne-plaza-et-du-centre-de-conventions': 'Guide_Local_Houston___Manger_Acheter',
      'Annexe_-_Downtown_Houston_à_Explorer----downtown-houston-à-explorer': 'Annexe_-_Downtown_Houston_à_Explorer',
      'Guide_Pratique_Touristanbul----guide-pratique-touristanbul': 'Guide_Pratique_Touristanbul',
      'Guide_Activités_Enfants_-_Houston_pour_les_10_ans----houston-pour-les-enfants-de-10-ans': 'Guide_Activités_Enfants_-_Houston_pour_les_10_ans'
    };
    
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
        
        // Vérifier si nous avons un mapping manuel pour ce lien
        if (linkMappings[targetId]) {
          const newId = linkMappings[targetId];
          console.log(`  Correction manuelle: ${href} -> #${newId}`);
          link.setAttribute('href', `#${newId}`);
          fixedCount++;
        } else {
          console.log(`  Aucun mapping trouvé pour: ${targetId}`);
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
    
    // Mettre à jour la table des matières
    console.log('Mise à jour de la table des matières...');
    const tocLinks = document.querySelectorAll('.toc a');
    let tocFixedCount = 0;
    
    tocLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      
      const targetId = href.substring(1);
      
      // Vérifier si nous avons un mapping pour ce lien
      if (linkMappings[targetId]) {
        const newId = linkMappings[targetId];
        link.setAttribute('href', `#${newId}`);
        tocFixedCount++;
      }
    });
    
    console.log(`Liens de la table des matières corrigés: ${tocFixedCount}`);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, dom.serialize(), 'utf8');
    
    console.log('Liens internes corrigés avec succès !');
  } catch (error) {
    console.error('Erreur lors de la correction des liens internes :', error);
  }
}

// Exécuter la fonction
fixInternalLinks();
