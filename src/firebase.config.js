
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvdfgJKAIFx2Y6CiizlZjULZLgJL8Uka4",
  authDomain: "house-marketpalce-app-32ce9.firebaseapp.com",
  projectId: "house-marketpalce-app-32ce9",
  storageBucket: "house-marketpalce-app-32ce9.appspot.com",
  messagingSenderId: "1034113157064",
  appId: "1:1034113157064:web:a945eb12a537b1402b22fd"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

 export const db = getFirestore()