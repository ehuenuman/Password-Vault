import { getFirestore, Timestamp, collection, addDoc, setDoc, getDocs, getDoc, doc, query, where } from "firebase/firestore";
import * as Crypto from 'expo-crypto';

import { app } from "./firebaseConfig";

const db = getFirestore(app);

/**
 * Verify whether the email is available to be used by the new user.
 * 
 * @param {string} email 
 * @returns Availability of the email.
 */
export async function isEmailAvailable(email) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshoot = await getDocs(q);

  return (querySnapshoot.size === 0) ? true : false
}

/**
 * Check the user credentials.
 * `logInUser()` is used when the user has not done loggin in before.
 * 
 * @param {object} loginData `Object` that contain the user/email and the password typed by the user.
 * @returns `Object` with the validity status and a message. If `isValid` is `true` then `message` is the user's ID that will be used as `userToke`.
 */
export async function logInUser(loginData) {
  var response = {
    isValid: false,
    message: ""
  }
  const q = query(collection(db, "users"), where("email", "==", loginData.email));
  const querySnapshoot = await getDocs(q);
  if (querySnapshoot.size === 0) {
    response = { isValid: false, message: "User does not exist" }
  } else {
    await isCorrectPassword(loginData.masterPassword, querySnapshoot.docs[0].data().hash)
      .then(isCorrect => {
        response["isValid"] = isCorrect;
        if (isCorrect)
          response["message"] = querySnapshoot.docs[0].id
        else
          response["message"] = "Wrong password"
      })
      .catch(e => console.error(e));
  }
  return response
}

/**
 * Create a new user into the database.
 * 
 * @param {object} registerData An `Object` with the data of the new user.
 * @returns User ID to be used as userToken.
 */
export async function signUpUser(registerData) {
  var newUser = {
    name: registerData.userName,
    email: registerData.email,
    dateJoined: Timestamp.now()
  }
  //TO DO: Use a better hashing method like bcrypt.
  await sha512(registerData.masterPassword)
    .then(hash => newUser = { ...newUser, hash: hash })
    .catch(e => console.error(e));

  const docRef = await addDoc(collection(db, "users"), newUser);

  return docRef.id
}

/**
 * Verify the password matches with the hash. 
 * 
 * @param {string} password Characters that will be compared.
 * @param {string} hash Hash string that will be compared.
 * @returns Return a `bolean` indicating if the password is correct.
 */
async function isCorrectPassword(password, hash) {
  const tempHash = await sha512(password);
  return (tempHash === hash)
}

/**
 * Calculate the hash of a string using **sha512 algorithm**.
 * 
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