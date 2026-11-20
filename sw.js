const CACHE = "mathenomics-v31";
const SHELL = [
  "./",
  "./index.html",
  "./css/app.css",
  "./js/safe.js",
  "./js/pics.js",
  "./js/courses.js",
  "./js/more/arith.js",
  "./js/more/geo.js",
  "./js/more/trig.js",
  "./js/more/cheats.js",
  "./js/more/hs.js",
  "./js/more/pabson.js",
  "./js/more/optional.js",
  "./js/more/expand.js",
  "./js/more/tables.js",
  "./js/i18n.js",
  "./js/i18n/ne-pack-a.js",
  "./js/i18n/ne-pack-b.js",
  "./js/i18n/ne-pack-c.js",
  "./js/i18n/es-pack-a.js",
  "./js/i18n/es-pack-b.js",
  "./js/i18n/es-pack-c.js",
  "./js/sounds.js",
  "./js/narration.js",
  "./js/keys.js",
  "./js/kids.js",
  "./js/profiles.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png"
];

function sameOrigin(url) {
  try { return new URL(url, self.location.href).origin === self.location.origin; }
  catch (_) { return false; }
}

async function precache(cache) {
  await Promise.all(SHELL.map(async (url) => {
    try {
      const res = await fetch(url, { cache: "reload" });
      if (res && res.ok) await cache.put(url, res);
    } catch (_) { /* skip missing optional assets */ }
  }));
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then(precache).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  if (!sameOrigin(req.url)) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(req);
      if (response && response.ok && response.type === "basic") {
        try {
          const copy = response.clone();
          const cache = await caches.open(CACHE);
          await cache.put(req, copy);
        } catch (_) { /* ignore cache write failures */ }
      }
      return response;
    } catch (_) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === "navigate" || (req.headers.get("accept") || "").includes("text/html")) {
        const shell = await caches.match("./index.html");
        if (shell) return shell;
      }
      return new Response("Offline", { status: 503, statusText: "Offline", headers: { "Content-Type": "text/plain" } });
    }
  })());
});
