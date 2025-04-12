/**
 * Houston 2025 - Fonctionnalités pour les tableaux
 * Ce fichier ajoute des fonctionnalités aux tableaux, comme le tri, la recherche et la gestion de la responsivité
 */

// Fonction pour initialiser tous les tableaux
function initTables() {
  // Récupère tous les tableaux
  const tables = document.querySelectorAll('table');
  
  // Parcourt tous les tableaux
  tables.forEach(table => {
    // Ajoute des classes en fonction du contenu
    addTableClasses(table);
    
    // Enveloppe le tableau dans un conteneur pour la responsivité
    wrapTableInContainer(table);
    
    // Ajoute des attributs data-label pour l'affichage mobile
    addDataLabels(table);
    
    // Ajoute la fonctionnalité de tri si le tableau a un en-tête
    if (table.querySelector('thead')) {
      makeSortable(table);
    }
  });
  
  // Vérifie si les tableaux sont scrollables
  checkTableScroll();
  
  // Ajoute un écouteur de redimensionnement pour vérifier à nouveau
  window.addEventListener('resize', checkTableScroll);
}

// Fonction pour ajouter des classes en fonction du contenu du tableau
function addTableClasses(table) {
  // Vérifie si le tableau contient des étoiles (⭐)
  if (table.textContent.includes('⭐')) {
    table.classList.add('rating-table');
  }
  
  // Vérifie si le tableau contient des prix ($)
  if (table.textContent.includes('$')) {
    table.classList.add('price-table');
  }
  
  // Vérifie si le tableau contient des horaires
  if (table.textContent.match(/\d{1,2}h\d{0,2}/)) {
    table.classList.add('schedule-table');
  }
  
  // Vérifie si le tableau contient plusieurs colonnes de comparaison
  const headerCells = table.querySelectorAll('thead th');
  if (headerCells.length > 3) {
    table.classList.add('comparison-table');
    
    // Définit le nombre de colonnes comme variable CSS
    table.style.setProperty('--column-count', headerCells.length);
  }
  
  // Ajoute la classe pour les en-têtes verticaux sur mobile
  if (headerCells.length > 2) {
    table.classList.add('vertical-headers-mobile');
  }
}

// Fonction pour envelopper le tableau dans un conteneur pour la responsivité
function wrapTableInContainer(table) {
  // Vérifie si le tableau est déjà dans un conteneur
  if (table.parentElement.classList.contains('table-container')) {
    return;
  }
  
  // Crée un conteneur
  const container = document.createElement('div');
  container.className = 'table-container';
  
  // Remplace le tableau par le conteneur
  table.parentNode.insertBefore(container, table);
  container.appendChild(table);
}

// Fonction pour ajouter des attributs data-label pour l'affichage mobile
function addDataLabels(table) {
  // Vérifie si le tableau a un en-tête
  const headerCells = table.querySelectorAll('thead th');
  if (headerCells.length === 0) {
    return;
  }
  
  // Récupère les textes des en-têtes
  const headerTexts = Array.from(headerCells).map(cell => cell.textContent.trim());
  
  // Parcourt toutes les lignes du corps du tableau
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach(row => {
    // Parcourt toutes les cellules de la ligne
    const cells = row.querySelectorAll('td');
    cells.forEach((cell, index) => {
      // Ajoute l'attribut data-label avec le texte de l'en-tête correspondant
      if (index < headerTexts.length) {
        cell.setAttribute('data-label', headerTexts[index]);
      }
    });
  });
}

// Fonction pour vérifier si les tableaux sont scrollables
function checkTableScroll() {
  // Récupère tous les conteneurs de tableaux
  const containers = document.querySelectorAll('.table-container');
  
  // Parcourt tous les conteneurs
  containers.forEach(container => {
    // Vérifie si le tableau est plus large que son conteneur
    const table = container.querySelector('table');
    if (table && table.offsetWidth > container.offsetWidth) {
      container.classList.add('scrollable');
    } else {
      container.classList.remove('scrollable');
    }
  });
}

