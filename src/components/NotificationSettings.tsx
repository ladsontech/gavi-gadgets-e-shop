import React, { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  subscribeToPushNotifications,
  unsubscribeFromPushNotifications,
  isPushNotificationSubscribed,
  sendTestNotification,
  requestNotificationPermission
} from '@/utils/pushNotifications';
import { useToast } from '@/components/ui/use-toast';

export const NotificationSettings = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();

  useEffect(() => {
    checkSubscriptionStatus();
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const checkSubscriptionStatus = async () => {
    const subscribed = await isPushNotificationSubscribed();
    setIsSubscribed(subscribed);
  };

  const handleEnableNotifications = async () => {
    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();
      setPermission(permission);

      if (permission === 'granted') {
        const subscription = await subscribeToPushNotifications();
        
        if (subscription) {
          setIsSubscribed(true);
          toast({
            title: 'Notifications Enabled!',
            description: 'You will now receive updates even when the app is closed.',
          });
          
          // Send test notification
          setTimeout(() => {
            sendTestNotification();
          }, 1000);
        } else {
          toast({
            title: 'Failed to enable notifications',
            description: 'Please try again later.',
            variant: 'destructive',
          });
        }
      } else {
        toast({
          title: 'Permission Denied',
          description: 'Please enable notifications in your browser settings.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to enable notifications.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisableNotifications = async () => {
    setIsLoading(true);
    try {
      const success = await unsubscribeFromPushNotifications();
      
      if (success) {
        setIsSubscribed(false);
        toast({
          title: 'Notifications Disabled',
          description: 'You will no longer receive push notifications.',
        });
      }
    } catch (error) {
      console.error('Error disabling notifications:', error);
      toast({
        title: 'Error',
        description: 'Failed to disable notifications.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();
      toast({
        title: 'Test Notification Sent',
        description: 'Check your notifications!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send test notification.',
        variant: 'destructive',
      });
    }
  };

  if (!('Notification' in window) || !('serviceWorker' in navigator)) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellOff className="w-5 h-5" />
            Notifications Not Supported
          </CardTitle>
          <CardDescription>
            Your browser doesn't support push notifications.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isSubscribed ? (
            <Bell className="w-5 h-5 text-green-600" />
          ) : (
            <BellOff className="w-5 h-5 text-gray-400" />
          )}
          Push Notifications
        </CardTitle>
        <CardDescription>
          {isSubscribed
            ? 'You will receive notifications even when the app is closed'
            : 'Stay updated with new products and special offers'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-2">
          {permission === 'denied' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-2">
              <p className="text-sm text-red-800">
                Notifications are blocked. Please enable them in your browser settings.
              </p>
            </div>
          )}

          {isSubscribed ? (
            <>
              <Button
                variant="outline"
                onClick={handleDisableNotifications}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Processing...' : 'Disable Notifications'}
              </Button>
              <Button
                variant="secondary"
                onClick={handleTestNotification}
                className="w-full"
              >
                Send Test Notification
              </Button>
            </>
          ) : (
            <Button
              onClick={handleEnableNotifications}
              disabled={isLoading || permission === 'denied'}
              className="w-full bg-pink-600 hover:bg-pink-700"
            >
              {isLoading ? 'Enabling...' : 'Enable Notifications'}
            </Button>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            <strong>Benefits:</strong>
            <br />
            • Get notified about new products
            <br />
            • Receive exclusive discount alerts
            <br />
            • Order status updates
            <br />• Works even when the app is closed
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

