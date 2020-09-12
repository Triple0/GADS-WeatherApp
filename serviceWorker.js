const weatherAppPWA = "dev-weather-site-v1";
const assets = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/scripts.js"
  ];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(weatherAppPWA).then(cache => {
      cache.addAll(assets);
    })
  );
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});