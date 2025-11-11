
const CACHE_NAME = 'gavi-gadgets-v3';
const STATIC_CACHE = 'gavi-static-v3';
const DYNAMIC_CACHE = 'gavi-dynamic-v3';

// Static assets to cache immediately
const staticAssets = [
  '/',
  '/images/gavi_icon.png',
  '/images/appbar_logo.png',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', function(event) {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(function(cache) {
        return cache.addAll(staticAssets);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE && cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - implement network-first caching strategy
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy (no caching for real-time data)
  if (url.pathname.includes('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(
      fetch(request)
        .catch(() => {
          // Only fallback to cache if network completely fails
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets (images, icons, manifest) with cache-first
  if (request.destination === 'image' || url.pathname.includes('/images/') || url.pathname === '/manifest.json') {
    event.respondWith(
      caches.match(request)
        .then(response => {
          return response || fetch(request).then(fetchResponse => {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE).then(cache => {
              cache.put(request, responseClone);
            });
            return fetchResponse;
          });
        })
    );
    return;
  }

  // Handle navigation and app requests with network-first strategy
  if (request.mode === 'navigate' || request.destination === 'document' || 
      request.destination === 'script' || request.destination === 'style') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Only cache if it's a successful response
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then(cache => {
              // Set a short TTL by adding a timestamp
              const headers = new Headers(responseClone.headers);
              headers.set('sw-cache-timestamp', Date.now().toString());
              cache.put(request, new Response(responseClone.body, {
                status: responseClone.status,
                statusText: responseClone.statusText,
                headers: headers
              }));
            });
          }
          return response;
        })
        .catch(() => {
          // Check cache age before serving cached content
          return caches.open(DYNAMIC_CACHE).then(cache => {
            return cache.match(request).then(cachedResponse => {
              if (cachedResponse) {
                const cacheTimestamp = cachedResponse.headers.get('sw-cache-timestamp');
                const now = Date.now();
                const cacheAge = now - parseInt(cacheTimestamp || '0');
                
                // If cached content is older than 5 minutes, don't serve it
                if (cacheAge > 5 * 60 * 1000) {
                  return caches.match('/');
                }
                return cachedResponse;
              }
              return caches.match('/');
            });
          });
        })
    );
    return;
  }

  // Default: always try network first
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});

// Background sync for offline actions
self.addEventListener('sync', function(event) {
  console.log('Background sync triggered:', event.tag);
  
  if (event.tag === 'cart-sync') {
    event.waitUntil(syncCartData());
  }
  
  if (event.tag === 'order-sync') {
    event.waitUntil(syncOrderData());
  }
});

// Push notification handling
self.addEventListener('push', function(event) {
  console.log('Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Gavi Gadgets!',
    icon: '/images/gavi_icon.png',
    badge: '/images/gavi_icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Products',
        icon: '/images/gavi_icon.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/images/gavi_icon.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Gavi Gadgets', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
  console.log('Notification clicked');
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    return;
  } else {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Handle app updates - force update when new version is available
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('Forcing service worker update');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'SHARE_TARGET') {
    console.log('Share target activated:', event.data);
    event.waitUntil(
      clients.openWindow('/?shared=' + encodeURIComponent(event.data.url || event.data.text || ''))
    );
  }
});

// Helper functions for background sync
async function syncCartData() {
  try {
    console.log('Syncing cart data...');
    return Promise.resolve();
  } catch (error) {
    console.error('Cart sync failed:', error);
    throw error;
  }
}

async function syncOrderData() {
  try {
    console.log('Syncing order data...');
    return Promise.resolve();
  } catch (error) {
    console.error('Order sync failed:', error);
    throw error;
  }
}
