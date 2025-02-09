import { Timestamp } from 'firebase/firestore';
import { getUserProfileByUserId, updateUserProfile } from './userDetails.servies';

const verifyOtp = async (userId, otp) => {
  try {
    // 🔹 Retrieve user profile
    const userProfile = await getUserProfileByUserId(userId);
    if (!userProfile) {
      throw new Error('User profile not found');
    }

    // 🔹 Check if verificationData exists
    const verificationData = userProfile.verificationData;
    if (!verificationData) {
      throw new Error('No verification data found');
    }

    // 🔹 Convert expirationTime properly
    let expiry;
    if (verificationData.expirationTime instanceof Timestamp) {
      expiry = verificationData.expirationTime.toDate();
    } else {
      expiry = new Date(verificationData.expirationTime);
    }

    // 🔹 Ensure expirationTime is a Date object
    if (!(expiry instanceof Date)) {
      throw new Error('Expiration time is not a Date object');
    }

    // 🔹 Check if the OTP has expired
    if (expiry.getTime() < Date.now()) {
      throw new Error('Verification code expired');
    }

    console.log('Verification code from db:', verificationData.verificationCode);
    console.log('Code from frontend', otp);
    if (otp == verificationData.verificationCode) {
      console.log('Verified');
    } else {
      throw new Error('Verification code mismatch');
    }
    // await updateUserProfile(userId, {
    //   verificationData: {
    //     verificationCode: null,
    //     expirationTime: null
    //   }
    // });

    console.log('OTP verified successfully');
    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export { verifyOtp };
