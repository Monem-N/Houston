/**
 * Script pour optimiser le Guide de Voyage Houston 2025
 * Ce script se concentre sur les modifications recommandées sans changer radicalement la structure
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour optimiser le guide
async function optimizeGuide() {
  try {
    // Chemins des fichiers
    const inputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_sans_images.html');
    const outputPath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_optimise.html');
    const gastroPath = path.join(__dirname, '..', 'guide_gastronomique_optimise.md');
    const checklistPath = path.join(__dirname, '..', 'checklist_consolidee.md');
    const touristanbulPath = path.join(__dirname, '..', 'annexe_touristanbul.md');

    console.log('Optimisation du Guide de Voyage Houston 2025...');

    // Lire les fichiers
    const html = fs.readFileSync(inputPath, 'utf8');
    const gastroContent = fs.readFileSync(gastroPath, 'utf8');
    const checklistContent = fs.readFileSync(checklistPath, 'utf8');
    const touristanbulContent = fs.readFileSync(touristanbulPath, 'utf8');

    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Définir la variable mainContent une seule fois pour tout le script
    const mainContent = document.querySelector('body') || document.documentElement;
    console.log('Element principal du document identifié');

    // Fonction pour convertir le Markdown en HTML (version simplifiée)
    function markdownToHtml(markdown) {
      let html = markdown
        // Titres
        .replace(/^# (.+)$/gm, '<h1>$1</h1>')
        .replace(/^## (.+)$/gm, '<h2>$2</h2>')
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

    // 1. Standardiser les en-têtes dans une seule langue (français)
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const englishToFrench = {
      'PRACTICAL TIPS': 'CONSEILS PRATIQUES',
      'HOTEL': 'HÔTEL',
      'TRANSPORTATION': 'TRANSPORT',
      'FOOD': 'NOURRITURE',
      'SHOPPING': 'SHOPPING',
      'ATTRACTIONS': 'ATTRACTIONS',
      'SAFETY': 'SÉCURITÉ',
      'EMERGENCY': 'URGENCE',
      'CONTACTS': 'CONTACTS',
      'SCHEDULE': 'PROGRAMME',
      'ITINERARY': 'ITINÉRAIRE',
      'DAY': 'JOUR',
      'MORNING': 'MATIN',
      'AFTERNOON': 'APRÈS-MIDI',
      'EVENING': 'SOIR',
      'NIGHT': 'NUIT',
      'BREAKFAST': 'PETIT-DÉJEUNER',
      'LUNCH': 'DÉJEUNER',
      'DINNER': 'DÎNER',
      'MUSEUM': 'MUSÉE',
      'PARK': 'PARC',
      'RESTAURANT': 'RESTAURANT',
      'CHECKLIST': 'LISTE DE VÉRIFICATION'
    };

    headings.forEach(heading => {
      const text = heading.textContent.trim();

      // Vérifier si le texte est en anglais et a une traduction
      Object.entries(englishToFrench).forEach(([english, french]) => {
        if (text.includes(english)) {
          heading.textContent = text.replace(english, french);
        }
      });
    });

    console.log('En-têtes standardisés en français');

    // 2. Supprimer les numéros de page redondants
    const pageNumbers = document.querySelectorAll('.page-number, .page-info');
    pageNumbers.forEach(element => {
      element.remove();
    });

    // Rechercher également les textes contenant "Page X sur Y"
    const allElements = document.querySelectorAll('p, div, span, footer');
    allElements.forEach(element => {
      if (element.textContent.match(/Page \d+ sur \d+/)) {
        element.remove();
      }
    });

    console.log('Numéros de page redondants supprimés');

    // 3. Créer une section unique "Sécurité et Santé"

    // Rechercher toutes les sections liées à la sécurité et à la santé
    const safetyContent = [];
    const safetyKeywords = ['sécurité', 'santé', 'urgence', 'médical', 'hôpital', 'crème solaire', 'hydratation', 'médicament'];

    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      const text = paragraph.textContent.toLowerCase();

      // Vérifier si le paragraphe contient des mots-clés liés à la sécurité
      if (safetyKeywords.some(keyword => text.includes(keyword))) {
        safetyContent.push(paragraph.outerHTML);
      }
    });

    // Créer une nouvelle section "Sécurité et Santé"
    const safetySection = document.createElement('div');
    safetySection.className = 'content-section';
    safetySection.id = 'securite-sante';
    safetySection.innerHTML = `
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

      ${safetyContent.join('\n')}
    `;

    // Ajouter la section au document
    try {
      mainContent.appendChild(safetySection);
      console.log('Section "Sécurité et Santé" ajoutée au document');
    } catch (error) {
      console.log('Erreur lors de l\'ajout de la section "Sécurité et Santé":', error.message);
    }

    console.log('Section "Sécurité et Santé" créée');

    // 4. Consolider les mentions de restaurants dans une section "Gastronomie"

    // Créer une section "Gastronomie"
    const gastroSection = document.createElement('div');
    gastroSection.className = 'content-section';
    gastroSection.id = 'gastronomie';

    // Extraire le contenu du guide gastronomique optimisé (sans le titre principal)
    const gastroHtml = markdownToHtml(gastroContent.split('# Guide Gastronomique - Houston 2025')[1]);

    gastroSection.innerHTML = `
      <h2>GASTRONOMIE</h2>
      <p>Cette section regroupe toutes les recommandations de restaurants pour votre séjour à Houston.</p>

      ${gastroHtml}
    `;

    // Ajouter la section au document
    try {
      mainContent.appendChild(gastroSection);
      console.log('Section "Gastronomie" ajoutée au document');
    } catch (error) {
      console.log('Erreur lors de l\'ajout de la section "Gastronomie":', error.message);
    }

    console.log('Section "Gastronomie" créée');

    // 5. Fusionner les checklists répétitives

    // Créer une section "Checklist principale"
    const checklistSection = document.createElement('div');
    checklistSection.className = 'content-section';
    checklistSection.id = 'checklist-principale';

    // Extraire le contenu de la checklist consolidée (sans le titre principal)
    const checklistHtml = markdownToHtml(checklistContent.split('# Checklist Principale - Houston 2025')[1]);

    checklistSection.innerHTML = `
      <h2>CHECKLIST PRINCIPALE</h2>
      <p>Cette checklist regroupe tous les éléments importants à vérifier avant et pendant votre séjour.</p>

      ${checklistHtml}
    `;

    // Ajouter la section au document
    try {
      mainContent.appendChild(checklistSection);
      console.log('Section "Checklist principale" ajoutée au document');
    } catch (error) {
      console.log('Erreur lors de l\'ajout de la section "Checklist principale":', error.message);
    }

    console.log('Section "Checklist principale" créée');

    // 6. Déplacer les sections sur Touristanbul dans une annexe dédiée

    // Supprimer les sections existantes sur Touristanbul
    const touristanbulKeywords = ['touristanbul', 'istanbul', 'turquie', 'mosquée', 'bosphore'];

    const allSections = document.querySelectorAll('div, section');
    const touristanbulSections = [];

    allSections.forEach(section => {
      const text = section.textContent.toLowerCase();

      // Vérifier si la section contient des mots-clés liés à Touristanbul
      if (touristanbulKeywords.some(keyword => text.includes(keyword))) {
        touristanbulSections.push(section);
      }
    });

    // Supprimer les sections identifiées (avec vérification de sécurité)
    touristanbulSections.forEach(section => {
      try {
        if (section && section.parentNode) {
          section.parentNode.removeChild(section);
        }
      } catch (error) {
        console.log('Erreur lors de la suppression d\'une section Touristanbul:', error.message);
      }
    });

    // Créer une annexe "Touristanbul"
    const touristanbulSection = document.createElement('div');
    touristanbulSection.className = 'content-section annexe';
    touristanbulSection.id = 'annexe-touristanbul';

    // Extraire le contenu de l'annexe Touristanbul (sans le titre principal)
    const touristanbulHtml = markdownToHtml(touristanbulContent.split('# Annexe C : Guide Pratique Touristanbul')[1]);

    touristanbulSection.innerHTML = `
      <h2>ANNEXE : GUIDE PRATIQUE TOURISTANBUL</h2>
      <p><em>Cette annexe contient des informations sur le programme Touristanbul, qui peut être utile si votre vol comprend une escale à Istanbul.</em></p>

      ${touristanbulHtml}
    `;

    // Ajouter l'annexe au document
    try {
      mainContent.appendChild(touristanbulSection);
      console.log('Annexe "Touristanbul" ajoutée au document');
    } catch (error) {
      console.log('Erreur lors de l\'ajout de l\'annexe "Touristanbul":', error.message);
    }

    console.log('Annexe "Touristanbul" créée');

    // 7. Ajouter une table des matières mise à jour

    const tocSection = document.createElement('div');
    tocSection.className = 'content-section table-of-contents';
    tocSection.id = 'table-des-matieres';
    tocSection.innerHTML = `
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
    `;

    // Ajouter la table des matières au début du document
    try {
      const firstSection = mainContent.querySelector('.content-section');
      if (firstSection) {
        mainContent.insertBefore(tocSection, firstSection);
      } else {
        mainContent.appendChild(tocSection);
      }
      console.log('Table des matières ajoutée au document');
    } catch (error) {
      console.log('Erreur lors de l\'ajout de la table des matières:', error.message);
      // Essayer une autre approche
      try {
        mainContent.insertBefore(tocSection, mainContent.firstChild);
        console.log('Table des matières ajoutée en premier élément');
      } catch (error) {
        console.log('Erreur lors de l\'ajout de la table des matières en premier élément:', error.message);
      }
    }

    console.log('Table des matières mise à jour');

    // 8. Ajouter des styles CSS pour améliorer la présentation

    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .content-section {
        margin-bottom: 2em;
        padding: 1em;
        border-radius: 8px;
        background-color: #f9fafb;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .table-of-contents ul {
        list-style-type: none;
        padding-left: 1.5em;
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

      .annexe {
        border-left: 4px solid #3b82f6;
        padding-left: 1.5em;
      }

      h2 {
        color: #2563eb;
        border-bottom: 1px solid #e5e7eb;
        padding-bottom: 0.5em;
      }

      h3 {
        color: #4b5563;
        margin-top: 1.5em;
      }
    `;

    // Ajouter les styles au document
    const head = document.querySelector('head');
    if (head) {
      head.appendChild(styleElement);
    } else {
      document.documentElement.insertBefore(styleElement, document.documentElement.firstChild);
    }

    console.log('Styles CSS ajoutés');

    // Écrire le fichier HTML optimisé
    const outputHtml = dom.serialize();
    fs.writeFileSync(outputPath, outputHtml, 'utf8');

    console.log(`Guide optimisé créé : ${outputPath}`);

    // Créer un fichier CSS moderne pour le guide optimisé
    const cssPath = path.join(__dirname, '..', 'css', 'modern-styles-optimized.css');
    const cssContent = `
      /* Styles modernes pour le Guide de Voyage Houston 2025 optimisé */

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
    `;

    // Créer le répertoire css s'il n'existe pas
    const cssDir = path.join(__dirname, '..', 'css');
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir);
    }

    // Écrire le fichier CSS
    fs.writeFileSync(cssPath, cssContent, 'utf8');

    console.log(`Fichier CSS moderne créé : ${cssPath}`);

    console.log('Optimisation terminée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'optimisation du guide :', error);
  }
}

// Exécuter la fonction
optimizeGuide();
