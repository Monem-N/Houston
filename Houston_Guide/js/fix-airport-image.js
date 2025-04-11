/**
 * Script pour corriger l'image de l'aéroport de Houston
 */

const fs = require('fs');
const path = require('path');

// Fonction pour corriger l'image de l'aéroport
function fixAirportImage() {
  const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_new.html');
  
  // Lire le fichier HTML
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier HTML:', err);
      return;
    }
    
    // Remplacer l'image de l'aéroport
    const oldImagePattern = 'src="https://images.unsplash.com/photo-1583664426440-daef00e4ad6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"';
    const newImageUrl = 'src="https://images.unsplash.com/photo-1606852146006-1391c433199c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8houstonJTIwaW50ZXJuYXRpb25hbCUyMGFpcjxwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60"';
    
    // Effectuer le remplacement
    const updatedData = data.replace(new RegExp(oldImagePattern, 'g'), newImageUrl);
    
    // Vérifier si le remplacement a été effectué
    if (data === updatedData) {
      console.log('Aucun remplacement effectué. L\'image n\'a pas été trouvée.');
      
      // Rechercher l'image dans le fichier
      const imageIndex = data.indexOf('Aéroport de Houston');
      if (imageIndex !== -1) {
        console.log('Texte "Aéroport de Houston" trouvé à l\'index:', imageIndex);
        console.log('Contexte autour de l\'image:');
        console.log(data.substring(imageIndex - 200, imageIndex + 200));
      } else {
        console.log('Texte "Aéroport de Houston" non trouvé dans le fichier.');
      }
      
      return;
    }
    
    // Écrire le fichier mis à jour
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier mis à jour:', err);
        return;
      }
      
      console.log('L\'image de l\'aéroport a été mise à jour avec succès');
    });
  });
}

// Exécuter la fonction
fixAirportImage();
