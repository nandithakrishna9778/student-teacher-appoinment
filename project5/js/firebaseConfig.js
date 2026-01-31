// js/firebaseConfig.js

// Import Firebase SDKs (v10+ modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 REPLACE these values with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyB8DlLqMUZ7dSm9evIjlP8q1kyv5LZlEkg",
  authDomain: "hospital-operation-61caf.firebaseapp.com",
  projectId: "hospital-operation-61caf",
  storageBucket: "hospital-operation-61caf.firebasestorage.app",
  messagingSenderId: "779020494871",
  appId: "1:779020494871:web:69fa972f5487e233485452",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
