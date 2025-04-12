// Script de build pour injecter les configurations directement dans les fichiers HTML
const fs = require('fs');
const path = require('path');

// Récupérer les variables d'environnement
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0';
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID || 'G-KHZ18QKRHG';

// Créer le contenu du script de configuration
const configScript = `<script>
// Configuration des API
const CONFIG = {
  // Clé API Google Maps
  GOOGLE_MAPS_API_KEY: "${googleMapsApiKey}",

  // ID de mesure Google Analytics
  GOOGLE_ANALYTICS_ID: "${googleAnalyticsId}"
};
</script>`;

// Fonction pour injecter le script de configuration dans un fichier HTML
function injectConfigIntoHTML(filePath) {
  try {
    // Lire le contenu du fichier
    let content = fs.readFileSync(filePath, 'utf8');

    // Vérifier si le fichier contient déjà le script de configuration
    if (content.includes('const CONFIG = {')) {
      // Remplacer le script de configuration existant
      content = content.replace(/<script>[\s\S]*?const CONFIG = \{[\s\S]*?\};[\s\S]*?<\/script>/m, configScript);
    } else {
      // Ajouter le script de configuration après la balise head
      content = content.replace(/<\/head>/i, `${configScript}\n</head>`);
    }

    // Écrire le contenu modifié dans le fichier
    fs.writeFileSync(filePath, content);

    console.log(`Configuration injectée dans ${filePath}`);
  } catch (error) {
    console.error(`Erreur lors de l'injection de la configuration dans ${filePath}:`, error);
  }
}

// Trouver tous les fichiers HTML
function findHTMLFiles(dir) {
  const files = fs.readdirSync(dir);
  const htmlFiles = [];

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Récursion dans les sous-répertoires
      htmlFiles.push(...findHTMLFiles(filePath));
    } else if (file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });

  return htmlFiles;
}

// Injecter la configuration dans tous les fichiers HTML
const htmlFiles = findHTMLFiles('.');
console.log(`Trouvé ${htmlFiles.length} fichiers HTML`);

htmlFiles.forEach(file => {
  injectConfigIntoHTML(file);
});

console.log('Configuration injectée avec succès dans tous les fichiers HTML !');
