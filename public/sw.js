const CACHE_NAME = 'trelloCache';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll([
                    '/js/index.js',
                    '/',
                ]);
            })
    );
});


self.addEventListener('fetch', (event) => {
    event.respondWith((() => {
        if (navigator.onLine === true) {
            return fetch(event.request)
                .then((response) => {
                    if (event.request.method !== 'GET') {
                        return response;
                    }

                    const responseClone = response.clone();
                    console.log('SAVING: ' + event.request.url);
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseClone);
                        });

                    return response;
                });
        }


        return caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            });
    })()
    );
});
