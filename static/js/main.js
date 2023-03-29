import {
  makeButtonsInteractive,
  setActiveNavigationButton,
} from "./navigation.js";
import { listenToRouteChange, launchRouter } from "./router.js";
import { sendTelemetrySignal } from "./td.js";

makeButtonsInteractive();
listenToRouteChange();
setActiveNavigationButton();
launchRouter();

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
