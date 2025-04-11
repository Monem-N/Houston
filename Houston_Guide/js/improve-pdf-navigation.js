/**
 * Script pour améliorer la navigation dans le PDF
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour améliorer la navigation
async function improvePdfNavigation() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');

    // Vérifier si le fichier existe
    if (!fs.existsSync(filePath)) {
      console.log('Le fichier sans images n\'existe pas. Utilisation du fichier original.');
      filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    }

    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');

    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    console.log('Amélioration de la navigation pour le PDF...');

    // 1. Ajouter des signets PDF (bookmarks) en utilisant des attributs data-pdf-bookmark
    const headings = document.querySelectorAll('h1, h2');
    headings.forEach(heading => {
      heading.setAttribute('data-pdf-bookmark', heading.textContent.trim());
    });

    console.log(`${headings.length} signets PDF ajoutés.`);

    // 2. Ajouter des numéros de page aux sections principales
    const mainSections = document.querySelectorAll('main > .content-section');
    mainSections.forEach((section, index) => {
      const heading = section.querySelector('h1, h2');
      if (heading) {
        // Ajouter un attribut pour le numéro de page
        section.setAttribute('data-pdf-page', index + 1);

        // Ajouter un élément de numéro de page visible
        const pageNumber = document.createElement('div');
        pageNumber.className = 'pdf-page-number';
        pageNumber.textContent = `Page ${index + 1}`;
        section.insertBefore(pageNumber, section.firstChild);
      }
    });

    console.log(`Numéros de page ajoutés à ${mainSections.length} sections.`);

    // 3. Ajouter une table des matières améliorée pour le PDF
    const toc = document.querySelector('.toc');
    if (toc) {
      // Ajouter des attributs pour améliorer la navigation dans le PDF
      const tocItems = toc.querySelectorAll('a');
      tocItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            const section = targetElement.closest('.content-section');
            if (section) {
              const pageNumber = section.getAttribute('data-pdf-page');
              if (pageNumber) {
                // Ajouter le numéro de page au texte du lien
                item.textContent = `${item.textContent} (p. ${pageNumber})`;
              }
            }
          }
        }
      });

      console.log('Table des matières améliorée pour le PDF.');
    }

    // 4. Ajouter des styles simplifiés pour le PDF
    const style = document.createElement('style');
    style.textContent = `
      /* Styles pour améliorer la navigation dans le PDF */
      .pdf-page-number {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 9pt;
        color: #666666;
        font-family: sans-serif;
      }

      /* Styles pour la table des matières */
      .toc a {
        text-decoration: none;
        color: #000000;
      }
    `;
    document.head.appendChild(style);

    console.log('Styles simplifiés d\'amélioration de la navigation ajoutés.');

    // Créer un nouveau fichier avec navigation améliorée
    const outputFilePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_navigation.html');
    fs.writeFileSync(outputFilePath, dom.serialize(), 'utf8');

    console.log(`Fichier avec navigation améliorée créé : ${outputFilePath}`);
  } catch (error) {
    console.error('Erreur lors de l\'amélioration de la navigation :', error);
  }
}

// Exécuter la fonction
improvePdfNavigation();
