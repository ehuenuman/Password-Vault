import { getFirestore, Timestamp, collection, addDoc, setDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import * as Crypto from 'expo-crypto';

import { app } from "./firebaseConfig";

const db = getFirestore(app);

/**
 * Verify wheter the email is available to be used by the new user.
 * @param {string} email 
 * @returns Availabilty of the email.
 */
export async function isEmailAvailable(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshoot = await getDocs(q);
  const isAvailable = (querySnapshoot.size === 0) ? true : false;

  return isAvailable
}

/**
 * Create a new user into the database.
 * @param {object} formData An Object withh the data of the new user.
 * @returns User ID
 */
export async function createUser(formData) {
  var newUser = {
    name: formData.userName,
    email: formData.email,
    dateJoined: Timestamp.now()
  }
  //TO DO: Use a better hashing method like bcrypt.
  await sha512(formData.masterPassword)
    .then(hash => newUser = { ...newUser, hash: hash })
    .catch(err => console.warn(err));

  const docRef = await addDoc(collection(db, "users"), newUser);

  return (docRef.id);
}

/**
 * Calculate the hash of a string using sha512 algorithm.
 * @param {string} text String to hashing
 * @returns sha512 digest
 */
async function sha512(text) {
  var digest = "";
  await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA512,
    text
  )
    .then(hash => digest = hash)
    .catch(err => console.warn(err));

  return digest
}