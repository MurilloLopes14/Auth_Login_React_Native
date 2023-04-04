import { initializeApp } from "firebase/app";
import "firebase/database";
import { getDatabase } from "firebase/database";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASoF_n3dB9T0_KDF7QIaLybo1OyHtyILM",
  authDomain: "reactnative-5bcb1.firebaseapp.com",
  databaseURL: "https://reactnative-5bcb1-default-rtdb.firebaseio.com",
  projectId: "reactnative-5bcb1",
  storageBucket: "reactnative-5bcb1.appspot.com",
  messagingSenderId: "361180877765",
  appId: "1:361180877765:web:390f4ae5164cedf32531ac",
  measurementId: "G-LPM5V3DZ18",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);

export default db;
