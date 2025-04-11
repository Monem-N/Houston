/**
 * Script pour extraire et consolider les checklists
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour extraire les checklists
async function extractChecklists() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Extraction des checklists...');
    
    // Rechercher tous les paragraphes et listes contenant des checklists
    const allElements = document.querySelectorAll('p, ul, ol');
    const checklistElements = [];
    
    allElements.forEach(el => {
      const text = el.textContent.toLowerCase();
      if (text.includes('checklist') || text.includes('à faire') || text.includes('à vérifier') || 
          text.includes('à ne pas oublier') || text.includes('vérifier') || text.includes('n\'oubliez pas')) {
        checklistElements.push({
          text: el.textContent,
          html: el.innerHTML,
          type: el.tagName.toLowerCase(),
          parentSection: el.closest('.content-section')?.querySelector('h1, h2')?.textContent || 'Section inconnue'
        });
      }
    });
    
    console.log(`${checklistElements.length} éléments de checklist trouvés.`);
    
    // Extraire les items de checklist
    const checklistItems = new Set();
    const checklists = {};
    
    checklistElements.forEach(element => {
      // Extraire les items de la checklist
      let items = [];
      
      if (element.type === 'ul' || element.type === 'ol') {
        // Si c'est une liste, extraire les éléments de liste
        const listItems = element.html.match(/<li[^>]*>(.*?)<\/li>/g);
        if (listItems) {
          items = listItems.map(item => {
            // Nettoyer le texte de l'élément de liste
            return item.replace(/<li[^>]*>/, '').replace(/<\/li>/, '').trim();
          });
        }
      } else {
        // Si c'est un paragraphe, essayer d'extraire les éléments séparés par des tirets, des puces ou des numéros
        const lines = element.text.split(/[\n\r]+/);
        lines.forEach(line => {
          const itemMatches = line.match(/(?:^|\s)(?:[-•*]|\d+\.)\s+([^\n\r]+)/g);
          if (itemMatches) {
            itemMatches.forEach(match => {
              // Nettoyer le texte de l'élément
              const cleanedItem = match.replace(/(?:^|\s)(?:[-•*]|\d+\.)\s+/, '').trim();
              if (cleanedItem) {
                items.push(cleanedItem);
              }
            });
          } else if (line.trim()) {
            // Si la ligne ne correspond pas au format d'élément de liste mais n'est pas vide
            items.push(line.trim());
          }
        });
      }
      
      // Ajouter les items à l'ensemble et au dictionnaire de checklists
      items.forEach(item => {
        checklistItems.add(item);
      });
      
      // Ajouter la checklist au dictionnaire, regroupée par section parente
      if (!checklists[element.parentSection]) {
        checklists[element.parentSection] = [];
      }
      
      checklists[element.parentSection].push({
        items: items,
        text: element.text
      });
    });
    
    console.log(`${checklistItems.size} items de checklist uniques identifiés.`);
    
    // Créer un rapport sur les checklists
    const reportFilePath = path.join(__dirname, '..', 'checklists_extraites.md');
    let reportContent = '# Checklists extraites du Guide de Voyage Houston 2025\n\n';
    
    Object.entries(checklists).forEach(([section, checklistList]) => {
      if (checklistList.length > 0) {
        reportContent += `## ${section} (${checklistList.length})\n\n`;
        
        checklistList.forEach((checklist, index) => {
          reportContent += `### Checklist ${index + 1}\n\n`;
          
          if (checklist.items.length > 0) {
            checklist.items.forEach(item => {
              reportContent += `- ${item}\n`;
            });
          } else {
            reportContent += `${checklist.text}\n`;
          }
          
          reportContent += '\n';
        });
      }
    });
    
    // Écrire le rapport
    fs.writeFileSync(reportFilePath, reportContent, 'utf8');
    
    console.log(`Rapport sur les checklists créé : ${reportFilePath}`);
    
    // Créer une checklist consolidée
    const consolidatedFilePath = path.join(__dirname, '..', 'checklist_consolidee.md');
    let consolidatedContent = '# Checklist Principale - Houston 2025\n\n';
    
    // Catégoriser les items de checklist
    const categories = {
      'Avant le départ': [],
      'Documents': [],
      'Bagages': [],
      'Électronique': [],
      'Santé et sécurité': [],
      'Chaque matin': [],
      'Chaque soir': [],
      'Autre': []
    };
    
    // Fonction pour déterminer la catégorie d'un item
    function categorizeItem(item) {
      const itemLower = item.toLowerCase();
      
      if (itemLower.includes('passeport') || itemLower.includes('visa') || itemLower.includes('billet') || 
          itemLower.includes('réservation') || itemLower.includes('assurance') || itemLower.includes('carte d\'identité')) {
        return 'Documents';
      } else if (itemLower.includes('vêtement') || itemLower.includes('chaussure') || itemLower.includes('valise') || 
                itemLower.includes('sac') || itemLower.includes('bagage')) {
        return 'Bagages';
      } else if (itemLower.includes('téléphone') || itemLower.includes('chargeur') || itemLower.includes('appareil') || 
                itemLower.includes('batterie') || itemLower.includes('adaptateur') || itemLower.includes('électronique')) {
        return 'Électronique';
      } else if (itemLower.includes('médicament') || itemLower.includes('crème solaire') || itemLower.includes('premiers secours') || 
                itemLower.includes('santé') || itemLower.includes('sécurité') || itemLower.includes('urgence')) {
        return 'Santé et sécurité';
      } else if (itemLower.includes('avant de partir') || itemLower.includes('réserver') || itemLower.includes('confirmer') || 
                itemLower.includes('vérifier') && (itemLower.includes('vol') || itemLower.includes('hôtel'))) {
        return 'Avant le départ';
      } else if (itemLower.includes('matin') || itemLower.includes('petit-déjeuner') || itemLower.includes('préparer pour la journée')) {
        return 'Chaque matin';
      } else if (itemLower.includes('soir') || itemLower.includes('retour à l\'hôtel') || itemLower.includes('préparer pour demain')) {
        return 'Chaque soir';
      } else {
        return 'Autre';
      }
    }
    
    // Catégoriser chaque item
    Array.from(checklistItems).forEach(item => {
      const category = categorizeItem(item);
      categories[category].push(item);
    });
    
    // Ajouter les items par catégorie
    Object.entries(categories).forEach(([category, items]) => {
      if (items.length > 0) {
        consolidatedContent += `## ✅ ${category}\n\n`;
        
        // Trier les items par ordre alphabétique
        items.sort();
        
        // Ajouter les items uniques
        const uniqueItems = new Set();
        items.forEach(item => {
          // Normaliser l'item pour éviter les doublons avec des formulations légèrement différentes
          const normalizedItem = item.toLowerCase().replace(/[^\w\s]/g, '').trim();
          
          if (!uniqueItems.has(normalizedItem)) {
            uniqueItems.add(normalizedItem);
            consolidatedContent += `- ${item}\n`;
          }
        });
        
        consolidatedContent += '\n';
      }
    });
    
    // Écrire le fichier consolidé
    fs.writeFileSync(consolidatedFilePath, consolidatedContent, 'utf8');
    
    console.log(`Checklist consolidée créée : ${consolidatedFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'extraction des checklists :', error);
  }
}

// Exécuter la fonction
extractChecklists();
