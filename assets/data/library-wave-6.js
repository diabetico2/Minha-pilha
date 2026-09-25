(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const item = (title, details = '', companions = []) => ({ title, details, companions });
  const issues = (series, first, last) => Array.from({ length: last - first + 1 }, (_, index) => item(`${series} #${first + index}`));
  const run = (series, first, last, details = '') => item(series, details || `Edições #${first}–${last}.`, issues(series, first, last));

  // Change only the display name, preserving every saved reading key.
  const fate = orders.find(order => order.id === 'doctor-fate-reading-order');
  if (fate) fate.title = 'Doctor Fate — Ordem de Leitura';

  const additions = [
    {
      id: 'watchmen-reading-order', publisher: 'DC', family: 'Watchmen',
      title: 'Watchmen — Ordem de Leitura',
      description: 'Comece pela obra original. As fases seguintes são expansões opcionais; nenhuma é necessária para entender Watchmen.',
      source: 'https://www.comicbooktreasury.com/comics-watchmen-reading-order-doomsday-clock/',
      sections: [
        { key: 'original', title: 'Ponto de partida — Watchmen (1986–1987)', items: [
          run('Watchmen', 1, 12, 'Obra completa de Alan Moore e Dave Gibbons. Os diferentes encadernados reúnem a mesma série; marque cada edição abaixo ou use “Marcar tudo”.')
        ] },
        { key: 'before', title: 'Before Watchmen — prelúdios opcionais', items: [
          item('Before Watchmen: Minutemen / Silk Spectre', 'Leia após a obra original. Duas minisséries reunidas neste volume.', [
            ...issues('Before Watchmen: Minutemen', 1, 6), ...issues('Before Watchmen: Silk Spectre', 1, 4)
          ]),
          item('Before Watchmen: Ozymandias / Crimson Corsair', 'Minissérie e história complementar originalmente serializada.', [
            ...issues('Before Watchmen: Ozymandias', 1, 6), item('Curse of the Crimson Corsair', 'História complementar completa, reunida neste volume.')
          ]),
          item('Before Watchmen: Comedian / Rorschach', 'Duas minisséries reunidas neste volume.', [
            ...issues('Before Watchmen: Comedian', 1, 6), ...issues('Before Watchmen: Rorschach', 1, 4)
          ]),
          item('Before Watchmen: Nite Owl / Dr. Manhattan', 'Duas minisséries reunidas neste volume.', [
            ...issues('Before Watchmen: Nite Owl', 1, 4), ...issues('Before Watchmen: Dr. Manhattan', 1, 4)
          ]),
          item('Before Watchmen — especiais adicionais', 'Completam as minisséries e os especiais da linha, também presentes no Omnibus.', [
            item('Before Watchmen: Dollar Bill #1'), ...issues('Before Watchmen: Moloch', 1, 2)
          ])
        ] },
        { key: 'dc-sequels', title: 'Encontro com o Universo DC — leitura opcional', items: [
          item('DC Universe: Rebirth', 'Prólogo do encontro entre as continuidades.', [item('DC Universe: Rebirth #1')]),
          item('Batman / The Flash: The Button', 'Siga a alternância entre Batman e Flash nas quatro partes.', [
            item('Batman (2016) #21'), item('The Flash (2016) #21'), item('Batman (2016) #22'), item('The Flash (2016) #22')
          ]),
          item('Doomsday Clock — Parte 1', 'Primeiro volume: Doomsday Clock #1–6.', issues('Doomsday Clock', 1, 6)),
          item('Doomsday Clock — Parte 2', 'Segundo volume: Doomsday Clock #7–12.', issues('Doomsday Clock', 7, 12)),
          run('Flashpoint Beyond', 0, 6, 'Desdobramento posterior a Doomsday Clock. Pressupõe familiaridade com o evento Flashpoint.')
        ] },
        { key: 'rorschach', title: 'Rorschach — história posterior independente', items: [
          run('Rorschach', 1, 12, 'Minissérie de Tom King e Jorge Fornés. Leia após Watchmen; os crossovers da fase anterior são um caminho separado.')
        ] }
      ]
    },
    {
      id: 'v-for-vendetta-reading-order', publisher: 'DC', family: 'Histórias independentes',
      title: 'V de Vingança — V for Vendetta',
      description: 'História fechada de Alan Moore e David Lloyd, em universo próprio. Siga a sequência das dez edições da publicação da DC.',
      source: 'https://www.dc.com/blog/2023/01/10/dc-universe-infinit-es-new-ultra-tier-from-a-to-z',
      sections: [
        { key: 'original', title: 'Ponto de partida — obra completa', items: [
          run('V for Vendetta', 1, 10, 'As dez edições reunidas no encadernado. Se já leu o volume completo, use “Marcar tudo”.')
        ] }
      ]
    }
  ];
  additions.forEach(order => { if (!orders.some(existing => existing.id === order.id)) orders.push(order); });
})();
