import { collection, setDoc, getDocs, doc, query, where, getDoc } from "firebase/firestore";
import * as SecureStore from "expo-secure-store";
import CryptoES from "crypto-es";

import { firestore } from "./firebaseConfig";

/**
 * Verify if the email is available to be used by the new user.
 * 
 * @param {string} email user's email.
 * @returns Availability of the email.
 */
export async function isEmailAvailable(email) {
  const q = query(collection(firestore, "users"), where("email", "==", email));
  const querySnapshoot = await getDocs(q);

  return (querySnapshoot.size === 0) ? true : false
}

/**
 * Create the user document into the Firestore that will be used to store the passwords' user.
 * 
 * @param {User} userInstance `User` object created after Signed Up a new user.
 * @param {object} userData An `object` with extra data from the register form.
 */
export async function createUserDatabase(userInstance, userData) {
  const salt = CryptoES.lib.WordArray.random(256 / 16).toString();
  const iv = CryptoES.lib.WordArray.random(256 / 16).toString();

  // Store the salt and IVs in the keychain
  await SecureStore.setItemAsync("SALT", salt);
  await SecureStore.setItemAsync("IV", iv);

  await setDoc(doc(firestore, "users", userInstance.uid), {
    email: userData.email,
    passwordStrength: userData.passwordStrength,
    s: salt,
    iv: iv,
  })
    .catch(error => console.error(error));
}

/**
 * Get the user's keys from firestore to be saved in the local keychain.
 * 
 * @param {string} uid User's ID.
 */
export async function loadUserKeys(uid) {
  const userDocRef = doc(firestore, "users", uid);
  const userDoc = await getDoc(userDocRef);
  if (userDoc.exists()) {
    await SecureStore.setItemAsync("SALT", userDoc.data().s);
    await SecureStore.setItemAsync("IV", userDoc.data().iv);
  } else {
    console.error("No such document");
  }
}
