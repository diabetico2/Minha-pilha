(function (root) {
  const fields = ['read', 'current', 'notes', 'favoriteOrders', 'queueOrders', 'completedAt', 'customOrders'];
  const unsafe = key => ['__proto__', 'prototype', 'constructor'].includes(key);
  // Hex-encoded UTF-8 avoids all forbidden Realtime Database path characters.
  const encode = key => Array.from(new TextEncoder().encode(key), byte => byte.toString(16).padStart(2, '0')).join('');
  const decode = key => {
    if (!/^(?:[0-9a-f]{2})+$/.test(key)) throw Error('Chave de sincronização inválida');
    return new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(key.match(/../g), byte => parseInt(byte, 16)));
  };
  function diff(before, after) {
    const patch = {};
    for (const field of fields) {
      for (const key of new Set([...Object.keys(before[field] || {}), ...Object.keys(after[field] || {})])) {
        if (unsafe(key)) throw Error('Chave inválida');
        const oldValue = before[field]?.[key] ?? null;
        const newValue = after[field]?.[key] ?? null;
        if (oldValue !== newValue) patch[`${field}/${encode(key)}`] = newValue;
      }
    }
    return patch;
  }
  function fromRemote(data) {
    const progress = {};
    for (const field of fields) {
      progress[field] = {};
      for (const [encoded, value] of Object.entries(data?.[field] || {})) {
        const key = decode(encoded);
        if (unsafe(key)) throw Error('Chave inválida');
        progress[field][key] = value;
      }
    }
    return progress;
  }
  function apply(progress, patch) {
    const result = JSON.parse(JSON.stringify(progress));
    for (const [path, value] of Object.entries(patch)) {
      const parts = path.split('/');
      if (parts.length !== 2 || !fields.includes(parts[0])) throw Error('Campo inválido');
      const [field, encoded] = parts;
      const key = decode(encoded);
      if (unsafe(key)) throw Error('Chave inválida');
      result[field] ||= {};
      if (value === null) delete result[field][key]; else result[field][key] = value;
    }
    return result;
  }
  function importGuest(cloud, guest) {
    const merged = JSON.parse(JSON.stringify(cloud));
    for (const field of fields) merged[field] = { ...(guest[field] || {}), ...(cloud[field] || {}) };
    return merged;
  }
  const api = { fields, encode, decode, diff, fromRemote, apply, importGuest };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PilhaSyncModel = api;
})(typeof window === 'undefined' ? {} : window);
