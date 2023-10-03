import { db } from "../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export default async function getShortLink(id) {
  console.log(id);
  const docRef = doc(db, "links", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const shortLink = docSnap.data().key;
    return { status: true, shortLink, err: null };
  } else {
    return { status: false, shortLink: null, id: id, err: "No such document!" };
  }
}
