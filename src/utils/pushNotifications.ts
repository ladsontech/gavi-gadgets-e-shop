// Web Push Notification utilities
import { supabase } from '@/integrations/supabase/client';

const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE'; // You'll need to generate this

/**
 * Converts a base64 string to Uint8Array for push subscription
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

/**
 * Request notification permission from user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission;
  }

  return Notification.permission;
}

/**
 * Subscribe user to push notifications
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  try {
    // Check if service worker is supported
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Worker not supported');
      return null;
    }

    // Check if Push API is supported
    if (!('PushManager' in window)) {
      console.warn('Push API not supported');
      return null;
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      console.log('Already subscribed to push notifications');
      return subscription;
    }

    // Request notification permission
    const permission = await requestNotificationPermission();

    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Subscribe to push notifications
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
    });

    console.log('Push notification subscription created:', subscription);

    // Send subscription to your backend
    await saveSubscriptionToBackend(subscription);

    return subscription;
  } catch (error) {
    console.error('Error subscribing to push notifications:', error);
    return null;
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();
      await removeSubscriptionFromBackend(subscription);
      console.log('Unsubscribed from push notifications');
      return true;
    }

    return false;
  } catch (error) {
    console.error('Error unsubscribing from push notifications:', error);
    return false;
  }
}

/**
 * Check if user is subscribed to push notifications
 */
export async function isPushNotificationSubscribed(): Promise<boolean> {
  try {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return false;
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    return subscription !== null;
  } catch (error) {
    console.error('Error checking push notification subscription:', error);
    return false;
  }
}

/**
 * Save subscription to backend (Supabase)
 */
async function saveSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
  try {
    const subscriptionData = JSON.parse(JSON.stringify(subscription));
    
    // Store in localStorage as backup
    localStorage.setItem('push_subscription', JSON.stringify(subscriptionData));

    // Save to Supabase
    const { error } = await supabase.from('push_subscriptions').insert({
      endpoint: subscription.endpoint,
      p256dh: subscriptionData.keys.p256dh,
      auth: subscriptionData.keys.auth,
      user_agent: navigator.userAgent,
    });

    if (error) {
      console.error('Error saving subscription to Supabase:', error);
      // Don't throw - subscription still works locally
    } else {
      console.log('Subscription saved to backend');
    }
  } catch (error) {
    console.error('Error saving subscription to backend:', error);
  }
}

/**
 * Remove subscription from backend
 */
async function removeSubscriptionFromBackend(subscription: PushSubscription): Promise<void> {
  try {
    localStorage.removeItem('push_subscription');

    // Remove from Supabase
    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', subscription.endpoint);

    if (error) {
      console.error('Error removing subscription from Supabase:', error);
    } else {
      console.log('Subscription removed from backend');
    }
  } catch (error) {
    console.error('Error removing subscription from backend:', error);
  }
}

/**
 * Send a test notification
 */
export async function sendTestNotification(): Promise<void> {
  if (Notification.permission === 'granted') {
    const registration = await navigator.serviceWorker.ready;
    
    registration.showNotification('Gavi Gadgets Test', {
      body: 'Push notifications are working! You\'ll receive updates even when the app is closed.',
      icon: '/images/gavi_icon.png',
      badge: '/images/gavi_icon.png',
      vibrate: [200, 100, 200],
      tag: 'test-notification',
      requireInteraction: false,
      actions: [
        {
          action: 'view',
          title: 'View Products'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    });
  }
}

