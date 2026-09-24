const CACHE_NAME = 'minha-pilha-v13';
const CORE_FILES = [
  './',
  './index.html',
  './styles.css',
  './personal-library.css?v=13',
  './personal-library.js?v=13',
  './personal-library-ui.js?v=13',
  './cloud-sync.css?v=13',
  './firebase-config.js?v=13',
  './sync-model.js?v=13',
  './cloud-sync.js?v=13',
  './vendor/firebase.js',
  './app-icon.svg',
  './manifest.webmanifest',
  './data.js',
  './expanded-data.js',
  './deep-expansions.js',
  './volume-audit.js',
  './library-wave-3.js',
  './library-wave-4.js',
  './library-wave-5.js',
  './library-wave-6.js',
  './character-themes.js',
  './app.js?v=13'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('minha-pilha-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  if (event.request.mode === 'navigate') {
    event.respondWith(fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put('./index.html', copy));
      return response;
    }).catch(() => caches.match('./index.html')));
    return;
  }
  event.respondWith(fetch(event.request).then(response => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});
