import { Timestamp } from 'firebase/firestore';
import { getUserProfileByUserId, updateUserProfile } from './userDetails.servies';
import { toast } from 'react-hot-toast';  

const verifyOtp = async (userId, otp) => {
  try {
    const userProfile = await getUserProfileByUserId(userId);
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    const verificationData = userProfile.verificationData;
    if (!verificationData) {
      throw new Error('No verification data found');
    }

    let expiry;
    if (verificationData.expirationTime instanceof Timestamp) {
      expiry = verificationData.expirationTime.toDate();
    } else {
      expiry = new Date(verificationData.expirationTime);
    }

    if (!(expiry instanceof Date)) {
      throw new Error('Expiration time is not a Date object');
    }

    if (expiry.getTime() < Date.now()) {
      await updateUserProfile(userId, {
        verificationData: {
          verificationCode: null,
          expirationTime: null
        }
      });
      
      toast.error('Verification code expired'); 
      throw new Error('Verification code expired');
    }

    console.log('Verification code from db:', verificationData.verificationCode);
    console.log('Code from frontend:', otp);

    if (otp.toString().trim() === verificationData.verificationCode.toString().trim()) {
      await updateUserProfile(userId, {
        verificationData: {
          verificationCode: null,
          expirationTime: null
        }
      });

      toast.success('OTP verified successfully');  
      console.log('Verified');
      return true;
    } else {
      toast.error('Incorrect verification code');  
      throw new Error('Verification code mismatch');
    }

  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export { verifyOtp };
