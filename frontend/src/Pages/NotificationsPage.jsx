import { React, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dummyNotif from '../assets/data/dummyNotif.json';
import { Bell, Route, LayoutList, Coins, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/Components/ui/card';
import { Badge } from '@/Components/ui/badge';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/Components/ui/dialog';

function NotificationsPage() {
  const [notifications, setNotifications] = useState(dummyNotif.notifications);
  console.log(notifications);

  const getIcon = (notificationType) => {
    switch (notificationType) {
      case 'Pathway':
        return <Route className="text-green-400" />;
      case 'Task':
        return <LayoutList className="text-blue-400" />;
      case 'Points':
        return <Coins className="text-yellow-400" />;
      case 'Badge':
        return <Award className="text-orange-500" />;
    }
  };

  return (
    <div className="Container w-full h-screen mx-auto">
      <Card className="w-full">
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
          <motion.CardDescription
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="text-xl ml-5 text-gray-600 dark:text-gray-400">
            Stay updated with your latest notifications and reminders.
          </motion.CardDescription>
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
                  key={notification._id}
                  className="animated-div">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card className="mb-4 relative overflow-hidden rounded-lg shadow-sm border-slate-600 border-[1px] hover:cursor-pointer hover:border-blue-500 dark:hover:border-blue-300 hover:shadow-blue-200 transition-all duration-500">
                        <CardContent className="p-4 pr-12">
                          <div className="flex flex-start gap-4">
                            {getIcon(notification.notificationReason)}
                            <div className="flex-1">
                              <h3 className="font-semibold">{notification.notificationReason}</h3>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {notification.description}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge
                                  variant="outline"
                                  className="p-2 bg-slate-100 dark:bg-slate-900">
                                  Message
                                </Badge>
                                <span className="time text-xs text-slate-500">
                                  {notification.notifSendDate}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-xs lg:max-w-4xl shadow-2xl shadow-black dark:shadow-blue-400 w-fit">
                      <DialogHeader className="flex flex-col gap-2">
                        <DialogTitle className="text-2xl flex items-center gap-2">
                          {getIcon(notification.notificationReason)}
                          {notification.notificationReason}
                        </DialogTitle>
                        <DialogDescription>{notification.description}</DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
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
