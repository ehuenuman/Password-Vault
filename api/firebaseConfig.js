import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth } from "firebase/auth"
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { FirebaseConfig } from "./keys";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY ?? FirebaseConfig.apiKey,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? FirebaseConfig.authDomain,
  projectId: process.env.FIREBASE_PROJECT_ID ?? FirebaseConfig.projectId,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET ?? FirebaseConfig.storageBucket,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID ?? FirebaseConfig.messagingSenderId,
  appId: process.env.FIREBASE_APP_ID ?? FirebaseConfig.appId,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID ?? FirebaseConfig.measurementId
}

// Initialise Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
