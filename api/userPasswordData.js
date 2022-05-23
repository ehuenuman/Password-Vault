import { getFirestore, doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

import { app } from "./firebaseConfig";

const db = getFirestore(app);

export default async function createUserPasswordData(data) {
  const values = {
    ...data,
    dataType: "password",
    createTimestamp: Timestamp.now(),
    updateTimestamp: Timestamp.now()
  };

  console.log(values);

  const userRef = doc(db, "Users", "yGtgKeZuQE1zg67vvb7P");
  await updateDoc(userRef, {
    passwords: arrayUnion(values)
  });
}