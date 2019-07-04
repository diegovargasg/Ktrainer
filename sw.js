// CODELAB: Update cache names any time any of the cached files change.
const FILES_TO_CACHE = [
  'offline.html',
];

// CODELAB: Precache static resources here.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(FILES_TO_CACHE).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );  
});


// CODELAB: Remove previous cached data from disk.
self.addEventListener('activate', function(event) {
  console.log('activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== FILES_TO_CACHE) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(event) {
  // CODELAB: Add fetch event handler here.
  event.respondWith(
    // Try the cache
    caches.match(event.request).then(function(response) {
      // Fall back to network
      return response || fetch(event.request);
    }).catch(function() {
      // If both fail, show a generic fallback:
      return caches.match('offline.html');
      // However, in reality you'd have many different
      // fallbacks, depending on URL & headers.
      // Eg, a fallback silhouette image for avatars.
    })
  );
});