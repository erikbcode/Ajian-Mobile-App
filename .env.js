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
  FIREBASE_API_KEY="AIzaSyBjmPaaN_M907U2nwjppXy6xd5PNqFh2AA"
  FIREBASE_AUTH_DOMAIN="ajian-mobile-app.firebaseapp.com"
  FIREBASE_DATABASE_URL="https://ajian-mobile-app-default-rtdb.firebaseio.com/"
  FIREBASE_PROJECT_ID="ajian-mobile-app"
  FIREBASE_STORAGE_BUCKET="ajian-mobile-app.appspot.com"
  FIREBASE_MESSAGE_SENDER_ID="837255087515"
  FIREBASE_APP_ID="1:837255087515:web:6bb081c2c64aaea2224d3e"
  FIREBASE_MEASUREMENT_ID="G-PJT3RNSX6C"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app);
export const database = getDatabase(app)
