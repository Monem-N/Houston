
const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    await page.goto('file:///Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_temp.html', { waitUntil: 'networkidle0' });
    
    await page.pdf({
      path: '/Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_ameliore.pdf',
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
    
    console.log('PDF généré avec succès : /Users/monemnaifer/Dev/Houston/Houston_Guide/Guide_Voyage_Houston_2025_ameliore.pdf');
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

generatePDF();
    