import { collection, setDoc, getDocs, doc, query, where } from "firebase/firestore";

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
 * @param {object} userData An `Object` with extra data from the register form.
 */
export async function createUserDatabase(userInstance, userData) {
  await setDoc(doc(firestore, "users", userInstance.uid), {
    email: userData.email,
    passwordStrength: userData.passwordStrength
  })
    .catch(error => console.error(error));
}
