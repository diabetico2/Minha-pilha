(function(root) {
  const plain = value => value && typeof value === 'object' && !Array.isArray(value);
  const safe = key => !['__proto__','constructor','prototype'].includes(key);
  const monthValid = month => typeof month === 'string' && /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
  function validateMap(map, type) {
    if (!plain(map)) throw Error('Dados de leitura inválidos.');
    for (const [key,value] of Object.entries(map)) {
      if (!safe(key) || key.length > 1000) throw Error('Chave de leitura inválida.');
      if (type === 'ratings' && (!Number.isInteger(value) || value < 1 || value > 5)) throw Error('A avaliação deve ser de 1 a 5.');
      if (type === 'goals' && (!monthValid(key) || !Number.isInteger(value) || value < 1 || value > 10000)) throw Error('Use uma meta de 1 a 10.000 leituras.');
      if (type === 'tags') parseTags(value);
      if (type === 'sessions') parseSession(value);
    }
    return map;
  }
  function parseTags(value) {
    if (typeof value !== 'string' || value.length > 400) throw Error('Tags inválidas.');
    const tags=JSON.parse(value);
    if (!Array.isArray(tags) || tags.length>10 || tags.some(t=>typeof t!=='string'||!t.trim()||t.length>30) || new Set(tags).size!==tags.length) throw Error('Use até 10 tags diferentes, com até 30 caracteres cada.');
    return tags;
  }
  function parseSession(value) {
    if (typeof value!=='string'||value.length>8000) throw Error('Releitura inválida.');
    const r=JSON.parse(value);
    if (!plain(r)||typeof r.key!=='string'||!safe(r.key)||!r.key||r.key.length>1000||typeof r.date!=='string'||r.date.length>40||!Number.isFinite(Date.parse(r.date))||!Number.isInteger(r.rating)||r.rating<0||r.rating>5||typeof r.note!=='string'||r.note.length>2000||Object.keys(r).some(k=>!['key','date','rating','note'].includes(k))) throw Error('Dados da releitura inválidos.');
    return r;
  }
  function parseTrash(value, id, personal) {
    if (typeof value !== 'string' || value.length > 1600000) throw Error('Lista na lixeira inválida.');
    const raw = JSON.parse(value);
    if (!plain(raw) || typeof raw.deletedAt !== 'string' || !Number.isFinite(Date.parse(raw.deletedAt))) throw Error('Data de exclusão inválida.');
    const list = personal.parse(raw.list, id), validKeys = new Set(list.items.map(item => `${id}:personal:${item.id}`));
    const result = {list:raw.list,deletedAt:raw.deletedAt};
    result.issueRead=raw.issueRead||{};
    const issueModel=typeof module!=='undefined'&&module.exports?require('./issue-model.js'):root.PilhaIssues;
    issueModel.validate(result.issueRead);
    if(Object.keys(result.issueRead).some(key=>!key.startsWith(`local:${id}:`)))throw Error('A lixeira contém edições de outra lista.');
    result.tags=validateMap(raw.tags||{},'tags');
    if(Object.keys(result.tags).some(key=>key!==id)) throw Error('A lixeira contém tags de outra lista.');
    result.sessions=validateMap(raw.sessions||{},'sessions');
    if(Object.values(result.sessions).some(value=>!validKeys.has(parseSession(value).key))) throw Error('A lixeira contém releituras de outra lista.');
    for (const field of ['read','notes','completedAt','ratings','current','favoriteOrders','queueOrders']) {
      const map = raw[field] || {};
      if (!plain(map)) throw Error('Progresso na lixeira inválido.');
      result[field] = {};
      for (const [key,entry] of Object.entries(map)) {
        const orderField = ['current','favoriteOrders','queueOrders'].includes(field);
        if (!safe(key) || !(orderField ? key === id : validKeys.has(key))) throw Error('A lixeira contém dados de outra lista.');
        if (['read','favoriteOrders','queueOrders'].includes(field) && typeof entry !== 'boolean') throw Error('Marcação inválida.');
        if (field === 'notes' && (typeof entry !== 'string' || entry.length > 2000)) throw Error('Anotação inválida.');
        if (field === 'completedAt' && (typeof entry !== 'string' || !Number.isFinite(Date.parse(entry)))) throw Error('Data inválida.');
        if (field === 'current' && !validKeys.has(entry)) throw Error('Ponto de leitura inválido.');
        if (field === 'ratings') validateMap({[key]:entry},'ratings');
        result[field][key] = entry;
      }
    }
    return result;
  }
  function validateTrash(map, personal) {
    if (!plain(map)) throw Error('Lixeira inválida.');
    for (const [id,value] of Object.entries(map)) {
      if (!personal.isId(id)) throw Error('Identificador inválido na lixeira.');
      parseTrash(value,id,personal);
    }
    return map;
  }
  function monthOf(value) {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}` : '';
  }
  function history(entries, progress) {
    // Parent headings with associated readings do not count twice toward a goal.
    const byKey=new Map(entries.filter(e=>!e.hasCompanions).map(e=>[e.key,e]));
    const first=entries.filter(entry=>!entry.hasCompanions&&progress.read[entry.key]).map(entry=>({...entry,date:progress.completedAt[entry.key]||'',rating:progress.ratings?.[entry.key]||0,note:progress.notes[entry.key]||''}));
    const repeats=Object.entries(progress.sessions||{}).flatMap(([sessionId,value])=>{const r=parseSession(value),entry=byKey.get(r.key);return entry?[{...entry,...r,sessionId}]:[];});
    return [...first,...repeats].sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)||a.key.localeCompare(b.key));
  }
  function csv(rows) {
    const cell = value => '"'+String(value ?? '').replace(/^[\s]*[=+@-]/,match=>"'"+match).replace(/"/g,'""')+'"';
    return '\uFEFF'+[['Lista','Leitura','Tipo','Data (ISO)','Avaliação','Anotação'],...rows.map(row=>[row.orderTitle,row.title,row.sessionId?'Releitura':'Leitura',row.date,row.rating||'',row.note])].map(row=>row.map(cell).join(';')).join('\r\n');
  }
  function search(entries,query) {
    const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const words=norm(query).match(/[a-z0-9]+/g)||[];
    if(!words.length)return [];
    const issue=norm(query).match(/^(.+?)\s*#\s*(\d+)$/);
    if(issue){
      const series=issue[1].trim().replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),number=Number(issue[2]);
      const pattern=new RegExp('(?:^|[^a-z0-9])'+series+'(?:\\s+(?:vol\\.?\\s*\\d+|\\(\\d{4}\\)))?\\s*#\\s*(\\d+(?:\\s*[-–—]\\s*\\d+)?(?:\\s*(?:,|&|e|and)\\s*#?\\s*\\d+(?:\\s*[-–—]\\s*\\d+)?)*)','g');
      return entries.filter(e=>[...norm(e.title+' '+(e.details||'')).matchAll(pattern)].some(m=>[...m[1].matchAll(/(\d+)(?:\s*[-–—]\s*(\d+))?/g)].some(([,a,b])=>number>=Number(a)&&number<=Number(b||a))));
    }
    return entries.filter(e=>{const text=norm(e.title+' '+(e.details||'')+' '+e.orderTitle);return words.every(word=>/^\d+$/.test(word)?new RegExp('(^|[^0-9])'+word+'([^0-9]|$)').test(text):text.includes(word));});
  }
  const api = {validateMap,validateTrash,parseTrash,parseTags,parseSession,search,monthValid,monthOf,history,csv};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.PilhaReadingModel = api;
})(typeof window === 'undefined' ? {} : window);
