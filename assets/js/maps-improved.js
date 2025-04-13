/**
 * Houston 2025 - Google Maps Integration
 * Ce fichier gère l'intégration des cartes Google Maps dans le guide Houston 2025
 */

// Définition des points d'intérêt
const POINTS_OF_INTEREST = {
  // Attractions principales
  attractions: [
    {
      name: "Space Center Houston",
      lat: 29.5519,
      lng: -95.0970,
      address: "1601 E NASA Pkwy, Houston, TX 77058",
      category: "attraction",
      description: "Centre officiel des visiteurs du Centre spatial Johnson de la NASA",
      website: "https://spacecenter.org/",
      icon: "🚀",
      page: "02_Space_Center_Kemah.html"
    },
    {
      name: "Kemah Boardwalk",
      lat: 29.5447,
      lng: -95.0200,
      address: "215 Kipp Ave, Kemah, TX 77565",
      category: "attraction",
      description: "Parc d'attractions en bord de mer avec restaurants et boutiques",
      website: "https://www.kemahboardwalk.com/",
      icon: "🎡",
      page: "02_Space_Center_Kemah.html"
    },
    {
      name: "Museum of Natural Science",
      lat: 29.7221,
      lng: -95.3898,
      address: "5555 Hermann Park Dr, Houston, TX 77030",
      category: "museum",
      description: "L'un des musées de sciences naturelles les plus populaires des États-Unis",
      website: "https://www.hmns.org/",
      icon: "🦖",
      page: "07_Museum_District.html"
    },
    {
      name: "Museum of Fine Arts",
      lat: 29.7260,
      lng: -95.3909,
      address: "1001 Bissonnet St, Houston, TX 77005",
      category: "museum",
      description: "L'un des plus grands musées d'art des États-Unis",
      website: "https://www.mfah.org/",
      icon: "🎨",
      page: "07_Museum_District.html"
    },
    {
      name: "Houston Zoo",
      lat: 29.7146,
      lng: -95.3909,
      address: "6200 Hermann Park Dr, Houston, TX 77030",
      category: "attraction",
      description: "Zoo abritant plus de 6 000 animaux de 900 espèces",
      website: "https://www.houstonzoo.org/",
      icon: "🦁",
      page: "08_Hermann_Park_Zoo.html"
    },
    {
      name: "Hermann Park",
      lat: 29.7194,
      lng: -95.3909,
      address: "6001 Fannin St, Houston, TX 77030",
      category: "park",
      description: "Parc urbain de 445 acres avec jardins, lac et attractions",
      website: "https://hermannpark.org/",
      icon: "🌳",
      page: "08_Hermann_Park_Zoo.html"
    }
  ],

  // Shopping
  shopping: [
    {
      name: "Katy Mills",
      lat: 29.7769,
      lng: -95.8150,
      address: "5000 Katy Mills Cir, Katy, TX 77494",
      category: "shopping",
      description: "Centre commercial outlet avec plus de 175 magasins",
      website: "https://www.simon.com/mall/katy-mills",
      icon: "🛍️",
      page: "03_Shopping_Katy_Mills.html"
    },
    {
      name: "The Galleria",
      lat: 29.7399,
      lng: -95.4647,
      address: "5085 Westheimer Rd, Houston, TX 77056",
      category: "shopping",
      description: "Le plus grand centre commercial de Houston avec des boutiques de luxe",
      website: "https://www.simon.com/mall/the-galleria",
      icon: "🛍️",
      page: "C_Shopping_Comparison.html"
    }
  ],

  // Événements
  events: [
    {
      name: "FIRST Championship - George R. Brown Convention Center",
      lat: 29.7520,
      lng: -95.3562,
      address: "1001 Avenida De Las Americas, Houston, TX 77010",
      category: "event",
      description: "Lieu principal du FIRST Championship 2025",
      website: "https://www.firstchampionship.org/",
      icon: "🤖",
      page: "06_FIRST_Championship.html"
    }
  ],

  // Hôtels
  hotels: [
    {
      name: "Crowne Plaza Houston Med-Ctr Galleria Area",
      lat: 29.7328,
      lng: -95.4160,
      address: "2712 Southwest Freeway, Houston, TX 77098",
      category: "hotel",
      description: "Hôtel principal du séjour",
      website: "https://www.ihg.com/crowneplaza/",
      icon: "🏨",
      page: "01_Introduction.html"
    }
  ],

  // Restaurants
  restaurants: [
    {
      name: "Pappasito's Cantina",
      lat: 29.7328,
      lng: -95.4180,
      address: "2536 Richmond Ave, Houston, TX 77098",
      category: "restaurant",
      description: "Restaurant mexicain populaire",
      website: "https://pappasitos.com/",
      icon: "🌮",
      page: "05_Gastronomie.html"
    },
    {
      name: "The Breakfast Klub",
      lat: 29.7428,
      lng: -95.3780,
      address: "3711 Travis St, Houston, TX 77002",
      category: "restaurant",
      description: "Restaurant de petit-déjeuner emblématique de Houston",
      website: "https://thebreakfastklub.com/",
      icon: "🍳",
      page: "05_Gastronomie.html"
    }
  ]
};

