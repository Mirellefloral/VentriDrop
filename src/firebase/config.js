// Firebase Configuration
// Replace with your actual Firebase config in production
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDEMO-REPLACE-WITH-YOUR-KEY",
  authDomain: "ventridrop.firebaseapp.com",
  projectId: "ventridrop",
  storageBucket: "ventridrop.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

let app, auth, db, storage;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (e) {
  console.warn('Firebase init failed - running in demo mode');
}

export { auth, db, storage };
export default app;
