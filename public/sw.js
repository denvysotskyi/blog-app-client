const staticCacheName = 'static-app-v1'

const assetsUrl = [
  'index.html',
  '/src/index.tsx'
]

self.addEventListener('install', async e => {
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetsUrl)
})

self.addEventListener('activate', async e => {
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', async e => {
  const fetched = await e.respondWith(cacheFirst(e.request))
})

const cacheFirst = async (request) => {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}