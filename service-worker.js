// Service Worker for Houston 2025 Travel Guide

const CACHE_NAME = 'houston-guide-v2';
const STATIC_CACHE_NAME = 'houston-static-v2';
const DYNAMIC_CACHE_NAME = 'houston-dynamic-v2';
const IMAGES_CACHE_NAME = 'houston-images-v2';

// Core files to cache (essential for app functionality)
const CORE_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/critical.css',
  '/assets/js/script-loader.js',
  '/assets/js/image-optimizer.js',
  '/offline.html'
];

// Static assets to cache (CSS, JS, icons)
const STATIC_FILES = [
  '/assets/css/improved-style.css',
  '/assets/js/main.js',
  '/assets/js/maps-improved.js',
  '/assets/js/gallery.js',
  '/assets/js/itineraries.js',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-72x72.png',
  '/assets/icons/icon-96x96.png',
  '/assets/icons/icon-128x128.png',
  '/assets/icons/icon-144x144.png',
  '/assets/icons/icon-152x152.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-384x384.png',
  '/assets/icons/icon-512x512.png'
];

// HTML pages to cache
const HTML_FILES = [
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
  '/carte_interactive.html',
  '/itineraires.html',
  '/feedback.html'
];

// Image file extensions to cache dynamically
const IMAGE_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.webp',
  '.svg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache core files
      caches.open(CACHE_NAME).then(cache => {
        console.log('Caching core files');
        return cache.addAll(CORE_FILES);
      }),
      // Cache static assets
      caches.open(STATIC_CACHE_NAME).then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_FILES);
      }),
      // Cache HTML pages
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        console.log('Caching HTML pages');
        return cache.addAll(HTML_FILES);
      })
    ])
  );
  // Force the waiting service worker to become the active service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [
    CACHE_NAME,
    STATIC_CACHE_NAME,
    DYNAMIC_CACHE_NAME,
    IMAGES_CACHE_NAME
  ];

  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (!currentCaches.includes(key)) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  // Take control of all clients immediately
  return self.clients.claim();
});

// Fetch event - implement stale-while-revalidate strategy
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Skip Google Analytics and other third-party requests
  if (url.hostname.includes('google-analytics.com') ||
      url.hostname.includes('sentry-cdn.com') ||
      url.hostname.includes('maps.googleapis.com')) {
    return;
  }

  // For HTML pages - network first, fallback to cache
  if (event.request.headers.get('Accept').includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response
          const responseToCache = response.clone();

          // Update the cache with the latest version
          caches.open(DYNAMIC_CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // If not in cache, serve offline page
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // For images - cache first, then network
  if (IMAGE_EXTENSIONS.some(ext => url.pathname.endsWith(ext))) {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Return cached response if available
          if (cachedResponse) {
            // Revalidate the cache in the background
            fetch(event.request)
              .then(response => {
                if (response.ok) {
                  caches.open(IMAGES_CACHE_NAME)
                    .then(cache => cache.put(event.request, response));
                }
              })
              .catch(() => {});

            return cachedResponse;
          }

          // If not in cache, fetch from network and cache
          return fetch(event.request)
            .then(response => {
              if (!response.ok) return response;

              // Clone the response
              const responseToCache = response.clone();

              // Cache the fetched image
              caches.open(IMAGES_CACHE_NAME)
                .then(cache => cache.put(event.request, responseToCache));

              return response;
            })
            .catch(() => {
              // If both cache and network fail, return a placeholder image
              // This could be enhanced to return a specific placeholder based on file type
              return new Response('Image not available', { status: 404 });
            });
        })
    );
    return;
  }

  // For all other requests - stale-while-revalidate
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response immediately if available
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Check if we received a valid response
            if (networkResponse.ok) {
              // Clone the response
              const responseToCache = networkResponse.clone();

              // Determine which cache to use
              const cacheName = STATIC_FILES.some(file =>
                event.request.url.includes(file)) ? STATIC_CACHE_NAME : DYNAMIC_CACHE_NAME;

              // Update the cache with the latest version
              caches.open(cacheName).then(cache => {
                cache.put(event.request, responseToCache);
              });
            }

            return networkResponse;
          })
          .catch(error => {
            console.error('Fetch failed:', error);
            // Return cached response as fallback
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
  );
});
