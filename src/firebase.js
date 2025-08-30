import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence, GoogleAuthProvider, OAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCu4WXLO_RI3RW-rNfJC3QMd3rpRL09mY8",
  authDomain: "campushub-app.firebaseapp.com",
  projectId: "campushub-app",
  storageBucket: "campushub-app.appspot.com", // fixed
  messagingSenderId: "963121044836",
  appId: "1:963121044836:web:57b9eb08d9004d922aee71",
  measurementId: "G-8JBP3P6BED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth instance
const auth = getAuth(app);

// Set persistence
setPersistence(auth, browserLocalPersistence).catch(err => console.error(err));

// Providers
const googleProvider = new GoogleAuthProvider();
const appleProvider = new OAuthProvider("apple.com");

// ✅ Export all together
export { auth, googleProvider, appleProvider };
