import { db } from '../firebase.js';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export const getNotifications = async (userId) => {
  try {
    const notificationsCollectionRef = collection(db, 'notifications');
    const notificationsQuery = query(notificationsCollectionRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(notificationsQuery);
    const notifications = [];

    querySnapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });

    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const markNotificationAsRead = async (notifId) => {
  try {
    const notificationRef = doc(db, 'notifications', notifId);
    await updateDoc(notificationRef, { isRead: true });
    console.log('Notification marked as read');
  } catch (error) {
    console.error('Error updating notifications:', error);
  }
};
