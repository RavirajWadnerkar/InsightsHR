import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { getDatabase } from "firebase/database";
// const {
//   initializeAppCheck,
//   ReCaptchaV3Provider,
// } = require("firebase/app-check");

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const rtdb = getDatabase(app);

// const appCheck = initializeAppCheck(app, {
//   // FIREBASE_APPCHECK_DEBUG_TOKEN: true,
//   provider: new ReCaptchaV3Provider(
//     process.env.REACT_APP_FIREBASE_APP_CHECK_TOKEN
//   ),
//   isTokenAutoRefreshEnabled: true,
// });
// Google Authentication
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("user",user);
    return user; // Resolve with the user data
  } catch (error) {
    // Log or handle the error here
    console.error("Error during Google Sign-In: ", error.message);
    throw new Error(error.message); // Rethrow the error for handling in the component
  }
};

export { db, auth, rtdb };
