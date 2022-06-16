import { collection, setDoc, getDocs, doc } from "firebase/firestore";

import { firestore } from "./firebaseConfig";

/**
 * Write a new password register in the password user's colection.
 * 
 * @param {string} userId User ID.
 * @param {object} data An `object` that contains the data to saved in Firestore.
 * @returns ID for the just created register. If there is some error it returns null.
 */
export async function writePasswordRegister(userId, data) {
  let registerId;
  const ref = doc(collection(firestore, "users", userId + "/passwords"));
  registerId = await setDoc(ref, data)
    .then(() => ref.id)
    .catch(error => console.error(error));

  return registerId;
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