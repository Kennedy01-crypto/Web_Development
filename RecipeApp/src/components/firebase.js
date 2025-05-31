// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIbeWxgLkHORbhhyDlSkTRPm4jJOdXAx8",
  authDomain: "recipeappauth-c705f.firebaseapp.com",
  projectId: "recipeappauth-c705f",
  storageBucket: "recipeappauth-c705f.firebasestorage.app",
  messagingSenderId: "465462191295",
  appId: "1:465462191295:web:f8a8943651a05703a1920a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export default app;
export const db = getFirestore(app);
