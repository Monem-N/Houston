/**
 * Script pour améliorer le document HTML modernisé avec des éléments interactifs
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Fonction pour améliorer le document
async function enhanceDocument() {
  try {
    // Chemin du fichier
    const filePath = path.join(__dirname, '..', 'Guide_Voyage_Houston_2025_modern.html');
    
    // Lire le fichier
    const html = fs.readFileSync(filePath, 'utf8');
    
    // Créer un objet DOM
    const dom = new JSDOM(html);
    const document = dom.window.document;
    
    // Ajouter des éléments interactifs
    addInteractiveElements(document);
    
    // Améliorer la structure des sections
    enhanceSections(document);
    
    // Améliorer les tableaux
    enhanceTables(document);
    
    // Améliorer les images
    enhanceImages(document);
    
    // Ajouter des cartes d'information
    addInfoCards(document);
    
    // Écrire le fichier mis à jour
    fs.writeFileSync(filePath, dom.serialize(), 'utf8');
    
    console.log('Document amélioré avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'amélioration du document :', error);
  }
}

// Fonction pour ajouter des éléments interactifs
function addInteractiveElements(document) {
  // Ajouter des boutons pour masquer/afficher les sections
  const sections = document.querySelectorAll('.content-section');
  sections.forEach(section => {
    const heading = section.querySelector('h1, h2');
    if (heading) {
      // Ajouter un bouton de bascule
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'section-toggle';
      toggleBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
      toggleBtn.setAttribute('aria-label', 'Masquer/Afficher la section');
      toggleBtn.setAttribute('title', 'Masquer/Afficher la section');
      heading.appendChild(toggleBtn);
      
      // Ajouter un attribut data-expanded
      section.setAttribute('data-expanded', 'true');
    }
  });
  
  // Ajouter un script pour gérer les boutons de bascule
  const script = document.createElement('script');
  script.textContent = `
    // Fonction pour basculer les sections
    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('section-toggle') || event.target.parentNode.classList.contains('section-toggle')) {
        const button = event.target.classList.contains('section-toggle') ? event.target : event.target.parentNode;
        const heading = button.parentNode;
        const section = heading.parentNode;
        const isExpanded = section.getAttribute('data-expanded') === 'true';
        
        // Basculer l'état
        section.setAttribute('data-expanded', isExpanded ? 'false' : 'true');
        
        // Mettre à jour l'icône
        button.innerHTML = isExpanded ? '<i class="fas fa-chevron-down"></i>' : '<i class="fas fa-chevron-up"></i>';
        
        // Masquer/Afficher le contenu
        const content = section.querySelectorAll(':scope > *:not(h1):not(h2)');
        content.forEach(el => {
          el.style.display = isExpanded ? 'none' : '';
        });
      }
    });
  `;
  document.body.appendChild(script);
  
  // Ajouter un style pour les boutons de bascule
  const style = document.createElement('style');
  style.textContent = `
    .section-toggle {
      background: none;
      border: none;
      color: var(--primary);
      font-size: 1rem;
      cursor: pointer;
      margin-left: 0.5rem;
      padding: 0.25rem;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .section-toggle:hover {
      background-color: var(--primary-light);
    }
    
    [data-expanded="false"] > *:not(h1):not(h2) {
      display: none;
    }
  `;
  document.head.appendChild(style);
}

// Fonction pour améliorer la structure des sections
function enhanceSections(document) {
  // Ajouter des classes aux sections
  const sections = document.querySelectorAll('main > div');
  sections.forEach(section => {
    section.classList.add('content-section');
    
    // Ajouter des icônes aux titres
    const heading = section.querySelector('h1, h2');
    if (heading) {
      const headingText = heading.textContent.toLowerCase();
      let icon = '';
      
      if (headingText.includes('arrivée') || headingText.includes('départ')) {
        icon = '<i class="fas fa-plane"></i> ';
      } else if (headingText.includes('championship') || headingText.includes('first')) {
        icon = '<i class="fas fa-robot"></i> ';
      } else if (headingText.includes('space') || headingText.includes('nasa')) {
        icon = '<i class="fas fa-rocket"></i> ';
      } else if (headingText.includes('shopping')) {
        icon = '<i class="fas fa-shopping-bag"></i> ';
      } else if (headingText.includes('museum')) {
        icon = '<i class="fas fa-landmark"></i> ';
      } else if (headingText.includes('park') || headingText.includes('zoo')) {
        icon = '<i class="fas fa-tree"></i> ';
      } else if (headingText.includes('gastronomique') || headingText.includes('restaurant')) {
        icon = '<i class="fas fa-utensils"></i> ';
      } else if (headingText.includes('guide')) {
        icon = '<i class="fas fa-map-marked-alt"></i> ';
      } else if (headingText.includes('activités') || headingText.includes('enfants')) {
        icon = '<i class="fas fa-child"></i> ';
      } else {
        icon = '<i class="fas fa-info-circle"></i> ';
      }
      
      heading.innerHTML = icon + heading.innerHTML;
    }
  });
}

// Fonction pour améliorer les tableaux
function enhanceTables(document) {
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    // Ajouter un conteneur pour les tableaux responsives
    const tableContainer = document.createElement('div');
    tableContainer.className = 'table-container';
    table.parentNode.insertBefore(tableContainer, table);
    tableContainer.appendChild(table);
    
    // Ajouter des en-têtes de colonne si nécessaire
    const firstRow = table.querySelector('tr');
    if (firstRow) {
      const cells = firstRow.querySelectorAll('td');
      if (cells.length > 0 && !table.querySelector('th')) {
        // Convertir la première ligne en en-têtes
        cells.forEach(cell => {
          const th = document.createElement('th');
          th.innerHTML = cell.innerHTML;
          cell.parentNode.replaceChild(th, cell);
        });
        
        // Créer un thead et y déplacer la première ligne
        const thead = document.createElement('thead');
        thead.appendChild(firstRow);
        table.insertBefore(thead, table.firstChild);
        
        // Créer un tbody pour le reste des lignes
        const tbody = document.createElement('tbody');
        while (table.querySelector('tr')) {
          tbody.appendChild(table.querySelector('tr'));
        }
        table.appendChild(tbody);
      }
    }
  });
  
  // Ajouter un style pour les tableaux responsives
  const style = document.createElement('style');
  style.textContent = `
    .table-container {
      width: 100%;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
  `;
  document.head.appendChild(style);
}

// Fonction pour améliorer les images
function enhanceImages(document) {
  const images = document.querySelectorAll('img:not(.image-gallery img)');
  images.forEach(img => {
    // Ajouter l'attribut loading="lazy" s'il n'existe pas
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Créer un conteneur pour chaque image si elle n'est pas déjà dans un conteneur
    if (!img.parentNode.classList.contains('image-container') && !img.classList.contains('no-container')) {
      const container = document.createElement('div');
      container.className = 'image-container';
      
      // Créer une légende si l'attribut title existe
      if (img.title) {
        const caption = document.createElement('div');
        caption.className = 'image-caption';
        caption.textContent = img.title;
        container.appendChild(caption);
      }
      
      // Remplacer l'image par le conteneur
      img.parentNode.insertBefore(container, img);
      container.appendChild(img);
    }
  });
}

// Fonction pour ajouter des cartes d'information
function addInfoCards(document) {
  // Convertir les paragraphes contenant des informations importantes en cartes d'information
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => {
    const text = p.textContent.toLowerCase();
    
    // Vérifier si le paragraphe contient des informations importantes
    if (text.includes('important') || text.includes('note') || text.includes('conseil') || 
        text.includes('astuce') || text.includes('attention') || text.includes('rappel')) {
      
      // Créer une carte d'information
      const card = document.createElement('div');
      card.className = 'info-card';
      
      // Ajouter un titre à la carte
      const title = document.createElement('h4');
      if (text.includes('attention') || text.includes('avertissement')) {
        title.textContent = 'Attention';
        card.classList.add('warning-card');
      } else if (text.includes('conseil') || text.includes('astuce')) {
        title.textContent = 'Conseil';
      } else if (text.includes('note')) {
        title.textContent = 'Note';
      } else {
        title.textContent = 'Information importante';
      }
      
      // Remplacer le paragraphe par la carte
      p.parentNode.insertBefore(card, p);
      card.appendChild(title);
      card.appendChild(p);
    }
  });
}

// Exécuter la fonction
enhanceDocument();
