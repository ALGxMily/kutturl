import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase.config";
import key from "./genKey.js";

export default async function addLink(link, key) {
  const collectionRef = collection(db, "links");
  const docRef = await addDoc(collectionRef, {
    link,
    createdAt: serverTimestamp(),
    shortLink: key,
  }).catch((err) => {
    console.log("Error adding document: ", err);
    return { status: false, error: err };
  });
  console.log("Document written with ID: ", docRef.id);
  return { status: true, key, docRef };
}
