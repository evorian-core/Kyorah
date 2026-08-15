export function detectMemory(text) {

  const lower = text.toLowerCase();


  // Nome
  if (
    lower.includes("meu nome é") ||
    lower.includes("eu sou")
  ) {

    const value = text
      .replace(/meu nome é/i, "")
      .replace(/eu sou/i, "")
      .trim();


    return {
      type: "profile",
      key: "name",
      value,
    };

  }



  // Preferências
  if (
    lower.includes("eu gosto de")
  ) {

    const value = text
      .replace(/eu gosto de/i, "")
      .trim();


    return {
      type: "preference",
      key: "likes",
      value,
    };

  }



  return null;

}