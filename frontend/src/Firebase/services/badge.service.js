import { db } from '../firebase';
import { setDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, addDoc } from 'firebase/firestore';

const badgeTypeToBadge = {
  "learner": {
    "name": "Learner",
    "description": "You have successfully started your journey with pathify.",
    "badgePNG": "learner.png",
    "badgeType": "learner"
  },
  "verified": {
    "name": "Verified",
    "description": "You have successfully verified your email address.",
    "badgePNG": "verified.png",
    "badgeType": "verified"
  },
  "first_pathway": {
    "name": "Believer",
    "description": "You have successfully created your first pathway.",
    "badgePNG": "believer.png",
    "badgeType": "first_pathway"
  },
  "one_task": {
    "name": "Newbie",
    "description": "You have completed one task on our platform.",
    "badgePNG": "newbie.png",
    "badgeType": "one_task"
  },
  "ten_tasks": {
    "name": "Apprentice",
    "description": "You have completed ten tasks on our platform.",
    "badgePNG": "apprentice.png",
    "badgeType": "ten_tasks"
  },
  "fifteen_tasks": {
    "name": "Master",
    "description": "You have completed ten tasks on our platform.",
    "badgePNG": "Master.png",
    "badgeType": "fifteen_tasks"
  },
  "one_pathway": {
    "name": "Legend",
    "description": "You have completed one pathway on our platform.",
    "badgePNG": "Legend.png",
    "badgeType": "one_pathway"
  },
  "five_pathways": {
    "name": "Supreme",
    "description": "You have completed ten pathways on our platform.",
    "badgePNG": "Supreme.png",
    "badgeType": "five_pathways"
  },
  "never_late": {
    "name": "Never Late",
    "description": "You have never missed a deadline on our platform till date.",
    "badgePNG": "Punctual.png",
    "badgeType": "never_late"
  }
};

/** adds badge to db (badgeType string, userId string) */
export const awardBadge = async (userId, badgeType) => {
  try {
    const badge = badgeTypeToBadge[badgeType];
    console.log(badgeType);
    // Fixed: Use collection() instead of doc() when adding a new document
    await addDoc(collection(db, 'badges'), {
      ...badge,
      userId: userId,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error awarding user badge:', error);
    throw error;
  }
};

/** get all badges of specified User from DB (userId string) */
export const getAllBadgesOfUser = async (userId) => {
  try {
    const q = query(collection(db, 'badges'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user badges of User:', error);
    throw error;
  }
};

/** check if badge of specified type is present for user (userId string, badgeType string) */
export const checkIfBadgeIsPresent = async (userId, badgeType) => {
  try {
    const q = query(collection(db, 'badges'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.some((doc) => doc.data().badgeType === badgeType);
  } catch (error) {
    console.error('Error checking if badge is present:', error);
    throw error;
  }
};