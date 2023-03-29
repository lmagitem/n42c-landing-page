export const findTranslation = (object, field) => {
  const language = (navigator.language || navigator.userLanguage || "en")
    .substring(0, 2)
    .toLowerCase();

  if (!field || typeof field !== "string") return "";

  let content = object[field];
  if (language == "fr") {
    content = object[`${field}Fr`] ?? content;
    content = content ?? object[`${field}En`];
  } else {
    content = object[`${field}En`] ?? content;
    content = content ?? object[`${field}Fr`];
  }

  return content;
};
