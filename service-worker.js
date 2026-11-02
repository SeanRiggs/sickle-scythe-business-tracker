const CACHE='ss-v56';
const ASSETS=['./','index.html','styles.css','app-config.js','tracker-v56.js','manifest.webmanifest','logo-placeholder.svg','partner-sales-template.csv'];
const ROOT=new URL('./',self.location.href);
const ALLOWED=new Set(ASSETS.map(p=>new URL(p,ROOT).pathname));
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('ss-v')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);
 // Never cache Microsoft tokens, Graph content, attachments, or OAuth callbacks.
 if(event.request.method!=='GET'||url.origin!==ROOT.origin||!ALLOWED.has(url.pathname)||url.searchParams.has('code')||url.searchParams.has('error'))return;
 const key=new URL(url.pathname,ROOT.origin).href;
 event.respondWith(fetch(event.request).then(response=>{
   if(response.ok&&response.type==='basic')event.waitUntil(caches.open(CACHE).then(c=>c.put(key,response.clone())));
   return response;
 }).catch(()=>caches.match(key).then(r=>r||Response.error())));
});
