import { db } from '../firebase';
import { doc, addDoc, collection } from 'firebase/firestore';
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

    const userDetailsRef = doc(db, 'Users', user.uid);

    const docRef = await addDoc(collection(db, 'UserProfiles'), {
      userId: userId,
      ...userDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return { success: true, docRef };
  } catch (error) {
    console.error('Error adding user details:', error);
    throw error;
  }
};

export default addProfile;
