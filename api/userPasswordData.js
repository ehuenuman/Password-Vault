import { collection, setDoc, getDocs, doc, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";

import { firestore } from "./firebaseConfig";

/**
 * Write a new password register in the password user's colection.
 * 
 * @param {string} userId User ID.
 * @param {string} data The ciphertext of the data.
 * @returns ID for the just created register. If there is some error it returns null.
 */
export async function writePasswordRegister(userId, data) {
  let registerId = "";
  const ref = doc(collection(firestore, "users", userId, "passwords"));
  registerId = await setDoc(ref, data)
    .then(() => ref.id)
    .catch(error => console.error(error));

  return registerId;
}

/**
 * Update a resgister password object in the user's collection.
 * 
 * @param {string} userId User ID.
 * @param {string} passwordId Password ID.
 * @param {string} data The ciphertext of the data.
 * @returns A `boolean` indicates the success of the updating process.
 */
export async function updatePasswordRegister(userId, passwordId, data) {
  const userDocumentRef = doc(firestore, "users", userId);
  return updateDoc(doc(userDocumentRef, "passwords", passwordId), data)
    .then(() => true)
    .catch(error => {
      console.error(error);
      return false;
    });
}

/**
 * Delete a password from the user's collection using the password ID.
 * 
 * @param {string} userId User ID.
 * @param {string} id Password ID.
 * @returns A `boolean` indicates the success of the deleting process.
 */
export async function deletePasswordRegister(userId, id) {
  const userDocumentRef = doc(firestore, "users", userId);
  return deleteDoc(doc(userDocumentRef, "passwords", id))
    .then(() => true)
    .catch(error => {
      console.error(error);
      return false;
    });
}

/**
 * 
 * @param {string} userId User ID.
 * @returns An `array` with password `objects`.
 */
export async function getAllEncryptedData(userId) {
  const passwordsCollection = collection(firestore, "users", userId, "passwords");
  const querySnapshot = await getDocs(passwordsCollection);
  var passwords = [];

  if (querySnapshot.size > 0) {
    querySnapshot.forEach(doc => {
      passwords.push({
        ...doc.data(),
        id: doc.id
      });
    });
  }

  return passwords;
}