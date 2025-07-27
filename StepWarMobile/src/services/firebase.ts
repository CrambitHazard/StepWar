import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  addDoc, 
  updateDoc 
} from 'firebase/firestore';

// Firebase configuration
// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Authentication functions
export const signInAnonymouslyUser = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    throw error;
  }
};

export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions
export const createUserProfile = async (userId: string, userData: any) => {
  try {
    await setDoc(doc(db, 'users', userId), userData);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (userId: string, userData: any) => {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, userData);
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Leagues functions
export const createLeague = async (leagueData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'leagues'), leagueData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating league:', error);
    throw error;
  }
};

export const getLeague = async (leagueId: string) => {
  try {
    const docRef = doc(db, 'leagues', leagueId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting league:', error);
    throw error;
  }
};

// Battles functions
export const createBattle = async (battleData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'battles'), battleData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating battle:', error);
    throw error;
  }
};

export const getBattle = async (battleId: string) => {
  try {
    const docRef = doc(db, 'battles', battleId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting battle:', error);
    throw error;
  }
};

// Challenges functions
export const createChallenge = async (challengeData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'challenges'), challengeData);
    return docRef.id;
  } catch (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }
};

export const getChallenge = async (challengeId: string) => {
  try {
    const docRef = doc(db, 'challenges', challengeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting challenge:', error);
    throw error;
  }
};

export { auth, db }; 