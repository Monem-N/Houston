/**
 * Houston 2025 - Itinéraires suggérés
 * Ce fichier contient les itinéraires suggérés pour différentes journées à Houston
 */

// Définition des itinéraires suggérés
const SUGGESTED_ITINERARIES = [
  {
    id: "jour1",
    title: "Jour 1: Space Center & Kemah",
    description: "Découverte du Space Center Houston et de Kemah Boardwalk",
    color: "#4285F4", // Bleu Google
    waypoints: [
      {
        name: "Hôtel (départ)",
        lat: 29.7328,
        lng: -95.4160,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true
      },
      {
        name: "Space Center Houston",
        lat: 29.5519,
        lng: -95.0970,
        description: "Visite du centre spatial de la NASA (prévoir 3-4h)",
        stopover: true
      },
      {
        name: "Déjeuner au Space Center",
        lat: 29.5519,
        lng: -95.0970,
        description: "Déjeuner au restaurant du Space Center",
        stopover: true
      },
      {
        name: "Kemah Boardwalk",
        lat: 29.5447,
        lng: -95.0200,
        description: "Attractions et divertissements en bord de mer (prévoir 2-3h)",
        stopover: true
      },
      {
        name: "Dîner à Kemah",
        lat: 29.5447,
        lng: -95.0200,
        description: "Dîner dans l'un des restaurants de fruits de mer à Kemah",
        stopover: true
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.4160,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true
      }
    ]
  },
  {
    id: "jour2",
    title: "Jour 2: Museum District & Hermann Park",
    description: "Exploration du quartier des musées et du parc Hermann",
    color: "#DB4437", // Rouge Google
    waypoints: [
      {
        name: "Hôtel (départ)",
        lat: 29.7328,
        lng: -95.4160,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true
      },
      {
        name: "Museum of Natural Science",
        lat: 29.7221,
        lng: -95.3898,
        description: "Visite du musée des sciences naturelles (prévoir 2h)",
        stopover: true
      },
      {
        name: "Museum of Fine Arts",
        lat: 29.7260,
        lng: -95.3909,
        description: "Visite du musée des beaux-arts (prévoir 1h30)",
        stopover: true
      },
      {
        name: "Déjeuner au MFA Café",
        lat: 29.7260,
        lng: -95.3909,
        description: "Déjeuner au café du musée des beaux-arts",
        stopover: true
      },
      {
        name: "Hermann Park",
        lat: 29.7194,
        lng: -95.3909,
        description: "Promenade dans le parc Hermann (prévoir 1h)",
        stopover: true
      },
      {
        name: "Houston Zoo",
        lat: 29.7146,
        lng: -95.3909,
        description: "Visite du zoo de Houston (prévoir 2h)",
        stopover: true
      },
      {
        name: "Dîner au quartier Rice Village",
        lat: 29.7158,
        lng: -95.4153,
        description: "Dîner dans l'un des restaurants du quartier Rice Village",
        stopover: true
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.4160,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true
      }
    ]
  },
  {
    id: "jour3",
    title: "Jour 3: Shopping & Downtown",
    description: "Journée shopping et découverte du centre-ville",
    color: "#F4B400", // Jaune Google
    waypoints: [
      {
        name: "Hôtel (départ)",
        lat: 29.7328,
        lng: -95.4160,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true
      },
      {
        name: "The Galleria",
        lat: 29.7399,
        lng: -95.4647,
        description: "Shopping au centre commercial The Galleria (prévoir 2h)",
        stopover: true
      },
      {
        name: "Déjeuner à The Galleria",
        lat: 29.7399,
        lng: -95.4647,
        description: "Déjeuner dans l'un des restaurants du centre commercial",
        stopover: true
      },
      {
        name: "Downtown Houston",
        lat: 29.7604,
        lng: -95.3698,
        description: "Visite du centre-ville de Houston (prévoir 2h)",
        stopover: true
      },
      {
        name: "Discovery Green",
        lat: 29.7536,
        lng: -95.3573,
        description: "Promenade dans le parc urbain Discovery Green (prévoir 1h)",
        stopover: true
      },
      {
        name: "Dîner au centre-ville",
        lat: 29.7604,
        lng: -95.3698,
        description: "Dîner dans l'un des restaurants du centre-ville",
        stopover: true
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.4160,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true
      }
    ]
  },
  {
    id: "jour4",
    title: "Jour 4: FIRST Championship",
    description: "Journée dédiée au FIRST Championship",
    color: "#0F9D58", // Vert Google
    waypoints: [
      {
        name: "Hôtel (départ)",
        lat: 29.7328,
        lng: -95.4160,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true
      },
      {
        name: "George R. Brown Convention Center",
        lat: 29.7520,
        lng: -95.3562,
        description: "Participation au FIRST Championship (toute la journée)",
        stopover: true
      },
      {
        name: "Déjeuner au Convention Center",
        lat: 29.7520,
        lng: -95.3562,
        description: "Déjeuner dans l'un des points de restauration du centre de convention",
        stopover: true
      },
      {
        name: "Retour au FIRST Championship",
        lat: 29.7520,
        lng: -95.3562,
        description: "Suite de la participation au FIRST Championship",
        stopover: true
      },
      {
        name: "Dîner près du Convention Center",
        lat: 29.7520,
        lng: -95.3562,
        description: "Dîner dans l'un des restaurants près du centre de convention",
        stopover: true
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.4160,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true
      }
    ]
  },
  {
    id: "jour5",
    title: "Jour 5: Katy Mills & Gastronomie",
    description: "Journée shopping à Katy Mills et découverte de la gastronomie texane",
    color: "#673AB7", // Violet
    waypoints: [
      {
        name: "Hôtel (départ)",
        lat: 29.7328,
        lng: -95.4160,
        description: "Départ de l'hôtel Crowne Plaza Houston Med-Ctr Galleria Area",
        stopover: true
      },
      {
        name: "Katy Mills",
        lat: 29.7769,
        lng: -95.8150,
        description: "Shopping au centre commercial outlet Katy Mills (prévoir 3h)",
        stopover: true
      },
      {
        name: "Déjeuner à Katy Mills",
        lat: 29.7769,
        lng: -95.8150,
        description: "Déjeuner dans l'un des restaurants du centre commercial",
        stopover: true
      },
      {
        name: "The Breakfast Klub",
        lat: 29.7428,
        lng: -95.3780,
        description: "Visite du célèbre restaurant The Breakfast Klub (prévoir 1h)",
        stopover: true
      },
      {
        name: "Pappasito's Cantina",
        lat: 29.7328,
        lng: -95.4180,
        description: "Dîner au restaurant mexicain Pappasito's Cantina",
        stopover: true
      },
      {
        name: "Retour à l'hôtel",
        lat: 29.7328,
        lng: -95.4160,
        description: "Retour à l'hôtel Crowne Plaza",
        stopover: true
      }
    ]
  }
];

