// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBVaDg6hVkbYrTgX81ybB9kh6KIfppUcWY",
  authDomain: "ajian-mobile-app.firebaseapp.com",
  databaseURL: "https://ajian-mobile-app-default-rtdb.firebaseio.com",
  projectId: "ajian-mobile-app",
  storageBucket: "ajian-mobile-app.appspot.com",
  messagingSenderId: "837255087515",
  appId: "1:837255087515:web:6bb081c2c64aaea2224d3e",
  measurementId: "G-PJT3RNSX6C"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);
export const database = getDatabase(app)
