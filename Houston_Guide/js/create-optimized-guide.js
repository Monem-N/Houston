/**
 * Script pour créer une version optimisée du Guide de Voyage Houston 2025
 * Cette approche crée un nouveau document HTML à partir de zéro
 */

const fs = require('fs');
const path = require('path');

// Fonction pour créer le guide optimisé
async function createOptimizedGuide() {
  try {
    // Chemins des fichiers
    const outputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_optimise.html');
    const gastroPath = path.join(__dirname, '..', 'guide_gastronomique_optimise.md');
    const checklistPath = path.join(__dirname, '..', 'checklist_consolidee.md');
    const touristanbulPath = path.join(__dirname, '..', 'annexe_touristanbul.md');
    const itinerairesPath = path.join(__dirname, '..', 'itineraires_simplifies_corriges.md');
    
    console.log('Création du Guide de Voyage Houston 2025 optimisé...');
    
    // Lire les fichiers
    const gastroContent = fs.readFileSync(gastroPath, 'utf8');
    const checklistContent = fs.readFileSync(checklistPath, 'utf8');
    const touristanbulContent = fs.readFileSync(touristanbulPath, 'utf8');
    const itinerairesContent = fs.readFileSync(itinerairesPath, 'utf8');
    
    // Fonction pour convertir le Markdown en HTML (version simplifiée)
    function markdownToHtml(markdown) {
      let html = markdown
        // Titres
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
        
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
        .replace(/<p><\/p>/g, '');
      
      // Envelopper les listes
      html = html.replace(/(<li>(?:(?!<li>|<\/li>).)+<\/li>)+/g, '<ul>$&</ul>');
      
      // Envelopper les listes à cocher
      html = html.replace(/(<li class="checklist-item">(?:(?!<li class="checklist-item">|<\/li>).)+<\/li>)+/g, '<ul class="checklist">$&</ul>');
      
      return html;
    }
    
    // Créer le contenu HTML
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Guide optimisé pour le voyage à Houston pour le FIRST Championship 2025">
    <meta name="author" content="Monem Naifer">
    <meta name="keywords" content="Houston, FIRST Championship, voyage, guide, 2025">
    <title>Guide de Voyage Houston 2025 - Version Optimisée</title>
    
    <!-- Polices -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Merriweather:wght@400;700&display=swap" rel="stylesheet">
    
    <!-- Icônes -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <style>
        :root {
            --primary: #2563eb;
            --primary-light: #dbeafe;
            --secondary: #4b5563;
            --background: #ffffff;
            --text: #1f2937;
            --border: #e5e7eb;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            line-height: 1.6;
            color: var(--text);
            background-color: var(--background);
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Merriweather', Georgia, serif;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            line-height: 1.3;
        }
        
        h1 {
            font-size: 2.5rem;
            color: var(--primary);
        }
        
        h2 {
            font-size: 1.8rem;
            color: var(--primary);
            border-bottom: 1px solid var(--border);
            padding-bottom: 0.5rem;
        }
        
        h3 {
            font-size: 1.5rem;
            color: var(--secondary);
        }
        
        p {
            margin-bottom: 1.5rem;
        }
        
        a {
            color: var(--primary);
            text-decoration: none;
            transition: color 0.2s;
        }
        
        a:hover {
            text-decoration: underline;
        }
        
        ul, ol {
            margin-bottom: 1.5rem;
            padding-left: 1.5rem;
        }
        
        li {
            margin-bottom: 0.5rem;
        }
        
        .content-section {
            margin-bottom: 3rem;
            padding: 2rem;
            border-radius: 8px;
            background-color: #f9fafb;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .table-of-contents {
            background-color: var(--primary-light);
            padding: 1.5rem;
            border-radius: 8px;
            margin-bottom: 2rem;
        }
        
        .table-of-contents h2 {
            margin-top: 0;
            border-bottom: none;
        }
        
        .table-of-contents ul {
            list-style-type: none;
            padding-left: 1rem;
        }
        
        .table-of-contents li {
            margin-bottom: 0.5rem;
        }
        
        .checklist {
            background-color: #f3f4f6;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        
        .checklist-item {
            list-style-type: none;
            position: relative;
            padding-left: 2.5rem;
            margin-bottom: 0.75rem;
        }
        
        .checklist-item input[type="checkbox"] {
            position: absolute;
            left: 0;
            top: 0.25rem;
            width: 1.25rem;
            height: 1.25rem;
        }
        
        .annexe {
            border-left: 4px solid var(--primary);
            padding-left: 1.5rem;
            background-color: #f9fafb;
        }
        
        .header-content {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .subtitle {
            font-size: 1.2rem;
            color: var(--secondary);
            margin-top: -1rem;
        }
        
        .footer-content {
            text-align: center;
            margin-top: 3rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
            color: var(--secondary);
            font-size: 0.9rem;
        }
        
        /* Styles pour l'impression */
        @media print {
            body {
                font-size: 12pt;
                padding: 0;
            }
            
            .content-section {
                box-shadow: none;
                padding: 1rem;
                margin-bottom: 2rem;
                page-break-inside: avoid;
            }
            
            h1, h2, h3 {
                page-break-after: avoid;
            }
            
            .table-of-contents {
                page-break-after: always;
            }
            
            a {
                color: var(--text);
                text-decoration: none;
            }
        }
    </style>
</head>
<body>
    <header class="header-content">
        <h1>Guide de Voyage Houston 2025</h1>
        <p class="subtitle">Version Optimisée - FIRST Championship et découverte de Houston</p>
    </header>
    
    <div class="content-section table-of-contents">
        <h2>TABLE DES MATIÈRES</h2>
        <ul>
            <li><a href="#introduction">Introduction</a></li>
            <li><a href="#checklist-principale">Checklist Principale</a></li>
            <li><a href="#itineraires">Itinéraires Journaliers</a></li>
            <li><a href="#gastronomie">Gastronomie</a></li>
            <li><a href="#securite-sante">Sécurité et Santé</a></li>
            <li><a href="#transport">Transport</a></li>
            <li><a href="#annexes">Annexes</a>
                <ul>
                    <li><a href="#annexe-touristanbul">Guide Pratique Touristanbul</a></li>
                </ul>
            </li>
        </ul>
    </div>
    
    <div id="introduction" class="content-section">
        <h2>INTRODUCTION</h2>
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
    </div>
    
    <div id="checklist-principale" class="content-section">
        <h2>CHECKLIST PRINCIPALE</h2>
        <p>Cette checklist regroupe tous les éléments importants à vérifier avant et pendant votre séjour.</p>
        
        ${markdownToHtml(checklistContent.split('# Checklist Principale - Houston 2025')[1])}
    </div>
    
    <div id="itineraires" class="content-section">
        <h2>ITINÉRAIRES JOURNALIERS</h2>
        <p>Cette section présente les itinéraires journaliers simplifiés pour votre séjour à Houston.</p>
        
        ${markdownToHtml(itinerairesContent.split('# Itinéraires Simplifiés - Houston 2025')[1])}
    </div>
    
    <div id="gastronomie" class="content-section">
        <h2>GASTRONOMIE</h2>
        <p>Cette section regroupe toutes les recommandations de restaurants pour votre séjour à Houston.</p>
        
        ${markdownToHtml(gastroContent.split('# Guide Gastronomique - Houston 2025')[1])}
    </div>
    
    <div id="securite-sante" class="content-section">
        <h2>SÉCURITÉ ET SANTÉ</h2>
        <p>Cette section regroupe toutes les informations importantes concernant la sécurité et la santé pendant votre séjour à Houston.</p>
        
        <h3>Contacts d'urgence</h3>
        <ul>
            <li><strong>Urgences générales</strong>: 911 (police, pompiers, ambulance)</li>
            <li><strong>Consulat de France à Houston</strong>: +1 346-272-5363</li>
            <li><strong>Hôpital le plus proche</strong>: Houston Methodist Hospital (+1 713-790-3311)</li>
            <li><strong>Police non urgente</strong>: +1 713-884-3131</li>
        </ul>
        
        <h3>Conseils de santé</h3>
        <ul>
            <li><strong>Hydratation</strong>: Boire régulièrement de l'eau, surtout lors des activités extérieures</li>
            <li><strong>Protection solaire</strong>: Appliquer de la crème solaire (indice 30+) et porter un chapeau</li>
            <li><strong>Climatisation</strong>: Les bâtiments sont fortement climatisés, prévoir une couche supplémentaire</li>
            <li><strong>Médicaments</strong>: Emporter vos médicaments personnels avec les ordonnances</li>
        </ul>
        
        <h3>Conseils de sécurité</h3>
        <ul>
            <li>Gardez vos objets de valeur en sécurité et soyez vigilant dans les lieux touristiques</li>
            <li>Utilisez des moyens de transport fiables (Uber, Lyft, transports en commun officiels)</li>
            <li>Ayez toujours une pièce d'identité sur vous</li>
            <li>Enregistrez les numéros d'urgence dans votre téléphone</li>
        </ul>
    </div>
    
    <div id="transport" class="content-section">
        <h2>TRANSPORT</h2>
        <p>Cette section présente les différentes options de transport à Houston.</p>
        
        <h3>🚇 METRORail (Métro léger)</h3>
        
        <h4>Lignes principales</h4>
        <ul>
            <li><strong>Ligne Rouge</strong> (North Line): Relie le centre-ville au nord de Houston</li>
            <li><strong>Ligne Verte</strong> (East End Line): Dessert l'est de Houston</li>
            <li><strong>Ligne Violette</strong> (Southeast Line): Dessert le sud-est de Houston, incluant le Museum District</li>
        </ul>
        
        <h4>Tarifs et billets</h4>
        <ul>
            <li><strong>Tarif standard</strong>: 1,25$ par trajet</li>
            <li><strong>Carte METRO Q</strong>: Rechargeable, recommandée pour plusieurs trajets</li>
            <li><strong>Pass journalier</strong>: 3$ pour des trajets illimités pendant 24h</li>
        </ul>
        
        <h4>Conseils pratiques</h4>
        <ul>
            <li>Fréquence: Toutes les 6-12 minutes en semaine, 12-18 minutes le week-end</li>
            <li>Horaires: 5h00-23h30 (lun-jeu), 5h00-0h30 (ven), 5h30-0h30 (sam), 5h30-23h30 (dim)</li>
            <li>La ligne rouge dessert le Museum District et le Medical Center</li>
            <li>Validez votre billet avant de monter dans le train</li>
        </ul>
        
        <h3>🚌 Bus METRO</h3>
        
        <h4>Réseau</h4>
        <ul>
            <li>Plus de 80 lignes couvrant toute la ville</li>
            <li>Les bus numérotés 1-99 sont des lignes locales</li>
            <li>Les bus numérotés 100+ sont des lignes express</li>
        </ul>
        
        <h4>Tarifs et billets</h4>
        <ul>
            <li><strong>Tarif standard</strong>: 1,25$ par trajet (même tarif que le METRORail)</li>
            <li><strong>Correspondances gratuites</strong> pendant 3 heures</li>
        </ul>
        
        <h4>Conseils pratiques</h4>
        <ul>
            <li>Utilisez l'application METRO Trip pour les horaires en temps réel</li>
            <li>Signalez votre arrêt en tirant sur le cordon</li>
            <li>Préparez l'appoint ou utilisez la carte METRO Q</li>
        </ul>
        
        <h3>🚗 Uber/Lyft</h3>
        
        <h4>Disponibilité</h4>
        <ul>
            <li>Excellente couverture dans toute la ville</li>
            <li>Temps d'attente généralement court (5-10 minutes)</li>
        </ul>
        
        <h4>Tarifs estimés</h4>
        <ul>
            <li>Aéroport IAH → Hôtel: 35-45$</li>
            <li>Hôtel → Convention Center: 10-15$</li>
            <li>Hôtel → Space Center Houston: 35-45$</li>
            <li>Hôtel → Galleria: 15-20$</li>
        </ul>
        
        <h4>Conseils pratiques</h4>
        <ul>
            <li>Vérifiez le modèle et la plaque d'immatriculation avant de monter</li>
            <li>Partagez votre itinéraire avec un proche pour plus de sécurité</li>
            <li>Les heures de pointe (7h-9h et 16h-19h) peuvent augmenter les tarifs</li>
        </ul>
    </div>
    
    <div id="annexes" class="content-section">
        <h2>ANNEXES</h2>
        
        <div id="annexe-touristanbul" class="annexe">
            <h3>Guide Pratique Touristanbul</h3>
            <p><em>Cette annexe contient des informations sur le programme Touristanbul, qui peut être utile si votre vol comprend une escale à Istanbul.</em></p>
            
            ${markdownToHtml(touristanbulContent.split('# Annexe C : Guide Pratique Touristanbul')[1])}
        </div>
    </div>
    
    <footer class="footer-content">
        <p>Guide de Voyage Houston 2025 - Version Optimisée</p>
        <p>Dernière mise à jour : ${new Date().toLocaleDateString()}</p>
    </footer>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
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
    </script>
</body>
</html>`;
    
    // Écrire le fichier HTML
    fs.writeFileSync(outputPath, htmlContent, 'utf8');
    
    console.log(`Guide optimisé créé : ${outputPath}`);
    
    // Créer un script pour générer le PDF
    const pdfScriptPath = path.join(__dirname, '..', 'generate-pdf-optimized.js');
    const pdfScriptContent = `
const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    console.log('Lancement du navigateur...');
    const browser = await puppeteer.launch();
    
    console.log('Ouverture d\\'une nouvelle page...');
    const page = await browser.newPage();
    
    console.log('Chargement du fichier HTML...');
    await page.goto('file://${path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_optimise.html').replace(/\\/g, '\\\\')}', { waitUntil: 'networkidle0' });
    
    console.log('Attente du chargement du contenu...');
    await page.waitForSelector('body');
    
    console.log('Ajout des styles d\\'impression...');
    await page.addStyleTag({
      content: \`
        @page {
          margin: 2cm;
          size: A4;
        }
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          page-break-inside: avoid;
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
        .content-section {
          page-break-before: always;
        }
        #introduction {
          page-break-before: avoid;
        }
      \`
    });
    
    console.log('Génération du PDF...');
    await page.pdf({
      path: '${path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_optimise.pdf').replace(/\\/g, '\\\\')}',
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div style="width: 100%; font-size: 8px; text-align: center; padding: 5px 0;">Guide de Voyage Houston 2025 - Version Optimisée</div>',
      footerTemplate: '<div style="width: 100%; font-size: 8px; text-align: center; padding: 5px 0;">Page <span class="pageNumber"></span> sur <span class="totalPages"></span></div>',
      margin: {
        top: '2cm',
        bottom: '2cm',
        left: '2cm',
        right: '2cm'
      }
    });
    
    console.log('Fermeture du navigateur...');
    await browser.close();
    
    console.log('PDF généré avec succès : ${path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_optimise.pdf').replace(/\\/g, '\\\\')}');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

generatePDF();
    `;
    
    fs.writeFileSync(pdfScriptPath, pdfScriptContent, 'utf8');
    
    console.log(`Script de génération de PDF créé : ${pdfScriptPath}`);
    console.log('Pour générer le PDF, exécutez : node generate-pdf-optimized.js');
    
    console.log('Création terminée avec succès !');
  } catch (error) {
    console.error('Erreur lors de la création du guide optimisé :', error);
  }
}

// Exécuter la fonction
createOptimizedGuide();
