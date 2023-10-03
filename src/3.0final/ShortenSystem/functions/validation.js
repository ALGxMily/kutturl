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

export function validateNewKey(key) {
  if (key.length < 1) {
    return { statusKey: false, errorKey: "Please enter a key" };
  }
  if (key.includes(" ")) {
    return {
      statusKey: false,
      errorKey: "Please enter a valid key",
    };
  }
  if (key.includes(".")) {
    return {
      statusKey: false,
      errorKey: "Please enter a valid key",
    };
  }
  if (key.includes("/")) {
    return {
      statusKey: false,
      errorKey: "Please enter a valid key",
    };
  }
  if (key.includes("http://")) {
    return {
      statusKey: false,
      errorKey: "Please enter a valid key",
    };
  }
  if (key.includes("https://")) {
    return {
      statusKey: false,
      errorKey: "Please enter a valid key",
    };
  }

  if (key.length > 10) {
    return {
      statusKey: false,
      errorKey: "Please enter a shorter key",
    };
  }

  return { statusKey: true, errorKey: "" };
}
