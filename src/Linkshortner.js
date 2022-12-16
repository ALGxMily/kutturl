import { auth } from "./firebaseConfig";
import axios from "axios";

const isDev = process.env.NODE_ENV === "development";
const public_url = isDev ? "http://localhost:5005" : "https://kuturl.herokuapp.com";

const linkShortner = async (url, uuid) => {
  console.log("linkShortner -> url", url);
  let baseURL = `${public_url}/create`;
  let responseObj = {
    shortUrl: null,
    error: null,
    success: false,
  };

  console.log("linkShortner -> baseURL", baseURL);
  const objToSend = {
    url: url,
    uuid: uuid ? uuid : null,
  };
  const response = await axios.post(baseURL, objToSend);
  const data = response.data;
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
