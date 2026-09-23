(() => {
  const classify = order => {
    if (order.publisher && order.family) return order;
    if (order.title.toLowerCase().includes('spider-man')) return { ...order, publisher: 'Marvel', family: 'Homem-Aranha' };
    return { ...order, publisher: 'DC', family: 'Batman' };
  };
  const orders = [...(window.COMIC_ORDERS || []), ...(window.EXPANDED_ORDERS || [])].map(classify);
  let KEY = 'minha-pilha-v1';
  let AUTO_BACKUP_KEY = 'minha-pilha-v1-auto-backup';
  let accountId = null;
  let applyingRemote = false;
  const accountMemory = new Map();
  let recoveredFromBackup = false;
  let storageWarning = false;
  const expandedGroups = new Set();
  let expandAll = false;
  let navQuery = '';
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const state = load();
  let selected = orders.some(order => order.id === state.lastSelectedOrder) ? state.lastSelectedOrder : orders[0]?.id;
  let filter = 'all';
  let era = 'all';
  let query = '';
  let shelfView = 'current';
  let activeNoteKey = null;
  let deferredInstallPrompt = null;

  const $ = selector => document.querySelector(selector);
  const escapeHtml = value => String(value).replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  const keyFor = (orderId, sectionIndex, itemIndex, childIndex = null) => `${orderId}:${sectionIndex}:${itemIndex}${childIndex === null ? '' : ':c' + childIndex}`;

  function validateProgress(raw) {
    const plain = value => value && typeof value === 'object' && !Array.isArray(value);
    if (!plain(raw) || !plain(raw.read)) throw new Error('Formato inválido');
    const schemas = { read: 'boolean', current: 'string', notes: 'string', favoriteOrders: 'boolean', queueOrders: 'boolean', completedAt: 'date' };
    for (const [field, type] of Object.entries(schemas)) {
      if (raw[field] === undefined) continue;
      if (!plain(raw[field])) throw new Error('Mapa inválido');
      for (const [key, value] of Object.entries(raw[field])) {
        if (['__proto__', 'constructor', 'prototype'].includes(key)) throw new Error('Chave inválida');
        if (type === 'date' ? !isValidDate(value) : typeof value !== type) throw new Error('Valor inválido');
      }
    }
    if (raw.lastSelectedOrder != null && typeof raw.lastSelectedOrder !== 'string') throw new Error('Ordem inválida');
    for (const field of ['savedAt', 'lastBackupAt']) if (raw[field] != null && !isValidDate(raw[field])) throw new Error('Data inválida');
    return blankState(raw);
  }
  function blankState(raw = {}) {
    return {
      read: raw.read && typeof raw.read === 'object' ? raw.read : {},
      current: raw.current && typeof raw.current === 'object' ? raw.current : {},
      notes: raw.notes && typeof raw.notes === 'object' ? raw.notes : {},
      favoriteOrders: raw.favoriteOrders && typeof raw.favoriteOrders === 'object' ? raw.favoriteOrders : {},
      queueOrders: raw.queueOrders && typeof raw.queueOrders === 'object' ? raw.queueOrders : {},
      completedAt: raw.completedAt && typeof raw.completedAt === 'object' ? raw.completedAt : {},
      lastSelectedOrder: typeof raw.lastSelectedOrder === 'string' ? raw.lastSelectedOrder : null,
      savedAt: raw.savedAt || null,
      lastBackupAt: raw.lastBackupAt || null
    };
  }

  function isValidDate(value) {
    return typeof value === 'string' && !Number.isNaN(new Date(value).getTime());
  }

  function ensureCompletionDates(target, fallbackDate = new Date().toISOString()) {
    if (!target.completedAt || typeof target.completedAt !== 'object') target.completedAt = {};
    const safeFallback = isValidDate(fallbackDate) ? fallbackDate : new Date().toISOString();
    Object.keys(target.read || {}).forEach(key => {
      if (target.read[key] && !isValidDate(target.completedAt[key])) target.completedAt[key] = safeFallback;
    });
    Object.keys(target.completedAt).forEach(key => {
      if (!target.read?.[key]) delete target.completedAt[key];
    });
  }

  function load() {
    for (const key of [KEY, AUTO_BACKUP_KEY]) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw);
        const validated = validateProgress(parsed);
        if (key === AUTO_BACKUP_KEY) recoveredFromBackup = true;
        return validated;
      } catch {}
    }
    return blankState();
  }

  function save() {
    state.savedAt = new Date().toISOString();
    if (!applyingRemote) window.PilhaCloud?.changed(state);
    const serialized = JSON.stringify(state);
    try {
      const previous = localStorage.getItem(KEY);
      if (previous && previous !== serialized) {
        try { validateProgress(JSON.parse(previous)); localStorage.setItem(AUTO_BACKUP_KEY, previous); } catch {}
      }
      localStorage.setItem(KEY, serialized);
      storageWarning = false;
    } catch {
      storageWarning = true;
      toast('Não foi possível salvar no navegador. Baixe um backup para guardar suas alterações.');
    }
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

  function readableEntriesFor(order) { return entriesFor(order); }

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
      return progress.read < progress.total && (progress.read > 0 || Boolean(state.current[order.id]));
    });
  }
  function uniqueOrders(list) { const seen = new Set(); return list.filter(order => order && !seen.has(order.id) && seen.add(order.id)); }
  function shelfOrders(view) {
    if (view === 'completed') return orders.filter(order => { const progress = counts(order); return progress.total > 0 && progress.read === progress.total; });
    if (view === 'favorites') return orders.filter(order => state.favoriteOrders[order.id]);
    if (view === 'queue') return orders.filter(order => state.queueOrders[order.id]);
    return activeOrders();
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
    $('#libraryCount').textContent = orders.length;
    $('#shelfCount').textContent = uniqueOrders([...activeOrders(), ...shelfOrders('completed'), ...shelfOrders('favorites'), ...shelfOrders('queue')]).length;
    $('#totalItems').textContent = total.total.toLocaleString('pt-BR');
    $('#totalRead').textContent = total.read.toLocaleString('pt-BR');
    $('#totalPercent').textContent = (total.total ? Math.round(total.read / total.total * 100) : 0) + '%';
    $('#activeCount').textContent = activeOrders().length.toLocaleString('pt-BR');
  }

  function updateSaveStatus() {
    const saveStatus = $('#saveStatus');
    saveStatus.querySelector('span').textContent = storageWarning ? 'Alterações não salvas' : relativeSave(state.savedAt);
    saveStatus.querySelector('i').style.background = storageWarning ? '#eb8d69' : '';
    saveStatus.title = state.savedAt ? `Último salvamento: ${formatDate(state.savedAt, true)}` : 'O progresso será salvo automaticamente';
    const lastBackup = state.lastBackupAt ? new Date(state.lastBackupAt).getTime() : 0;
    const backupDue = !lastBackup || Date.now() - lastBackup > 14 * 86400000;
    $('#backupSummary').textContent = state.lastBackupAt ? `Último backup externo: ${formatDate(state.lastBackupAt)}.` : 'Ainda não há uma cópia externa do seu progresso.';
    $('#backupReminder').hidden = !backupDue;
  }

  function applyOrderTheme(order) {
    const theme = window.MINHA_PILHA_THEME_FOR?.(order);
    if (!theme) return;
    const root = document.documentElement;
    root.dataset.characterTheme = theme.key;
    root.style.setProperty('--red', theme.accent);
    root.style.setProperty('--red2', theme.accentDark);
    root.style.setProperty('--gold', theme.secondary);
    root.style.setProperty('--theme-rgb', theme.rgb);
    root.style.setProperty('--theme-secondary-rgb', theme.secondaryRgb);
    root.style.setProperty('--check-ink', theme.checkInk);
    root.style.setProperty('--soft-red', `rgb(${theme.rgb} / .12)`);
    root.style.setProperty('--soft-gold', `rgb(${theme.secondaryRgb} / .12)`);
  }

  function renderFeatured() {
    const list = shelfOrders(shelfView);
    $('#currentShelfCount').textContent = shelfOrders('current').length;
    $('#favoriteShelfCount').textContent = shelfOrders('favorites').length;
    $('#queueShelfCount').textContent = shelfOrders('queue').length;
    $('#completedShelfCount').textContent = shelfOrders('completed').length;
    const labels = {
      current: ['Continue de onde parou', 'Suas ordens ativas, reunidas em um só lugar.'],
      favorites: ['Suas histórias favoritas', 'As ordens que você quer manter sempre por perto.'],
      queue: ['Sua próxima pilha', 'Tudo o que você separou para ler em breve.'],
      completed: ['Histórias que você já viveu', 'Ordens com todos os itens marcados como lidos.']
    };
    $('#currentTitle').textContent = labels[shelfView][0];
    $('#shelfDescription').textContent = labels[shelfView][1];
    document.querySelectorAll('.shelf-tab').forEach(button => {
      const active = button.dataset.shelf === shelfView;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    $('#featuredOrders').innerHTML = list.map((order, index) => {
      const progress = counts(order);
      const flags = `${state.favoriteOrders[order.id] ? '<span title="Favorita">★</span>' : ''}${state.queueOrders[order.id] ? '<span title="Quero ler">＋</span>' : ''}`;
      return `<article class="featured-card" data-id="${escapeHtml(order.id)}" data-number="${String(index + 1).padStart(2, '0')}" tabindex="0"><div class="featured-top"><span class="tag">${escapeHtml(order.publisher)} · ${escapeHtml(order.family)}</span><span class="featured-flags">${flags}</span></div><h3>${escapeHtml(order.title)}</h3><div class="bar"><span style="width:${progress.pct}%"></span></div><div class="card-progress"><span>${progress.read} de ${progress.total} itens</span><strong>${progress.pct}%</strong></div><p class="resume">${progress.read === progress.total ? '<b>LEITURA CONCLUÍDA ✓</b>' : `<b>ONDE PAREI</b><br>${escapeHtml(currentText(order))}`}</p></article>`;
    }).join('');
    const empty = $('#shelfEmpty');
    empty.hidden = list.length > 0;
    empty.innerHTML = shelfView === 'favorites' ? '<b>Suas favoritas moram aqui.</b><span>Abra uma ordem e use “Favoritar” para guardá-la nesta estante.</span>' : shelfView === 'queue' ? '<b>O que vem na próxima pilha?</b><span>Use “Quero ler” em uma ordem para reservá-la para depois.</span>' : '<b>Sua primeira história está esperando.</b><span>Marque um item como lido ou guarde onde parou para continuar por aqui.</span>';
    empty.innerHTML += '<button class="icon-button" id="browseLibraryBtn">Explorar biblioteca →</button>';
    if (shelfView === 'completed') empty.innerHTML = '<b>Cada última página merece um lugar.</b><span>Ao concluir todos os itens de uma ordem, ela aparece aqui automaticamente.</span><button class="icon-button" id="browseLibraryBtn">Explorar biblioteca →</button>';
    $('#browseLibraryBtn').onclick = () => showView('library');
    document.querySelectorAll('.featured-card').forEach(card => {
      const open = () => selectOrder(card.dataset.id);
      card.onclick = open;
      card.onkeydown = event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } };
    });
  }

  function renderNav() {
    const visibleOrders = orders.filter(order => normalize([order.title, order.family, order.publisher].join(' ')).includes(navQuery));
    $('#navEmpty').hidden = visibleOrders.length > 0;
    const preferredPublishers = ['DC', 'Marvel', 'Dark Horse'];
    const publishers = [...preferredPublishers.filter(publisher => visibleOrders.some(order => order.publisher === publisher)), ...[...new Set(visibleOrders.map(order => order.publisher))].filter(publisher => !preferredPublishers.includes(publisher))];
    $('#orderNav').innerHTML = publishers.map(publisher => {
      const families = [...new Set(visibleOrders.filter(order => order.publisher === publisher).map(order => order.family))];
      return `<section class="publisher-group"><h3>${escapeHtml(publisher)}</h3>${families.map(family => {
        const list = visibleOrders.filter(order => order.publisher === publisher && order.family === family);
        return `<details class="family-group" ${navQuery || list.some(order => order.id === selected) ? 'open' : ''}><summary>${escapeHtml(family)}<span>${list.length}</span></summary><div>${list.map(order => {
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
    if (!orders.some(order => order.id === id)) return;
    selected = id;
    showView('library', false);
    $('#sidebar').classList.remove('nav-open');
    $('#mobileNavBtn').setAttribute('aria-expanded', 'false');
    state.lastSelectedOrder = id;
    applyOrderTheme(orders.find(order => order.id === id));
    query = '';
    era = 'all';
    filter = 'all';
    $('#searchInput').value = '';
    document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    save();
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
    applyOrderTheme(order);
    const progress = counts(order);
    const batmanModern = order.id === 'batman-reading-order-the-modern-age-post-crisis';
    $('#libraryTitle').textContent = batmanModern ? 'Batman' : shortTitle(order.title);
    $('#orderSubtitle').textContent = order.description || (batmanModern ? 'A Era Moderna · Pós-Crise' : `${order.publisher} · ${order.family}`);
    $('#publisherBadge').textContent = order.publisher;
    $('#orderPhaseCount').textContent = `${order.sections.length} FASES`;
    $('#orderProgressText').textContent = `${progress.read.toLocaleString('pt-BR')} de ${progress.total.toLocaleString('pt-BR')} itens lidos`;
    $('#orderProgressBar').style.width = progress.pct + '%';
    $('#orderPercent').textContent = progress.pct + '%';
    updateCollectionButtons(order);
    const eraSelect = $('#eraFilter');
    const eraOptions = order.sections.map((section, sectionIndex) => ({ value: String(section.key ?? sectionIndex), label: section.title }));
    if (era !== 'all' && !eraOptions.some(option => option.value === era)) era = 'all';
    eraSelect.innerHTML = `<option value="all">Todas as fases</option>${eraOptions.map(option => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('')}`;
    eraSelect.value = era;
    const unread = readableEntriesFor(order).filter(entry => !state.read[entry.key]);
    const nextButton = $('#nextUnreadBtn');
    nextButton.disabled = !unread.length;
    const target = nextEntry(order);
    const savedPoint = target && state.current[order.id] === target.key;
    nextButton.textContent = target ? (savedPoint ? 'Retomar leitura →' : progress.read ? 'Próxima leitura →' : 'Começar leitura →') : 'Ordem concluída ✓';
    $('#resumeLabel').textContent = savedPoint ? 'ONDE VOCÊ PAROU' : 'PRÓXIMA LEITURA';
    $('#resumeTitle').textContent = target?.title || 'Todas as leituras desta ordem estão concluídas.';
    $('#resumePhase').textContent = target ? (order.sections.find((section, index) => target.key.startsWith(`${order.id}:${section.key ?? index}:`))?.title || '') : 'Sua pilha ganhou mais uma história.';
    $('#orderMeta').innerHTML = `<span><b>${escapeHtml(order.publisher)} › ${escapeHtml(order.family)}</b> · ${order.sections.length} capítulos · ${progress.total} itens</span>${order.source ? `<a class="source-link" href="${escapeHtml(order.source)}" target="_blank" rel="noopener">Ver fonte original ↗</a>` : ''}`;
    let visible = 0;
    $('#sections').innerHTML = order.sections.map((section, sectionIndex) => {
      if (era !== 'all' && String(section.key ?? sectionIndex) !== era) return '';
      const rows = section.items.map((item, itemIndex) => {
        const sectionKey = section.key ?? sectionIndex;
        const mainKey = keyFor(order.id, sectionKey, itemIndex);
        const allText = [item.title, item.details, ...(item.companions || []).flatMap(companion => [companion.title, companion.details])].join(' ');
        if (!normalize(allText).includes(query)) return '';
        const groupKeys = [mainKey, ...(item.companions || []).map((_, companionIndex) => keyFor(order.id, sectionKey, itemIndex, companionIndex))];
        const groupRead = groupKeys.filter(key => state.read[key]).length;
        const groupComplete = groupRead === groupKeys.length;
        const groupProgress = Math.round(groupRead / groupKeys.length * 100);
        const groupAction = groupKeys.length > 1 ? `<button class="group-toggle ${groupComplete ? 'is-complete' : ''}" type="button" data-group-keys="${escapeHtml(groupKeys.join('|'))}" aria-label="${groupComplete ? 'Desmarcar' : 'Marcar'} todo o arco">${groupComplete ? '↺ Desmarcar tudo' : '✓ Marcar tudo'}<small>${groupRead}/${groupKeys.length}</small></button>` : '';
        const makeRow = (entry, key, companion = false, arcAction = '') => {
          const read = Boolean(state.read[key]);
          const current = state.current[order.id] === key;
          const show = filter === 'all' || (filter === 'read' && read) || (filter === 'unread' && !read);
          if (!show) return '';
          visible++;
          const note = state.notes[key]?.trim();
          const date = state.completedAt[key];
          return `<div class="comic-row ${companion ? 'companion-row' : ''} ${read ? 'is-read' : ''} ${current ? 'is-current' : ''}" data-key="${escapeHtml(key)}"><input class="check" type="checkbox" ${read ? 'checked' : ''} aria-label="Marcar ${escapeHtml(entry.title)} como lido"><span class="comic-copy"><strong class="comic-title">${escapeHtml(entry.title)}</strong>${entry.details ? `<span class="comic-details">${escapeHtml(entry.details)}</span>` : ''}<span class="reading-metadata">${read && date ? `<span class="read-date">✓ Lido em ${formatDate(date)}</span>` : ''}${note ? '<span class="note-saved">● Nota salva</span>' : ''}</span></span><span class="row-actions">${arcAction}<button class="note-btn ${note ? 'has-note' : ''}" type="button">${note ? '✎ Nota' : '＋ Nota'}</button><button class="current-btn" type="button" title="${current ? 'Onde parei' : 'Marcar onde parei'}" aria-label="${current ? 'Onde parei' : 'Marcar onde parei'}: ${escapeHtml(entry.title)}">${current ? '★ Onde parei' : '☆ Marcar onde parei'}</button></span></div>`;
        };
        const main = makeRow(item, mainKey, false, groupAction);
        const companions = (item.companions || []).map((companion, companionIndex) => makeRow(companion, keyFor(order.id, sectionKey, itemIndex, companionIndex), true)).join('');
        if (!main && !companions) return '';
        return `<article data-parent-key="${escapeHtml(mainKey)}" data-keys="${escapeHtml(groupKeys.join('|'))}" class="reading-group ${groupComplete ? 'group-complete' : groupRead ? 'group-partial' : ''}" style="--group-progress:${groupProgress}%">${main}${companions ? `<details class="group-details" data-detail="${escapeHtml(mainKey)}" ${expandAll || query || filter !== 'all' || expandedGroups.has(mainKey) ? 'open' : ''}><summary>${(item.companions || []).length} ${(item.companions || []).length === 1 ? 'item associado' : 'itens associados'} <span>Ver detalhes</span></summary><div class="companions">${companions}</div></details>` : ''}</article>`;
      }).join('');
      return rows ? `<section class="section-block"><h3 class="section-title"><span class="phase-number">${String(sectionIndex + 1).padStart(2, '0')}</span>${escapeHtml(section.title)}</h3>${rows}</section>` : '';
    }).join('');
    $('#emptyState').hidden = visible > 0;
    $('#visibleCount').textContent = `${visible} itens`;
    document.querySelectorAll('.filter').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.filter === filter)); button.classList.toggle('active', button.dataset.filter === filter); });
    document.querySelectorAll('.group-details').forEach(detail => detail.ontoggle = () => {
      if (detail.open) expandedGroups.add(detail.dataset.detail); else expandedGroups.delete(detail.dataset.detail);
    });
    document.querySelectorAll('.comic-row').forEach(row => {
      const check = row.querySelector('.check');
      const currentButton = row.querySelector('.current-btn');
      const noteButton = row.querySelector('.note-btn');
      const groupToggle = row.querySelector('.group-toggle');
      check.onchange = () => {
        const affected = [row.dataset.key];
        const completedNow = new Date().toISOString();
        affected.forEach(key => {
          if (check.checked) { state.read[key] = true; if (!state.completedAt[key]) state.completedAt[key] = completedNow; }
          else { delete state.read[key]; delete state.completedAt[key]; }
        });
        let parentAutoMarked = false;
        let parentPreserved = false;
        if (row.classList.contains('companion-row')) {
          const group = row.closest('.reading-group');
          const parentKey = group?.dataset.parentKey;
          const childKeys = (group?.dataset.keys || '').split('|').slice(1);
          if (parentKey && childKeys.length) {
            const wasMarked = Boolean(state.read[parentKey]);
            const allMarked = childKeys.every(key => Boolean(state.read[key]));
            if (allMarked) { state.read[parentKey] = true; if (!state.completedAt[parentKey]) state.completedAt[parentKey] = completedNow; parentAutoMarked = !wasMarked; }
            else if (wasMarked) parentPreserved = true;
          }
        }

        save();
        renderNav();
        renderOrder();
        if (parentAutoMarked) toast('Obra principal marcada automaticamente');
        else if (parentPreserved) toast('Subitem desmarcado; obra principal mantida');
      };
      if (groupToggle) groupToggle.onclick = () => {
        const keys = groupToggle.dataset.groupKeys.split('|').filter(Boolean);
        const markAll = !keys.every(key => state.read[key]);
        const completedNow = new Date().toISOString();
        keys.forEach(key => {
          if (markAll) {
            state.read[key] = true;
            if (!state.completedAt[key]) state.completedAt[key] = completedNow;
          } else {
            delete state.read[key];
            delete state.completedAt[key];
          }
        });
        save();
        renderNav();
        renderOrder();
        toast(markAll ? 'Arco inteiro marcado como lido' : 'Arco inteiro desmarcado');
      };
      currentButton.setAttribute('aria-pressed', String(state.current[order.id] === row.dataset.key));
      if (state.current[order.id] === row.dataset.key) {
        currentButton.textContent = '★ Remover marcador';
        currentButton.title = 'Remover ponto de leitura';
        currentButton.setAttribute('aria-label', `Remover ponto de leitura: ${row.querySelector('.comic-title').textContent}`);
      }
      currentButton.onclick = () => {
        const marked = toggleReadingPoint(order.id, row.dataset.key);
        save(); renderOrder(); toast(marked ? 'Ponto de leitura atualizado' : 'Ponto de leitura removido');
      };
      noteButton.onclick = () => openNote(row.dataset.key, row.querySelector('.comic-title').textContent);
    });
  }

  function toggleReadingPoint(orderId, key) {
    if (state.current[orderId] === key) { delete state.current[orderId]; return false; }
    state.current[orderId] = key;
    return true;
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
    const target = nextEntry(order);
    query = ''; era = 'all'; filter = 'all'; $('#searchInput').value = '';
    document.querySelectorAll('.filter').forEach(button => button.classList.toggle('active', button.dataset.filter === 'all'));
    renderOrder();
    requestAnimationFrame(() => {
      const row = [...document.querySelectorAll('.comic-row')].find(element => element.dataset.key === target.key);
      if (!row) return;
      const details = row.closest('details');
      if (details) { details.open = true; expandedGroups.add(details.dataset.detail); }
      row.classList.add('next-target');
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => row.classList.remove('next-target'), 2400);
    });
    toast(`Próxima leitura: ${target.title}`);
  }
  function exportProgress() {
    const exportedAt = new Date().toISOString();
    state.lastBackupAt = exportedAt;
    ensureCompletionDates(state, exportedAt);
    save();
    const payload = JSON.stringify({ version: 3, schema: 'minha-pilha-progress', exportedAt, app: 'Minha Pilha', progress: blankState(state) }, null, 2);
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
  $('#searchInput').oninput = event => { query = normalize(event.target.value.trim()); renderOrder(); };
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
      if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Backup inválido');
      if (data.schema && data.schema !== 'minha-pilha-progress') throw new Error('Backup de outro app');
      const imported = validateProgress(data.progress || data);
      ensureCompletionDates(imported, data.exportedAt || imported.savedAt || new Date().toISOString());
      Object.keys(state).forEach(key => delete state[key]);
      Object.assign(state, imported);
      selected = orders.some(order => order.id === state.lastSelectedOrder) ? state.lastSelectedOrder : selected;
      query = ''; era = 'all'; filter = 'all'; $('#searchInput').value = '';
      save(); render(); toast('Backup restaurado');
    } catch { toast('Arquivo de backup inválido'); }
    event.target.value = '';
  };
  $('#resetBtn').onclick = () => {
    const scope = accountId ? 'na sua conta e nos dispositivos sincronizados' : 'neste navegador';
    if (!confirm(`Apagar leituras, notas, favoritos e toda a sua estante ${scope}?`)) return;
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
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).catch(() => {}));

  function nextEntry(order) {
    const entries = readableEntriesFor(order);
    const unread = entries.filter(entry => !state.read[entry.key]);
    const index = entries.findIndex(entry => entry.key === state.current[order.id]);
    return index >= 0 && !state.read[entries[index].key] ? entries[index] : entries.slice(index + 1).find(entry => !state.read[entry.key]) || unread[0];
  }
  function showView(view, scroll = true) {
    const shelf = view === 'shelf';
    $('#libraryPanel').hidden = shelf;
    $('#shelfPanel').hidden = !shelf;
    $('#libraryViewBtn').classList.toggle('active', !shelf);
    $('#shelfViewBtn').classList.toggle('active', shelf);
    $('#libraryViewBtn').setAttribute('aria-pressed', String(!shelf));
    $('#shelfViewBtn').setAttribute('aria-pressed', String(shelf));
    if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  $('#libraryViewBtn').onclick = () => showView('library');
  $('#shelfViewBtn').onclick = () => showView('shelf');
  $('.brand').onclick = event => { event.preventDefault(); showView('library'); };
  $('#restoreBtn').onclick = () => $('#importInput').click();
  $('#mobileNavBtn').onclick = () => {
    const open = $('#sidebar').classList.toggle('nav-open');
    $('#mobileNavBtn').setAttribute('aria-expanded', String(open));
    if (open) $('#navSearch').focus();
  };
  $('#navSearch').oninput = event => { navQuery = normalize(event.target.value.trim()); renderNav(); };
  $('#expandAllBtn').onclick = () => {
    expandAll = !expandAll;
    if (!expandAll) expandedGroups.clear();
    $('#expandAllBtn').textContent = expandAll ? 'Recolher detalhes' : 'Expandir detalhes';
    $('#expandAllBtn').setAttribute('aria-pressed', String(expandAll));
    renderOrder();
  };
  $('#clearFiltersBtn').onclick = () => { filter = 'all'; query = ''; era = 'all'; $('#searchInput').value = ''; renderOrder(); };
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !event.ctrlKey && !event.metaKey && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('#noteDialog').open) {
      event.preventDefault(); showView('library', false); $('#searchInput').focus();
    }
  });
  window.PilhaApp = {
    getProgress: () => JSON.parse(JSON.stringify(state)),
    validate: validateProgress,
    empty: blankState,
    guestProgress() {
      if (accountId === null) return this.getProgress();
      if (accountMemory.has(null)) return JSON.parse(JSON.stringify(accountMemory.get(null)));
      for (const key of ['minha-pilha-v1', 'minha-pilha-v1-auto-backup']) {
        try { const raw = localStorage.getItem(key); if (raw) return validateProgress(JSON.parse(raw)); } catch {}
      }
      return blankState();
    },
    setAccount(uid) {
      uid = uid || null;
      if (accountId === uid) return this.getProgress();
      accountMemory.set(accountId, this.getProgress());
      accountId = uid || null;
      KEY = uid ? `minha-pilha-account:${uid}` : 'minha-pilha-v1';
      AUTO_BACKUP_KEY = `${KEY}-auto-backup`;
      if ($('#noteDialog').open) $('#noteDialog').close();
      Object.keys(state).forEach(key => delete state[key]);
      Object.assign(state, accountMemory.has(accountId) ? JSON.parse(JSON.stringify(accountMemory.get(accountId))) : load());
      selected = orders.some(order => order.id === state.lastSelectedOrder) ? state.lastSelectedOrder : orders[0]?.id;
      query = ''; era = 'all'; filter = 'all'; $('#searchInput').value = '';
      render();
      return this.getProgress();
    },
    applyCloud(progress) {
      const incoming = validateProgress(progress);
      // Selection and external-backup dates belong to this device.
      for (const field of ['read', 'current', 'notes', 'favoriteOrders', 'queueOrders', 'completedAt']) state[field] = incoming[field];
      applyingRemote = true;
      try { save(); render(); } finally { applyingRemote = false; }
    },
    toast
  };
  render();
  if (recoveredFromBackup) setTimeout(() => toast('Progresso recuperado do backup automático'), 500);
})();
