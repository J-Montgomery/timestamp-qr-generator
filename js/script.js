const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");

function currentTimestamp() {
    const unixtime = Math.round(new Date().getTime()/1000);
  return unixtime.toString();
}

const canvas = document.getElementById('qrcode-canvas');
const ts_text = document.getElementById('timestamp-text');
const default_ts = currentTimestamp();
const qr_size = Math.min(document.documentElement.clientHeight / 2, document.documentElement.clientWidth / 2, 500);
const qr = new QRious({
  element: canvas,
  value: default_ts,
  size: qr_size,
  level: 'M',
  foreground: "#000000",
  background: "#ffffff"
});
ts_text.innerHTML = default_ts;

setInterval(() => {
  const timestamp = currentTimestamp();
  qr.set({
    value: timestamp
  });
  ts_text.innerHTML = timestamp;
}, 1000);

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

/**
 * Warn the page must not be served in an iframe.
 */
if (window.self !== window.top) {
  const requireTopLevel = document.getElementById("requireTopLevel");
  const link = requireTopLevel.querySelector("a");
  link.href = window.location.href;
  requireTopLevel.classList.remove("hidden");
}
