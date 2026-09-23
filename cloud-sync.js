(() => {
  const app = window.PilhaApp;
  const model = window.PilhaSyncModel;
  const $ = selector => document.querySelector(selector);
  let authAPI, dataAPI, auth, database, session = null;
  let observed = app.getProgress();
  let available = false;
  const volatileByUser = new Map();
  const dialog = document.createElement('dialog');
  dialog.id = 'accountDialog';
  dialog.className = 'note-dialog account-dialog';
  dialog.setAttribute('aria-labelledby', 'accountTitle');
  dialog.innerHTML = `<form method="dialog" class="note-dialog-heading"><div><p class="eyebrow">SUA PILHA, EM TODO LUGAR</p><h2 id="accountTitle">Sua conta</h2></div><button class="dialog-close" aria-label="Fechar conta">×</button></form>
    <p id="accountMessage" role="status" aria-live="polite">Entre para continuar a leitura em outro dispositivo.</p>
    <form id="loginForm"><label for="accountEmail">E-mail</label><input id="accountEmail" type="email" autocomplete="username" required maxlength="254"><label for="accountPassword">Senha</label><input id="accountPassword" type="password" autocomplete="current-password" required minlength="8"><div class="account-actions"><button class="dialog-primary" type="submit">Entrar</button><button class="dialog-secondary" id="createAccountBtn" type="button">Criar conta</button></div><button class="text-button" id="resetPasswordBtn" type="button">Esqueci minha senha</button></form>
    <div id="signedInPanel" hidden><p id="accountIdentity"></p><p id="accountSyncDetail"></p><div id="guestImportPanel" hidden><p>Já existe uma pilha salva neste navegador. Você pode adicioná-la à sua conta; as notas e os marcadores que já estão na conta têm prioridade.</p><button class="dialog-secondary" id="importGuestBtn">Adicionar pilha deste navegador</button></div><div class="account-actions"><button class="dialog-secondary" id="syncNowBtn">Sincronizar agora</button><button class="dialog-secondary" id="signOutBtn">Sair da conta</button></div></div>`;
  document.body.append(dialog);
  const button = document.createElement('button');
  button.id = 'accountBtn'; button.className = 'icon-button'; button.textContent = 'Entrar';
  $('.top-actions').prepend(button);
  const status = document.createElement('p'); status.id = 'cloudStatus'; status.className = 'cloud-status'; status.setAttribute('role', 'status');
  $('.sidebar-bottom').prepend(status);

  function message(text) { $('#accountMessage').textContent = text; }
  function setStatus(text) { status.textContent = text; $('#accountSyncDetail').textContent = text; }
  const prefixFor = uid => `minha-pilha-pending:${uid}:`;
  function queue(s) {
    const records = new Map(s.volatile);
    try {
      const prefix = prefixFor(s.uid);
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key?.startsWith(prefix)) continue;
        const record = JSON.parse(localStorage.getItem(key));
        app.validate(model.apply(app.empty(), record.patch));
        records.set(key, record);
      }
    } catch { s.storageFailed = true; }
    return [...records.entries()].sort((a, b) => a[1].time - b[1].time || a[0].localeCompare(b[0]));
  }
  function refreshStatus(s) {
    if (session !== s) return;
    const pending = queue(s).length;
    setStatus(s.storageFailed ? 'Armazenamento local indisponível. Salve um backup.' : !s.connected ? 'Sem conexão · alterações aguardam sincronização' : s.busy || pending ? 'Sincronizando sua pilha…' : s.ready ? 'Pilha sincronizada na conta' : 'Carregando sua pilha…');
  }
  function renderRemote(s) {
    if (session !== s || !s.ready) return;
    try {
      let progress = model.fromRemote(s.remote);
      for (const [, record] of queue(s)) progress = model.apply(progress, record.patch);
      app.validate(progress);
      app.applyCloud(progress);
      observed = app.getProgress();
      return true;
    } catch { s.ready = false; setStatus('Não foi possível ler a pilha. Sua cópia local foi mantida.'); return false; }
  }
  function schedule(s) {
    clearTimeout(s.timer);
    s.timer = setTimeout(() => flush(s), 600);
  }
  async function flush(s) {
    if (session !== s || !s.connected || !s.ready || s.busy) return;
    // A shared lock prevents two tabs from replaying an older pending batch.
    if (!navigator.locks) { setStatus('Use um navegador atualizado para sincronizar com segurança.'); return; }
    s.busy = true;
    refreshStatus(s);
    try {
      await navigator.locks.request(`minha-pilha-sync:${s.uid}`, async () => {
        if (session !== s || !s.connected) return;
        const records = queue(s);
        if (!records.length) return;
        const patch = Object.assign({}, ...records.map(([, record]) => record.patch));
        await dataAPI.update(s.ref, patch);
        for (const [key] of records) {
          s.volatile.delete(key);
          try { localStorage.removeItem(key); } catch { s.storageFailed = true; }
        }
      });
      if (session === s) { s.busy = false; refreshStatus(s); if (queue(s).length) schedule(s); }
    } catch {
      s.busy = false;
      if (session === s) setStatus('Não foi possível sincronizar. As alterações continuam neste dispositivo.');
    }
  }
  function changed(progress) {
    const patch = model.diff(observed, progress);
    observed = JSON.parse(JSON.stringify(progress));
    const s = session;
    if (!s || !Object.keys(patch).length) return;
    const record = { patch, time: Math.max(Date.now(), s.lastTime + 1) };
    s.lastTime = record.time;
    const key = `${prefixFor(s.uid)}${crypto.randomUUID()}`;
    try { localStorage.setItem(key, JSON.stringify(record)); }
    catch { s.volatile.set(key, record); s.storageFailed = true; }
    refreshStatus(s); schedule(s);
  }
  window.PilhaCloud = { changed };
  function hasProgress(progress) { return model.fields.some(field => Object.keys(progress[field] || {}).length); }
  function updateAccountUI(user) {
    button.textContent = user ? 'Minha conta' : 'Entrar';
    $('#loginForm').hidden = !!user || !available;
    $('#signedInPanel').hidden = !user;
    $('#accountIdentity').textContent = user?.email || '';
    $('#guestImportPanel').hidden = !user || !hasProgress(app.guestProgress());
    $('#accountPassword').value = '';
    message(user ? 'Cada conta tem sua própria pilha.' : available ? 'Entre para continuar a leitura em outro dispositivo.' : 'A sincronização ainda não foi ativada. Sua pilha continua salva neste navegador.');
  }
  function switchUser(user) {
    const previous = session;
    if (previous?.uid === user?.uid && previous) return;
    if (previous) { clearTimeout(previous.timer); previous.stopData?.(); previous.stopConnection?.(); }
    session = null;
    observed = app.setAccount(user?.uid || null);
    updateAccountUI(user);
    if (!user) { setStatus('Pilha local · entre para sincronizar'); return; }
    if (!volatileByUser.has(user.uid)) volatileByUser.set(user.uid, new Map());
    const s = { uid: user.uid, ref: dataAPI.ref(database, `piles/${user.uid}`), remote: null, ready: false, connected: false, busy: false, volatile: volatileByUser.get(user.uid), lastTime: Date.now() };
    session = s;
    // Replay durable pending edits over the account's own cached progress.
    let cached = observed;
    for (const [, record] of queue(s)) cached = model.apply(cached, record.patch);
    app.applyCloud(cached); observed = app.getProgress();
    setStatus('Conectando sua pilha…');
    s.stopData = dataAPI.onValue(s.ref, snapshot => {
      if (session !== s) return;
      s.remote = snapshot.val(); s.ready = true;
      if (renderRemote(s)) { refreshStatus(s); schedule(s); }
    }, () => { if (session === s) { s.ready = false; setStatus('Acesso ao banco indisponível. Sua cópia local foi mantida.'); } });
    s.stopConnection = dataAPI.onValue(dataAPI.ref(database, '.info/connected'), snapshot => {
      if (session !== s) return;
      s.connected = snapshot.val() === true;
      refreshStatus(s); if (s.connected) schedule(s);
    });
  }
  const errorMessage = error => ({
    'auth/invalid-credential': 'E-mail ou senha incorretos.',
    'auth/invalid-email': 'Confira o endereço de e-mail.',
    'auth/email-already-in-use': 'Esse e-mail já tem uma conta. Use Entrar ou recupere a senha.',
    'auth/weak-password': 'Escolha uma senha com pelo menos 8 caracteres.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde um pouco e tente novamente.',
    'auth/network-request-failed': 'Sem conexão. Confira sua internet e tente novamente.',
    'auth/operation-not-allowed': 'O login ainda precisa ser ativado no projeto.'
  }[error.code] || 'Não foi possível entrar. Confira os dados e tente novamente.');
  async function authenticate(create) {
    const form = $('#loginForm');
    if (!available || !form.reportValidity()) return;
    const controls = [...form.querySelectorAll('button')]; controls.forEach(control => control.disabled = true);
    message(create ? 'Criando sua conta…' : 'Entrando…');
    try {
      const action = create ? authAPI.createUserWithEmailAndPassword : authAPI.signInWithEmailAndPassword;
      await action(auth, $('#accountEmail').value.trim(), $('#accountPassword').value);
      $('#accountPassword').value = '';
      message('Conta conectada. Suas próximas alterações serão sincronizadas.');
    } catch (error) { message(errorMessage(error)); }
    finally { controls.forEach(control => control.disabled = false); }
  }
  button.onclick = () => { updateAccountUI(auth?.currentUser); dialog.showModal(); };
  $('#loginForm').onsubmit = event => { event.preventDefault(); authenticate(false); };
  $('#createAccountBtn').onclick = () => authenticate(true);
  $('#resetPasswordBtn').onclick = async () => {
    if (!available || !$('#accountEmail').reportValidity()) return;
    const control = $('#resetPasswordBtn'); control.disabled = true;
    try { await authAPI.sendPasswordResetEmail(auth, $('#accountEmail').value.trim()); message('Se houver uma conta para esse e-mail, você receberá as instruções de recuperação.'); }
    catch (error) { message(errorMessage(error)); }
    finally { control.disabled = false; }
  };
  $('#signOutBtn').onclick = async () => {
    try { await authAPI.signOut(auth); message('Você saiu. Alterações pendentes ficam guardadas para a próxima entrada nesta conta.'); }
    catch { message('Não foi possível sair. Tente novamente.'); }
  };
  $('#syncNowBtn').onclick = () => { if (session) flush(session); };
  $('#importGuestBtn').onclick = () => {
    const s = session;
    if (!s?.ready) { message('Aguarde sua pilha da conta carregar antes de adicionar a pilha local.'); return; }
    const merged = model.importGuest(app.getProgress(), app.guestProgress());
    changed(merged); app.applyCloud(merged); observed = app.getProgress();
    $('#guestImportPanel').hidden = true;
    message('Pilha local adicionada à conta. A cópia original deste navegador foi preservada.');
  };
  window.addEventListener('online', () => { if (session) schedule(session); });
  window.addEventListener('storage', event => {
    const s = session;
    if (s && event.key?.startsWith(prefixFor(s.uid))) { renderRemote(s); refreshStatus(s); schedule(s); }
  });
  window.addEventListener('beforeunload', event => {
    if ([...volatileByUser.values()].some(records => records.size)) { event.preventDefault(); event.returnValue = ''; }
  });
  updateAccountUI(null); setStatus('Pilha local · entre para sincronizar');
  async function initialize() {
    const config = window.MINHA_PILHA_FIREBASE;
    if (!config?.apiKey || !config?.databaseURL || !config?.projectId) return;
    setStatus('Conectando sua conta…');
    try {
      const firebase = await import('./vendor/firebase.js');
      const instance = firebase.initializeApp(config);
      authAPI = firebase; dataAPI = firebase;
      auth = authAPI.getAuth(instance); auth.languageCode = 'pt-BR';
      database = dataAPI.getDatabase(instance);
      available = true;
      updateAccountUI(null);
      authAPI.onAuthStateChanged(auth, switchUser, () => setStatus('Não foi possível recuperar a conta. Tente entrar novamente.'));
    } catch { setStatus('Conta indisponível · sua pilha local continua funcionando'); message('Não foi possível conectar. Confira a internet e recarregue a página.'); }
  }
  initialize();
})();
