// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCx0zeyLnHlMwqjc_S2L6orWkvavA-PFY4",
  authDomain: "geog-3a4ff.firebaseapp.com",
  databaseURL: "https://geog-3a4ff-default-rtdb.firebaseio.com",
  projectId: "geog-3a4ff",
  storageBucket: "geog-3a4ff.firebasestorage.app",
  messagingSenderId: "666774568232",
  appId: "1:666774568232:web:9a0b1039e98dd0f569a41d",
  measurementId: "G-BQX4C0FWCB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
