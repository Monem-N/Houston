/**
 * Script pour copier le contenu du fichier HTML original vers le fichier modernisé
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour copier le contenu
async function copyContent() {
  try {
    // Chemins des fichiers
    const originalFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_new.html');
    const modernFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire les fichiers
    const originalHtml = fs.readFileSync(originalFilePath, 'utf8');
    const modernHtml = fs.readFileSync(modernFilePath, 'utf8');
    
    // Créer des objets DOM
    const originalDom = new JSDOM(originalHtml);
    const modernDom = new JSDOM(modernHtml);
    
    // Extraire le contenu principal du fichier original
    const originalContent = originalDom.window.document.querySelector('main');
    const originalNavMenu = originalDom.window.document.querySelector('#nav-menu');
    
    if (!originalContent) {
      throw new Error('Contenu principal non trouvé dans le fichier original');
    }
    
    // Insérer le contenu dans le fichier modernisé
    const modernMain = modernDom.window.document.querySelector('main');
    const modernNavMenu = modernDom.window.document.querySelector('#nav-menu');
    
    if (!modernMain) {
      throw new Error('Élément main non trouvé dans le fichier modernisé');
    }
    
    // Copier le contenu principal
    modernMain.innerHTML = originalContent.innerHTML;
    
    // Copier le menu de navigation s'il existe
    if (originalNavMenu && modernNavMenu) {
      modernNavMenu.innerHTML = originalNavMenu.innerHTML;
    }
    
    // Améliorer la structure du contenu
    enhanceContent(modernDom.window.document);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(modernFilePath, modernDom.serialize(), 'utf8');
    
    console.log('Contenu copié avec succès !');
  } catch (error) {
    console.error('Erreur lors de la copie du contenu :', error);
  }
}

// Fonction pour améliorer la structure du contenu
function enhanceContent(document) {
  // Ajouter la classe content-section à toutes les sections de contenu
  const contentSections = document.querySelectorAll('main > div');
  contentSections.forEach(section => {
    section.classList.add('content-section');
  });
  
  // Créer une galerie d'images pour les images supplémentaires
  const imageGallerySection = document.querySelector('#Images_Supplémentaires_de_Houston');
  if (imageGallerySection) {
    const galleryContainer = imageGallerySection.parentNode.querySelector('.image-gallery');
    if (galleryContainer) {
      galleryContainer.classList.add('image-gallery');
    }
  }
  
  // Améliorer les tableaux
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    // Ajouter des classes pour les tableaux responsives
    table.classList.add('responsive-table');
    
    // Ajouter des en-têtes de colonne si nécessaire
    const firstRow = table.querySelector('tr');
    if (firstRow) {
      const cells = firstRow.querySelectorAll('td');
      if (cells.length > 0 && !table.querySelector('th')) {
        // Convertir la première ligne en en-têtes
        cells.forEach(cell => {
          const th = document.createElement('th');
          th.innerHTML = cell.innerHTML;
          cell.parentNode.replaceChild(th, cell);
        });
        
        // Créer un thead et y déplacer la première ligne
        const thead = document.createElement('thead');
        thead.appendChild(firstRow);
        table.insertBefore(thead, table.firstChild);
      }
    }
  });
  
  // Améliorer les listes
  const lists = document.querySelectorAll('ul, ol');
  lists.forEach(list => {
    // Ajouter des classes pour les listes stylisées
    list.classList.add('styled-list');
  });
  
  // Améliorer les liens
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    // Ajouter des icônes pour les liens externes
    if (link.href && link.href.startsWith('http') && !link.querySelector('i')) {
      const icon = document.createElement('i');
      icon.className = 'fas fa-external-link-alt';
      icon.style.marginLeft = '0.25rem';
      icon.style.fontSize = '0.75em';
      link.appendChild(icon);
    }
  });
}

// Exécuter la fonction
copyContent();
