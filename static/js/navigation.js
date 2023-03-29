// Get the button elements by their IDs
const aboutButton = document.getElementById("nav-about");
const blogButton = document.getElementById("nav-blog");
const projectsButton = document.getElementById("nav-projects");

export const makeButtonsInteractive = () => {
  // Add the onclick event listeners to the buttons
  aboutButton.addEventListener("click", () => {
    window.location.hash = "/about";
    setActiveNavigationButton();
  });
  blogButton.addEventListener("click", () => {
    window.location.hash = "/blog";
    setActiveNavigationButton();
  });
  projectsButton.addEventListener("click", () => {
    window.location.hash = "/projects";
    setActiveNavigationButton();
  });
};

export const setActiveNavigationButton = () => {
  aboutButton.classList.remove("active-button");
  blogButton.classList.remove("active-button");
  projectsButton.classList.remove("active-button");

  if (window.location.hash.includes("/about")) {
    aboutButton.classList.add("active-button");
  } else if (window.location.hash.includes("/blog")) {
    blogButton.classList.add("active-button");
  } else if (window.location.hash.includes("/projects")) {
    projectsButton.classList.add("active-button");
  }
};
