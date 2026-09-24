(function (root) {
  const MAX_ITEMS = 500, MAX_LISTS = 100, MAX_LENGTH = 200000;
  const uuid = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
  const isId = value => typeof value === 'string' && new RegExp(`^personal-${uuid}$`).test(value);
  const itemId = value => typeof value === 'string' && new RegExp(`^item-${uuid}$`).test(value);
  const plain = value => value && typeof value === 'object' && !Array.isArray(value);
  function text(value, max, required = false) {
    if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw Error('Confira os títulos e o tamanho dos textos da lista.');
    return value.trim();
  }
  function validate(raw) {
    if (!plain(raw) || !isId(raw.id) || !['comic', 'manga'].includes(raw.kind)) throw Error('Lista pessoal inválida.');
    if (!Array.isArray(raw.items) || raw.items.length < 1 || raw.items.length > MAX_ITEMS) throw Error(`A lista precisa ter entre 1 e ${MAX_ITEMS} itens.`);
    const seen = new Set();
    const items = raw.items.map(item => {
      if (!plain(item) || !itemId(item.id) || seen.has(item.id)) throw Error('Item inválido ou repetido.');
      seen.add(item.id);
      return { id: item.id, title: text(item.title, 160, true), details: text(item.details ?? '', 500) };
    });
    return { id: raw.id, title: text(raw.title, 160, true), kind: raw.kind, description: text(raw.description ?? '', 1000), items };
  }
  function serialize(raw) {
    const result = JSON.stringify(validate(raw));
    if (result.length > MAX_LENGTH) throw Error('Esta lista ficou muito grande. Divida-a em duas listas.');
    return result;
  }
  function parse(value, id) {
    if (typeof value !== 'string' || value.length > MAX_LENGTH) throw Error('Lista pessoal inválida.');
    const result = validate(JSON.parse(value));
    if (id !== undefined && result.id !== id) throw Error('Identificador de lista inválido.');
    return result;
  }
  function validateMap(map = {}) {
    if (!plain(map) || Object.keys(map).length > MAX_LISTS) throw Error(`Você pode guardar até ${MAX_LISTS} listas pessoais.`);
    for (const [id, value] of Object.entries(map)) { if (!isId(id)) throw Error('Identificador de lista inválido.'); parse(value, id); }
    return map;
  }
  function toOrder(raw) {
    const list = validate(raw);
    return { id: list.id, title: list.title, description: list.description || 'Uma lista da sua biblioteca pessoal.', publisher: 'Minhas listas', family: list.kind === 'manga' ? 'Mangás' : 'Comics', personal: true,
      sections: [{ key: 'personal', title: list.kind === 'manga' ? 'Volumes e capítulos' : 'Edições e volumes', items: list.items.map(item => ({ key: item.id, title: item.title, details: item.details })) }] };
  }
  function share(raw) {
    const list = validate(raw);
    // Only catalogue content leaves the device; no account, notes, reading state or internal IDs.
    return { schema: 'minha-pilha-list', version: 1, list: { title: list.title, kind: list.kind, description: list.description, items: list.items.map(({ title, details }) => ({ title, details })) } };
  }
  function importShare(raw, makeId) {
    if (!plain(raw) || raw.schema !== 'minha-pilha-list' || raw.version !== 1 || !plain(raw.list) || !Array.isArray(raw.list.items)) throw Error('Use um arquivo de lista compartilhada da Minha Pilha. Para um backup, use Restaurar.');
    if (raw.list.items.length > MAX_ITEMS) throw Error(`Importe no máximo ${MAX_ITEMS} itens por lista.`);
    const list = raw.list;
    const result = validate({ id: makeId('personal'), title: list.title, kind: list.kind, description: list.description ?? '', items: list.items.map(item => {
      if (!plain(item)) throw Error('Item inválido.');
      return { id: makeId('item'), title: item.title, details: item.details ?? '' };
    }) });
    serialize(result);
    return result;
  }
  const api = { MAX_ITEMS, MAX_LISTS, MAX_LENGTH, isId, validate, serialize, parse, validateMap, toOrder, share, importShare };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PilhaPersonal = api;
})(typeof window === 'undefined' ? {} : window);
