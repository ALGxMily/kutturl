"use strict";

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db, auth } from "../../firebase.config";

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

export const saveUser = async (user) => {
  const collectionRef = collection(db, "users");
  const userUid = auth.currentUser?.uid;
  let status;
  let docRef;
  // save to db once
  if (!userUid) {
    return { status: false, docRef: null };
  }

  // check if user already exists
  // if exists, update
  // else create new
  // save to db once
  try {
    const docRef = collection(db, "users");
    const q = query(docRef, where("uid", "==", userUid));
    const querySnapshot = await getDocs(q);
    const data = {
      userPhoto: querySnapshot.docs[0].data().photoURL
        ? querySnapshot.docs[0].data().photoURL
        : null,
      userDisplayName: querySnapshot.docs[0].data().displayName,
      userEmail: querySnapshot.docs[0].data().email,
    };
    if (querySnapshot.size > 0) {
      return {
        status: true,
        data: {
          userPhoto: data.userPhoto ? data.userPhoto : null,
          userDisplayName: data.userDisplayName,
          userEmail: data.userEmail,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }

  await addDoc(collectionRef, {
    uid: userUid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user?.photoURL,
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
    });

  return {
    status: status,
    data: {
      userPhoto: user?.photoURL ? user.photoURL : null,
      userDisplayName: user.displayName,
      userEmail: user.email,
    },
  };
};
