import { sendTelemetrySignal } from "./td.js";
import { findTranslation, changeLanguage } from "./translation.js";
import { translateButtons, setActiveNavigationButton } from "./navigation.js";

const mainSection = document.getElementById("main-section");

// Simple function to redirect users of my old website to my the proper pages
export const redirectFromOldBlog = () => {
  const url = window.location.pathname;
    const hash = window.location.hash;

    if (url === "/" && (hash === "" || hash === "/")) {
    const newUrl = `/#/${localStorage.getItem("lang") || "en"}/`;
    window.history.pushState(null, "", newUrl);
  }

  const pathMatch = url.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)/);
  if (pathMatch && pathMatch[4] !== undefined) {
    const path = pathMatch[4].endsWith("/")
      ? pathMatch[4].slice(0, -1)
      : pathMatch[4];
    const newUrl = `/#/${localStorage.getItem("lang") || "fr"}/blog/${path}`;
    window.history.pushState(null, "", newUrl);
  }
};

// The list of pages that can be navigated to. The blog articles are managed in the processRouting function.
const routes = {
  "/": async () => {
    const { homeContent } = await import("../pages/home.js");
    mainSection.innerHTML = findTranslation(homeContent, "content");
  },
  "/about": async () => {
    const { aboutContent } = await import("../pages/about.js");
    mainSection.innerHTML = findTranslation(aboutContent, "content");
  },
  "/blog": async () => {
    const { blogContent } = await import("../pages/blog.js");
    mainSection.innerHTML = findTranslation(blogContent, "content");
  },
  "/projects": async () => {
    const { projectsContent } = await import("../pages/projects.js");
    mainSection.innerHTML = findTranslation(projectsContent, "content");
  },
  "/404": async () => {
    const { fourOhFourContent } = await import("../pages/404.js");
    mainSection.innerHTML = findTranslation(fourOhFourContent, "content");
  },
};

// Checks that we received a valid article name, no security breach allowed.
const isValidArticleName = (articleName) => {
  const regex = /^[a-z0-9-]+$/i;
  return regex.test(articleName);
};

// Calls the appropriate content-filling function based on the URL.
export const processRouting = async () => {
  const hash = window.location.hash.slice(4);
  const lang = window.location.hash.slice(2, 4);

  if (
    (lang === "en" || lang === "fr") &&
    lang !== localStorage.getItem("lang")
  ) {
    changeLanguage(lang, () => {
      translateButtons();
      setActiveNavigationButton();
    });
  }

  if (routes.hasOwnProperty(hash)) {
    // If it's a page, calls the appropriate route filling function
    return await routes[hash]();
  } else if (hash.includes("/blog/")) {
    // If it's an article, memorizes its name and checks if it's sensible
    const articleName = hash.substring(6);
    if (!isValidArticleName(articleName)) return routes["/404"]();
    // Then try to load the corresponding json object
    const { article } = await import(`../articles/${articleName}.js`);
    if (!article) return routes["/404"]();
    // If everything went well, calls the proper route filling function
    const { insertArticleContent } = await import("../pages/blog.js");
    return insertArticleContent(article);
  } else {
    // If it's not a page or an article, calls the 404 route
    return routes["/404"]();
  }
};

// Listens for changes in the hash.
export const listenToRouteChange = () =>
  window.addEventListener("hashchange", async () => {
    await processRouting();
    sendTelemetrySignal();
  });
