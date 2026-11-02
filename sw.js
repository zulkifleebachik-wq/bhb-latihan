// Simpan fail laman supaya masih boleh dibuka ketika talian lemah. Tukar VERSI pada setiap terbitan.
const VERSI = "bhb-latihan-17", FAIL = ["./", "index.html", "style.css", "kosakata.js", "app.js", "manifest.json", "asset/logo.png", "asset/Lora_400Regular.ttf", "asset/Lora_400Regular_Italic.ttf", "asset/Lora_600SemiBold.ttf", "asset/Lora_700Bold.ttf", "asset/scheherazade-new-arabic-400-normal.woff2", "asset/hafs.woff2"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(FAIL))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSI).map(x => caches.delete(x)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(fetch(e.request).then(r => { const s = r.clone(); caches.open(VERSI).then(c => c.put(e.request, s)); return r; }).catch(() => caches.match(e.request)));
});
