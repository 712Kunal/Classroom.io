import { updatePassword } from 'firebase/auth';
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
  limit,
  Timestamp
} from 'firebase/firestore';
import { getUserProfileByUserId, updateUserProfile } from './userDetails.servies';

const verifyOtp = async (userId, otp) => {
  try {
    const userProfile = await getUserProfileByUserId(userId);
    if(!userProfile) {
      throw new Error('User profile not found');
    }

    let expiry;
    if(userProfile.verificationData.expirationTime instanceof Timestamp) {
      expiry = userProfile.verificationData.expirationTime.toDate();
    } else {
      expiry = userProfile.verificationData.expirationTime;
    }

    if(!(expiry instanceof Date)) throw new Error('Expiration time is not a Date object');

    if(expiry.getTime() < Date.now()) {
      console.error('Verification code expired');
    }


    
    if(userProfile.verificationData.verificationCode !== otp) {
      throw new Error('Verification code mismatch');
    }

    await updateUserProfile(userId, {
      verificationData: {
        verificationCode: null,
        verificationDate: null,
      }
    });
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export { verifyOtp };
