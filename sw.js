const CACHE_NAME = 'minha-pilha-v18';
const CORE_FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/images/app-icon.svg',
  './assets/css/styles.css?v=18',
  './assets/css/cloud-sync.css?v=17',
  './assets/css/personal-library.css?v=17',
  './assets/css/home-profile.css?v=17',
  './assets/data/data.js?v=17',
  './assets/data/expanded-data.js?v=17',
  './assets/data/deep-expansions.js?v=17',
  './assets/data/volume-audit.js?v=17',
  './assets/data/library-wave-3.js?v=17',
  './assets/data/library-wave-4.js?v=17',
  './assets/data/library-wave-5.js?v=17',
  './assets/data/library-wave-6.js?v=17',
  './assets/data/catalogue-pt-br.js?v=17',
  './assets/js/character-themes.js?v=17',
  './assets/js/profile-model.js?v=17',
  './assets/js/media-tools.js?v=17',
  './assets/data/catalogue-covers.js?v=17',
  './assets/js/personal-library.js?v=17',
  './assets/js/app.js?v=17',
  './assets/js/personal-library-ui.js?v=17',
  './config/firebase-config.js?v=17',
  './assets/js/sync-model.js?v=17',
  './assets/js/cloud-sync.js?v=17',
  './assets/js/profile-ui.js?v=17',
  './assets/js/home.js?v=17',
  './assets/vendor/firebase/firebase.js?v=17',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('minha-pilha-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  // Filenames include their content hash: a cached cover never needs revalidation.
  if (new URL(event.request.url).pathname.includes('/assets/images/covers/')) {
    event.respondWith(caches.open(CACHE_NAME).then(async cache => {
      const cached = await cache.match(event.request);
      if (cached) return cached;
      const response = await fetch(event.request);
      if (response.ok) await cache.put(event.request, response.clone());
      return response;
    }));
    return;
  }
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      if (!response.ok) throw Error('Page unavailable');
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response => {
    if (!response.ok) throw Error('Asset unavailable');
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});
