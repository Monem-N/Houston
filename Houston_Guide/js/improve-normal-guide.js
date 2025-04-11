/**
 * Script pour améliorer la version normale du Guide de Voyage Houston 2025
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour améliorer le guide normal
async function improveNormalGuide() {
  try {
    // Chemins des fichiers
    const inputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    const outputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_ameliore.html');
    const itinerairesPath = path.join(__dirname, '..', 'itineraires_simplifies_corriges.md');
    const infoEssPath = path.join(__dirname, '..', 'informations_essentielles.md');
    const gastroPath = path.join(__dirname, '..', 'guide_gastronomique_optimise.md');
    const touristanbulPath = path.join(__dirname, '..', 'annexe_touristanbul.md');
    
    console.log('Amélioration de la version normale du guide...');
    
    // Lire les fichiers
    const html = fs.readFileSync(inputPath, 'utf8');
    const itineraires = fs.readFileSync(itinerairesPath, 'utf8');
    const infoEss = fs.readFileSync(infoEssPath, 'utf8');
    const gastro = fs.readFileSync(gastroPath, 'utf8');
    const touristanbul = fs.readFileSync(touristanbulPath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Fonction pour convertir le Markdown en HTML (version simplifiée)
    function markdownToHtml(markdown) {
      let html = markdown
        // Titres
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        .replace(/^##### (.+)$/gm, '<h5>$1</h5>')
        .replace(/^###### (.+)$/gm, '<h6>$1</h6>')
        
        // Listes
        .replace(/^- \[ \] (.+)$/gm, '<li class="checklist-item"><input type="checkbox"> $1</li>')
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        
        // Emphase
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        
        // Liens
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
        
        // Paragraphes
        .replace(/^([^<\n].+)$/gm, '<p>$1</p>')
        
        // Nettoyer les paragraphes vides
        .replace(/<p><\/p>/g, '')
        
        // Regrouper les listes
        .replace(/<\/li>\n<li>/g, '</li><li>')
        .replace(/<li>(.+?)(?=<\/li>)/g, function(match) {
          return match.replace(/<p>(.+?)<\/p>/g, '$1');
        });
      
      // Envelopper les listes
      html = html.replace(/(<li>(?:(?!<li>|<\/li>).)+<\/li>)+/g, '<ul>$&</ul>');
      
      // Envelopper les listes à cocher
      html = html.replace(/(<li class="checklist-item">(?:(?!<li class="checklist-item">|<\/li>).)+<\/li>)+/g, '<ul class="checklist">$&</ul>');
      
      // Ajouter des sauts de ligne entre les sections
      html = html.replace(/<\/h([1-6])>\s*<([^\/h])/g, '</h$1><br><$2');
      
      return html;
    }
    
    // 1. Améliorer la structure du document
    
    // Trouver le corps du document
    const body = document.querySelector('body');
    
    // Créer un conteneur principal s'il n'existe pas
    let mainContainer = document.querySelector('.main-container');
    if (!mainContainer) {
      mainContainer = document.createElement('div');
      mainContainer.className = 'main-container';
      body.appendChild(mainContainer);
    }
    
    // Vider le conteneur principal
    mainContainer.innerHTML = '';
    
    // Ajouter un en-tête
    const header = document.createElement('header');
    header.className = 'main-header';
    header.innerHTML = `
      <div class="header-content">
        <h1>Guide de Voyage Houston 2025</h1>
        <p class="subtitle">FIRST Championship et découverte de Houston</p>
      </div>
    `;
    mainContainer.appendChild(header);
    
    // Ajouter une table des matières
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    toc.innerHTML = `
      <h2>Table des matières</h2>
      <ul>
        <li><a href="#introduction">Introduction</a></li>
        <li><a href="#informations-essentielles">Informations Essentielles</a></li>
        <li><a href="#itineraires">Itinéraires Journaliers</a></li>
        <li><a href="#guide-gastronomique">Guide Gastronomique</a></li>
        <li><a href="#guide-transports">Guide des Transports</a></li>
        <li><a href="#annexes">Annexes</a>
          <ul>
            <li><a href="#annexe-downtown">Downtown Houston à Explorer</a></li>
            <li><a href="#annexe-enfants">Activités pour Enfants</a></li>
            <li><a href="#annexe-touristanbul">Touristanbul (escale)</a></li>
          </ul>
        </li>
      </ul>
    `;
    mainContainer.appendChild(toc);
    
    // Ajouter une introduction
    const intro = document.createElement('section');
    intro.className = 'content-section';
    intro.id = 'introduction';
    intro.innerHTML = `
      <h2>Introduction</h2>
      <p>Bienvenue dans votre guide de voyage pour Houston 2025 ! Ce document a été conçu pour vous accompagner lors de votre séjour à Houston pour le FIRST Championship 2025, qui se déroulera du 16 au 19 avril 2025.</p>
      <p>Houston, quatrième plus grande ville des États-Unis, offre une multitude d'attractions, de restaurants et d'activités. Ce guide vous aidera à naviguer dans cette métropole dynamique et à profiter pleinement de votre séjour.</p>
      
      <h3>À propos de ce guide</h3>
      <p>Ce guide a été optimisé pour vous offrir une expérience de voyage sans stress. Il contient :</p>
      <ul>
        <li>Des informations essentielles sur l'hôtel, les transports et les contacts d'urgence</li>
        <li>Des itinéraires journaliers détaillés</li>
        <li>Un guide gastronomique avec des recommandations de restaurants</li>
        <li>Des conseils pratiques pour profiter au maximum de votre séjour</li>
        <li>Des annexes avec des informations complémentaires</li>
      </ul>
      
      <h3>Comment utiliser ce guide</h3>
      <p>Vous pouvez naviguer dans ce guide en utilisant la table des matières ou en faisant défiler les sections. Chaque section est conçue pour être autonome, vous permettant de consulter rapidement les informations dont vous avez besoin.</p>
      <p>Une version allégée de ce guide est également disponible pour une consultation rapide et une impression économique.</p>
    `;
    mainContainer.appendChild(intro);
    
    // 2. Ajouter la section Informations Essentielles
    const infoEssSection = document.createElement('section');
    infoEssSection.className = 'content-section';
    infoEssSection.id = 'informations-essentielles';
    infoEssSection.innerHTML = `
      <h2>Informations Essentielles</h2>
      ${markdownToHtml(infoEss.split('# Informations Essentielles - Houston 2025')[1])}
    `;
    mainContainer.appendChild(infoEssSection);
    
    // 3. Ajouter la section Itinéraires
    const itinerairesSection = document.createElement('section');
    itinerairesSection.className = 'content-section';
    itinerairesSection.id = 'itineraires';
    itinerairesSection.innerHTML = `
      <h2>Itinéraires Journaliers</h2>
      ${markdownToHtml(itineraires.split('# Itinéraires Simplifiés - Houston 2025')[1])}
    `;
    mainContainer.appendChild(itinerairesSection);
    
    // 4. Ajouter la section Guide Gastronomique
    const gastroSection = document.createElement('section');
    gastroSection.className = 'content-section';
    gastroSection.id = 'guide-gastronomique';
    gastroSection.innerHTML = `
      <h2>Guide Gastronomique</h2>
      ${markdownToHtml(gastro.split('# Guide Gastronomique - Houston 2025')[1])}
    `;
    mainContainer.appendChild(gastroSection);
    
    // 5. Ajouter la section Guide des Transports
    const transportsSection = document.createElement('section');
    transportsSection.className = 'content-section';
    transportsSection.id = 'guide-transports';
    transportsSection.innerHTML = `
      <h2>Guide des Transports</h2>
      ${markdownToHtml(`
## 🚇 METRORail (Métro léger)

### Lignes principales
- **Ligne Rouge** (North Line): Relie le centre-ville au nord de Houston
- **Ligne Verte** (East End Line): Dessert l'est de Houston
- **Ligne Violette** (Southeast Line): Dessert le sud-est de Houston, incluant le Museum District

### Tarifs et billets
- **Tarif standard**: 1,25$ par trajet
- **Carte METRO Q**: Rechargeable, recommandée pour plusieurs trajets
- **Pass journalier**: 3$ pour des trajets illimités pendant 24h

### Conseils pratiques
- Fréquence: Toutes les 6-12 minutes en semaine, 12-18 minutes le week-end
- Horaires: 5h00-23h30 (lun-jeu), 5h00-0h30 (ven), 5h30-0h30 (sam), 5h30-23h30 (dim)
- La ligne rouge dessert le Museum District et le Medical Center
- Validez votre billet avant de monter dans le train

## 🚌 Bus METRO

### Réseau
- Plus de 80 lignes couvrant toute la ville
- Les bus numérotés 1-99 sont des lignes locales
- Les bus numérotés 100+ sont des lignes express

### Tarifs et billets
- **Tarif standard**: 1,25$ par trajet (même tarif que le METRORail)
- **Correspondances gratuites** pendant 3 heures

### Conseils pratiques
- Utilisez l'application METRO Trip pour les horaires en temps réel
- Signalez votre arrêt en tirant sur le cordon
- Préparez l'appoint ou utilisez la carte METRO Q

## 🚗 Uber/Lyft

### Disponibilité
- Excellente couverture dans toute la ville
- Temps d'attente généralement court (5-10 minutes)

### Tarifs estimés
- Aéroport IAH → Hôtel: 35-45$
- Hôtel → Convention Center: 10-15$
- Hôtel → Space Center Houston: 35-45$
- Hôtel → Galleria: 15-20$

### Conseils pratiques
- Vérifiez le modèle et la plaque d'immatriculation avant de monter
- Partagez votre itinéraire avec un proche pour plus de sécurité
- Les heures de pointe (7h-9h et 16h-19h) peuvent augmenter les tarifs

## 🚲 Location de vélos BCycle

### Stations
- Plus de 90 stations dans le centre-ville et les quartiers environnants
- Stations près de l'hôtel et dans le Museum District

### Tarifs
- 3$ pour 30 minutes
- 9$ pour la journée (trajets de 60 minutes max)
- Application BCycle nécessaire pour la location

### Conseils pratiques
- Parfait pour explorer Hermann Park et le Museum District
- Pistes cyclables disponibles sur de nombreux grands axes
- Casques non fournis (apportez le vôtre)

## 🚶‍♀️ À pied

### Zones piétonnes
- Downtown Houston (notamment autour du Convention Center)
- Museum District
- Hermann Park
- Discovery Green

### Conseils pratiques
- Distances parfois importantes entre les quartiers
- Chaleur potentielle en avril (prévoyez eau et chapeau)
- Tunnels climatisés dans le centre-ville (Houston Tunnel System)

## 🗺️ Itinéraires recommandés

### Hôtel → Convention Center
- **Option 1**: METRORail ligne rouge (15 min)
- **Option 2**: Uber/Lyft (10-15 min, 10-15$)

### Hôtel → Museum District
- **Option 1**: À pied (10-15 min)
- **Option 2**: METRORail ligne rouge (5 min)

### Hôtel → Space Center Houston
- **Option 1**: Uber/Lyft (35-45 min, 35-45$)
- **Option 2**: Bus 249 + Bus 246 (1h30)

### Hôtel → The Galleria
- **Option 1**: Uber/Lyft (15-20 min, 15-20$)
- **Option 2**: Bus 82 (30-40 min)
      `)}
    `;
    mainContainer.appendChild(transportsSection);
    
    // 6. Ajouter la section Annexes
    const annexesSection = document.createElement('section');
    annexesSection.className = 'content-section';
    annexesSection.id = 'annexes';
    annexesSection.innerHTML = `
      <h2>Annexes</h2>
      
      <section class="subsection" id="annexe-downtown">
        <h3>Annexe A : Downtown Houston à Explorer</h3>
        <p>Downtown Houston offre une multitude d'attractions et d'activités à découvrir pendant votre séjour.</p>
        
        <h4>Points d'intérêt</h4>
        <ul>
          <li><strong>Discovery Green</strong> : Parc urbain avec des événements, des jardins et un lac</li>
          <li><strong>Buffalo Bayou Park</strong> : Parc linéaire avec des sentiers de randonnée et de vélo</li>
          <li><strong>Market Square Park</strong> : Parc historique avec des restaurants et des événements</li>
          <li><strong>Theater District</strong> : Quartier culturel avec des théâtres et des salles de concert</li>
          <li><strong>Houston Tunnel System</strong> : Réseau souterrain de tunnels climatisés reliant les bâtiments du centre-ville</li>
        </ul>
        
        <h4>Activités recommandées</h4>
        <ul>
          <li>Promenade le long de Buffalo Bayou</li>
          <li>Visite du Houston Tunnel System (en semaine, 9h-18h)</li>
          <li>Spectacle au Theater District</li>
          <li>Shopping au Houston Pavilions</li>
          <li>Visite du Houston City Hall</li>
        </ul>
      </section>
      
      <section class="subsection" id="annexe-enfants">
        <h3>Annexe B : Activités pour Enfants</h3>
        <p>Houston offre de nombreuses activités adaptées aux enfants et aux familles.</p>
        
        <h4>Attractions familiales</h4>
        <ul>
          <li><strong>Children's Museum of Houston</strong> : Musée interactif avec des expositions éducatives</li>
          <li><strong>Houston Zoo</strong> : Plus de 6 000 animaux de 900 espèces différentes</li>
          <li><strong>Downtown Aquarium</strong> : Aquarium avec un restaurant et des attractions</li>
          <li><strong>Hermann Park Railroad</strong> : Train miniature parcourant Hermann Park</li>
          <li><strong>Kemah Boardwalk</strong> : Parc d'attractions au bord de l'eau</li>
        </ul>
        
        <h4>Conseils pour les familles</h4>
        <ul>
          <li>Prévoyez des pauses régulières, surtout par temps chaud</li>
          <li>Emportez des snacks et des bouteilles d'eau</li>
          <li>Vérifiez les horaires et les tarifs réduits pour les enfants</li>
          <li>Utilisez les transports en commun pour éviter les problèmes de stationnement</li>
          <li>Consultez le site Visit Houston pour les événements spéciaux pour enfants</li>
        </ul>
      </section>
      
      <section class="subsection" id="annexe-touristanbul">
        <h3>Annexe C : Touristanbul (escale)</h3>
        ${markdownToHtml(touristanbul.split('# Annexe C : Guide Pratique Touristanbul')[1])}
      </section>
    `;
    mainContainer.appendChild(annexesSection);
    
    // 7. Ajouter un pied de page
    const footer = document.createElement('footer');
    footer.className = 'main-footer';
    footer.innerHTML = `
      <div class="footer-content">
        <p>Guide de Voyage Houston 2025 - Version améliorée</p>
        <p>Dernière mise à jour : ${new Date().toLocaleDateString()}</p>
      </div>
    `;
    mainContainer.appendChild(footer);
    
    // 8. Ajouter des scripts pour la navigation
    const scripts = document.createElement('script');
    scripts.textContent = `
      document.addEventListener('DOMContentLoaded', function() {
        // Ajouter des boutons pour replier/déplier les sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
          const heading = section.querySelector('h2');
          if (heading) {
            const button = document.createElement('button');
            button.className = 'section-toggle';
            button.innerHTML = '<i class="fas fa-chevron-up"></i>';
            button.setAttribute('aria-label', 'Toggle section');
            heading.appendChild(button);
            
            // Ajouter l'attribut data-expanded
            section.setAttribute('data-expanded', 'true');
            
            // Ajouter l'événement de clic
            button.addEventListener('click', function() {
              const isExpanded = section.getAttribute('data-expanded') === 'true';
              section.setAttribute('data-expanded', !isExpanded);
              button.innerHTML = isExpanded ? '<i class="fas fa-chevron-down"></i>' : '<i class="fas fa-chevron-up"></i>';
            });
          }
        });
        
        // Ajouter des ancres aux titres pour la navigation
        document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
          if (!heading.id) {
            const id = heading.textContent
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '');
            heading.id = id;
          }
        });
      });
    `;
    body.appendChild(scripts);
    
    // Écrire le fichier HTML amélioré
    const outputHtml = dom.serialize();
    fs.writeFileSync(outputPath, outputHtml, 'utf8');
    
    console.log(`Guide amélioré créé : ${outputPath}`);
    
    // Générer une version PDF du guide amélioré
    console.log('Génération du PDF du guide amélioré...');
    
    // Créer un fichier HTML temporaire avec des styles optimisés pour l'impression
    const tempHtmlPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_temp.html');
    
    // Ajouter des styles d'impression
    const printStyles = `
      <style>
        @page {
          margin: 2cm;
          size: A4;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 100%;
          margin: 0;
          padding: 0;
        }
        .main-container {
          max-width: 100%;
          padding: 0;
        }
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
          color: #2563eb;
          margin-top: 1.5em;
          margin-bottom: 0.5em;
        }
        h1 {
          font-size: 2em;
          border-bottom: 2px solid #e5e7eb;
          padding-bottom: 0.3em;
        }
        h2 {
          font-size: 1.5em;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 0.2em;
        }
        img {
          page-break-inside: avoid;
          max-width: 100% !important;
        }
        pre, blockquote {
          page-break-inside: avoid;
        }
        ul, ol {
          page-break-before: avoid;
        }
        table {
          page-break-inside: avoid;
        }
        .section-toggle {
          display: none;
        }
        a {
          color: #2563eb;
          text-decoration: none;
        }
        .content-section {
          page-break-before: always;
        }
        #introduction {
          page-break-before: avoid;
        }
        .main-header, .main-footer {
          text-align: center;
        }
        .table-of-contents {
          page-break-after: always;
        }
        .table-of-contents ul {
          list-style-type: none;
          padding-left: 1em;
        }
        .table-of-contents li {
          margin-bottom: 0.5em;
        }
        .checklist-item {
          list-style-type: none;
          position: relative;
          padding-left: 2em;
        }
        .checklist-item input[type="checkbox"] {
          position: absolute;
          left: 0;
          top: 0.25em;
        }
      </style>
    `;
    
    // Insérer les styles d'impression dans le HTML
    const tempHtml = outputHtml.replace('</head>', `${printStyles}</head>`);
    fs.writeFileSync(tempHtmlPath, tempHtml, 'utf8');
    
    console.log(`Fichier HTML temporaire créé : ${tempHtmlPath}`);
    console.log('Utilisez un navigateur pour générer le PDF à partir de ce fichier HTML.');
    
    // Créer un script pour générer le PDF
    const pdfScriptPath = path.join(__dirname, '..', 'generate-pdf-improved.js');
    const pdfScriptContent = `
const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('file://${tempHtmlPath.replace(/\\/g, '\\\\')}', { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: '${path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_ameliore.pdf').replace(/\\/g, '\\\\')}',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="width: 100%; font-size: 8px; text-align: center; padding: 5px 0;">Guide de Voyage Houston 2025</div>',
      footerTemplate: '<div style="width: 100%; font-size: 8px; text-align: center; padding: 5px 0;">Page <span class="pageNumber"></span> sur <span class="totalPages"></span></div>',
      margin: {
        top: '2cm',
        bottom: '2cm',
        left: '2cm',
        right: '2cm'
      }
    });
    
    await browser.close();
    
    console.log('PDF généré avec succès : ${path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_ameliore.pdf').replace(/\\/g, '\\\\')}');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

generatePDF();
    `;
    
    fs.writeFileSync(pdfScriptPath, pdfScriptContent, 'utf8');
    
    console.log(`Script de génération de PDF créé : ${pdfScriptPath}`);
    console.log('Pour générer le PDF, exécutez : node generate-pdf-improved.js');
  } catch (error) {
    console.error('Erreur lors de l\'amélioration du guide :', error);
  }
}

// Exécuter la fonction
improveNormalGuide();
