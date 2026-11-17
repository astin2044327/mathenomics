const CACHE = "mathenomics-v7";
const SHELL = [
  "./",
  "./index.html",
  "./css/app.css",
  "./js/pics.js",
  "./js/courses.js",
  "./js/more/arith.js",
  "./js/more/geo.js",
  "./js/more/trig.js",
  "./js/more/cheats.js",
  "./js/more/pabson.js",
  "./js/more/optional.js",
  "./js/more/expand.js",
  "./js/more/tables.js",
  "./js/sounds.js",
  "./js/narration.js",
  "./js/kids.js",
  "./js/app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./sounds/bee.mp3",
  "./sounds/cat.mp3",
  "./sounds/cow.mp3",
  "./sounds/dog.mp3",
  "./sounds/duck.mp3",
  "./sounds/elephant.mp3",
  "./sounds/frog.mp3",
  "./sounds/goat.mp3",
  "./sounds/horse.mp3",
  "./sounds/lion.mp3",
  "./sounds/monkey.mp3",
  "./sounds/owl.mp3",
  "./sounds/pig.mp3",
  "./sounds/rooster.mp3",
  "./sounds/sheep.mp3",
  "./sounds/turkey.mp3",
  "./sounds/wolf.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.status === 200) {
        const copy = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html")))
  );
});
