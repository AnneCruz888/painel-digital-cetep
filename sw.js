// sw.js (versão final para GitHub Pages)

const CACHE_NAME = 'painel-cetep-cache-v3'; // Mudei a versão para forçar a atualização
const urlsToCache = [
  // Adicione o nome do seu repositório na frente de cada caminho
  '/painel-digital-cetep/',
  '/painel-digital-cetep/index.html',
  '/painel-digital-cetep/static/css/style.css',
  '/painel-digital-cetep/static/js/main.js',
  '/painel-digital-cetep/static/images/logo-eptec.png',
  '/painel-digital-cetep/static/images/logo-cetep.png',
  '/painel-digital-cetep/static/images/fachada-cetep.jpg',
  '/painel-digital-cetep/static/images/brasao-bahia.png',
  '/painel-digital-cetep/static/images/bandeira-bahia.jpg',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Roboto:wght@400;500&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto, adicionando arquivos essenciais.');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});