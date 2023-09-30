import key from "./functions/genKey.js";
import saveToDB from "./functions/saveToDB.js";
import getShortLink from "./functions/getShortLink.js";
import validateLink from "./functions/validation.js";

export const urlShortner = async (link) => {
  try {
    const { statusLink, errorLink } = validateLink(link);
    console.log(errorLink);
    if (statusLink) {
      const generatedKey = key();
      const { status, docRef, err } = await saveToDB(link, generatedKey);
      if (status) {
        const { status, shortLink, err } = await getShortLink(docRef.id);
        if (status) {
          return {
            status: true,
            shortLink,
            err: null,
            docID: docRef.id,
            statusLink,
            errorLink,
          };
        } else {
          return {
            status: false,
            shortLink: null,
            err,
            docID: docRef.id,
            statusLink,
            errorLink,
          };
        }
      } else {
        return { status: false, shortLink: null, err };
      }
    } else {
      return { status: false, shortLink: null, err: errorLink };
    }
  } catch (err) {
    return { status: false, error: err };
  }
};
