(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const child = (title, details) => ({title, details, companions:[]});
  const order = id => orders.find(o => o.id === id);
  const findItem = (o, title) => o?.sections.flatMap(s => s.items).find(i => i.title === title);
  const expand = (id, title, parts) => {
    const item = findItem(order(id), title);
    if(item) item.companions = parts.map(([name, details]) => child(name, details));
  };

  // Mulher-Maravilha: começa no reboot Pós-Crise e segue volume por volume.
  const wonderWoman = order('wonder-woman-reading-order');
  if(wonderWoman) wonderWoman.sections = [
    {key:'ww-perez',title:'Pós-Crise: o reboot de George Pérez (1987–1991)',items:[
      {title:'Wonder Woman por George Pérez',details:'A fundação da continuidade moderna de Diana.',companions:[
        child('Vol. 1 — Wonder Woman #1–14','Nova origem, Ares e o início da missão de Diana no Mundo dos Homens.'),
        child('Vol. 2 — Wonder Woman #15–24 e Annual #1','Continuação direta da fase Pérez.'),
        child('Vol. 3 — Wonder Woman #25–35','Inclui a fase publicada ao redor de Invasion!.'),
        child('Vol. 4 — Wonder Woman #36–45 e Annual #2','Expansão da mitologia das Amazonas.'),
        child('Vol. 5 — Wonder Woman #46–57','Wonder Woman e material de Who’s Who.'),
        child('Vol. 6 — Wonder Woman #58–62','Conclusão da fase, seguida por War of the Gods.'),
        child('War of the Gods #1–4','Evento que encerra o grande ciclo de George Pérez.')
      ]}
    ]},
    {key:'ww-nineties',title:'A década de 1990: Artemis, Cassie e a nova mitologia',items:[
      {title:'Wonder Woman por William Messner-Loebs e Mike Deodato',details:'A fase que introduz Artemis como Mulher-Maravilha.',companions:[
        child('The Last True Hero — Wonder Woman #63–64, #66–75, Annual #3 e Special #1','Primeira parte da fase Messner-Loebs.'),
        child('Ares Rising — Wonder Woman #77–89','Inclui DC Retroactive: Wonder Woman ’90s #1.'),
        child('Wonder Woman por Mike Deodato — #0, #85 e #90–100','O Torneio, Artemis e o retorno de Diana ao título.')
      ]},
      {title:'Wonder Woman por John Byrne',details:'Cassie Sandsmark, Donna Troy e Hippolyta ganham novos papéis.',companions:[
        child('Vol. 1 — Wonder Woman #101–114','Começo da fase Byrne e introdução de Cassie Sandsmark.'),
        child('Vol. 2 — Wonder Woman #115–124 e Annuals #5–6','Continuação da fase, próxima de The Final Night.'),
        child('Vol. 3 — Wonder Woman #125–136','Conclusão da fase Byrne.')
      ]},
      {title:'Transição após John Byrne',details:'Histórias não reunidas integralmente em encadernados.',companions:[
        child('Wonder Woman #137–159 e Annuals #7–8','Fases de Christopher Priest e Eric Luke; grande parte permanece sem coleção.'),
        child('Wonder Woman #160–163','Edições de Brian K. Vaughan e Ben Raab antes de Phil Jimenez.')
      ]}
    ]},
    {key:'ww-jimenez-rucka',title:'Phil Jimenez, Greg Rucka e Infinite Crisis',items:[
      {title:'Wonder Woman por Phil Jimenez',details:'Uma fase conectada a Paradise Island, Our Worlds at War e à família da Mulher-Maravilha.',companions:[
        child('Paradise Lost — Wonder Woman #164–170','Inclui Wonder Woman Secret Files and Origins #2.'),
        child('Paradise Found — Wonder Woman #171–177','Inclui Wonder Woman Secret Files and Origins #3.'),
        child('Wonder Woman #178–188','Conclusão da fase Jimenez e material de Our Worlds at War.')
      ]},
      {title:'Wonder Woman por Walt Simonson e Jerry Ordway',details:'Breve ponte entre Jimenez e Rucka.',companions:[
        child('Wonder Woman #189–194','A história completa da equipe Simonson/Ordway.')
      ]},
      {title:'Wonder Woman por Greg Rucka — primeira fase',details:'Da Hiketeia até a crise que divide a Trindade.',companions:[
        child('Wonder Woman: The Hiketeia','Graphic novel que antecede a fase mensal.'),
        child('Down to Earth — Wonder Woman #195–200','Início do trabalho de Rucka na série.'),
        child('Bitter Rivals — Wonder Woman #201–205','A fase publicada ao redor de Identity Crisis.'),
        child('Eyes of the Gorgon — Wonder Woman #206–213','Medusa e as consequências para Diana.'),
        child('Land of the Dead — Wonder Woman #214–217','A descida ao submundo.'),
        child('Mission’s End — Wonder Woman #218–226','Conclusão da primeira fase Rucka.'),
        child('Infinite Crisis #1–7','Evento que encerra a continuidade antes de One Year Later.')
      ]}
    ]},
    {key:'ww-one-year',title:'One Year Later, Gail Simone e o fim do Pós-Crise',items:[
      {title:'Trinity e o ano perdido',details:'A Trindade e as consequências de Infinite Crisis.',companions:[
        child('Trinity Vol. 1 — #1–17','Primeiro terço da série semanal.'),
        child('Trinity Vol. 2 — #18–35','Segundo terço da série semanal.'),
        child('Trinity Vol. 3 — #36–52','Conclusão da série semanal.'),
        child('52 Aftermath: The Four Horsemen #1–6','História complementar da Trindade.')
      ]},
      {title:'A volta de Diana após One Year Later',details:'Donna Troy ocupa temporariamente o manto antes do retorno de Diana.',companions:[
        child('Who Is Wonder Woman? — Wonder Woman vol. 3 #1–4 e Annual #1','Reintrodução de Diana.'),
        child('Love and Murder — Wonder Woman #6–10','Continuação da série.'),
        child('Amazons Attack!','Wonder Woman #11–13 e Amazons Attack! #1–6.')
      ]},
      {title:'Wonder Woman por Gail Simone',details:'A última grande fase da série antes de Odyssey.',companions:[
        child('The Circle — Wonder Woman #14–19','Início da fase Gail Simone.'),
        child('Ends of the Earth — Wonder Woman #20–25','Segundo arco.'),
        child('Rise of the Olympian — Wonder Woman #26–33','Olimpianos e consequências.'),
        child('Warkiller — Wonder Woman #34–39','Quarto arco.'),
        child('Contagion — Wonder Woman #40–44','Conclusão da fase mensal.'),
        child('Wonder Woman #600','Edição de transição para Odyssey.')
      ]},
      {title:'Wonder Woman: Odyssey',details:'O soft reboot final antes de Flashpoint.',companions:[
        child('Odyssey Vol. 1 — Wonder Woman #600–606','Primeira parte da realidade alterada.'),
        child('Odyssey Vol. 2 — Wonder Woman #607–614','Conclusão da fase.'),
        child('Flashpoint #1–5','Evento que encerra o Pós-Crise.'),
        child('World of Flashpoint Featuring Wonder Woman','Emperor Aquaman #1–3, Lois Lane and the Resistance #1–3 e Wonder Woman and the Furies #1–3.')
      ]}
    ]},
    {key:'ww-new52',title:'New 52 (2011–2016)',items:[
      {title:'Wonder Woman por Brian Azzarello e Cliff Chiang',details:'A nova origem de Diana como filha de Zeus.',companions:[
        child('Vol. 1: Blood — Wonder Woman #1–6','Primeiro arco do New 52.'),
        child('Vol. 2: Guts — Wonder Woman #7–12','Segundo arco.'),
        child('Vol. 3: Iron — Wonder Woman #0 e #13–18','Terceiro arco.'),
        child('Vol. 4: War — Wonder Woman #19–23.1','Quarto arco.'),
        child('Vol. 5: Flesh — Wonder Woman #23.2 e #24–29','Quinto arco.'),
        child('Vol. 6: Bones — Wonder Woman #30–35 e Secret Origins #6','Conclusão da fase Azzarello/Chiang.')
      ]},
      {title:'Superman/Wonder Woman',details:'A série paralela do relacionamento entre Diana e Clark.',companions:[
        child('Power Couple — Superman/Wonder Woman #1–6','Início da série paralela.'),
        child('War and Peace — #8–12, Annual #1 e Futures End','Segundo volume.'),
        child('Casualties of War — #13–18','Terceiro volume.'),
        child('Dark Truth — #18–24','Quarto volume.'),
        child('A Savage End — #25–31','Conclusão ligada a The Final Days of Superman.')
      ]},
      {title:'Wonder Woman por Meredith e David Finch',details:'A fase final do New 52.',companions:[
        child('Vol. 7: War-Torn — Wonder Woman #36–40 e Annual #1','Primeiro arco Finch.'),
        child('Vol. 8: A Twist of Faith — Wonder Woman #41–47','Segundo arco.'),
        child('Vol. 9: Resurrection — Wonder Woman #47–52','Conclusão do New 52.')
      ]}
    ]},
    {key:'ww-rebirth',title:'DC Rebirth (2016–2020)',items:[
      {title:'Wonder Woman Rebirth por Greg Rucka',details:'Duas linhas temporais intercaladas; ler na ordem de publicação.',companions:[
        child('Vol. 1: The Lies — Rebirth #1 e Wonder Woman #1, 3, 5, 7, 9, 11','A linha temporal presente.'),
        child('Vol. 2: Year One — Wonder Woman #2, 4, 6, 8, 10, 12, 14','A nova origem de Diana.'),
        child('Vol. 3: The Truth — Wonder Woman #13, 15, 17, 19, 21, 23, 25','Conclusão da linha presente.'),
        child('Vol. 4: Godwatch — Wonder Woman #16, 18, 20, 22, 24 e Annual #1','A história paralela de Veronica Cale.'),
        child('Vol. 5: Heart of the Amazon — Wonder Woman #26–30','Ponte escrita por Shea Fontana.')
      ]},
      {title:'James Robinson e Steve Orlando',details:'Jason, os Dark Gods e o retorno de personagens clássicos.',companions:[
        child('Children of the Gods — Wonder Woman #31–37','Primeira parte da fase Robinson.'),
        child('Amazons Attacked — Wonder Woman #38–45','Segunda parte.'),
        child('Dark Gods — Wonder Woman #46–50 e Annual #2','Conclusão de Robinson.'),
        child('The Enemy of Both Sides — Wonder Woman #51–55','Ponte de Steve Orlando.')
      ]},
      {title:'The Witching Hour',details:'Crossover entre duas séries, apresentado como bloco com leitura separada.',companions:[
        child('Wonder Woman #56–57','Capítulos da série de Diana.'),
        child('Justice League Dark #4','Capítulo da equipe mágica.'),
        child('Wonder Woman and Justice League Dark: The Witching Hour #1','Abertura do crossover.'),
        child('Justice League Dark and Wonder Woman: The Witching Hour #1','Conclusão do crossover.')
      ]},
      {title:'G. Willow Wilson e Steve Orlando',details:'A reta final antes de Infinite Frontier.',companions:[
        child('The Just War — Wonder Woman #58–65','Primeiro volume.'),
        child('Love Is a Battlefield — Wonder Woman #66–73','Segundo volume.'),
        child('Loveless — Wonder Woman #74–81','Terceiro volume.'),
        child('The Four Horsemen — Wonder Woman #82–83 e #750–758','Quarto volume.'),
        child('Lords & Liars — Wonder Woman #759–769','Conclusão antes de Infinite Frontier.')
      ]}
    ]},
    {key:'ww-infinite',title:'Infinite Frontier, Dawn of DC e Tom King',items:[
      {title:'Future State: Wonder Woman',details:'Futuro possível e apresentação de Yara Flor.',companions:[
        child('Future State: Wonder Woman #1–2','Yara Flor.'),
        child('Future State: Superman/Wonder Woman #1–2','História conjunta.'),
        child('Future State: Immortal Wonder Woman #1–2','Diana no futuro distante.')
      ]},
      {title:'Infinite Frontier',details:'O retorno de Diana e a reorganização das Amazonas.',companions:[
        child('Afterworlds — Wonder Woman #770–779','A jornada de Diana pelo pós-vida.'),
        child('Through a Glass Darkly — Wonder Woman #780–784 e Annual 2021','Segundo volume.'),
        child('Trial of the Amazons','Trial #1–2, Nubia and the Amazons #6, Wonder Woman #785–786 e Trial: Wonder Girl #1–2.'),
        child('The Villainy of Our Fears — Wonder Woman #787–794','Terceiro volume principal.'),
        child('Revenge of the Gods — Wonder Woman #795–800','Conclusão da numeração legada.'),
        child('Lazarus Planet: Revenge of the Gods #1–4','Crossover complementar; inclui Wonder Woman #797–798.')
      ]},
      {title:'Wonder Woman por Tom King',details:'Dawn of DC e a Lei de Segurança das Amazonas.',companions:[
        child('Vol. 1: Outlaw — Wonder Woman (2023) #1–6','Primeiro arco de Tom King e Daniel Sampere.'),
        child('Amazons Attack #1–6','Série complementar sem Diana no papel central.'),
        child('Vol. 2: Sacrifice — Wonder Woman #7–13','Inclui os capítulos de Absolute Power.')
      ]}
    ]}
  ];

  // Expansões compostas nas demais guias pesquisadas.
  [
    ['miles-morales-reading-order','Miles Morales: Hero in Training',[
      ['Ultimate Fallout #4','Primeira aparição de Miles Morales.'],['Ultimate Comics Spider-Man #1–12','Primeira série solo.'],['Spider-Men #1–5','Primeiro encontro entre Miles e Peter Parker.']]],
    ['miles-morales-reading-order','Revivals and Revelations',[
      ['Cataclysm: Ultimate Spider-Man #1–3','Tie-ins do evento Cataclysm.'],['Ultimate Spider-Man #200','Edição comemorativa.'],['Miles Morales: Ultimate Spider-Man #1–12','Última série de Miles no universo Ultimate original.']]],
    ['miles-morales-reading-order','Sitting in a Tree',[
      ['Spider-Man (2016) #12–14','Capítulos do ponto de vista de Miles.'],['Spider-Gwen #16–18','Capítulos do ponto de vista de Gwen.']]],
    ['spider-gwen-reading-order','Long-Distance',[
      ['Spider-Gwen #14–15','Série principal.'],['Spider-Gwen Annual #1','Especial anual.'],['All-New Wolverine Annual #1','Encontro com Laura Kinney.'],['Sitting in a Tree','Spider-Gwen #16–18 e Spider-Man #12–14.']]],
    ['spider-man-2099-reading-order','Spider-Man 2099 #1–46',[
      ['Spider-Man 2099 #1–14 e Annual #1','Primeira etapa da série clássica.'],['Fall of the Hammer — #15–22','Crossover da linha 2099.'],['Spider-Man 2099 #23–38','Inclui o confronto com Venom 2099.'],['Spider-Man 2099 #39–46','Reta final da série original.'],['Spider-Man 2099 Meets Spider-Man','Encontro com Peter Parker.']]],
    ['spider-man-2099-reading-order','Spider-Verse',[
      ['Superior Spider-Man #32–33','Prelúdio.'],['Amazing Spider-Man #9–15','Trama principal.'],['Spider-Man 2099 #6–8','Capítulos de Miguel.'],['Spider-Verse #1–2 e Team-Up #1–3','Histórias complementares.']]],
    ['spider-woman-jessica-drew-reading-order','Spider-Woman Masterworks Vol. 1',[
      ['Marvel Spotlight #32','Primeira aparição de Jessica Drew.'],['Marvel Two-in-One #29–33','Primeiras aventuras.'],['Spider-Woman #1–8','Começo da série solo.']]],
    ['spider-woman-jessica-drew-reading-order','Shifting Gears Vol. 1: Baby Talk',[
      ['Spider-Woman #1–5','Arco principal.'],['Amazing Spider-Man #1 — história de Spider-Woman','História complementar.'],['Spider-Women','Silk #7–8, Spider-Gwen #7–8 e Spider-Woman #6–7.']]],
    ['mayday-parker-reading-order','Spider-Verse e Spider-Girls',[
      ['Amazing Spider-Man: Spider-Verse','Participação de Mayday no evento original.'],['Spider-Girls #1–3','Mayday, Anya e Annie May durante Spider-Geddon.']]],
    ['anya-corazon-reading-order','Ms. Marvel e Spider-Man Family',[
      ['Ms. Marvel (2006) — aparições de Anya','Participações antes da mudança de codinome.'],['Spider-Man Family #1','História relacionada à família Aranha.']]],
    ['anya-corazon-reading-order','Spider-Verse / Spider-Geddon',[
      ['Spider-Verse','Primeiro grande encontro multiversal.'],['Spider-Girls #1–3','Tie-in de Spider-Geddon com Mayday e Annie May.'],['Spider-Geddon','Evento principal.']]],
    ['superior-spider-man-reading-order','Necessary Evil',[
      ['Superior Spider-Man #17–21','Capítulos da série mensal.'],['Superior Spider-Man Annual #1','Especial anual.']]],
    ['superior-spider-man-reading-order','Superior Venom',[
      ['Superior Spider-Man #22–26','Arco principal.'],['Superior Spider-Man Annual #2','Especial anual.']]],
    ['superior-spider-man-reading-order','Superior Octopus',[
      ['Superior Octopus #1','One-shot de retorno de Otto.'],['Spider-Geddon #0–5','Evento em que Otto lidera uma equipe Aranha.']]],
    ['superman-modern-age-reading-order','DC Finest: Superman — The Man of Steel',[
      ['The Man of Steel #1–6','Nova origem pós-Crise.'],['Superman #1–6','Série mensal de 1987.'],['Adventures of Superman #424–429','Continuação da série clássica.'],['Action Comics #584–588','Quarto título da leitura coordenada.']]],
    ['superman-modern-age-reading-order','The Death and Return of Superman',[
      ['Doomsday / The Death of Superman','Superman, Action Comics, Adventures of Superman e Man of Steel em sequência.'],['Funeral for a Friend','Consequências imediatas da morte.'],['Reign of the Supermen','Introdução de Steel, Superboy, Cyborg Superman e Eradicator.'],['The Return of Superman','Conclusão do evento.']]],
    ['superman-modern-age-reading-order','New Krypton Saga',[
      ['Superman: Brainiac','Action Comics #866–870.'],['New Krypton Vols. 1–4','Primeiro ato da saga.'],['World of New Krypton #1–12','Série central no novo planeta.'],['Codename: Patriot','Crossover intermediário.'],['Last Stand of New Krypton','Penúltimo ato.'],['War of the Supermen #0–4','Conclusão.']]],
    ['justice-league-reading-order','Throne of Atlantis',[
      ['Justice League #13–17','Capítulos da Liga.'],['Aquaman #14–16','Capítulos de Aquaman.']]],
    ['justice-league-reading-order','Trinity War / Forever Evil',[
      ['Justice League','Capítulos da equipe principal.'],['Justice League of America','Capítulos da segunda equipe.'],['Justice League Dark','Capítulos da equipe mágica.'],['Trinity of Sin: Pandora / Phantom Stranger','Tie-ins da Trindade do Pecado.'],['Forever Evil #1–7','Evento que conclui a fase.']]],
    ['flash-reading-order','The Flash by Mark Waid',[
      ['Born to Run','Origem moderna de Wally West.'],['The Return of Barry Allen','Um dos arcos centrais da fase.'],['Terminal Velocity','Expansão da Família Flash.'],['Dead Heat','Crossover com Impulse.'],['Race Against Time','Continuação direta.'],['Chain Lightning','Saga através da história da Família Flash.'],['The Dark Flash Saga','Conclusão da grande fase de Waid.']]],
    ['flash-reading-order','The Flash by Geoff Johns',[
      ['Wonderland','Primeiro arco de Johns.'],['Blood Will Run','Segundo arco.'],['Rogues','Consolidação da Galeria de Vilões.'],['Blitz','Saga de Zoom.'],['Ignition','Novo começo para Wally.'],['Rogue War','Conclusão da fase principal.']]],
    ['green-lantern-reading-order','Sinestro Corps War',[
      ['Green Lantern #21–25','Capítulos de Hal Jordan.'],['Green Lantern Corps #14–19','Capítulos da Tropa.'],['Sinestro Corps Special #1','Abertura do evento.'],['Tales of the Sinestro Corps','Especiais complementares.']]],
    ['green-lantern-reading-order','Blackest Night',[
      ['Blackest Night #0–8','Minissérie central.'],['Green Lantern #43–52','Capítulos de Hal Jordan.'],['Green Lantern Corps #39–47','Capítulos da Tropa.'],['Blackest Night: Tales of the Corps #1–3','Histórias complementares.']]],
    ['x-men-complete-reading-order','Mutant Massacre',[
      ['Uncanny X-Men #210–214','Capítulos da equipe principal.'],['X-Factor #9–11','Capítulos da equipe original.'],['New Mutants #46','Capítulo dos Novos Mutantes.'],['Thor #373–374','Tie-ins de Thor.'],['Power Pack #27','Tie-in de Power Pack.']]],
    ['x-men-complete-reading-order','Fall of the Mutants / Inferno',[
      ['Fall of the Mutants — Uncanny X-Men','Primeiro eixo do evento.'],['Fall of the Mutants — X-Factor','Segundo eixo.'],['Fall of the Mutants — New Mutants','Terceiro eixo.'],['Inferno — Uncanny X-Men','Capítulos dos X-Men.'],['Inferno — X-Factor','Capítulos de X-Factor.'],['Inferno — New Mutants','Capítulos dos Novos Mutantes.']]],
    ['x-men-complete-reading-order','House of X / Powers of X',[
      ['House of X #1–6','Presente e formação de Krakoa.'],['Powers of X #1–6','Passado e futuros da linha mutante.']]],
    ['x-men-complete-reading-order','Dawn of X / Reign of X',[
      ['X-Men','Série central.'],['Marauders','Política marítima de Krakoa.'],['Excalibur','Magia mutante e Otherworld.'],['New Mutants','Nova geração.'],['X-Force','Inteligência e defesa.'],['Fallen Angels / Hellions / S.W.O.R.D.','Séries complementares.']]],
    ['fantastic-four-reading-order','Fantastic Four / FF por Jonathan Hickman',[
      ['Fantastic Four #570–588','Primeira etapa.'],['Fantastic Four #589–611','Segunda etapa.'],['FF #1–23','Série paralela Future Foundation, lida intercalada.']]],
    ['fantastic-four-reading-order','Fantastic Four por Matt Fraction',[
      ['Fantastic Four (2012) #1–16','A família no espaço-tempo.'],['FF (2012) #1–16','A equipe substituta na Fundação Futuro.']]],
    ['iron-man-reading-order','Director of S.H.I.E.L.D.',[
      ['Iron Man #15–28','Tony como diretor da S.H.I.E.L.D.'],['Iron Man: Director of S.H.I.E.L.D. #29–35','Continuação renomeada.'],['World War Hulk: Warbound / Iron Man tie-ins','Material de crossover.'],['Secret Invasion: War Machine','História paralela com James Rhodes.']]],
    ['iron-man-reading-order','Stark Resilient / Fear Itself / The Future',[
      ['Stark Resilient — Invincible Iron Man #25–33','Reconstrução de Stark.'],['Fear Itself — Invincible Iron Man #504–509','Tie-ins do evento.'],['Demon / Long Way Down — #510–520','Penúltima fase.'],['The Future — #521–527','Conclusão da fase Fraction/Larroca.']]],
    ['iron-man-reading-order','Invincible / International Iron Man',[
      ['Invincible Iron Man #1–14','Série principal de Brian Michael Bendis.'],['International Iron Man #1–7','Série paralela sobre a origem de Tony.'],['Civil War II #0–8','Evento que encerra a fase.']]],
    ['avengers-reading-order','Operation: Galactic Storm',[
      ['Avengers','Capítulos da equipe principal.'],['Avengers West Coast','Capítulos da Costa Oeste.'],['Captain America','Capítulos do Capitão.'],['Iron Man','Capítulos do Homem de Ferro.'],['Thor / Quasar / Wonder Man','Demais séries interligadas.']]],
    ['avengers-reading-order','Avengers / New Avengers por Jonathan Hickman',[
      ['Avengers (2012)','A equipe pública e os Builders.'],['New Avengers (2013)','Os Illuminati e as incursões.'],['Infinity #1–6','Evento central intercalado com as duas séries.'],['Time Runs Out','Fase final antes de Secret Wars.'],['Secret Wars #1–9','Conclusão da saga.']]],
    ['daredevil-reading-order','Daredevil por Chip Zdarsky',[
      ['Daredevil (2019) #1–36','Primeira série da fase.'],['Devil’s Reign #1–6','Evento central de Wilson Fisk.'],['Daredevil: Woman Without Fear #1–3','Série paralela de Elektra.'],['Daredevil (2022) #1–14','Conclusão da fase Zdarsky.']]],
    ['supergirl-reading-order','DC Finest: Supergirl — The Girl of Steel',[
      ['Action Comics #252–288','Histórias principais de Kara.'],['Adventure Comics #278','História complementar.'],['Superman #139–140 e #144','Participações em Superman.'],['Superboy / Lois Lane / Jimmy Olsen','Demais histórias do período.']]],
    ['jon-kent-reading-order','Superman Rebirth por Tomasi e Gleason',[
      ['Superman Rebirth — Son of Superman','Primeiro arco da família Kent.'],['Superman Rebirth — Trials of the Super Son','Continuação da série principal.'],['Super Sons #1–16 e Annual #1','Jon Kent e Damian Wayne.'],['Adventures of the Super Sons #1–12','Segunda série da dupla.'],['Challenge of the Super Sons #1–14','Terceira série da dupla.']]],
    ['conner-kent-reading-order','The Death and Return of Superman',[
      ['The Death of Superman','Morte de Clark Kent.'],['Funeral for a Friend','Mundo sem Superman.'],['Reign of the Supermen','Estreia de Conner em Adventures of Superman #500.'],['The Return of Superman','Conclusão e encontro com Clark.']]],
    ['power-girl-reading-order','Worlds’ Finest Vols. 1–4',[
      ['Vol. 1: The Lost Daughters of Earth 2','Primeiro arco.'],['Vol. 2: Hunt and Be Hunted','Segundo arco.'],['Vol. 3: Control Issues','Terceiro arco.'],['Vol. 4: First Contact','Crossover com Batman/Superman.']]]
  ].forEach(([id,title,parts]) => expand(id,title,parts));
})();
