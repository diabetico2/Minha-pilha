(() => {
  const app=window.PilhaApp,$=selector=>document.querySelector(selector);
  const escape=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  let query='',filter='all',limit=18;
  const homeButton=document.createElement('button');homeButton.id='homeViewBtn';homeButton.className='workspace-link';homeButton.innerHTML='<span>⌂</span> Início';homeButton.onclick=()=>app.showView('home');$('.workspace-nav').prepend(homeButton);
  const panel=document.createElement('section');panel.id='homePanel';panel.className='home-panel';panel.setAttribute('aria-labelledby','homeTitle');
  panel.innerHTML=`<header class="home-welcome"><div><p class="eyebrow" id="homeGreeting">BEM-VINDO À SUA PILHA</p><h1 id="homeTitle">Toda grande história<br>começa com uma página.</h1><p class="home-description">Quadrinhos, mangás e um lugar para guardar cada leitura.</p><div class="home-hero-actions"><button class="dialog-primary" id="homeContinueBtn">Explorar biblioteca ↓</button><button class="dialog-secondary" id="homeCreateBtn">＋ Criar minha lista</button></div></div><div class="home-feature" id="homeFeature"></div></header>
    <div class="home-section-heading"><div><p class="eyebrow">EXPLORE SEU UNIVERSO</p><h2>Sua biblioteca, de capa a capa.</h2></div><p id="homeCount"></p></div>
    <div class="home-search-row"><label class="search"><span>⌕</span><input id="homeSearch" type="search" placeholder="Busque por personagem, título ou editora" aria-label="Buscar na página inicial"></label><button class="collection-action" id="homeImportBtn">Importar lista</button></div>
    <div class="home-filters" role="group" aria-label="Filtrar biblioteca"><button data-home-filter="all" class="active" aria-pressed="true">Tudo</button><button data-home-filter="personal" aria-pressed="false">Minhas listas</button><button data-home-filter="DC" aria-pressed="false">DC</button><button data-home-filter="Marvel" aria-pressed="false">Marvel</button><button data-home-filter="Dark Horse" aria-pressed="false">Dark Horse</button></div>
    <div id="homeCards" class="home-grid"></div><div id="homeEmpty" class="home-empty" hidden><h3>A próxima lista pode ser sua.</h3><p>Crie uma lista ou tente outra busca.</p><button class="dialog-primary" id="homeEmptyCreate">Criar lista</button></div><button class="dialog-secondary home-more" id="homeMoreBtn">Mostrar mais histórias</button>
    <p class="home-credits">Imagens do catálogo: créditos e fontes nos cartões. Personagens e artes pertencem aos respectivos criadores e editoras.</p>`;
  $('#libraryPanel').before(panel);
  function art(order) {
    if(order.personal)return {url:order.cover||window.PilhaMedia.cover(order.title,window.MINHA_PILHA_THEME_FOR?.(order)?.accent||'#d4b76c','orbit',order.family==='Mangás'?'manga':'comic')};
    return window.PILHA_CATALOGUE_COVERS?.[order.id]||{url:window.PilhaMedia.cover(order.title)};
  }
  const fallbackImages=new Map();
  function artwork(order) { if(order.personal&&!order.cover){if(!fallbackImages.has(order.title))fallbackImages.set(order.title,art(order));return fallbackImages.get(order.title);}return art(order); }
  function refresh() {
    const catalogue=app.catalogue(),profile=app.getProfile(),active=catalogue.find(order=>order.progress.read>0&&order.progress.read<order.progress.total),feature=active||catalogue.find(order=>order.id==='batman-reading-order-the-modern-age-post-crisis')||catalogue[0];
    $('#homeGreeting').textContent=profile.displayName?`BOM TER VOCÊ AQUI, ${profile.displayName}`:'BEM-VINDO À SUA PILHA';
    $('#homeContinueBtn').textContent=active?'Continuar minha leitura →':'Explorar biblioteca ↓';
    $('#homeContinueBtn').onclick=()=>active?app.openOrder(active.id):$('#homeSearch').focus();
    if(feature){const image=artwork(feature);$('#homeFeature').innerHTML=`<button class="home-feature-button" data-open="${escape(feature.id)}"><img class="${image.fit==='contain'?'cover-contain':''}" src="${escape(image.url)}" alt="${escape(feature.title)}" referrerpolicy="no-referrer"><span><small>${active?'CONTINUE DE ONDE PAROU':'UMA HISTÓRIA PARA COMEÇAR'}</small><strong>${escape(feature.title.replace(' Reading Order',''))}</strong><b>Abrir leitura ↗</b></span></button>`;$('#homeFeature button').onclick=()=>app.openOrder(feature.id);}
    const filtered=catalogue.filter(order=>(filter==='all'||filter==='personal'&&order.personal||order.publisher===filter)&&normalize([order.title,order.family,order.publisher].join(' ')).includes(query));
    const sorted=[...filtered.filter(order=>order.personal),...filtered.filter(order=>!order.personal)];
    $('#homeCount').textContent=`${filtered.length} ${filtered.length===1?'lista para explorar':'listas para explorar'}`;
    $('#homeCards').innerHTML=sorted.slice(0,limit).map(order=>{
      const image=artwork(order),progress=order.progress;
      return `<article class="home-card"><button class="home-card-open" data-open="${escape(order.id)}"><span class="home-card-art"><img class="${image.fit==='contain'?'cover-contain':''}" src="${escape(image.url)}" alt="" loading="lazy" referrerpolicy="no-referrer"><span class="home-card-tag">${escape(order.personal?'PESSOAL · '+order.family:order.publisher)}</span></span><span class="home-card-copy"><span class="home-card-family">${escape(order.family)}</span><strong>${escape(order.title.replace(' Reading Order',''))}</strong><span class="home-card-progress">${progress.read} de ${progress.total} itens <b>${progress.pct}%</b></span><span class="bar"><span style="width:${progress.pct}%"></span></span></span></button>${order.personal?`<div class="home-card-tools"><button data-edit="${escape(order.id)}">Editar</button><button data-share="${escape(order.id)}">Compartilhar</button></div>`:image.source?`<a class="home-card-credit" href="${escape(image.source)}" target="_blank" rel="noopener noreferrer">Imagem: ${escape(image.credit)} ↗</a>`:''}</article>`;
    }).join('');
    $('#homeEmpty').hidden=filtered.length>0;$('#homeMoreBtn').hidden=filtered.length<=limit;
    document.querySelectorAll('[data-home-filter]').forEach(button=>{const active=button.dataset.homeFilter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
    panel.querySelectorAll('img').forEach(image=>{image.onerror=()=>{image.hidden=true;image.parentElement.classList.add('art-unavailable');};});
  }
  $('#homeCards').onclick=event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.open)app.openOrder(button.dataset.open);if(button.dataset.edit)window.PilhaPersonalUI.edit(button.dataset.edit);if(button.dataset.share)window.PilhaPersonalUI.share(button.dataset.share);};
  for(const id of ['#homeCreateBtn','#homeEmptyCreate'])$(id).onclick=()=>$('#newPersonalBtn').click();
  $('#homeImportBtn').onclick=()=>$('#importPersonalBtn').click();
  $('#homeSearch').oninput=event=>{query=normalize(event.target.value.trim());limit=18;refresh();};
  document.querySelectorAll('[data-home-filter]').forEach(button=>button.onclick=()=>{filter=button.dataset.homeFilter;limit=18;refresh();});
  $('#homeMoreBtn').onclick=()=>{limit+=18;refresh();};
  window.PilhaHome={refresh};refresh();app.showView('home',false);
})();
