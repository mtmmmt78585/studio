// src/lib/firebase.ts
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "pixgram-r87io",
  appId: "1:370862273947:web:ff4fd1f0ae7e01ba641d3e",
  storageBucket: "pixgram-r87io.firebasestorage.app",
  apiKey: "AIzaSyAHhwU9W1r5HdT1LsmtiCyaxbkoHsyxE0Q",
  authDomain: "pixgram-r87io.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "370862273947"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
