(() => {
  const classify = order => {
    if (order.publisher && order.family) return order;
    if (order.title.toLowerCase().includes('spider-man')) return { ...order, publisher: 'Marvel', family: 'Homem-Aranha' };
    return { ...order, publisher: 'DC', family: 'Batman' };
  };
  const orders = [...(window.COMIC_ORDERS || []), ...(window.EXPANDED_ORDERS || [])].map(classify);
  const KEY = 'minha-pilha-v1';
  const AUTO_BACKUP_KEY = 'minha-pilha-v1-auto-backup';
  let recoveredFromBackup = false;
  const state = load();
  let selected = orders[0]?.id;
  let filter = 'all';
  let era = 'all';
  let query = '';
  let shelfView = 'current';
  let activeNoteKey = null;
  let deferredInstallPrompt = null;

  const $ = selector => document.querySelector(selector);
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const keyFor = (orderId, sectionIndex, itemIndex, childIndex = null) => `${orderId}:${sectionIndex}:${itemIndex}${childIndex === null ? '' : ':c' + childIndex}`;

  function blankState(raw = {}) {
    return {
      read: raw.read && typeof raw.read === 'object' ? raw.read : {},
      current: raw.current && typeof raw.current === 'object' ? raw.current : {},
      notes: raw.notes && typeof raw.notes === 'object' ? raw.notes : {},
      favoriteOrders: raw.favoriteOrders && typeof raw.favoriteOrders === 'object' ? raw.favoriteOrders : {},
      queueOrders: raw.queueOrders && typeof raw.queueOrders === 'object' ? raw.queueOrders : {},
      completedAt: raw.completedAt && typeof raw.completedAt === 'object' ? raw.completedAt : {},
      savedAt: raw.savedAt || null,
      lastBackupAt: raw.lastBackupAt || null
    };
  }

  function load() {
    for (const key of [KEY, AUTO_BACKUP_KEY]) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        if (key === AUTO_BACKUP_KEY) recoveredFromBackup = true;
        return blankState(parsed);
      } catch {}
    }
    return blankState();
  }

  function save() {
    state.savedAt = new Date().toISOString();
    const previous = localStorage.getItem(KEY);
    const serialized = JSON.stringify(state);
    if (previous && previous !== serialized) localStorage.setItem(AUTO_BACKUP_KEY, previous);
    localStorage.setItem(KEY, serialized);
    updateStats();
    renderFeatured();
    updateSaveStatus();
  }

  function counts(order) {
    let total = 0;
    let read = 0;
    order.sections.forEach((section, sectionIndex) => section.items.forEach((item, itemIndex) => {
      const sectionKey = section.key ?? sectionIndex;
      const keys = [keyFor(order.id, sectionKey, itemIndex), ...(item.companions || []).map((_, companionIndex) => keyFor(order.id, sectionKey, itemIndex, companionIndex))];
      keys.forEach(key => { total++; if (state.read[key]) read++; });
    }));
    return { total, read, pct: total ? Math.round(read / total * 100) : 0 };
  }

  function entriesFor(order) {
    const entries = [];
    order.sections.forEach((section, sectionIndex) => section.items.forEach((item, itemIndex) => {
      const sectionKey = section.key ?? sectionIndex;
      const companions = item.companions || [];
      entries.push({ key: keyFor(order.id, sectionKey, itemIndex), title: item.title, hasCompanions: companions.length > 0 });
      companions.forEach((companion, companionIndex) => entries.push({ key: keyFor(order.id, sectionKey, itemIndex, companionIndex), title: companion.title, isCompanion: true }));
    }));
    return entries;
  }

  function readableEntriesFor(order) { return entriesFor(order).filter(entry => entry.isCompanion || !entry.hasCompanions); }

  function currentText(order) {
    const currentKey = state.current[order.id];
    if (!currentKey) return 'Nenhum ponto marcado';
    for (let sectionIndex = 0; sectionIndex < order.sections.length; sectionIndex++) {
      for (let itemIndex = 0; itemIndex < order.sections[sectionIndex].items.length; itemIndex++) {
        const item = order.sections[sectionIndex].items[itemIndex];
        const sectionKey = order.sections[sectionIndex].key ?? sectionIndex;
        const itemKey = keyFor(order.id, sectionKey, itemIndex);
        if (currentKey === itemKey) return item.title;
        if (currentKey.startsWith(itemKey + ':c')) return item.companions?.[Number(currentKey.split(':c')[1])]?.title || item.title;
      }
    }
    return 'Nenhum ponto marcado';
  }

  function activeOrders() {
    return orders.filter(order => {
      const progress = counts(order);
      return (progress.read > 0 && progress.read < progress.total) || Boolean(state.current[order.id]);
    });
  }
  function uniqueOrders(list) { const seen = new Set(); return list.filter(order => order && !seen.has(order.id) && seen.add(order.id)); }
  function shelfOrders(view) {
    if (view === 'favorites') return orders.filter(order => state.favoriteOrders[order.id]);
    if (view === 'queue') return orders.filter(order => state.queueOrders[order.id]);
    return uniqueOrders([...orders.slice(0, 2), ...activeOrders()]);
  }

  function formatDate(value, includeTime = false) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    return new Intl.DateTimeFormat('pt-BR', includeTime ? { dateStyle: 'short', timeStyle: 'short' } : { dateStyle: 'short' }).format(date);
  }
  function relativeSave(value) {
    if (!value) return 'Pronto para salvar';
    const seconds = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 1000));
    if (seconds < 60) return 'Salvo agora';
    if (seconds < 3600) return `Salvo há ${Math.floor(seconds / 60)} min`;
    if (seconds < 86400) return `Salvo há ${Math.floor(seconds / 3600)} h`;
    return `Salvo em ${formatDate(value)}`;
  }

  function updateStats() {
    const total = orders.reduce((accumulator, order) => {
      const progress = counts(order);
      accumulator.total += progress.total;
      accumulator.read += progress.read;
      return accumulator;
    }, { total: 0, read: 0 });
    $('#totalItems').textContent = total.total.toLocaleString('pt-BR');
    $('#totalRead').textContent = total.read.toLocaleString('pt-BR');
    $('#totalPercent').textContent = (total.total ? Math.round(total.read / total.total * 100) : 0) + '%';
    $('#activeCount').textContent = activeOrders().length.toLocaleString('pt-BR');
  }

  function updateSaveStatus() {
    const saveStatus = $('#saveStatus');
    saveStatus.querySelector('span').textContent = relativeSave(state.savedAt);
    saveStatus.title = state.savedAt ? `Último salvamento: ${formatDate(state.savedAt, true)}` : 'O progresso será salvo automaticamente';
    const lastBackup = state.lastBackupAt ? new Date(state.lastBackupAt).getTime() : 0;
    const backupDue = !lastBackup || Date.now() - lastBackup > 14 * 86400000;
    $('#backupSummary').textContent = state.lastBackupAt ? `Último backup externo: ${formatDate(state.lastBackupAt)}.` : 'Ainda não há uma cópia externa do seu progresso.';
    $('#backupReminder').hidden = !backupDue;
  }

  function renderFeatured() {
    const list = shelfOrders(shelfView);
    $('#currentShelfCount').textContent = shelfOrders('current').length;
    $('#favoriteShelfCount').textContent = shelfOrders('favorites').length;
    $('#queueShelfCount').textContent = shelfOrders('queue').length;
    const labels = {
      current: ['Continue de onde parou', 'Suas ordens ativas, reunidas em um só lugar.'],
      favorites: ['Suas histórias favoritas', 'As ordens que você quer manter sempre por perto.'],
      queue: ['Sua próxima pilha', 'Tudo o que você separou para ler em breve.']
    };
    $('#currentTitle').textContent = labels[shelfView][0];
    $('#shelfDescription').textContent = labels[shelfView][1];
    document.querySelectorAll('.shelf-tab').forEach(button => {
      const active = button.dataset.shelf === shelfView;
      button.classList.toggle('active', active);
      button.setAttribute('aria-selected', String(active));
    });
    $('#featuredOrders').innerHTML = list.map((order, index) => {
      const progress = counts(order);
      const flags = `${state.favoriteOrders[order.id] ? '<span title="Favorita">★</span>' : ''}${state.queueOrders[order.id] ? '<span title="Quero ler">＋</span>' : ''}`;
      return `<article class="featured-card" data-id="${escapeHtml(order.id)}" data-number="${String(index + 1).padStart(2, '0')}" tabindex="0"><div class="featured-top"><span class="tag">${escapeHtml(order.publisher)} · ${escapeHtml(order.family)}</span><span class="featured-flags">${flags}</span></div><h3>${escapeHtml(order.title)}</h3><div class="bar"><span style="width:${progress.pct}%"></span></div><div class="card-progress"><span>${progress.read} de ${progress.total} itens</span><strong>${progress.pct}%</strong></div><p class="resume"><b>ONDE PAREI</b><br>${escapeHtml(currentText(order))}</p></article>`;
    }).join('');
    const empty = $('#shelfEmpty');
    empty.hidden = list.length > 0;
    empty.innerHTML = shelfView === 'favorites' ? '<b>Nenhuma favorita ainda.</b><span>Abra uma ordem e use “Favoritar”.</span>' : '<b>Sua lista está vazia.</b><span>Abra uma ordem e use “Quero ler”.</span>';
    document.querySelectorAll('.featured-card').forEach(card => {
      const open = () => selectOrder(card.dataset.id);
      card.onclick = open;
      card.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } };
    });
  }

  function renderNav() {
    const preferredPublishers = ['DC', 'Marvel', 'Dark Horse'];
    const publishers = [...preferredPublishers.filter(publisher => orders.some(order => order.publisher === publisher)), ...[...new Set(orders.map(order => order.publisher))].filter(publisher => !preferredPublishers.includes(publisher))];
    $('#orderNav').innerHTML = publishers.map(publisher => {
      const families = [...new Set(orders.filter(order => order.publisher === publisher).map(order => order.family))];
      return `<section class="publisher-group"><h3>${escapeHtml(publisher)}</h3>${families.map(family => {
        const list = orders.filter(order => order.publisher === publisher && order.family === family);
        return `<details class="family-group" ${list.some(order => order.id === selected) ? 'open' : ''}><summary>${escapeHtml(family)}<span>${list.length}</span></summary><div>${list.map(order => {
          const progress = counts(order);
          const flags = `${state.favoriteOrders[order.id] ? '★' : ''}${state.queueOrders[order.id] ? '＋' : ''}`;
          return `<button class="nav-button ${order.id === selected ? 'active' : ''}" data-id="${escapeHtml(order.id)}"><span>${escapeHtml(shortTitle(order.title))}${flags ? `<i class="nav-flags">${flags}</i>` : ''}</span><small>${progress.read}/${progress.total} · ${progress.pct}%</small></button>`;
        }).join('')}</div></details>`;
      }).join('')}</section>`;
    }).join('');
    document.querySelectorAll('.nav-button').forEach(button => button.onclick = () => selectOrder(button.dataset.id));
  }

  function shortTitle(title) { return title.replace(' Reading Order', '').replace(/, The Modern Age.*$/, ' — Modern Age').replace(/ \(.+$/, ''); }
  function selectOrder(id) {
    selected = id;
    query = '';
    era = 'all';
    filter = 'all';
    $('#searchInput').value = '';
    document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    render();
    document.querySelector('.library').scrollIntoView({ behavior: 'smooth' });
  }
  function render() { renderNav(); renderOrder(); updateStats(); renderFeatured(); updateSaveStatus(); }

  function updateCollectionButtons(order) {
    const favorite = Boolean(state.favoriteOrders[order.id]);
    const queued = Boolean(state.queueOrders[order.id]);
    const favoriteButton = $('#favoriteOrderBtn');
    const queueButton = $('#queueOrderBtn');
    favoriteButton.classList.toggle('active', favorite);
    queueButton.classList.toggle('active', queued);
    favoriteButton.setAttribute('aria-pressed', String(favorite));
    queueButton.setAttribute('aria-pressed', String(queued));
    favoriteButton.textContent = favorite ? '★ Favorita' : '☆ Favoritar';
    queueButton.textContent = queued ? '✓ Quero ler' : '＋ Quero ler';
  }

  function renderOrder() {
    const order = orders.find(item => item.id === selected);
    if (!order) return;
    const progress = counts(order);
    $('#libraryTitle').textContent = order.title;
    $('#orderPercent').textContent = progress.pct + '%';
    updateCollectionButtons(order);
    const eraSelect = $('#eraFilter');
    const eraOptions = order.sections.map((section, sectionIndex) => ({ value: String(section.key ?? sectionIndex), label: section.title }));
    if (era !== 'all' && !eraOptions.some(option => option.value === era)) era = 'all';
    eraSelect.innerHTML = `<option value="all">Todas as eras</option>${eraOptions.map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('')}`;
    eraSelect.value = era;
    const unread = readableEntriesFor(order).filter(entry => !state.read[entry.key]);
    const nextButton = $('#nextUnreadBtn');
    nextButton.disabled = !unread.length;
    nextButton.textContent = unread.length ? `Próxima não lida · ${unread.length} →` : 'Ordem concluída ✓';
    $('#orderMeta').innerHTML = `<span><b>${escapeHtml(order.publisher)} › ${escapeHtml(order.family)}</b> · ${order.sections.length} capítulos · ${progress.total} itens</span>${order.source ? `<a class="source-link" href="${escapeHtml(order.source)}" target="_blank" rel="noopener">Ver fonte original ↗</a>` : ''}`;
    let visible = 0;
    $('#sections').innerHTML = order.sections.map((section, sectionIndex) => {
      if (era !== 'all' && String(section.key ?? sectionIndex) !== era) return '';
      const rows = section.items.map((item, itemIndex) => {
        const sectionKey = section.key ?? sectionIndex;
        const mainKey = keyFor(order.id, sectionKey, itemIndex);
        const allText = [item.title, item.details, ...(item.companions || []).flatMap(companion => [companion.title, companion.details])].join(' ').toLowerCase();
        if (!allText.includes(query)) return '';
        const makeRow = (entry, key, companion = false) => {
          const read = Boolean(state.read[key]);
          const current = state.current[order.id] === key;
          const show = filter === 'all' || (filter === 'read' && read) || (filter === 'unread' && !read);
          if (!show) return '';
          visible++;
          const note = state.notes[key]?.trim();
          const date = state.completedAt[key];
          return `<div class="comic-row ${companion ? 'companion-row' : ''} ${read ? 'is-read' : ''} ${current ? 'is-current' : ''}" data-key="${escapeHtml(key)}"><input class="check" type="checkbox" ${read ? 'checked' : ''} aria-label="Marcar ${escapeHtml(entry.title)} como lido"><span class="comic-copy"><strong class="comic-title">${escapeHtml(entry.title)}</strong>${entry.details ? `<span class="comic-details">${escapeHtml(entry.details)}</span>` : ''}<span class="reading-metadata">${read && date ? `<span class="read-date">✓ Lido em ${formatDate(date)}</span>` : ''}${note ? '<span class="note-saved">● Nota salva</span>' : ''}</span></span><span class="row-actions"><button class="note-btn ${note ? 'has-note' : ''}" type="button">${note ? '✎ Nota' : '＋ Nota'}</button><button class="current-btn" type="button">${current ? '★ Onde parei' : '☆ Marcar onde parei'}</button></span></div>`;
        };
        const main = makeRow(item, mainKey);
        const companions = (item.companions || []).map((companion, companionIndex) => makeRow(companion, keyFor(order.id, sectionKey, itemIndex, companionIndex), true)).join('');
        if (!main && !companions) return '';
        return `<article class="reading-group">${main}<div class="companions">${companions}</div></article>`;
      }).join('');
      return rows ? `<section class="section-block"><h3 class="section-title">${escapeHtml(section.title)}</h3>${rows}</section>` : '';
    }).join('');
    $('#emptyState').hidden = visible > 0;
    document.querySelectorAll('.comic-row').forEach(row => {
      const check = row.querySelector('.check');
      const currentButton = row.querySelector('.current-btn');
      const noteButton = row.querySelector('.note-btn');
      check.onchange = () => {
        const affected = [row.dataset.key];
        if (!row.classList.contains('companion-row')) row.closest('.reading-group')?.querySelectorAll('.companion-row').forEach(child => affected.push(child.dataset.key));
        const completedNow = new Date().toISOString();
        affected.forEach(key => {
          if (check.checked) { state.read[key] = true; if (!state.completedAt[key]) state.completedAt[key] = completedNow; }
          else { delete state.read[key]; delete state.completedAt[key]; }
        });
        let parentAutoMarked = false;
        if (row.classList.contains('companion-row')) {
          const group = row.closest('.reading-group');
          const parent = group?.querySelector(':scope > .comic-row');
          const children = [...(group?.querySelectorAll('.companion-row') || [])];
          if (parent && children.length) {
            const wasMarked = Boolean(state.read[parent.dataset.key]);
            const allMarked = children.every(child => Boolean(state.read[child.dataset.key]));
            if (allMarked) { state.read[parent.dataset.key] = true; if (!state.completedAt[parent.dataset.key]) state.completedAt[parent.dataset.key] = completedNow; parentAutoMarked = !wasMarked; }
            else { delete state.read[parent.dataset.key]; delete state.completedAt[parent.dataset.key]; }
          }
        }
        save();
        renderNav();
        renderOrder();
        if (affected.length > 1) toast(check.checked ? 'Bloco inteiro marcado como lido' : 'Bloco inteiro desmarcado');
        else if (parentAutoMarked) toast('Obra principal marcada automaticamente');
      };
      currentButton.onclick = () => { state.current[order.id] = row.dataset.key; save(); renderOrder(); toast('Ponto de leitura atualizado'); };
      noteButton.onclick = () => openNote(row.dataset.key, row.querySelector('.comic-title').textContent);
    });
  }

  function openNote(key, title) {
    activeNoteKey = key;
    $('#noteItemTitle').textContent = title;
    $('#noteText').value = state.notes[key] || '';
    $('#deleteNoteBtn').hidden = !state.notes[key];
    $('#noteDialog').showModal();
    requestAnimationFrame(() => $('#noteText').focus());
  }
  function toggleOrderCollection(collection, messageAdded, messageRemoved) {
    if (collection[selected]) { delete collection[selected]; toast(messageRemoved); }
    else { collection[selected] = true; toast(messageAdded); }
    save(); renderNav(); renderOrder();
  }
  function goToNextUnread() {
    const order = orders.find(item => item.id === selected);
    if (!order) return;
    const entries = readableEntriesFor(order);
    const unread = entries.filter(entry => !state.read[entry.key]);
    if (!unread.length) { toast('Esta ordem já está concluída'); return; }
    const currentIndex = entries.findIndex(entry => entry.key === state.current[order.id]);
    const target = currentIndex >= 0 && !state.read[entries[currentIndex].key] ? entries[currentIndex] : entries.slice(currentIndex + 1).find(entry => !state.read[entry.key]) || unread[0];
    query = ''; era = 'all'; filter = 'all'; $('#searchInput').value = '';
    document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    renderOrder();
    requestAnimationFrame(() => {
      const row = [...document.querySelectorAll('.comic-row')].find(element => element.dataset.key === target.key);
      if (!row) return;
      row.classList.add('next-target');
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => row.classList.remove('next-target'), 2400);
    });
    toast(`Próxima leitura: ${target.title}`);
  }
  function exportProgress() {
    state.lastBackupAt = new Date().toISOString();
    save();
    const payload = JSON.stringify({ version: 2, exportedAt: state.lastBackupAt, app: 'Minha Pilha', progress: state }, null, 2);
    const blob = new Blob([payload], { type: 'application/json' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `minha-pilha-backup-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    toast('Backup salvo');
  }
  function toast(message) {
    const element = $('#toast');
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => element.classList.remove('show'), 2600);
  }

  document.querySelectorAll('.filter').forEach(button => button.onclick = () => { filter = button.dataset.filter; document.querySelectorAll('.filter').forEach(item => item.classList.toggle('active', item === button)); renderOrder(); });
  document.querySelectorAll('.shelf-tab').forEach(button => button.onclick = () => { shelfView = button.dataset.shelf; renderFeatured(); });
  $('#eraFilter').onchange = event => { era = event.target.value; renderOrder(); };
  $('#searchInput').oninput = event => { query = event.target.value.trim().toLowerCase(); renderOrder(); };
  $('#nextUnreadBtn').onclick = goToNextUnread;
  $('#favoriteOrderBtn').onclick = () => toggleOrderCollection(state.favoriteOrders, 'Ordem adicionada às favoritas', 'Ordem removida das favoritas');
  $('#queueOrderBtn').onclick = () => toggleOrderCollection(state.queueOrders, 'Ordem adicionada à sua pilha', 'Ordem removida da sua pilha');
  $('#exportBtn').onclick = exportProgress;
  $('#backupNowBtn').onclick = exportProgress;
  $('#reminderBackupBtn').onclick = exportProgress;
  $('#saveNoteBtn').onclick = () => {
    if (!activeNoteKey) return;
    const value = $('#noteText').value.trim();
    if (value) state.notes[activeNoteKey] = value; else delete state.notes[activeNoteKey];
    save(); $('#noteDialog').close(); renderOrder(); toast(value ? 'Nota salva' : 'Nota removida');
  };
  $('#deleteNoteBtn').onclick = () => {
    if (!activeNoteKey) return;
    delete state.notes[activeNoteKey]; save(); $('#noteDialog').close(); renderOrder(); toast('Nota apagada');
  };
  $('#noteDialog').addEventListener('close', () => { activeNoteKey = null; });
  $('#importInput').onchange = async event => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      const imported = blankState(data.progress || data);
      Object.keys(state).forEach(key => delete state[key]);
      Object.assign(state, imported);
      save(); render(); toast('Backup restaurado');
    } catch { toast('Arquivo de backup inválido'); }
    event.target.value = '';
  };
  $('#resetBtn').onclick = () => {
    if (!confirm('Apagar leituras, notas, favoritos e toda a sua estante neste navegador?')) return;
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, blankState());
    save(); render(); toast('Sua estante foi limpa');
  };
  window.addEventListener('beforeinstallprompt', event => { event.preventDefault(); deferredInstallPrompt = event; $('#installBtn').hidden = false; });
  $('#installBtn').onclick = async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    $('#installBtn').hidden = true;
  };
  window.addEventListener('appinstalled', () => { $('#installBtn').hidden = true; toast('Minha Pilha instalada'); });
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));

  render();
  if (recoveredFromBackup) setTimeout(() => toast('Progresso recuperado do backup automático'), 500);
})();
