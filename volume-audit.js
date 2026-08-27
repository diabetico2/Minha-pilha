(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const child = (title, details = '') => ({ title, details, companions: [] });
  const run = (title, details, companions) => ({ title, details, companions });
  const section = (key, title, items) => ({ key, title, items });
  const order = (id, publisher, family, title, source, sections) => ({ id, publisher, family, title, source, sections });
  const find = id => orders.find(item => item.id === id);

  function flattenItem(item) {
    const related = (item.companions || []).map(entry => entry.title).join('; ');
    return child(item.title, [item.details, related ? `Leituras relacionadas: ${related}.` : ''].filter(Boolean).join(' '));
  }

  function numberedBase(title) {
    const match = title.match(/^(.+?)\s+(?:Vol(?:ume)?\.?|Book)\s*\d+/i);
    return match ? match[1].trim() : null;
  }

  function groupRepeatedVolumes(target) {
    if (!target) return;
    target.sections.forEach(part => {
      const buckets = new Map();
      part.items.forEach((item, index) => {
        const base = numberedBase(item.title);
        if (!base) return;
        const key = base.toLowerCase();
        if (!buckets.has(key)) buckets.set(key, { base, indexes: [] });
        buckets.get(key).indexes.push(index);
      });
      const groupedIndexes = new Set();
      const replacementAt = new Map();
      buckets.forEach(group => {
        if (group.indexes.length < 2) return;
        const entries = group.indexes.map(index => part.items[index]);
        group.indexes.forEach(index => groupedIndexes.add(index));
        replacementAt.set(group.indexes[0], run(
          `${group.base} — coleção por volumes`,
          `${entries.length} volumes organizados como subtarefas desta mesma fase.`,
          entries.map(flattenItem)
        ));
      });
      part.items = part.items.flatMap((item, index) => replacementAt.has(index) ? [replacementAt.get(index)] : groupedIndexes.has(index) ? [] : [item]);
    });
  }

  function splitSlashTitles(target) {
    if (!target) return;
    target.sections.forEach(part => part.items.forEach(item => {
      if ((item.companions || []).length || !item.title.includes(' / ')) return;
      const pieces = item.title.split(/\s*\/\s*/).map(value => value.trim()).filter(Boolean);
      if (pieces.length < 2) return;
      item.companions = pieces.map(value => child(value, item.details));
      item.details = `${pieces.length} arcos ou coleções reunidos nesta etapa.`;
    }));
  }

  function expandVolumeRanges(target) {
    if (!target) return;
    target.sections.forEach(part => part.items.forEach(item => {
      if ((item.companions || []).length) return;
      const match = item.title.match(/^(.*?)Vols?\.\s*(\d+)\s*[–-]\s*(\d+)(.*)$/i);
      if (!match) return;
      const start = Number(match[2]);
      const end = Number(match[3]);
      if (end <= start || end - start > 12) return;
      item.companions = Array.from({ length: end - start + 1 }, (_, offset) => child(`${match[1].trim()} Vol. ${start + offset}${match[4] || ''}`, item.details));
      item.details = `${end - start + 1} volumes reunidos nesta fase.`;
    }));
  }

  const spider = (window.COMIC_ORDERS || []).find(item => item.id === 'spider-man-reading-order-the-spectacular-peter-parker-guide');
  function spiderFamily(title) {
    const rules = [
      [/Amazing Spider-Man.*Epic Collection|Epic Collection.*Amazing Spider-Man/i, 'Amazing Spider-Man — Epic Collections'],
      [/Marvel Masterworks.*Amazing Spider-Man|Amazing Spider-Man.*Marvel Masterworks/i, 'Amazing Spider-Man — Marvel Masterworks'],
      [/Marvel Masterworks.*Marvel Team-Up|Marvel Team-Up.*Marvel Masterworks/i, 'Marvel Team-Up — Marvel Masterworks'],
      [/Spectacular Spider-Man.*Masterworks|Masterworks.*Spectacular Spider-Man/i, 'Spectacular Spider-Man — Marvel Masterworks'],
      [/Amazing Spider-Man.*(?:Vol\.|Volume)\s*\d/i, 'Amazing Spider-Man — volumes da fase'],
      [/Peter Parker.*Spectacular Spider-Man.*Vol\./i, 'Peter Parker: The Spectacular Spider-Man — volumes'],
      [/Friendly Neighborhood Spider-Man.*Vol\./i, 'Friendly Neighborhood Spider-Man — volumes'],
      [/Spider-Man\/Deadpool.*(?:Vol\.|Collection)/i, 'Spider-Man/Deadpool — coleção por volumes'],
      [/Superior Spider-Man.*Vol\./i, 'Superior Spider-Man — volumes'],
      [/The Spectacular Spider-Men.*Vol\./i, 'The Spectacular Spider-Men — volumes'],
      [/Spider-Man & Wolverine.*Vol\./i, 'Spider-Man & Wolverine — volumes']
    ];
    return rules.find(([pattern]) => pattern.test(title))?.[1] || null;
  }

  function regroupSpiderMan() {
    if (!spider) return;
    spider.sections.forEach(part => {
      const groups = new Map();
      part.items.forEach((item, index) => {
        const family = spiderFamily(item.title);
        if (!family) return;
        if (!groups.has(family)) groups.set(family, []);
        groups.get(family).push({ item, index });
      });
      const consumed = new Set();
      const replacements = new Map();
      groups.forEach((entries, family) => {
        if (entries.length < 2) return;
        entries.forEach(entry => consumed.add(entry.index));
        replacements.set(entries[0].index, run(
          family,
          `${entries.length} volumes desta coleção ou série, separados para acompanhar a leitura.`,
          entries.flatMap(entry => [flattenItem(entry.item), ...(entry.item.companions || []).map(flattenItem)])
        ));
      });
      part.items = part.items.flatMap((item, index) => replacements.has(index) ? [replacements.get(index)] : consumed.has(index) ? [] : [item]);
      if (part.items.length > 1) {
        const volumes = part.items.flatMap(item => {
          if (!(item.companions || []).length) return [flattenItem(item)];
          return item.companions.map(entry => child(`${item.title} › ${entry.title}`, entry.details));
        });
        part.items = [run(
          `Checklist completo — ${part.title}`,
          `${volumes.length} volumes, eventos e leituras paralelas organizados nesta fase.`,
          volumes
        )];
      }
    });
  }

  regroupSpiderMan();

  const superman = find('superman-modern-age-reading-order');
  if (superman) superman.sections = [
    section('origins-v2', 'O novo começo de Superman', [
      run('John Byrne — Superman pós-Crise', 'As quatro séries que formam o começo coordenado da era moderna.', [
        child('The Man of Steel #1–6', 'Origem pós-Crise de Clark Kent.'),
        child('Superman #1–6', 'Primeira etapa da nova série de 1987.'),
        child('Adventures of Superman #424–429', 'Continuação do título clássico.'),
        child('Action Comics #584–588', 'A fase de encontros e aventuras em Action Comics.'),
        child('Superman: The Man of Steel Vol. 2', 'Superman #7–11, Adventures #430–435 e Action #589–593.'),
        child('Superman: The Man of Steel Vols. 3–4', 'Expande a leitura coordenada até Action Comics #600.')
      ]),
      run('Origens modernas revisadas', 'Releituras posteriores da origem; podem ser lidas como pontos de entrada alternativos.', [
        child('Superman: For All Seasons', 'Quatro capítulos sobre os primeiros anos de Clark.'),
        child('Superman: Birthright', 'Minissérie #1–12 de Mark Waid.'),
        child('Superman: Secret Origin', 'Minissérie #1–6 de Geoff Johns.'),
        child('Superman: Kryptonite', 'Superman Confidential #1–5 e #11.')
      ])
    ]),
    section('triangle-v2', 'Triangle Era e A Morte do Superman', [
      run('Superman: The Triangle Era', 'A leitura alterna Superman, Adventures, Action Comics e Man of Steel.', [
        child('Triangle Era Omnibus Vol. 1', 'Superman #49–63, Adventures #472–486, Action #659–673 e Man of Steel #1–8.'),
        child('Triangle Era Omnibus Vol. 2', 'Superman #64–77, Adventures #487–499, Action #674–686 e Man of Steel #9–21.'),
        child('Triangle Era Omnibus Vol. 3', 'Action #687–697, Adventures, Superman #78–88 e Man of Steel #22–32.'),
        child('Panic in the Sky', 'Crossover entre os quatro títulos antes da morte de Superman.'),
        child('The Death of Superman', 'Doomsday e a batalha final.'),
        child('Funeral for a Friend', 'As consequências imediatas da morte.'),
        child('Reign of the Supermen', 'A ascensão dos quatro substitutos.'),
        child('The Return of Superman', 'O retorno de Clark e a conclusão da saga.')
      ]),
      run('Triangle Era após o retorno', 'Grandes crossovers que continuam a cronologia coordenada.', [
        child('Zero Hour / Superman: Zero Hour', 'Edições zero e capítulos ligados ao evento.'),
        child('The Death of Clark Kent', 'Superman #100–102 e capítulos nos títulos paralelos.'),
        child('The Trial of Superman', 'Crossover pelos quatro títulos mensais.'),
        child('The Wedding and Beyond', 'Casamento de Clark e Lois e histórias seguintes.'),
        child('Superman Blue / Superman Red', 'Fase elétrica dividida entre os títulos.'),
        child('Emperor Joker', 'Crossover que encerra a Triangle Era clássica.')
      ])
    ]),
    section('millennium-v2', 'Superman no novo milênio', [
      run('Jeph Loeb, Joe Kelly e a nova equipe criativa', 'Os títulos voltam a funcionar como uma única narrativa ampla.', [
        child('Superman: No Limits', 'Primeiros arcos da fase iniciada em 1999.'),
        child('Superman: Endgame', 'Continuação do relançamento.'),
        child('President Lex', 'Lex Luthor chega à presidência.'),
        child('Our Worlds at War', 'Evento atravessando Superman, Action e Adventures.'),
        child('Return to Krypton', 'Duas partes distribuídas entre os títulos.'),
        child('Ending Battle', 'Crossover de 2002 pelos quatro títulos.')
      ]),
      run('Superman/Batman e Infinite Crisis', 'A fase de Jeph Loeb conduz Kara e os maiores heróis até a Crise.', [
        child('Superman/Batman Vol. 1: Public Enemies', 'Superman/Batman #1–6.'),
        child('Superman/Batman Vol. 2: Supergirl', 'Superman/Batman #7–13.'),
        child('Superman/Batman Vols. 3–4', 'Absolute Power, Vengeance e histórias até #25.'),
        child('For Tomorrow', 'Superman #204–215.'),
        child('The OMAC Project / Sacrifice', 'Action, Adventures, Superman e Wonder Woman conectados.'),
        child('Infinite Crisis / Superman: Infinite Crisis', 'Evento #1–7 e capítulos de Superman.')
      ])
    ]),
    section('newkrypton-v2', 'One Year Later, Geoff Johns e New Krypton', [
      run('Geoff Johns em Action Comics', 'Arcos que reconstruíram a mitologia kryptoniana.', [
        child('Last Son', 'Action Comics #844–846, #851 e Annual #11.'),
        child('Escape from Bizarro World', 'Action Comics #855–857.'),
        child('Superman and the Legion of Super-Heroes', 'Action Comics #858–863.'),
        child('Brainiac', 'Action Comics #866–870.')
      ]),
      run('New Krypton Saga', 'As séries de Superman, Supergirl e World of New Krypton formam uma única saga.', [
        child('New Krypton Vol. 1', 'Especial e capítulos iniciais em Superman, Action e Supergirl.'),
        child('New Krypton Vol. 2', 'Continuação do crossover inicial.'),
        child('World of New Krypton Vol. 1', 'World of New Krypton #1–5.'),
        child('World of New Krypton Vol. 2', 'World of New Krypton #6–12.'),
        child('Codename: Patriot', 'Crossover por Superman, Action, Supergirl e World of New Krypton.'),
        child('Nightwing and Flamebird', 'Fase kryptoniana de Action Comics.'),
        child('Last Stand of New Krypton', 'Minissérie e capítulos coordenados.'),
        child('War of the Supermen', 'Minissérie #0–4; conclusão da saga.')
      ]),
      run('Rumo a Flashpoint', 'Últimas fases do Superman pós-Crise.', [
        child('Superman: Grounded Vols. 1–2', 'Superman #700–714.'),
        child('Superman: The Black Ring Vols. 1–2', 'Action Comics #890–900.'),
        child('Reign of Doomsday', 'Action Comics #900–904 e especiais.'),
        child('Flashpoint', 'Flashpoint #1–5; encerra esta continuidade.')
      ])
    ])
  ];

  const justiceLeague = find('justice-league-reading-order');
  if (justiceLeague) justiceLeague.sections = [
    section('classic-v2', 'Liga clássica e Internacional', [
      run('Justice League of America — coleções clássicas', 'A formação e a longa fase anterior à Crise.', [
        child('The Brave and the Bold #28–30', 'Primeiras aparições da equipe.'),
        child('Justice League of America: The Silver Age Omnibus Vol. 1', 'The Brave and the Bold #28–30 e JLA #1–30.'),
        child('Silver Age Omnibus Vol. 2', 'JLA #31–76 e especiais.'),
        child('Silver Age Omnibus Vol. 3', 'JLA #77–146 e material relacionado.'),
        child('The Bronze Age Omnibus Vols. 1–3', 'Continua a série clássica até Crisis on Infinite Earths.')
      ]),
      run('Justice League International', 'A fase de Giffen e DeMatteis alterna Justice League, JLI, JLA e Justice League Europe.', [
        child('JLI Omnibus Vol. 1', 'Justice League #1–6, JLI #7–25, JLA #26–30 e JLE #1–6.'),
        child('JLI Omnibus Vol. 2', 'Justice League America, Europe, Quarterly e especiais seguintes.'),
        child('JLI Omnibus Vol. 3', 'Conclusão da fase e histórias derivadas.'),
        child('JLA: Year One', 'Minissérie #1–12; origem pós-Crise alternativa da equipe.')
      ])
    ]),
    section('morrison-v2', 'JLA de Grant Morrison e Mark Waid', [
      run('JLA — Grant Morrison, Mark Waid e Joe Kelly', 'Cada volume abaixo continua a mesma série iniciada em 1997.', [
        child('Vol. 1: New World Order', 'JLA #1–4.'),
        child('Vol. 2: American Dreams', 'JLA #5–9.'),
        child('Vol. 3: Rock of Ages', 'JLA #10–15.'),
        child('Vol. 4: Strength in Numbers', 'JLA #16–23 e especiais.'),
        child('DC One Million', 'Evento após JLA #23.'),
        child('Vol. 5: Justice for All', 'JLA #24–33.'),
        child('World War III', 'JLA #34–41.'),
        child('Tower of Babel', 'JLA #43–46.'),
        child('Divided We Fall', 'JLA #47–54.'),
        child('Terror Incognita', 'JLA #55–60.'),
        child('Golden Perfect / Obsidian Age', 'JLA #61–76.'),
        child('Rules of Engagement / Trial by Fire / Tenth Circle', 'JLA #77–99.')
      ])
    ]),
    section('new52-v2', 'New 52 — a Liga de Geoff Johns', [
      run('Justice League — Geoff Johns', 'A série principal e seus crossovers são acompanhados volume por volume.', [
        child('Vol. 1: Origin', 'Justice League #1–6.'),
        child('Vol. 2: The Villain’s Journey', 'Justice League #7–12.'),
        child('Vol. 3: Throne of Atlantis', 'Justice League #13–17 e Aquaman #14–16.'),
        child('Vol. 4: The Grid', 'Justice League #18–23.'),
        child('Trinity War', 'Justice League, JLA e Justice League Dark.'),
        child('Forever Evil', 'Evento #1–7 e capítulos ligados à Liga.'),
        child('Vol. 5: Forever Heroes', 'Justice League #24–29.'),
        child('Vol. 6: Injustice League', 'Justice League #30–39.'),
        child('Darkseid War Vols. 1–2', 'Justice League #40–50 e especiais.')
      ])
    ]),
    section('recent-v2', 'Rebirth e fases recentes', [
      run('Justice League Rebirth', 'A série de Bryan Hitch em quatro grandes blocos.', [
        child('Vol. 1: The Extinction Machines', 'Rebirth #1 e Justice League #1–5.'),
        child('Vol. 2: Outbreak', 'Justice League #6–11.'),
        child('Vol. 3: Timeless', 'Justice League #12–17.'),
        child('Vol. 4: Endless', 'Justice League #18–25.'),
        child('Vols. 5–7', 'Legacy, Justice Lost e a conclusão até #43.')
      ]),
      run('Justice League — Scott Snyder', 'Totality, Metal e a Guerra Justiça/Destino.', [
        child('Vol. 1: The Totality', 'Justice League #1–7.'),
        child('Vol. 2: Graveyard of Gods', 'Justice League #8–12.'),
        child('Aquaman/Justice League: Drowned Earth', 'Crossover entre os dois títulos.'),
        child('Vol. 3: Hawkworld', 'Justice League #13–18.'),
        child('Vol. 4: The Sixth Dimension', 'Justice League #19–28.'),
        child('Vol. 5: Justice/Doom War', 'Justice League #29–39.')
      ]),
      run('Infinite Frontier e Dark Crisis', 'A equipe, Justice League Dark e o encerramento desta formação.', [
        child('Justice League: Prisms', 'Justice League #59–63.'),
        child('Justice League: United Order', 'Justice League #64–71.'),
        child('Justice League Dark: The Great Wickedness', 'Backups de Justice League #59–71 e Annual.'),
        child('Death of the Justice League', 'Justice League #72–75.'),
        child('Dark Crisis on Infinite Earths', 'Minissérie principal e especiais essenciais.')
      ])
    ])
  ];

  const avengers = find('avengers-reading-order');
  if (avengers) avengers.sections = [
    section('classic-v2', 'Vingadores clássicos', [
      run('Avengers — Epic Collections clássicas', 'A série de 1963 organizada em grandes coleções sequenciais.', [
        child('Earth’s Mightiest Heroes', 'Avengers #1–20.'),
        child('Once an Avenger', 'Avengers #21–40.'),
        child('Behold... The Vision', 'Avengers #41–56 e Annual #1–2.'),
        child('This Beachhead Earth', 'Avengers #57–76 e material relacionado.'),
        child('The Kree/Skrull War', 'Avengers #89–97 e capítulos de preparação.'),
        child('The Avengers/Defenders War', 'Crossover entre Avengers e Defenders.'),
        child('The Korvac Saga', 'Avengers #167–177.'),
        child('Under Siege', 'A fase de Roger Stern culminando em Avengers #270–277.'),
        child('Operation: Galactic Storm', 'Crossover entre Avengers, West Coast Avengers e títulos cósmicos.')
      ]),
      run('West Coast Avengers', 'A equipe paralela deve ser acompanhada junto da série principal nos crossovers.', [
        child('West Coast Avengers Epic Collection Vol. 1', 'Minissérie #1–4 e série regular #1–7.'),
        child('Lost in Space-Time', 'West Coast Avengers #17–24.'),
        child('Darker than Scarlet', 'West Coast Avengers #42–50.'),
        child('Avengers West Coast: Vision Quest', 'West Coast Avengers #42–50 e conexões com Wanda e Visão.')
      ])
    ]),
    section('heroes-return-v2', 'Heroes Return e a era de Brian Michael Bendis', [
      run('Avengers — Kurt Busiek e George Pérez', 'A série de 1998 até Avengers Disassembled.', [
        child('Vol. 1: Assemble', 'Avengers (1998) #1–11.'),
        child('Vol. 2: Ultron Unlimited', 'Avengers #12–23 e Annual 1999.'),
        child('Vol. 3: The Kang Dynasty — preparação', 'Avengers #24–40.'),
        child('The Kang Dynasty', 'Avengers #41–55.'),
        child('World Trust / Red Zone', 'Avengers #56–70.'),
        child('The Search for She-Hulk / Lionheart', 'Avengers #71–84.')
      ]),
      run('Avengers Disassembled e New Avengers', 'A linha principal se divide entre New, Mighty, Secret e Dark Avengers.', [
        child('Avengers Disassembled', 'Avengers #500–503, Finale e prólogos essenciais.'),
        child('New Avengers Vols. 1–4', 'Breakout, Sentry, Secrets and Lies e The Collective.'),
        child('Civil War / New Avengers Vols. 5–7', 'As equipes se dividem após a Guerra Civil.'),
        child('Mighty Avengers Vols. 1–4', 'Equipe oficial iniciada por Bendis.'),
        child('Secret Invasion', 'Evento e capítulos de New/Mighty Avengers.'),
        child('Dark Avengers Vols. 1–2', 'A equipe de Norman Osborn durante Dark Reign.'),
        child('Siege', 'Conclusão de Dark Reign e da primeira era Bendis.'),
        child('Heroic Age: Avengers / New Avengers / Secret Avengers', 'Três títulos paralelos após Siege.')
      ])
    ]),
    section('hickman-v2', 'Jonathan Hickman e Secret Wars', [
      run('Avengers / New Avengers — Jonathan Hickman', 'As duas séries devem ser lidas em paralelo.', [
        child('Avengers Vol. 1: Avengers World', 'Avengers #1–6.'),
        child('New Avengers Vol. 1: Everything Dies', 'New Avengers #1–6.'),
        child('Avengers Vols. 2–3', 'Avengers #7–17.'),
        child('New Avengers Vol. 2: Infinity', 'New Avengers #7–12.'),
        child('Infinity', 'Infinity #1–6 com Avengers e New Avengers intercalados.'),
        child('Avengers World / Adapt or Die', 'Continuação de Avengers #18–34.'),
        child('New Avengers: Other Worlds / A Perfect World', 'New Avengers #13–23.'),
        child('Time Runs Out Vols. 1–4', 'Avengers #35–44 e New Avengers #24–33.'),
        child('Secret Wars', 'Secret Wars #0–9; conclusão da saga.')
      ])
    ]),
    section('postsecret-v2', 'Depois de Secret Wars', [
      run('All-New, All-Different Avengers — Mark Waid', 'A equipe de legados e a divisão em Champions.', [
        child('Vol. 1: The Magnificent Seven', 'Avengers #1–6.'),
        child('Vol. 2: Family Business', 'Avengers #7–12.'),
        child('Civil War II', 'Evento e capítulos da equipe.'),
        child('Champions Vol. 1: Change the World', 'Champions #1–6.'),
        child('Avengers: Unleashed Vols. 1–3', 'Avengers #1.1–5.1 e #1–11 da fase seguinte.'),
        child('Avengers: No Surrender', 'Avengers #675–690.')
      ]),
      run('Avengers — Jason Aaron', 'A longa fase de 2018 organizada por volumes.', [
        child('Vol. 1: The Final Host', 'Avengers #1–6.'),
        child('Vol. 2: World Tour', 'Avengers #7–12.'),
        child('Vol. 3: War of the Vampires', 'Avengers #13–17.'),
        child('Vol. 4: War of the Realms', 'Avengers #18–21.'),
        child('Vol. 5: Challenge of the Ghost Riders', 'Avengers #22–25.'),
        child('Vol. 6: Starbrand Reborn', 'Avengers #26–30.'),
        child('Vol. 7: The Age of Khonshu', 'Avengers #31–38.'),
        child('Vol. 8: Enter the Phoenix', 'Avengers #39–45.'),
        child('Vol. 9: World War She-Hulk', 'Avengers #46–50.'),
        child('Vol. 10: The Death Hunters', 'Avengers #51–56.'),
        child('Avengers Assemble', 'Avengers #57–66 e Avengers Assemble Alpha/Omega.')
      ]),
      run('Avengers — Jed MacKay', 'A fase Tribulation Events até One World Under Doom.', [
        child('Vol. 1: The Impossible City', 'Avengers (2023) #1–6.'),
        child('Vol. 2: Twilight Dreaming', 'Avengers #7–11.'),
        child('Vol. 3: Blood Hunt', 'Avengers #12–17.'),
        child('Vol. 4: Storm', 'Avengers #18–24.'),
        child('Vol. 5: Masters of Evil', 'Avengers #25–30.'),
        child('Vol. 6: The Grail', 'Avengers #31–36.')
      ])
    ])
  ];

  const customIds = new Set(['superman-modern-age-reading-order', 'justice-league-reading-order', 'avengers-reading-order', 'wonder-woman-reading-order']);
  orders.filter(item => !customIds.has(item.id)).forEach(item => {
    expandVolumeRanges(item);
    splitSlashTitles(item);
    groupRepeatedVolumes(item);
  });

  function setSubs(orderId, matcher, entries, summary = 'Fase dividida em volumes para acompanhar a leitura.') {
    const target = find(orderId);
    if (!target) return;
    const item = target.sections.flatMap(part => part.items).find(entry => typeof matcher === 'string' ? entry.title === matcher : matcher.test(entry.title));
    if (!item) return;
    item.details = summary;
    item.companions = entries.map(([title, details]) => child(title, details));
  }

  setSubs('flash-reading-order', 'The Flash by Grant Morrison & Mark Millar', [
    ['Emergency Stop', 'The Flash #130–135.'], ['The Human Race', 'The Flash #136–141.'], ['The Flash #1,000,000 / Secret Files', 'Especiais da mesma fase.']
  ]);
  setSubs('flash-reading-order', 'The Flash New 52 por Manapul e Buccellato', [
    ['Vol. 1: Move Forward', 'The Flash #1–8.'], ['Vol. 2: Rogues Revolution', 'The Flash #9–12 e Annual.'], ['Vol. 3: Gorilla Warfare', 'The Flash #13–19.'], ['Vol. 4: Reverse', 'The Flash #20–25.'], ['Vol. 5: History Lessons', 'The Flash #26–29 e Annual.']
  ]);
  setSubs('flash-reading-order', 'The Flash Rebirth por Joshua Williamson', [
    ['Vols. 1–3', 'Lightning Strikes Twice, Speed of Darkness e Rogues Reloaded.'], ['Vols. 4–6', 'Running Scared, Negative e Cold Day in Hell.'], ['Flash War', 'The Flash #46–51 e especiais.'], ['Vols. 8–11', 'Flash War seguinte, Force Quest e Year One.'], ['Vols. 12–15', 'Death and the Speed Force até Finish Line.']
  ]);
  setSubs('flash-reading-order', 'The Flash por Jeremy Adams', [
    ['Wally West Returns', 'The Flash #768–771 e Annual.'], ['Eclipsed', 'The Flash #772–779.'], ['The Search for Barry Allen', 'The Flash #780–789.'], ['One-Minute War', 'The Flash #790–796 e especiais.'], ['Time Heist', 'The Flash #797–800.']
  ]);
  setSubs('flash-reading-order', 'The Flash por Simon Spurrier', [
    ['Vol. 1: Strange Attractor', 'The Flash (2023) #1–6.'], ['Vol. 2: Until Time Stands Still', 'The Flash #7–13.'], ['Vol. 3 e seguintes', 'Continuação da fase de Simon Spurrier.']
  ]);

  setSubs('green-lantern-reading-order', 'Green Lantern New 52 por Geoff Johns', [
    ['Vol. 1: Sinestro', 'Green Lantern #1–6.'], ['Vol. 2: Revenge of the Black Hand', 'Green Lantern #7–12 e Annual.'], ['Rise of the Third Army', 'Crossover entre as séries dos Lanternas.'], ['Wrath of the First Lantern', 'Conclusão da fase de Geoff Johns.']
  ]);
  setSubs('green-lantern-reading-order', 'Hal Jordan and the Green Lantern Corps', [
    ['Vol. 1: Sinestro’s Law', 'Rebirth #1 e #1–7.'], ['Vol. 2: Bottled Light', '#8–13.'], ['Vol. 3: Quest for Hope', '#14–21.'], ['Vol. 4: Fracture', '#22–29.'], ['Vol. 5: Twilight of the Guardians', '#30–36.'], ['Vol. 6: Zod’s Will', '#37–41.'], ['Vol. 7: Darkstars Rising', '#42–50.']
  ]);
  setSubs('green-lantern-reading-order', 'Green Lanterns', [
    ['Vol. 1: Rage Planet', 'Rebirth #1 e Green Lanterns #1–6.'], ['Vol. 2: Phantom Lantern', '#7–14.'], ['Vol. 3: Polarity', '#15–21.'], ['Vol. 4: The First Ring', '#22–26.'], ['Vol. 5: Out of Time', '#27–32.'], ['Vols. 6–9', 'A House Divided até Evil’s Might, concluindo em #57.']
  ]);
  setSubs('green-lantern-reading-order', 'The Green Lantern por Grant Morrison', [
    ['Season One Vol. 1: Intergalactic Lawman', 'The Green Lantern #1–6.'], ['Season One Vol. 2: The Day the Stars Fell', '#7–12 e Annual.'], ['Blackstars', 'Minissérie #1–3.'], ['Season Two Vol. 1', 'The Green Lantern Season Two #1–6.'], ['Season Two Vol. 2', '#7–12.']
  ]);

  setSubs('x-men-complete-reading-order', 'New X-Men por Grant Morrison', [
    ['Book One', 'New X-Men #114–126 e Annual 2001.'], ['Book Two', 'New X-Men #127–141.'], ['Book Three', 'New X-Men #142–154.']
  ]);
  setSubs('x-men-complete-reading-order', 'Astonishing X-Men por Joss Whedon', [
    ['Vol. 1: Gifted', 'Astonishing X-Men #1–6.'], ['Vol. 2: Dangerous', '#7–12.'], ['Vol. 3: Torn', '#13–18.'], ['Vol. 4: Unstoppable', '#19–24 e Giant-Size #1.']
  ]);
  setSubs('x-men-complete-reading-order', 'X-Men: From the Ashes', [
    ['X-Men — Jed MacKay', 'Série de 2024.'], ['Uncanny X-Men — Gail Simone', 'Série de 2024.'], ['Exceptional X-Men — Eve Ewing', 'Série de 2024.'], ['NYX / X-Force / X-Factor', 'Títulos paralelos da nova linha mutante.']
  ]);

  setSubs('fantastic-four-reading-order', 'Fantastic Four por Stan Lee & Jack Kirby', [
    ['Omnibus Vol. 1', 'Fantastic Four #1–30 e Annual #1.'], ['Omnibus Vol. 2', '#31–60 e Annuals.'], ['Omnibus Vol. 3', '#61–93 e especiais.'], ['Omnibus Vol. 4', '#94–125 e conclusão da dupla.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four por John Byrne', [
    ['Omnibus Vol. 1', 'Fantastic Four #209–218, #220–221 e #232–260.'], ['Omnibus Vol. 2', 'Fantastic Four #261–295 e especiais.'], ['Trial of Galactus', 'Arco cósmico dentro da fase Byrne.'], ['Visionaries Vols. 1–8', 'Alternativa em volumes menores para a mesma fase.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four Epic Collections — anos 1990', [
    ['Into the Timestream', 'Fase de Walt Simonson.'], ['The New Fantastic Four', 'A equipe substituta e histórias dos anos 1990.'], ['Nobody Gets Out Alive', 'Tom DeFalco e Paul Ryan.'], ['Strange Days', 'Continuação até Heroes Reborn.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four por Mark Waid & Mike Wieringo', [
    ['Vol. 1: Imaginauts', 'Fantastic Four #60–66.'], ['Vol. 2: Unthinkable', '#67–70 e #500–502.'], ['Vol. 3: Authoritative Action', '#503–508.'], ['Vol. 4: Hereafter', '#509–513.'], ['Vols. 5–7', 'Rising Storm até #524.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four por James Robinson', [
    ['Vol. 1: The Fall of the Fantastic Four', 'Fantastic Four (2014) #1–5.'], ['Vol. 2: Original Sin', '#6–10.'], ['Vol. 3: Back in Blue', '#11–14 e Annual.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four por Dan Slott', [
    ['Vols. 1–3', 'Fourever, Mr. and Mrs. Grimm e Herald of Doom.'], ['Vols. 4–6', 'Thing vs. Immortal Hulk até Empyre.'], ['Vols. 7–9', 'The Forever Gate até Reckoning War.'], ['Vols. 10–11', 'Conclusão até Fantastic Four #46.']
  ]);
  setSubs('fantastic-four-reading-order', 'Fantastic Four por Ryan North', [
    ['Vol. 1: Whatever Happened to the Fantastic Four?', 'Fantastic Four (2022) #1–6.'], ['Vol. 2: Four Stories About Hope', '#7–11.'], ['Vol. 3: The Impossible Is Probable', '#12–18.'], ['Vol. 4 e seguintes', 'Continuação da fase de Ryan North.']
  ]);

  setSubs('iron-man-reading-order', 'World’s Most Wanted', [
    ['Book One', 'Invincible Iron Man #8–13.'], ['Book Two', 'Invincible Iron Man #14–19.']
  ]);
  setSubs('iron-man-reading-order', 'Tony Stark: Iron Man', [
    ['Vol. 1: Self-Made Man', 'Tony Stark: Iron Man #1–5.'], ['Vol. 2: Stark Realities', '#6–11.'], ['Vol. 3: War of the Realms', '#12–14.'], ['Ultron Agenda', '#15–19.'], ['Iron Man 2020', 'Evento #1–6 e séries paralelas.']
  ]);
  setSubs('iron-man-reading-order', 'Books of Korvac', [
    ['Vol. 1: Big Iron', 'Iron Man (2020) #1–5.'], ['Vol. 2: Overclock', '#6–10.'], ['Vol. 3: Cosmic Iron Man', '#11–19.'], ['Vol. 4: Source Control', '#20–25.']
  ]);
  setSubs('iron-man-reading-order', 'Invincible Iron Man por Gerry Duggan', [
    ['Vol. 1: Demon in the Armor', 'Invincible Iron Man (2022) #1–6.'], ['Vol. 2: The Wedding of Tony Stark and Emma Frost', '#7–12.'], ['Vol. 3: Iron and Diamonds', '#13–17.'], ['Vol. 4: The End of Krakoa', '#18–20.']
  ]);

  setSubs('daredevil-reading-order', 'Daredevil por Brian Michael Bendis', [
    ['Ultimate Collection Book 1', 'Daredevil #16–19 e #26–40.'], ['Book 2', '#41–50 e #56–65.'], ['Book 3', '#66–81.']
  ]);
  setSubs('daredevil-reading-order', 'Daredevil por Ed Brubaker', [
    ['Ultimate Collection Book 1', 'Daredevil #82–93.'], ['Book 2', '#94–105.'], ['Book 3', '#106–119 e #500.']
  ]);
  setSubs('daredevil-reading-order', 'Daredevil por Mark Waid', [
    ['Omnibus Vol. 1', 'Daredevil (2011) #1–27 e especiais.'], ['Omnibus Vol. 2', 'Daredevil #28–36 e série de 2014 #1–18.']
  ]);
  setSubs('daredevil-reading-order', 'Daredevil por Charles Soule', [
    ['Back in Black Vols. 1–3', 'Daredevil #1–14.'], ['Vols. 4–6', 'Identity, Supreme e Mayor Fisk.'], ['Vols. 7–8', 'Mayor Murdock e Death of Daredevil até #612.']
  ]);
  setSubs('daredevil-reading-order', 'Daredevil por Saladin Ahmed', [
    ['Vol. 1: Hell Breaks Loose', 'Daredevil (2023) #1–5.'], ['Vol. 2: Hell to Pay', '#6–10.'], ['Vol. 3 e seguintes', 'Continuação da fase de Saladin Ahmed.']
  ]);

  setSubs('supergirl-reading-order', 'Supergirl por Peter David', [
    ['Book One', 'Supergirl (1996) #1–11 e Annual.'], ['Book Two', '#12–25.'], ['Book Three', '#26–50.'], ['Book Four', '#51–80 e conclusão de Linda Danvers.']
  ]);
  setSubs('supergirl-reading-order', 'Supergirl por Sterling Gates e Jamal Igle', [
    ['Who Is Superwoman?', 'Supergirl #34–42.'], ['Friends and Fugitives', '#43–47 e Annual.'], ['Death and the Family', '#48–50 e especiais.'], ['Bizarrogirl', '#53–59.'], ['Good-Looking Corpse / This Is Not My Life', '#60–67.']
  ]);
  setSubs('supergirl-reading-order', 'Supergirl: The New 52', [
    ['Vol. 1: Last Daughter of Krypton', 'Supergirl #1–7.'], ['Vol. 2: Girl in the World', '#8–12 e #0.'], ['Vol. 3: Sanctuary', '#13–19.'], ['Vol. 4: Out of the Past', '#20–25.'], ['Vol. 5: Red Daughter of Krypton', '#26–33 e Red Lanterns.'], ['Vol. 6: Crucible', '#34–40.']
  ]);
  setSubs('supergirl-reading-order', 'Supergirl Rebirth', [
    ['Vol. 1: Reign of the Cyborg Supermen', 'Rebirth #1 e #1–6.'], ['Vol. 2: Escape from the Phantom Zone', '#7–11 e Batgirl Annual.'], ['Vol. 3: Girl of No Tomorrow', '#12–14 e #16–19.'], ['Vol. 4: Plain Sight', '#15 e #20.'], ['Killers of Krypton / Sins of the Circle', 'Supergirl #21–36.']
  ]);

  setSubs('jon-kent-reading-order', 'Superman: Son of Kal-El', [
    ['Vol. 1: The Truth', 'Son of Kal-El #1–6.'], ['Vol. 2: The Rising', '#7–12.'], ['Vol. 3: Battle for Gamorra', '#13–18 e Annual.']
  ]);
  setSubs('conner-kent-reading-order', 'Superboy (1994) — primeira fase', [
    ['Book One: Trouble in Paradise', 'Superboy #0–10 e Annual.'], ['Book Two', 'Superboy #11–22.'], ['Book Three', 'Superboy #23–33 e Annuals.']
  ]);
  setSubs('conner-kent-reading-order', 'Superboy (1994) — fase final', [
    ['Superboy #34–50', 'Cadmus, Knockout e o Havaí.'], ['Superboy #51–75', 'Grandes crossovers e mudanças de status.'], ['Superboy #76–100', 'Conclusão da série original.']
  ]);
  setSubs('conner-kent-reading-order', 'Young Justice por Peter David', [
    ['Book One', 'Young Justice #1–7 e especiais.'], ['Book Two', '#8–19.'], ['Book Three', '#20–32.'], ['Book Four', '#33–43.'], ['Book Five', '#44–55 e conclusão.']
  ]);
  setSubs('power-girl-reading-order', 'JSA por Geoff Johns', [
    ['JSA Omnibus Vol. 2', 'Fase central de Power Girl com a Sociedade.'], ['JSA Omnibus Vol. 3', 'Continuação e eventos da equipe.'], ['JSA Classified #1–4', 'Origem moderna e conflitos de identidade.']
  ]);

  function chunkLongRuns(target) {
    target.sections.forEach(part => part.items.forEach(item => {
      if ((item.companions || []).length) return;
      const match = item.details.match(/(?:Collects\s+)?([^.;]{2,70}?)\s*#(\d+)\s*[–-]\s*(\d+)/i);
      if (!match) return;
      const start = Number(match[2]);
      const end = Number(match[3]);
      if (end - start < 12 || end - start > 180) return;
      const series = match[1].trim().replace(/^(?:e|and)\s+/i, '') || item.title;
      const pieces = [];
      for (let cursor = start; cursor <= end; cursor += 10) {
        const last = Math.min(cursor + 9, end);
        pieces.push(child(`${series} #${cursor}–${last}`, `Parte da sequência ${item.title}.`));
      }
      item.companions = pieces;
      item.details = `Sequência de ${end - start + 1} edições dividida em blocos menores de acompanhamento.`;
    }));
  }
  orders.filter(item => !customIds.has(item.id)).forEach(chunkLongRuns);

  const additions = [];

  additions.push(order(
    'moon-knight-reading-order', 'Marvel', 'Cavaleiro da Lua', 'Cavaleiro da Lua — Ordem de Leitura',
    'https://www.comicbooktreasury.com/moon-knight-reading-order/', [
      section('classic', 'Origens e a fase clássica', [
        run('Doug Moench e Bill Sienkiewicz', 'O nascimento de Marc Spector e sua primeira série solo.', [
          child('Werewolf by Night #32–33', 'Primeira aparição do Cavaleiro da Lua.'),
          child('Hulk! Magazine #11–15 e #17–18', 'Histórias em preto e branco que desenvolvem o elenco.'),
          child('Moon Knight Epic Collection: Bad Moon Rising', 'Werewolf by Night, Marvel Spotlight e primeiras aventuras.'),
          child('Moon Knight Epic Collection: Shadows of the Moon', 'Moon Knight #1–20 e material relacionado.'),
          child('Moon Knight Epic Collection: Final Rest', 'Moon Knight #21–38 e especiais.'),
          child('Moon Knight: Fist of Khonshu', 'Minissérie de 1985 #1–6.')
        ]),
        run('Marc Spector: Moon Knight', 'A longa série dos anos 1990 e suas aparições paralelas.', [
          child('Epic Collection: Butcher’s Moon', 'Fist of Khonshu #1–6 e Marc Spector #1–7.'),
          child('Epic Collection: The Trial of Marc Spector', 'Marc Spector: Moon Knight #8–25.'),
          child('Epic Collection: Scarlet Redemption', 'Marc Spector #26–38 e Amazing Spider-Man #353–358.'),
          child('Epic Collection: Death Watch', 'Marc Spector #39–51 e especiais.'),
          child('Marc Spector: Moon Knight #52–60', 'Fim da série; ainda não reunido integralmente em Epic Collection.'),
          child('Resurrection War / High Strangers', 'Minisséries que trazem Marc de volta.')
        ])
      ]),
      section('modern', 'Retorno moderno (2006–2012)', [
        run('Charlie Huston e Mike Benson', 'A fase violenta de 2006, seguida por Vengeance of the Moon Knight.', [
          child('Vol. 1: The Bottom', 'Moon Knight (2006) #1–6.'),
          child('Vol. 2: Midnight Sun', 'Moon Knight #7–13 e Annual #1.'),
          child('Vol. 3: God & Country', 'Moon Knight #14–20.'),
          child('Vol. 4: The Death of Marc Spector', 'Moon Knight #21–25 e Silent Knight.'),
          child('Vol. 5: Down South', 'Moon Knight #26–30.'),
          child('Vengeance Vol. 1: Shock and Awe', 'Vengeance of the Moon Knight #1–6.'),
          child('Vengeance Vol. 2: Killed, Not Dead', 'Vengeance #7–10.'),
          child('Shadowland: Moon Knight', 'Minissérie #1–3.')
        ]),
        run('Brian Michael Bendis e Alex Maleev', 'A fase de Los Angeles em dois volumes.', [
          child('Vol. 1', 'Moon Knight (2011) #1–7.'),
          child('Vol. 2', 'Moon Knight (2011) #8–12.')
        ])
      ]),
      section('marvel-now', 'Marvel NOW, Lemire e Legacy', [
        run('Ellis, Wood e Bunn', 'A série de 2014 apresenta o moderno Mr. Knight.', [
          child('Vol. 1: From the Dead', 'Moon Knight (2014) #1–6.'),
          child('Vol. 2: Dead Will Rise', 'Moon Knight #7–12.'),
          child('Vol. 3: In the Night', 'Moon Knight #13–17.')
        ]),
        run('Jeff Lemire e Greg Smallwood', 'A jornada psicológica completa em três volumes.', [
          child('Vol. 1: Lunatic', 'Moon Knight (2016) #1–5.'),
          child('Vol. 2: Reincarnations', 'Moon Knight #6–9.'),
          child('Vol. 3: Birth and Death', 'Moon Knight #10–14.')
        ]),
        run('Moon Knight: Legacy', 'A fase de Max Bemis retorna à numeração clássica.', [
          child('Vol. 1: Crazy Runs in the Family', 'Moon Knight #188–193.'),
          child('Vol. 2: Phases', 'Moon Knight #194–200.'),
          child('Doctor Strange: Damnation', 'Evento opcional ligado ao Cavaleiro da Lua.')
        ])
      ]),
      section('mackay', 'Jed MacKay, Vengeance e Fist of Khonshu', [
        run('Moon Knight — Jed MacKay', 'A Midnight Mission e a construção do novo elenco.', [
          child('Vol. 1: The Midnight Mission', 'Moon Knight (2021) #1–6.'),
          child('Vol. 2: Too Tough to Die', 'Moon Knight #7–12 e Devil’s Reign: Moon Knight.'),
          child('Vol. 3: Halfway to Sanity', 'Moon Knight #13–18 e Annual 2022.'),
          child('Vol. 4: Road to Ruin', 'Moon Knight #19–24.'),
          child('Vol. 5: The Last Days of Moon Knight', 'Moon Knight #25–30.'),
          child('Moon Knight: City of the Dead', 'Minissérie #1–5 em paralelo.')
        ]),
        run('Vengeance of the Moon Knight e além', 'Continuação direta da fase de MacKay.', [
          child('Vengeance of the Moon Knight Vol. 1', 'Vengeance of the Moon Knight (2024) #1–4.'),
          child('Vengeance of the Moon Knight Vol. 2', 'Vengeance #5–9 e Blood Hunt.'),
          child('Moon Knight: Fist of Khonshu Vol. 1', 'Fist of Khonshu (2024) #0–5.'),
          child('Moon Knight: Fist of Khonshu Vol. 2', 'Continuação da nova série.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'punisher-reading-order', 'Marvel', 'Justiceiro', 'Justiceiro — Ordem de Leitura',
    'https://www.comicbooktreasury.com/punisher-reading-order/', [
      section('beginnings', 'Primeiras aparições e três séries simultâneas', [
        run('Do Homem-Aranha à primeira minissérie', 'As aparições que estabelecem Frank Castle antes da série mensal.', [
          child('Amazing Spider-Man #129', 'Primeira aparição do Justiceiro.'),
          child('Amazing Spider-Man #134–135 e #161–162', 'Primeiros retornos contra e ao lado de Peter Parker.'),
          child('Daredevil #182–184', 'Conflito ideológico com Matt Murdock.'),
          child('Punisher: Circle of Blood', 'Punisher (1986) #1–5.'),
          child('Punisher: Back to the War Omnibus', 'Reúne as aparições iniciais e Circle of Blood.')
        ]),
        run('A era de três revistas mensais (1987–1995)', 'Punisher, War Journal e War Zone coexistem e se cruzam.', [
          child('Punisher Epic Collection Vols. 2–7', 'A série principal de 1987 organizada até Punisher #75.'),
          child('Punisher (1987) #76–104', 'Parte final da série principal.'),
          child('Punisher War Journal by Carl Potts & Jim Lee', 'War Journal #1–19.'),
          child('Punisher War Journal #20–80', 'Continuação da revista paralela.'),
          child('Punisher War Zone Vol. 1', 'War Zone #1–6.'),
          child('Punisher War Zone #7–25', 'Fase intermediária.'),
          child('Barbarian with a Gun', 'War Zone #26–30.'),
          child('River of Blood', 'War Zone #31–36.'),
          child('Suicide Run / Countdown', 'Crossovers finais entre as três séries.')
        ])
      ]),
      section('ennis', 'Garth Ennis — Marvel Knights e MAX', [
        run('Punisher — Marvel Knights', 'A fase de humor negro que recolocou Frank Castle no centro da Marvel.', [
          child('Welcome Back, Frank', 'Punisher (2000) #1–12.'),
          child('Complete Collection Vol. 1', 'Punisher vol. 5 #1–12 e vol. 6 #1–5.'),
          child('Complete Collection Vol. 2', 'Punisher vol. 6 #6–7 e #13–26.'),
          child('Complete Collection Vol. 3', 'Punisher #27–37 e War Zone (2008) #1–6.'),
          child('Punisher: Born', 'Prelúdio de quatro edições ambientado no Vietnã.'),
          child('Punisher: The Platoon', 'História anterior a Born.')
        ]),
        run('Punisher MAX', 'Continuidade adulta separada da Marvel principal.', [
          child('Complete Collection Vol. 1', 'Born e Punisher MAX #1–12.'),
          child('Complete Collection Vol. 2', 'Punisher MAX #13–30.'),
          child('Complete Collection Vol. 3', 'Punisher MAX #31–49.'),
          child('Complete Collection Vol. 4', 'Punisher MAX #50–60 e Valley Forge, Valley Forge.'),
          child('Complete Collection Vol. 5', 'Punisher MAX #61–75 e especiais.'),
          child('Complete Collection Vol. 6', 'Untold Tales e especiais MAX.'),
          child('Punisher MAX by Jason Aaron', 'Punisher MAX (2009) #1–22.')
        ])
      ]),
      section('modern', 'War Journal, Franken-Castle e Greg Rucka', [
        run('Punisher War Journal — Matt Fraction', 'Série conectada a Civil War, Secret Invasion e Dark Reign.', [
          child('Vol. 1: Civil War', 'War Journal #1–4.'),
          child('Vol. 2: Goin’ Out West', 'War Journal #5–11.'),
          child('Vol. 3: Hunter Hunted', 'War Journal #12–17.'),
          child('Vol. 4: Jigsaw', 'War Journal #18–23.'),
          child('Vol. 5: Secret Invasion', 'War Journal #24–26 e Annual #1.')
        ]),
        run('Rick Remender — Dark Reign e Franken-Castle', 'A transformação sobrenatural de Frank e sua conclusão.', [
          child('Vol. 1: Dark Reign', 'Punisher (2009) #1–5.'),
          child('Vol. 2: Dead End', 'Punisher #6–10 e Annual.'),
          child('Vol. 3: Franken-Castle', 'Punisher #11–16 e Franken-Castle #17–21.'),
          child('Franken-Castle Vol. 2', 'Franken-Castle #18–21 e Dark Wolverine #88–89.'),
          child('Punisher: In the Blood', 'Minissérie #1–5.')
        ]),
        run('Punisher — Greg Rucka', 'A fase urbana de 2011 e seu fechamento com Daredevil e Spider-Man.', [
          child('Vol. 1', 'Punisher (2011) #1–5.'),
          child('Vol. 2', 'Punisher #6–10, Avenging Spider-Man #6 e Daredevil #11.'),
          child('Vol. 3', 'Punisher #11–16.'),
          child('Enter the War Zone', 'Punisher: War Zone (2012) #1–5.')
        ])
      ]),
      section('recent', 'War Machine, Rei dos Assassinos e fase recente', [
        run('Matthew Rosenberg', 'Frank usa a armadura do Máquina de Combate e depois volta à guerra urbana.', [
          child('War Machine Vol. 1', 'Punisher #218–223.'),
          child('War Machine Vol. 2', 'Punisher #224–228.'),
          child('World War Frank', 'Punisher (2018) #1–5.'),
          child('War in Bagalia', 'Punisher #6–11.'),
          child('Street by Street, Block by Block', 'Punisher #12–16.'),
          child('War of the Realms: Punisher', 'Minissérie #1–3.'),
          child('Punisher Kill Krew', 'Minissérie #1–5.')
        ]),
        run('Jason Aaron — King of Killers', 'A fase ligada ao Tentáculo e ao Demolidor.', [
          child('Book One', 'Punisher (2022) #1–6.'),
          child('Book Two', 'Punisher (2022) #7–12.'),
          child('Daredevil (2022) #1–14', 'Leitura paralela opcional que reage às ações de Frank.'),
          child('Punisher War Journal: Blitz', 'Especial da nova fase.'),
          child('Punisher War Journal: Brother', 'Especial da nova fase.'),
          child('Punisher War Journal: Base', 'Especial da nova fase.')
        ]),
        run('Joe Garrison', 'Um novo Justiceiro assume temporariamente o símbolo.', [
          child('Punisher (2023) #1–4', 'Minissérie de David Pepose.'),
          child('Daredevil: Woman Without Fear', 'Participação posterior de Joe Garrison.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'hulk-reading-order', 'Marvel', 'Hulk', 'Hulk — Ordem de Leitura',
    'https://www.comicbooktreasury.com/hulk-reading-order/', [
      section('classic', 'Do Hulk clássico a Peter David', [
        run('Origens e eras clássicas', 'As coleções essenciais antes da fase moderna.', [
          child('Hulk Epic Collection: Man or Monster?', 'Incredible Hulk #1–6 e Tales to Astonish.'),
          child('Hulk Epic Collections da Era de Prata', 'Continuação de Tales to Astonish e Incredible Hulk.'),
          child('Hulk by Bill Mantlo', 'A fase que inclui Crossroads e estabelece grandes conceitos.'),
          child('Hulk: Grand Design', 'Resumo opcional de décadas da cronologia em Monster e Madness.')
        ]),
        run('Incredible Hulk — Peter David', 'A longa fase psicológica organizada pelos omnibus.', [
          child('Omnibus Vol. 1', 'Incredible Hulk #328, #331–368 e material relacionado.'),
          child('Omnibus Vol. 2', 'Incredible Hulk #369–400 e especiais.'),
          child('Omnibus Vol. 3', 'Incredible Hulk #401–435 e minisséries.'),
          child('Omnibus Vol. 4', 'Incredible Hulk #436–467 e conclusão da fase original.'),
          child('Omnibus Vol. 5', 'Retornos posteriores de Peter David ao personagem.'),
          child('Future Imperfect', 'Minissérie que apresenta o Maestro.'),
          child('The End', 'Despedida alternativa de Bruce Banner.')
        ])
      ]),
      section('reborn', 'Hulk Reborn e Bruce Jones', [
        run('Return of the Monster — Bruce Jones', 'Thriller de conspiração dividido em volumes.', [
          child('Vol. 1: Return of the Monster', 'Incredible Hulk (2000) #34–39.'),
          child('Vol. 2: Boiling Point', 'Incredible Hulk #40–43.'),
          child('Vol. 3: Transfer of Power', 'Incredible Hulk #44–49.'),
          child('Vol. 4: Abominable', 'Incredible Hulk #50–54.'),
          child('Vol. 5: Hide in Plain Sight', 'Incredible Hulk #55–59.'),
          child('Vol. 6: Split Decisions', 'Incredible Hulk #60–65.'),
          child('Vol. 7: Dead Like Me', 'Incredible Hulk #65–69.'),
          child('Vol. 8: Big Things', 'Incredible Hulk #70–76.'),
          child('Tempest Fugit', 'Incredible Hulk #77–82.'),
          child('House of M: Incredible Hulk', 'Incredible Hulk #83–87.')
        ])
      ]),
      section('pak', 'Planet Hulk, World War Hulk e a família gama', [
        run('Greg Pak — Planet Hulk e World War Hulk', 'Uma saga contínua que leva Bruce de Sakaar de volta à Terra.', [
          child('Prelude to Planet Hulk', 'Incredible Hulk #88–91.'),
          child('Planet Hulk', 'Incredible Hulk #92–105 e Giant-Size Hulk.'),
          child('World War Hulk', 'World War Hulk #1–5.'),
          child('World War Hulk: Incredible Herc', 'Incredible Hulk #106–112; transição para Hércules.'),
          child('Skaar: Son of Hulk', 'A história do filho de Hulk em Sakaar.'),
          child('Fall of the Hulks', 'Início da guerra entre os Hulks.'),
          child('World War Hulks', 'Conclusão da fase dos Hulks vermelho e verde.'),
          child('Heart of the Monster', 'Incredible Hulks #630–635; encerramento de Pak.')
        ]),
        run('Red Hulk e Hulk vermelho', 'A série paralela de Jeph Loeb e Jeff Parker.', [
          child('Hulk Vol. 1: Red Hulk', 'Hulk (2008) #1–6.'),
          child('Hulk Vol. 2: Red & Green', 'Hulk #7–9 e especiais.'),
          child('Hulk Vol. 3: Hulk No More', 'Hulk #10–12 e #600.'),
          child('Red Hulk por Jeff Parker', 'Hulk #25–57 e especiais em coleções sucessivas.')
        ])
      ]),
      section('modern', 'Marvel NOW e Totally Awesome Hulk', [
        run('Indestructible Hulk — Mark Waid', 'Bruce transforma o Hulk em recurso científico da S.H.I.E.L.D.', [
          child('Vol. 1: Agent of S.H.I.E.L.D.', 'Indestructible Hulk #1–5.'),
          child('Vol. 2: Gods and Monster', 'Indestructible Hulk #6–10.'),
          child('Vol. 3: S.M.A.S.H. Time', 'Indestructible Hulk #11–15.'),
          child('Vol. 4: Humanity Bomb', 'Indestructible Hulk #16–20 e Annual.'),
          child('Hulk: Banner D.O.A.', 'Hulk (2014) #1–4.'),
          child('Omega Hulk Vols. 1–2', 'Hulk (2014) #5–16.')
        ]),
        run('Totally Awesome Hulk — Amadeus Cho', 'Amadeus assume o manto enquanto Bruce permanece afastado.', [
          child('Vol. 1: Cho Time', 'Totally Awesome Hulk #1–6.'),
          child('Vol. 2: Civil War II', 'Totally Awesome Hulk #7–12.'),
          child('Vol. 3: Big Apple Showdown', 'Totally Awesome Hulk #13–18.'),
          child('Vol. 4: My Best Friends Are Monsters', 'Totally Awesome Hulk #19–23.'),
          child('Vol. 5: Champions', 'Totally Awesome Hulk #23–24 e Champions.'),
          child('World War Hulk II', 'Incredible Hulk #714–717.')
        ])
      ]),
      section('immortal', 'Immortal Hulk e fases atuais', [
        run('Immortal Hulk — Al Ewing', 'A saga de horror completa em dez volumes.', [
          child('Vol. 1: Or Is He Both?', 'Immortal Hulk #1–5.'),
          child('Vol. 2: The Green Door', 'Immortal Hulk #6–10.'),
          child('Vol. 3: Hulk in Hell', 'Immortal Hulk #11–15.'),
          child('Vol. 4: Abomination', 'Immortal Hulk #16–20.'),
          child('Vol. 5: Breaker of Worlds', 'Immortal Hulk #21–25.'),
          child('Vol. 6: We Believe in Bruce Banner', 'Immortal Hulk #26–30.'),
          child('Vol. 7: Hulk Is Hulk', 'Immortal Hulk #31–35.'),
          child('Vol. 8: The Keeper of the Door', 'Immortal Hulk #36–40.'),
          child('Vol. 9: The Weakest One There Is', 'Immortal Hulk #41–45.'),
          child('Vol. 10: Of Hell and of Death', 'Immortal Hulk #46–50.')
        ]),
        run('Hulk — Donny Cates', 'A fase Starship Hulk e o crossover Banner of War.', [
          child('Vol. 1: Smashtronaut', 'Hulk (2021) #1–6.'),
          child('Banner of War', 'Hulk #7–8 e Thor #25–26.'),
          child('Vol. 2: Hulk Planet', 'Hulk #9–14.')
        ]),
        run('Incredible Hulk — Phillip Kennedy Johnson', 'A fase Age of Monsters devolve o horror ao título.', [
          child('Vol. 1: Age of Monsters', 'Incredible Hulk (2023) #1–5.'),
          child('Vol. 2: War Devils', 'Incredible Hulk #6–11.'),
          child('Vol. 3: Soul Cages', 'Incredible Hulk #12–19.'),
          child('Vol. 4 e seguintes', 'Continuação da série e especiais da família gama.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'hellblazer-john-constantine-reading-order', 'DC', 'Constantine e o lado místico', 'John Constantine / Hellblazer — Ordem de Leitura',
    'https://www.comicbooktreasury.com/hellblazer-john-constantine-reading-order/', [
      section('swamp', 'Antes de Hellblazer — Monstro do Pântano', [
        run('Constantine em Saga of the Swamp Thing', 'Alan Moore apresenta Constantine antes de sua série própria.', [
          child('Saga of the Swamp Thing Book Three', 'Inclui Swamp Thing #35–42; Constantine estreia em #37.'),
          child('Book Four', 'Swamp Thing #43–50 e o arco American Gothic.'),
          child('Book Five', 'Swamp Thing #51–56.'),
          child('Book Six', 'Swamp Thing #57–64; encerra a fase de Alan Moore.')
        ])
      ]),
      section('vertigo-early', 'Hellblazer clássico — Delano, Ennis e Jenkins', [
        run('Jamie Delano e o começo de Hellblazer', 'Os primeiros arcos políticos e sobrenaturais da série de 1988.', [
          child('Vol. 1: Original Sins', 'Hellblazer #1–9 e Swamp Thing #76–77.'),
          child('Vol. 2: The Devil You Know', 'Hellblazer #10–13 e Annual #1.'),
          child('Vol. 3: The Fear Machine', 'Hellblazer #14–22.'),
          child('Vol. 4: The Family Man', 'Hellblazer #23–33.'),
          child('Vol. 5: Dangerous Habits', 'Hellblazer #34–46; transição para Garth Ennis.')
        ]),
        run('Garth Ennis', 'A fase que consolida Constantine, Kit Ryan e seus maiores fracassos.', [
          child('Vol. 6: Bloodlines', 'Hellblazer #47–61.'),
          child('Vol. 7: Tainted Love', 'Hellblazer #62–71 e especial.'),
          child('Vol. 8: Rake at the Gates of Hell', 'Hellblazer #72–83 e Heartland.'),
          child('Son of Man', 'Hellblazer #129–133; retorno posterior de Ennis.')
        ]),
        run('Paul Jenkins', 'A identidade britânica da série após Ennis.', [
          child('Vol. 9: Critical Mass', 'Hellblazer #84–96.'),
          child('Vol. 10: In the Line of Fire', 'Hellblazer #97–107.'),
          child('Vol. 11: Last Man Standing', 'Hellblazer #108–120.'),
          child('Vol. 12: How to Play with Fire', 'Hellblazer #121–133.')
        ])
      ]),
      section('vertigo-late', 'Hellblazer clássico — Ellis, Azzarello, Carey e Diggle', [
        run('Warren Ellis e Brian Azzarello', 'Da assombração de Londres à longa viagem americana.', [
          child('Vol. 13: Haunted', 'Hellblazer #134–145.'),
          child('Vol. 14: Good Intentions', 'Hellblazer #146–161 e especiais.'),
          child('Vol. 15: Highwater', 'Hellblazer #162–174.'),
          child('Vol. 16: The Wild Card', 'Hellblazer #175–188; transição para Mike Carey.')
        ]),
        run('Mike Carey, Denise Mina e Andy Diggle', 'O caminho final até a edição #300.', [
          child('Vol. 17: Out of Season', 'Hellblazer #189–201.'),
          child('Vol. 18: The Gift', 'Hellblazer #202–215.'),
          child('Vol. 19: The Red Right Hand', 'Hellblazer #216–229.'),
          child('Vol. 20: Systems of Control', 'Hellblazer #230–238 e All His Engines.'),
          child('Vol. 21: The Laughing Machine', 'Hellblazer #239–249 e Lady Constantine.'),
          child('Vol. 22: Regeneration', 'Hellblazer #250–260 e Chas: The Knowledge.'),
          child('Vol. 23: No Future', 'Hellblazer #261–266 e especiais.'),
          child('Vol. 24: Sectioned', 'Hellblazer #267–275 e City of Demons.'),
          child('Vol. 25: Another Season', 'Hellblazer #276–291.'),
          child('Vol. 26: The Curse of the Constantines', 'Hellblazer #292–300 e especiais finais.')
        ])
      ]),
      section('dc-universe', 'Constantine no Universo DC', [
        run('New 52 — Constantine e Justice League Dark', 'A versão integrada ao Universo DC principal.', [
          child('Justice League Dark Vols. 1–3', 'Primeira formação e entrada de Constantine.'),
          child('Constantine Vol. 1: The Spark and the Flame', 'Constantine #1–6.'),
          child('Constantine Vol. 2: The Voice in the Fire', 'Constantine #7–12.'),
          child('Forever Evil: Blight', 'Crossover entre Constantine, JLD, Trinity of Sin e Phantom Stranger.'),
          child('Constantine Vol. 3: The Voice in the Fire', 'Continuação da série após Blight.'),
          child('Constantine Vol. 4: The Apocalypse Road', 'Conclusão da série New 52.'),
          child('Constantine: The Hellblazer Vol. 1: Going Down', 'Constantine: The Hellblazer #1–6.'),
          child('Vol. 2: The Art of the Deal', 'Constantine: The Hellblazer #7–13.')
        ]),
        run('Rebirth e Justice League Dark', 'Constantine volta a atuar ao lado de Zatanna, Diana e o Monstro do Pântano.', [
          child('The Hellblazer Vol. 1: The Poison Truth', 'Rebirth #1 e The Hellblazer #1–6.'),
          child('The Hellblazer Vol. 2: The Smokeless Fire', 'The Hellblazer #7–12.'),
          child('The Hellblazer Vol. 3: The Inspiration Game', 'The Hellblazer #13–18.'),
          child('The Hellblazer Vol. 4: The Good Old Days', 'The Hellblazer #19–24.'),
          child('Justice League Dark por James Tynion IV', 'Série de 2018 e o crossover Witching Hour.'),
          child('Justice League Dark: The Great Wickedness', 'Backups de Justice League #59–71.')
        ])
      ]),
      section('black-label', 'Sandman Universe e Black Label', [
        run('Si Spurrier e Aaron Campbell', 'Continuação moderna do espírito da série Vertigo.', [
          child('Vol. 1: Marks of Woe', 'Sandman Universe Presents: Hellblazer #1 e John Constantine: Hellblazer #1–6.'),
          child('Vol. 2: The Best Version of You', 'John Constantine: Hellblazer #7–12.'),
          child('Hellblazer: Dead in America', 'Minissérie #1–12; continuação direta.')
        ]),
        run('Histórias independentes', 'Leituras fora da continuidade principal.', [
          child('Hellblazer: Rise and Fall', 'Minissérie Black Label completa.'),
          child('Dark Entries', 'Graphic novel em preto e branco.'),
          child('John Constantine: Distorted Illusions', 'História para leitores jovens, continuidade separada.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'hellboy-universe-reading-order', 'Dark Horse', 'Hellboy e B.P.R.D.', 'Hellboy, B.P.R.D. e Abe Sapien — Ordem de Leitura',
    'https://www.comicbooktreasury.com/hellboy-universe-reading-order/', [
      section('hellboy-begins', 'Entrada no universo Hellboy', [
        run('Hellboy — primeiros casos', 'A melhor porta de entrada para Hellboy e o B.P.R.D.', [
          child('Seed of Destruction', 'Minissérie #1–4.'),
          child('Wake the Devil', 'Minissérie #1–5.'),
          child('The Chained Coffin and Others', 'Contos essenciais do passado de Hellboy.'),
          child('The Right Hand of Doom', 'Histórias que explicam a origem da mão de pedra.'),
          child('Conqueror Worm', 'Minissérie #1–4; ponto decisivo para Hellboy e Roger.')
        ]),
        run('Hellboy — a trilogia do fim do mundo', 'A linha principal após a saída do B.P.R.D.', [
          child('Strange Places', 'The Third Wish e The Island.'),
          child('Darkness Calls', 'Primeiro ato da trilogia final.'),
          child('The Wild Hunt', 'Segundo ato e revelações sobre a origem de Hellboy.'),
          child('The Storm and the Fury', 'Conclusão da saga na Terra.'),
          child('Hellboy in Hell Vol. 1: The Descent', 'Hellboy in Hell #1–5.'),
          child('Hellboy in Hell Vol. 2: The Death Card', 'Hellboy in Hell #6–10.')
        ])
      ]),
      section('bprd-frogs', 'B.P.R.D. — Plague of Frogs', [
        run('B.P.R.D.: Plague of Frogs', 'A equipe continua sem Hellboy e enfrenta a praga dos sapos.', [
          child('Omnibus Vol. 1', 'Hollow Earth, The Soul of Venice e Plague of Frogs.'),
          child('Omnibus Vol. 2', 'The Dead, The Black Flame e histórias relacionadas.'),
          child('Omnibus Vol. 3', 'The Universal Machine, Garden of Souls e Killing Ground.'),
          child('Omnibus Vol. 4', 'The Warning, The Black Goddess e King of Fear.')
        ]),
        run('Abe Sapien — primeiros arquivos', 'Histórias que desenvolvem Abe antes de sua série longa.', [
          child('The Drowning', 'Abe Sapien: The Drowning #1–5.'),
          child('The Devil Does Not Jest and Other Stories', 'Minisséries e contos de Abe.'),
          child('B.P.R.D.: Being Human', 'Casos centrados nos membros da equipe.')
        ])
      ]),
      section('hell-on-earth', 'B.P.R.D.: Hell on Earth e Abe Sapien', [
        run('B.P.R.D.: Hell on Earth', 'A guerra apocalíptica acompanhada pelos omnibus.', [
          child('Omnibus Vol. 1', 'New World, Gods and Monsters e Russia.'),
          child('Omnibus Vol. 2', 'The Devil’s Engine, The Long Death e Pickens County Horror.'),
          child('Omnibus Vol. 3', 'Return of the Master, A Cold Day in Hell e Lake of Fire.'),
          child('Omnibus Vol. 4', 'The Reign of the Black Flame e The Devil’s Wings.'),
          child('Omnibus Vol. 5', 'Flesh and Stone, End of Days e Cometh the Hour.')
        ]),
        run('Abe Sapien — Dark and Terrible', 'A jornada paralela de Abe durante o fim do mundo.', [
          child('Dark and Terrible Vol. 1', 'Abe Sapien #1–12 e histórias relacionadas.'),
          child('Dark and Terrible Vol. 2', 'Abe Sapien #13–24.'),
          child('Dark and Terrible Vol. 3', 'Abe Sapien #25–36.'),
          child('The Secret Fire', 'The Shadow Over Suwanee e histórias do Jardim.'),
          child('The Desolate Shore', 'Conclusão da jornada solo de Abe.')
        ])
      ]),
      section('ending', 'O fim da história principal', [
        run('B.P.R.D.: The Devil You Know', 'Conclusão definitiva dos arcos de Hellboy, Abe, Liz e do B.P.R.D.', [
          child('Vol. 1: Messiah', 'The Devil You Know #1–5.'),
          child('Vol. 2: Pandemonium', 'The Devil You Know #6–10.'),
          child('Vol. 3: Ragna Rok', 'The Devil You Know #11–15; final da saga principal.')
        ]),
        run('Expansões opcionais do Mignolaverso', 'Podem ser intercaladas depois de conhecer os personagens centrais.', [
          child('Lobster Johnson', 'Aventuras pulp do herói dos anos 1930.'),
          child('Witchfinder: Sir Edward Grey', 'Investigações ocultas na era vitoriana.'),
          child('B.P.R.D.: 1946–1948', 'Os primeiros anos do Bureau.'),
          child('Hellboy and the B.P.R.D.', 'Casos antigos de Hellboy com a equipe.'),
          child('Frankenstein Underground / Frankenstein New World', 'Histórias conectadas ao desfecho do universo.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'harley-quinn-reading-order', 'DC', 'Harley Quinn e Gotham', 'Harley Quinn — Ordem de Leitura',
    'https://www.comicbooktreasury.com/harley-quinn-reading-order/', [
      section('postcrisis', 'Harley entra na continuidade principal', [
        run('Origens e primeira série solo', 'Da animação ao cânone pós-Crise.', [
          child('The Batman Adventures: Mad Love', 'Origem clássica de Harleen na continuidade animada.'),
          child('Batman: Harley Quinn', 'One-shot de 1999 que introduz Harley no cânone principal.'),
          child('DC Finest: Birth of the Mirth', 'Reúne estreia, No Man’s Land e Harley Quinn #1–8.'),
          child('Vol. 1: Preludes and Knock Knock Jokes', 'Harley Quinn (2000) #1–7.'),
          child('Vol. 2: Night and Day', 'Harley Quinn #8–13 e Our Worlds at War.'),
          child('Vol. 3: Welcome to Metropolis', 'Harley Quinn #14–25.'),
          child('Vol. 4: Vengeance Unlimited', 'Harley Quinn #26–38.')
        ]),
        run('Gotham City Sirens', 'Harley, Hera Venenosa e Mulher-Gato dividem a mesma série.', [
          child('Vol. 1: Union', 'Gotham City Sirens #1–7.'),
          child('Vol. 2: Songs of the Sirens', 'Gotham City Sirens #8–13.'),
          child('Vol. 3: Strange Fruit', 'Gotham City Sirens #14–19.'),
          child('Vol. 4: Division', 'Gotham City Sirens #20–26.')
        ])
      ]),
      section('new52', 'New 52 — Esquadrão Suicida e Coney Island', [
        run('Suicide Squad — New 52', 'A nova origem visual de Harley e sua passagem pela equipe de Amanda Waller.', [
          child('Vol. 1: Kicked in the Teeth', 'Suicide Squad #1–7.'),
          child('Vol. 2: Basilisk Rising', 'Suicide Squad #0 e #8–13.'),
          child('Vol. 3: Death Is for Suckers', 'Suicide Squad #14–19.'),
          child('Vol. 4: Discipline and Punish', 'Suicide Squad #20–23 e especiais.'),
          child('Vol. 5: Walled In', 'Suicide Squad #24–30 e Amanda Waller #1.')
        ]),
        run('Harley Quinn — Amanda Conner e Jimmy Palmiotti', 'A fase de Coney Island e suas séries paralelas.', [
          child('Vol. 1: Hot in the City', 'Harley Quinn #0–8.'),
          child('Vol. 2: Power Outage', 'Harley Quinn #9–13 e especiais.'),
          child('Vol. 3: Kiss Kiss Bang Stab', 'Continuação da série mensal.'),
          child('Vol. 4: A Call to Arms', 'Continuação da série mensal.'),
          child('Vol. 5: The Joker’s Last Laugh', 'Continuação da série mensal.'),
          child('Vol. 6: Black, White and Red All Over', 'Conclusão da fase New 52.'),
          child('Harley Quinn and Power Girl', 'Minissérie #1–6.'),
          child('Gang of Harleys', 'Minissérie #1–6.'),
          child('Harley’s Little Black Book', 'Minissérie de encontros #1–6.')
        ])
      ]),
      section('rebirth', 'DC Rebirth', [
        run('Harley Quinn — continuação de Coney Island', 'Conner e Palmiotti continuam diretamente a fase anterior.', [
          child('Vol. 1: Die Laughing', 'Harley Quinn #1–7.'),
          child('Vol. 2: Joker Loves Harley', 'Harley Quinn #8–13.'),
          child('Vol. 3: Red Meat', 'Harley Quinn #14–21.'),
          child('Vol. 4: Surprise, Surprise', 'Harley Quinn #22–27 e especial de 25 anos.'),
          child('Vol. 5: Vote Harley', 'Harley Quinn #28–34.')
        ]),
        run('Sam Humphries e Year of the Villain', 'A viagem além de Coney Island e o julgamento cósmico de Harley.', [
          child('Vol. 1: Harley vs. Apokolips', 'Harley Quinn #43–49.'),
          child('Vol. 2: Harley Destroys the Universe', 'Harley Quinn #50–54.'),
          child('Vol. 3: The Trials of Harley Quinn', 'Harley Quinn #55–63.'),
          child('Vol. 4: The Final Trial', 'Harley Quinn #64–69 e Villain of the Year.'),
          child('Vol. 5: Hollywood or Die', 'Harley Quinn #70–75 e conclusão da série.')
        ])
      ]),
      section('frontier', 'Infinite Frontier, Dawn of DC e All In', [
        run('Stephanie Phillips', 'Harley retorna a Gotham e tenta reparar parte do dano causado.', [
          child('Vol. 1: No Good Deed', 'Batman: Urban Legends #1 e Harley Quinn #1–6.'),
          child('Vol. 2: Keepsake', 'Harley Quinn #7–12.'),
          child('Vol. 3: Verdict', 'Harley Quinn #13–17 e especial de 30 anos.'),
          child('Vol. 4: Task Force XX', 'Harley Quinn #18–21, Annual e Shadow War Zone.'),
          child('Vol. 5: Who Killed Harley Quinn?', 'Harley Quinn #22–27.')
        ]),
        run('Tini Howard e DC All In', 'A fase multiversal e o retorno à Gotham de Elliott Kalan.', [
          child('Vol. 1: Girl in a Crisis', 'Harley Quinn #28–31 e Knight Terrors #1–2.'),
          child('Vol. 2: Eye Don’t Like Me?', 'Harley Quinn #32–37.'),
          child('Vol. 3: Clown About Town', 'Harley Quinn #38–43.'),
          child('Gotham City Sirens: Trigger Happy', 'Minissérie (2024) #1–4.'),
          child('Vol. 1: Destructive Comics', 'Harley Quinn #44–49.'),
          child('Vol. 2: Friends with Detriments', 'Harley Quinn #50–55.'),
          child('Gotham City Sirens: Unfit for Orbit', 'Minissérie #1–5.')
        ]),
        run('Black Label e histórias independentes', 'Leituras opcionais fora da cronologia principal.', [
          child('Harleen', 'Minissérie #1–3 de Stjepan Šejić.'),
          child('Joker/Harley: Criminal Sanity', 'Minissérie #1–8 e Secret Files.'),
          child('Harley Quinn & the Birds of Prey', 'Minissérie Black Label #1–4.'),
          child('White Knight Presents: Harley Quinn', 'Minissérie #1–6 no Murphyverse.'),
          child('Harley Quinn: Black + White + Red', 'Antologia de histórias curtas.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'ghost-rider-reading-order', 'Marvel', 'Motoqueiro Fantasma', 'Motoqueiro Fantasma — Ordem de Leitura',
    'https://www.comicbooktreasury.com/ghost-rider-reading-order/', [
      section('johnny-classic', 'Johnny Blaze — a maldição original', [
        run('Johnny Blaze clássico', 'Da estreia em Marvel Spotlight ao final da primeira série.', [
          child('Marvel Spotlight #5–11', 'Origem de Johnny Blaze e Zarathos.'),
          child('Ghost Rider Epic Collection: Hell on Wheels', 'Marvel Spotlight e Ghost Rider #1–11.'),
          child('Epic Collection: Salvation Run', 'Continuação da série clássica.'),
          child('Epic Collection: Bad Moon Rising', 'Aventuras intermediárias de Johnny.'),
          child('Ghost Rider (1973) #61–81', 'Conclusão da primeira série.')
        ])
      ]),
      section('danny', 'Danny Ketch e os Midnight Sons', [
        run('Ghost Rider — Danny Ketch', 'A série de 1990 e a expansão para vários títulos sobrenaturais.', [
          child('Epic Collection: Vengeance Reborn', 'Ghost Rider (1990) #1–12 e especiais.'),
          child('Epic Collection: The Road to Vengeance', 'Continuação da série e crossovers iniciais.'),
          child('Rise of the Midnight Sons', 'Ghost Rider, Spirits of Vengeance, Morbius e Darkhold.'),
          child('Midnight Massacre', 'Crossover entre os títulos dos Midnight Sons.'),
          child('Siege of Darkness', 'Grande conclusão da primeira fase sobrenatural.'),
          child('Ghost Rider (1990) #46–93', 'Fases posteriores de Danny Ketch.'),
          child('Danny Ketch: Ghost Rider — Blood & Vengeance', 'Minissérie retroativa ambientada nessa era.')
        ]),
        run('Variações dos anos 1990', 'Outras encarnações ligadas ao Espírito da Vingança.', [
          child('Ghost Rider 2099', 'Série #1–25 de Kenshiro Cochrane.'),
          child('Spirits of Vengeance', 'Johnny Blaze e Danny Ketch atuando juntos.'),
          child('Blaze: Legacy of Blood', 'Minissérie solo de Johnny.'),
          child('Ghost Rider: Crossroads', 'Especial que fecha histórias não concluídas.')
        ])
      ]),
      section('return', 'O retorno de Johnny Blaze', [
        run('Marvel Knights, Daniel Way e Jason Aaron', 'A volta de Johnny e a guerra pelo Céu.', [
          child('Ghost Rider: Road to Damnation', 'Minissérie #1–6 de Garth Ennis.'),
          child('Ghost Rider: Trail of Tears', 'Minissérie #1–6 ambientada no passado.'),
          child('Daniel Way Ultimate Collection', 'Ghost Rider (2006) #1–19.'),
          child('War for Heaven Book One', 'Ghost Rider #20–32 e Annuals.'),
          child('Danny Ketch: Addict', 'Danny Ketch #1–5.'),
          child('War for Heaven Book Two', 'Ghost Rider #33–35 e Heaven’s on Fire #1–6.'),
          child('Spirits of Vengeance: War at the Gates of Hell', 'Minissérie #1–5.'),
          child('Doctor Strange: Damnation', 'Evento com Johnny Blaze no centro do conflito.')
        ])
      ]),
      section('robbie', 'Robbie Reyes e os Vingadores', [
        run('All-New Ghost Rider — Robbie Reyes', 'A origem do Motoqueiro Fantasma de East Los Angeles.', [
          child('Vol. 1: Engines of Vengeance', 'All-New Ghost Rider #1–5.'),
          child('Vol. 2: Legend', 'All-New Ghost Rider #6–12.'),
          child('Ghost Rider: Four on the Floor', 'Ghost Rider (2016) #1–5.'),
          child('The Unbelievable Gwenpool #14–15', 'Encontro com Gwenpool.'),
          child('Avengers: The Final Host', 'Avengers (2018) #1–6; Robbie entra para a equipe.'),
          child('Avengers: Challenge of the Ghost Riders', 'Avengers #22–25; destaque para Robbie e Johnny.'),
          child('Avengers Forever / Avengers Assemble', 'Conclusão do arco multiversal de Robbie.')
        ])
      ]),
      section('percy', 'Benjamin Percy e fases atuais', [
        run('Ghost Rider — Benjamin Percy', 'Johnny, Danny e Wolverine nas estradas sombrias da Marvel.', [
          child('Vol. 1: Unchained', 'Ghost Rider (2022) #1–5 e especial de 50 anos.'),
          child('Vol. 2: Shadow Country', 'Ghost Rider #6–10 e Vengeance Forever.'),
          child('Vol. 3: Dragged Out of Hell', 'Ghost Rider #11–16.'),
          child('Weapons of Vengeance', 'Alpha, Ghost Rider #17, Wolverine #36 e Omega.'),
          child('Vol. 4: Rite of Passage', 'Ghost Rider #18–21 e Annual.'),
          child('Vol. 5: Final Vengeance', 'Ghost Rider: Final Vengeance #1–6.'),
          child('Midnight Sons: Blood Hunt', 'Minissérie #1–3 e Werewolf by Night.'),
          child('Spirits of Vengeance', 'Minissérie de 2024 #1–5.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'venom-reading-order', 'Marvel', 'Homem-Aranha', 'Venom e os Simbiontes — Ordem de Leitura',
    'https://www.comicbooktreasury.com/venom-reading-order/', [
      section('origin', 'O traje alienígena e Eddie Brock', [
        run('Do traje negro ao Venom', 'A origem do simbionte atravessa várias revistas do Homem-Aranha.', [
          child('Secret Wars #8', 'Peter encontra o traje alienígena.'),
          child('Alien Costume Saga Book One', 'Amazing Spider-Man #252–258, Marvel Team-Up e Spectacular Spider-Man.'),
          child('Alien Costume Saga Book Two', 'Amazing Spider-Man #259–263, Web of Spider-Man #1 e títulos paralelos.'),
          child('Amazing Spider-Man #300', 'Primeira aparição completa de Eddie Brock como Venom.'),
          child('Venom: Birth of the Symbiote', 'Coleção compacta da origem.'),
          child('Venom: Dark Origin', 'Releitura da origem de Eddie em cinco edições.')
        ]),
        run('Venom — o Protetor Letal dos anos 1990', 'Minisséries sucessivas transformam Venom em anti-herói.', [
          child('Lethal Protector', 'Venom: Lethal Protector #1–6.'),
          child('The Enemy Within', 'Minissérie e especiais.'),
          child('Separation Anxiety', 'Minissérie #1–4 e preparação.'),
          child('Carnage Unleashed', 'Minissérie #1–4.'),
          child('Along Came a Spider', 'Venom #1–4 e conexões com Ben Reilly.'),
          child('The Hunted / The Hunger', 'Minisséries posteriores de Eddie.'),
          child('Venomnibus Vols. 1–3', 'Alternativa completa para as minisséries e séries da época.')
        ])
      ]),
      section('hosts', 'Mac Gargan e Flash Thompson', [
        run('Mac Gargan é Venom', 'O simbionte passa pelo Scorpion e integra equipes de vilões.', [
          child('Marvel Knights Spider-Man #7–12', 'Mac Gargan se torna Venom.'),
          child('Thunderbolts — Warren Ellis', 'Thunderbolts #110–121.'),
          child('Secret Invasion: Thunderbolts', 'Thunderbolts #122–125.'),
          child('Dark Avengers Vol. 1: Assemble', 'Dark Avengers #1–6.'),
          child('Dark Avengers / Uncanny X-Men: Utopia', 'Crossover com os X-Men.'),
          child('Dark Avengers Vol. 2: Molecule Man', 'Continuação da equipe de Norman Osborn.')
        ]),
        run('Agent Venom — Flash Thompson', 'Venom vira agente do governo, Vingador Secreto e guardião espacial.', [
          child('Rick Remender Vol. 1', 'Venom (2011) #1–5.'),
          child('Spider-Island', 'Amazing Spider-Man #666–673 e Venom #6–9.'),
          child('Circle of Four', 'Venom #10–14 e edições .1–.4.'),
          child('The Savage Six', 'Venom #15–22.'),
          child('Secret Avengers Vols. 1–3', 'Missões paralelas de Flash com a equipe.'),
          child('Minimum Carnage', 'Venom, Scarlet Spider e especiais Alpha/Omega.'),
          child('Cullen Bunn Complete Collection', 'Venom #23–42 e Scarlet Spider #10–11.'),
          child('Venom: Space Knight Vols. 1–2', 'Venom: Space Knight #1–13.')
        ])
      ]),
      section('eddie-returns', 'O retorno de Eddie Brock', [
        run('Mike Costa e Venom Inc.', 'Eddie recupera o simbionte e volta ao universo do Homem-Aranha.', [
          child('Vol. 1: Homecoming', 'Venom (2016) #1–6.'),
          child('Vol. 2: The Land Before Crime', 'Venom #7–12.'),
          child('Vol. 3: Lethal Protector — Blood in the Water', 'Venom #150–153.'),
          child('Vol. 4: The Nativity', 'Venom #154–158 e #161, #164–165.'),
          child('Venom Inc.', 'Amazing Spider-Man #792–793, Venom #159–160 e especiais.'),
          child('Poison X', 'X-Men Blue #21–22 e Venom #162–163.'),
          child('Venomized', 'Minissérie #1–5.')
        ])
      ]),
      section('cates', 'Donny Cates, Absolute Carnage e King in Black', [
        run('Venom — Donny Cates e Ryan Stegman', 'A mitologia de Knull cresce até dois grandes eventos.', [
          child('Vol. 1: Rex', 'Venom (2018) #1–6.'),
          child('Venom: First Host', 'Minissérie #1–5 de Mike Costa.'),
          child('Web of Venom: Venom Unleashed', 'Ve’Nam, Carnage Born, Venom Unleashed e Funeral Pyre.'),
          child('Vol. 2: The Abyss', 'Venom #7–12.'),
          child('Vol. 3: Absolute Carnage', 'Venom #13–20 e tie-ins.'),
          child('Absolute Carnage', 'Evento principal #1–5.'),
          child('Vol. 4: Venom Island', 'Venom #21–25.'),
          child('Vol. 5: Venom Beyond', 'Venom #26–30.'),
          child('King in Black', 'Evento principal #1–5.'),
          child('Vol. 6: King in Black', 'Venom #31–35 e #200.')
        ])
      ]),
      section('ewing', 'Al Ewing, Meridius e Venom War', [
        run('Venom — Al Ewing e Ram V', 'Eddie e Dylan percorrem linhas temporais até a guerra dos simbiontes.', [
          child('Vol. 1: Recursion', 'Venom (2021) #1–5.'),
          child('Vol. 2: Deviation', 'Venom #6–10.'),
          child('Vol. 3: Dark Web', 'Venom #11–16.'),
          child('Dark Web', 'Evento com Amazing Spider-Man e X-Men.'),
          child('Vol. 4: Illumination', 'Venom #17–21.'),
          child('Vol. 5: Predestination', 'Venom #22–25.'),
          child('Vol. 6: Infiltration', 'Venom #26–30.'),
          child('Vol. 7: Exsanguination', 'Venom #31–34 e Carnage #5–6.'),
          child('Venom War', 'Evento principal #1–5.'),
          child('Vol. 8: Venom War', 'Venom #35–39.'),
          child('All-New Venom', 'Nova fase iniciada após Venom War.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'birds-of-prey-reading-order', 'DC', 'Aves de Rapina', 'Aves de Rapina / Birds of Prey — Ordem de Leitura',
    'https://www.comicbooktreasury.com/birds-of-prey-reading-order/', [
      section('first', 'Oracle e Canário Negro — os primeiros anos', [
        run('Birds of Prey — Chuck Dixon', 'A parceria começa em especiais antes da série mensal.', [
          child('Birds of Prey Vol. 1', 'Showcase ’96 #3, Black Canary/Oracle, Manhunt e especiais.'),
          child('Birds of Prey Vol. 2', 'Birds of Prey #1–11 e Ravens #1.'),
          child('Vol. 3: The Hunt for Oracle', 'Birds of Prey #12–21 e Nightwing #45–46.'),
          child('Birds of Prey #22–38', 'Trecho ainda não reunido integralmente.'),
          child('Bruce Wayne: Murderer?', 'Inclui Birds of Prey #39–41 e #43.'),
          child('Birds of Prey #42–55', 'Fim da fase de Chuck Dixon; disponibilidade avulsa.')
        ])
      ]),
      section('simone', 'A fase de Gail Simone', [
        run('Birds of Prey — Gail Simone e continuação', 'A formação definitiva com Oracle, Canário Negro e Caçadora.', [
          child('Murder and Mystery', 'Birds of Prey #56–67.'),
          child('Hero Hunters', 'Batgirl #57, Batman #633 e Birds of Prey #68–80.'),
          child('Fighters by Trade', 'Birds of Prey #81–91.'),
          child('Progeny', 'Birds of Prey #92–103.'),
          child('Whitewater', 'Birds of Prey #104–112.'),
          child('The End of the Beginning', 'Birds of Prey #113–127.'),
          child('End Run', 'Birds of Prey (2010) #1–6.'),
          child('The Death of Oracle', 'Birds of Prey (2010) #7–15.')
        ])
      ]),
      section('new52', 'Birds of Prey — New 52', [
        run('A equipe de Dinah, Starling, Katana e Batgirl', 'A série inteira de 2011 em cinco volumes.', [
          child('Vol. 1: Trouble in Mind', 'Birds of Prey #1–7.'),
          child('Vol. 2: Your Kiss Might Kill', 'Birds of Prey #8–13.'),
          child('Vol. 3: A Clash of Daggers', 'Birds of Prey #13–17 e Batgirl Annual #1.'),
          child('Vol. 4: The Cruelest Cut', 'Birds of Prey #18–24, #26 e Talon #9.'),
          child('Vol. 5: Soul Crisis', 'Birds of Prey #25, #27–34 e Futures End #1.')
        ])
      ]),
      section('rebirth', 'Batgirl and the Birds of Prey — Rebirth', [
        run('Barbara, Dinah e Helena', 'A formação clássica retorna em uma série de 22 edições.', [
          child('Vol. 1: Who Is Oracle?', 'Rebirth #1 e Batgirl and the Birds of Prey #1–6.'),
          child('Vol. 2: Source Code', 'Batgirl and the Birds of Prey #7–13.'),
          child('Vol. 3: Full Circle', 'Batgirl and the Birds of Prey #14–22.')
        ]),
        run('Histórias independentes', 'Variações fora ou à margem da série principal.', [
          child('Harley Quinn & the Birds of Prey', 'Minissérie Black Label #1–4.'),
          child('Birds of Prey Giant #1', 'Especial com histórias novas e clássicas.'),
          child('Batman: Urban Legends #14–16', 'Breve formação liderada por Lady Shiva e Katana.')
        ])
      ]),
      section('thompson', 'Birds of Prey — Kelly Thompson', [
        run('A nova equipe de Canário Negro', 'Dinah lidera Cassandra Cain, Big Barda, Zealot e outras heroínas.', [
          child('Vol. 1: Megadeath', 'Birds of Prey (2023) #1–6.'),
          child('Vol. 2: Worlds Without End', 'Birds of Prey #7–13.'),
          child('Vol. 3: Bird Undercover', 'Birds of Prey #14–19.'),
          child('Vol. 4: On the Run', 'Birds of Prey #20–26.'),
          child('Volumes seguintes', 'Continuação da série de Kelly Thompson.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'green-arrow-reading-order', 'DC', 'Arqueiro Verde e Canário Negro', 'Arqueiro Verde — Ordem de Leitura',
    'https://www.comicbooktreasury.com/green-arrow-reading-order/', [
      section('modern-start', 'Ponto de partida moderno — Mike Grell', [
        run('The Longbow Hunters Saga', 'A reinvenção urbana pós-Crise de Oliver Queen e Dinah Lance.', [
          child('The Longbow Hunters', 'Minissérie #1–3.'),
          child('Vol. 1: Hunter’s Moon', 'Green Arrow (1987) #1–6.'),
          child('Vol. 2: Here There Be Dragons', 'Green Arrow #7–12.'),
          child('Vol. 3: The Trial of Oliver Queen', 'Green Arrow #13–20.'),
          child('Vol. 4: Blood of the Dragon', 'Green Arrow #21–28.'),
          child('Vol. 5: Black Arrow', 'Green Arrow #29–38.'),
          child('Vol. 6: Last Action Hero', 'Green Arrow #39–50.'),
          child('Vol. 7: Homecoming', 'Green Arrow #51–62.'),
          child('Vol. 8: The Hunt for the Red Dragon', 'Green Arrow #63–72.'),
          child('Vol. 9: Old Tricks', 'Green Arrow #73–80 e The Wonder Year #1–4.')
        ]),
        run('Connor Hawke assume o arco', 'Transição após Mike Grell e a aparente morte de Oliver.', [
          child('Green Arrow #81–100', 'Fase de transição e encontro com Connor.'),
          child('Green Arrow #100–101', 'Últimas histórias de Oliver antes de Connor assumir.'),
          child('Green Arrow #102–137', 'Connor Hawke como Arqueiro Verde.'),
          child('Green Lantern: Emerald Allies', 'Crossovers entre Connor, Kyle Rayner e Oliver.')
        ])
      ]),
      section('return', 'O retorno de Oliver Queen', [
        run('Kevin Smith, Brad Meltzer e Judd Winick', 'A ressurreição de Oliver e a reconstrução da família Arrow.', [
          child('Quiver', 'Green Arrow (2001) #1–10.'),
          child('The Sounds of Violence', 'Green Arrow #11–15.'),
          child('The Archer’s Quest', 'Green Arrow #16–21.'),
          child('Black Circle: Urban Knights', 'Green Arrow #23–25 e Green Lantern #162–164.'),
          child('Straight Shooter', 'Green Arrow #26–31.'),
          child('City Walls', 'Green Arrow #32 e #34–39.'),
          child('Moving Targets', 'Green Arrow #40–50.'),
          child('Heading into the Light', 'Green Arrow #52 e #54–59.'),
          child('Crawling from the Wreckage', 'Green Arrow #60–65.'),
          child('Road to Jericho', 'Green Arrow #66–75.')
        ]),
        run('Green Arrow / Black Canary', 'O relacionamento de Oliver e Dinah vira uma série compartilhada.', [
          child('Road to the Altar', 'Birds of Prey #109 e Black Canary #1–4.'),
          child('The Wedding Album', 'Wedding Special e Green Arrow/Black Canary #1–5.'),
          child('Family Business', 'Green Arrow/Black Canary #6–10.'),
          child('A League of Their Own', 'Green Arrow/Black Canary #11–14.'),
          child('Enemies List', 'Green Arrow/Black Canary #15–20.'),
          child('Big Game', 'Green Arrow/Black Canary #21–26.'),
          child('Five Stages', 'Green Arrow/Black Canary #27–29 e Green Arrow #30.'),
          child('Justice League: Rise and Fall', 'Green Arrow #31–32 e The Rise of Arsenal.')
        ])
      ]),
      section('new52', 'Arqueiro Verde — New 52', [
        run('Green Arrow (2011)', 'Toda a série New 52 organizada por volumes.', [
          child('Vol. 1: The Midas Touch', 'Green Arrow #1–6.'),
          child('Vol. 2: Triple Threat', 'Green Arrow #7–13.'),
          child('Vol. 3: Harrow', 'Green Arrow #0, #14–16 e crossovers.'),
          child('Vol. 4: The Kill Machine', 'Green Arrow #17–24 e Count Vertigo.'),
          child('Vol. 5: The Outsiders War', 'Green Arrow #25–31.'),
          child('Vol. 6: Broken', 'Green Arrow #32–34, Futures End e Secret Origins.'),
          child('Vol. 7: Kingdom', 'Green Arrow #35–40.'),
          child('Vol. 8: The Nightbirds', 'Green Arrow #41–47 e especiais.'),
          child('Vol. 9: Outbreak', 'Green Arrow #48–52 e Annual.')
        ])
      ]),
      section('rebirth', 'DC Rebirth e além', [
        run('Green Arrow — Benjamin Percy', 'A fase que restaura a política, Star City e Dinah Lance.', [
          child('Vol. 1: The Death and Life of Oliver Queen', 'Rebirth #1 e Green Arrow #1–5.'),
          child('Vol. 2: Island of Scars', 'Green Arrow #6–11.'),
          child('Vol. 3: Emerald Outlaw', 'Green Arrow #12–17.'),
          child('Vol. 4: Rise of Star City', 'Green Arrow #18–25.'),
          child('Vol. 5: Hard-Traveling Hero', 'Green Arrow #26–31.'),
          child('Vol. 6: Trial of Two Cities', 'Green Arrow #33–38.'),
          child('Vol. 7: Citizen’s Arrest', 'Green Arrow #43–47 e Annual.'),
          child('Vol. 8: The End of the Road', 'Green Arrow #39–42 e #48–50.')
        ]),
        run('Infinite Frontier e Dawn of DC', 'O retorno da família Arrow depois de Dark Crisis.', [
          child('Aquaman/Green Arrow: Deep Target', 'Minissérie #1–7.'),
          child('Dark Crisis on Infinite Earths', 'Evento que prepara o desaparecimento e retorno da Liga.'),
          child('Green Arrow Vol. 1: Reunion', 'Green Arrow (2023) #1–6.'),
          child('Green Arrow Vol. 2: Family First', 'Green Arrow #7–12.'),
          child('Green Arrow Vol. 3', 'Continuação com a família Arrow reunida.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'black-canary-reading-order', 'DC', 'Arqueiro Verde e Canário Negro', 'Canário Negro — Ordem de Leitura',
    'https://www.comicbooktreasury.com/black-canary-reading-order/', [
      section('postcrisis', 'Canário Negro pós-Crise', [
        run('Dinah Lance no começo da era moderna', 'Justice League International, Mike Grell e suas primeiras séries solo.', [
          child('Justice League International Omnibus Vol. 1', 'Justice League #1–6 e JLI #7–25; Dinah participa do começo.'),
          child('Green Arrow: The Longbow Hunters', 'Minissérie #1–3; mudança decisiva para Oliver e Dinah.'),
          child('DC Finest: The Longbow Hunters', 'Longbow Hunters, Green Arrow #1–8 e material de Dinah.'),
          child('DC Finest: The Trial of Oliver Queen', 'Green Arrow #9–20 e Action Comics #609–616, #624–635.'),
          child('Black Canary (1991) #1–4', 'Primeira minissérie solo pós-Crise.'),
          child('Black Canary (1993) #1–12', 'Primeira série mensal de Dinah.')
        ])
      ]),
      section('birds', 'Oracle, Birds of Prey e JSA', [
        run('Birds of Prey — formação clássica', 'A parceria de Dinah com Oracle e a entrada de Caçadora.', [
          child('Birds of Prey Vol. 1', 'Especiais Black Canary/Oracle, Manhunt e Showcase ’96.'),
          child('Birds of Prey Vol. 2', 'Birds of Prey #1–11.'),
          child('Vol. 3: The Hunt for Oracle', 'Birds of Prey #12–21 e Nightwing #45–46.'),
          child('Birds of Prey #22–55', 'Trecho parcialmente não coletado.'),
          child('Murder and Mystery', 'Birds of Prey #56–67; início de Gail Simone.'),
          child('Hero Hunters', 'Birds of Prey #68–80.'),
          child('Fighters by Trade', 'Birds of Prey #81–91.'),
          child('Progeny', 'Birds of Prey #92–103; Dinah deixa a equipe em #99.')
        ]),
        run('Dinah na Sociedade da Justiça', 'Leitura paralela durante sua fase com as Aves de Rapina.', [
          child('JSA Vol. 1: Justice Be Done', 'JSA #1–5.'),
          child('JSA Vol. 2: Darkness Falls', 'Continuação da equipe.'),
          child('JSA Vol. 3: Return of Hawkman', 'Dinah segue até deixar a equipe em JSA #31.')
        ])
      ]),
      section('green-arrow', 'Green Arrow / Black Canary', [
        run('A série compartilhada de Oliver e Dinah', 'Do casamento à ruptura após Rise and Fall.', [
          child('Road to the Altar', 'Birds of Prey #109 e Black Canary #1–4.'),
          child('The Wedding Album', 'Wedding Special e Green Arrow/Black Canary #1–5.'),
          child('Family Business', 'Green Arrow/Black Canary #6–10.'),
          child('A League of Their Own', 'Green Arrow/Black Canary #11–14.'),
          child('Enemies List', 'Green Arrow/Black Canary #15–20.'),
          child('Big Game', 'Green Arrow/Black Canary #21–26.'),
          child('Five Stages', 'Green Arrow/Black Canary #27–29 e Green Arrow #30.'),
          child('JLA: Cry for Justice', 'Evento importante para o relacionamento.'),
          child('Justice League: Rise and Fall', 'Ruptura entre Oliver e Dinah.')
        ]),
        run('Retorno às Birds of Prey', 'Gail Simone reúne novamente Oracle, Dinah e Caçadora.', [
          child('Birds of Prey: End Run', 'Birds of Prey (2010) #1–6.'),
          child('Birds of Prey: The Death of Oracle', 'Birds of Prey #7–15.'),
          child('Black Canary and Zatanna: Bloodspell', 'Graphic novel independente.')
        ])
      ]),
      section('new52', 'New 52 e série solo', [
        run('Birds of Prey — New 52', 'Dinah lidera uma nova equipe antes de formar sua banda.', [
          child('Vol. 1: Trouble in Mind', 'Birds of Prey #1–7.'),
          child('Vol. 2: Your Kiss Might Kill', 'Birds of Prey #8–13.'),
          child('Vol. 3: A Clash of Daggers', 'Birds of Prey #13–17 e Batgirl Annual.'),
          child('Vol. 4: The Cruelest Cut', 'Birds of Prey #18–24 e #26.'),
          child('Vol. 5: Soul Crisis', 'Birds of Prey #25 e #27–34.')
        ]),
        run('Black Canary — Brenden Fletcher e Annie Wu', 'A série solo musical completa.', [
          child('Vol. 1: Kicking and Screaming', 'Black Canary #1–7.'),
          child('Vol. 2: New Killer Star', 'Black Canary #8–12, Gotham Academy #17 e preview de Rebirth.')
        ])
      ]),
      section('rebirth', 'Rebirth, Birds of Prey e fase atual', [
        run('Batgirl and the Birds of Prey', 'A formação clássica restaurada.', [
          child('Vol. 1: Who Is Oracle?', 'Rebirth #1 e #1–6.'),
          child('Vol. 2: Source Code', 'Batgirl and the Birds of Prey #7–13.'),
          child('Vol. 3: Full Circle', 'Batgirl and the Birds of Prey #14–22.')
        ]),
        run('Dinah e Oliver — Benjamin Percy', 'A relação restaurada na série Rebirth do Arqueiro Verde.', [
          child('Green Arrow Vol. 1: The Death and Life of Oliver Queen', 'Green Arrow #1–5 e Rebirth.'),
          child('Vol. 2: Island of Scars', 'Green Arrow #6–11.'),
          child('Vol. 3: Emerald Outlaw', 'Green Arrow #12–17.'),
          child('Hard-Traveling Hero / Trial of Two Cities', 'Continuação da participação de Dinah.')
        ]),
        run('Birds of Prey — Kelly Thompson e histórias solo', 'A nova liderança de Dinah e confrontos recentes.', [
          child('Birds of Prey Vol. 1: Megadeath', 'Birds of Prey (2023) #1–6.'),
          child('Vol. 2: Worlds Without End', 'Birds of Prey #7–13.'),
          child('Vol. 3: Bird Undercover', 'Birds of Prey #14–19.'),
          child('Vol. 4: On the Run', 'Birds of Prey #20–26.'),
          child('Black Canary: Best of the Best', 'Minissérie #1–6 de Tom King e Ryan Sook.')
        ])
      ])
    ]
  ));

  additions.push(order(
    'swamp-thing-reading-order', 'DC', 'Constantine e o lado místico', 'Monstro do Pântano — Ordem de Leitura',
    'https://www.comicbooktreasury.com/swamp-thing-reading-order/', [
      section('classic', 'Das origens a Alan Moore', [
        run('Len Wein, Bernie Wrightson e a Era de Bronze', 'A criação de Alec Holland antes da grande reinvenção.', [
          child('House of Secrets #92', 'História original que inspira o personagem.'),
          child('Bronze Age Vol. 1', 'House of Secrets #92 e Swamp Thing #1–13.'),
          child('Bronze Age Vol. 2', 'Swamp Thing #14–24 e participações.'),
          child('Bronze Age Vol. 3', 'Saga of the Swamp Thing #6–19 e Annual #1.')
        ]),
        run('Saga of the Swamp Thing — Alan Moore', 'A fase essencial que cria o Verde e apresenta John Constantine.', [
          child('Book One', 'Saga of the Swamp Thing #20–27.'),
          child('Book Two', 'Saga #28–34 e Annual #2.'),
          child('Book Three', 'Saga #35–42; Constantine estreia em #37.'),
          child('Book Four', 'Saga #43–50.'),
          child('Book Five', 'Swamp Thing #51–56.'),
          child('Book Six', 'Swamp Thing #57–64.')
        ])
      ]),
      section('vertigo', 'Depois de Alan Moore e a era Vertigo', [
        run('Rick Veitch, Nancy Collins e Mark Millar', 'A continuação da série clássica até a edição #171.', [
          child('Rick Veitch Book One: Wild Things', 'Swamp Thing #65–73 e Annual #3.'),
          child('Spontaneous Generation', 'Swamp Thing #71–76.'),
          child('Infernal Triangles', 'Swamp Thing #77–81 e Annual #3.'),
          child('Doug Wheeler #88–109', 'Fase disponível principalmente em digital.'),
          child('Nancy A. Collins Omnibus', 'Swamp Thing #110–139 e Annuals.'),
          child('Mark Millar and Phil Hester Omnibus', 'Swamp Thing #140–171.')
        ]),
        run('Séries Vertigo posteriores', 'Tefé Holland e o retorno de Alec ao centro da narrativa.', [
          child('Brian K. Vaughan Vol. 1', 'Swamp Thing (2000) #1–10.'),
          child('Brian K. Vaughan Vol. 2', 'Swamp Thing #11–20.'),
          child('Bad Seed', 'Swamp Thing (2004) #1–6.'),
          child('Love in Vain', 'Swamp Thing #9–14.'),
          child('Healing the Breach', 'Swamp Thing #15–20.'),
          child('Swamp Thing #21–29', 'Conclusão da fase de Joshua Dysart.')
        ])
      ]),
      section('new52', 'New 52 — Scott Snyder e Charles Soule', [
        run('Scott Snyder e Rotworld', 'Alec retorna e enfrenta a Podridão ao lado de Animal Man.', [
          child('Vol. 1: Raise Them Bones', 'Swamp Thing #1–7.'),
          child('Vol. 2: Family Tree', 'Swamp Thing #0, #8–11 e Annual.'),
          child('Vol. 3: Rotworld — The Green Kingdom', 'Swamp Thing #12–18 e Animal Man #12, #17.'),
          child('Animal Man: Rotworld — The Red Kingdom', 'Leitura paralela recomendada para o crossover.')
        ]),
        run('Charles Soule', 'O Seeder, o Parlamento e a conclusão da série New 52.', [
          child('Vol. 4: Seeder', 'Swamp Thing #19–23 e #23.1.'),
          child('Vol. 5: The Killing Field', 'Swamp Thing #24–27 e Annual.'),
          child('Vol. 6: The Sureen', 'Swamp Thing #28–34 e Aquaman #31.'),
          child('Vol. 7: Season’s End', 'Swamp Thing #35–40, Annual e Futures End.')
        ])
      ]),
      section('recent', 'Rebirth, Infinite Frontier e Black Label', [
        run('Retornos e séries curtas', 'Histórias que reintroduzem Alec antes da nova encarnação do Verde.', [
          child('Swamp Thing: The Dead Don’t Sleep', 'Minissérie #1–6 de Len Wein e Kelley Jones.'),
          child('Swamp Thing: Winter Special', 'Especial de Tom King e Jason Fabok.'),
          child('Swamp Thing: New Roots', 'Histórias digitais e Giants.'),
          child('Justice League Dark', 'Participações durante Rebirth e Witching Hour.')
        ]),
        run('The Swamp Thing — Ram V', 'Levi Kamei se torna um novo avatar do Verde.', [
          child('Vol. 1: Becoming', 'Future State: Swamp Thing #1–2 e The Swamp Thing #1–4.'),
          child('Vol. 2: Conduit', 'The Swamp Thing #5–10.'),
          child('Vol. 3: The Parliament of Gears', 'The Swamp Thing #11–16.')
        ]),
        run('Black Label', 'Histórias independentes para leitores que já conhecem o conceito.', [
          child('Swamp Thing: Green Hell', 'Minissérie #1–3 de Jeff Lemire e Doug Mahnke.'),
          child('Swamp Thing: Twin Branches', 'Graphic novel fora da continuidade principal.')
        ])
      ])
    ]
  ));

  const existingIds = new Set(orders.map(item => item.id));
  orders.push(...additions.filter(item => !existingIds.has(item.id)));
})();
