// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA42u6J-3etU7pHjpwHv-8kk2J_NF5VvY0",
  authDomain: "scarlet-exchange-d5840.firebaseapp.com",
  projectId: "scarlet-exchange-d5840",
  storageBucket: "scarlet-exchange-d5840.appspot.com",
  messagingSenderId: "387505351299",
  appId: "1:387505351299:web:a04ae9ef1ba1a03b6809b6",
  measurementId: "G-6FL11RB9X6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fdb = getFirestore(app);