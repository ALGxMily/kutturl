import { db, auth } from "../../firebase.config";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

export default async function deleteLink(id) {
  console.log(id);
  const docRef = doc(db, "links", id);
  const docSnap = await deleteDoc(docRef);
  if (docSnap.exists()) {
    const shortLink = docSnap.data().key;
    return { status: true, shortLink, err: null };
  } else {
    return { status: false, shortLink: null, id: id, err: "No such document!" };
  }
}

export const deleteOldLink = async (id) => {
  const dateToday = new Date();
  const docRef = doc(db, "links", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const createdAt = docSnap.data().createdAt;
    const dateCreated = new Date(createdAt.seconds * 1000);
    const diffTime = Math.abs(dateToday - dateCreated);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      await deleteDoc(docRef);
      return { status: true, err: null };
    } else {
      return { status: false, err: "Not yet 30 days" };
    }
  } else {
    return { status: false, err: "No such document!" };
  }
};
