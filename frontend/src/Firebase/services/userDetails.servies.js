import { db } from '../firebase';
import { doc, addDoc, collection } from 'firebase/firestore';
import { auth } from '../firebase';

/* 
COMMENT BY Vighnesh
"profiles" name for collection
hence addProfile, updateProfile, getProfile, etc
*/

const addUserDetails = async (userDetails) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error('No user found');
    }

    // Get the related user document reference
    const userDetailsRef = doc(db, 'Users', user.uid);
    
    const docRef = await addDoc(collection(db, 'UserDetails'), {
      ...userDetails,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error adding user details:', error);
    throw error;
  }
};

export default addUserDetails;
