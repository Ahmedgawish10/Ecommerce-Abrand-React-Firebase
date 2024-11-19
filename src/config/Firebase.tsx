import { initializeApp } from "firebase/app";
import { getAuth,onAuthStateChanged,signOut } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Link, useNavigate,Navigate } from 'react-router-dom';
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

export const storage = getStorage(app);


// Sign In with Google 
export const handleGoogleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const userEmail = result.user.email;
    const userId = result.user.uid;

    // Reference to the Firestore document using the user's UID as the document ID
    const userDocRef = doc(db, "users", userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (!userDocSnapshot.exists()) {
      // If the user doesn't exist, create a new document with the user's UID as the ID
      await setDoc(userDocRef, {
        provider: result.providerId,
        uid: userId,
        userName: result.user.displayName,
        email: userEmail,
        timeStamp: serverTimestamp(),
      });
    }
    localStorage.setItem("isAuthenticated", "true");
    <Navigate replace to='/'/>
  } catch (err) {
    console.error("Error during Google sign-in:", err);
  }
};
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
    if (localStorage.getItem("isAuthenticated")=="true") {      
      localStorage.removeItem("isAuthenticated")
  }
  } catch (err) {
    console.error(err);
  }
};
