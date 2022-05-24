import { getFirestore, Timestamp, collection, addDoc, setDoc, getDocs, getDoc, doc } from "firebase/firestore";

import { app } from "./firebaseConfig";

const db = getFirestore(app);

const USER_ID = "C9OB3RzOAt9tW4pOqC3r"

export async function createUserPasswordData(data) {
  const values = {
    ...data,
    dataType: "password",
    accountType: data.accountName,
    createTimestamp: Timestamp.now(),
    updateTimestamp: Timestamp.now()
  };

  console.log(values);

  const passwordCollectionRef = collection(db, "Users", USER_ID + "/passwords",);
  const docRef = await addDoc(passwordCollectionRef, values);
  console.log("Document written wirh ID: ", docRef.id);
}

export async function getAllEncryptedData() {
  const colllectionRef = collection(db, "Users", USER_ID + "/passwords");
  const querySnapshot = await getDocs(colllectionRef);
  var passwords = [];

  querySnapshot.forEach(doc => {
    //console.log(doc.id, " => ", doc.data());
    passwords.push({
      ...doc.data(),
      "id": doc.id
    });
  });
  return passwords
}