// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9LX48t95-rFV0-mFMd7gKJq96PzPUhSY",
  authDomain: "ikewa-jcwd.firebaseapp.com",
  projectId: "ikewa-jcwd",
  storageBucket: "ikewa-jcwd.appspot.com",
  messagingSenderId: "860530921507",
  appId: "1:860530921507:web:c3805bb142c4e8edc52196",
  measurementId: "G-7M8XNLZEYB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);