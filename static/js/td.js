// The Telemetry Deck app identifier
let appIdentifier;

// Get or set the UUID cookie.
const getOrCreateUUIDCookie = () => {
  const cookieName = "telemetrydeck_uuid";
  const uuidRegex = new RegExp("(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]+)");
  const uuidMatch = document.cookie.match(uuidRegex);

  if (uuidMatch) {
    return uuidMatch[2];
  } else {
    const uuid = crypto.randomUUID();
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    document.cookie =
      cookieName + "=" + uuid + ";expires=" + expires.toUTCString() + ";path=/";
    return uuid;
  }
};

// Returns the app id given by Telemetry Deck.
const loadTelemetryDeckApp = (onLoadedCallback) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "static/env.properties");
  xhr.onload = () => {
    if (xhr.status === 200) {
      const env = new Map(
        xhr.responseText.split("\n").map((line) => line.split("="))
      );
      onLoadedCallback(env.get("app"));
    }
  };
  xhr.send();
};

// Sends an analytics signal to Telemetry Deck.
const doSendSignal = () => {
  setTimeout(() => {
    const uuid = getOrCreateUUIDCookie();
    while (!window.td) {
      // Wait until td has been initialized
    }
    window.td._app = window.td._app ?? appIdentifier;
    window.td._user = window.td._user ?? uuid ?? "anonymous";
    window.td.signal({
      // isTestMode: true,
      resolution: `${screen.width}×${screen.height}`,
      browserSize: `${window.innerWidth}×${window.innerHeight}`,
      language: `${localStorage.getItem("lang")}`,
      wurl: window.location.url,
      whash: window.location.hash,
      wpathname: window.location.pathname,
    });
  });
};

// Initializes Telemetry Deck if needed and sends an analytics signal.
export const sendTelemetrySignal = () => {
  if (!appIdentifier) {
    loadTelemetryDeckApp((app) => {
      appIdentifier = app;
      doSendSignal();
    });
  } else {
    doSendSignal();
  }
};
