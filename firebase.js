// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXa0ACOGFjJgIzDRBKEysQi67fOvMmK2E",
  authDomain: "hs-inventory-management-app.firebaseapp.com",
  projectId: "hs-inventory-management-app",
  storageBucket: "hs-inventory-management-app.appspot.com",
  messagingSenderId: "307627287807",
  appId: "1:307627287807:web:0d77c06d898d4caf12d8ca",
  measurementId: "G-8S27628VHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export {
    app,
    firestore
}