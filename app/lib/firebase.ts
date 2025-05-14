// lib/firebase.ts

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// ✅ Correct the storageBucket URL – small typo in your version
const firebaseConfig = {
  apiKey: "AIzaSyAC1_DJx3pZ-QZKagGV4FhMtOcu_NinKZk",
  authDomain: "vaerktoj-udlejning.firebaseapp.com",
  projectId: "vaerktoj-udlejning",
  storageBucket: "vaerktoj-udlejning-tools.appspot.com",
  messagingSenderId: "867707757052",
  appId: "1:867707757052:web:44293a51e069ff7302d279",
  measurementId: "G-6Y6ZPTZJGN"
};

// This ensures the app is not initialized multiple times (important for Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// Export Firestore and Storage – this is what your app uses
export const db = getFirestore(app);
export const storage = getStorage(app);