// Fonction pour initialiser les itinéraires sur la carte
function initItineraries(map) {
  // Vérifie si l'API Google Maps est chargée
  if (!window.google || !window.google.maps) {
    console.error("L'API Google Maps n'est pas chargée");
    return;
  }

  // Crée un service de directions
  const directionsService = new google.maps.DirectionsService();

  // Crée un tableau pour stocker les renderers de directions
  const directionsRenderers = [];

  // Crée un conteneur pour les contrôles d'itinéraires s'il n'existe pas déjà
  let itineraryControls = document.getElementById('itinerary-controls');
  if (!itineraryControls) {
    itineraryControls = document.createElement('div');
    itineraryControls.id = 'itinerary-controls';
    itineraryControls.className = 'itinerary-controls';

    // Ajoute le conteneur avant les filtres de la carte
    const mapFilters = document.getElementById('map-filters');
    if (mapFilters) {
      mapFilters.parentNode.insertBefore(itineraryControls, mapFilters);
    } else {
      // Si les filtres n'existent pas, ajoute le conteneur avant la carte
      const mapContainer = document.getElementById('main-map');
      if (mapContainer) {
        mapContainer.parentNode.insertBefore(itineraryControls, mapContainer);
      }
    }
  }

  // Crée un titre pour les contrôles d'itinéraires
  const title = document.createElement('h3');
  title.textContent = 'Itinéraires suggérés';
  itineraryControls.appendChild(title);

  // Crée un paragraphe d'explication
  const explanation = document.createElement('p');
  explanation.textContent = 'Sélectionnez un itinéraire pour l\'afficher sur la carte. Cliquez sur les marqueurs pour plus d\'informations.';
  itineraryControls.appendChild(explanation);

  // Crée un conteneur pour les boutons d'itinéraires
  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'itinerary-buttons';
  itineraryControls.appendChild(buttonsContainer);

  // Crée un bouton pour masquer tous les itinéraires
  const hideAllButton = document.createElement('button');
  hideAllButton.textContent = 'Masquer tous les itinéraires';
  hideAllButton.className = 'hide-all-button';
  hideAllButton.addEventListener('click', function() {
    // Masque tous les itinéraires
    directionsRenderers.forEach(renderer => {
      renderer.setMap(null);
    });

    // Réinitialise tous les boutons
    document.querySelectorAll('.itinerary-button').forEach(button => {
      button.classList.remove('active');
    });

    // Enregistre l'événement dans Google Analytics si disponible
    if (typeof gtag === 'function') {
      gtag('event', 'hide_all_itineraries', {
        'event_category': 'itineraries',
        'event_label': 'all',
        'value': 1
      });
    }
  });
  buttonsContainer.appendChild(hideAllButton);

  // Crée un bouton pour chaque itinéraire
  SUGGESTED_ITINERARIES.forEach((itinerary, index) => {
    // Crée un renderer de directions pour cet itinéraire
    const directionsRenderer = new google.maps.DirectionsRenderer({
      map: null, // Ne l'affiche pas encore
      suppressMarkers: true, // Supprime les marqueurs par défaut
      polylineOptions: {
        strokeColor: itinerary.color,
        strokeOpacity: 0.8,
        strokeWeight: 5
      }
    });

    // Ajoute le renderer au tableau
    directionsRenderers.push(directionsRenderer);

    // Crée un bouton pour cet itinéraire
    const button = document.createElement('button');
    button.textContent = itinerary.title;
    button.className = 'itinerary-button';
    button.dataset.itineraryId = itinerary.id;
    button.style.borderColor = itinerary.color;

    // Ajoute l'événement de clic
    button.addEventListener('click', function() {
      // Vérifie si le bouton est déjà actif
      const isActive = button.classList.contains('active');

      if (isActive) {
        // Masque l'itinéraire
        directionsRenderer.setMap(null);
        button.classList.remove('active');
      } else {
        // Affiche l'itinéraire
        directionsRenderer.setMap(map);
        button.classList.add('active');

        // Calcule l'itinéraire si ce n'est pas déjà fait
        if (!directionsRenderer.getDirections()) {
          // Prépare les waypoints pour l'API Directions
          const origin = itinerary.waypoints[0];
          const destination = itinerary.waypoints[itinerary.waypoints.length - 1];
          const waypoints = itinerary.waypoints.slice(1, -1).map(wp => ({
            location: new google.maps.LatLng(wp.lat, wp.lng),
            stopover: wp.stopover
          }));

          // Demande l'itinéraire
          directionsService.route({
            origin: new google.maps.LatLng(origin.lat, origin.lng),
            destination: new google.maps.LatLng(destination.lat, destination.lng),
            waypoints: waypoints,
            optimizeWaypoints: false,
            travelMode: google.maps.TravelMode.DRIVING
          }, function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              // Affiche l'itinéraire
              directionsRenderer.setDirections(response);

              // Ajoute des marqueurs personnalisés pour chaque point d'arrêt
              itinerary.waypoints.forEach((waypoint, waypointIndex) => {
                const marker = new google.maps.Marker({
                  position: { lat: waypoint.lat, lng: waypoint.lng },
                  map: map,
                  title: waypoint.name,
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    fillColor: itinerary.color,
                    fillOpacity: 1,
                    strokeColor: '#FFFFFF',
                    strokeWeight: 2
                  },
                  zIndex: 1000 + waypointIndex
                });

                // Crée une fenêtre d'info pour ce point d'arrêt
                const infoContent = `
                  <div class="info-window">
                    <h3>${waypoint.name}</h3>
                    <p>${waypoint.description}</p>
                  </div>
                `;

                const infoWindow = new google.maps.InfoWindow({
                  content: infoContent
                });

                // Ajoute l'événement de clic
                marker.addListener('click', function() {
                  // Ferme toutes les fenêtres d'info ouvertes
                  if (window.openInfoWindow) {
                    window.openInfoWindow.close();
                  }

                  // Ouvre la fenêtre d'info
                  infoWindow.open(map, marker);
                  window.openInfoWindow = infoWindow;

                  // Enregistre l'événement dans Google Analytics si disponible
                  if (typeof gtag === 'function') {
                    gtag('event', 'view_waypoint', {
                      'event_category': 'itineraries',
                      'event_label': waypoint.name,
                      'value': 1
                    });
                  }
                });
              });
            } else {
              console.error('Erreur lors du calcul de l\'itinéraire:', status);
              alert(`Erreur lors du calcul de l'itinéraire: ${status}`);
            }
          });
        }
      }

      // Enregistre l'événement dans Google Analytics si disponible
      if (typeof gtag === 'function') {
        gtag('event', isActive ? 'hide_itinerary' : 'show_itinerary', {
          'event_category': 'itineraries',
          'event_label': itinerary.id,
          'value': 1
        });
      }
    });

    // Ajoute le bouton au conteneur
    buttonsContainer.appendChild(button);
  });

  // Crée un conteneur pour les détails de l'itinéraire
  const itineraryDetails = document.createElement('div');
  itineraryDetails.id = 'itinerary-details';
  itineraryDetails.className = 'itinerary-details';
  itineraryControls.appendChild(itineraryDetails);

  // Ajoute un événement de survol pour afficher les détails de l'itinéraire
  document.querySelectorAll('.itinerary-button').forEach(button => {
    button.addEventListener('mouseover', function() {
      const itineraryId = button.dataset.itineraryId;
      const itinerary = SUGGESTED_ITINERARIES.find(it => it.id === itineraryId);

      if (itinerary) {
        // Affiche les détails de l'itinéraire
        itineraryDetails.innerHTML = `
          <h4>${itinerary.title}</h4>
          <p>${itinerary.description}</p>
          <ul>
            ${itinerary.waypoints.map(wp => `<li>${wp.name}: ${wp.description}</li>`).join('')}
          </ul>
        `;
        itineraryDetails.style.display = 'block';
      }
    });

    button.addEventListener('mouseout', function() {
      // Masque les détails de l'itinéraire
      itineraryDetails.style.display = 'none';
    });
  });
}

