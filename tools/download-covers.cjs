// Run explicitly to refresh catalogue images. Normal use/tests need no network.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const indexFile = path.join(root, 'assets/data/catalogue-covers.js');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(indexFile, 'utf8'), context);
const covers = context.window.PILHA_CATALOGUE_COVERS;
const entries = Object.entries(covers);
let cursor = 0;
function extension(buffer) {
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'jpg';
  if (buffer.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) return 'png';
  if (buffer.toString('ascii',0,4) === 'RIFF' && buffer.toString('ascii',8,12) === 'WEBP') return 'webp';
  throw Error('Image bytes are not JPEG, PNG or WebP');
}
async function worker() {
  while (cursor < entries.length) {
    const [id,cover] = entries[cursor++];
    const originalUrl = cover.originalUrl || cover.url;
    if (!originalUrl.startsWith('https://')) throw Error(`Missing HTTPS image source: ${id}`);
    const response = await fetch(originalUrl, { signal: AbortSignal.timeout(30000) });
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw Error(`Invalid image response ${response.status}: ${id}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 1000 || buffer.length > 5*1024*1024) throw Error(`Unexpected image size: ${id}`);
    const hash = createHash('sha256').update(buffer).digest('hex').slice(0,12);
    const name = `${id.replace('-reading-order','').slice(0,55)}-${hash}.${extension(buffer)}`;
    const url = `assets/images/covers/${name}`;
    fs.writeFileSync(path.join(root,url),buffer);
    covers[id] = { ...cover, url, originalUrl };
  }
}
(async () => {
  fs.mkdirSync(path.join(root,'assets/images/covers'),{recursive:true});
  await Promise.all([worker(),worker(),worker(),worker()]);
  fs.writeFileSync(indexFile,'// Local catalogue images; original URLs and source credits are retained.\nwindow.PILHA_CATALOGUE_COVERS = '+JSON.stringify(covers,null,2)+';\n');
  console.log(`Saved ${entries.length} catalogue covers. Run npm test to check references and stale image files.`);
})().catch(error => { console.error(error.message); process.exitCode=1; });