// Fonction pour obtenir une couleur en fonction de la catégorie
function getCategoryColor(category) {
  // Couleurs par catégorie
  const categoryColors = {
    'attraction': '#FF5722',  // Orange
    'museum': '#4CAF50',      // Vert
    'restaurant': '#F44336',  // Rouge
    'hotel': '#2196F3',       // Bleu
    'shopping': '#9C27B0',    // Violet
    'transport': '#FFEB3B',   // Jaune
    'event': '#FF9800',       // Orange clair
    'park': '#8BC34A',        // Vert clair
    'stadium': '#3F51B5'      // Indigo
  };

  // Retourne la couleur correspondante ou une couleur par défaut
  return categoryColors[category] || '#607D8B';  // Gris bleu par défaut
}

// Fonction pour initialiser une carte Google Maps
function initMap(mapId, center, zoom) {
  // Options de la carte
  const mapOptions = {
    center: center,
    zoom: zoom,
    mapTypeControl: true,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.TOP_RIGHT
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.RIGHT_TOP
    },
    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    rotateControl: true,
    scaleControl: true,
    styles: [
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "poi.business",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [{"visibility": "off"}]
      },
      {
        "featureType": "transit",
        "stylers": [{"visibility": "off"}]
      }
    ]
  };

  // Vérifie si l'ID de carte est défini
  const mapIdValue = CONFIG.GOOGLE_MAPS_MAP_ID || 'af8bf941f1e27c9d';

  // Ajoute l'ID de carte aux options
  mapOptions.mapId = mapIdValue;

  // Crée la carte
  const map = new google.maps.Map(document.getElementById(mapId), mapOptions);

  return map;
}

