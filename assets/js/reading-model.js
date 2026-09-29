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
    }
    return map;
  }
  function parseTrash(value, id, personal) {
    if (typeof value !== 'string' || value.length > 1600000) throw Error('Lista na lixeira inválida.');
    const raw = JSON.parse(value);
    if (!plain(raw) || typeof raw.deletedAt !== 'string' || !Number.isFinite(Date.parse(raw.deletedAt))) throw Error('Data de exclusão inválida.');
    const list = personal.parse(raw.list, id), validKeys = new Set(list.items.map(item => `${id}:personal:${item.id}`));
    const result = {list:raw.list,deletedAt:raw.deletedAt};
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
    return entries.filter(entry => !entry.hasCompanions && progress.read[entry.key]).map(entry => ({...entry,date:progress.completedAt[entry.key] || '',rating:progress.ratings?.[entry.key] || 0,note:progress.notes[entry.key] || ''})).sort((a,b) => (Date.parse(b.date)||0)-(Date.parse(a.date)||0) || a.key.localeCompare(b.key));
  }
  function csv(rows) {
    const cell = value => '"'+String(value ?? '').replace(/^[\s]*[=+@-]/,match=>"'"+match).replace(/"/g,'""')+'"';
    return '\uFEFF'+[['Lista','Leitura','Data (ISO)','Avaliação','Anotação'],...rows.map(row=>[row.orderTitle,row.title,row.date,row.rating||'',row.note])].map(row=>row.map(cell).join(';')).join('\r\n');
  }
  const api = {validateMap,validateTrash,parseTrash,monthValid,monthOf,history,csv};
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.PilhaReadingModel = api;
})(typeof window === 'undefined' ? {} : window);
