import { React, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Route, LayoutList, Coins, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
  getNotifications,
  markNotificationAsRead
} from '../Firebase/services/notifications.service';
import { auth } from '@/Firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // useEffect to fetch all the notifications
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('user', user);
        const userId = auth.currentUser.uid;

        const fetchNotifications = async () => {
          const usersNotifications = await getNotifications(userId);
          console.log(usersNotifications);
          setNotifications(usersNotifications);
        };

        fetchNotifications();
      } else {
        navigate('/login');
        console.log('no user');
      }
    });
  }, []);

  useEffect(() => {
    // Find out all the unread notifications
    const unreadNotifications = notifications.filter((notification) => !notification.isRead);

    const timeOutId = setTimeout(() => {
      unreadNotifications.forEach(async (notification) => {
        await markNotificationAsRead(notification.id);
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notification.id ? { ...notification, isRead: true } : notification
          )
        );
      });
    }, 2000);

    return () => clearTimeout(timeOutId);
  }, [notifications]);

  const relativeTimeFormat = (date) => {
    let sendDate = date;
    if (sendDate instanceof Timestamp) {
      sendDate = sendDate.toDate();
    }

    const now = new Date();
    // The `Math.floor()` function in JavaScript is used to round down a number to the nearest integer
    const differenceInSeconds = Math.floor((now.getTime() - sendDate.getTime()) / 1000);

    // if difference is less than 60 seconds, return 'Just now'
    if (differenceInSeconds < 60) {
      return 'Just now';
    } else if (differenceInSeconds < 3600) {
      // if difference is less than 1 hour, return minutes
      return `${Math.floor(differenceInSeconds / 60)} minutes ago`;
    } else if (differenceInSeconds < 86400) {
      // if difference is less than 1 day, return hours
      return `${Math.floor(differenceInSeconds / 3600)} hours ago`;
    } else if (differenceInSeconds < 604800) {
      // if difference is less than 1 week, return days
      return `${Math.floor(differenceInSeconds / 86400)} days ago`;
    } else if (differenceInSeconds < 2592000) {
      // if difference is less than 3 months, return weeks
      return `${Math.floor(differenceInSeconds / 604800)} weeks ago`;
    } else if (differenceInSeconds < 31536000) {
      // if difference is less than 6 months, return months
      return `${Math.floor(differenceInSeconds / 2592000)} months ago`;
    } else {
      // if difference is more than 6 months, return years
      return `${Math.floor(differenceInSeconds / 31536000)} years ago`;
    }
  };

  const getIcon = (notificationType) => {
    switch (notificationType) {
      case 'PATHWAY':
        return <Route className="text-green-400" />;
      case 'TASK':
        return <LayoutList className="text-blue-400" />;
      case 'POINTS':
        return <Coins className="text-yellow-400" />;
      case 'BADGE':
        return <Award className="text-orange-500" />;
    }
  };

  return (
    <div className="Container w-full h-screen mx-auto">
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0, scale: 1 }}
              animate={{ rotate: [0, 10, -10, 10, -10, 0], scale: [1, 0.8, 1, 0.8, 1, 1] }}
              transition={{ duration: 1, ease: 'easeInOut' }}>
              <Bell size={34} className="text-black dark:text-blue-500" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}>
              Notifications
            </motion.div>
          </CardTitle>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="text-xl ml-5 text-gray-600 dark:text-gray-400">
            Stay updated with your latest notifications and reminders.
          </motion.div>
        </CardHeader>

        <CardContent className="p-4">
          <AnimatePresence>
            {notifications.map((notification) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.8 }}
                  key={notification.id}
                  className="animated-div">
                  <Card
                    className={`mb-4 relative overflow-hidden ${
                      notification.isRead ? null : 'bg-slate-200 dark:bg-slate-900'
                    } rounded-lg shadow-sm border-slate-600 border-[1px] hover:cursor-pointer hover:border-blue-500 dark:hover:border-blue-300 hover:shadow-blue-200 transition-all duration-500`}>
                    <CardContent className="p-4 pr-12">
                      <div className="flex flex-start gap-4">
                        {getIcon(notification.notificationReason)}
                        <div className="flex-1">
                          <h3 className="font-semibold">{notification.notificationReason}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {notification.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="p-2 bg-slate-100 dark:bg-slate-900">
                              Message
                            </Badge>
                            <span className="time text-xs text-slate-500">
                              {relativeTimeFormat(notification.notificationSendDate)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotificationsPage;
