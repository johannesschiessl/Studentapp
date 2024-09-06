self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("translations-cache").then((cache) => {
      return cache.addAll(["/dictionaries/en.json", "/dictionaries/de.json"]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
