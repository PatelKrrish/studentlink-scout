
import { JobOffer, User } from '@/lib/types';
import { dbUtils } from './db-utils';

// Types for notifications
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  relatedTo?: {
    type: 'job_offer' | 'profile' | 'system';
    id?: string;
  };
  read: boolean;
  createdAt: Date;
}

// Collection name
const NOTIFICATIONS_COLLECTION = 'db_notifications';

export const notificationService = {
  // Get user notifications
  getUserNotifications: (userId: string): Notification[] => {
    const notifications = dbUtils.get<Notification>(NOTIFICATIONS_COLLECTION);
    return notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  // Get unread count
  getUnreadCount: (userId: string): number => {
    const notifications = dbUtils.get<Notification>(NOTIFICATIONS_COLLECTION);
    return notifications.filter(n => n.userId === userId && !n.read).length;
  },

  // Create notification
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt'>): Notification => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    
    dbUtils.add<Notification>(NOTIFICATIONS_COLLECTION, newNotification);
    return newNotification;
  },

  // Mark as read
  markAsRead: (notificationId: string): Notification | null => {
    return dbUtils.update<Notification>(NOTIFICATIONS_COLLECTION, notificationId, { read: true });
  },

  // Mark all as read
  markAllAsRead: (userId: string): number => {
    const notifications = dbUtils.get<Notification>(NOTIFICATIONS_COLLECTION);
    let count = 0;
    
    notifications.forEach(notification => {
      if (notification.userId === userId && !notification.read) {
        dbUtils.update<Notification>(NOTIFICATIONS_COLLECTION, notification.id, { read: true });
        count++;
      }
    });
    
    return count;
  },

  // Delete notification
  deleteNotification: (notificationId: string): boolean => {
    return dbUtils.delete<Notification>(NOTIFICATIONS_COLLECTION, notificationId);
  },

  // Create job offer notification
  createJobOfferNotification: (jobOffer: JobOffer, action: 'created' | 'accepted' | 'declined'): void => {
    // Get student and recruiter info
    const student = dbUtils.getById<User>(dbUtils.collections.USERS, jobOffer.studentId);
    const recruiter = dbUtils.getById<User>(dbUtils.collections.USERS, jobOffer.recruiterId);
    
    if (!student || !recruiter) return;
    
    if (action === 'created') {
      // Notify student about new job offer
      notificationService.createNotification({
        userId: student.id,
        title: 'New Job Offer',
        message: `${recruiter.firstName} ${recruiter.lastName} from ${jobOffer.companyName || 'a company'} has sent you a job offer for ${jobOffer.position}`,
        type: 'info',
        relatedTo: {
          type: 'job_offer',
          id: jobOffer.id
        },
        read: false
      });
    } else if (action === 'accepted') {
      // Notify recruiter that offer was accepted
      notificationService.createNotification({
        userId: recruiter.id,
        title: 'Job Offer Accepted',
        message: `${student.firstName} ${student.lastName} has accepted your job offer for ${jobOffer.position}`,
        type: 'success',
        relatedTo: {
          type: 'job_offer',
          id: jobOffer.id
        },
        read: false
      });
    } else if (action === 'declined') {
      // Notify recruiter that offer was declined
      notificationService.createNotification({
        userId: recruiter.id,
        title: 'Job Offer Declined',
        message: `${student.firstName} ${student.lastName} has declined your job offer for ${jobOffer.position}`,
        type: 'warning',
        relatedTo: {
          type: 'job_offer',
          id: jobOffer.id
        },
        read: false
      });
    }
  }
};
