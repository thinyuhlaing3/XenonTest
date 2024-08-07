// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC0xwEgQHhI0EzJ8fwneAAL4q3Fp-Cf3o",
  authDomain: "xenon-9f492.firebaseapp.com",
  projectId: "xenon-9f492",
  storageBucket: "xenon-9f492.appspot.com",
  messagingSenderId: "593204269431",
  appId: "1:593204269431:web:8c07905e87c861f4401172",
  measurementId: "G-5B5V0QW756"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);