(function(root) {
  const image = (value, max = 100000) => typeof value === 'string' && value.length <= max && (value === '' || /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value));
  function validate(raw = {}) {
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) throw Error('Perfil inválido.');
    const limits = { displayName: 60, bio: 280, avatar: 32000 };
    for (const [key,value] of Object.entries(raw)) {
      if (!Object.hasOwn(limits,key) || typeof value !== 'string' || value.length > limits[key] || (key === 'avatar' && !image(value,32000))) throw Error('Confira o nome, a descrição e a foto do perfil.');
    }
    return { ...raw };
  }
  const api = { image, validate };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.PilhaProfileModel = api;
})(typeof window === 'undefined' ? {} : window);
