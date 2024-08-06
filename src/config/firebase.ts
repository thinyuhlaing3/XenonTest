// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  appId: "1:593204269431:web:4ec7de56b9a8a67f401172",
  measurementId: "G-DPHL2MQ0K7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);