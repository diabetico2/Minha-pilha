const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = { window: {} };
vm.createContext(context);
const scripts = [...read('index.html').matchAll(/src="(assets\/data\/[^?]+)\?/g)].map(match => match[1]);
const translationFile = 'assets/data/catalogue-pt-br.js';
assert.ok(scripts.includes(translationFile));
assert.ok(scripts.indexOf(translationFile) > scripts.indexOf('assets/data/library-wave-6.js'));
for (const file of scripts.filter(file => file !== translationFile)) vm.runInContext(read(file), context);
const original = JSON.parse(JSON.stringify(context.window.COMIC_ORDERS));
const expanded = JSON.stringify(context.window.EXPANDED_ORDERS);
// Personal content must remain unchanged even when it matches a catalogue sentence.
context.window.personalOrder = { title: 'My reading list', details: original[0].sections[0].items[0].details };
const personal = JSON.stringify(context.window.personalOrder);
vm.runInContext(read(translationFile), context);
const localized = JSON.parse(JSON.stringify(context.window.COMIC_ORDERS));
assert.equal(JSON.stringify(context.window.EXPANDED_ORDERS), expanded);
assert.equal(JSON.stringify(context.window.personalOrder), personal);

let translatedDetails = 0;
const titles = [];
function compare(a, b, location) {
  assert.deepEqual(Object.keys(a), Object.keys(b), location);
  for (const key of Object.keys(a)) {
    if (a[key] && typeof a[key] === 'object') compare(a[key], b[key], `${location}.${key}`);
    else if (a[key] !== b[key]) {
      assert.ok(['title', 'details'].includes(key), `Structural change at ${location}.${key}`);
      const issueNumbers = text => (text.match(/#[0-9]+(?:[.][0-9]+)?/g) || []).sort();
      assert.deepEqual(issueNumbers(a[key]), issueNumbers(b[key]), `Issue numbers at ${location}.${key}`);
      if (key === 'details') translatedDetails++;
    }
  }
  if (a.companions) titles.push([a.title, b.title]);
}
compare(original, localized, 'orders');
assert.ok(translatedDetails > 1400);
// Titles used to find books/runs must remain searchable in their original form.
for (const title of ['Batman: Year One', 'Batman: The Long Halloween', 'Tales of the Batman: J.H. Williams III',
  'Batman: The Killing Joke', 'Batman: Hush', 'Spider-Man: One More Day',
  'Batgirl and the Birds of Prey Vol. 1: Who is Oracle?', 'Batman/Superman Vol. 1: Who are the Secret Six?',
  'Batwoman Vol. 4: This Blood is Thick', 'New Teen Titans, The: Who is Donna Troy?']) {
  const matches = titles.filter(([before]) => before === title);
  assert.ok(matches.length, `Missing fixture: ${title}`);
  for (const [, after] of matches) assert.equal(after, title);
}
const yearOne = localized[0].sections[0].items[0];
assert.match(yearOne.details, /^Reúne Batman #404-407/);
assert.match(yearOne.companions[0].details, /Complemento de Year One/);
assert.match(localized[0].sections[0].title, /^Ponto de partida/);
const allText = JSON.stringify(localized);
assert.doesNotMatch(allText, /\bCollects\b|have not been collected yet|are part of|takes place|You can read here|The story continues/);
assert.match(allText, /Não leia Annual #1 neste ponto/);
assert.match(allText, /Pare após #307/);
vm.runInContext(read(translationFile), context);
assert.deepEqual(JSON.parse(JSON.stringify(context.window.COMIC_ORDERS)), localized, 'Translation must be idempotent');
console.log(`PASS ${translatedDetails} descriptions translated; reading structure, issue numbers, edition titles and personal content preserved`);
