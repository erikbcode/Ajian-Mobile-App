// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjmPaaN_M907U2nwjppXy6xd5PNqFh2AA",
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
