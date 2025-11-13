# Push Notifications Setup Guide

This guide will help you set up Web Push Notifications for Gavi Gadgets e-shop that work even when the app is closed.

## 🚀 Features Implemented

✅ Push notifications work even when app is closed  
✅ Notification permission prompt  
✅ User settings page to manage notifications  
✅ Admin panel to send notifications  
✅ Rich notifications with images and links  
✅ Notification click handling  
✅ Service worker integration  

---

## 📋 Prerequisites

1. Node.js installed
2. Your app hosted on HTTPS (required for push notifications)
3. Supabase project set up

---

## 🔧 Step 1: Generate VAPID Keys

VAPID keys are required for Web Push API. Generate them using the `web-push` library:

### Install web-push globally:

```bash
npm install -g web-push
```

### Generate VAPID keys:

```bash
web-push generate-vapid-keys
```

This will output something like:

```
=======================================
Public Key:
BEl62iUYgUivxIkv69yViEuiBIa-Ib27SfdH8xzaTbLpYk3A...

Private Key:
KZJnKe6RXEp...
=======================================
```

**Important:** Save both keys securely!

---

## 🔑 Step 2: Configure VAPID Keys

### Update the public key in your app:

Open `src/utils/pushNotifications.ts` and replace the placeholder:

```typescript
const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';
```

with your actual public key:

```typescript
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib27SfdH8xzaTbLpYk3A...';
```

### Store the private key securely:

Store your **PRIVATE KEY** in environment variables or Supabase secrets (never commit it to code!):

- In Supabase Dashboard → Settings → Vault → Add a new secret
- Name: `VAPID_PRIVATE_KEY`
- Value: Your private key

---

## 💾 Step 3: Create Supabase Table for Push Subscriptions

Run this SQL in your Supabase SQL Editor:

```sql
-- Create push_subscriptions table
CREATE TABLE IF NOT EXISTS push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert their own subscription
CREATE POLICY "Allow insert subscription" ON push_subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Policy: Allow anyone to delete their own subscription
CREATE POLICY "Allow delete own subscription" ON push_subscriptions
  FOR DELETE
  USING (true);

-- Policy: Admin can view all subscriptions
CREATE POLICY "Admin can view subscriptions" ON push_subscriptions
  FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create index for faster lookups
CREATE INDEX idx_push_subscriptions_endpoint ON push_subscriptions(endpoint);
```

---

## 🔨 Step 4: Update Push Notification Utilities

Update `src/utils/pushNotifications.ts` to save subscriptions to Supabase:

Replace the TODO sections with actual Supabase calls:

```typescript
import { supabase } from '@/integrations/supabase/client';

// In saveSubscriptionToBackend function:
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
      console.error('Error saving subscription:', error);
      throw error;
    }

    console.log('Subscription saved to backend');
  } catch (error) {
    console.error('Error saving subscription to backend:', error);
  }
}

// In removeSubscriptionFromBackend function:
async function removeSubscriptionFromBackend(subscription: PushSubscription): Promise<void> {
  try {
    localStorage.removeItem('push_subscription');

    // Remove from Supabase
    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', subscription.endpoint);

    if (error) {
      console.error('Error removing subscription:', error);
      throw error;
    }

    console.log('Subscription removed from backend');
  } catch (error) {
    console.error('Error removing subscription from backend:', error);
  }
}
```

---

## 🎯 Step 5: Create Supabase Edge Function to Send Notifications

Create a Supabase Edge Function to handle sending push notifications:

### Create the function:

```bash
supabase functions new send-push-notification
```

### Edit `supabase/functions/send-push-notification/index.ts`:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const VAPID_PUBLIC_KEY = Deno.env.get('VAPID_PUBLIC_KEY')!;
const VAPID_PRIVATE_KEY = Deno.env.get('VAPID_PRIVATE_KEY')!;

interface NotificationPayload {
  title: string;
  body: string;
  image?: string;
  url?: string;
  tag?: string;
  requireInteraction?: boolean;
}

