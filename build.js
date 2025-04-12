// Script de build pour générer le fichier config.js à partir des variables d'environnement
const fs = require('fs');

// Récupérer les variables d'environnement
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || 'MISSING_API_KEY';
const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID || 'G-KHZ18QKRHG';

// Créer le contenu du fichier config.js
const configContent = `/**
 * Houston 2025 - Configuration
 * Ce fichier est généré automatiquement lors du déploiement
 * NE PAS MODIFIER MANUELLEMENT
 */

// Configuration des API
const CONFIG = {
  // Clé API Google Maps
  GOOGLE_MAPS_API_KEY: "${googleMapsApiKey}",
  
  // ID de mesure Google Analytics
  GOOGLE_ANALYTICS_ID: "${googleAnalyticsId}",
  
  // Autres configurations
  // ...
};`;

// Écrire le fichier config.js
fs.writeFileSync('assets/js/config.js', configContent);

console.log('Fichier config.js généré avec succès !');