// Fonction pour initialiser les itinéraires sur la page d'itinéraires
function initItineraryPage() {
  // Vérifie si la page contient une liste d'itinéraires
  const itineraryList = document.getElementById('itinerary-list');
  if (!itineraryList) return;

  // Crée une carte pour chaque itinéraire
  SUGGESTED_ITINERARIES.forEach(itinerary => {
    // Crée un conteneur pour cet itinéraire
    const itineraryContainer = document.createElement('div');
    itineraryContainer.className = 'itinerary-container';
    itineraryContainer.id = `itinerary-${itinerary.id}`;

    // Crée un en-tête pour cet itinéraire
    const header = document.createElement('h3');
    header.textContent = itinerary.title;
    header.style.borderColor = itinerary.color;
    itineraryContainer.appendChild(header);

    // Crée une description pour cet itinéraire
    const description = document.createElement('p');
    description.textContent = itinerary.description;
    itineraryContainer.appendChild(description);

    // Crée un conteneur pour la carte
    const mapContainer = document.createElement('div');
    mapContainer.className = 'itinerary-map';
    mapContainer.id = `map-${itinerary.id}`;
    itineraryContainer.appendChild(mapContainer);

    // Crée une liste des points d'arrêt
    const waypointsList = document.createElement('ul');
    waypointsList.className = 'waypoints-list';

    itinerary.waypoints.forEach(waypoint => {
      const waypointItem = document.createElement('li');
      waypointItem.innerHTML = `<strong>${waypoint.name}</strong>: ${waypoint.description}`;
      waypointsList.appendChild(waypointItem);
    });

    itineraryContainer.appendChild(waypointsList);

    // Ajoute le conteneur à la liste d'itinéraires
    itineraryList.appendChild(itineraryContainer);
  });

  // Initialise les cartes une fois que l'API Google Maps est chargée
  window.initItineraryMaps = function() {
    SUGGESTED_ITINERARIES.forEach(itinerary => {
      // Crée une carte pour cet itinéraire
      const mapContainer = document.getElementById(`map-${itinerary.id}`);
      if (!mapContainer) return;

      // Crée la carte
      const map = new google.maps.Map(mapContainer, {
        center: { lat: 29.7604, lng: -95.3698 }, // Centre sur Houston
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        zoomControl: true
      });

      // Crée un service de directions
      const directionsService = new google.maps.DirectionsService();

      // Crée un renderer de directions
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true, // Supprime les marqueurs par défaut
        polylineOptions: {
          strokeColor: itinerary.color,
          strokeOpacity: 0.8,
          strokeWeight: 5
        }
      });

      // Prépare les waypoints pour l'API Directions
      const origin = itinerary.waypoints[0];
      const destination = itinerary.waypoints[itinerary.waypoints.length - 1];
      const waypoints = itinerary.waypoints.slice(1, -1).map(wp => ({
        location: new google.maps.LatLng(wp.lat, wp.lng),
        stopover: wp.stopover
      }));

      // Demande l'itinéraire
      directionsService.route({
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: waypoints,
        optimizeWaypoints: false,
        travelMode: google.maps.TravelMode.DRIVING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          // Affiche l'itinéraire
          directionsRenderer.setDirections(response);

          // Ajoute des marqueurs personnalisés pour chaque point d'arrêt
          itinerary.waypoints.forEach((waypoint, waypointIndex) => {
            const marker = new google.maps.Marker({
              position: { lat: waypoint.lat, lng: waypoint.lng },
              map: map,
              title: waypoint.name,
              icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: itinerary.color,
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2
              },
              zIndex: 1000 + waypointIndex
            });

            // Crée une fenêtre d'info pour ce point d'arrêt
            const infoContent = `
              <div class="info-window">
                <h3>${waypoint.name}</h3>
                <p>${waypoint.description}</p>
              </div>
            `;

            const infoWindow = new google.maps.InfoWindow({
              content: infoContent
            });

            // Ajoute l'événement de clic
            marker.addListener('click', function() {
              // Ferme toutes les fenêtres d'info ouvertes
              if (window.openInfoWindow) {
                window.openInfoWindow.close();
              }

              // Ouvre la fenêtre d'info
              infoWindow.open(map, marker);
              window.openInfoWindow = infoWindow;
            });
          });
        } else {
          console.error('Erreur lors du calcul de l\'itinéraire:', status);
          mapContainer.innerHTML = `<div class="error-message">Erreur lors du calcul de l'itinéraire: ${status}</div>`;
        }
      });
    });
  };

  // Charge l'API Google Maps
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${CONFIG.GOOGLE_MAPS_API_KEY}&callback=initItineraryMaps`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}

// Fonction pour initialiser les itinéraires lorsque l'API Google Maps est chargée
function initItinerariesWhenMapsLoaded() {
  try {
    // Vérifie si la page contient une carte principale
    const mainMapContainer = document.getElementById('main-map');
    if (mainMapContainer && window.google && window.google.maps) {
      // Récupère la carte
      const map = window.mainMap;
      if (map) {
        // Initialise les itinéraires
        initItineraries(map);
      } else {
        console.warn('Map object not found in window.mainMap');
      }
    } else if (mainMapContainer) {
      console.warn('Google Maps API not loaded yet');
    }

    // Vérifie si la page est la page d'itinéraires
    const itineraryList = document.getElementById('itinerary-list');
    if (itineraryList) {
      // Initialise la page d'itinéraires
      initItineraryPage();
    }
  } catch (error) {
    console.error('Error in initItinerariesWhenMapsLoaded:', error);
    if (typeof Sentry !== 'undefined') {
      Sentry.captureException(error);
    }
  }
}

// Modifie la fonction initMaps pour stocker la carte dans une variable globale
const originalInitMainMap = window.initMainMap;
window.initMainMap = function() {
  // Appelle la fonction originale
  const map = originalInitMainMap();

  // Stocke la carte dans une variable globale
  window.mainMap = map;

  // Initialise les itinéraires
  initItinerariesWhenMapsLoaded();

  return map;
};

// Initialise les itinéraires lorsque la page est chargée
document.addEventListener('DOMContentLoaded', function() {
  // Vérifie si l'API Google Maps est déjà chargée
  if (window.google && window.google.maps) {
    initItinerariesWhenMapsLoaded();
  }
});
