import { db } from '../firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { auth } from '../firebase';

/* 
COMMENT BY Vighnesh
"profiles" name for collection
hence addProfile, updateProfile, getProfile, etc
*/

const addProfile = async (userDetails, userId) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No user found');
    }
    // Reference to the user profile document using userId
    const userProfileRef = doc(db, 'UserProfiles', userId);

    // Save the user profile data, including nested personalInfo, socialLinks, and background
    await setDoc(userProfileRef, {
      userId: userId,
      personalInfo: userDetails.personalInfo,
      socialLinks: userDetails.socialLinks,
      background: userDetails.background,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true };
  } catch (error) {
    console.error('Error adding user details:', error);
    throw error;
  }
};


export default addProfile;
