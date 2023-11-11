import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Web app Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgNZqW5uFxDV0ThdBY9aisZBImLIfpUC8",
  authDomain: "ss-test1-1b22d.firebaseapp.com",
  projectId: "ss-test1-1b22d",
  storageBucket: "ss-test1-1b22d.appspot.com",
  messagingSenderId: "580139249610",
  appId: "1:580139249610:web:31e05708d97d12457de933"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
