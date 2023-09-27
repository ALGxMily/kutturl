export default function validateLink(link) {
  if (link === "") {
    return { statusLink: false, errorLink: "Link is empty" };
  } else {
    return { statusLink: true, errorLink: null };
  }
}
