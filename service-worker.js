// self.addEventListener('install', event => {
//   console.log('Inside the install handler:', event);
// });

// self.addEventListener('activate', event => {
//   console.log('Inside the activate handler:', event);
// });

// self.addEventListener(fetch, event => {
//   console.log('Inside the fetch handler:', event);
// });
var CACHE_NAME = 'coded';
var urlsToCache = ['/', '/css/style.css', '/js/index.js'];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(event) {
  var cacheWhitelist = ['/', '/css/style.css', '/js/index.js'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});