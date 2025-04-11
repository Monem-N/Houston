// Service Worker for Houston 2025 Travel Guide
const CACHE_NAME = 'houston-guide-v1';

// Files to cache
const filesToCache = [
  '/',
  '/index.html',
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
  '/E_Local_Dining_Shopping.html',
  '/assets/css/style.css',
  '/assets/css/_base.css',
  '/assets/css/_typography.css',
  '/assets/css/_layout.css',
  '/assets/css/_tables.css',
  '/assets/css/_images.css',
  '/assets/css/_special.css',
  '/assets/css/_print.css',
  '/assets/script.js',
  '/assets/front_page.png',
  '/manifest.json'
];

// Install event - cache all required files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(filesToCache);
      })
  );
});

// Fetch event - serve from cache if available, otherwise fetch from network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
