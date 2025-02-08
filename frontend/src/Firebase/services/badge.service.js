import { db } from '../firebase';
import { setDoc, collection, deleteDoc, doc, getDoc, getDocs, query, serverTimestamp, updateDoc, where, addDoc } from 'firebase/firestore';

const badgesCollectionRef = collection(db, 'badges');

const badgeTypeToBadge = {
  "learner": {
    "name": "Learner",
    "description": "You have successfully started your journey with pathify.",
    "badgePNG": "/assets/images/badges/learner.png"
  },
  "verified": {
    "name": "Verified",
    "description": "You have successfully verified your email address.",
    "badgePNG": "/assets/images/badges/verified.png"
  },
  "first_pathway": {
    "name": "Believer",
    "description": "You have successfully created your first pathway.",
    "badgePNG": "/assets/images/badges/believer.png"
  },
  "one_task": {
    "name": "Newbie",
    "description": "You have completed one task on our platform.",
    "badgePNG": "/assets/images/badges/newbie.png"
  },
  "ten_tasks": {
    "name": "Apprentice",
    "description": "You have completed ten tasks on our platform.",
    "badgePNG": "/assets/images/badges/apprentice.png"
  },
  "fifteen_tasks": {
    "name": "Master",
    "description": "You have completed ten tasks on our platform.",
    "badgePNG": "/assets/images/badges/Master.png"
  },
  "one_pathway": {
    "name": "Legend",
    "description": "You have completed one pathway on our platform.",
    "badgePNG": "/assets/images/badges/Legend.png"
  },
  "five_pathways": {
    "name": "Supreme",
    "description": "You have completed ten pathways on our platform.",
    "badgePNG": "/assets/images/badges/Supreme.png"
  },
  "never_late": {
    "name": "Never Late",
    "description": "You have never missed a deadline on our platform till date.",
    "badgePNG": "/assets/images/badges/NeverLate.png"
  }
}

/** adds pathway to db (pathwayData Obj) */
export const awardBadge = async (userId, badgeType) => {
  try {
    const badge = badgeTypeToBadge[badgeType];
    console.log(badgeType)
    await addDoc(doc(badgesCollectionRef), {
      ...badge,
      userId: userId,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error awarding user badge:', error);
    throw error;
  }
};

/** get all pathways of specified User from DB (userId) */
export const getAllBadgesOfUser = async (userId) => {
  try {
    const q = query(badgesCollectionRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting user badges of User:', error);
    throw error;
  }
};