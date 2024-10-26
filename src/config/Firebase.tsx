// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId:import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId:import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// check user is loggedin
export const subscribeToAuthChanges = (setUser:any) => {
  return onAuthStateChanged(auth, (user) => {
      setUser(user);
  });
};
// logout fun
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.error(err);
  }
};