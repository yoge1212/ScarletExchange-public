// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA4UNjwCpfjDaLaolK9D3gIIqfId9h7-cY",
    authDomain: "scarlet-exchange.firebaseapp.com",
    projectId: "scarlet-exchange",
    storageBucket: "scarlet-exchange.appspot.com",
    messagingSenderId: "38312682782",
    appId: "1:38312682782:web:ac45374d68051bfdb4d50f",
    measurementId: "G-TW8B8WFTXX"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fdb = getFirestore(app);