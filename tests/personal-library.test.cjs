const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { randomUUID } = require('node:crypto');
const model = require('../assets/js/personal-library.js');
const source = fs.readFileSync(require('node:path').join(__dirname, '../assets/js/app.js'), 'utf8');
const clone = value => JSON.parse(JSON.stringify(value));
const makeId = prefix => `${prefix}-${randomUUID()}`;
const fixture = () => ({ id: makeId('personal'), title: 'Berserk (minha ordem)', kind: 'manga', description: 'Minha seleção', items: [1,2,3].map(n => ({ id: makeId('item'), title: `Volume ${n}`, details: '' })) });
let passed = 0;
function test(name, run) { run(); passed++; console.log(`PASS ${name}`); }
function bridge() {
  const builtInOrders=[{id:'batman', title:'Batman', sections:[{key:4, title:'Fase', items:[{title:'Batman #1'}]}]}];
  const c={window:{PilhaReadingModel:require('../assets/js/reading-model.js'),PilhaPersonal:model,PilhaProfileModel:require('../assets/js/profile-model.js')}, builtInOrders, orders:builtInOrders, accountId:null,accountMemory:new Map(),selected:'batman',applyingRemote:false,
    $:()=>({open:false,value:''}),load:()=>c.blankState(),showView(){},render(){},save(){},toast(){},localStorage:{getItem:()=>null},
    keyFor:(order,section,item)=>`${order}:${section}:${item}`,selectOrder:id=>{c.selected=id}};
  vm.createContext(c);
  vm.runInContext(source.slice(source.indexOf('  function refreshOrders('),source.indexOf('  function ensureCompletionDates(')),c);
  c.state=c.blankState();
  vm.runInContext(source.slice(source.indexOf('  function counts('),source.indexOf('  function activeOrders(')),c);
  const start=source.indexOf('  window.PilhaApp =');vm.runInContext(source.slice(start,source.indexOf('\n  render();',start)),c);
  return c;
}
test('shared JSON contains content only and importing always creates an independent copy',()=>{
  const list=fixture();list.notes={secret:'private'};list.read={private:true};list.uid='owner';
  const exported=model.share(list), imported=model.importShare(exported,makeId), again=model.importShare(exported,makeId);
  assert.deepEqual(Object.keys(exported.list),['title','kind','description','items']);
  assert.deepEqual(Object.keys(exported.list.items[0]),['title','details']);
  assert.equal(JSON.stringify(exported).includes('private'),false);
  assert.equal(imported.title,list.title);assert.notEqual(imported.id,list.id);assert.notEqual(imported.id,again.id);
  assert.notEqual(imported.items[0].id,list.items[0].id);
});
test('catalogue namespace, shape, version, count and length limits reject malformed imports',()=>{
  const list=fixture();
  for (const bad of [null,[],{}, {...list,id:'batman'}, {...list,kind:'script'}, {...list,items:[]}, {...list,items:[list.items[0],list.items[0]]}, {...list,title:' '}, {...list,title:'x'.repeat(161)}, {...list,items:Array(501).fill(list.items[0])}]) assert.throws(()=>model.validate(bad));
  assert.throws(()=>model.validateMap({batman:model.serialize(list)}));
  assert.throws(()=>model.validateMap(null));assert.throws(()=>model.parse(model.serialize(list),makeId('personal')));
  assert.throws(()=>model.importShare({schema:'minha-pilha-progress',progress:{}},makeId));
  assert.throws(()=>model.importShare({...model.share(list),version:2},makeId));
  assert.throws(()=>model.validateMap(JSON.parse('{"__proto__":"test"}')));
});
test('personal create/edit/reorder preserves item marks, notes and reading point; removal cleans only deleted items',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture();
  c.state.read['batman:4:0']=true;c.state.notes['batman:4:0']='Built in note';
  const builtin=JSON.stringify(c.builtInOrders);app.personal.save(list);
  const firstKey=`${list.id}:personal:${list.items[0].id}`, secondKey=`${list.id}:personal:${list.items[1].id}`;
  c.state.read[firstKey]=true;c.state.notes[firstKey]='Personal note';c.state.completedAt[firstKey]='2026-09-24T00:00:00Z';c.state.current[list.id]=firstKey;
  const original=app.personal.get(list.id);list.items.reverse();list.items[2].title='Volume um';app.personal.save(list,original);
  const order=c.orders.find(order=>order.id===list.id), entries=c.entriesFor(order);
  assert.equal(entries[2].key,firstKey);assert.equal(c.state.read[firstKey],true);assert.equal(c.state.notes[firstKey],'Personal note');
  assert.equal(c.currentText(order),'Volume um');assert.equal(c.counts(order).read,1);
  c.state.read[secondKey]=true;
  const beforeRemoval=app.personal.get(list.id);list.items=list.items.filter(item=>item.id!==firstKey.split(':').at(-1));app.personal.save(list,beforeRemoval);
  assert.equal(c.state.read[firstKey],undefined);assert.equal(c.state.notes[firstKey],undefined);assert.equal(c.state.completedAt[firstKey],undefined);assert.equal(c.state.current[list.id],undefined);assert.equal(c.state.read[secondKey],true);
  app.personal.remove(list.id,app.personal.get(list.id));
  assert.equal(c.state.customOrders[list.id],undefined);assert.equal(c.state.read[secondKey],undefined);assert.equal(c.state.read['batman:4:0'],true);assert.equal(c.state.notes['batman:4:0'],'Built in note');
  assert.equal(JSON.stringify(c.builtInOrders),builtin);
});
test('built-in catalogue cannot be edited or deleted through the personal bridge',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture();assert.throws(()=>app.personal.save({...list,id:'batman'}));assert.throws(()=>app.personal.remove('batman',null));assert.equal(c.orders.length,1);
});

