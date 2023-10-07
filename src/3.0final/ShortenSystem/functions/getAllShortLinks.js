import { db, auth } from "../../firebase.config";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
export const getAllShortLinks = async () => {
  let shortLinks = [];
  const user = auth.currentUser;
  const collectionRef = collection(db, "links");

  const q = await getDocs(collectionRef);
  q.forEach((doc) => {
    shortLinks.push({
      id: doc.id,
      data: doc.data(),
    });
  });

  shortLinks = shortLinks.filter((shortLink) => {
    return shortLink.data.user === user?.uid;
  });

  return shortLinks;
};
