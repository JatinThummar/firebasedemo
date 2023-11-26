// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArGNGsRmv_c9o15LXKhZIeJrpi-ibjLP8",
  authDomain: "tododemo-f11b7.firebaseapp.com",
  projectId: "tododemo-f11b7",
  storageBucket: "tododemo-f11b7.appspot.com",
  messagingSenderId: "273815994847",
  appId: "1:273815994847:web:af810b60d8d6a4a009846a",
  measurementId: "G-MH3L1455TF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
