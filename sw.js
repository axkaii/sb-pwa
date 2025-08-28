
const CACHE_NAME = 'sb-core-sim-upgraded-v1';
const OFFLINE_URL = 'index.html';
const FILES_TO_CACHE = [
  'index.html',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'sw.js'
];
self.addEventListener('install', evt => {
  evt.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', evt => evt.waitUntil(self.clients.claim()));
self.addEventListener('fetch', evt => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(fetch(evt.request).catch(() => caches.match(OFFLINE_URL)));
    return;
  }
  evt.respondWith(caches.match(evt.request).then(resp => resp || fetch(evt.request)));
});
