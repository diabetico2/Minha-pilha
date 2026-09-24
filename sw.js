const CACHE_NAME = 'minha-pilha-v15';
const CORE_FILES = [
  './',
  './index.html',
  './styles.css',
  './home-profile.css?v=15',
  './profile-model.js?v=15',
  './media-tools.js?v=15',
  './catalogue-covers.js?v=15',
  './profile-ui.js?v=15',
  './home.js?v=15',
  './personal-library.css?v=15',
  './personal-library.js?v=15',
  './personal-library-ui.js?v=15',
  './cloud-sync.css?v=15',
  './firebase-config.js?v=15',
  './sync-model.js?v=15',
  './cloud-sync.js?v=15',
  './vendor/firebase.js?v=15',
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
  './app.js?v=15'
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
