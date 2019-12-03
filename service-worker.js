var CACHE_NAME = 'coded';
var urlsToCache = [
  '/',
  '/#page1',
  '/#page2',
  '/#page3',
  '/#page4',
  '/#page5',
  '/#page6',
  '/#page7',
  '/css/font-awesome.min.css',
  '/css/bootstrap.min.css',
  '/css/jquery.pagepiling.css',
  '/css/plugins.css',
  '/css/color.css',
  '/css/style.css',
  '/css/rtl.css',
  '/js/app.js',
  '/js/bootstrap.min.js',
  '/js/custom.js',
  '/js/index.js',
  '/js/jquery.min.js',
  '/js/jquery.pagepiling.min.js',
  '/js/particles.min.js',
  '/js/plugins.js',
  '/js/popper.min.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      // return cache.addAll(urlsToCache);
    })
  );
});
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [
    '/',
    '/#page1',
    '/#page2',
    '/#page3',
    '/#page4',
    '/#page5',
    '/#page6',
    '/#page7',
    '/css/font-awesome.min.css',
    '/css/bootstrap.min.css',
    '/css/jquery.pagepiling.css',
    '/css/plugins.css',
    '/css/color.css',
    '/css/style.css',
    '/css/rtl.css',
    '/js/app.js',
    '/js/bootstrap.min.js',
    '/js/custom.js',
    '/js/index.js',
    '/js/jquery.min.js',
    '/js/jquery.pagepiling.min.js',
    '/js/particles.min.js',
    '/js/plugins.js',
    '/js/popper.min.js'
  ];

  event.waitUntil(
    caches.keys().then(function(urlsToCache) {
      return Promise.all(
        urlsToCache.map(function(cacheName) {
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