test('covers survive sharing and independent import without exposing profile or progress',()=>{
  const list=fixture();list.cover='data:image/jpeg;base64,AAAA';list.profile={displayName:'private'};
  const shared=model.share(list),copy=model.importShare(shared,makeId);
  assert.equal(copy.cover,list.cover);assert.notEqual(copy.id,list.id);assert.equal(JSON.stringify(shared).includes('private'),false);
  for(const cover of ['https://example.com/tracker.png','data:image/svg+xml;base64,AAAA','javascript:alert(1)','data:image/png;base64,'+'A'.repeat(100000)])assert.throws(()=>model.validate({...list,cover}));
  const c=bridge(),app=c.window.PilhaApp;app.personal.save(list);const key=`${list.id}:personal:${list.items[0].id}`;c.state.read[key]=true;
  app.personal.save({...list,cover:'data:image/webp;base64,BBBB'},app.personal.get(list.id));assert.equal(c.state.read[key],true);assert.equal(model.parse(app.personal.get(list.id)).cover,'data:image/webp;base64,BBBB');
});

test('profiles validate, back up and switch accounts independently',()=>{
  const c=bridge(),app=c.window.PilhaApp,profile={displayName:'Leitora',bio:'HQs e mangás',avatar:'data:image/png;base64,AAAA'};
  assert.throws(()=>app.saveProfile(profile),/conta/);app.setAccount('alice');app.saveProfile(profile);
  assert.deepEqual(clone(app.validate(app.getProgress()).profile),profile);
  app.setAccount('bob');assert.deepEqual(clone(app.getProfile()),{});app.saveProfile({displayName:'Outro'});
  app.setAccount('alice');assert.deepEqual(clone(app.getProfile()),profile);app.setAccount(null);assert.deepEqual(clone(app.getProfile()),{});
  for(const invalid of [null,[],{uid:'alice'},{displayName:'a'.repeat(61)},{bio:2},{avatar:'https://example.com/image.jpg'},{avatar:'data:image/svg+xml;base64,AAAA'},JSON.parse('{"__proto__":"bad"}')])assert.throws(()=>app.validate({read:{},profile:invalid}));
  assert.deepEqual(clone(app.validate({read:{}}).profile),{});
});
test('stale edits and deletions are refused after another device changes or deletes a list',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture();app.personal.save(list);const base=app.personal.get(list.id);
  app.personal.save({...list,title:'Other device'},base);
  assert.throws(()=>app.personal.save(list,base),/outro dispositivo/);assert.throws(()=>app.personal.remove(list.id,base),/mudou/);
  const current=app.personal.get(list.id);app.personal.remove(list.id,current);assert.throws(()=>app.personal.save(list,current));
});
test('legacy and new backups validate, personal lists follow the signed-in account only',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture();
  assert.deepEqual(clone(app.validate({read:{}}).customOrders),{});
  app.personal.save(list);const backup=app.getProgress();assert.equal(app.validate(clone(backup)).customOrders[list.id],backup.customOrders[list.id]);
  app.setAccount('alice');assert.equal(c.orders.length,1);app.applyCloud(backup);assert.equal(c.orders.length,2);
  app.setAccount('bob');assert.equal(c.orders.length,1);assert.deepEqual(clone(app.getProgress().customOrders),{});
  app.setAccount('alice');assert.equal(c.orders.length,2);app.setAccount(null);assert.equal(c.orders.length,2);
});
test('cache manifest includes each versioned runtime and stylesheet',()=>{
  const path=require('node:path'),root=path.join(__dirname,'..');
  const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
  const files=[...html.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css)(?:\?[^"#]+)?)"/g)].map(match=>match[1]);
  for(const file of files){assert.ok(sw.includes(`'./${file}'`),file);assert.ok(fs.existsSync(path.join(root,file.split('?')[0])),file);}
});
test('trash restores the list, reading dates, notes, ratings and collections without touching other lists',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture();app.personal.save(list);
  const key=`${list.id}:personal:${list.items[0].id}`;
  c.state.read[key]=true;c.state.notes[key]='Minha anotação';c.state.ratings[key]=5;c.state.completedAt[key]='2026-09-22T12:00:00Z';c.state.current[list.id]=key;c.state.favoriteOrders[list.id]=true;
  c.state.notes['batman:4:0']='Preservar';
  const before=app.personal.get(list.id);app.personal.remove(list.id,before);
  const removed=app.getProgress(),record=removed.trash[list.id];assert.ok(record);assert.equal(removed.ratings[key],undefined);
  assert.doesNotThrow(()=>app.validate(removed));
  app.reading.restore(list.id,record);
  assert.equal(app.personal.get(list.id),before);assert.equal(c.state.read[key],true);assert.equal(c.state.notes[key],'Minha anotação');assert.equal(c.state.ratings[key],5);assert.equal(c.state.completedAt[key],'2026-09-22T12:00:00Z');assert.equal(c.state.current[list.id],key);assert.equal(c.state.favoriteOrders[list.id],true);assert.equal(c.state.notes['batman:4:0'],'Preservar');
  assert.equal(c.state.trash[list.id],undefined);assert.throws(()=>app.reading.restore(list.id,record));
  app.personal.remove(list.id,before);app.reading.purge(list.id,c.state.trash[list.id]);assert.equal(c.state.trash[list.id],undefined);
});
test('monthly goals and trash remain isolated by account and older backups get empty maps',()=>{
  const c=bridge(),app=c.window.PilhaApp;
  app.setAccount('alice');app.reading.saveGoal('2026-09',20);assert.equal(app.getProgress().goals['2026-09'],20);
  app.setAccount('bob');assert.deepEqual(clone(app.getProgress().goals),{});app.setAccount('alice');assert.equal(app.getProgress().goals['2026-09'],20);
  assert.throws(()=>app.reading.saveGoal('2026-13',5));assert.throws(()=>app.reading.saveGoal('2026-09',2.5));app.reading.saveGoal('2026-09',null);assert.deepEqual(clone(app.getProgress().goals),{});
  const legacy=app.validate({read:{}});for(const field of ['ratings','goals','trash'])assert.deepEqual(clone(legacy[field]),{});
});
test('tags and rereads back up, survive edits and trash, reject stale writes and stay private',()=>{
  const c=bridge(),app=c.window.PilhaApp,list=fixture(),reading=c.window.PilhaReadingModel;
  app.setAccount('alice');app.personal.save(list);const key=`${list.id}:personal:${list.items[0].id}`,sid='session-'+randomUUID();
  c.state.read[key]=true;c.state.completedAt[key]='2026-08-20T12:00:00Z';c.state.notes[key]='first note';c.state.ratings[key]=3;
  app.saveTags('batman',['suspense'],null);app.saveTags(list.id,['favoritos'],null);
  app.reading.saveSession(sid,{key,date:'2026-09-29T12:00:00Z',rating:5,note:'second note'});
  const history=reading.history(app.reading.entries(),app.getProgress());assert.equal(history.length,2);assert.equal(history[0].rating,5);assert.equal(history[1].note,'first note');
  const backup=app.getProgress();assert.doesNotThrow(()=>app.validate(backup));assert.throws(()=>app.saveTags('batman',['other'],null),/mudaram/);assert.throws(()=>app.reading.saveSession(sid,null),/mudou/);
  const shared=model.share(model.parse(app.personal.get(list.id)));assert.equal(JSON.stringify(shared).includes('second note'),false);assert.equal(JSON.stringify(shared).includes('favoritos'),false);
  app.personal.remove(list.id,app.personal.get(list.id));assert.equal(c.state.sessions[sid],undefined);assert.equal(c.state.tags[list.id],undefined);assert.ok(c.state.tags.batman);
  app.reading.restore(list.id,c.state.trash[list.id]);assert.equal(c.state.sessions[sid],backup.sessions[sid]);assert.equal(c.state.tags[list.id],backup.tags[list.id]);
  app.setAccount('bob');assert.deepEqual(clone(c.state.sessions),{});assert.deepEqual(clone(c.state.tags),{});app.setAccount('alice');assert.ok(c.state.sessions[sid]);
  list.items.shift();app.personal.save(list,app.personal.get(list.id));assert.equal(c.state.sessions[sid],undefined);
  for(const field of ['sessions','tags'])assert.deepEqual(clone(app.validate({read:{}})[field]),{});
});
console.log(`${passed} personal library tests passed`);
