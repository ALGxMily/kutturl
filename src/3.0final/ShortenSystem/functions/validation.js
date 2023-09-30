export default function validateLink(link) {
  if (link.length < 1) {
    return { statusLink: false, errorLink: "Please enter a link g" };
  }
  if (!link.includes(".")) {
    return { statusLink: false, errorLink: "Please enter a valid link q" };
  }
  if (link.includes(" ")) {
    return {
      statusLink: false,
      errorLink: "Please enter a valid link w",
    };
  }
  if (!link.includes("http://")) {
    if (!link.includes("https://")) {
      return {
        statusLink: false,
        errorLink: "Please enter a valid link e",
      };
    }
  }

  return { statusLink: true, errorLink: "" };
}
