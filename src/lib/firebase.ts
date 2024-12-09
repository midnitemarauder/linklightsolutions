import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const REQUIRED_CONFIG_KEYS = [
  'apiKey',
  'authDomain',
  'projectId',
  'storageBucket',
  'messagingSenderId',
  'appId'
] as const;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Validate Firebase configuration
for (const key of REQUIRED_CONFIG_KEYS) {
  if (!firebaseConfig[key]) {
    throw new Error(`Missing required Firebase configuration: ${key}`);
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);