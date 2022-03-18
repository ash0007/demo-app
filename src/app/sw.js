debugger;
self.addEventListener("install", async e => {
    debugger;
    console.log('sw installed');
    var cache = await caches.open("pwa-static");
    cache.addAll([
        "./",
        "./main.js",
        "./style.css",
        "./noconnection.json",
        "./images/noconnection.png"
    ]);
});

self.addEventListener("activate", () => {
    console.log("activated");
});

self.addEventListener("fetch", function(event) {
    const req = event.request;
    const url = new URL(req.url);
    if(url.origin === location.origin) {
        event.responseWith(cacheFirst(req));
    } else {
        event.responseWith(networkFirst(req));
    }
});

async function cacheFirst(req) {
    return await caches.match(req) || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open("pwa-dynamic");
    try {
        const res = await fetch(req);
        cache.put(req, res.clone);
        return res;
    } catch(e) {
        const cachedResponse = await cache.match(req);
        return cachedResponse || await caches.match('./noconnection.json');
    }
}