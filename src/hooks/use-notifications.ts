
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { notificationService, Notification } from '@/services/notification-service';
import { useToast } from '@/hooks/use-toast';

export function useNotifications() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load notifications
  const fetchNotifications = () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const userNotifications = notificationService.getUserNotifications(user.id);
      setNotifications(userNotifications);
      
      const count = notificationService.getUnreadCount(user.id);
      setUnreadCount(count);
    } catch (err) {
      setError('Failed to fetch notifications');
      toast({
        title: 'Error',
        description: 'Could not load notifications',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    if (!user) return;
    
    try {
      const result = notificationService.markAsRead(notificationId);
      if (result) {
        // Update local state
        setNotifications(prev => 
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  };

  // Mark all as read
  const markAllAsRead = () => {
    if (!user) return;
    
    try {
      const count = notificationService.markAllAsRead(user.id);
      
      // Update local state
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
      
      if (count > 0) {
        toast({
          title: 'Success',
          description: `Marked ${count} notifications as read`,
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to mark all notifications as read',
        variant: 'destructive',
      });
    }
  };

  // Delete notification
  const deleteNotification = (notificationId: string) => {
    if (!user) return;
    
    try {
      const result = notificationService.deleteNotification(notificationId);
      if (result) {
        // Update local state
        const deletedNotification = notifications.find(n => n.id === notificationId);
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        
        // Update unread count if needed
        if (deletedNotification && !deletedNotification.read) {
          setUnreadCount(prev => prev > 0 ? prev - 1 : 0);
        }
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete notification',
        variant: 'destructive',
      });
    }
  };

  // Load notifications on component mount
  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  return {
    notifications,
    unreadCount,
    loading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
