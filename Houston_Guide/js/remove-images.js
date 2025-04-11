/**
 * Script pour supprimer toutes les images du document HTML
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour supprimer les images
async function removeImages() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    console.log('Suppression des images...');
    
    // Supprimer toutes les images
    const images = document.querySelectorAll('img');
    let imageCount = 0;
    
    images.forEach(img => {
      img.remove();
      imageCount++;
    });
    
    console.log(`${imageCount} images supprimées.`);
    
    // Supprimer les conteneurs d'images vides
    const imageContainers = document.querySelectorAll('.image-container, .image-gallery');
    let containerCount = 0;
    
    imageContainers.forEach(container => {
      container.remove();
      containerCount++;
    });
    
    console.log(`${containerCount} conteneurs d'images supprimés.`);
    
    // Créer un nouveau fichier sans images
    const outputFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    fs.writeFileSync(outputFilePath, dom.serialize(), 'utf8');
    
    console.log(`Fichier sans images créé : ${outputFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la suppression des images :', error);
  }
}

// Exécuter la fonction
removeImages();