// Fonction pour ajouter un marqueur à la carte
function addMarker(map, poi) {
  let marker;

  try {
    // Vérifie si l'API AdvancedMarkerElement est disponible
    if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
      // Crée un élément div pour le contenu du marqueur
      const markerContent = document.createElement('div');
      markerContent.className = 'custom-marker';

      // Crée un élément pour l'emoji ou l'icône
      const iconElement = document.createElement('div');
      iconElement.className = 'marker-icon';
      iconElement.style.backgroundColor = getCategoryColor(poi.category);
      iconElement.style.color = '#FFFFFF';
      iconElement.style.borderRadius = '50%';
      iconElement.style.width = '32px';
      iconElement.style.height = '32px';
      iconElement.style.display = 'flex';
      iconElement.style.justifyContent = 'center';
      iconElement.style.alignItems = 'center';
      iconElement.style.fontSize = '16px';
      iconElement.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';

      // Ajoute l'emoji si défini
      if (poi.icon) {
        iconElement.textContent = poi.icon;
      }

      markerContent.appendChild(iconElement);

      // Crée le marqueur avancé
      marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat: poi.lat, lng: poi.lng },
        map: map,
        title: poi.name,
        content: markerContent
      });
    } else {
      // Fallback pour l'ancien API Marker
      let markerOptions = {
        position: { lat: poi.lat, lng: poi.lng },
        map: map,
        title: poi.name,
        animation: google.maps.Animation.DROP
      };

      // Ajoute l'icône si elle est définie
      if (poi.icon) {
        markerOptions.icon = {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: getCategoryColor(poi.category),
          fillOpacity: 1,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          labelOrigin: new google.maps.Point(0, 0)
        };

        // Ajoute un label avec l'emoji
        markerOptions.label = {
          text: poi.icon,
          color: '#FFFFFF',
          fontSize: '14px',
          fontWeight: 'bold'
        };
      }

      // Crée le marqueur
      marker = new google.maps.Marker(markerOptions);
    }
  } catch (error) {
    console.error('Error creating marker:', error);
    // Fallback à l'ancien API Marker en cas d'erreur
    marker = new google.maps.Marker({
      position: { lat: poi.lat, lng: poi.lng },
      map: map,
      title: poi.name
    });
  }

  // Crée la fenêtre d'info
  const infoContent = `
    <div class="info-window">
      <h3 class="info-window__title">${poi.name}</h3>
      <p class="info-window__description"><strong>Adresse:</strong> ${poi.address}</p>
      <p class="info-window__description">${poi.description}</p>
      <p class="info-window__description"><a class="info-window__link" href="${poi.website}" target="_blank" rel="noopener">Site officiel</a> | <a class="info-window__link" href="${poi.page}">Plus d'infos</a></p>
    </div>
  `;

  const infoWindow = new google.maps.InfoWindow({
    content: infoContent
  });

  // Ajoute l'événement de clic
  marker.addListener('click', () => {
    // Ferme toutes les fenêtres d'info ouvertes
    if (window.openInfoWindow) {
      window.openInfoWindow.close();
    }

    // Ouvre la fenêtre d'info
    infoWindow.open(map, marker);
    window.openInfoWindow = infoWindow;

    // Enregistre l'événement dans Google Analytics si disponible
    if (typeof gtag === 'function') {
      gtag('event', 'view_poi', {
        'event_category': 'maps',
        'event_label': poi.name,
        'value': 1
      });
    }
  });

  return marker;
}

// Fonction pour ajouter tous les points d'intérêt à la carte
function addAllPOIs(map, categories = null) {
  const markers = [];

  // Parcourt toutes les catégories
  Object.keys(POINTS_OF_INTEREST).forEach(category => {
    // Vérifie si la catégorie est incluse
    if (categories === null || categories.includes(category)) {
      // Ajoute tous les points d'intérêt de la catégorie
      POINTS_OF_INTEREST[category].forEach(poi => {
        const marker = addMarker(map, poi);
        markers.push(marker);
      });
    }
  });

  return markers;
}

// Fonction pour centrer la carte sur tous les marqueurs
function fitMapToMarkers(map, markers) {
  const bounds = new google.maps.LatLngBounds();

  markers.forEach(marker => {
    bounds.extend(marker.getPosition());
  });

  map.fitBounds(bounds);

  // Zoom out un peu si nécessaire
  const listener = google.maps.event.addListener(map, 'idle', function() {
    if (map.getZoom() > 15) {
      map.setZoom(15);
    }
    google.maps.event.removeListener(listener);
  });
}

// Fonction pour initialiser la carte principale avec tous les points d'intérêt
function initMainMap() {
  try {
    // Centre initial sur Houston
    const houstonCenter = { lat: 29.7604, lng: -95.3698 };

    // Initialise la carte
    const map = initMap('main-map', houstonCenter, 11);

    // Stocke la carte dans une variable globale pour que d'autres scripts puissent y accéder
    window.mainMap = map;

    // Ajoute tous les points d'intérêt
    const markers = addAllPOIs(map);

    // Ajuste la carte pour afficher tous les marqueurs
    fitMapToMarkers(map, markers);

    // Ajoute les contrôles de filtrage
    addFilterControls(map, markers);

    // Stocke la carte dans une variable globale pour que d'autres scripts puissent y accéder
    window.mainMap = map;

    // Les itinéraires seront initialisés par le script itineraries.js qui est chargé séparément

    return map;
  } catch (error) {
    console.error('Error in initMainMap:', error);
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
    displayMapError('Erreur lors de l\'initialisation de la carte. Veuillez réessayer plus tard.');
    return null;
  }
}

