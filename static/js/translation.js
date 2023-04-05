export const initLanguage = () => {
  const language =
    localStorage.getItem("lang") ??
    (navigator.language || navigator.userLanguage || "fr")
      .substring(0, 2)
      .toLowerCase();
  localStorage.setItem("lang", language);
  resetHtmlLang(language);
};

export const changeLanguage = (language, callback) => {
  localStorage.setItem("lang", language);
  resetHtmlLang(language);
  callback();
}

export const resetHtmlLang = (language) => {
  document.documentElement.setAttribute(
    "lang",
    language === "fr" ? language : "en"
  );
};

export const findTranslation = (object, field) => {
  const language = localStorage.getItem("lang");

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
