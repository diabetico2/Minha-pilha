const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.resolve(__dirname, '../assets/js/media-tools.js'), 'utf8'), context);
const layout = context.window.PilhaMedia.avatarLayout;

assert.deepEqual({ ...layout({ naturalWidth: 400, naturalHeight: 200 }, {}, 200) },
  { width: 400, height: 200, left: -100, top: 0 });
assert.deepEqual({ ...layout({ naturalWidth: 400, naturalHeight: 200 }, { x: 1 }, 200) },
  { width: 400, height: 200, left: 0, top: 0 });
assert.deepEqual({ ...layout({ naturalWidth: 200, naturalHeight: 400 }, { y: -1 }, 200) },
  { width: 200, height: 400, left: 0, top: -200 });
assert.deepEqual({ ...layout({ naturalWidth: 200, naturalHeight: 200 }, { zoom: 2, x: -1, y: 1 }, 200) },
  { width: 400, height: 400, left: -200, top: 0 });
assert.deepEqual({ ...layout({ naturalWidth: 200, naturalHeight: 100 }, { zoom: 99, x: -99, y: 99 }, 200) },
  { width: 1200, height: 600, left: -1000, top: 0 });
assert.throws(() => layout({ naturalWidth: 0, naturalHeight: 100 }), /imagem/);

console.log('PASS avatar crop keeps the frame filled and constrains zoom and positioning');
