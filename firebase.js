import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const Config = {
  apiKey: "AIzaSyDRg8PPWgpTGdtnjb4AihBJUaOKcytS1aw",
  authDomain: "mycoach-9ddff.firebaseapp.com",
  projectId: "mycoach-9ddff",
  storageBucket: "mycoach-9ddff.appspot.com",
  messagingSenderId: "268589392283",
  appId: "1:268589392283:web:b701daf6f613e5943f413e"
};

// Initialize Firebase
const app = initializeApp(Config);
const db = getFirestore();
const auth = getAuth();
const signIn = signInWithEmailAndPassword();


export default db;