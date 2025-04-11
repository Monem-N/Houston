
const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    console.log('Lancement du navigateur...');
    const browser = await puppeteer.launch();
    
    console.log('Ouverture d\'une nouvelle page...');
    const page = await browser.newPage();
    
    console.log('Chargement du fichier HTML...');
    await page.goto('file:///Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_optimise.html', { waitUntil: 'networkidle0' });
    
    console.log('Attente du chargement du contenu...');
    await page.waitForSelector('body');
    
    console.log('Ajout des styles d\'impression...');
    await page.addStyleTag({
      content: `
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
      `
    });
    
    console.log('Génération du PDF...');
    await page.pdf({
      path: '/Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_optimise.pdf',
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
    
    console.log('PDF généré avec succès : /Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_optimise.pdf');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

generatePDF();
    