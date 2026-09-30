(() => {
  const app=window.PilhaApp,model=window.PilhaReadingModel,$=s=>document.querySelector(s);
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize=value=>String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const dateInput=value=>{const d=new Date(value);return Number.isFinite(d.getTime())?`${model.monthOf(d)}-${String(d.getDate()).padStart(2,'0')}`:'';};
  const today=()=>dateInput(new Date());
  const dateLabel=value=>value?new Date(value).toLocaleDateString('pt-BR'):'Data não registrada';
  let limit=50,filtered=[],owner=app.personal.account(),entryOwner=null,originalDate='';
  const button=document.createElement('button');button.id='readingViewBtn';button.className='workspace-link';button.textContent='Diário de leitura';button.onclick=()=>{refresh();app.showView('diary');};$('.workspace-nav').append(button);
  const panel=document.createElement('section');panel.id='readingPanel';panel.className='reading-panel';panel.hidden=true;
  panel.innerHTML=`<header class="reading-heading"><div><p class="eyebrow">CADA LEITURA CONTA</p><h1 id="readingTitle">Seu diário de leitura</h1><p>Relembre histórias, avalie suas leituras e acompanhe seu ritmo.</p></div><button class="dialog-secondary" id="readingCsv">Exportar histórico CSV</button></header>
    <p class="reading-help" id="readingStorage"></p>
    <section class="reading-goal" aria-labelledby="goalTitle"><div><p class="eyebrow">UM PASSO DE CADA VEZ</p><h2 id="goalTitle">Sua meta mensal</h2><p id="goalSummary" role="status"></p><progress id="goalProgress" max="1" value="0" aria-label="Progresso da meta mensal"></progress></div><form id="goalForm"><label for="goalMonth">Mês da meta</label><input id="goalMonth" type="month" required><label for="goalAmount">Quantas leituras?</label><input id="goalAmount" type="number" min="1" max="10000" required placeholder="Ex.: 20"><div class="reading-actions"><button class="dialog-primary" type="submit">Salvar meta</button><button class="text-button" id="removeGoal" type="button">Remover meta</button></div><p id="goalMessage" role="status"></p></form></section>
    <div class="reading-metrics" id="readingMetrics"></div>
    <details class="reading-chart"><summary>Seu ritmo nos últimos seis meses</summary><div id="readingMonths"></div></details>
    <h2>Histórico de leitura</h2><p class="reading-help">Conta itens lidos sem somar novamente os cabeçalhos de arcos com itens associados. Desmarcar remove a primeira leitura; releituras registradas ficam no diário até serem excluídas. Cada releitura conta para a meta. Datas de backups antigos podem refletir a importação; você pode corrigi-las em “Avaliar e anotar”.</p>
    <div class="reading-filters"><label for="historySearch">Buscar leitura ou lista<input id="historySearch" type="search" placeholder="Título, personagem ou mangá"></label><label for="historyMonth">Filtrar por mês<input id="historyMonth" type="month"></label><label for="historyRating">Avaliação<select id="historyRating"><option value="all">Todas</option><option value="5">5 estrelas</option><option value="4">4 estrelas</option><option value="3">3 estrelas</option><option value="2">2 estrelas</option><option value="1">1 estrela</option><option value="0">Sem avaliação</option></select></label><button class="text-button" id="historyClear">Limpar filtros</button></div>
    <p id="historyCount" role="status"></p><div id="historyRows"></div><button class="dialog-secondary" id="historyMore">Mostrar mais leituras</button>
    <details class="reading-trash"><summary id="trashSummary">Lixeira de listas</summary><p>Até 20 listas, guardadas até você restaurar ou excluir definitivamente. Marcações, anotações, avaliações e capas acompanham a restauração. O catálogo padrão não pode ser excluído.</p><div id="trashRows"></div></details>`;
  $('#libraryPanel').before(panel);
  $('#goalMonth').value=model.monthOf(new Date());
  const fields=document.createElement('div');fields.className='reading-entry-fields';
  fields.innerHTML='<label for="entryRating">Sua avaliação<select id="entryRating"><option value="0">Sem avaliação</option><option value="1">★ 1 — Não gostei</option><option value="2">★★ 2 — Razoável</option><option value="3">★★★ 3 — Gostei</option><option value="4">★★★★ 4 — Muito bom</option><option value="5">★★★★★ 5 — Favorito</option></select></label><label for="entryDate">Data da leitura<input id="entryDate" type="date"></label><p class="reading-help">A data pode ser editada após marcar o item como lido. A avaliação e a anotação são privadas.</p><p id="entryMessage" role="status"></p>';
  $('#noteText').before(fields);
  const rereadButton=document.createElement('button');rereadButton.id='entryReread';rereadButton.type='button';rereadButton.className='text-button';rereadButton.textContent='＋ Registrar releitura';fields.append(rereadButton);rereadButton.onclick=()=>window.PilhaExtras.session(rereadButton.dataset.key);
  $('#saveNoteBtn').textContent='Salvar leitura';
  $('#entryRating').setAttribute('aria-label','Sua avaliação');
  const confirmation=document.createElement('dialog');confirmation.className='note-dialog';confirmation.id='readingConfirm';confirmation.setAttribute('aria-labelledby','readingConfirmTitle');
  confirmation.innerHTML='<form method="dialog"><h2 id="readingConfirmTitle">Confirmar exclusão</h2><p id="readingConfirmMessage" style="white-space:pre-wrap"></p><div class="reading-actions"><button class="dialog-secondary" value="cancel" autofocus>Cancelar</button><button class="dialog-primary" value="confirm" id="readingConfirmAccept">Confirmar</button></div></form>';
  document.body.append(confirmation);
  function confirmAction(message,label){$('#readingConfirmMessage').textContent=message;$('#readingConfirmAccept').textContent=label;confirmation.returnValue='cancel';confirmation.showModal();return new Promise(resolve=>confirmation.addEventListener('close',()=>resolve(confirmation.returnValue==='confirm'),{once:true}));}
  function rows(){return model.history(app.reading.entries(),app.getProgress());}
  function goalRefresh(all=rows()) {
    const month=$('#goalMonth').value,goal=app.getProgress().goals[month],done=all.filter(r=>model.monthOf(r.date)===month).length;
    $('#goalSummary').textContent=goal?`${done} de ${goal} leituras · ${Math.round(done/goal*100)}%${done>=goal?' — Meta alcançada!':''}`:`${done} leituras neste mês. Defina uma meta para acompanhar.`;
    $('#goalProgress').max=goal||1;$('#goalProgress').value=goal?Math.min(done,goal):0;
    $('#removeGoal').disabled=!goal;
    if(document.activeElement!==$('#goalAmount'))$('#goalAmount').value=goal||'';
  }
  function refresh(){
    if(owner!==app.personal.account()){owner=app.personal.account();$('#goalMonth').value=model.monthOf(new Date());$('#goalAmount').value='';$('#goalMessage').textContent='';$('#historySearch').value='';$('#historyMonth').value='';$('#historyRating').value='all';limit=50;}
    const progress=app.getProgress(),all=rows(),rated=all.filter(r=>r.rating),month=model.monthOf(new Date()),monthly=all.filter(r=>model.monthOf(r.date)===month);
    $('#readingStorage').textContent=owner?'Diário privado, sincronizado com sua conta.':'Diário salvo neste navegador. Entre na conta para sincronizar entre dispositivos.';
    goalRefresh(all);
    $('#readingMetrics').innerHTML=[[all.length,'leituras registradas'],[monthly.length,'leituras neste mês'],[rated.length?(rated.reduce((sum,r)=>sum+r.rating,0)/rated.length).toFixed(1)+' / 5':'—','média das avaliações']].map(([number,label])=>`<div><strong>${escape(number)}</strong><span>${label}</span></div>`).join('');
    const months=Array.from({length:6},(_,i)=>{const d=new Date();d.setDate(1);d.setMonth(d.getMonth()-5+i);const key=model.monthOf(d);return {key,label:d.toLocaleDateString('pt-BR',{month:'short',year:'numeric'}),count:all.filter(r=>model.monthOf(r.date)===key).length};}),max=Math.max(1,...months.map(m=>m.count));
    $('#readingMonths').innerHTML=months.map(m=>`<div><span>${escape(m.label)}</span><meter min="0" max="${max}" value="${m.count}" aria-label="Leituras em ${escape(m.label)}">${m.count}</meter><b>${m.count}</b></div>`).join('');
    const query=normalize($('#historySearch').value),selectedMonth=$('#historyMonth').value,rating=$('#historyRating').value;
    filtered=all.filter(r=>(!selectedMonth||model.monthOf(r.date)===selectedMonth)&&(rating==='all'||r.rating===Number(rating))&&normalize(r.title+' '+r.orderTitle).includes(query));
    $('#historyCount').textContent=`${filtered.length} leituras encontradas`;
    $('#historyRows').innerHTML=filtered.length?filtered.slice(0,limit).map(r=>`<article class="history-row"><div><small>${escape(r.orderTitle)}</small><h3>${escape(r.title)}</h3><p>${r.sessionId?'Releitura · ':''}${escape(dateLabel(r.date))}${r.rating?' · '+'★'.repeat(r.rating):''}</p>${r.note?`<p class="history-note">${escape(r.note)}</p>`:''}</div><div class="reading-actions">${r.sessionId?`<button class="dialog-secondary" data-session="${escape(r.sessionId)}">Editar releitura</button>`:`<button class="dialog-secondary" data-entry="${escape(r.key)}">Avaliar e anotar</button>`}<button class="text-button" data-reread="${escape(r.key)}">＋ Releitura</button><button class="text-button" data-order="${escape(r.orderId)}">Abrir lista</button></div></article>`).join(''):'<p class="reading-empty">Nenhuma leitura com esses filtros. Marque um item como lido para começar seu diário.</p>';
    $('#historyMore').hidden=filtered.length<=limit;
    $('#readingCsv').disabled=!filtered.length;
    const trash=Object.entries(progress.trash).sort((a,b)=>JSON.parse(b[1]).deletedAt.localeCompare(JSON.parse(a[1]).deletedAt));
    $('#trashSummary').textContent=`Lixeira de listas (${trash.length}/20)`;
    $('#trashRows').innerHTML=trash.length?trash.map(([id,value])=>{const record=model.parseTrash(value,id,window.PilhaPersonal),list=window.PilhaPersonal.parse(record.list,id);return `<article class="history-row"><div><h3>${escape(list.title)}</h3><p>${list.items.length} itens · Excluída em ${escape(dateLabel(record.deletedAt))}</p></div><div class="reading-actions"><button class="dialog-secondary" data-restore="${escape(id)}">Restaurar lista</button><button class="text-button danger-text" data-purge="${escape(id)}">Excluir definitivamente</button></div></article>`;}).join(''):'<p class="reading-empty">Sua lixeira está vazia.</p>';
  }
  $('#goalMonth').onchange=()=>{ $('#goalAmount').value='';goalRefresh();$('#goalMessage').textContent=''; };
  $('#goalForm').onsubmit=event=>{event.preventDefault();try{app.reading.saveGoal($('#goalMonth').value,Number($('#goalAmount').value));$('#goalMessage').textContent='Meta salva.';}catch(error){$('#goalMessage').textContent=error.message;}};
  $('#removeGoal').onclick=()=>{app.reading.saveGoal($('#goalMonth').value,null);$('#goalMessage').textContent='Meta removida.';};
  for(const id of ['historySearch','historyMonth','historyRating'])$('#'+id).oninput=()=>{limit=50;refresh();};
  $('#historyClear').onclick=()=>{for(const id of ['historySearch','historyMonth'])$('#'+id).value='';$('#historyRating').value='all';limit=50;refresh();};
  $('#historyMore').onclick=()=>{limit+=50;refresh();};
  $('#historyRows').onclick=event=>{const target=event.target.closest('button');if(target?.dataset.session)window.PilhaExtras.session(null,target.dataset.session);if(target?.dataset.reread)window.PilhaExtras.session(target.dataset.reread);if(target?.dataset.entry)app.reading.openNote(target.dataset.entry);if(target?.dataset.order)app.openOrder(target.dataset.order);};
  $('#trashRows').onclick=async event=>{const target=event.target.closest('button'),id=target?.dataset.restore||target?.dataset.purge;if(!id)return;const base=app.getProgress().trash[id],removingOwner=app.personal.account();try{if(target.dataset.restore){app.reading.restore(id,base);app.toast('Lista restaurada com seu progresso.');}else if(await confirmAction('Excluir esta lista e seu progresso definitivamente? Só será possível recuperar com um backup JSON anterior.','Excluir definitivamente')){if(removingOwner!==app.personal.account())throw Error('A conta mudou. Abra a lixeira novamente.');app.reading.purge(id,base);app.toast('Lista excluída definitivamente.');}}catch(error){app.toast(error.message);}refresh();};
  $('#readingCsv').onclick=()=>{const url=URL.createObjectURL(new Blob([model.csv(filtered)],{type:'text/csv;charset=utf-8'})),a=document.createElement('a');a.href=url;a.download=`minha-pilha-historico-${today()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);app.toast('Histórico exportado com os filtros atuais.');};
  window.PilhaReadingUI={refresh,confirm:confirmAction,openEntry(key){rereadButton.dataset.key=key;rereadButton.hidden=!!app.reading.entries().find(e=>e.key===key)?.hasCompanions;const p=app.getProgress();entryOwner=app.personal.account();originalDate=p.completedAt[key]||'';$('#entryRating').value=p.ratings[key]||0;$('#entryDate').disabled=!p.read[key];$('#entryDate').value=dateInput(originalDate);$('#entryDate').max=today();$('#entryMessage').textContent='';},saveEntry(key,state){
    if(entryOwner!==app.personal.account()){$('#entryMessage').textContent='A conta mudou. Abra a leitura novamente.';return false;}
    const rating=Number($('#entryRating').value),date=$('#entryDate').value;
    if(rating!==0&&(!Number.isInteger(rating)||rating<1||rating>5))return false;
    if(state.read[key]&&date&&(date>today()||!/^\d{4}-\d{2}-\d{2}$/.test(date)||!Number.isFinite(Date.parse(date)))){$('#entryMessage').textContent='Escolha uma data válida, até hoje.';return false;}
    if(rating)state.ratings[key]=rating;else delete state.ratings[key];
    if(state.read[key]&&date!==dateInput(originalDate)){if(date)state.completedAt[key]=new Date(date+'T12:00:00').toISOString();else delete state.completedAt[key];}
    return true;
  }};
  refresh();
})();
