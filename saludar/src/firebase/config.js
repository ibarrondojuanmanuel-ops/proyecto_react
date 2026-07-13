import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAQCCrUU2FJZWK81WkviTExhTkRhcETmIU",
  authDomain: "libreriaecomerce-talentotech.firebaseapp.com",
  projectId: "libreriaecomerce-talentotech",
  storageBucket: "libreriaecomerce-talentotech.firebasestorage.app",
  messagingSenderId: "995131770566",
  appId: "1:995131770566:web:6670543e37057aaa4e79c7",
  measurementId: "G-F9ERRNNVGM"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app); 