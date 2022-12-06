import { auth } from "./firebaseConfig";

const isDev = process.env.NODE_ENV === "development";
const public_url = isDev ? "http://localhost:5005" : "https://kuturl.herokuapp.com";

const linkShortner = async (url, uuid) => {
  let baseURL = `${public_url}/shorturladd`;
  let responseObj = {
    shortUrl: null,
    error: null,
    success: false,
  };

  if (uuid === "guest") {
    baseURL = `${baseURL}?url=${url}`;
  } else {
    baseURL = `${baseURL}?url=${url}&uuid=${uuid}`;
  }

  const response = await fetch(baseURL, {
    method: "GET",
  });

  const data = await response.json();

  if (data.error) {
    responseObj.error = data.error;
    throw data.error;
  } else {
    responseObj.shortUrl = `https://kutturl.com/${data.key}`;
    responseObj.success = true;
    return responseObj;
  }
};

export default linkShortner;
