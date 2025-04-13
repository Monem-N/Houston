# Guide Houston 2025 - Test de fonctionnalité hors ligne et installation d'application

Ce document explique comment tester les fonctionnalités hors ligne et l'installation de l'application pour le Guide de Voyage Houston 2025.

## Fonctionnalité hors ligne (PWA)

Le guide Houston 2025 est configuré comme une Progressive Web App (PWA), ce qui permet aux utilisateurs de l'utiliser même sans connexion Internet.

### Comment tester la fonctionnalité hors ligne

1. **Ouvrez le site web** dans Chrome (de préférence) à l'adresse https://houston2025.netlify.app/
2. **Ouvrez les outils de développement** en appuyant sur F12 ou en cliquant avec le bouton droit et en sélectionnant "Inspecter"
3. **Allez dans l'onglet Application**
4. **Cliquez sur "Service Workers"** dans le menu de gauche
5. **Vérifiez que le service worker est enregistré**
6. **Cochez la case "Offline"** pour simuler le mode hors ligne
7. **Actualisez la page** pour vérifier qu'elle se charge à partir du cache
8. **Vérifiez que l'indicateur hors ligne apparaît** en haut de la page
9. **Naviguez vers différentes pages** pour vérifier qu'elles fonctionnent hors ligne
10. **Décochez la case "Offline"** pour revenir au mode en ligne

### Utilisation du script de test

Un script de test est inclus pour vérifier automatiquement la fonctionnalité hors ligne :

1. Ouvrez la console JavaScript (dans les outils de développement)
2. Exécutez la commande suivante :
   ```javascript
   const script = document.createElement('script');
   script.src = 'test-offline.js';
   document.head.appendChild(script);
   ```
3. Consultez les résultats dans la console

## Installation de l'application (PWA)

Le guide peut être installé comme une application sur les appareils mobiles et les ordinateurs.

### Installation sur mobile (Android/iOS)

#### Android (Chrome)
1. Ouvrez le site dans Chrome
2. Un bouton "Installer l'app" devrait apparaître dans l'en-tête
3. Appuyez sur ce bouton pour installer l'application
4. Alternativement, appuyez sur le menu (trois points) et sélectionnez "Ajouter à l'écran d'accueil"

#### iOS (Safari)
1. Ouvrez le site dans Safari
2. Appuyez sur le bouton de partage (rectangle avec une flèche vers le haut)
3. Faites défiler et appuyez sur "Sur l'écran d'accueil"
4. Appuyez sur "Ajouter" dans le coin supérieur droit

### Installation sur ordinateur (Chrome/Edge)

1. Ouvrez le site dans Chrome ou Edge
2. Un bouton "Installer l'app" devrait apparaître dans l'en-tête
3. Cliquez sur ce bouton pour installer l'application
4. Alternativement, cliquez sur l'icône d'installation dans la barre d'adresse (icône +)

## Application Android native

Une application Android native est également disponible pour le Guide Houston 2025.

### Installation de l'application Android

1. Téléchargez le fichier APK depuis [lien à ajouter]
2. Ouvrez le fichier APK sur votre appareil Android
3. Suivez les instructions pour installer l'application
4. Si nécessaire, autorisez l'installation d'applications provenant de sources inconnues

### Fonctionnalités de l'application Android

L'application Android offre les mêmes fonctionnalités que la version web, mais avec quelques avantages supplémentaires :

- Accès hors ligne complet à tout le contenu
- Meilleure intégration avec le système Android
- Navigation plus fluide entre les pages
- Possibilité d'utiliser le bouton retour de l'appareil

## Résolution des problèmes

### La fonctionnalité hors ligne ne fonctionne pas

1. Vérifiez que vous utilisez un navigateur moderne (Chrome, Firefox, Safari, Edge)
2. Assurez-vous que JavaScript est activé
3. Essayez de vider le cache du navigateur et de recharger la page
4. Vérifiez que le service worker est correctement enregistré dans l'onglet Application des outils de développement

### L'installation de l'application ne fonctionne pas

1. Assurez-vous d'utiliser un navigateur compatible (Chrome, Edge, Safari)
2. Sur mobile, vérifiez que vous avez visité le site plusieurs fois (certains navigateurs exigent cela)
3. Essayez d'utiliser l'option du menu du navigateur pour installer l'application

### L'application Android ne s'installe pas

1. Vérifiez que votre appareil autorise l'installation d'applications provenant de sources inconnues
2. Assurez-vous que vous avez suffisamment d'espace de stockage
3. Vérifiez que votre version d'Android est compatible (Android 5.0+)
