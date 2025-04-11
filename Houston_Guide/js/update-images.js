/**
 * Script pour mettre à jour les images dans le fichier HTML
 */

const fs = require('fs');
const path = require('path');

// Définir les remplacements d'images
const imageReplacements = {
  // Remplacer les doublons
  'https://images.unsplash.com/photo-1572376313139-8b2c9d9c4833?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Discovery Green':
    'https://images.unsplash.com/photo-1569098644584-210bcd375b59?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Discovery Green',

  'https://images.unsplash.com/photo-1563212034-a3c52118cce2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="McGovern Centennial Gardens':
    'https://images.unsplash.com/photo-1558635424-0f60e86c8682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="McGovern Centennial Gardens',

  'https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Entrée de Katy Mills':
    'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Katy Mills Mall Interior',

  'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="FIRST Robotics':
    'https://images.unsplash.com/photo-1535378620166-273708d44e4c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Enfants avec des robots',

  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Children Activities':
    'https://images.unsplash.com/photo-1597248374161-426f0d6d2fc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2hpbGRyZW4lMjBhY3Rpdml0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Enfants jouant dans un parc',

  'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Outdoor Activities':
    'https://images.unsplash.com/photo-1472745942893-4b9f730c7668?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG91dGRvb3IlMjBhY3Rpdml0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Kayak sur Buffalo Bayou',

  // Remplacer d'autres images pour de meilleures alternatives
  'https://images.unsplash.com/photo-1454789476662-53eb23ba5907?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Mission Control':
    'https://images.unsplash.com/photo-1560179347-0c149a37a0e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWlzc2lvbiUyMGNvbHRyb2wlMjBuYXNhfHwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Mission Control NASA',

  'https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Restaurant Family-Friendly':
    'https://images.unsplash.com/photo-1555992336-fb0d29498b13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFtaWx5JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Famille au restaurant',

  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Learning Opportunities':
    'https://images.unsplash.com/photo-1583487918641-889349f2a135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVhcm5pbmclMjBvcHBvcnR1bml0aWVzfGVufDB8fDB8fHww&auto=format&fit=crop&w=1350&q=60" title="Enseignement et apprentissage',

  'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" title="Educational Souvenirs':
    'https://images.unsplash.com/photo-1599515893941-616c3f594495?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWR1Y2F0aW9uYWwlMjBzb3V2ZW5pcnMlMjBzcGFjZXxlbnwwfHwwfHww&auto=format&fit=crop&w=1350&q=60" title="Souvenirs éducatifs Space Center'
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
