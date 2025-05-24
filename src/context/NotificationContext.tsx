import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification } from '../types';
import { mockNotifications } from '../data/mockData';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    // In a real app, this would fetch from an API
    if (currentUser) {
      const userNotifications = mockNotifications.filter(
        n => n.userId === currentUser.id
      );
      setNotifications(userNotifications);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);

  const userNotifications = currentUser
    ? notifications.filter(n => n.userId === currentUser.id)
    : [];

  const unreadCount = userNotifications.filter(n => !n.isRead).length;

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false
    };
    
    setNotifications(prev => [...prev, newNotification]);
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    if (!currentUser) return;
    
    setNotifications(prev =>
      prev.map(notification =>
        notification.userId === currentUser.id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  return (
    <NotificationContext.Provider value={{
      notifications: userNotifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};