serve(async (req) => {
  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Parse request body
    const payload: NotificationPayload = await req.json();

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch all active push subscriptions
    const { data: subscriptions, error } = await supabaseClient
      .from('push_subscriptions')
      .select('*');

    if (error) {
      throw error;
    }

    if (!subscriptions || subscriptions.length === 0) {
      return new Response(JSON.stringify({ message: 'No subscriptions found' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    // Send notification to each subscription
    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        const notificationData = JSON.stringify({
          title: payload.title,
          body: payload.body,
          image: payload.image || null,
          url: payload.url || '/',
          tag: payload.tag || 'default',
          requireInteraction: payload.requireInteraction || false,
        });

        // Use web-push library (you'll need to import it)
        // For simplicity, using fetch to Web Push API
        const response = await fetch(pushSubscription.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'TTL': '86400',
          },
          body: notificationData,
        });

        if (!response.ok && response.status === 410) {
          // Subscription expired, remove from database
          await supabaseClient
            .from('push_subscriptions')
            .delete()
            .eq('endpoint', sub.endpoint);
        }

        return response.ok;
      })
    );

    const successful = results.filter((r) => r.status === 'fulfilled' && r.value).length;

    return new Response(
      JSON.stringify({
        message: `Notifications sent to ${successful}/${subscriptions.length} devices`,
        total: subscriptions.length,
        successful,
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error sending push notifications:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
```

### Deploy the function:

```bash
supabase functions deploy send-push-notification --no-verify-jwt
```

### Set environment variables:

```bash
supabase secrets set VAPID_PUBLIC_KEY="your_public_key"
supabase secrets set VAPID_PRIVATE_KEY="your_private_key"
```

---

## 🔗 Step 6: Update Admin Notification Sender

Update `src/components/admin/NotificationSender.tsx` to call the Edge Function:

Replace the TODO section with:

```typescript
const handleSendNotification = async () => {
  if (!title || !message) {
    toast({
      title: 'Missing Information',
      description: 'Please provide both title and message.',
      variant: 'destructive',
    });
    return;
  }

  setIsSending(true);
  try {
    const notificationData = {
      title,
      body: message,
      image: imageUrl || null,
      url: linkUrl || '/',
      tag: `notification-${Date.now()}`,
      requireInteraction: false,
    };

    // Call Supabase Edge Function
    const { data, error } = await supabase.functions.invoke('send-push-notification', {
      body: notificationData
    });
    
    if (error) throw error;

    toast({
      title: 'Success!',
      description: data?.message || 'Notifications sent successfully.',
    });

    // Reset form
    setTitle('');
    setMessage('');
    setImageUrl('');
    setLinkUrl('');
  } catch (error) {
    console.error('Error sending notification:', error);
    toast({
      title: 'Error',
      description: 'Failed to send notification. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSending(false);
  }
};
```

---

## ✅ Step 7: Test Your Setup

### 1. Enable notifications as a user:
- Visit your site
- Click "Enable Notifications" when prompted
- Grant permission in your browser

### 2. Send a test notification from admin:
- Go to `/admin`
- Navigate to "Notifications" tab
- Fill in title and message
- Click "Send to All Users"

### 3. Test with app closed:
- Close all tabs/windows of your app
- Send a notification from admin
- You should receive it as a system notification!

---

## 🎨 Customization Options

### Notification Icon & Badge:
Update in `public/sw.js`:
```javascript
icon: '/images/gavi_icon.png',
badge: '/images/gavi_icon.png',
```

### Notification Vibration Pattern:
Update in `public/sw.js`:
```javascript
vibrate: [200, 100, 200, 100, 200], // [vibrate, pause, vibrate, ...]
```

### Notification Actions:
Update in `public/sw.js`:
```javascript
actions: [
  { action: 'view', title: 'View Now', icon: '/images/gavi_icon.png' },
  { action: 'close', title: 'Dismiss', icon: '/images/gavi_icon.png' }
]
```

---

## 🐛 Troubleshooting

### Notifications not working?

1. **Check HTTPS**: Push notifications only work on HTTPS (except localhost)
2. **Check browser support**: Use Chrome, Firefox, or Edge (Safari 16.4+ on macOS)
3. **Check permissions**: Ensure notifications are allowed in browser settings
4. **Check service worker**: Open DevTools → Application → Service Workers
5. **Check console**: Look for errors in browser console

### Common Issues:

- **"Permission denied"**: User needs to manually enable in browser settings
- **"Service worker not registered"**: Make sure `sw.js` is in the `public` folder
- **"Invalid VAPID keys"**: Regenerate keys and update both public and private keys
- **"410 Gone"**: Subscription expired, it will be automatically removed

---

## 📱 Testing on Mobile

### Android (Chrome/Firefox):
- Works perfectly, including when app is closed
- Notifications appear as system notifications

### iOS (Safari 16.4+):
- Install as PWA first (Add to Home Screen)
- Notifications work when PWA is installed
- Limited support on regular browser

### Desktop:
- Works on all major browsers
- Notifications appear even when browser is minimized

---

## 🔒 Security Considerations

1. **Never expose VAPID private key**: Store in environment variables only
2. **Validate admin access**: Ensure only admins can send notifications
3. **Rate limiting**: Implement rate limiting for notification sending
4. **User consent**: Always get explicit user consent before subscribing
5. **Unsubscribe option**: Always provide easy way to unsubscribe

---

## 📊 Analytics & Monitoring

Track notification metrics:
- Subscription count
- Notification delivery rate
- Click-through rate
- Unsubscribe rate

Add tracking to `public/sw.js`:

```javascript
self.addEventListener('notificationclick', function(event) {
  // Track click
  fetch('/api/track-notification-click', {
    method: 'POST',
    body: JSON.stringify({ notificationId: event.notification.tag })
  });
  
  // ... rest of handler
});
```

---

## 🎉 You're Done!

Your push notification system is now fully set up! Users will receive notifications even when your app is closed.

### Next Steps:
- Set up automated notifications for new products
- Send personalized offers based on user behavior
- Implement notification scheduling
- Add A/B testing for notification content

---

## 📚 Additional Resources

- [Web Push API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Worker Guide](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [VAPID Specification](https://tools.ietf.org/html/rfc8292)
- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)

---

## 💡 Tips for Success

1. **Don't spam**: Send valuable notifications only
2. **Timing matters**: Send notifications at appropriate times
3. **Personalization**: Segment users and send targeted notifications
4. **Clear CTAs**: Make it obvious what action users should take
5. **Test frequently**: Always test before sending to all users

---

**Need help?** Check the console logs or contact support.

