import { db } from "../../firebase.config.js";
import { collection, getDocs } from "firebase/firestore";

export default async function checkLinkExist(key) {
  const collectionRef = collection(db, "links");
  const querySnapshot = await getDocs(collectionRef);

  let result = false;
  querySnapshot.docs.map(async (doc) => {
    if (doc.data().key === key) {
      result = true;
    }
  });
  return result;
}
