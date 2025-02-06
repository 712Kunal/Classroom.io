import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where } from 'firebase/firestore'; 

const pathwaysCollectionRef = collection(db, 'pathways');

/** adds pathway to db (userId, pathwayData Obj) */
export const addPathway = async (userId, pathwayData) => {
  try {
    // add doc as pathway in pathways collection
    // inject createdAt, modifiedAt
    // returns id of the doc

    const docRef = await addDoc(pathwaysCollectionRef, {
      ...pathwayData,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error adding pathway:', error);
    throw error;
  }
};

/** get a single pathway from DB (pathwayId) */
export const getSinglePathway = async (pathwayId) => {
  try {
    const docRef = doc(pathwaysCollectionRef, pathwayId);
    const pathway = await getDoc(docRef);
    if (pathway.exists()) {
      return { id: pathway.id, ...pathway.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting pathway:', error);
    throw error;
  }
};

/** get the active pathway of the user */
export const getActivePathwayOfUser = async (userId) => {
  try {
    const q = query(pathwaysCollectionRef, where("userId", "==", userId), where("isActive", "==", true));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length == 0) {
      throw new Error("No active pathway found");
    }

    if (querySnapshot.docs.length > 1) {
      throw new Error("User has multiple active pathways.");
    }

    return {
      id: querySnapshot.docs[0].id,
      ...querySnapshot.docs[0].data()
    }
  } catch (error) {
    console.error("Error getting user's current active pathway:", error);
    throw error;
  }
}

/** get all pathways of specified User from DB (userId) */
export const getAllPathwaysOfUser = async (userId) => {
  try {
    const q = query(pathwaysCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user pathways of User:', error);
    throw error;
  }
};

/** get non active pathways of user (userId) */
export const getNonActivePathwaysOnlyOfUser = async (userId) => {
  try {
    const q = query(
      pathwaysCollectionRef,
      where("userId", "==", userId),
      where("isActive", "==", false)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error getting user's non active pathways of User:", error);
    throw error;
  }
};

/** delete single specified user's pathway (userId, pathwayId) */
export const deletePathwayOfUser = async (userId, pathwayId) => {
  try {
    const q = query(
      pathwaysCollectionRef,
      where("userId", "==", userId),
      where("id", "==", pathwayId)
    );
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length == 0) {
      throw new Error("No pathway found");
    }

    if (querySnapshot.docs.length > 1) {
      throw new Error("Multiple pathways found.");
    }

    const docRef = doc(pathwaysCollectionRef, pathwayId);

    await deleteDoc(docRef);

  } catch (error) {
    console.error('Error deleting pathway:', error);
    throw error;
  }
};

/** update Pathway (pathwayId, updates) */
export const updatePathway = async (pathwayId, updates) => {
  try {
    const docRef = doc(pathwaysCollectionRef, pathwayId);
    const updatedPathway = await updateDoc(
      docRef,
      {
        updates,
        modifiedAt: serverTimestamp()
      }
    );

    return {
      id: updatePathway.id,
      ...updatedPathway.data()
    };
  } catch (error) {
    console.error("Error updating pathway:", error);
    throw error;
  }
};