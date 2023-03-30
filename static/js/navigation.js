import { findTranslation } from "./translation.js";
import { buttonTranslations } from "../pages/home.js";

// Get the button elements by their IDs
const homeButton = document.getElementById("nav-home");
const aboutButton = document.getElementById("nav-about");
const blogButton = document.getElementById("nav-blog");
const projectsButton = document.getElementById("nav-projects");
const frButton = document.getElementById("nav-lang-fr");
const enButton = document.getElementById("nav-lang-en");

export const makeButtonsInteractive = () => {
  // Add the onclick event listeners to the buttons
  homeButton.addEventListener("click", () => {
    window.location.hash = `/${localStorage.getItem("lang") || "en"}/`;
    setActiveNavigationButton();
  });
  aboutButton.addEventListener("click", () => {
    window.location.hash = `/${localStorage.getItem("lang") || "en"}/about`;
    setActiveNavigationButton();
  });
  blogButton.addEventListener("click", () => {
    window.location.hash = `/${localStorage.getItem("lang") || "en"}/blog`;
    setActiveNavigationButton();
  });
  projectsButton.addEventListener("click", () => {
    window.location.hash = `/${localStorage.getItem("lang") || "en"}/projects`;
    setActiveNavigationButton();
  });
  frButton.addEventListener("click", () => onLanguageChange("fr"));
  enButton.addEventListener("click", () => onLanguageChange("en"));
};

const onLanguageChange = (language) => {
  window.location.hash =
    window.location.hash.slice(0, 2) + language + window.location.hash.slice(4);
};

export const translateButtons = () => {
  aboutButton.innerHTML = findTranslation(buttonTranslations, "about");
  blogButton.innerHTML = findTranslation(buttonTranslations, "blog");
  projectsButton.innerHTML = findTranslation(buttonTranslations, "projects");
};

export const setActiveNavigationButton = () => {
  aboutButton.classList.remove("active-button");
  blogButton.classList.remove("active-button");
  projectsButton.classList.remove("active-button");
  frButton.classList.remove("lang-active-button");
  enButton.classList.remove("lang-active-button");

  if (window.location.hash.includes("/about")) {
    aboutButton.classList.add("active-button");
  } else if (window.location.hash.includes("/blog")) {
    blogButton.classList.add("active-button");
  } else if (window.location.hash.includes("/projects")) {
    projectsButton.classList.add("active-button");
  }
  if (localStorage.getItem("lang") === "fr") {
    frButton.classList.add("lang-active-button");
  } else {
    enButton.classList.add("lang-active-button");
  }
};
