// Service worker minimal du portail admin — installabilité PWA + repli
// hors-ligne sobre. Ne met volontairement PAS en cache les réponses de
// l'API : un back-office de contenu ne doit jamais servir de données
// obsolètes en silence.
const SHELL_CACHE = 'erimas-admin-shell-v1'
const SHELL_ASSETS = ['/admin-icon.svg', '/manifest-admin.webmanifest']

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(SHELL_CACHE).then((cache) => cache.addAll(SHELL_ASSETS)))
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== SHELL_CACHE).map((key) => caches.delete(key))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || request.url.includes('/api/')) return

  event.respondWith(
    fetch(request).catch(() =>
      caches.match(request).then((cached) => cached || caches.match('/admin-icon.svg'))
    )
  )
})
