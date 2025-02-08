import { db } from '../firebase';
import {
  doc,
  setDoc,
  collection,
  getDoc,
  updateDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
  orderBy,
  limit
} from 'firebase/firestore';

const verifyOtp = async (userId, otp) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user found');
    }

    const userOTPCollectionRef = collection(db, 'userEmailVerification');
    const q = query(
      userOTPCollectionRef,
      where('userId', '==', userId),
      where('verificationCode', '==', otp),
      where('expiredAt', '>', serverTimestamp()),
      orderBy('createdAt', 'desc'),
      limit(1)
    );

    // Get that document
    const querySnapshot = await getDocs(q);
    await deleteDoc(querySnapshot.docs[0]);

    if (querySnapshot.empty) {
      throw new Error('OTP not found');
    }

    if (querySnapshot) {
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export { verifyOtp };
