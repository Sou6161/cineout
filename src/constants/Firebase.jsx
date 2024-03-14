// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLAj4s5OlKkWcNO1ufFxyba1cCnu3zGB8",
  authDomain: "cineout-a02f8.firebaseapp.com",
  projectId: "cineout-a02f8",
  storageBucket: "cineout-a02f8.appspot.com",
  messagingSenderId: "38011251307",
  appId: "1:38011251307:web:175a1ad24c10ea533c1f2e",
  measurementId: "G-8PE84NZ0YH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();