// Fonction pour rendre un tableau triable
function makeSortable(table) {
  // Récupère tous les en-têtes
  const headers = table.querySelectorAll('thead th');
  
  // Parcourt tous les en-têtes
  headers.forEach((header, index) => {
    // Ajoute un style de curseur pour indiquer que l'en-tête est cliquable
    header.style.cursor = 'pointer';
    
    // Ajoute un indicateur de tri
    const sortIndicator = document.createElement('span');
    sortIndicator.className = 'sort-indicator';
    sortIndicator.textContent = ' ↕️';
    sortIndicator.style.opacity = '0.5';
    sortIndicator.style.fontSize = '0.8em';
    header.appendChild(sortIndicator);
    
    // Ajoute un écouteur de clic
    header.addEventListener('click', () => {
      // Détermine la direction du tri
      const currentDirection = header.getAttribute('data-sort-direction') || 'none';
      let newDirection = 'asc';
      
      if (currentDirection === 'asc') {
        newDirection = 'desc';
      } else if (currentDirection === 'desc') {
        newDirection = 'none';
      }
      
      // Réinitialise tous les en-têtes
      headers.forEach(h => {
        h.setAttribute('data-sort-direction', 'none');
        h.querySelector('.sort-indicator').textContent = ' ↕️';
        h.querySelector('.sort-indicator').style.opacity = '0.5';
      });
      
      // Met à jour l'en-tête actuel
      header.setAttribute('data-sort-direction', newDirection);
      
      // Met à jour l'indicateur de tri
      if (newDirection === 'asc') {
        sortIndicator.textContent = ' ↑';
        sortIndicator.style.opacity = '1';
      } else if (newDirection === 'desc') {
        sortIndicator.textContent = ' ↓';
        sortIndicator.style.opacity = '1';
      } else {
        sortIndicator.textContent = ' ↕️';
        sortIndicator.style.opacity = '0.5';
      }
      
      // Trie le tableau
      sortTable(table, index, newDirection);
    });
  });
}

// Fonction pour trier un tableau
function sortTable(table, columnIndex, direction) {
  // Si la direction est 'none', restaure l'ordre original
  if (direction === 'none') {
    // Vérifie si l'ordre original est stocké
    if (table.hasAttribute('data-original-order')) {
      const originalOrder = JSON.parse(table.getAttribute('data-original-order'));
      
      // Récupère le corps du tableau
      const tbody = table.querySelector('tbody');
      
      // Récupère toutes les lignes
      const rows = Array.from(tbody.querySelectorAll('tr'));
      
      // Trie les lignes selon l'ordre original
      rows.sort((a, b) => {
        const indexA = originalOrder.indexOf(Array.from(tbody.querySelectorAll('tr')).indexOf(a));
        const indexB = originalOrder.indexOf(Array.from(tbody.querySelectorAll('tr')).indexOf(b));
        return indexA - indexB;
      });
      
      // Réinsère les lignes dans le bon ordre
      rows.forEach(row => tbody.appendChild(row));
    }
    
    return;
  }
  
  // Récupère le corps du tableau
  const tbody = table.querySelector('tbody');
  
  // Récupère toutes les lignes
  const rows = Array.from(tbody.querySelectorAll('tr'));
  
  // Stocke l'ordre original si ce n'est pas déjà fait
  if (!table.hasAttribute('data-original-order')) {
    const originalOrder = Array.from(rows).map((_, index) => index);
    table.setAttribute('data-original-order', JSON.stringify(originalOrder));
  }
  
  // Trie les lignes
  rows.sort((a, b) => {
    // Récupère les cellules à comparer
    const cellA = a.querySelectorAll('td')[columnIndex];
    const cellB = b.querySelectorAll('td')[columnIndex];
    
    if (!cellA || !cellB) {
      return 0;
    }
    
    // Récupère les valeurs à comparer
    let valueA = cellA.textContent.trim();
    let valueB = cellB.textContent.trim();
    
    // Essaie de convertir en nombres si possible
    const numberA = parseFloat(valueA.replace(/[^\d.-]/g, ''));
    const numberB = parseFloat(valueB.replace(/[^\d.-]/g, ''));
    
    if (!isNaN(numberA) && !isNaN(numberB)) {
      valueA = numberA;
      valueB = numberB;
    }
    
    // Compare les valeurs
    if (valueA < valueB) {
      return direction === 'asc' ? -1 : 1;
    } else if (valueA > valueB) {
      return direction === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
  
  // Réinsère les lignes dans le bon ordre
  rows.forEach(row => tbody.appendChild(row));
}

// Initialise les tableaux lorsque la page est chargée
document.addEventListener('DOMContentLoaded', initTables);