// Fonction pour initialiser une carte spécifique à une page
function initPageMap(mapId, category) {
  try {
    // Centre initial sur Houston
    const houstonCenter = { lat: 29.7604, lng: -95.3698 };

    // Initialise la carte
    const map = initMap(mapId, houstonCenter, 12);

    // Stocke la carte dans une variable globale pour que d'autres scripts puissent y accéder
    window.pageMap = map;

    // Ajoute les points d'intérêt de la catégorie spécifiée
    const markers = addAllPOIs(map, [category]);

    // Ajuste la carte pour afficher tous les marqueurs
    fitMapToMarkers(map, markers);

    return map;
  } catch (error) {
    console.error('Error in initPageMap:', error);
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
    displayMapError('Erreur lors de l\'initialisation de la carte. Veuillez réessayer plus tard.');
    return null;
  }
}

// Fonction pour ajouter des contrôles de filtrage à la carte
function addFilterControls(map, allMarkers) {
  const filterContainer = document.getElementById('map-filters');
  if (!filterContainer) {
    console.error('Filter container not found.');
    return;
  }

  const markersByCategory = {};
  Object.keys(POINTS_OF_INTEREST).forEach(category => {
    markersByCategory[category] = [];
  });

  let markerIndex = 0;
  Object.keys(POINTS_OF_INTEREST).forEach(category => {
    POINTS_OF_INTEREST[category].forEach(() => {
      if (allMarkers[markerIndex]) {
        markersByCategory[category].push(allMarkers[markerIndex]);
      }
      markerIndex++;
    });
  });

  const categories = {
    'attractions': { label: 'Attractions', icon: '🏛️', checked: true },
    'shopping': { label: 'Shopping', icon: '🛍️', checked: true },
    'events': { label: 'Événements', icon: '🎭', checked: true },
    'hotels': { label: 'Hôtels', icon: '🏨', checked: true },
    'restaurants': { label: 'Restaurants', icon: '🍽️', checked: true }
  };

  Object.keys(categories).forEach(category => {
    const { label, icon, checked } = categories[category];

    const filterItem = document.createElement('div');
    filterItem.className = 'map-filters__item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `filter-${category}`;
    checkbox.checked = checked;
    checkbox.className = 'map-filters__checkbox';

    const filterLabel = document.createElement('label');
    filterLabel.htmlFor = `filter-${category}`;
    filterLabel.className = 'map-filters__label';
    filterLabel.innerHTML = `${icon} ${label}`;

    checkbox.addEventListener('change', function () {
      const isChecked = this.checked;
      if (markersByCategory[category]) {
        markersByCategory[category].forEach(marker => {
          marker.setVisible(isChecked);
        });
      }

      const visibleMarkers = allMarkers.filter(marker => marker.getVisible());
      if (visibleMarkers.length > 0) {
        fitMapToMarkers(map, visibleMarkers);
      }
    });

    filterItem.appendChild(checkbox);
    filterItem.appendChild(filterLabel);
    filterContainer.appendChild(filterItem);
  });

  const resetButton = document.createElement('button');
  resetButton.className = 'map-filters__reset';
  resetButton.textContent = 'Réinitialiser les filtres';

  resetButton.addEventListener('click', function () {
    Object.keys(categories).forEach(category => {
      const checkbox = document.getElementById(`filter-${category}`);
      if (checkbox) checkbox.checked = true;

      if (markersByCategory[category]) {
        markersByCategory[category].forEach(marker => {
          marker.setVisible(true);
        });
      }
    });

    fitMapToMarkers(map, allMarkers);
  });

  filterContainer.appendChild(resetButton);
}

