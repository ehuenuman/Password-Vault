import { signInAnonymously, createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import * as Crypto from 'expo-crypto';
import * as SecureStore from 'expo-secure-store';

import { auth } from "./firebaseConfig";
import { createUserDatabase } from "./user";

/**
 * Asynchronously signs in using an email and password.
 * 
 * @remarks
 * Fails with an error if the email address and password do not match.
 * 
 * @param {object} userData `Object` that contain the user/email and the password typed by the user.
 * @return `Object` with the validity status and a message. If `isValid` is `true` then `message` is the user's ID that will be used as `userToken`.
 */
export async function signInUser(userData) {
  var response = {
    isValid: false,
    message: "Failed login"
  }
  return signInWithEmailAndPassword(auth, userData.email, userData.masterPassword)
    .then(async userCredential => {
      return userCredential.user.getIdToken()
        .then(async token => {
          response.isValid = true;
          response.message = token;

          await SecureStore.setItemAsync("cypher", userData.masterPassword);

          return response
        })
        .catch(error => {
          console.warn(error);

          return response;
        });
    })
    .catch(error => {
      // List of Auth errors: https://firebase.google.com/docs/auth/admin/errors
      switch (error.code) {
        case "auth/too-many-request":
          response.message = "Account has been temporarily disabled due to many failed login attempts";
          break;
        case "auth/wrong-password":
          response["message"] = "Wrong password";
          break;
        case "auth/user-not-found":
          response.message = "Email does not have account";
          break;
        default:
          response.message = "Failed login";
          break;
      }
      return response
    });
}

/**
 * Create a new user into the Firebase Auth.
 * 
 * Check list fo errors: 
 * https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
 * 
 * @param {object} newUserData An `Object' with the data of the new user.
 * @return The token of the newly registered user.
 */
export async function signUpUser(newUserData) {
  let userToken = "";
  await createUserWithEmailAndPassword(auth, newUserData.email, newUserData.masterPassword)
    .then(async userCredential => {
      await updateProfile(userCredential.user, { displayName: newUserData.userName })
        .catch(error => console.error(error));
      await createUserDatabase(userCredential.user, newUserData)
        .catch(error => console.error(error));
      userToken = userCredential.user.getIdToken()
        .then(userToken => userToken)
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error.code + " | " + error.message));

  return userToken;
}

/**
 * Delete the auth user instance. 
 */
export function signOutUser() {
  signOut(auth)
    .then(() => console.log("Sign out successful"))
    .catch(error => console.error(error));
}

/**
 * Initialise a instance of a anonymous user.
 * 
 * @returns `userToken`
 */
export async function anonymousUser() {
  const userCredential = await signInAnonymously(auth)
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error code: %0. %1", [errorCode, errorMessage]);
    });
  let userToken = await userCredential.user.getIdToken()
    .catch(error => console.error(error));

  return userToken
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