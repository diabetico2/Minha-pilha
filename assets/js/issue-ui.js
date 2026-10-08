(() => {
  const app=window.PilhaApp,$=s=>document.querySelector(s);
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dialog=document.createElement('dialog');dialog.className='note-dialog issue-dialog';dialog.id='issueMatches';dialog.setAttribute('aria-labelledby','issueMatchesTitle');
  dialog.innerHTML='<div class="note-dialog-heading"><h2 id="issueMatchesTitle">A mesma edição em outras histórias</h2><button class="dialog-close" aria-label="Fechar edições relacionadas">×</button></div><p>A marcação destas ocorrências é compartilhada apenas na sua pilha. Notas e avaliações de cada história continuam independentes.</p><div id="issueMatchRows"></div>';
  document.body.append(dialog);dialog.querySelector('.dialog-close').onclick=()=>dialog.close();
  $('#issueMatchRows').onclick=e=>{const button=e.target.closest('[data-match-key]');if(button){dialog.close();app.openEntry(button.dataset.matchKey);}};
  const backup=document.createElement('button');backup.id='beforeIssuesBackup';backup.textContent='Backup antes das edições';backup.onclick=()=>app.issues.backup();$('.backup-details').append(backup);
  const help=document.createElement('p');help.className='issue-intro';help.innerHTML='Abra <strong>Edições desta história</strong> para marcar cada número. Edições da mesma série e versão compartilham a marcação entre listas. Desmarcar também vale para todas as ocorrências vinculadas.';$('.toolbar').before(help);
  window.PilhaIssueUI={close(){if(dialog.open)dialog.close();},matches(id){const rows=app.issues.matches(id);$('#issueMatchRows').innerHTML=rows.map(row=>`<article><div><small>${escape(row.orderTitle)}</small><h3>${escape(row.title)}</h3></div><button class="dialog-secondary" data-match-key="${escape(row.key)}">Abrir história</button></article>`).join('');dialog.showModal();}};
})();
