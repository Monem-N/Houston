/**
 * Script pour vérifier les redondances dans le contenu du document HTML
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour vérifier les redondances
async function checkRedundancy() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Vérification des redondances...');
    
    // Extraire le contenu des sections
    const sections = document.querySelectorAll('.content-section');
    const sectionContents = [];
    
    sections.forEach(section => {
      const title = section.querySelector('h1, h2')?.textContent || 'Sans titre';
      const id = section.id || 'sans-id';
      const paragraphs = Array.from(section.querySelectorAll('p')).map(p => p.textContent);
      
      sectionContents.push({
        id,
        title,
        paragraphs
      });
    });
    
    console.log(`${sectionContents.length} sections analysées.`);
    
    // Vérifier les redondances entre les paragraphes
    const redundancies = [];
    const paragraphMap = new Map(); // Pour stocker les paragraphes et leurs occurrences
    
    sectionContents.forEach(section => {
      section.paragraphs.forEach((paragraph, index) => {
        // Ignorer les paragraphes trop courts
        if (paragraph.length < 50) return;
        
        // Normaliser le texte pour la comparaison
        const normalizedText = paragraph
          .toLowerCase()
          .replace(/\s+/g, ' ')
          .trim();
        
        if (paragraphMap.has(normalizedText)) {
          // Redondance trouvée
          const previousOccurrence = paragraphMap.get(normalizedText);
          redundancies.push({
            text: paragraph,
            firstOccurrence: {
              sectionId: previousOccurrence.sectionId,
              sectionTitle: previousOccurrence.sectionTitle,
              paragraphIndex: previousOccurrence.paragraphIndex
            },
            secondOccurrence: {
              sectionId: section.id,
              sectionTitle: section.title,
              paragraphIndex: index
            }
          });
        } else {
          // Première occurrence
          paragraphMap.set(normalizedText, {
            sectionId: section.id,
            sectionTitle: section.title,
            paragraphIndex: index
          });
        }
      });
    });
    
    console.log(`${redundancies.length} redondances trouvées.`);
    
    // Créer un rapport de redondances
    const reportFilePath = path.join(__dirname, '..', 'rapport_redondances.md');
    let reportContent = '# Rapport de redondances\n\n';
    reportContent += `Date: ${new Date().toLocaleString()}\n\n`;
    reportContent += `Nombre total de sections analysées: ${sectionContents.length}\n`;
    reportContent += `Nombre total de redondances trouvées: ${redundancies.length}\n\n`;
    
    if (redundancies.length > 0) {
      reportContent += '## Redondances détectées\n\n';
      
      redundancies.forEach((redundancy, index) => {
        reportContent += `### Redondance ${index + 1}\n\n`;
        reportContent += `**Texte:**\n\n> ${redundancy.text}\n\n`;
        reportContent += `**Première occurrence:**\n\n`;
        reportContent += `- Section: ${redundancy.firstOccurrence.sectionTitle}\n`;
        reportContent += `- ID: ${redundancy.firstOccurrence.sectionId}\n`;
        reportContent += `- Paragraphe: ${redundancy.firstOccurrence.paragraphIndex + 1}\n\n`;
        reportContent += `**Seconde occurrence:**\n\n`;
        reportContent += `- Section: ${redundancy.secondOccurrence.sectionTitle}\n`;
        reportContent += `- ID: ${redundancy.secondOccurrence.sectionId}\n`;
        reportContent += `- Paragraphe: ${redundancy.secondOccurrence.paragraphIndex + 1}\n\n`;
        reportContent += `---\n\n`;
      });
    } else {
      reportContent += '## Aucune redondance détectée\n\n';
      reportContent += 'Le document ne contient pas de paragraphes redondants.\n';
    }
    
    // Écrire le rapport
    fs.writeFileSync(reportFilePath, reportContent, 'utf8');
    
    console.log(`Rapport créé: ${reportFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la vérification des redondances :', error);
  }
}

// Exécuter la fonction
checkRedundancy();
