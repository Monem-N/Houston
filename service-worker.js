// Service Worker for Houston 2025 Travel Guide

const CACHE_NAME = 'houston-guide-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/improved-style.css',
  '/assets/js/main.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png',
  '/01_Introduction.html',
  '/02_Space_Center_Kemah.html',
  '/03_Shopping_Katy_Mills.html',
  '/04_Safety_Logistics.html',
  '/05_Gastronomie.html',
  '/06_FIRST_Championship.html',
  '/07_Museum_District.html',
  '/08_Hermann_Park_Zoo.html',
  '/09_Thematic_Index.html',
  '/A_Transport_Maps.html',
  '/B_Emergency_Contacts.html',
  '/C_Shopping_Comparison.html',
  '/D_Touristanbul.html',
  '/E_Local_Dining_Shopping.html'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell');
        return cache.addAll(filesToCache);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

// Fetch event - serve from cache if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});
