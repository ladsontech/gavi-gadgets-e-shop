# 🚀 Push Notifications - Quick Start

Get push notifications working in 10 minutes! Follow these simple steps.

---

## ✅ What's Already Done

All the code is ready! You just need to:
1. Generate VAPID keys
2. Update one file with your public key
3. Create a database table
4. Test it!

---

## Step 1: Generate VAPID Keys (2 minutes)

### Option A: Use our script
```bash
npm install web-push
node scripts/generate-vapid-keys.js
```

### Option B: Use web-push CLI
```bash
npm install -g web-push
web-push generate-vapid-keys
```

### Option C: Online generator
Visit: https://vapidkeys.com/

**Save both keys!** You'll need them in the next steps.

---

## Step 2: Add Your Public Key (1 minute)

Open `src/utils/pushNotifications.ts` (line 3):

**Before:**
```typescript
const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE';
```

**After:**
```typescript
const VAPID_PUBLIC_KEY = 'BEl62iUYgUivxIkv69yViEuiBIa-Ib27SfdH8xzaTbLpYk3A...';
```

---

## Step 3: Create Database Table (2 minutes)

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:

```sql
CREATE TABLE push_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can manage subscriptions" ON push_subscriptions
  FOR ALL USING (true);
```

---

## Step 4: Update Push Utilities (3 minutes)

Open `src/utils/pushNotifications.ts` and find the two TODO sections:

### Replace `saveSubscriptionToBackend` function (around line 105):

```typescript
async function saveSubscriptionToBackend(subscription: PushSubscription): Promise<void> {
  try {
    const subscriptionData = JSON.parse(JSON.stringify(subscription));
    localStorage.setItem('push_subscription', JSON.stringify(subscriptionData));

    // Import supabase at the top: import { supabase } from '@/integrations/supabase/client';
    const { error } = await supabase.from('push_subscriptions').insert({
      endpoint: subscription.endpoint,
      p256dh: subscriptionData.keys.p256dh,
      auth: subscriptionData.keys.auth,
      user_agent: navigator.userAgent,
    });

    if (error) throw error;
    console.log('Subscription saved');
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
}
```

### Replace `removeSubscriptionFromBackend` function (around line 128):

```typescript
async function removeSubscriptionFromBackend(subscription: PushSubscription): Promise<void> {
  try {
    localStorage.removeItem('push_subscription');

    const { error } = await supabase
      .from('push_subscriptions')
      .delete()
      .eq('endpoint', subscription.endpoint);

    if (error) throw error;
    console.log('Subscription removed');
  } catch (error) {
    console.error('Error removing subscription:', error);
  }
}
```

### Add import at the top of the file:

```typescript
import { supabase } from '@/integrations/supabase/client';
```

---

## Step 5: Test It! (2 minutes)

### As a User:
1. Open your site
2. Look for the notification popup (appears after 3 seconds)
3. Click "Enable Notifications"
4. Grant permission when browser asks
5. You'll see a test notification!

### As an Admin:
1. Go to `/admin`
2. Click "Notifications" tab
3. Fill in:
   - Title: "Test Notification"
   - Message: "Hello from Gavi Gadgets!"
4. Click "Test" button
5. Check your notifications!

---

## 🎉 You're Done!

Notifications now work even when the app is closed!

---

## 📱 How Users Will Experience It

1. **First Visit**: They see a nice prompt asking to enable notifications
2. **One Click**: They click "Enable Notifications"
3. **Permission**: Browser asks for permission (one time)
4. **Done**: They now receive notifications even when your app is closed!

---

## 🎯 What You Can Do Now

### Send Notifications from Admin Panel:
- New product arrivals
- Special offers and discounts
- Flash sales
- Order updates
- Custom announcements

### User Can Manage:
- Visit `/settings` to enable/disable notifications
- Test notifications anytime
- Unsubscribe with one click

---

## ⚡ Advanced: Automated Notifications

Want to send notifications automatically? See `PUSH_NOTIFICATIONS_SETUP.md` for:
- Setting up Supabase Edge Functions
- Sending notifications via API
- Scheduling notifications
- Personalized notifications

---

## 🐛 Troubleshooting

**Notification prompt doesn't appear?**
- Clear localStorage: `localStorage.removeItem('notification_prompt_dismissed')`
- Refresh the page

**Can't enable notifications?**
- Make sure you're on HTTPS (or localhost)
- Check browser permissions
- Try a different browser (Chrome/Firefox work best)

**Test button doesn't work?**
- Open browser console to see errors
- Make sure you enabled notifications first
- Check if service worker is registered

---

## 🎨 Customization

Want to customize? Edit these files:
- **Notification prompt**: `src/components/NotificationPrompt.tsx`
- **Settings page**: `src/components/NotificationSettings.tsx`
- **Admin sender**: `src/components/admin/NotificationSender.tsx`
- **Service worker**: `public/sw.js`

---

## 📞 Need Help?

- Check browser console for errors
- See full guide: `PUSH_NOTIFICATIONS_SETUP.md`
- Test on different devices and browsers

---

**Happy notifying! 🎉📱**