// Fonction pour initialiser les itinéraires (stub pour compatibilité)
// Cette fonction est remplacée par celle dans itineraries.js
// eslint-disable-next-line no-unused-vars
function initItineraries(/* map */) {
  console.warn('Cette fonction est un stub. Assurez-vous que itineraries.js est chargé.');
  return;
}

// Fonction pour initialiser les cartes lorsque l'API Google Maps est chargée
// @ts-ignore - Définition d'une propriété globale pour le callback de l'API Google Maps
window["initMaps"] = function() {
  try {
    // Vérifie si la page contient une carte principale
    const mainMapContainer = document.getElementById('main-map');
    if (mainMapContainer) {
      initMainMap();
    }

    // Vérifie si la page contient une carte spécifique
    const pageMapContainer = document.getElementById('page-map');
    if (pageMapContainer) {
      const category = pageMapContainer.dataset.category || 'attractions';
      initPageMap('page-map', category);
    }
  } catch (error) {
    console.error('Error in initMaps:', error);
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
    displayMapError('Erreur lors de l\'initialisation des cartes. Veuillez réessayer plus tard.');
  }
};

// Fonction pour charger l'API Google Maps
function loadGoogleMaps() {
  // Vérifie si CONFIG est défini
  if (typeof CONFIG === 'undefined') {
    console.error('CONFIG object is not defined. Make sure config.js is loaded before maps-improved.js');
    // Affiche un message d'erreur sur la page
    displayMapError('Erreur de configuration: CONFIG n\'est pas défini. Veuillez réessayer plus tard.');
    return;
  }

  // Vérifie si la clé API Google Maps est définie
  if (!CONFIG.GOOGLE_MAPS_API_KEY) {
    console.error('Google Maps API key is not defined in CONFIG object');
    // Affiche un message d'erreur sur la page
    displayMapError('Erreur de configuration: Clé API Google Maps manquante. Veuillez réessayer plus tard.');
    return;
  }

  // Vérifie si la clé API Google Maps est valide (au moins 20 caractères)
  if (CONFIG.GOOGLE_MAPS_API_KEY.length < 20) {
    console.error('Google Maps API key is invalid (too short)');
    // Affiche un message d'erreur sur la page
    displayMapError('Erreur de configuration: Clé API Google Maps invalide. Veuillez réessayer plus tard.');
    return;
  }

  try {
    // Vérifie si l'ID de carte est défini
    const mapId = CONFIG.GOOGLE_MAPS_MAP_ID || 'af8bf941f1e27c9d';

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&map_ids=${mapId}&v=weekly&callback=initMaps&loading=async`;
    script.async = true;
    script.defer = true;
    script.onerror = function() {
      console.error('Failed to load Google Maps API. Check your API key and network connection.');
      // Affiche un message d'erreur sur la page
      displayMapError('Erreur de chargement de l\'API Google Maps. Vérifiez votre connexion internet.');
    };
    document.head.appendChild(script);
  } catch (error) {
    console.error('Error loading Google Maps API:', error);
    // Affiche un message d'erreur sur la page
    displayMapError('Erreur lors du chargement de l\'API Google Maps. Veuillez réessayer plus tard.');
  }
}

// Fonction pour afficher un message d'erreur sur la page
function displayMapError(message) {
  const mapContainer = document.getElementById('main-map') || document.getElementById('page-map');
  if (mapContainer) {
    mapContainer.innerHTML = `
      <div class="map-error" role="alert" aria-live="assertive">
        <h3>Impossible de charger la carte</h3>
        <p>${message}</p>
        <p>Vous pouvez toujours consulter la liste des points d'intérêt ci-dessous.</p>
      </div>
    `;
    mapContainer.classList.add('map-error-container');
  }
}

// Charge l'API Google Maps lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
  try {
    // Vérifie si la page contient une carte
    if (document.getElementById('main-map') || document.getElementById('page-map')) {
      loadGoogleMaps();
    }
  } catch (error) {
    console.error('Error loading Google Maps:', error);
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
  }
});
