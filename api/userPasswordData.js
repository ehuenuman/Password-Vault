import { collection, setDoc, getDocs, doc } from "firebase/firestore";

import { firestore } from "./firebaseConfig";

/**
 * Write a new password register in the password user's colection.
 * 
 * @param {string} userId User ID.
 * @param {object} data An `object` that contains the data to saved in Firestore.
 */
export async function writePasswordRegister(userId, data) {
  const ref = doc(firestore, "users", userId + "/passwords/" + data.id);
  await setDoc(ref, data);
}

/**
 * 
 * @param {string} userId User ID.
 * @returns An `array` with password `objects`.
 */
export async function getAllEncryptedData(userId) {
  const colllectionRef = collection(firestore, "users", userId + "/passwords");
  const querySnapshot = await getDocs(colllectionRef);
  var passwords = [];

  if (querySnapshot.size > 0) {
    querySnapshot.forEach(doc => {
      passwords.push({
        ...doc.data(),
        "id": doc.id
      });
    });
  }

  return passwords;
}