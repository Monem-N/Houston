/**
 * Script amélioré pour générer une version PDF de haute qualité
 * Utilise puppeteer avec des configurations optimisées
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// Fonction pour générer le PDF
async function generatePDF() {
  try {
    // Chemins des fichiers
    const htmlFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    const pdfFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern_pro.pdf');

    // Vérifier si le fichier HTML existe
    if (!fs.existsSync(htmlFilePath)) {
      throw new Error(`Le fichier HTML n'existe pas : ${htmlFilePath}`);
    }

    console.log('Lancement du navigateur avec des paramètres optimisés...');
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--font-render-hinting=none', // Améliore le rendu des polices
        '--disable-web-security' // Permet de charger des ressources locales
      ]
    });

    console.log('Ouverture d\'une nouvelle page...');
    const page = await browser.newPage();

    // Configurer la page pour une meilleure qualité d'impression
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2 // Résolution plus élevée pour une meilleure qualité
    });

    // Charger le fichier HTML
    console.log('Chargement du fichier HTML...');
    await page.goto(`file://${htmlFilePath}`, {
      waitUntil: 'networkidle2',
      timeout: 60000 // Augmenter le timeout pour s'assurer que tout est chargé
    });

    // Attendre que le contenu soit complètement chargé
    console.log('Attente du chargement complet du contenu...');
    await page.waitForSelector('.content-section', { timeout: 30000 });

    // Attendre un peu plus pour s'assurer que tout est rendu
    // Utiliser setTimeout au lieu de waitForTimeout
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Désactiver les styles d'impression existants et appliquer uniquement nos styles
    console.log('Application des styles d\'impression optimisés...');
    await page.evaluate(() => {
      // Désactiver les feuilles de style d'impression existantes
      const existingPrintStyles = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
      existingPrintStyles.forEach(styleSheet => {
        styleSheet.disabled = true;
      });

      // Supprimer les styles d'impression inline existants
      const existingStyles = document.querySelectorAll('style');
      existingStyles.forEach(style => {
        if (style.textContent.includes('@media print') || style.textContent.includes('@page')) {
          style.textContent = style.textContent.replace(/@media\s+print[^{]*{[^}]*}/g, '');
          style.textContent = style.textContent.replace(/@page[^{]*{[^}]*}/g, '');
        }
      });
    });

    // Ajouter nos propres styles d'impression optimisés
    await page.addStyleTag({
      content: `
        /* Réinitialisation pour l'impression */
        @page {
          size: A4;
          margin: 2cm 1.5cm;
        }

        /* Styles généraux */
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-size: 11pt;
          line-height: 1.5;
          color: #000000;
          background-color: #ffffff;
          margin: 0;
          padding: 0;
        }

        /* Masquer les éléments non nécessaires pour l'impression */
        .main-header, .back-to-top, .floating-nav, .nav-menu, .section-toggle, #theme-toggle, #print-btn {
          display: none !important;
        }

        /* Styles de section */
        .content-section {
          margin-bottom: 1.5cm;
          padding: 0;
          box-shadow: none;
          background-color: transparent;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        /* Styles d'en-tête */
        h1 {
          font-size: 18pt;
          color: #2563eb;
          margin-top: 1cm;
          margin-bottom: 0.5cm;
          page-break-after: avoid;
          break-after: avoid;
          border-bottom: 1pt solid #2563eb;
          padding-bottom: 0.2cm;
        }

        h2 {
          font-size: 16pt;
          color: #1e40af;
          margin-top: 0.8cm;
          margin-bottom: 0.4cm;
          page-break-after: avoid;
          break-after: avoid;
        }

        h3 {
          font-size: 14pt;
          color: #333333;
          margin-top: 0.6cm;
          margin-bottom: 0.3cm;
          page-break-after: avoid;
          break-after: avoid;
        }

        h4, h5, h6 {
          page-break-after: avoid;
          break-after: avoid;
        }

        /* Styles de paragraphe */
        p {
          margin-bottom: 0.3cm;
          orphans: 3;
          widows: 3;
        }

        /* Styles d'image */
        img {
          max-width: 16cm;
          max-height: 10cm;
          object-fit: contain;
          margin: 0.5cm auto;
          display: block;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .image-container {
          page-break-inside: avoid;
          break-inside: avoid;
          margin: 0.5cm 0;
        }

        .image-caption {
          display: block;
          opacity: 1;
          position: static;
          background-color: transparent;
          color: #666666;
          font-style: italic;
          font-size: 9pt;
          text-align: center;
          margin-top: 0.2cm;
        }

        /* Styles de galerie d'images */
        .image-gallery {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 0.5cm;
        }

        .image-gallery img {
          max-width: 7cm;
          max-height: 5cm;
          margin: 0;
        }

        /* Styles de tableau */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.5cm 0;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        th {
          background-color: #f0f0f0;
          border: 1pt solid #cccccc;
          padding: 0.2cm;
          text-align: left;
          font-weight: bold;
        }

        td {
          border: 1pt solid #cccccc;
          padding: 0.2cm;
        }

        /* Styles de liste */
        ul, ol {
          margin: 0.3cm 0;
          padding-left: 0.5cm;
        }

        li {
          margin-bottom: 0.1cm;
        }

        /* Styles de lien */
        a {
          color: #000000;
          text-decoration: none;
        }

        a[href^="http"]:after {
          content: " (" attr(href) ")";
          font-size: 8pt;
          color: #666666;
        }

        /* Styles de carte d'information */
        .info-card {
          border: 1pt solid #cccccc;
          padding: 0.3cm;
          margin: 0.5cm 0;
          page-break-inside: avoid;
          break-inside: avoid;
          background-color: #f9f9f9;
        }

        .warning-card {
          border-color: #f97316;
          background-color: #fff7ed;
        }

        .info-card h4 {
          margin-top: 0;
          margin-bottom: 0.2cm;
          color: #2563eb;
        }

        .warning-card h4 {
          color: #f97316;
        }

        /* Styles de table des matières */
        .toc-container {
          page-break-after: always;
          break-after: page;
        }

        .toc {
          margin-left: 0;
          padding-left: 0;
        }

        .toc-level-1 {
          margin-top: 0.3cm;
          font-weight: bold;
        }

        .toc-level-2 {
          margin-left: 0.5cm;
        }

        /* Forcer les sauts de page aux endroits appropriés */
        .page-break-before {
          page-break-before: always;
          break-before: page;
        }

        .page-break-after {
          page-break-after: always;
          break-after: page;
        }

        /* Styles spécifiques pour certaines sections */
        #Introduction_et_Sommaire---voyage-à-houston {
          page-break-before: avoid;
          break-before: avoid;
        }
      `
    });

    // Ajouter des sauts de page aux endroits appropriés
    console.log('Ajout des sauts de page...');
    await page.evaluate(() => {
      // Ajouter des classes pour forcer les sauts de page
      const mainSections = document.querySelectorAll('main > .content-section');
      mainSections.forEach((section, index) => {
        if (index > 0) {
          section.classList.add('page-break-before');
        }
      });

      // Ajouter une classe à la table des matières
      const toc = document.querySelector('.toc-container');
      if (toc) {
        toc.classList.add('page-break-after');
      }
    });

    // Supprimer les en-têtes et pieds de page existants dans le HTML
    console.log('Suppression des en-têtes et pieds de page existants...');
    await page.evaluate(() => {
      const existingHeaders = document.querySelectorAll('.pdf-header, .pdf-footer');
      existingHeaders.forEach(el => el.remove());
    });

    // Vérifier si le document a déjà des en-têtes et pieds de page
    const hasCustomHeaderFooter = await page.evaluate(() => {
      return document.querySelector('.pdf-header, .pdf-footer') !== null;
    });

    // Générer le PDF avec des options optimisées
    console.log('Génération du PDF avec des paramètres optimisés...');
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
      // N'afficher les en-têtes et pieds de page que si le document n'en a pas déjà
      displayHeaderFooter: !hasCustomHeaderFooter,
      headerTemplate: hasCustomHeaderFooter ? '' : `
        <div style="font-size: 9pt; width: 100%; text-align: center; margin: 0 1.5cm; font-family: sans-serif; color: #666666;">
          Guide de Voyage Houston 2025
        </div>
      `,
      footerTemplate: hasCustomHeaderFooter ? '' : `
        <div style="font-size: 9pt; width: 100%; text-align: center; margin: 0 1.5cm; font-family: sans-serif; color: #666666;">
          Page <span class="pageNumber"></span> sur <span class="totalPages"></span>
        </div>
      `,
      preferCSSPageSize: true,
      scale: 0.98, // Légère réduction pour éviter les problèmes de débordement
      timeout: 60000 // Augmenter le timeout pour les documents volumineux
    });

    console.log('Fermeture du navigateur...');
    await browser.close();

    console.log(`PDF de haute qualité généré avec succès : ${pdfFilePath}`);
  } catch (error) {
    console.error('Erreur lors de la génération du PDF :', error);
  }
}

// Exécuter la fonction
generatePDF();
