import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const app = firebase.initializeApp({
  apiKey: "AIzaSyCtAs1O6uIsy-L1GYbQsRvOeao4o9oTP58",
  authDomain: "kuturl.firebaseapp.com",
  projectId: "kuturl",
  storageBucket: "kuturl.appspot.com",
  messagingSenderId: "405286350412",
  appId: "1:405286350412:web:d5d4b803c6780279860ee9",
  measurementId: "G-H8E2B0F7C1",
});
export const auth = app.auth();
