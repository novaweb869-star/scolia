var C="scolia-v1";
self.addEventListener("install",function(e){self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())});
self.addEventListener("fetch",function(e){
  var r=e.request,u=new URL(r.url);
  if(r.method!=="GET")return;
  var ok=u.origin===location.origin||u.hostname==="cdn.jsdelivr.net";
  if(!ok)return;
  e.respondWith(fetch(r).then(function(res){
    var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)});return res
  }).catch(function(){return caches.match(r)}));
});
