/**
 * Script pour générer une version PDF du document modernisé
 * Note: Ce script nécessite puppeteer pour fonctionner
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Fonction pour générer le PDF
async function generatePDF() {
  try {
    // Chemins des fichiers
    const htmlFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    const pdfFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.pdf');
    
    // Vérifier si le fichier HTML existe
    if (!fs.existsSync(htmlFilePath)) {
      throw new Error(`Le fichier HTML n'existe pas : ${htmlFilePath}`);
    }
    
    console.log('Lancement du navigateur...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    console.log('Ouverture d\'une nouvelle page...');
    const page = await browser.newPage();
    
    // Charger le fichier HTML
    console.log('Chargement du fichier HTML...');
    await page.goto(`file://${htmlFilePath}`, {
      waitUntil: 'networkidle2'
    });
    
    // Attendre que le contenu soit chargé
    console.log('Attente du chargement du contenu...');
    await page.waitForSelector('.content-section');
    
    // Ajouter un style spécifique pour l'impression
    console.log('Ajout des styles d\'impression...');
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 2cm 1.5cm;
        }
        
        body {
          font-size: 11pt;
          background-color: white;
          color: black;
        }
        
        .main-header, .back-to-top, .floating-nav, .nav-menu, .section-toggle {
          display: none !important;
        }
        
        .content-section {
          box-shadow: none;
          margin-bottom: 1cm;
          padding: 0;
          break-inside: avoid;
          page-break-inside: avoid;
        }
        
        h1, h2, h3, h4, h5, h6 {
          page-break-after: avoid;
          break-after: avoid;
        }
        
        img {
          max-width: 60%;
          box-shadow: none;
        }
        
        a {
          color: black;
          text-decoration: none;
        }
        
        a[href^="http"]:after {
          content: " (" attr(href) ")";
          font-size: 90%;
          color: #666;
        }
        
        table {
          box-shadow: none;
          border: 1pt solid #ddd;
        }
        
        thead {
          background-color: #f2f2f2;
          color: black;
        }
        
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        
        .image-caption {
          display: block;
          opacity: 1;
          position: static;
          background-color: transparent;
          color: black;
          font-style: italic;
          text-align: center;
          margin-top: 0.5cm;
        }
      `
    });
    
    // Générer le PDF
    console.log('Génération du PDF...');
    await page.pdf({
      path: pdfFilePath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '2cm',
        right: '1.5cm',
        bottom: '2cm',
        left: '1.5cm'
      },
      displayHeaderFooter: true,
      headerTemplate: '<div style="font-size: 9pt; width: 100%; text-align: center; margin: 0 1.5cm;">Guide de Voyage Houston 2025</div>',
      footerTemplate: '<div style="font-size: 9pt; width: 100%; text-align: center; margin: 0 1.5cm;">Page <span class="pageNumber"></span> sur <span class="totalPages"></span></div>'
    });
    
    console.log('Fermeture du navigateur...');
    await browser.close();
    
    console.log(`PDF généré avec succès : ${pdfFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

// Exécuter la fonction
generatePDF();
