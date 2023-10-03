"no use strict";

import key from "./functions/genKey.js";
import { addLink } from "./functions/saveToDB.js";
import getShortLink from "./functions/getShortLink.js";
import validateLink from "./functions/validation.js";

export const urlShortner = async (link, user) => {
  const { statusLink, errorLink } = validateLink(link);
  if (statusLink) {
    const generatedKey = key();
    const { status, docRef } = await addLink(link, generatedKey, user);
    console.log(status, docRef);
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
      console.log("Error SaveDB");
      return { status: false, shortLink: null, err: "Error SaveDB" };
    }
  } else {
    console.log("Error ValidateLink", errorLink);
    return { status: false, shortLink: null, err: errorLink };
  }
};
