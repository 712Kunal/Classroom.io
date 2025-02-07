import { db } from '../firebase';
import { doc, setDoc, collection, getDoc, updateDoc, query, where, serverTimestamp } from 'firebase/firestore';
import { auth } from '../firebase';

const addProfile = async (userDetails, userId) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user found');
    }

    
    const userProfileRef = doc(db, 'UserProfiles', userId); 


    await setDoc(userProfileRef, {
      userId: userId,
      ...userDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, docRef: userProfileRef };
  } catch (error) {
    console.error('Error adding user details:', error);
    throw error;
  }
};

const getUserProfileByUserId = async (userId) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user found');
    }

    const userDetailsCollectionRef = collection(db, 'UserProfiles');
    const userProfile = await getDoc(doc(userDetailsCollectionRef, userId));

    if (userProfile) {
      return { id: userProfile.id, ...userProfile.data() };
    } else {
      throw new Error('User details not found');
    }
  } catch (error) {
    console.error('Error getting user details:', error);
    throw error;
  }
};

const updateUserProfile = async (userId, updates) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user found');
    }

    const userDetailsCollectionRef = collection(db, 'UserProfiles');
    const q = query(userDetailsCollectionRef, where("userId", "==", userId));
    const userDetails = await getDoc(q);
    if (userDetails) {
      const docRef = doc(userDetailsCollectionRef, userDetails.id);
      const updatedUserDetails = await updateDoc(
        docRef,
        {
          updates,
          modifiedAt: serverTimestamp()
        }
      );

      return {
        id: updatedUserDetails.id,
        ...updatedUserDetails.data()
      };
    } else {
      throw new Error('User details not found');
    }
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
};

export { addProfile, getUserProfileByUserId, updateUserProfile };
