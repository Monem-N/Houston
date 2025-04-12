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

// Fonction pour initialiser une carte Google Maps
function initMap(mapId, center, zoom) {
  // Options de la carte
  const mapOptions = {
    center: center,
    zoom: zoom,
    mapTypeControl: true,
    streetViewControl: true,
    fullscreenControl: true,
    zoomControl: true,
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

  // Crée la carte
  const map = new google.maps.Map(document.getElementById(mapId), mapOptions);

  return map;
}

// Fonction pour ajouter un marqueur à la carte
function addMarker(map, poi) {
  // Crée le marqueur
  const marker = new google.maps.Marker({
    position: { lat: poi.lat, lng: poi.lng },
    map: map,
    title: poi.name,
    animation: google.maps.Animation.DROP
  });

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
  // Centre initial sur Houston
  const houstonCenter = { lat: 29.7604, lng: -95.3698 };

  // Initialise la carte
  const map = initMap('main-map', houstonCenter, 11);

  // Ajoute tous les points d'intérêt
  const markers = addAllPOIs(map);

  // Ajuste la carte pour afficher tous les marqueurs
  fitMapToMarkers(map, markers);

  // Ajoute les contrôles de filtrage
  addFilterControls(map, markers);

  // Charge le script des itinéraires s'il n'est pas déjà chargé
  if (typeof initItineraries === 'function') {
    // Initialise les itinéraires
    initItineraries(map);
  } else {
    // Charge le script des itinéraires
    const script = document.createElement('script');
    script.src = 'assets/js/itineraries.js';
    script.onload = function() {
      // Initialise les itinéraires une fois le script chargé
      if (typeof initItineraries === 'function') {
        initItineraries(map);
      }
    };
    document.head.appendChild(script);
  }

  return map;
}

// Fonction pour initialiser une carte spécifique à une page
function initPageMap(mapId, category) {
  // Centre initial sur Houston
  const houstonCenter = { lat: 29.7604, lng: -95.3698 };

  // Initialise la carte
  const map = initMap(mapId, houstonCenter, 12);

  // Ajoute les points d'intérêt de la catégorie spécifiée
  const markers = addAllPOIs(map, [category]);

  // Ajuste la carte pour afficher tous les marqueurs
  fitMapToMarkers(map, markers);

  return map;
}

// Fonction pour ajouter des contrôles de filtrage à la carte
function addFilterControls(map, allMarkers) {
  // Récupère le conteneur des filtres
  const filterContainer = document.getElementById('map-filters');
  if (!filterContainer) return;

  // Crée un objet pour stocker les marqueurs par catégorie
  const markersByCategory = {};

  // Initialise les catégories
  Object.keys(POINTS_OF_INTEREST).forEach(category => {
    markersByCategory[category] = [];
  });

  // Groupe les marqueurs par catégorie
  let markerIndex = 0;
  Object.keys(POINTS_OF_INTEREST).forEach(category => {
    POINTS_OF_INTEREST[category].forEach(poi => {
      markersByCategory[category].push(allMarkers[markerIndex]);
      markerIndex++;
    });
  });

  // Crée les contrôles de filtrage
  const categories = {
    'attractions': { label: 'Attractions', icon: '🏛️', checked: true },
    'shopping': { label: 'Shopping', icon: '🛍️', checked: true },
    'events': { label: 'Événements', icon: '🎭', checked: true },
    'hotels': { label: 'Hôtels', icon: '🏨', checked: true },
    'restaurants': { label: 'Restaurants', icon: '🍽️', checked: true }
  };

  // Crée les cases à cocher
  Object.keys(categories).forEach(category => {
    const { label, icon, checked } = categories[category];

    const filterItem = document.createElement('div');
    filterItem.className = 'filter-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `filter-${category}`;
    checkbox.checked = checked;

    const filterLabel = document.createElement('label');
    filterLabel.htmlFor = `filter-${category}`;
    filterLabel.innerHTML = `${icon} ${label}`;

    // Ajoute l'événement de changement
    checkbox.addEventListener('change', function() {
      const isChecked = this.checked;

      // Affiche ou masque les marqueurs
      markersByCategory[category].forEach(marker => {
        marker.setVisible(isChecked);
      });

      // Ajuste la carte si nécessaire
      if (isChecked) {
        const visibleMarkers = allMarkers.filter(marker => marker.getVisible());
        if (visibleMarkers.length > 0) {
          fitMapToMarkers(map, visibleMarkers);
        }
      }

      // Enregistre l'événement dans Google Analytics si disponible
      if (typeof gtag === 'function') {
        gtag('event', isChecked ? 'show_category' : 'hide_category', {
          'event_category': 'maps',
          'event_label': category,
          'value': 1
        });
      }
    });

    filterItem.appendChild(checkbox);
    filterItem.appendChild(filterLabel);
    filterContainer.appendChild(filterItem);
  });

  // Ajoute un bouton pour réinitialiser les filtres
  const resetButton = document.createElement('button');
  resetButton.className = 'reset-filters';
  resetButton.textContent = 'Réinitialiser les filtres';

  resetButton.addEventListener('click', function() {
    // Coche toutes les cases
    Object.keys(categories).forEach(category => {
      const checkbox = document.getElementById(`filter-${category}`);
      checkbox.checked = true;

      // Affiche tous les marqueurs
      markersByCategory[category].forEach(marker => {
        marker.setVisible(true);
      });
    });

    // Ajuste la carte
    fitMapToMarkers(map, allMarkers);

    // Enregistre l'événement dans Google Analytics si disponible
    if (typeof gtag === 'function') {
      gtag('event', 'reset_filters', {
        'event_category': 'maps',
        'event_label': 'all',
        'value': 1
      });
    }
  });

  filterContainer.appendChild(resetButton);
}

// Fonction pour initialiser les cartes lorsque l'API Google Maps est chargée
function initMaps() {
  // Vérifie si la page contient une carte principale
  const mainMapContainer = document.getElementById('main-map');
  if (mainMapContainer) {
    initMainMap();
  }

  // Vérifie si la page contient une carte spécifique
  const pageMapContainer = document.getElementById('page-map');
  if (pageMapContainer) {
    const category = pageMapContainer.dataset.category;
    if (category) {
      initPageMap('page-map', category);
    }
  }
}

// Fonction pour charger l'API Google Maps
function loadGoogleMaps() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAdCsaf0TLy6vvX3rkPC-zno9nsHUeuH-0&callback=initMaps`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Charge l'API Google Maps lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
  // Vérifie si la page contient une carte
  if (document.getElementById('main-map') || document.getElementById('page-map')) {
    loadGoogleMaps();
  }
});
