import {
  collection,
  updateDoc,
  getDocs,
  setDoc,
  documentId,
} from "firebase/firestore";
import { db } from "../../firebase.config";

export default async function updateShortLink(key, newKey) {
  const collectionRef = collection(db, "links");
  const querySnapshot = await getDocs(collectionRef);
  const result = querySnapshot.docs.map(async (doc) => {
    if (doc.data().key === key) {
      await updateDoc(doc.ref, {
        key: newKey,
      })
        .then(() => {
          console.log("Document successfully updated!");
          return { status: true };
        })
        .catch((err) => {
          return { status: false };
        })
        .finally(() => {
          return {
            status: true,
          };
        });
    }
  });

  result.forEach((res) => {
    if (res.status === false) {
      return { status: false };
    }
  });

  return { status: true };
}
