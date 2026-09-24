(() => {
  const app = window.PilhaApp, model = window.PilhaPersonal, personal = app.personal;
  const $ = selector => document.querySelector(selector);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const makeId = prefix => `${prefix}-${crypto.randomUUID()}`;
  let draft = null, base = null, owner = null, generation = 0;
  const tools = document.createElement('div');
  tools.className = 'personal-tools';
  tools.innerHTML = '<button class="collection-action" id="newPersonalBtn">＋ Criar lista</button><button class="text-button" id="importPersonalBtn">Importar lista</button><input type="file" id="personalFile" accept=".json,application/json" hidden>';
  $('.workspace-nav').after(tools);
  const actions = document.createElement('div');
  actions.id = 'personalActions'; actions.className = 'personal-actions'; actions.hidden = true;
  actions.innerHTML = '<span>SUA LISTA PESSOAL</span><button class="collection-action" id="editPersonalBtn">✎ Editar lista</button><button class="collection-action" id="sharePersonalBtn">↓ Compartilhar lista</button><button class="text-button" id="deletePersonalBtn">Excluir lista</button>';
  $('.order-title-row').after(actions);
  const dialog = document.createElement('dialog');
  dialog.id = 'personalDialog'; dialog.className = 'note-dialog personal-dialog'; dialog.setAttribute('aria-labelledby', 'personalDialogTitle');
  dialog.innerHTML = `<form id="personalForm">
    <div class="note-dialog-heading"><div><p class="eyebrow">MINHAS LISTAS</p><h2 id="personalDialogTitle">Criar lista</h2></div><button class="dialog-close" type="button" id="closePersonalBtn" aria-label="Fechar editor">×</button></div>
    <p class="personal-help" id="personalScope"></p>
    <div class="personal-fields"><label>Título da lista<input id="personalTitle" maxlength="160" required placeholder="Ex.: Berserk — minha leitura"></label><label>Tipo<select id="personalKind"><option value="comic">Comic / HQ</option><option value="manga">Mangá</option></select></label></div>
    <label class="personal-description">Descrição <small>opcional</small><textarea id="personalDescription" maxlength="1000" rows="2" placeholder="Autor, editora ou uma breve apresentação…"></textarea></label>
    <div class="personal-items-heading"><h3>Edições, volumes ou capítulos</h3><span id="personalItemCount"></span></div><p class="personal-help">Coloque os itens na ordem em que quer ler. Renomear ou reordenar mantém suas marcações.</p>
    <div id="personalItems"></div><button class="collection-action" type="button" id="addPersonalItem">＋ Adicionar item</button>
    <details class="personal-bulk"><summary>Colar vários títulos de uma vez</summary><label for="personalBulk" class="personal-help">Um título por linha. Você pode ajustar os detalhes depois.</label><textarea id="personalBulk" rows="4" maxlength="81000" placeholder="Volume 1&#10;Volume 2&#10;Volume 3"></textarea><button class="dialog-secondary" type="button" id="addPersonalBulk">Adicionar títulos</button></details>
    <p id="personalError" class="personal-error" role="alert" hidden></p>
    <div class="note-dialog-actions personal-footer"><span></span><button type="button" class="dialog-secondary" id="cancelPersonalBtn">Cancelar</button><button class="dialog-primary" type="submit">Salvar lista</button></div>
  </form>`;
  document.body.append(dialog);
  function error(message = '') { $('#personalError').textContent = message; $('#personalError').hidden = !message; }
  function item() { return { id: makeId('item'), title: '', details: '' }; }
  function renderItems(focusId) {
    $('#personalItemCount').textContent = `${draft.items.length} / ${model.MAX_ITEMS}`;
    $('#addPersonalItem').disabled = draft.items.length >= model.MAX_ITEMS;
    $('#personalItems').innerHTML = draft.items.map((entry, index) => `<div class="personal-item" data-item="${entry.id}">
      <span class="personal-item-number">${index + 1}</span><div class="personal-item-fields"><label class="sr-only" for="title-${entry.id}">Título do item ${index + 1}</label><input id="title-${entry.id}" data-field="title" value="${escape(entry.title)}" maxlength="160" required placeholder="Ex.: Volume 1 ou Batman #1"><label class="sr-only" for="details-${entry.id}">Detalhes do item ${index + 1}</label><input id="details-${entry.id}" data-field="details" value="${escape(entry.details)}" maxlength="500" placeholder="Detalhes (opcional)"></div>
      <div class="personal-item-actions"><button type="button" data-action="up" aria-label="Mover item ${index + 1} para cima" ${index === 0 ? 'disabled' : ''}>↑</button><button type="button" data-action="down" aria-label="Mover item ${index + 1} para baixo" ${index === draft.items.length - 1 ? 'disabled' : ''}>↓</button><button type="button" data-action="remove" aria-label="Remover item ${index + 1}">×</button></div></div>`).join('');
    if (focusId) $(`#title-${focusId}`)?.focus();
  }
  function open(list, previous, imported = false) {
    draft = list; base = previous; owner = personal.account(); error();
    $('#personalDialogTitle').textContent = previous ? 'Editar lista' : imported ? 'Adicionar lista recebida' : 'Criar lista';
    $('#personalScope').textContent = imported ? 'Revise e salve uma cópia para você. Suas outras listas e seu progresso continuam como estão.' : owner ? 'Esta lista fica só na sua conta. Você pode compartilhar uma cópia quando quiser.' : 'Esta lista fica neste navegador. Entre na sua conta e use “Adicionar pilha deste navegador” para sincronizar.';
    $('#personalTitle').value = list.title; $('#personalKind').value = list.kind;
    $('#personalDescription').value = list.description; $('#personalBulk').value = '';
    renderItems(); dialog.showModal(); $('#personalTitle').focus();
  }
  const close = () => { generation++; draft = null; base = null; if (dialog.open) dialog.close(); };
  dialog.addEventListener('close', close);
  for (const id of ['#closePersonalBtn', '#cancelPersonalBtn']) $(id).onclick = close;
  $('#newPersonalBtn').onclick = () => open({ id: makeId('personal'), title: '', kind: 'comic', description: '', items: [item()] }, null);
  $('#editPersonalBtn').onclick = () => {
    const id = personal.selectedId(), value = personal.get(id);
    if (value) open(model.parse(value, id), value);
  };
  $('#personalItems').oninput = event => {
    const row = event.target.closest('[data-item]');
    if (draft && row && ['title', 'details'].includes(event.target.dataset.field)) draft.items.find(entry => entry.id === row.dataset.item)[event.target.dataset.field] = event.target.value;
  };
  $('#personalItems').onclick = event => {
    const button = event.target.closest('[data-action]');
    if (!draft || !button) return;
    const index = draft.items.findIndex(entry => entry.id === button.closest('[data-item]').dataset.item);
    if (index < 0) return;
    const action = button.dataset.action, target = index + (action === 'up' ? -1 : 1);
    if (action === 'remove') draft.items.splice(index, 1);
    else if (target >= 0 && target < draft.items.length) [draft.items[index], draft.items[target]] = [draft.items[target], draft.items[index]];
    renderItems(draft.items[action === 'remove' ? Math.min(index, draft.items.length - 1) : target]?.id);
  };
  $('#addPersonalItem').onclick = () => {
    if (!draft || draft.items.length >= model.MAX_ITEMS) return;
    const entry = item(); draft.items.push(entry); renderItems(entry.id); error();
  };
  $('#addPersonalBulk').onclick = () => {
    const titles = $('#personalBulk').value.split(/\r?\n/).map(title => title.trim()).filter(Boolean);
    if (!titles.length) { error('Cole pelo menos um título.'); return; }
    const kept = draft.items.filter(entry => entry.title.trim() || entry.details.trim());
    if (kept.length + titles.length > model.MAX_ITEMS || titles.some(title => title.length > 160)) { error('Use até 500 itens por lista e até 160 caracteres por título.'); return; }
    draft.items = [...kept, ...titles.map(title => ({ ...item(), title }))];
    $('#personalBulk').value = ''; renderItems(); error();
  };
  $('#personalForm').onsubmit = event => {
    event.preventDefault(); if (!draft) return;
    try {
      if (owner !== personal.account()) throw Error('A conta mudou. Abra o editor novamente.');
      if ($('#personalBulk').value.trim()) throw Error('Clique em “Adicionar títulos” para incluir os títulos colados, ou apague esse campo.');
      personal.save({ ...draft, title: $('#personalTitle').value, kind: $('#personalKind').value, description: $('#personalDescription').value }, base);
      close(); app.toast('Lista pessoal salva');
    } catch (err) { error(err.message); }
  };
  $('#sharePersonalBtn').onclick = () => {
    const id = personal.selectedId(), value = personal.get(id); if (!value) return;
    const list = model.parse(value, id);
    const url = URL.createObjectURL(new Blob([JSON.stringify(model.share(list), null, 2)], { type: 'application/json' }));
    const link = document.createElement('a'); link.href = url;
    link.download = `minha-pilha-lista-${list.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/gi, '-').slice(0, 60) || 'pessoal'}.json`;
    link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    app.toast('Lista exportada, sem suas notas ou progresso. Envie o JSON a quem quiser.');
  };
  $('#deletePersonalBtn').onclick = () => {
    const id = personal.selectedId(), value = personal.get(id); if (!value) return;
    const list = model.parse(value, id);
    if (!confirm(`Excluir “${list.title}” e suas marcações? A exclusão vale para sua conta e seus dispositivos. Cópias compartilhadas não serão alteradas.`)) return;
    try { personal.remove(id, value); app.toast('Lista pessoal excluída'); } catch (err) { app.toast(err.message); }
  };
  $('#importPersonalBtn').onclick = () => $('#personalFile').click();
  $('#personalFile').onchange = async event => {
    const file = event.target.files?.[0]; if (!file) return;
    const token = ++generation;
    try {
      if (file.size > 1000000) throw Error('O arquivo de lista deve ter no máximo 1 MB.');
      const raw = JSON.parse(await file.text());
      if (token !== generation) return;
      open(model.importShare(raw, makeId), null, true);
    } catch (err) { app.toast(err instanceof SyntaxError ? 'O arquivo não contém um JSON válido.' : err.message); }
    finally { event.target.value = ''; }
  };
  window.PilhaPersonalUI = { close, selected(id) { actions.hidden = !id; } };
  window.PilhaPersonalUI.selected(personal.selectedId());
})();
