/**
 * Script pour extraire les informations sur Touristanbul
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour extraire les informations sur Touristanbul
async function extractTouristanbul() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Extraction des informations sur Touristanbul...');
    
    // Rechercher toutes les sections et paragraphes contenant des informations sur Touristanbul
    const allElements = document.querySelectorAll('div, p, h1, h2, h3, h4, h5, h6');
    const touristanbulElements = [];
    
    allElements.forEach(el => {
      const text = el.textContent;
      if (text.includes('Touristanbul') || text.includes('Istanbul') || text.includes('Turquie')) {
        touristanbulElements.push({
          text: el.textContent,
          html: el.outerHTML,
          type: el.tagName.toLowerCase(),
          id: el.id || null
        });
      }
    });
    
    console.log(`${touristanbulElements.length} éléments contenant des informations sur Touristanbul trouvés.`);
    
    // Trouver la section principale sur Touristanbul
    let touristanbulSection = null;
    
    for (const el of touristanbulElements) {
      if (el.type.match(/^h[1-6]$/) && el.text.includes('Touristanbul')) {
        // Trouver la section parente
        const id = el.id;
        if (id) {
          const section = document.getElementById(id)?.closest('.content-section');
          if (section) {
            touristanbulSection = section;
            break;
          }
        }
      }
    }
    
    // Si une section principale a été trouvée, l'extraire
    let touristanbulContent = '';
    
    if (touristanbulSection) {
      touristanbulContent = touristanbulSection.outerHTML;
      console.log('Section principale sur Touristanbul trouvée.');
    } else {
      console.log('Aucune section principale sur Touristanbul trouvée. Compilation des éléments individuels...');
      
      // Compiler les éléments individuels
      touristanbulContent = '<div class="content-section">\n';
      touristanbulContent += '<h1 id="Guide_Pratique_Touristanbul">Guide Pratique Touristanbul</h1>\n';
      
      touristanbulElements.forEach(el => {
        if (el.type !== 'div') {
          touristanbulContent += el.html + '\n';
        }
      });
      
      touristanbulContent += '</div>';
    }
    
    // Créer une annexe pour Touristanbul
    const annexeFilePath = path.join(__dirname, '..', 'annexe_touristanbul.html');
    
    // Ajouter un en-tête HTML basique
    let annexeContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Annexe - Guide Pratique Touristanbul</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        h1, h2, h3, h4, h5, h6 {
            color: #2563eb;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
        }
        p {
            margin-bottom: 1em;
        }
        ul, ol {
            margin-bottom: 1em;
            padding-left: 2em;
        }
        .content-section {
            margin-bottom: 2em;
            padding: 1em;
            border-radius: 8px;
            background-color: #f9fafb;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <h1>Annexe - Guide Pratique Touristanbul</h1>
    <p><em>Cette annexe contient des informations sur le programme Touristanbul, qui peut être utile si votre vol comprend une escale à Istanbul.</em></p>
    
    ${touristanbulContent}
    
    <p><a href="Guide_Voyage_Houston_2025_sans_images.html">Retour au guide principal</a></p>
</body>
</html>`;
    
    // Écrire l'annexe
    fs.writeFileSync(annexeFilePath, annexeContent, 'utf8');
    
    console.log(`Annexe Touristanbul créée : ${annexeFilePath}`);
    
    // Créer une version Markdown pour l'intégration dans le guide allégé
    const markdownFilePath = path.join(__dirname, '..', 'annexe_touristanbul.md');
    
    // Convertir le HTML en Markdown (version simplifiée)
    const dom2 = new JSDOM(touristanbulContent);
    const document2 = dom2.window.document;
    
    let markdownContent = '# Annexe C : Guide Pratique Touristanbul\n\n';
    markdownContent += '*Cette annexe contient des informations sur le programme Touristanbul, qui peut être utile si votre vol comprend une escale à Istanbul.*\n\n';
    
    // Extraire les titres et paragraphes
    const headings = document2.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(heading => {
      const level = parseInt(heading.tagName.substring(1));
      const prefix = '#'.repeat(level);
      markdownContent += `${prefix} ${heading.textContent.trim()}\n\n`;
      
      // Extraire les paragraphes et listes qui suivent ce titre
      let nextElement = heading.nextElementSibling;
      while (nextElement && !nextElement.tagName.match(/^H[1-6]$/i)) {
        if (nextElement.tagName === 'P') {
          markdownContent += `${nextElement.textContent.trim()}\n\n`;
        } else if (nextElement.tagName === 'UL' || nextElement.tagName === 'OL') {
          const items = nextElement.querySelectorAll('li');
          items.forEach(item => {
            markdownContent += `- ${item.textContent.trim()}\n`;
          });
          markdownContent += '\n';
        }
        
        nextElement = nextElement.nextElementSibling;
      }
    });
    
    // Ajouter un résumé
    markdownContent += '## Résumé du programme Touristanbul\n\n';
    markdownContent += '- **Programme gratuit** offert par Turkish Airlines pour les passagers en transit\n';
    markdownContent += '- **Visite guidée d\'Istanbul** pendant les escales de 6 à 24 heures\n';
    markdownContent += '- **Inclus** : transport, repas, visites guidées des principaux sites\n';
    markdownContent += '- **Sites principaux** : Mosquée Bleue, Sainte-Sophie, Grand Bazar, Palais de Topkapi\n';
    markdownContent += '- **Inscription** : Au comptoir Touristanbul de l\'aéroport d\'Istanbul\n\n';
    
    markdownContent += '## Conseils pratiques\n\n';
    markdownContent += '- Vérifiez les exigences de visa pour la Turquie avant votre voyage\n';
    markdownContent += '- Prévoyez des vêtements appropriés pour visiter les lieux religieux\n';
    markdownContent += '- Gardez votre passeport et votre carte d\'embarquement avec vous\n';
    markdownContent += '- Arrivez au point de rencontre 15-20 minutes avant l\'heure de départ\n';
    
    // Écrire le fichier Markdown
    fs.writeFileSync(markdownFilePath, markdownContent, 'utf8');
    
    console.log(`Version Markdown de l'annexe Touristanbul créée : ${markdownFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'extraction des informations sur Touristanbul :', error);
  }
}

// Exécuter la fonction
extractTouristanbul();
