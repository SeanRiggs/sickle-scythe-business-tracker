const {chromium,webkit}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const http=require('node:http');
const path=require('node:path');
const engine=process.env.BROWSER_ENGINE||'chromium';
const offlineMode=process.env.NETWORK_MODE||'driver';
const results=`test-results/${engine}`;
fs.mkdirSync(results,{recursive:true});
let networkDown=false;
let legacy=true,remote,etag='example-v1',puts=0,fail=0;const requests=[];
// Actual v5.2 worker, with a fictional shell in place of the historical application.
// This verifies cached-shell replacement, not historical data migrations.
const legacyHTML='<html><body>Example legacy shell<script src="tracker-v52.js"></script><script>navigator.serviceWorker.register("service-worker.js?v=52")</script></body></html>';
const server=http.createServer((req,res)=>{
 const name=new URL(req.url,'http://localhost').pathname;
 if(networkDown){req.socket.destroy();return;}
 res.setHeader('Cache-Control','no-store');
 if(name.startsWith('/__mock-graph/')){
  requests.push({method:req.method,url:req.url});res.setHeader('Content-Type','application/json');
  if(fail){res.writeHead(fail);return res.end('Synthetic provider failure');}
  if(req.method==='PUT'){
   if(req.headers['if-match']!==etag){res.writeHead(412);return res.end('Synthetic conflict');}
   let body='';req.on('data',chunk=>body+=chunk);req.on('end',()=>{remote=JSON.parse(body);etag='example-v'+(++puts+1);res.end(JSON.stringify({id:'example-file',eTag:etag}));});return;
  }
  return res.end(JSON.stringify(name.endsWith('/content')?remote:{id:'example-file',eTag:etag}));
 }
 if(name==='/service-worker.js'){
  res.setHeader('Content-Type','application/javascript');
  return res.end(fs.readFileSync(legacy?'tests/legacy-worker.fixture.js':'service-worker.js'));
 }
 if(legacy&&(name==='/'||name==='/index.html')){res.setHeader('Content-Type','text/html');return res.end(legacyHTML);}
 if(name==='/tracker-v52.js'){res.setHeader('Content-Type','application/javascript');return res.end('// Fictional old shell; no production code or records.');}
 const file=path.join(process.cwd(),name==='/'?'index.html':name);
 if(!file.startsWith(process.cwd()+path.sep)){res.writeHead(403).end();return;}
 try{res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404).end();}
});
const fixture={schemaVersion:4,updatedAt:null,orders:[],sales:[{id:'INV-EXAMPLE',customer:'Example Customer',productId:'p1',qty:1,unitPrice:290,date:''}],payments:[{id:'PAY-EXAMPLE',saleId:'INV-EXAMPLE',amount:100,method:'Cash',date:'',reference:'Original example'}],expenses:[],claims:[],adjustments:[],history:[],reviewQueue:[],settings:{lowStock:{p1:5},businessNote:'Example setting'},futureField:{preserve:true}};
(async()=>{
 await new Promise(r=>server.listen(8766,'127.0.0.1',r));
 const browser=await ({chromium,webkit}[engine]).launch({headless:true});
 const context=await browser.newContext({serviceWorkers:'allow'});
 remote=structuredClone(fixture);const errors=[];
 // WebKit service-worker requests can bypass Playwright routing. Rewrite Graph at
 // the page fetch boundary to this local server before any app code executes.
 await context.addInitScript(mode=>{
  if(mode==='server')Object.defineProperty(navigator,'onLine',{get:()=>!localStorage.getItem('__testOffline')});
  const nativeFetch=window.fetch.bind(window);
  window.fetch=(input,options)=>{
   const url=new URL(typeof input==='string'?input:input.url,location.href);
   if(url.origin==='https://graph.microsoft.com')return nativeFetch(location.origin+'/__mock-graph'+url.pathname+url.search,options);
   if(url.origin!==location.origin)throw Error('External requests forbidden in isolated acceptance tests');
   return nativeFetch(input,options);
  };
 },offlineMode);
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.type()==='confirm'?d.accept():d.dismiss());
 try{
  await page.goto('http://127.0.0.1:8766/');
  await page.waitForFunction(async()=>!!navigator.serviceWorker.controller&&(await caches.keys()).includes('ss-v52'));
  await page.evaluate(data=>localStorage.setItem('ss-v4-db',JSON.stringify(data)),fixture);
  legacy=false;
  await page.goto('http://127.0.0.1:8766/?v=531-2');
  await page.waitForFunction(async()=>typeof BUILD!=='undefined'&&BUILD==='5.3.1'&&navigator.serviceWorker.controller?.scriptURL.endsWith('?v=531-2')&&(await caches.keys()).includes('ss-v531-2')&&!(await caches.keys()).includes('ss-v52'));
  assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem(LOCAL))),fixture);
  await page.evaluate(()=>localStorage.setItem('ss_tokens',JSON.stringify({access_token:'fictional-token',expires_at:Date.now()+3600000})));
  await page.reload();await page.waitForFunction(()=>cloudHealthy&&syncState==='Cloud current');assert.equal(puts,0);
  fs.writeFileSync(`${results}/before-offline.json`,JSON.stringify(await page.evaluate(async()=>({controller:navigator.serviceWorker.controller?.scriptURL,cacheKeys:(await(await caches.open('ss-v531-2')).keys()).map(r=>r.url),worker:(await navigator.serviceWorker.ready).active?.state})),null,2));
  if(offlineMode==='server'){networkDown=true;await page.evaluate(()=>{localStorage.setItem('__testOffline','1');window.dispatchEvent(new Event('offline'));});}else await context.setOffline(true);
  await page.waitForFunction(()=>navigator.onLine===false);
  await page.getByText('ONEDRIVE IS NOT CONFIRMED CONNECTED',{exact:true}).waitFor();
  await page.getByRole('button',{name:'Sales & Payments',exact:true}).click();
  await page.getByRole('button',{name:'Edit Payment',exact:true}).click();
  await page.getByRole('dialog').getByLabel('Amount',{exact:true}).fill('500');
  await page.getByRole('button',{name:'Save Payment',exact:true}).click();
  assert.equal(await page.evaluate(()=>db.payments[0].amount),500);assert.equal(puts,0);
  await page.reload();await page.waitForFunction(()=>typeof BUILD!=='undefined'&&BUILD==='5.3.1');
  assert.equal(await page.evaluate(()=>db.payments[0].amount),500);
  assert.equal(await page.evaluate(()=>customerCredit('Example Customer')),210);
  assert.equal(await page.evaluate(()=>db.settings.businessNote),'Example setting');
  assert.equal(await page.evaluate(()=>db.futureField.preserve),true);
  if(offlineMode==='server'){networkDown=false;await page.evaluate(()=>{localStorage.removeItem('__testOffline');window.dispatchEvent(new Event('online'));});}else await context.setOffline(false);await page.waitForFunction(()=>navigator.onLine);
  await page.getByRole('button',{name:'Retry Sync',exact:true}).click();
  await page.waitForFunction(()=>cloudHealthy&&syncState==='Cloud saved');
  assert.equal(remote.payments[0].amount,500);assert.equal(puts,1);
  fail=429;assert.equal(await page.evaluate(()=>cloudSave(true)),false);
  assert.equal(await page.evaluate(()=>cloudHealthy),false);assert.equal(puts,1);
  fail=0;assert.equal(await page.evaluate(()=>cloudSave(true)),true);assert.equal(puts,1);
  const keys=await page.evaluate(async()=>{const c=await caches.open('ss-v531-2');return (await c.keys()).map(r=>r.url);});
  assert(keys.every(k=>new URL(k).hostname==='127.0.0.1'&&!/business-data|graph.microsoft|tracker-v52/.test(k)));
  await page.screenshot({path:`${results}/upgrade-recovery.png`,fullPage:true});
  assert.deepEqual(errors,[]);
  fs.writeFileSync(`${results}/acceptance-report.json`,JSON.stringify({passed:true,engine,offlineMode,physicalDeviceVerified:false,syntheticOnly:true,liveMicrosoftRequests:0,legacyWorkerBaseline:'fd65f76ccff9cf5637ebccae5823d6783037b3bd',legacyShell:'fictional',cacheUpgrade:true,oldCacheRemoved:true,unchangedDataOnUpgrade:true,offlinePaymentEdit:true,offlineReload:true,settingsRetention:true,unknownFieldsRetained:true,reconnectUpload:true,rateLimitRecovery:true,conditionalPuts:puts,browserErrors:errors,cacheKeys:keys,mockedRequests:requests.length},null,2));
 }catch(e){await page.screenshot({path:`${results}/acceptance-failure.png`,fullPage:true}).catch(()=>{});fs.writeFileSync(`${results}/acceptance-failure.txt`,String(e)+'\n'+await page.locator('body').innerText());throw e;}
 finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);server.close();process.exitCode=1;});
