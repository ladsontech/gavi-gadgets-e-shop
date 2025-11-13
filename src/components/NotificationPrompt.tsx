import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  subscribeToPushNotifications,
  requestNotificationPermission
} from '@/utils/pushNotifications';

export const NotificationPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if we should show the prompt
    const checkShouldShowPrompt = async () => {
      // Don't show if already dismissed
      const dismissed = localStorage.getItem('notification_prompt_dismissed');
      if (dismissed) return;

      // Don't show if notification API not supported
      if (!('Notification' in window) || !('serviceWorker' in navigator)) return;

      // Don't show if already granted or denied
      if (Notification.permission !== 'default') return;

      // Show prompt after 3 seconds
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    checkShouldShowPrompt();
  }, []);

  const handleEnable = async () => {
    setIsLoading(true);
    try {
      const permission = await requestNotificationPermission();

      if (permission === 'granted') {
        await subscribeToPushNotifications();
        setShowPrompt(false);
      } else {
        // User denied, don't show again
        localStorage.setItem('notification_prompt_dismissed', 'true');
        setShowPrompt(false);
      }
    } catch (error) {
      console.error('Error enabling notifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('notification_prompt_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
        <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 p-4 text-white">
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Stay Updated!</h3>
              <p className="text-sm text-white/90">
                Get instant notifications about new products, special offers, and exclusive deals.
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-pink-600">✓</span>
              <span>New arrivals alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-600">✓</span>
              <span>Flash sale notifications</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-pink-600">✓</span>
              <span>Works even when app is closed</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleEnable}
              disabled={isLoading}
              className="flex-1 bg-pink-600 hover:bg-pink-700"
            >
              {isLoading ? 'Enabling...' : 'Enable Notifications'}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              className="flex-shrink-0"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

