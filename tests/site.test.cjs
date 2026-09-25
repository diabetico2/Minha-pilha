const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const context = {window:{}};
const dataFiles = ['data.js','expanded-data.js','deep-expansions.js','volume-audit.js','library-wave-3.js','library-wave-4.js','library-wave-5.js','library-wave-6.js'];
for (const file of [...dataFiles,'catalogue-covers.js']) vm.runInNewContext(read(`assets/data/${file}`),context);
const orders = [...context.window.COMIC_ORDERS,...context.window.EXPANDED_ORDERS];
const covers = context.window.PILHA_CATALOGUE_COVERS;
assert.equal(orders.length,109);
assert.deepEqual(Object.keys(covers).sort(),orders.map(order=>order.id).sort());
const images = new Set();
for (const order of orders) {
  const cover = covers[order.id];
  assert.match(cover.url,/^assets\/images\/covers\/[a-z0-9-]+\.(jpg|png|webp)$/);
  assert.match(cover.source,/^https:\/\//); assert.match(cover.originalUrl,/^https:\/\//); assert.ok(cover.credit);
  const bytes = fs.readFileSync(path.join(root,cover.url));
  assert.ok(bytes.length>1000 && bytes.length<5*1024*1024,order.id);
  const hash = createHash('sha256').update(bytes).digest('hex').slice(0,12);
  assert.ok(cover.url.includes(`-${hash}.`),order.id);
  const isJpeg = bytes[0]===255 && bytes[1]===216 && bytes[2]===255;
  const isPng = bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]));
  const isWebp = bytes.toString('ascii',0,4)==='RIFF' && bytes.toString('ascii',8,12)==='WEBP';
  assert.ok(isJpeg||isPng||isWebp,order.id);
  assert.ok(cover.url.endsWith(isJpeg?'.jpg':isPng?'.png':'.webp'),order.id);
  images.add(path.basename(cover.url));
}
assert.deepEqual(fs.readdirSync(path.join(root,'assets/images/covers')).sort(),[...images].sort());
console.log('PASS all 109 lists have local images with valid signatures, content hashes and source credits; no orphan images');

const html=read('index.html'),sw=read('sw.js');
const references=[...html.matchAll(/(?:src|href)="([^"#]+)"/g)].map(match=>match[1]).filter(value=>!/^https?:/.test(value));
for(const reference of references){assert.ok(fs.existsSync(path.join(root,reference.split('?')[0])),reference);if(/\.(js|css)\?/.test(reference))assert.ok(sw.includes(`'./${reference}'`),reference);}
const sdk=read('assets/js/cloud-sync.js').match(/import\('([^']+)'\)/)[1];
assert.ok(fs.existsSync(path.resolve(root,'assets/js',sdk.split('?')[0])));
assert.ok(sw.includes(`'./${path.posix.normalize('assets/js/'+sdk)}'`));
const icon=JSON.parse(read('manifest.webmanifest')).icons[0].src;
assert.ok(fs.existsSync(path.join(root,icon)));assert.ok(sw.includes(`'./${icon}'`));
assert.match(read('assets/js/app.js'),/register\('\.\/sw\.js'/);
for(const [,reference] of sw.matchAll(/'\.\/([^']+)'/g))assert.ok(fs.existsSync(path.join(root,reference.split('?')[0])),reference);
for(const [,link] of read('README.md').matchAll(/\]\(([^)]+)\)/g))if(!link.startsWith('https:'))assert.ok(fs.existsSync(path.join(root,link)),link);
assert.equal(fs.readdirSync(root).filter(file=>/\.(js|css)$/.test(file)).join(','),'sw.js');
console.log('PASS HTML, SDK import, manifest, documentation and offline cache point to the organized files');

function workerTest({cached=null,status=200}={}) {
  const handlers={},stored=[],calls=[];
  const response={ok:status===200,status,clone(){return this;}};
  const cache={match:async()=>cached,put:async(key,value)=>stored.push(value)};
  const c={URL,Promise,Error,caches:{open:async()=>cache,match:async()=>cached},fetch:async request=>{calls.push(request);return response;},self:{location:{origin:'https://example.test'},addEventListener:(type,fn)=>handlers[type]=fn}};
  vm.runInNewContext(sw,c);
  const request=url=>new Promise(resolve=>handlers.fetch({request:{method:'GET',url,mode:'cors'},respondWith:resolve}));
  return {request,stored,calls,response};
}
(async()=>{
  const cached={ok:true,status:200},a=workerTest({cached});
  assert.equal(await a.request('https://example.test/Minha-pilha/assets/images/covers/test-hash.jpg'),cached);assert.equal(a.calls.length,0);
  const b=workerTest();assert.equal(await b.request('https://example.test/Minha-pilha/assets/images/covers/test-hash.jpg'),b.response);assert.equal(b.stored.length,1);
  const c=workerTest({cached,status:404});assert.equal(await c.request('https://example.test/Minha-pilha/assets/js/app.js?v=16'),cached);assert.equal(c.stored.length,0);
  const d=workerTest({status:404});await d.request('https://example.test/Minha-pilha/assets/images/covers/missing.jpg');assert.equal(d.stored.length,0);
  console.log('PASS viewed covers work from cache and failed responses never replace valid cached assets');
})().catch(error=>{console.error(error);process.exitCode=1;});
