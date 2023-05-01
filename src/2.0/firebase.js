import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCtAs1O6uIsy-L1GYbQsRvOeao4o9oTP58",

  authDomain: "kuturl.firebaseapp.com",

  databaseURL: "https://kuturl-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "kuturl",

  storageBucket: "kuturl.appspot.com",

  messagingSenderId: "405286350412",

  appId: "1:405286350412:web:d5d4b803c6780279860ee9",

  measurementId: "G-H8E2B0F7C1",
};
var db;
var app;
try {
  app = getApp();
  db = getFirestore();
} catch (err) {
  app = initializeApp(firebaseConfig);
  db = getFirestore();
}

export default db;
