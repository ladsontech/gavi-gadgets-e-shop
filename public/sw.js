
const CACHE_NAME = 'gavi-gadgets-v2';
const STATIC_CACHE = 'gavi-static-v2';
const DYNAMIC_CACHE = 'gavi-dynamic-v2';

// Static assets to cache immediately
const staticAssets = [
  '/',
  '/images/gavi_icon.png',
  '/images/gavi_gadgets_logo.png',
  '/manifest.json'
];

// Dynamic assets patterns
const dynamicAssets = [
  /\/product\//,
  /\/cart/,
  /\/admin/
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

// Fetch event - implement caching strategies
self.addEventListener('fetch', function(event) {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests with network-first strategy
  if (url.pathname.includes('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Clone the response before caching
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets with cache-first strategy
  if (staticAssets.some(asset => url.pathname === asset) || 
      request.destination === 'image' || 
      request.destination === 'style' || 
      request.destination === 'script') {
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

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => {
          // Cache successful navigation responses
          const responseClone = response.clone();
          caches.open(DYNAMIC_CACHE).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cached version or offline page
          return caches.match(request).then(cachedResponse => {
            return cachedResponse || caches.match('/');
          });
        })
    );
    return;
  }

  // Default: try network first, fallback to cache
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
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', function(event) {
  console.log('Periodic sync triggered:', event.tag);
  
  if (event.tag === 'update-products') {
    event.waitUntil(updateProductsCache());
  }
});

// Helper functions for background sync
async function syncCartData() {
  try {
    console.log('Syncing cart data...');
    // Implementation would sync cart data when online
    return Promise.resolve();
  } catch (error) {
    console.error('Cart sync failed:', error);
    throw error;
  }
}

async function syncOrderData() {
  try {
    console.log('Syncing order data...');
    // Implementation would sync order data when online
    return Promise.resolve();
  } catch (error) {
    console.error('Order sync failed:', error);
    throw error;
  }
}

async function updateProductsCache() {
  try {
    console.log('Updating products cache...');
    // Implementation would refresh product data
    return Promise.resolve();
  } catch (error) {
    console.error('Products cache update failed:', error);
    throw error;
  }
}

// Handle share target
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SHARE_TARGET') {
    console.log('Share target activated:', event.data);
    // Handle shared content
    event.waitUntil(
      clients.openWindow('/?shared=' + encodeURIComponent(event.data.url || event.data.text || ''))
    );
  }
});
