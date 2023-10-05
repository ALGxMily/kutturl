"use strict";

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import key from "./genKey.js";

export const addLink = async (link, key, user) => {
  const collectionRef = collection(db, "links");
  const userUid = auth.currentUser?.uid;
  let status;
  let docRef;
  // save to db once
  try {
    await addDoc(collectionRef, {
      link: link,
      key: key,
      user: userUid ? userUid : null,
      createdAt: serverTimestamp(),
    })
      .then((docR) => {
        status = true;
        docRef = docR;
      })
      .catch((error) => {
        status = false;
        console.error("Error adding document: ", error);
        return null;
      })
      .finally(() => {
        console.log("addLink", status, docRef);
      });
  } catch (e) {
    console.log(e);
  }

  return { status: status, docRef: docRef };
};
