import {
  makeButtonsInteractive,
  setActiveNavigationButton,
  translateButtons,
} from "./navigation.js";
import {
  listenToRouteChange,
  processRouting,
  redirectFromOldBlog,
} from "./router.js";
import { sendTelemetrySignal } from "./td.js";
import { initLanguage } from "./translation.js";

redirectFromOldBlog();
initLanguage();
makeButtonsInteractive();
setActiveNavigationButton();
translateButtons();
processRouting();
listenToRouteChange();

// When everything is done, show the page
document.getElementById("loading-animation").classList.add("hide-content");
setTimeout(() => {
  document.getElementById("content-box").classList.add("show-content");
  document.getElementById("content-box").classList.remove("hidden-content");
  document.getElementById("loading-animation").classList.add("hidden-content");
  document.getElementById("loading-animation").classList.remove("hide-content");
  setTimeout(() => {
    document.getElementById("content-box").classList.remove("show-content");
  }, 1001);
}, 501);

sendTelemetrySignal();
