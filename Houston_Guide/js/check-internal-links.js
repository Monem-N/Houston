/**
 * Script pour vérifier tous les liens internes du document HTML
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour vérifier les liens internes
async function checkInternalLinks() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Vérification des liens internes...');
    
    // Collecter tous les IDs dans le document
    const allIds = new Set();
    const elementsWithId = document.querySelectorAll('[id]');
    elementsWithId.forEach(el => {
      allIds.add(el.id);
    });
    
    console.log(`Nombre d'IDs trouvés dans le document: ${allIds.size}`);
    
    // Vérifier tous les liens internes
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    let validLinks = 0;
    let brokenLinks = 0;
    
    // Créer un fichier de rapport
    const reportFilePath = path.join(__dirname, '..', 'rapport_liens_internes.md');
    let reportContent = '# Rapport de vérification des liens internes\n\n';
    reportContent += `Date: ${new Date().toLocaleString()}\n\n`;
    reportContent += `Nombre total d'IDs dans le document: ${allIds.size}\n`;
    reportContent += `Nombre total de liens internes: ${internalLinks.length}\n\n`;
    
    // Tableau des liens valides
    reportContent += '## Liens valides\n\n';
    reportContent += '| Texte du lien | Cible du lien |\n';
    reportContent += '|--------------|---------------|\n';
    
    // Tableau des liens cassés
    let brokenLinksContent = '## Liens cassés\n\n';
    brokenLinksContent += '| Texte du lien | Cible du lien | Suggestions |\n';
    brokenLinksContent += '|--------------|---------------|-------------|\n';
    
    internalLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === '#') return; // Ignorer les liens vides
      
      const targetId = href.substring(1); // Enlever le # du début
      const linkText = link.textContent.trim();
      
      // Vérifier si l'ID existe dans le document
      if (allIds.has(targetId)) {
        validLinks++;
        reportContent += `| ${linkText} | ${href} |\n`;
      } else {
        brokenLinks++;
        
        // Essayer de trouver des IDs similaires
        const similarIds = Array.from(allIds)
          .filter(id => id.includes(targetId) || targetId.includes(id))
          .slice(0, 3); // Limiter à 3 suggestions
        
        const suggestions = similarIds.length > 0 
          ? similarIds.map(id => `#${id}`).join(', ') 
          : 'Aucune suggestion';
        
        brokenLinksContent += `| ${linkText} | ${href} | ${suggestions} |\n`;
      }
    });
    
    reportContent += '\n' + brokenLinksContent;
    
    // Ajouter des statistiques
    reportContent += `\n## Résumé\n\n`;
    reportContent += `- Liens valides: ${validLinks}\n`;
    reportContent += `- Liens cassés: ${brokenLinks}\n`;
    reportContent += `- Pourcentage de liens valides: ${Math.round((validLinks / internalLinks.length) * 100)}%\n`;
    
    // Écrire le rapport
    fs.writeFileSync(reportFilePath, reportContent, 'utf8');
    
    console.log(`Liens valides: ${validLinks}`);
    console.log(`Liens cassés: ${brokenLinks}`);
    console.log(`Rapport créé: ${reportFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la vérification des liens internes :', error);
  }
}

// Exécuter la fonction
checkInternalLinks();
