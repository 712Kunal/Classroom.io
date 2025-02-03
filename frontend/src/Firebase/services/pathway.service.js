import { db } from '../firebase';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';

// save pathway to database
export const addTrip = async (userId, pathwayData) => {
  try {
    const docRef = await addDoc(collection(db, 'pathways'), {
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
// get single pathway from database
export const getSinglePathway = async (pathwayId) => {
  try {
    const pathwayDoc = await getDoc(doc(db, 'pathways', pathwayId));
    if (pathwayDoc.exists()) {
      return { id: pathwayDoc.id, ...pathwayDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting pathway:', error);
    throw error;
  }
};
// get all pathways of User from database
export const getAllPathwaysOfUser = async (userId) => {
  try {
    // const q = query(collection(db, 'users', userId, 'trips'));
    // const querySnapshot = await getDocs(q);
    // return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user pathways of User:', error);
    throw error;
  }
};
// Update a pathway
export const updatePathway = async (userId, pathwayId, updates) => {
  try {
    await updateDoc(doc(db, 'pathways', pathwayId), updates);
  } catch (error) {
    console.error('Error updating pathway:', error);
    throw error;
  }
};
// Delete a pathway
export const deletePathway = async (userId, pathwayId) => {
  try {
    await deleteDoc(doc(db, 'pathways', pathwayId));
  } catch (error) {
    console.error('Error deleting pathway:', error);
    throw error;
  }
};