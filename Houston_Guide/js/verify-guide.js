/**
 * Script pour vérifier la qualité du guide allégé
 */

const fs = require('fs');
const path = require('path');

// Fonction pour vérifier la qualité du guide
async function verifyGuide() {
  try {
    // Chemin du fichier
    const guidePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_Allege.md');
    
    // Lire le fichier
    const guideContent = fs.readFileSync(guidePath, 'utf8');
    
    console.log('Vérification de la qualité du guide allégé...');
    
    // Statistiques de base
    const wordCount = guideContent.split(/\s+/).length;
    const lineCount = guideContent.split('\n').length;
    const charCount = guideContent.length;
    
    console.log(`Nombre de mots: ${wordCount}`);
    console.log(`Nombre de lignes: ${lineCount}`);
    console.log(`Nombre de caractères: ${charCount}`);
    
    // Vérifier les titres
    const headings = {
      h1: (guideContent.match(/^# .+$/gm) || []).length,
      h2: (guideContent.match(/^## .+$/gm) || []).length,
      h3: (guideContent.match(/^### .+$/gm) || []).length,
      h4: (guideContent.match(/^#### .+$/gm) || []).length,
      h5: (guideContent.match(/^##### .+$/gm) || []).length,
      h6: (guideContent.match(/^###### .+$/gm) || []).length
    };
    
    console.log('Structure des titres:');
    console.log(`- Titres H1: ${headings.h1}`);
    console.log(`- Titres H2: ${headings.h2}`);
    console.log(`- Titres H3: ${headings.h3}`);
    console.log(`- Titres H4: ${headings.h4}`);
    console.log(`- Titres H5: ${headings.h5}`);
    console.log(`- Titres H6: ${headings.h6}`);
    
    // Vérifier les listes
    const lists = {
      unordered: (guideContent.match(/^- .+$/gm) || []).length,
      ordered: (guideContent.match(/^\d+\. .+$/gm) || []).length,
      checkboxes: (guideContent.match(/^- \[ \] .+$/gm) || []).length
    };
    
    console.log('Listes:');
    console.log(`- Listes non ordonnées: ${lists.unordered}`);
    console.log(`- Listes ordonnées: ${lists.ordered}`);
    console.log(`- Cases à cocher: ${lists.checkboxes}`);
    
    // Vérifier les liens
    const links = (guideContent.match(/\[.+?\]\(.+?\)/g) || []).length;
    
    console.log(`Nombre de liens: ${links}`);
    
    // Vérifier les emojis
    const emojis = (guideContent.match(/[^\u0000-\u007F]+/g) || []).length;
    
    console.log(`Nombre d'emojis et caractères spéciaux: ${emojis}`);
    
    // Vérifier les sections principales
    const mainSections = [
      'Informations Essentielles',
      'Itinéraires',
      'Guide Gastronomique',
      'Guide des Transports',
      'Touristanbul'
    ];
    
    console.log('Vérification des sections principales:');
    
    mainSections.forEach(section => {
      const regex = new RegExp(`# ${section}|# .* ${section}`, 'i');
      const hasSection = regex.test(guideContent);
      
      console.log(`- Section "${section}": ${hasSection ? 'Présente' : 'Absente'}`);
    });
    
    // Vérifier les problèmes potentiels
    const potentialIssues = [];
    
    // Lignes trop longues
    const longLines = guideContent.split('\n').filter(line => line.length > 100).length;
    if (longLines > 0) {
      potentialIssues.push(`${longLines} lignes dépassent 100 caractères`);
    }
    
    // Paragraphes trop longs
    const longParagraphs = guideContent.split('\n\n').filter(para => para.length > 500).length;
    if (longParagraphs > 0) {
      potentialIssues.push(`${longParagraphs} paragraphes sont très longs (>500 caractères)`);
    }
    
    // Répétitions de mots
    const words = guideContent.toLowerCase().match(/\b\w{4,}\b/g) || [];
    const wordFrequency = {};
    
    words.forEach(word => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    const repeatedWords = Object.entries(wordFrequency)
      .filter(([word, count]) => count > 15)
      .sort((a, b) => b[1] - a[1]);
    
    if (repeatedWords.length > 0) {
      potentialIssues.push(`Mots fréquemment répétés: ${repeatedWords.slice(0, 5).map(([word, count]) => `"${word}" (${count} fois)`).join(', ')}`);
    }
    
    console.log('Problèmes potentiels:');
    
    if (potentialIssues.length > 0) {
      potentialIssues.forEach(issue => {
        console.log(`- ${issue}`);
      });
    } else {
      console.log('- Aucun problème majeur détecté');
    }
    
    // Estimation du nombre de pages pour l'impression
    const wordsPerPage = 500; // Estimation moyenne
    const estimatedPages = Math.ceil(wordCount / wordsPerPage);
    
    console.log(`Estimation du nombre de pages pour l'impression: ${estimatedPages}`);
    
    // Créer un rapport de vérification
    const reportPath = path.join(__dirname, '..', 'rapport_verification.md');
    let reportContent = `# Rapport de vérification du Guide de Voyage Houston 2025 - Version Allégée

Date: ${new Date().toLocaleString()}

## Statistiques générales

- **Nombre de mots**: ${wordCount}
- **Nombre de lignes**: ${lineCount}
- **Nombre de caractères**: ${charCount}
- **Estimation du nombre de pages**: ${estimatedPages}

## Structure du document

### Titres
- Titres H1: ${headings.h1}
- Titres H2: ${headings.h2}
- Titres H3: ${headings.h3}
- Titres H4: ${headings.h4}
- Titres H5: ${headings.h5}
- Titres H6: ${headings.h6}

### Listes
- Listes non ordonnées: ${lists.unordered}
- Listes ordonnées: ${lists.ordered}
- Cases à cocher: ${lists.checkboxes}

### Liens et éléments spéciaux
- Nombre de liens: ${links}
- Nombre d'emojis et caractères spéciaux: ${emojis}

## Sections principales

${mainSections.map(section => {
  const regex = new RegExp(`# ${section}|# .* ${section}`, 'i');
  const hasSection = regex.test(guideContent);
  
  return `- Section "${section}": ${hasSection ? '✅ Présente' : '❌ Absente'}`;
}).join('\n')}

## Problèmes potentiels

${potentialIssues.length > 0 ? potentialIssues.map(issue => `- ${issue}`).join('\n') : '- Aucun problème majeur détecté'}

## Mots les plus fréquents

${repeatedWords.slice(0, 10).map(([word, count], index) => `${index + 1}. "${word}": ${count} occurrences`).join('\n')}

## Recommandations

${potentialIssues.length > 0 ? `
- Réduire la longueur des lignes et paragraphes trop longs
- Varier le vocabulaire pour éviter les répétitions
- Vérifier la cohérence des sections principales
` : '- Le guide semble bien structuré et optimisé'}

- Vérifier les liens et références croisées
- Tester l'impression du document pour s'assurer de la mise en page correcte
- Relire le document pour détecter d'éventuelles erreurs typographiques

`;
    
    // Écrire le rapport
    fs.writeFileSync(reportPath, reportContent, 'utf8');
    
    console.log(`Rapport de vérification créé : ${reportPath}`);
  } catch (error) {
    console.error('Erreur lors de la vérification du guide :', error);
  }
}

// Exécuter la fonction
verifyGuide();
