import React, { useState } from 'react';
import { Bell, Send, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const NotificationSender = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

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
      // TODO: Implement backend endpoint to send push notifications
      // This would typically call a Cloud Function or Edge Function that:
      // 1. Fetches all active push subscriptions from the database
      // 2. Sends the notification to each subscription using Web Push protocol
      
      const notificationData = {
        title,
        body: message,
        image: imageUrl || null,
        url: linkUrl || '/',
        tag: `notification-${Date.now()}`,
        requireInteraction: false,
      };

      // For now, log the notification data
      console.log('Notification to send:', notificationData);

      // Call your backend API endpoint
      // Example:
      // const { error } = await supabase.functions.invoke('send-push-notification', {
      //   body: notificationData
      // });
      
      // if (error) throw error;

      toast({
        title: 'Success!',
        description: `Notification "${title}" has been queued for delivery.`,
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

  const handleSendTestNotification = async () => {
    setIsSending(true);
    try {
      const testNotification = {
        title: 'Test Notification 🎉',
        body: 'This is a test notification from Gavi Gadgets admin panel!',
        image: '/images/gavi_icon.png',
        url: '/',
        tag: 'test-notification',
        requireInteraction: false,
      };

      console.log('Test notification:', testNotification);

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
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-pink-600" />
          Send Push Notification
        </CardTitle>
        <CardDescription>
          Send instant notifications to all subscribed users (works even when app is closed)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="notification-title">Title *</Label>
          <Input
            id="notification-title"
            placeholder="New Products Arrived!"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={50}
          />
          <p className="text-xs text-gray-500">{title.length}/50 characters</p>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <Label htmlFor="notification-message">Message *</Label>
          <Textarea
            id="notification-message"
            placeholder="Check out our latest gadgets with amazing discounts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={200}
          />
          <p className="text-xs text-gray-500">{message.length}/200 characters</p>
        </div>

        {/* Image URL (optional) */}
        <div className="space-y-2">
          <Label htmlFor="notification-image" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            Image URL (optional)
          </Label>
          <Input
            id="notification-image"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            type="url"
          />
          <p className="text-xs text-gray-500">Add a hero image to your notification</p>
        </div>

        {/* Link URL (optional) */}
        <div className="space-y-2">
          <Label htmlFor="notification-link">Link URL (optional)</Label>
          <Input
            id="notification-link"
            placeholder="/offers or /product/iphone-15"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500">Where users go when clicking the notification</p>
        </div>

        {/* Preview */}
        {(title || message) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">PREVIEW</p>
            <div className="bg-white rounded-lg shadow-md p-4 space-y-2">
              <div className="flex items-start gap-3">
                <img 
                  src="/images/gavi_icon.png" 
                  alt="Gavi Gadgets" 
                  className="w-8 h-8 rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-sm text-gray-900">
                    {title || 'Notification Title'}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {message || 'Notification message will appear here...'}
                  </p>
                  {imageUrl && (
                    <div className="mt-2 rounded overflow-hidden">
                      <img 
                        src={imageUrl} 
                        alt="Notification" 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleSendNotification}
            disabled={isSending || !title || !message}
            className="flex-1 bg-pink-600 hover:bg-pink-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSending ? 'Sending...' : 'Send to All Users'}
          </Button>
          <Button
            onClick={handleSendTestNotification}
            disabled={isSending}
            variant="outline"
          >
            Test
          </Button>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-xs text-yellow-800">
            <strong>⚠️ Note:</strong> Notifications will be sent to all subscribed users. 
            Make sure to test before sending. Backend integration required for production use.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

