/**
 * Script pour mettre à jour les images dans le fichier HTML avec les URLs finales
 */

const fs = require('fs');
const path = require('path');

// Définir les remplacements d'images
const imageReplacements = {
  // Villes et paysages
  'https://images.unsplash.com/photo-1572376313139-8b2c9d9c4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Houston Skyline': 
    'https://images.unsplash.com/photo-1541795771981-e54469616584?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8houstonJTIwc2t5bGluZXxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Houston Skyline',
  
  'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Quartier de Heights': 
    'https://images.unsplash.com/photo-1630133523068-a95b8b33213c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8the%20heights%20houston%7D%7D&auto=format&fit=crop&w=1350&q=60" title="Quartier de Heights',
  
  // Attractions et lieux touristiques
  'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Mission Control': 
    'https://images.unsplash.com/photo-1560179347-0c149a37a0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8nasaJTIwbWlzc2lvbiUyMGNvbHRyb2wlMjJ9fHwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Mission Control',
  
  'https://images.unsplash.com/photo-1551368998-d349c755c74c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Kemah Rides': 
    'https://images.unsplash.com/photo-1600092771242-4d3a89341014?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2VtYWglMjBib2FyZHdhbGslMjByaWRlc3xlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Kemah Rides',
  
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="The Health Museum': 
    'https://images.unsplash.com/photo-1551040771-19cb251004b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGVhbHRoJTIwbXVzZXVtfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="The Health Museum',
  
  'https://images.unsplash.com/photo-1563212034-a3c52118cce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Hermann Park Japanese Garden': 
    'https://images.unsplash.com/photo-1559621589-c769f0426191?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVybWFubiUyMHBhcmslMjBqYXBhbmVzZSUyMGdhcmRlblxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Hermann Park Japanese Garden',
  
  'https://images.unsplash.com/photo-1544213456-bc37cb97df74?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Grand Bazar': 
    'https://images.unsplash.com/photo-1552581317-8e81ac750599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGdyYW5kJTIwYmF6YXIlMjBpc3RhbmJ1bHxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Grand Bazar',
  
  // Shopping et restaurants
  'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Katy Mills Mall': 
    'https://images.unsplash.com/photo-1578544985881-2a29c341a534?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8a2F0eSUyMG1pbGxzJTIwbWFsbCUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Katy Mills Mall',
  
  // Transport
  'https://images.unsplash.com/photo-1583664426440-daef00e4ad6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Aéroport de Houston': 
    'https://images.unsplash.com/photo-1606852146006-1391c433199c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8houstonJTIwaW50ZXJuYXRpb25hbCUyMGFpcjxwb3J0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Aéroport de Houston',
  
  // Souvenirs et culture
  'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Bottes de Cowboy': 
    'https://images.unsplash.com/photo-1541173183080-788941306721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y293Ym95JTIwYm9vdHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1350&q=60" title="Bottes de Cowboy'
};

// Nouvelles images à ajouter
const newImages = [
  '<img alt="Downtown Houston Street View" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1561164517-d85a92849c80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvd250b3duJTIwaG91c3RvbiUyMHN0cmVldHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1350&q=60" title="Downtown Houston Street View"/>',
  
  '<img alt="Mosquée Bleue (intérieur)" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1519684368102-7618524482c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ymx1ZSUyMG1vc3F1ZSUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Mosquée Bleue (intérieur)"/>',
  
  '<img alt="Hagia Sophia" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1602137968838-8bbd25b13c50?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGFnaWElMjBzb3BoaWF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1350&q=60" title="Hagia Sophia"/>',
  
  '<img alt="Restaurant avec aire de jeux" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1576458088097-788cbd407de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGtpZCUyMGZyaWVuZGx5JTIwcmVzdGF1cmFudHxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Restaurant avec aire de jeux"/>',
  
  '<img alt="Fruits de mer du Golfe" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1565280654386-466e69f5feca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3VsZiUyMHNlYWZvb2R8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1350&q=60" title="Fruits de mer du Golfe"/>',
  
  '<img alt="Location de vélos à Houston" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1556122071-e404cb6f31d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmlrZSUyMHJlbnRhbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1350&q=60" title="Location de vélos à Houston"/>',
  
  '<img alt="Chapeau de cowboy" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1514327567052-1eed4e4902c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y293Ym95JTIwaGF0fGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Chapeau de cowboy"/>',
  
  '<img alt="Art de rue à Houston" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c3RvbiUyMHN0cmVldCUyMGFydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1350&q=60" title="Art de rue à Houston"/>',
  
  '<img alt="Souvenirs d\'Istanbul" class="responsive-img" loading="lazy" src="https://images.unsplash.com/photo-1626908927362-851000109037?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9uYWwlMjBzb3V2ZW5pcnMlMjBpc3RhbmJ1bHxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Souvenirs d\'Istanbul"/>'
];

// Fonction pour mettre à jour les images dans le fichier HTML
function updateImages() {
  const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_new.html');
  
  // Lire le fichier HTML
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Erreur lors de la lecture du fichier HTML:', err);
      return;
    }
    
    // Remplacer les images dupliquées
    let updatedData = data;
    for (const [oldImage, newImage] of Object.entries(imageReplacements)) {
      updatedData = updatedData.replace(new RegExp(oldImage, 'g'), newImage);
    }
    
    // Trouver un bon endroit pour ajouter les nouvelles images
    // Chercher la section sur Houston ou sur les attractions
    const insertPoint = updatedData.indexOf('<h2 id="Guide_Gastronomique_et_Shopping_-_Houston_Authentique-------guide-gastronomique-et-shopping">');
    
    if (insertPoint !== -1) {
      // Créer une nouvelle section pour les images supplémentaires
      const newImagesSection = `
      <h3 id="Images_Supplémentaires_de_Houston">Images Supplémentaires de Houston</h3>
      <p>Voici quelques images supplémentaires qui illustrent la diversité et la richesse de Houston et des destinations de votre voyage :</p>
      <div class="image-gallery">
        ${newImages.join('\n        ')}
      </div>
      `;
      
      // Insérer la nouvelle section avant la section des guides complémentaires
      updatedData = updatedData.slice(0, insertPoint) + newImagesSection + updatedData.slice(insertPoint);
    }
    
    // Écrire le fichier mis à jour
    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier mis à jour:', err);
        return;
      }
      
      console.log('Les images ont été mises à jour avec succès dans le fichier HTML');
    });
  });
}

// Exécuter la fonction
updateImages();
