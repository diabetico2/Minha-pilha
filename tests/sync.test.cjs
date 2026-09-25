const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const model = require('../assets/js/sync-model.js');
const personal = require('../assets/js/personal-library.js');
const profileModel = require('../assets/js/profile-model.js');
const makeList = () => ({ id: `personal-${require('node:crypto').randomUUID()}`, title: 'Mangá pessoal', kind: 'manga', description: '', items: [{ id: `item-${require('node:crypto').randomUUID()}`, title: 'Volume 1', details: '' }] });
const clone = value => JSON.parse(JSON.stringify(value));
const empty = () => Object.fromEntries(model.fields.map(field => [field, {}]));
let passed = 0;
const test = async (name, fn) => { await fn(); passed++; console.log(`PASS ${name}`); };
const turn = () => new Promise(resolve => setImmediate(resolve));

function fakeServer() {
  const data = new Map(), listeners = new Map();
  return { data, listeners, writes: [],
    publish(uid) { for (const fn of listeners.get(uid) || []) fn({ val: () => clone(data.get(uid) || null) }); },
    async write(uid, patch) {
      this.writes.push({ uid, patch: clone(patch) });
      const next = clone(data.get(uid) || {});
      for (const [key, value] of Object.entries(patch)) {
        const [field, id] = key.split('/'); next[field] ||= {};
        if (value === null) delete next[field][id]; else next[field][id] = value;
      }
      data.set(uid, next); this.publish(uid);
    }
  };
}
async function client(server, storage = new Map(), passwordAPI = {}) {
  const elements = new Map(), handlers = {}, cache = new Map(), ownListeners = [];
  let uid = null, state = empty(), guest = empty(), onAuth, connection, online = true, failStorage = false, blockWrite = null;
  const element = id => {
    if (!elements.has(id)) elements.set(id, { textContent:'', value:'', hidden:false, disabled:false, prepend(){}, append(){}, setAttribute(){}, reportValidity:()=>true, querySelectorAll:()=>[], showModal(){}, close(){} });
    return elements.get(id);
  };
  const source = fs.readFileSync(path.join(__dirname,'../assets/js/app.js'), 'utf8');
  const validators = { window: { PilhaPersonal: personal, PilhaProfileModel: profileModel } };
  vm.createContext(validators);
  vm.runInContext(source.slice(source.indexOf('  function validateProgress('), source.indexOf('  function ensureCompletionDates(')), validators);
  const app = {
    getProgress:()=>clone(state), empty, validate:raw=>clone(validators.validateProgress(raw)),
    guestProgress:()=>clone(guest),
    setAccount(id) { uid=id; state=clone(id ? cache.get(id) || empty() : guest); return clone(state); },
    applyCloud(raw) { state=clone(raw); if(uid)cache.set(uid,clone(raw)); }, toast(){}
  };
  const auth = { currentUser: null };
  const sdk = {
    ...passwordAPI,
    initializeApp:()=>({}), getAuth:()=>auth, getDatabase:()=>({}),
    onAuthStateChanged(a, fn) { onAuth=fn; fn(null); },
    signOut:async()=>{auth.currentUser=null;onAuth(null);},
    ref:(db, route)=>route,
    onValue(route, fn) {
      if(route==='.info/connected') { connection=fn; fn({val:()=>online}); return ()=>{connection=null}; }
      const owner=route.split('/')[1];
      if(!server.listeners.has(owner))server.listeners.set(owner,new Set());
      server.listeners.get(owner).add(fn);fn({val:()=>clone(server.data.get(owner)||null)});
      ownListeners.push(()=>server.listeners.get(owner).delete(fn));
      return ()=>server.listeners.get(owner).delete(fn);
    },
    async update(route, patch) { if(blockWrite)await blockWrite; await server.write(route.split('/')[1],patch); }
  };
  let timer=0;
  const context = {
    window:{PilhaApp:app,PilhaSyncModel:model,MINHA_PILHA_FIREBASE:{apiKey:'test',databaseURL:'test',projectId:'test'},addEventListener:(name,fn)=>handlers[name]=fn},
    document:{querySelector:element,createElement:()=>element(`created-${elements.size}`),body:{append(){}}},
    navigator:{locks:{request:async(name,fn)=>fn()}}, crypto:require('node:crypto').webcrypto,
    localStorage:{get length(){return storage.size},key:index=>[...storage.keys()][index],getItem:key=>storage.get(key)||null,setItem(key,value){if(failStorage)throw Error('quota');storage.set(key,value)},removeItem:key=>storage.delete(key)},
    setTimeout:()=>++timer,clearTimeout(){},sdk,console
  };
  vm.createContext(context);
  // Inject only the SDK dependency; exercise the production controller unchanged.
  const controller=fs.readFileSync(path.join(__dirname,'../assets/js/cloud-sync.js'),'utf8').replace(/import\('\.\.\/vendor\/firebase\/firebase\.js(?:\?v=\d+)?'\)/,'Promise.resolve(sdk)');
  vm.runInContext(controller,context);await turn();
  return {
    app, elements, storage, handlers, cloud:context.window.PilhaCloud,
    login(id){auth.currentUser={uid:id,email:`${id}@example.test`};onAuth(auth.currentUser);},
    logout:()=>sdk.signOut(),
    setGuest(progress){guest=clone(progress);if(!uid)state=clone(progress);},
    edit(field,key,value){const next=app.getProgress();if(value===null)delete next[field][key];else next[field][key]=value;state=clone(next);context.window.PilhaCloud.changed(next);if(uid)cache.set(uid,clone(next));},
    flush:async()=>{await element('#syncNowBtn').onclick();await turn();await turn();},
    import:()=>element('#importGuestBtn').onclick(),
    connect(value){online=value;connection?.({val:()=>online});},
    failStorage(value){failStorage=value;},
    holdWrites(promise){blockWrite=promise;},
    close(){ for(const stop of ownListeners)stop(); }
  };
}
(async()=>{
  await test('production app bridge preserves guest memory and switches account caches',()=>{
    const source=fs.readFileSync(path.join(__dirname,'../assets/js/app.js'),'utf8');
    const initial=empty();initial.read.guest=true;
    const bridgeContext={window:{PilhaPersonal:personal,PilhaProfileModel:profileModel},state:initial,accountId:null,accountMemory:new Map(),orders:[{id:'batman'}],selected:'batman',KEY:'minha-pilha-v1',AUTO_BACKUP_KEY:'minha-pilha-v1-auto-backup',applyingRemote:false,
      $:()=>({open:false,value:''}),load:()=>empty(),showView(){},selectOrder(){},refreshOrders(){},render(){},save(){},toast(){},localStorage:{getItem:()=>null}};
    vm.createContext(bridgeContext);
    vm.runInContext(source.slice(source.indexOf('  function validateProgress('), source.indexOf('  function ensureCompletionDates(')),bridgeContext);
    const start=source.indexOf('  window.PilhaApp =');
    vm.runInContext(source.slice(start,source.indexOf('\n  render();',start)),bridgeContext);
    const bridge=bridgeContext.window.PilhaApp;
    bridge.setAccount(null);assert.equal(bridge.getProgress().read.guest,true);
    bridge.setAccount('alice');assert.deepEqual(clone(bridge.getProgress().read),{});assert.equal(bridge.guestProgress().read.guest,true);
    const accountPile=empty();accountPile.read.alice=true;bridge.applyCloud(accountPile);
    bridge.setAccount('bob');assert.deepEqual(clone(bridge.getProgress().read),{});
    bridge.setAccount('alice');assert.equal(bridge.getProgress().read.alice,true);
    bridge.setAccount(null);assert.deepEqual(clone(bridge.getProgress().read),{guest:true});
  });
  await test('unicode keys are reversible and contain no forbidden path characters',()=>{
    const key='batman:era.1/#$[]:ação';assert.equal(model.decode(model.encode(key)),key);assert.match(model.encode(key),/^[0-9a-f]+$/);
    assert.throws(()=>model.decode('zz'));assert.throws(()=>model.apply(empty(),{['read/'+model.encode('__proto__')]:true}));
  });
  await test('independent device edits merge and unmarking stays deleted',()=>{
    const a=empty(),b=empty();a.read.a=true;b.read.b=true;
    const combined=model.apply(a,model.diff(empty(),b));assert.deepEqual(combined.read,{a:true,b:true});
    assert.deepEqual(model.apply(combined,model.diff(b,empty())).read,{a:true});
  });
  await test('guest migration preserves existing cloud notes and does not mutate sources',()=>{
    const cloud=empty(),guest=empty();cloud.notes.a='cloud';guest.notes.a='guest';guest.read.b=true;
    const merged=model.importGuest(cloud,guest);assert.equal(merged.notes.a,'cloud');assert.equal(merged.read.b,true);assert.deepEqual(cloud.read,{});
  });
  await test('guest data is opt-in and account switching isolates the visible pile',async()=>{
    const server=fakeServer(),c=await client(server),guest=empty();guest.read.old=true;c.setGuest(guest);
    c.login('alice');assert.deepEqual(c.app.getProgress().read,{});assert.equal(server.writes.length,0);
    c.import();await c.flush();assert.equal(model.fromRemote(server.data.get('alice')).read.old,true);
    c.login('bob');assert.deepEqual(c.app.getProgress().read,{});assert.equal(server.data.has('bob'),false);
    await c.logout();assert.equal(c.app.getProgress().read.old,true);
  });
  await test('two devices combine different marks and propagate deletions',async()=>{
    const server=fakeServer(),a=await client(server),b=await client(server);a.login('alice');b.login('alice');
    a.edit('read','a',true);b.edit('read','b',true);await a.flush();await b.flush();
    assert.deepEqual(model.fromRemote(server.data.get('alice')).read,{a:true,b:true});
    a.edit('read','a',null);await a.flush();assert.deepEqual(b.app.getProgress().read,{b:true});
  });
  await test('offline queue survives a reload and reconnects without JSON import',async()=>{
    const server=fakeServer(),storage=new Map(),a=await client(server,storage);a.login('alice');a.connect(false);a.edit('read','offline',true);
    await a.flush();assert.equal(server.writes.length,0);a.close();
    const b=await client(server,storage);b.login('alice');assert.equal(b.app.getProgress().read.offline,true);await b.flush();
    assert.equal(model.fromRemote(server.data.get('alice')).read.offline,true);assert.equal(storage.size,0);
  });
  await test('new changes during an in-flight write remain pending',async()=>{
    const server=fakeServer(),a=await client(server);a.login('alice');let release;const pending=new Promise(resolve=>release=resolve);a.holdWrites(pending);
    a.edit('read','first',true);await a.flush();a.edit('notes','second','saved later');release();await turn();await turn();
    assert.equal(a.storage.size,1);a.holdWrites(null);await a.flush();assert.equal(model.fromRemote(server.data.get('alice')).notes.second,'saved later');
  });
  await test('storage failure retains the unsent edit through sign-out/sign-in',async()=>{
    const server=fakeServer(),a=await client(server);a.login('alice');a.connect(false);a.failStorage(true);a.edit('notes','n','keep me');
    await a.logout();a.login('alice');assert.equal(a.app.getProgress().notes.n,'keep me');a.connect(true);await a.flush();
    assert.equal(model.fromRemote(server.data.get('alice')).notes.n,'keep me');
  });
  await test('malformed server data does not replace cached progress or trigger a write',async()=>{
    const server=fakeServer(),a=await client(server);a.login('alice');a.edit('read','valid',true);await a.flush();
    server.data.set('alice',{notes:{[model.encode('bad')]:123}});server.publish('alice');
    assert.equal(a.app.getProgress().read.valid,true);assert.match(a.elements.get('#accountSyncDetail').textContent,/cópia local foi mantida/);
  });
  await test('personal lists sync only to their owner, preserve independent lists and delete remotely',async()=>{
    const server=fakeServer(),a=await client(server),b=await client(server),other=await client(server);
    a.login('alice');b.login('alice');other.login('bob');
    const first=makeList(),second=makeList();
    a.edit('customOrders',first.id,personal.serialize(first));b.edit('customOrders',second.id,personal.serialize(second));
    await a.flush();await b.flush();
    assert.equal(Object.keys(b.app.getProgress().customOrders).length,2);
    assert.deepEqual(other.app.getProgress().customOrders,{});
    first.title='Título editado';a.edit('customOrders',first.id,personal.serialize(first));await a.flush();
    assert.equal(personal.parse(b.app.getProgress().customOrders[first.id]).title,'Título editado');
    a.edit('customOrders',first.id,null);await a.flush();assert.equal(b.app.getProgress().customOrders[first.id],undefined);
    assert.ok(b.app.getProgress().customOrders[second.id]);
  });
  await test('personal list survives offline reload and guest migration is explicit',async()=>{
    const server=fakeServer(),storage=new Map(),a=await client(server,storage),list=makeList(),guest=empty();
    guest.customOrders[list.id]=personal.serialize(list);a.setGuest(guest);a.login('alice');
    assert.deepEqual(a.app.getProgress().customOrders,{});a.connect(false);a.import();await a.flush();
    assert.equal(server.writes.length,0);a.close();
    const b=await client(server,storage);b.login('alice');await b.flush();
    assert.equal(b.app.getProgress().customOrders[list.id],guest.customOrders[list.id]);
  });
  await test('malformed custom catalogue cannot replace the visible account state',async()=>{
    const server=fakeServer(),a=await client(server);a.login('alice');a.edit('read','safe',true);await a.flush();
    const list=makeList();server.data.set('alice',{customOrders:{[model.encode(list.id)]:'{"id":"batman"}'}});server.publish('alice');
    assert.equal(a.app.getProgress().read.safe,true);assert.deepEqual(a.app.getProgress().customOrders,{});
  });
  await test('profile fields merge across devices, persist offline and remain private',async()=>{
    const server=fakeServer(),storage=new Map(),a=await client(server,storage),b=await client(server),other=await client(server);
    a.login('alice');b.login('alice');other.login('bob');
    a.edit('profile','displayName','Ana');b.edit('profile','bio','Mangás e HQs');await a.flush();await b.flush();
    assert.deepEqual(a.app.getProgress().profile,{displayName:'Ana',bio:'Mangás e HQs'});assert.deepEqual(other.app.getProgress().profile,{});
    a.connect(false);a.edit('profile','avatar','data:image/png;base64,AAAA');await a.flush();a.close();
    const restored=await client(server,storage);restored.login('alice');await restored.flush();assert.equal(b.app.getProgress().profile.avatar,'data:image/png;base64,AAAA');
    restored.edit('profile','avatar',null);await restored.flush();assert.equal(b.app.getProgress().profile.avatar,undefined);
    restored.login('bob');assert.deepEqual(restored.app.getProgress().profile,{});
  });
  await test('invalid profile cannot replace cached progress or enter the write queue',async()=>{
    const server=fakeServer(),a=await client(server);a.login('alice');a.edit('read','safe',true);await a.flush();
    server.data.set('alice',{profile:{[model.encode('avatar')]:'data:image/svg+xml;base64,AAAA'}});server.publish('alice');
    assert.equal(a.app.getProgress().read.safe,true);assert.deepEqual(a.app.getProgress().profile,{});
  });
  await test('password controller reauthenticates first, keeps the session and never writes a password to the pile',async()=>{
    const server=fakeServer(),calls=[];
    const a=await client(server,new Map(),{EmailAuthProvider:{credential:(email,password)=>({email,password})},reauthenticateWithCredential:async(user,cred)=>{assert.equal(cred.password,'old-password');calls.push('reauth');},updatePassword:async(user,password)=>{assert.equal(user.uid,'alice');assert.equal(password,'new-password');calls.push('update');}});
    await assert.rejects(a.cloud.changePassword('old-password','new-password'),/Entre/);a.login('alice');
    await assert.rejects(a.cloud.changePassword('old-password','short'),/8 a 128/);await assert.rejects(a.cloud.changePassword('old-password','old-password'),/diferente/);assert.deepEqual(calls,[]);
    await a.cloud.changePassword('old-password','new-password');assert.deepEqual(calls,['reauth','update']);assert.equal(a.cloud.user().uid,'alice');assert.equal(server.writes.length,0);assert.equal(a.storage.size,0);
  });
  await test('wrong current password and account switching prevent password update',async()=>{
    let updates=0,release;const pending=new Promise(resolve=>release=resolve);
    const api={EmailAuthProvider:{credential:()=>({})},reauthenticateWithCredential:async()=>{throw Object.assign(Error(),{code:'auth/invalid-credential'});},updatePassword:async()=>updates++};
    const a=await client(fakeServer(),new Map(),api);a.login('alice');await assert.rejects(a.cloud.changePassword('wrong','new-password'),/incorreta/);assert.equal(updates,0);
    const b=await client(fakeServer(),new Map(),{...api,reauthenticateWithCredential:()=>pending});b.login('alice');const change=b.cloud.changePassword('old-password','new-password');b.login('bob');release();await assert.rejects(change,/conta mudou/);assert.equal(updates,0);
  });
  console.log(`${passed} sync tests passed`);
})().catch(error=>{console.error(error);process.exitCode=1;});
