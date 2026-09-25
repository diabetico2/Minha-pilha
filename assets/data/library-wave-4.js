(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const child = (title, details = '') => ({ title, details, companions: [] });
  const run = (title, details, companions) => ({ title, details, companions });
  const section = (key, title, items) => ({ key, title, items });
  const order = (id, publisher, family, title, source, sections) => ({ id, publisher, family, title, source, sections });

  const additions = [
    order('she-hulk-reading-order', 'Marvel', 'Vingadores', 'Mulher-Hulk — Ordem de Leitura', 'https://www.comicbooktreasury.com/marvel-reading-orders/', [
      section('classic', 'Jennifer Walters — origem e fase clássica', [
        run('Savage She-Hulk', 'Jennifer recebe uma transfusão de Bruce Banner e aprende a viver com sua nova força.', [
          child('Savage She-Hulk #1', 'Origem de Jennifer Walters.'),
          child('Savage She-Hulk #2–8', 'Primeiros casos como advogada e heroína.'),
          child('Savage She-Hulk #9–14', 'Morbius e novas ameaças.'),
          child('Savage She-Hulk #15–20', 'Confrontos com criminosos e monstros.'),
          child('Savage She-Hulk #21–25', 'Conclusão da primeira série.')
        ]),
        run('Vingadores e Quarteto Fantástico', 'Jennifer se torna integrante central de duas grandes equipes.', [
          child('Avengers #221–233', 'Entrada de Jennifer nos Vingadores.'),
          child('Secret Wars #1–12', 'A guerra em Battleworld.'),
          child('Fantastic Four #265–300', 'Jennifer substitui o Coisa na equipe.'),
          child('Avengers #278–297', 'Retorno aos Vingadores.'),
          child('Marvel Graphic Novel: The Death of She-Hulk', 'História importante da fase clássica.')
        ])
      ]),
      section('sensational', 'Sensational She-Hulk e advocacia super-humana', [
        run('John Byrne e a quebra da quarta parede', 'Jennifer sabe que está em uma HQ e enfrenta vilões com humor e inteligência.', [
          child('Sensational She-Hulk #1–8', 'Primeiro ciclo de John Byrne.'),
          child('Sensational She-Hulk #9–30', 'Steve Gerber e outros autores ampliam o elenco.'),
          child('Sensational She-Hulk #31–39', 'Retorno de Byrne.'),
          child('Sensational She-Hulk #40–50', 'Casos, participações e metalinguagem.'),
          child('Sensational She-Hulk #51–60', 'Conclusão da série.')
        ]),
        run('She-Hulk por Dan Slott', 'A firma Goodman, Lieber, Kurtzberg & Holliway especializa-se em direito super-humano.', [
          child('Vol. 1: Single Green Female', 'She-Hulk (2004) #1–6.'),
          child('Vol. 2: Superhuman Law', 'She-Hulk #7–12.'),
          child('She-Hulk (2005) #1–5', 'Reabertura da série e novo status de Jennifer.'),
          child('She-Hulk (2005) #6–13', 'Civil War e julgamentos super-humanos.'),
          child('She-Hulk (2005) #14–21', 'Conclusão da fase de Dan Slott.')
        ])
      ]),
      section('modern', 'Soule, Hulk cinza e Rainbow Rowell', [
        run('She-Hulk por Charles Soule', 'Jennifer abre seu escritório e concilia processos com heroísmo.', [
          child('Vol. 1: Law and Disorder', 'She-Hulk (2014) #1–6.'),
          child('Vol. 2: Disorderly Conduct', 'She-Hulk #7–12.'),
          child('Hulk Vol. 1: Deconstructed', 'Hulk (2016) #1–6; Jennifer após Civil War II.'),
          child('Hulk Vol. 2: Let Them Eat Cake', 'Hulk #7–11.'),
          child('She-Hulk Vols. 1–3', 'She-Hulk #159–163 e #164–173.')
        ]),
        run('She-Hulk por Rainbow Rowell', 'Trabalho, romance com Jack of Hearts e retorno ao equilíbrio.', [
          child('Vol. 1: Jen, Again', 'She-Hulk (2022) #1–5.'),
          child('Vol. 2: Jen of Hearts', 'She-Hulk #6–10.'),
          child('Vol. 3: Girl Can’t Help It', 'She-Hulk #11–15.'),
          child('Sensational She-Hulk Vol. 1', 'Sensational She-Hulk (2023) #1–5.'),
          child('Sensational She-Hulk Vol. 2', 'Sensational She-Hulk #6–10.'),
          child('Avengers by Jed MacKay', 'Participações recentes com os Heróis Mais Poderosos.')
        ])
      ])
    ]),

    order('vision-reading-order', 'Marvel', 'Vingadores', 'Visão — Ordem de Leitura', 'https://www.comicbooktreasury.com/avengers-reading-order/', [
      section('classic', 'Um androide entre os Vingadores', [
        run('Origem, Wanda e a família', 'Ultron cria o Visão, mas ele escolhe a humanidade e os Vingadores.', [
          child('Avengers #57–58', 'Primeira aparição e entrada na equipe.'),
          child('Avengers #66–68', 'A conexão com Ultron e Simon Williams.'),
          child('Avengers #91–104', 'Visão se torna parte essencial da equipe.'),
          child('Giant-Size Avengers #4', 'Casamento com Wanda Maximoff.'),
          child('Vision and the Scarlet Witch #1–4 (1982)', 'Primeira minissérie do casal.'),
          child('Vision and the Scarlet Witch #1–12 (1985)', 'Vida suburbana e nascimento dos gêmeos.')
        ]),
        run('Vision Quest e reconstrução', 'O Visão perde emoções, família e identidade.', [
          child('West Coast Avengers #42–45', 'Vision Quest.'),
          child('Avengers West Coast #46–52', 'Visão branco e consequências para Wanda.'),
          child('Avengers Spotlight #40', 'O androide tenta reconstruir sua vida.'),
          child('Vision #1–4 (1994)', 'Minissérie solo sobre identidade e humanidade.'),
          child('Avengers (1998) #0–22', 'Retorno à equipe e reaproximação com Wanda.'),
          child('Avengers Disassembled', 'Avengers #500–503 e destino do Visão.')
        ])
      ]),
      section('young', 'Jonas, retorno e Vingadores', [
        run('Young Avengers e Vision', 'A armadura de Iron Lad recebe os padrões mentais do Visão.', [
          child('Young Avengers #1–6', 'Formação da equipe e criação de Jonas.'),
          child('Young Avengers #7–12 e Special', 'Jonas encontra seu lugar no grupo.'),
          child('Young Avengers Presents #1–6', 'Histórias individuais dos integrantes.'),
          child('Avengers: The Children’s Crusade #1–9', 'Wanda, os gêmeos e o destino de Jonas.')
        ]),
        run('O Visão original retorna', 'Tony Stark reconstrói o sintozóide e ele enfrenta as cicatrizes do passado.', [
          child('Avengers #19 (2012)', 'O retorno do Visão original.'),
          child('Avengers Assemble #1–8', 'Nova fase com a equipe.'),
          child('Avengers A.I. Vol. 1: Human After All', 'Avengers A.I. #1–6.'),
          child('Avengers A.I. Vol. 2: 12,000 A.D.', 'Avengers A.I. #7–12.'),
          child('Avengers A.I. Vol. 3: Inhuman', 'Avengers A.I. #13–16.')
        ])
      ]),
      section('king', 'Visão por Tom King e legado moderno', [
        run('Uma família perfeita', 'Visão constrói uma família sintética nos subúrbios, com resultados trágicos.', [
          child('The Vision #1', 'A família Vision chega a Arlington.'),
          child('The Vision #2–3', 'Um crime começa a corroer a fachada perfeita.'),
          child('The Vision #4–6', 'Segredos, medo e o fim do primeiro arco.'),
          child('The Vision #7', 'A história de Victor Mancha.'),
          child('The Vision #8–10', 'Os Vingadores se aproximam da verdade.'),
          child('The Vision #11–12', 'Conclusão da tragédia familiar.')
        ]),
        run('Viv Vision e fases seguintes', 'A filha do Visão encontra sua própria identidade entre jovens heróis.', [
          child('Champions Vol. 1: Change the World', 'Champions (2016) #1–6.'),
          child('Champions Vols. 2–5', 'A evolução de Viv na equipe.'),
          child('Vision and the Scarlet Witch #1–5 (2025)', 'Nova minissérie do casal.'),
          child('Avengers: No Road Home #1–10', 'Visão em uma grande saga da equipe.')
        ])
      ])
    ]),

    order('namor-reading-order', 'Marvel', 'Vingadores', 'Namor — Ordem de Leitura', 'https://www.comicbooktreasury.com/namor-reading-order/', [
      section('classic', 'O Príncipe Submarino e a Era Marvel', [
        run('Retorno, Atlântida e Defensores', 'Namor volta sem memória, recupera o trono e alterna entre aliado e inimigo da superfície.', [
          child('Fantastic Four #4', 'Retorno de Namor à Era Marvel.'),
          child('Fantastic Four #6, #9, #14 e #27', 'Primeiros conflitos modernos com o Quarteto.'),
          child('Tales to Astonish #70–101', 'Primeira longa fase solo da Era de Prata.'),
          child('Sub-Mariner #1–13', 'Busca pelo trono e conflitos de Atlântida.'),
          child('Sub-Mariner #14–38', 'Lady Dorma, Attuma e a política atlante.'),
          child('Defenders #1–19', 'Namor funda o “não-time” com Strange e Hulk.')
        ]),
        run('Invasores e histórias da Segunda Guerra', 'O jovem Namor luta ao lado do Capitão América e do Tocha Humana.', [
          child('Giant-Size Invaders #1', 'Formação dos Invasores.'),
          child('Invaders #1–15', 'Primeiras missões contra o Eixo.'),
          child('Invaders #16–34', 'Liberty Legion e ameaças temporais.'),
          child('Invaders #35–41 e Annual', 'Conclusão da série clássica.'),
          child('The Marvels Project #1–8', 'Releitura moderna do nascimento da Era Marvel.')
        ])
      ]),
      section('byrne', 'Namor por John Byrne e Jae Lee', [
        run('O rei como empresário', 'Namor usa a Oracle Inc. para proteger os mares e estabilizar sua mente.', [
          child('Namor the Sub-Mariner #1–9', 'Fundação da Oracle e nova fase.'),
          child('Namor #10–18', 'Conflitos corporativos e retorno de inimigos.'),
          child('Namor #19–25', 'A busca pelo Tocha Humana original.'),
          child('Namor #26–32', 'Transição para Jae Lee.'),
          child('Namor #33–40', 'Saga Sementes das Trevas.'),
          child('Namor #41–48', 'Conclusão da série moderna.')
        ]),
        run('Illuminati e X-Men', 'Namor entra em alianças secretas e reconhece sua identidade mutante.', [
          child('New Avengers: Illuminati #1–5', 'O conselho secreto da Marvel.'),
          child('Sub-Mariner (2007) #1–6', 'Atlântida entra na mira da S.H.I.E.L.D.'),
          child('Dark Reign: The Cabal', 'Namor divide a mesa com vilões e líderes.'),
          child('Uncanny X-Men #515–534', 'Namor se une à nação mutante de Utopia.'),
          child('Avengers vs. X-Men', 'Namor recebe parte da Força Fênix.')
        ])
      ]),
      section('modern', 'Incursões, Invaders e o Último Rei', [
        run('New Avengers por Jonathan Hickman', 'Namor e os Illuminati enfrentam colisões entre universos.', [
          child('New Avengers Vol. 1: Everything Dies', 'New Avengers (2013) #1–6.'),
          child('Vol. 2: Infinity', 'New Avengers #7–12.'),
          child('Vols. 3–4', 'New Avengers #13–23 e Annual.'),
          child('Time Runs Out', 'Avengers #35–44 e New Avengers #24–33.'),
          child('Secret Wars #1–9', 'Namor e Pantera Negra em Battleworld.')
        ]),
        run('Defesa de Atlântida e fases recentes', 'Namor volta a confrontar a superfície e revisita o passado de seu reino.', [
          child('Defenders: The Best Defense', 'Cinco especiais conectados.'),
          child('Invaders Vol. 1: War Ghost', 'Invaders (2019) #1–6.'),
          child('Invaders Vol. 2: Dead in the Water', 'Invaders #7–12.'),
          child('King in Black: Namor #1–5', 'A juventude de Namor e a Maré Negra.'),
          child('Namor: Conquered Shores #1–5', 'Futuro alternativo por Christopher Cantwell.'),
          child('Namor: Last King of Atlantis', 'Namor (2024) #1–8.')
        ])
      ])
    ]),

    order('ms-marvel-kamala-khan-reading-order', 'Marvel', 'Jovens heróis', 'Ms. Marvel — Kamala Khan', 'https://www.comicbooktreasury.com/ms-marvel-kamala-khan-reading-order-with-the-champions/', [
      section('wilson', 'A nova Ms. Marvel — G. Willow Wilson', [
        run('No Normal e primeiros anos', 'Kamala descobre seus poderes, protege Jersey City e conhece seus heróis.', [
          child('Vol. 1: No Normal', 'Ms. Marvel (2014) #1–5 e Point One.'),
          child('Vol. 2: Generation Why', 'Ms. Marvel #6–11.'),
          child('Vol. 3: Crushed', 'Ms. Marvel #12–15 e material de S.H.I.E.L.D.'),
          child('Vol. 4: Last Days', 'Ms. Marvel #16–19 e material de Amazing Spider-Man.'),
          child('All-New, All-Different Avengers Vols. 1–2', 'Kamala entra nos Vingadores.')
        ]),
        run('Super Famous, Champions e Secret Empire', 'Kamala vira símbolo público, rompe com os Vingadores e ajuda a formar os Champions.', [
          child('Vol. 5: Super Famous', 'Ms. Marvel (2015) #1–6.'),
          child('Vol. 6: Civil War II', 'Ms. Marvel #7–12.'),
          child('Champions Vol. 1: Change the World', 'Champions (2016) #1–6.'),
          child('Vol. 7: Damage Per Second', 'Ms. Marvel #13–18.'),
          child('Secret Warriors Vols. 1–2', 'Secret Warriors #1–10 durante Secret Empire.'),
          child('Vol. 8: Mecca', 'Ms. Marvel #19–24.')
        ]),
        run('Teenage Wasteland ao fim da primeira era', 'Kamala encara o custo da vida heroica e redefine seu papel.', [
          child('Vol. 9: Teenage Wasteland', 'Ms. Marvel #25–30.'),
          child('Avengers & Champions: Worlds Collide', 'Avengers #672–674 e Champions #13–15.'),
          child('Vol. 10: Time and Again', 'Ms. Marvel #31–38.'),
          child('Marvel Team-Up #1–6', 'Kamala com Homem-Aranha e Capitã Marvel.')
        ])
      ]),
      section('magnificent', 'The Magnificent Ms. Marvel e Outlawed', [
        run('Destined e Stormranger', 'Kamala viaja ao espaço e enfrenta uma tecnologia que imita seus poderes.', [
          child('Vol. 1: Destined', 'Magnificent Ms. Marvel #1–6.'),
          child('Vol. 2: Stormranger', 'Magnificent Ms. Marvel #7–12.'),
          child('Champions (2019) Vol. 1: Beat the Devil', 'Champions #1–6.'),
          child('Champions (2019) Vol. 2: Give and Take', 'Champions #7–10 e Nova #1.')
        ]),
        run('Outlawed e Beyond the Limit', 'A Lei de Kamala transforma jovens heróis em foras da lei.', [
          child('Outlawed #1', 'O incidente que cria a lei.'),
          child('Champions Vol. 1: Outlawed', 'Champions (2020) #1–5.'),
          child('Magnificent Ms. Marvel Vol. 3', 'Magnificent Ms. Marvel #13–18.'),
          child('Champions Vol. 2: Killer App', 'Champions #6–10.'),
          child('Ms. Marvel: Beyond the Limit #1–5', 'Kamala enfrenta doppelgängers.'),
          child('Ms. Marvel: Fists of Justice', 'Encontros com Wolverine, Moon Knight e Venom.')
        ])
      ]),
      section('mutant', 'Morte, ressurreição e a nova mutante', [
        run('Fall of X', 'Kamala renasce em Krakoa e descobre sua natureza mutante.', [
          child('Amazing Spider-Man #26 / Fallen Friend #1', 'Morte e homenagem a Kamala.'),
          child('X-Men: Hellfire Gala (2023) #1', 'Ressurreição e revelação mutante.'),
          child('Ms. Marvel: The New Mutant #1–4', 'Kamala atua infiltrada durante Fall of X.'),
          child('Ms. Marvel: Mutant Menace #1–4', 'Continuação da nova fase.'),
          child('X-Men (2021) #25–29', 'Participações com a equipe mutante.')
        ]),
        run('NYX e From the Ashes', 'Kamala ajuda jovens mutantes a construir uma comunidade em Nova York.', [
          child('NYX Vol. 1: What Comes Next Will Be Marvelous', 'NYX (2024) #1–5.'),
          child('NYX Vol. 2: Mojo City', 'NYX #6–10.'),
          child('Giant-Size X-Men: Second Genesis Revisited', 'Especiais de 2025 com Kamala viajando pela história mutante.')
        ])
      ])
    ]),

    order('young-avengers-reading-order', 'Marvel', 'Jovens heróis', 'Jovens Vingadores — Ordem de Leitura', 'https://www.comicbooktreasury.com/young-avengers-comics-reading-order/', [
      section('heinberg', 'A equipe original — Heinberg e Cheung', [
        run('Sidekicks e Family Matters', 'Iron Lad reúne adolescentes ligados ao legado dos Vingadores.', [
          child('Young Avengers #1–6: Sidekicks', 'Formação da equipe e segredo de Iron Lad.'),
          child('Young Avengers #7–8', 'A equipe busca suas origens.'),
          child('Young Avengers Special #1', 'Jessica Jones entrevista cada integrante.'),
          child('Young Avengers #9–12: Family Matters', 'Kree, Skrulls e a origem de Hulkling.'),
          child('Young Avengers Presents #1–6', 'Histórias individuais de Patriot, Hulkling, Wiccan, Vision, Stature e Hawkeye.')
        ]),
        run('Eventos e Dark Reign', 'A equipe cresce entre Guerra Civil, Invasão Secreta e o reinado de Osborn.', [
          child('Civil War: Young Avengers & Runaways #1–4', 'Os dois grupos são perseguidos.'),
          child('Secret Invasion: Runaways/Young Avengers #1–3', 'Hulkling no centro da invasão Skrull.'),
          child('Dark Reign: Young Avengers #1–5', 'Uma equipe rival reivindica o nome.'),
          child('Siege: Young Avengers #1', 'Os jovens lutam na queda de Asgard.')
        ])
      ]),
      section('crusade', 'The Children’s Crusade', [
        run('A busca por Wanda Maximoff', 'Wiccan e Speed investigam sua família e encontram a Feiticeira Escarlate.', [
          child('Avengers: The Children’s Crusade #1–2', 'Magneto se aproxima da equipe.'),
          child('Children’s Crusade #3–4', 'Wanda é encontrada em Latvéria.'),
          child('Young Avengers One-Shot', 'Capítulo complementar da história.'),
          child('Children’s Crusade #5–7', 'Vingadores e X-Men entram no conflito.'),
          child('Children’s Crusade #8–9', 'Destino da equipe e retorno de Wanda.')
        ])
      ]),
      section('gillen', 'Young Avengers por Kieron Gillen e legado', [
        run('Style > Substance', 'Wiccan, Hulkling, Kate Bishop, America Chavez, Kid Loki e Noh-Varr enfrentam Mãe.', [
          child('Marvel NOW! Point One — Young Avengers', 'Prólogo da nova formação.'),
          child('Vol. 1: Style > Substance', 'Young Avengers (2013) #1–5.'),
          child('Vol. 2: Alternative Cultures', 'Young Avengers #6–10.'),
          child('Vol. 3: Mic-Drop at the Edge of Time and Space', 'Young Avengers #11–15.')
        ]),
        run('Depois da equipe', 'Os integrantes seguem por novas equipes, reinos e carreiras solo.', [
          child('New Avengers (2015) #1–18', 'Wiccan e Hulkling na equipe de Sunspot.'),
          child('West Coast Avengers (2018) #1–10', 'Kate e America reunidas.'),
          child('Empyre #1–6', 'Hulkling e Wiccan no centro do império Kree/Skrull.'),
          child('Guardians of the Galaxy (2020) #13–18', 'Hulkling, Wiccan e Noh-Varr no espaço.'),
          child('Marvel’s Voices: Young Avengers', 'Novas histórias do elenco.')
        ])
      ])
    ]),

    order('champions-reading-order', 'Marvel', 'Jovens heróis', 'Champions — Ordem de Leitura', 'https://www.comicbooktreasury.com/marvel-outlawed-reading-order/', [
      section('classic', 'Os Champions de Los Angeles', [
        run('A equipe original', 'Hércules, Viúva Negra, Anjo, Homem de Gelo e Motoqueiro Fantasma unem forças.', [
          child('Champions #1–5', 'Formação da equipe.'),
          child('Champions #6–10', 'Conflitos com Titanium Man e Sentinelas.'),
          child('Champions #11–17', 'Conclusão da série original.'),
          child('Avengers #163 e Super-Villain Team-Up #14', 'Epílogo da trama final.'),
          child('Champions Classic Vols. 1–2', 'A série e participações reunidas.')
        ])
      ]),
      section('modern', 'Kamala, Miles e Sam Alexander', [
        run('Change the World', 'Jovens heróis deixam os Vingadores para ajudar pessoas de forma mais direta.', [
          child('Vol. 1: Change the World', 'Champions (2016) #1–6.'),
          child('Vol. 2: The Freelancer Lifestyle', 'Champions #6–11.'),
          child('Champions & Totally Awesome Hulk', 'Totally Awesome Hulk #13–18.'),
          child('Avengers & Champions: Worlds Collide', 'Avengers #672–674 e Champions #13–15.'),
          child('Vol. 3: Champion for a Day', 'Champions #16–21.'),
          child('Vol. 4: Northern Lights', 'Champions #19–21 e Infinity Countdown #1–2.'),
          child('Vol. 5: Weird War One', 'Champions #22–27.')
        ]),
        run('Champions por Jim Zub', 'A equipe cresce, enfrenta Mefisto e atravessa a Guerra dos Reinos.', [
          child('Vol. 1: Beat the Devil', 'Champions (2019) #1–6.'),
          child('War of the Realms: Journey into Mystery #1–5', 'Miles e parte da equipe protegem a irmã de Thor.'),
          child('Vol. 2: Give and Take', 'Champions #7–10 e Nova #1.'),
          child('Incoming #1', 'Preparação para Outlawed.')
        ])
      ]),
      section('outlawed', 'Outlawed e Kamala’s Law', [
        run('Jovens heróis fora da lei', 'O governo proíbe vigilantes menores de idade e a equipe passa à clandestinidade.', [
          child('Outlawed #1', 'O desastre que origina a Lei de Kamala.'),
          child('Champions Vol. 1: Outlawed', 'Champions (2020) #1–5.'),
          child('Magnificent Ms. Marvel #13–18', 'Consequências pessoais para Kamala.'),
          child('Miles Morales: Spider-Man #22–28', 'Miles enfrenta a lei e sua própria Saga do Clone.'),
          child('Power Pack (2020) #1–5', 'A família Power sob novas restrições.'),
          child('Champions Vol. 2: Killer App', 'Champions #6–10 e conclusão do evento.')
        ])
      ])
    ]),

    order('luke-cage-iron-fist-reading-order', 'Marvel', 'Heróis urbanos', 'Luke Cage e Punho de Ferro — Ordem de Leitura', 'https://www.comicbooktreasury.com/luke-cage-reading-order/', [
      section('origins', 'Heróis de Aluguel — origens', [
        run('Luke Cage: Hero for Hire', 'Carl Lucas escapa da prisão, assume o nome Luke Cage e protege o Harlem.', [
          child('Luke Cage, Hero for Hire #1–8', 'Origem, Experimento Burstein e primeiros contratos.'),
          child('Hero for Hire #9–16', 'Consolidação de Luke como herói do Harlem.'),
          child('Power Man #17–23', 'Luke adota seu novo codinome.'),
          child('Power Man #24–35', 'Defensores, Quarteto Fantástico e novos inimigos.'),
          child('Power Man #36–47 e Annual #1', 'Caminho para a parceria com Danny Rand.')
        ]),
        run('Iron Fist: o campeão de K’un-Lun', 'Danny Rand volta a Nova York para vingar a família e escolher seu próprio caminho.', [
          child('Marvel Premiere #15–20', 'Origem de Danny Rand.'),
          child('Marvel Premiere #21–25', 'Mestres marciais e segredos de K’un-Lun.'),
          child('Iron Fist #1–7', 'Primeira série solo.'),
          child('Iron Fist #8–15', 'Davos, Colleen Wing e Misty Knight.'),
          child('Marvel Team-Up #63–64', 'Ponte para Power Man and Iron Fist.')
        ])
      ]),
      section('team', 'Power Man and Iron Fist', [
        run('A dupla clássica', 'Luke e Danny transformam uma parceria improvável na agência Heroes for Hire.', [
          child('Epic: Heroes for Hire', 'Power Man #48–49 e Power Man and Iron Fist #50–70.'),
          child('Epic: Revenge!', 'Power Man and Iron Fist #71–89 e Daredevil #178.'),
          child('Epic: Doombringer', 'Power Man and Iron Fist #90–107.'),
          child('Epic: Hardball', 'Power Man and Iron Fist #108–125.'),
          child('Heroes for Hire (1997) #1–19', 'Reunião com uma equipe ampliada.')
        ]),
        run('Immortal Iron Fist', 'Ed Brubaker, Matt Fraction e David Aja ampliam as cidades celestiais.', [
          child('Vol. 1: The Last Iron Fist Story', 'Immortal Iron Fist #1–6.'),
          child('Vol. 2: The Seven Capital Cities of Heaven', 'Immortal Iron Fist #7–14 e Annual.'),
          child('Vol. 3: The Book of Iron Fist', 'Orson Randall e histórias dos antigos Punhos.'),
          child('Vol. 4: The Mortal Iron Fist', 'Immortal Iron Fist #17–20.'),
          child('Vol. 5: Escape from the Eighth City', 'Immortal Iron Fist #21–27.'),
          child('Immortal Weapons #1–5', 'Os outros campeões das cidades celestiais.')
        ])
      ]),
      section('modern', 'New Avengers, Defenders e novas gerações', [
        run('Luke Cage nos Vingadores', 'Luke se torna líder, pai e um dos pilares da resistência a Norman Osborn.', [
          child('New Avengers Vols. 1–4', 'Formação da equipe e caminho para Guerra Civil.'),
          child('New Avengers Vols. 5–9', 'Guerra Civil e Invasão Secreta.'),
          child('New Avengers Vols. 10–13', 'Dark Reign e Siege.'),
          child('Thunderbolts: Cage', 'Thunderbolts #144–157.'),
          child('Mighty Avengers por Al Ewing', 'Luke lidera heróis urbanos durante Infinity.')
        ]),
        run('Power Man and Iron Fist e Defenders', 'A dupla se reúne e logo integra a equipe urbana de Bendis.', [
          child('Power Man and Iron Fist Vol. 1: The Boys Are Back in Town', 'Série de 2016 #1–5.'),
          child('Vol. 2: Civil War II', 'Power Man and Iron Fist #6–9 e Sweet Christmas.'),
          child('Vol. 3: Street Magic', 'Power Man and Iron Fist #10–15.'),
          child('Defenders Vol. 1: Diamonds Are Forever', 'Defenders (2017) #1–5.'),
          child('Defenders Vol. 2: Kingpins of New York', 'Defenders #6–10.'),
          child('Luke Cage (2017) Vols. 1–2', 'Luke Cage #1–10 e #166–170.')
        ]),
        run('Danny Rand e Lin Lie', 'O poder do Punho de Ferro muda de mãos.', [
          child('Iron Fist: The Living Weapon Vols. 1–2', 'Iron Fist #1–12.'),
          child('Iron Fist: The Trial of the Seven Masters', 'Iron Fist (2017) #1–7.'),
          child('Iron Fist: Sabretooth — Round Two', 'Iron Fist #8–12.'),
          child('Heart of the Dragon #1–6', 'Danny enfrenta uma crise nas cidades celestiais.'),
          child('Iron Fist (2022) #1–5', 'Lin Lie assume o manto.'),
          child('Danny Rand: The Immortal Iron Fist #1–5', 'Danny redefine seu lugar sem o chi de Shou-Lao.')
        ])
      ])
    ]),

    order('jessica-jones-reading-order', 'Marvel', 'Heróis urbanos', 'Jessica Jones — Ordem de Leitura', 'https://www.comicbooktreasury.com/marvel-jessica-jones-reading-order/', [
      section('alias', 'Alias Investigations', [
        run('Jessica Jones: Alias', 'A ex-heroína Jewel trabalha como investigadora particular em casos super-humanos.', [
          child('Alias Vol. 1', 'Alias #1–9.'),
          child('Alias #10', 'Capítulo independente entre as coleções.'),
          child('Alias Vol. 2', 'Alias #11–15.'),
          child('Alias Vol. 3', 'Alias #16–21.'),
          child('Alias Vol. 4', 'Alias #22–28.'),
          child('What If Jessica Jones Had Joined the Avengers?', 'Realidade alternativa sobre a carreira de Jewel.')
        ]),
        run('The Pulse', 'Jessica trabalha no Clarim Diário e entra definitivamente na comunidade heroica.', [
          child('The Pulse Vol. 1: Thin Air', 'The Pulse #1–5.'),
          child('Secret War #1–5', 'Evento que se cruza com o próximo arco.'),
          child('The Pulse Vol. 2: Secret War', 'The Pulse #6–9.'),
          child('The Pulse Vol. 3: Fear', 'The Pulse #11–14 e New Avengers Annual #1.'),
          child('Young Avengers #1–12 e Special', 'Jessica acompanha a formação dos jovens heróis.')
        ])
      ]),
      section('avengers', 'Família Cage e New Avengers', [
        run('Guerra Civil a Siege', 'Jessica e Luke tentam proteger a filha enquanto o mundo dos heróis desmorona.', [
          child('New Avengers #22', 'Jessica e Luke durante Guerra Civil.'),
          child('New Avengers #28–37 e Annual #2', 'A família é forçada à clandestinidade.'),
          child('Secret Invasion #1–8', 'O sequestro da filha revela uma infiltração Skrull.'),
          child('New Avengers #48–60', 'Dark Reign e busca pelo bebê.'),
          child('Siege / New Avengers Finale', 'Queda de Osborn e reunião da família.')
        ]),
        run('Heroic Age e Mighty Avengers', 'Jessica tenta voltar à identidade heroica sem abandonar a família.', [
          child('New Avengers (2010) #1–13', 'A equipe opera da Mansão dos Vingadores.'),
          child('New Avengers #14–24', 'Fear Itself e novas ameaças.'),
          child('New Avengers #25–34', 'Avengers vs. X-Men e conclusão.'),
          child('Mighty Avengers (2013) #1–14', 'Luke lidera os heróis urbanos.'),
          child('Captain America and the Mighty Avengers #1–9', 'A equipe durante AXIS e Secret Wars.')
        ])
      ]),
      section('return', 'Retorno à investigação', [
        run('Jessica Jones por Bendis e Gaydos', 'Novos segredos do passado ameaçam sua família e sua confiança.', [
          child('Vol. 1: Uncaged!', 'Jessica Jones (2016) #1–6.'),
          child('Vol. 2: The Secrets of Maria Hill', 'Jessica Jones #7–12.'),
          child('Vol. 3: Return of the Purple Man', 'Jessica Jones #13–18.'),
          child('Defenders Vols. 1–2', 'Jessica, Luke, Matt e Danny contra Diamondback e Rei do Crime.')
        ]),
        run('Blind Spot, Purple Daughter e Variants', 'Kelly Thompson assume os mistérios de Alias Investigations.', [
          child('Jessica Jones: Blind Spot', 'Jessica Jones Digital Original #1–6.'),
          child('Jessica Jones: Purple Daughter', 'Jessica Jones Digital Original #7–9.'),
          child('The Variants #1–5', 'Jessica encontra versões alternativas de si mesma.'),
          child('Marvel’s Voices: Jessica Jones', 'Histórias curtas e casos recentes.')
        ])
      ])
    ]),

    order('defenders-reading-order', 'Marvel', 'Heróis urbanos', 'Defensores — Ordem de Leitura', 'https://www.comicbooktreasury.com/the-defenders-reading-order-marvel/', [
      section('nonteam', 'O “não-time” original', [
        run('Doutor Estranho, Hulk, Namor e Surfista', 'Heróis solitários se unem apenas quando nenhuma equipe convencional pode resolver o problema.', [
          child('Sub-Mariner #34–35 / Incredible Hulk #126', 'Prólogo dos Titans Three.'),
          child('Marvel Feature #1–3', 'Formação oficial dos Defensores.'),
          child('Defenders #1–6', 'Primeiras missões e entrada de Valquíria.'),
          child('Defenders #7–16 / Avengers #115–118', 'Avengers/Defenders War.'),
          child('Defenders #17–41 e Giant-Size #2–5', 'Luke Cage, Daimon Hellstrom e a fase de Steve Gerber.'),
          child('Defenders #42–91', 'Nebulon, Headmen e grandes elencos rotativos.')
        ]),
        run('Six-Fingered Hand e New Defenders', 'A equipe enfrenta o Inferno e depois assume uma formação mais convencional.', [
          child('Epic: The Six-Fingered Hand Saga', 'Defenders #92–109 e Marvel Team-Up #101.'),
          child('Defenders #110–125', 'Conclusão da era do não-time.'),
          child('Epic: The New Defenders', 'Defenders #126–137, Iceman #1–4 e Beauty and the Beast.'),
          child('Epic: The End of All Songs', 'Defenders #138–152 e Gargoyle #1–4.'),
          child('Return of the Defenders', 'Annuals de Hulk, Namor, Silver Surfer e Doctor Strange.')
        ])
      ]),
      section('revivals', 'Secret Defenders e retornos', [
        run('Secret Defenders', 'Doutor Estranho escolhe equipes diferentes para cada ameaça.', [
          child('Doctor Strange and the Secret Defenders', 'Secret Defenders #1–11.'),
          child('Thanos: Cosmic Powers', 'Secret Defenders #12–14 e Cosmic Powers #1–6.'),
          child('Deadpool and the Secret Defenders', 'Secret Defenders #15–25.'),
          child('Defenders (2001) #1–12', 'Reunião de Strange, Hulk, Namor e Surfista.'),
          child('The Order #1–6', 'Continuação direta com os fundadores corrompidos.'),
          child('Defenders: Indefensible #1–5', 'Reunião cômica de Giffen, DeMatteis e Maguire.')
        ]),
        run('Matt Fraction, Fearless e heróis urbanos', 'O nome Defensores ganha interpretações muito diferentes.', [
          child('Defenders by Matt Fraction Vol. 1', 'Defenders (2011) #1–6.'),
          child('Vol. 2', 'Defenders #7–12.'),
          child('Fearless Defenders Vol. 1: Doom Maidens', 'Fearless Defenders #1–6.'),
          child('Vol. 2: The Most Fabulous Fighting Team', 'Fearless Defenders #7–12.'),
          child('Defenders Vol. 1: Diamonds Are Forever', 'Defenders (2017) #1–5.'),
          child('Defenders Vol. 2: Kingpins of New York', 'Defenders #6–10.')
        ])
      ]),
      section('ewing', 'The Best Defense e Al Ewing', [
        run('Os Defensores cósmicos modernos', 'A equipe volta ao surrealismo e explora camadas ocultas do Multiverso Marvel.', [
          child('Defenders: The Best Defense', 'Especiais de Hulk, Namor, Silver Surfer, Doctor Strange e Defenders.'),
          child('Tarot: Avengers/Defenders #1–4', 'Uma aventura perdida da equipe clássica.'),
          child('Defenders: There Are No Rules #1–5', 'Al Ewing e Javier Rodríguez exploram a realidade anterior à atual.'),
          child('Defenders: Beyond #1–5', 'Blue Marvel lidera uma jornada além do multiverso.')
        ])
      ])
    ]),

    order('nova-reading-order', 'Marvel', 'Cosmos Marvel', 'Nova — Richard Rider e Sam Alexander', 'https://www.comicbooktreasury.com/nova-reading-order/', [
      section('richard', 'Richard Rider — o Foguete Humano', [
        run('Origem e New Warriors', 'Richard recebe o poder de Rhomann Dey e depois ajuda a fundar os Novos Guerreiros.', [
          child('Nova #1–12 (1976)', 'Origem, Condor, Diamondhead e os primeiros dias como herói.'),
          child('Nova #13–25', 'Sphinx, Xandar e conclusão da primeira série.'),
          child('Fantastic Four #204–214', 'Guerra por Xandar e perda dos poderes.'),
          child('Thor #411–412 / New Warriors #1', 'Richard recupera o poder e entra nos Novos Guerreiros.'),
          child('New Warriors #1–25', 'Primeiro grande ciclo da equipe.'),
          child('Nova (1994) #1–18', 'Nova carreira solo durante os anos 1990.')
        ]),
        run('Annihilation e a Tropa Nova', 'Richard se torna o último centurião e carrega a Mente Global de Xandar.', [
          child('Annihilation: Prologue #1', 'A Onda de Aniquilação destrói Xandar.'),
          child('Annihilation: Nova #1–4', 'Richard recebe todo o poder da Tropa.'),
          child('Annihilation #1–6', 'A guerra contra Annihilus.'),
          child('Nova Vol. 1: Annihilation — Conquest', 'Nova (2007) #1–7.'),
          child('Vol. 2: Knowhere', 'Nova #8–12 e Annual.'),
          child('Vol. 3: Secret Invasion', 'Nova #13–18.'),
          child('Vols. 4–6', 'Nova #19–36, War of Kings e Realm of Kings.'),
          child('The Thanos Imperative', 'A missão final de Richard e Star-Lord no Cancerverse.')
        ])
      ]),
      section('sam', 'Sam Alexander — o novo Nova', [
        run('Origem e aventuras solo', 'Sam encontra o capacete do pai e aprende a ser herói com os maiores nomes da Marvel.', [
          child('Nova Vol. 1: Origin', 'Nova (2013) #1–5 e Point One.'),
          child('Vol. 2: Rookie Season', 'Nova #6–10.'),
          child('Vol. 3: Nova Corpse', 'Nova #11–16.'),
          child('Vols. 4–6', 'Nova #17–31 e Annual.'),
          child('Nova (2015) Vol. 1: Burn Out', 'Nova #1–6.'),
          child('Vol. 2: Afterburn', 'Nova #7–11.')
        ]),
        run('Champions e encontro dos dois Novas', 'Sam amadurece na equipe enquanto Richard volta do Cancerverse.', [
          child('Champions Vol. 1: Change the World', 'Champions (2016) #1–6.'),
          child('Nova: Resurrection', 'Nova (2016) #1–7; Richard e Sam juntos.'),
          child('Champions Vols. 2–5', 'Sam permanece no núcleo da equipe.'),
          child('Champions (2019) #1–10', 'Mefisto e a perda do capacete.'),
          child('Annihilation: Scourge — Nova #1', 'Richard volta a defender a Zona Negativa.'),
          child('Guardians of the Galaxy (2020) #1–18', 'Richard atua com os Guardiões de Al Ewing.')
        ])
      ])
    ]),

    order('adam-warlock-reading-order', 'Marvel', 'Cosmos Marvel', 'Adam Warlock — Ordem de Leitura', 'https://www.comicbooktreasury.com/adam-warlock-reading-order/', [
      section('him', 'Him, Contra-Terra e a Joia da Alma', [
        run('Nascimento de Warlock', 'Uma criação perfeita do Enclave encontra propósito com o Alto Evolucionário.', [
          child('Fantastic Four #66–67', 'Nascimento de Him.'),
          child('Thor #165–166', 'Him enfrenta Thor e retorna ao casulo.'),
          child('Marvel Premiere #1–2', 'O Alto Evolucionário dá nome e missão a Warlock.'),
          child('Warlock #1–8', 'A saga da Contra-Terra.'),
          child('Incredible Hulk #176–178', 'Conclusão do primeiro ciclo de Warlock.')
        ]),
        run('Adam Warlock por Jim Starlin', 'Magus, Igreja Universal da Verdade, Gamora, Thanos e a morte de Warlock.', [
          child('Strange Tales #178–181', 'Warlock encontra Pip, Gamora e o Magus.'),
          child('Warlock #9–15', 'Confronto com seu futuro tirânico.'),
          child('Avengers Annual #7', 'Thanos usa as Joias do Infinito.'),
          child('Marvel Two-in-One Annual #2', 'Homem-Aranha e Coisa ajudam no confronto final.'),
          child('Warlock by Jim Starlin Complete Collection', 'Todo o arco reunido em um volume.')
        ])
      ]),
      section('infinity', 'Infinity Watch e as sagas do Infinito', [
        run('O retorno de Adam', 'Warlock lidera os heróis contra Thanos e divide as Joias entre aliados.', [
          child('Silver Surfer: Rebirth of Thanos', 'Silver Surfer #34–38 e Thanos Quest #1–2.'),
          child('Infinity Gauntlet #1–6', 'Adam conduz a resistência cósmica.'),
          child('Warlock and the Infinity Watch #1–10', 'Formação da Guarda do Infinito.'),
          child('Infinity War #1–6', 'O Magus retorna.'),
          child('Infinity Watch #11–17', 'Consequências da guerra.'),
          child('Infinity Crusade #1–6', 'A Deusa divide os heróis.'),
          child('Infinity Watch #18–42', 'Conclusão da série e dispersão da equipe.')
        ]),
        run('Starlin retorna ao cosmos', 'Thanos e Warlock atravessam novos dilemas de poder e realidade.', [
          child('Infinity Abyss #1–6', 'Clones de Thanos ameaçam o universo.'),
          child('Marvel Universe: The End #1–6', 'Thanos enfrenta o coração do universo.'),
          child('Thanos #1–12: Redemption', 'Starlin redefine a busca de Thanos.'),
          child('Infinity Revelation', 'Graphic novel de Starlin.'),
          child('Infinity Relativity', 'Segundo capítulo da trilogia gráfica.'),
          child('Infinity Finale', 'Conclusão da trilogia.')
        ])
      ]),
      section('modern', 'Annihilation: Conquest e Guardiões', [
        run('Tecnômago e o retorno do Magus', 'Adam renasce, ajuda a derrotar Ultron e entra nos Guardiões.', [
          child('Annihilation: Conquest — Quasar #1–4', 'Retorno de Warlock.'),
          child('Annihilation: Conquest #1–6', 'Adam atua como tecnômago.'),
          child('Guardians of the Galaxy #1–12 (2008)', 'Primeiro ano na equipe moderna.'),
          child('Guardians #13–19', 'War of Kings e ascensão do Magus.'),
          child('Guardians #20–25 / Thanos Imperative', 'Conclusão do conflito com o Cancerverse.')
        ]),
        run('Infinity Countdown e histórias recentes', 'Adam volta ao tabuleiro das Joias e encontra novas versões de si mesmo.', [
          child('Infinity Countdown: Adam Warlock #1', 'O retorno antes de Infinity Wars.'),
          child('Infinity Countdown #1–5', 'Busca pelas Joias.'),
          child('Infinity Wars #1–6', 'Gamora dobra o universo.'),
          child('Warlock: Rebirth #1–5', 'Nova aventura ambientada no passado.'),
          child('Warlock: The Last Hunt #1–4', 'História cósmica recente.')
        ])
      ])
    ]),

    order('thanos-reading-order', 'Marvel', 'Cosmos Marvel', 'Thanos — Ordem de Leitura', 'https://www.comicbooktreasury.com/thanos-reading-order/', [
      section('starlin', 'Jim Starlin e o Titã Louco', [
        run('A primeira saga de Thanos', 'O Titã busca poder cósmico e encontra Capitão Marvel e Adam Warlock.', [
          child('Iron Man #55', 'Primeira aparição de Thanos e Drax.'),
          child('Captain Marvel #25–34', 'A Guerra de Thanos e o Cubo Cósmico.'),
          child('Strange Tales #178–181', 'Thanos entra na saga de Warlock.'),
          child('Warlock #9–15', 'A aliança contra Magus.'),
          child('Avengers Annual #7', 'Thanos tenta extinguir as estrelas.'),
          child('Marvel Two-in-One Annual #2', 'Conclusão e primeira morte de Thanos.'),
          child('The Death of Captain Marvel', 'Graphic novel central para o legado de Mar-Vell e Thanos.')
        ]),
        run('A Trilogia do Infinito', 'Thanos reúne as Joias e muda o Universo Marvel.', [
          child('Silver Surfer #34–38', 'Ressurreição de Thanos.'),
          child('Thanos Quest #1–2', 'Conquista das seis Joias.'),
          child('Infinity Gauntlet #1–6', 'Thanos torna-se onipotente.'),
          child('Infinity War #1–6', 'Magus ameaça a realidade.'),
          child('Infinity Crusade #1–6', 'A Deusa inicia sua cruzada.'),
          child('Warlock and the Infinity Watch #1–42', 'História paralela e consequências.')
        ])
      ]),
      section('modern', 'Do Abismo à Aniquilação', [
        run('Thanos: Redemption', 'Starlin revisita o personagem antes do renascimento cósmico da Marvel.', [
          child('Infinity Abyss #1–6', 'Clones defeituosos de Thanos.'),
          child('Marvel Universe: The End #1–6', 'O coração do universo.'),
          child('Thanos #1–6: Epiphany', 'Thanos tenta reparar um erro cósmico.'),
          child('Thanos #7–12: Samaritan', 'Conclusão da série de Starlin e Giffen.'),
          child('Annihilation: Prologue', 'Thanos negocia com Annihilus.'),
          child('Annihilation #1–6', 'Thanos e a Onda de Aniquilação.')
        ]),
        run('Thanos Imperative e Infinity', 'O Titã retorna, invade a Terra e colide com os Illuminati.', [
          child('Guardians of the Galaxy #20–25', 'O retorno de Thanos.'),
          child('The Thanos Imperative #1–6', 'Guerra contra o Cancerverse.'),
          child('Avengers Assemble #1–8', 'Thanos volta a atacar a Terra.'),
          child('Infinity #1–6', 'A invasão enquanto os Vingadores estão no espaço.'),
          child('New Avengers #8–12', 'Thanos e as incursões.'),
          child('Thanos: A God Up There Listening #1–4', 'Thane e o legado do pai.')
        ])
      ]),
      section('cates', 'Lemire, Donny Cates e além', [
        run('Thanos (2016)', 'Thanos luta contra a morte, o filho Thane e seu próprio futuro.', [
          child('Vol. 1: Thanos Returns', 'Thanos (2016) #1–6.'),
          child('Vol. 2: The God Quarry', 'Thanos #7–12.'),
          child('Vol. 3: Thanos Wins', 'Thanos #13–18.'),
          child('Thanos Annual #1', 'Histórias do Titã durante a fase.'),
          child('Cosmic Ghost Rider #1–5', 'Frank Castle foge do futuro de King Thanos.')
        ]),
        run('Zero Sanctuary e o retorno do Titã', 'Gamora, os Eternos e os Illuminati lidam com a sombra de Thanos.', [
          child('Thanos: Zero Sanctuary', 'Thanos (2019) #1–6.'),
          child('Guardians of the Galaxy by Donny Cates', 'Consequências da morte de Thanos.'),
          child('Eternals Vol. 1: Only Death Is Eternal', 'Eternals (2021) #1–6.'),
          child('Eternals Vol. 2: Hail Thanos', 'Eternals #7–12.'),
          child('Thanos: Return of the Mad Titan', 'Thanos (2023) #1–4.'),
          child('Phoenix Vol. 2: Cosmic Ascent', 'Phoenix #6–10; Jean enfrenta Thanos.')
        ])
      ])
    ]),

    order('x-force-reading-order', 'Marvel', 'X-Men', 'X-Force — Ordem de Leitura', 'https://www.comicbooktreasury.com/x-force-reading-order/', [
      section('original', 'A equipe original de Cable', [
        run('Dos Novos Mutantes à X-Force', 'Cable transforma os alunos de Xavier em uma força de ataque preventiva.', [
          child('New Mutants #98–100', 'Deadpool, Feral, Shatterstar e transição da equipe.'),
          child('Epic: Under the Gun', 'X-Force (1991) #1–15, Annual e participações.'),
          child('Epic: X-Cutioner’s Song', 'X-Force #16–19 e todo o crossover.'),
          child('Epic: Assault on Graymalkin', 'X-Force #20–26, Cable #1–4 e Deadpool #1–4.'),
          child('Epic: Toy Soldiers', 'X-Force #27–39 e material relacionado.'),
          child('Epic: Starting Over', 'X-Force #40–56 e Annual de Cable/X-Force.')
        ]),
        run('De Zero Tolerance a Counter-X', 'A equipe ganha independência e muda de uma família improvisada para operações secretas.', [
          child('Epic: Zero Tolerance', 'X-Force #66–84 e #-1.'),
          child('Epic: Armageddon Now', 'X-Force #85–100 e Annuals.'),
          child('X-Men: Powerless', 'X-Force #101 e títulos relacionados.'),
          child('Counter-X Vol. 1: X-Force', 'X-Force #102–109.'),
          child('Counter-X: Rage War', 'X-Force #110–115.'),
          child('X-Statix Omnibus', 'X-Force #116–129 e X-Statix #1–26; reinvenção completa da equipe.')
        ])
      ]),
      section('killteam', 'Kyle/Yost e Uncanny X-Force', [
        run('A equipe secreta de Ciclope', 'Wolverine lidera missões letais que os X-Men não podem admitir.', [
          child('X-Force Vol. 1: Angels and Demons', 'X-Force (2008) #1–6.'),
          child('Vol. 2: Old Ghosts', 'X-Force #7–11.'),
          child('Messiah War', 'X-Force #14–16, Cable #13–15 e especial.'),
          child('Vol. 3: Not Forgotten', 'X-Force #12–13 e #17–20.'),
          child('X-Necrosha', 'X-Force #21–25 e tie-ins.'),
          child('Second Coming', 'X-Force #26–28 e crossover; fim da equipe secreta.')
        ]),
        run('Uncanny X-Force por Rick Remender', 'Wolverine, Psylocke, Fantomex, Archangel e Deadpool enfrentam Apocalipse.', [
          child('The Apocalypse Solution', 'Uncanny X-Force #1–4.'),
          child('Deathlok Nation', 'Uncanny X-Force #5–7 e #5.1.'),
          child('Dark Angel Saga Book 1', 'Uncanny X-Force #8–13.'),
          child('Dark Angel Saga Book 2', 'Uncanny X-Force #14–19.'),
          child('Otherworld', 'Uncanny X-Force #20–24.'),
          child('Final Execution Books 1–2', 'Uncanny X-Force #25–35.')
        ])
      ]),
      section('modern', 'Marvel NOW, Krakoa e Shadows of Tomorrow', [
        run('Novas formações antes de Krakoa', 'Psylocke, Cable e outros líderes reorganizam a missão da X-Force.', [
          child('Uncanny X-Force (2013) Vols. 1–3', 'Uncanny X-Force #1–17.'),
          child('Cable and X-Force Vols. 1–4', 'Cable and X-Force #1–19.'),
          child('X-Force (2014) Vols. 1–3', 'X-Force #1–15.'),
          child('X-Force (2018) Vols. 1–2', 'X-Force #1–10.')
        ]),
        run('A CIA de Krakoa', 'Fera comanda inteligência e operações de campo da nação mutante.', [
          child('X-Force Vol. 1: Sins of the Past', 'X-Force (2019) #1–6.'),
          child('Vol. 2: The Counterfeit King', 'X-Force #7–12.'),
          child('Vols. 3–5', 'X-Force #13–26, X of Swords e Hellfire Gala.'),
          child('Vols. 6–8', 'X-Force #27–42 e eventos de Krakoa.'),
          child('Vols. 9–10', 'X-Force #43–50 e conclusão.')
        ]),
        run('Depois de Krakoa', 'Forge monta uma equipe para missões impossíveis e versões mais agressivas surgem.', [
          child('X-Force Vol. 1: Fractures', 'X-Force (2024) #1–5.'),
          child('X-Force Vol. 2', 'X-Force #6–10.'),
          child('Inglorious X-Force #1 em diante', 'Nova equipe na fase Shadows of Tomorrow.')
        ])
      ])
    ]),

    order('cable-reading-order', 'Marvel', 'X-Men', 'Cable — Ordem de Leitura', 'https://www.comicbooktreasury.com/cable-reading-order/', [
      section('origin', 'Nathan Summers e o futuro de Askani', [
        run('O filho de Ciclope', 'Nathan nasce, é infectado e enviado ao futuro para sobreviver.', [
          child('Uncanny X-Men #201', 'Nascimento de Nathan Summers.'),
          child('X-Factor #65–68', 'Apocalipse infecta Nathan e ele parte para o futuro.'),
          child('Adventures of Cyclops and Phoenix #1–4', 'Scott e Jean criam Nathan em Askani.'),
          child('Askani’son #1–4', 'Nathan cresce e enfrenta Apocalipse.'),
          child('Further Adventures of Cyclops and Phoenix #1–4', 'Origens de Sinistro e Apocalipse.'),
          child('Cable #-1', 'A vida do jovem Nathan no futuro.')
        ]),
        run('Cable, X-Force e Stryfe', 'O soldado volta ao passado e transforma os Novos Mutantes.', [
          child('New Mutants #86–100', 'Cable assume a equipe.'),
          child('X-Force #1–15', 'Primeiro ciclo da força de ataque.'),
          child('Cable: Blood and Metal #1–2', 'Cable e Stryfe em conflito direto.'),
          child('X-Cutioner’s Song', 'Revelações sobre Cable, Stryfe e a família Summers.'),
          child('Cable #1–8 (1993)', 'Início da primeira série regular.'),
          child('Cable #9–20', 'O passado de Nathan e o Clã Askani.')
        ])
      ]),
      section('solo', 'A longa série solo e Cable & Deadpool', [
        run('Cable (1993–2002)', 'Nathan equilibra guerra futura, família Summers e liderança mutante.', [
          child('Cable Classic Vols. 1–3', 'Cable #1–20 e especiais iniciais.'),
          child('Cable #21–39', 'Gene Nation, Onslaught e Hellfire Club.'),
          child('Cable #40–58', 'Operação Zero Tolerance e consequências.'),
          child('Cable #59–78', 'Hellfire Hunt, Revolution e destino de Rachel.'),
          child('Cable #79–96', 'Busca por Apocalipse e transição para Soldier X.'),
          child('Soldier X #1–12', 'Cable como figura messiânica global.')
        ]),
        run('Cable & Deadpool', 'Nathan tenta mudar o mundo enquanto Wade destrói seus planos e vira amigo.', [
          child('Ultimate Collection Vol. 1', 'Cable & Deadpool #1–18.'),
          child('Ultimate Collection Vol. 2', 'Cable & Deadpool #19–35.'),
          child('Ultimate Collection Vol. 3', 'Cable & Deadpool #36–50 e especial.'),
          child('X-Men: Supernovas', 'Cable aparece em X-Men #188–199 antes de Messiah Complex.')
        ])
      ]),
      section('hope', 'Messiah Trilogy, jovem Cable e Krakoa', [
        run('Cable e Hope Summers', 'Nathan protege a primeira criança mutante após M-Day através do tempo.', [
          child('Messiah Complex', 'Cable foge com Hope.'),
          child('Cable Vol. 1: Messiah War', 'Cable (2008) #1–5.'),
          child('Vols. 2–3', 'Cable #6–15 e Messiah War.'),
          child('Vol. 4: Homecoming', 'Cable #16–20.'),
          child('X-Men: Second Coming', 'Cable leva Hope de volta ao presente.'),
          child('Avengers: X-Sanction #1–4', 'Nathan volta antes de AvX.')
        ]),
        run('Cable and X-Force e a fase de Gerry Duggan', 'Visões do futuro colocam Cable novamente no comando de uma equipe procurada.', [
          child('Cable and X-Force Vols. 1–4', 'Cable and X-Force #1–19.'),
          child('Cable Vol. 1: Conquest', 'Cable (2017) #1–5.'),
          child('Cable Vol. 2: The Newer Mutants', 'Cable #150–154.'),
          child('Cable Vol. 3: Past Fears', 'Cable #155–159.'),
          child('Extermination #1–5', 'Um Cable jovem mata sua versão mais velha.')
        ]),
        run('Kid Cable e Krakoa', 'A versão jovem vive com a família Summers e protege a linha temporal.', [
          child('Cable Vol. 1: Revolution', 'Cable (2020) #1–4.'),
          child('X of Swords', 'Cable porta a espada Luz de Galador.'),
          child('Cable Vol. 2: The End of the Beginning', 'Cable #5–12.'),
          child('Cable Reloaded #1', 'O Cable adulto retorna durante Last Annihilation.'),
          child('Cable (2024) #1–4', 'Nathan e Kid Cable atuam juntos.')
        ])
      ])
    ]),

    order('gambit-rogue-reading-order', 'Marvel', 'X-Men', 'Gambit e Vampira — Ordem de Leitura', 'https://www.comicbooktreasury.com/gambit-reading-order/', [
      section('beginnings', 'Primeiros anos e o romance dos X-Men', [
        run('Vampira — da Irmandade aos X-Men', 'Anna Marie busca ajuda para controlar seus poderes e muda de lado.', [
          child('Avengers Annual #10', 'Primeira aparição e roubo dos poderes de Carol Danvers.'),
          child('Dazzler #22–28', 'Vampira atua com a Irmandade.'),
          child('Uncanny X-Men #171', 'Vampira pede ajuda a Xavier.'),
          child('Uncanny X-Men #172–185', 'Primeiras missões com a equipe.'),
          child('Uncanny X-Men #218–247', 'Savage Land, Genosha e fase australiana.'),
          child('Rogue #1–4 (1995)', 'Primeira minissérie solo.')
        ]),
        run('Gambit entra em cena', 'Remy LeBeau encontra Tempestade e leva segredos dos Carrascos para os X-Men.', [
          child('Uncanny X-Men #265–267', 'Primeira aparição e encontro com Tempestade.'),
          child('X-Tinction Agenda', 'Primeira grande missão com as equipes X.'),
          child('X-Men #1–11 (1991)', 'Gambit e Vampira aproximam-se na Equipe Azul.'),
          child('Gambit #1–4 (1993)', 'Guildas de Ladrões e Assassinos.'),
          child('X-Men #24', 'Primeiro encontro romântico decisivo.'),
          child('Rogue #1–4 / Gambit #1–4 (1997)', 'Passados dos dois vêm à tona.')
        ])
      ]),
      section('trials', 'Traições, separações e séries solo', [
        run('O julgamento de Gambit', 'O segredo do Massacre de Mutantes rompe a confiança entre Remy e Anna.', [
          child('Uncanny X-Men #341–350', 'Caminho para o julgamento.'),
          child('X-Men #62–64', 'Conflitos com Bastion e preparação.'),
          child('The Trial of Gambit', 'Coleção completa do arco na Antártida.'),
          child('Gambit (1999) #1–11', 'Remy investiga a Nova Guilda.'),
          child('Gambit (1999) #12–25', 'New Son e conclusão da série.'),
          child('X-Treme X-Men #1–19', 'Gambit e Vampira deixam a equipe principal.')
        ]),
        run('Carreiras separadas', 'Cada um busca identidade longe do relacionamento.', [
          child('Rogue (2004) Vols. 1–3', 'Rogue #1–12.'),
          child('Gambit (2004) #1–12', 'Nova série solo de Remy.'),
          child('X-Men: Legacy #220–275', 'Vampira aprende a controlar os poderes e orienta jovens mutantes.'),
          child('Gambit: King of Thieves', 'Gambit (2012) #1–17.'),
          child('All-New X-Factor #1–20', 'Gambit integra a equipe corporativa de Polaris.'),
          child('Uncanny Avengers (2015) #1–23', 'Vampira lidera a Unity Squad.')
        ])
      ]),
      section('marriage', 'Rogue & Gambit, casamento e Krakoa', [
        run('Ring of Fire e Mr. & Mrs. X', 'O casal enfrenta o passado, casa-se e leva a lua de mel ao espaço.', [
          child('Rogue & Gambit #1–5: Ring of Fire', 'Terapia de casal em uma ilha perigosa.'),
          child('X-Men Gold #25–30', 'Preparação e casamento improvisado.'),
          child('Mr. & Mrs. X Vol. 1: Love and Marriage', 'Mr. & Mrs. X #1–6.'),
          child('Vol. 2: Gambit and Rogue Forever', 'Mr. & Mrs. X #7–12.')
        ]),
        run('Excalibur, Dark X-Men e From the Ashes', 'Remy e Anna atravessam Krakoa e voltam a liderar mutantes no sul dos EUA.', [
          child('Excalibur by Tini Howard Vols. 1–4', 'Excalibur (2019) #1–26.'),
          child('Knights of X #1–5', 'Gambit permanece no Outro Mundo.'),
          child('Rogue & Gambit: Power Play #1–5', 'Missão conjugal para Destino e Mística.'),
          child('Dark X-Men #1–5', 'Gambit atua durante Fall of X.'),
          child('Uncanny X-Men (2024) Vol. 1', 'Rogue lidera a equipe em Louisiana.'),
          child('Uncanny X-Men (2024) Vol. 2', 'Gambit, Vampira e os Outliers continuam a luta.')
        ])
      ])
    ]),

    order('psylocke-reading-order', 'Marvel', 'X-Men', 'Psylocke — Betsy Braddock e Kwannon', 'https://www.comicbooktreasury.com/psylocke-reading-order/', [
      section('betsy', 'Betsy Braddock antes e durante os X-Men', [
        run('Capitão Britânia e entrada nos X-Men', 'Betsy desenvolve telepatia, enfrenta Mojo e ganha o nome Psylocke.', [
          child('Captain Britain #8–39 (1976)', 'Primeiras aparições de Betsy e a família Braddock.'),
          child('Daredevils #1–11 / Captain Britain (1985) #1–14', 'STRIKE, Slaymaster e o primeiro período como Capitão Britânia.'),
          child('New Mutants Annual #2', 'Betsy recebe o nome Psylocke.'),
          child('Uncanny X-Men Annual #11', 'Primeira grande aventura com os X-Men.'),
          child('Uncanny X-Men #213–238', 'Betsy entra na equipe e enfrenta o Massacre de Mutantes.'),
          child('Uncanny X-Men #239–251', 'Inferno e o Portal do Destino.')
        ]),
        run('Lady Mandarin e a era Azul', 'Betsy emerge no corpo de Kwannon e torna-se uma guerreira ninja.', [
          child('Uncanny X-Men #255–258', 'Transformação e identidade Lady Mandarin.'),
          child('Uncanny X-Men #261 e #268', 'Missões com Wolverine e Jubileu.'),
          child('X-Men #1–11 (1991)', 'Psylocke integra a Equipe Azul.'),
          child('X-Men #20–23', 'Revanche e a revelação de Kwannon.'),
          child('Psylocke & Archangel: Crimson Dawn #1–4', 'Betsy recebe a marca da Crimson Dawn.'),
          child('X-Men: Psylocke #1–4', 'Acerto de contas com Matsu’o.')
        ])
      ]),
      section('xforce', 'Morte, retorno e X-Force', [
        run('Ressurreição e Exiles', 'Betsy volta à vida, atravessa realidades e retorna ao seu universo.', [
          child('Uncanny X-Men #455–460', 'Retorno de Psylocke.'),
          child('New Excalibur #1–7', 'Reunião com Brian Braddock.'),
          child('Exiles #90–100', 'Betsy integra os Exilados.'),
          child('New Exiles #1–18 e Annual', 'Viagens multiversais.'),
          child('Uncanny X-Men #508–512: Sisterhood', 'Retorno ao universo principal.'),
          child('Psylocke #1–4', 'Conclusão da história com Matsu’o.')
        ]),
        run('Uncanny X-Force e equipes seguintes', 'Betsy assume o peso moral das missões letais.', [
          child('Uncanny X-Force: Apocalypse Solution', 'Uncanny X-Force #1–4.'),
          child('Dark Angel Saga Books 1–2', 'Uncanny X-Force #8–19.'),
          child('Otherworld / Final Execution', 'Uncanny X-Force #20–35.'),
          child('Uncanny X-Force (2013) #1–17', 'Betsy lidera nova formação.'),
          child('X-Force (2014) #1–15', 'Operações com Cable.'),
          child('Uncanny X-Men (2016) #1–19', 'Equipe de Magneto.')
        ])
      ]),
      section('separated', 'Betsy e Kwannon separadas', [
        run('Betsy como Capitão Britânia', 'Betsy recupera o próprio corpo e assume o manto do irmão em Krakoa.', [
          child('Hunt for Wolverine: Mystery in Madripoor #1–4', 'Betsy recupera sua forma original.'),
          child('Excalibur Vol. 1: The Accolade', 'Excalibur (2019) #1–6.'),
          child('Excalibur Vols. 2–4', 'Excalibur #7–26 e X of Swords.'),
          child('Knights of X #1–5', 'Betsy protege o Outro Mundo.'),
          child('Betsy Braddock: Captain Britain #1–5', 'Betsy defende o manto e sua relação com Rachel.')
        ]),
        run('Kwannon assume Psylocke', 'A verdadeira Kwannon reconstrói sua vida, lidera os Hellions e ganha série solo.', [
          child('Fallen Angels #1–6', 'Kwannon investiga Apoth.'),
          child('Hellions Vol. 1', 'Hellions #1–6.'),
          child('Hellions Vol. 2', 'Hellions #7–12.'),
          child('Hellions Vol. 3', 'Hellions #13–18.'),
          child('Marauders (2022) #1–12', 'Kwannon entra na tripulação de Kate Pryde.'),
          child('Uncanny Avengers (2023) #1–5', 'Unity Squad durante Fall of X.'),
          child('Psylocke Vol. 1', 'Psylocke (2024) #1–5.'),
          child('Psylocke Vol. 2', 'Psylocke #6–10.')
        ])
      ])
    ]),

    order('silk-reading-order', 'Marvel', 'Homem-Aranha', 'Silk — Cindy Moon', 'https://www.comicbooktreasury.com/silk-comics-reading-order/', [
      section('origin', 'O bunker, Spider-Verse e a primeira série', [
        run('Origem de Cindy Moon', 'Picada pela mesma aranha de Peter, Cindy passa anos escondida de Morlun.', [
          child('Amazing Spider-Man #1 (2014)', 'Primeira aparição de Cindy.'),
          child('Amazing Spider-Man #4–6', 'Peter liberta Cindy do bunker.'),
          child('Amazing Spider-Man #7–8', 'Cindy conhece Ms. Marvel e o multiverso Aranha se aproxima.'),
          child('Spider-Verse', 'Evento completo com Cindy no centro da profecia.'),
          child('Silk Vol. 0: The Life and Times of Cindy Moon', 'Silk (2015) #1–7.')
        ]),
        run('Silk (2015) e a busca pela família', 'Cindy trabalha infiltrada e procura os pais desaparecidos.', [
          child('Vol. 1: Sinister', 'Silk (2015B) #1–6.'),
          child('Spider-Women Alpha', 'Início do crossover com Jessica Drew e Gwen Stacy.'),
          child('Spider-Women — Silk #7–8', 'Capítulos de Cindy no crossover.'),
          child('Vol. 2: The Negative', 'Silk #9–13.'),
          child('Clone Conspiracy — Silk #14–17', 'Cindy investiga a New U.'),
          child('Vol. 3: The Clone Conspiracy', 'Conclusão da primeira era solo.')
        ])
      ]),
      section('atlas', 'Agents of Atlas e retorno solo', [
        run('The Protectors e Agents of Atlas', 'Cindy se conecta a outros heróis asiático-americanos.', [
          child('Totally Awesome Hulk #15–18', 'Formação dos Protectors.'),
          child('Ghost Rider (2017) #3–5', 'Silk, Amadeus Cho e X-23 encontram Robbie Reyes.'),
          child('War of the Realms: New Agents of Atlas #1–4', 'A equipe protege a Ásia.'),
          child('Agents of Atlas #1–5', 'Pan e a nova cidade portal.'),
          child('Atlantis Attacks #1–5', 'Conflito com Namor e Atlântida.')
        ]),
        run('Minisséries anuais de Silk', 'Cindy trabalha como repórter e enfrenta ameaças místicas e sonhos assassinos.', [
          child('Vol. 1: Threats and Menaces', 'Silk (2021) #1–5.'),
          child('Vol. 2: Age of the Witch', 'Silk (2022) #1–5.'),
          child('End of the Spider-Verse', 'Spider-Man (2022) #1–7.'),
          child('Vol. 3: Nightmare Boulevard', 'Silk (2023) #1–5.'),
          child('Spider-Verse Unlimited #49–53', 'Equipe com Peter, Miles, Gwen e Madame Web.')
        ])
      ])
    ]),

    order('scarlet-spiders-reading-order', 'Marvel', 'Homem-Aranha', 'Aranhas Escarlates — Ben Reilly e Kaine', 'https://www.comicbooktreasury.com/ben-reilly-reading-order/', [
      section('clone', 'A Saga do Clone', [
        run('Ben Reilly retorna', 'O clone de Peter volta a Nova York e assume a identidade Aranha Escarlate.', [
          child('Amazing Spider-Man #149', 'Criação e aparente morte do clone.'),
          child('Spider-Man: The Lost Years #1–3', 'Os anos de exílio de Ben.'),
          child('Clone Saga Omnibus Vol. 1', 'Web #117–125, ASM #394–401, Spider-Man #51–58 e Spectacular #217–224.'),
          child('Clone Saga Omnibus Vol. 2', 'ASM #402–406 e séries paralelas até Maximum Clonage.'),
          child('The Parker Years #1', 'Resumo e transição para Ben como Homem-Aranha.')
        ]),
        run('Ben Reilly como Homem-Aranha', 'Peter se afasta e Ben protege Nova York com seu próprio estilo.', [
          child('Ben Reilly Omnibus Vol. 1', 'Séries Scarlet Spider e títulos Aranha até ASM #410.'),
          child('Sensational Spider-Man #0–11', 'A principal série de Ben como Homem-Aranha.'),
          child('Amazing Spider-Man #407–418', 'Grandes arcos paralelos.'),
          child('Spider-Man #64–75 / Spectacular #230–241', 'Continuação da era Ben Reilly.'),
          child('Spider-Man: Redemption #1–4', 'Ben e Janine Godbe.'),
          child('Revelations', 'Conclusão da Saga do Clone e destino de Ben.')
        ])
      ]),
      section('kaine', 'Kaine Parker — redenção em Houston', [
        run('Do clone defeituoso ao novo Aranha Escarlate', 'Kaine supera a degeneração, recebe poderes renovados e tenta ser herói.', [
          child('Spider-Man: The Lost Years', 'Primeiras aparições de Kaine.'),
          child('Grim Hunt', 'Amazing Spider-Man #634–637 e ressurreição de Kraven.'),
          child('Spider-Island', 'Kaine é curado e recebe nova chance.'),
          child('Scarlet Spider Vol. 1: Life After Death', 'Scarlet Spider (2012) #1–6.'),
          child('Vol. 2: Lone Star', 'Scarlet Spider #7–9 e #12.1.'),
          child('Minimum Carnage', 'Scarlet Spider #10–11 e Venom #26–27.'),
          child('Vols. 3–4', 'Scarlet Spider #13–25.')
        ]),
        run('New Warriors e Spider-Verse', 'Kaine encontra outros heróis-aranha e enfrenta os Herdeiros.', [
          child('New Warriors Vol. 1: The Kids Are All Fight', 'New Warriors (2014) #1–6.'),
          child('New Warriors Vol. 2: Always and Forever', 'New Warriors #7–12.'),
          child('Scarlet Spiders #1–3', 'Kaine, Ben alternativo e Jessica Drew Ultimate.'),
          child('Spider-Verse', 'Evento principal e destino da equipe.')
        ])
      ]),
      section('return', 'Clone Conspiracy, Beyond e Chasm', [
        run('Ben Reilly volta à vida', 'O antigo clone retorna como Chacal e depois tenta redenção em Las Vegas.', [
          child('The Clone Conspiracy #1–5', 'Ben como o novo Chacal.'),
          child('Clone Conspiracy: Omega #1', 'Ponte para a série solo.'),
          child('Ben Reilly: Scarlet Spider Vol. 1', 'Ben Reilly #1–5.'),
          child('Vol. 2: Death’s Sting', 'Ben Reilly #6–9.'),
          child('Vol. 3: Slingers Return', 'Ben Reilly #10–14.'),
          child('Vol. 4: Damnation', 'Ben Reilly #15–19.'),
          child('Vol. 5: Deal with the Devil', 'Ben Reilly #20–25.')
        ]),
        run('Spider-Man Beyond, Dark Web e Chasm', 'Ben volta como Homem-Aranha corporativo e perde suas memórias.', [
          child('Ben Reilly: Spider-Man #1–5', 'História ambientada na primeira época como Aranha.'),
          child('Amazing Spider-Man: Beyond Vols. 1–4', 'Amazing Spider-Man #75–93 e especiais.'),
          child('Dark Web #1 / Amazing Spider-Man #14–18', 'Ben assume a identidade Chasm.'),
          child('Dark Web: X-Men #1–3', 'Madelyne Pryor e Chasm atacam Nova York.'),
          child('Dark Web Finale #1', 'Conclusão do evento.'),
          child('Chasm: Curse of Kaine #1–4', 'Ben e Kaine voltam a se enfrentar.')
        ])
      ])
    ]),

    order('morbius-reading-order', 'Marvel', 'Lado sobrenatural', 'Morbius — O Vampiro Vivo', 'https://www.comicbooktreasury.com/marvel-morbius-reading-order/', [
      section('classic', 'Ciência, sangue e horror Marvel', [
        run('O Vampiro Vivo', 'Michael Morbius tenta curar uma doença rara e transforma-se em um predador trágico.', [
          child('Amazing Spider-Man #101–102', 'Primeira aparição de Morbius.'),
          child('Marvel Team-Up #3–4', 'Homem-Aranha e X-Men enfrentam o Vampiro Vivo.'),
          child('Adventure into Fear #20–26', 'Primeiras aventuras solo.'),
          child('Adventure into Fear #27–31', 'Conclusão da fase e ameaças sobrenaturais.'),
          child('Vampire Tales #1–11 — histórias de Morbius', 'Contos adultos em preto e branco.'),
          child('Spectacular Spider-Man #6–8 e #38', 'Encontros posteriores com Peter Parker.')
        ]),
        run('Vampiric Verses e Midnight Sons', 'Morbius se aproxima do lado místico e vira peça central da linha de horror dos anos 1990.', [
          child('Doctor Strange: Sorcerer Supreme #10–11', 'Morbius busca ajuda mística.'),
          child('The Vampiric Verses — Doctor Strange #14–18 e #20', 'Guerra contra vampiros.'),
          child('Rise of the Midnight Sons', 'Morbius #1, Ghost Rider, Darkhold e Nightstalkers.'),
          child('Morbius: The Living Vampire #1–12 (1992)', 'Primeiro ano da série dos anos 1990.'),
          child('Midnight Massacre', 'Morbius #12 e capítulos paralelos.'),
          child('Morbius #13–32 / Siege of Darkness', 'Conclusão da série e dos grandes crossovers.')
        ])
      ]),
      section('modern', 'Legion of Monsters, séries solo e Blood Hunt', [
        run('Marvel Zombies e a Legião dos Monstros', 'Morbius lidera cientistas e monstros contra ameaças infecciosas.', [
          child('Marvel Zombies 3 #1–4', 'A.R.M.O.R. enfrenta a praga multiversal.'),
          child('Marvel Zombies 4 #1–4', 'Morbius reúne uma equipe de Midnight Sons.'),
          child('Punisher: Franken-Castle', 'Morbius ajuda a reconstruir Frank Castle.'),
          child('Legion of Monsters #1–4', 'Morbius, Werewolf by Night, Man-Thing e outros monstros.'),
          child('Amazing Spider-Man #688–691', 'Morbius tenta curar o Lagarto.')
        ]),
        run('O Homem Chamado Morbius e fases recentes', 'Michael tenta novamente recuperar a humanidade enquanto o mundo entra em guerras vampíricas.', [
          child('Morbius: The Man Called Morbius', 'Amazing Spider-Man #699.1 e Morbius (2013) #1–9.'),
          child('Absolute Carnage: Lethal Protectors #1–3', 'Morbius luta ao lado de outros anti-heróis.'),
          child('Morbius Vol. 1: Old Wounds', 'Morbius (2019) #1–5.'),
          child('Morbius: Bond of Blood #1', 'One-shot de 2021.'),
          child('Amazing Spider-Man: Beyond #77–78, #90 e #92', 'Morbius encontra Ben Reilly.'),
          child('Amazing Spider-Man: Blood Hunt #1–3', 'Morbius procura uma cura durante a noite eterna.')
        ])
      ])
    ]),

    order('teen-titans-reading-order', 'DC', 'Titãs', 'Titãs e Jovens Titãs — Ordem de Leitura', 'https://www.comicbooktreasury.com/teen-titans-reading-order/', [
      section('classic', 'Os parceiros se tornam uma equipe', [
        run('Teen Titans — Era de Prata e Bronze', 'Robin, Kid Flash, Aqualad, Wonder Girl e Speedy saem da sombra dos mentores.', [
          child('The Brave and the Bold #54', 'Primeiro encontro de Robin, Kid Flash e Aqualad.'),
          child('The Brave and the Bold #60 / Showcase #59', 'Wonder Girl entra e o nome Teen Titans surge.'),
          child('Teen Titans #1–12', 'Primeiras missões da equipe.'),
          child('Teen Titans #13–24', 'Novos integrantes e conflitos geracionais.'),
          child('Teen Titans #25–43', 'A equipe abandona temporariamente as identidades heroicas.'),
          child('Teen Titans #44–53', 'Renascimento da fase Bronze e encerramento da série.')
        ]),
        run('The New Teen Titans — Wolfman e Pérez', 'Raven reúne uma formação que define a equipe para sempre.', [
          child('New Teen Titans Vol. 1', 'DC Comics Presents #26 e New Teen Titans #1–8.'),
          child('Vol. 2', 'New Teen Titans #9–16.'),
          child('Vol. 3', 'New Teen Titans #17–20 e Tales #1–4.'),
          child('Vols. 4–5', 'New Teen Titans #21–34 e Annuals.'),
          child('The Judas Contract', 'New Teen Titans #35–40, Tales #41 e Annual #3.'),
          child('Tales of the Teen Titans #42–58', 'Consequências e novas ameaças.'),
          child('The Terror of Trigon', 'New Teen Titans (1984) #1–5.')
        ])
      ]),
      section('modern', 'Titãs modernos e Geoff Johns', [
        run('Titans, Arsenal e a geração original', 'Os antigos parceiros se reúnem como adultos.', [
          child('JLA/Titans #1–3', 'Technis e o retorno de Victor Stone.'),
          child('Titans #1–12 (1999)', 'Formação liderada por Arsenal.'),
          child('Titans #13–25', 'A equipe enfrenta Vandal Savage e Tartarus.'),
          child('Titans #26–38', 'Novos integrantes e conflitos internos.'),
          child('Titans #39–50', 'Conclusão da série.'),
          child('Titans/Young Justice: Graduation Day #1–3', 'Fim de duas equipes e ponte para Geoff Johns.')
        ]),
        run('Teen Titans por Geoff Johns', 'Cyborg, Mutano e Estelar orientam Robin, Superboy, Moça-Maravilha e Impulso.', [
          child('Vol. 1: A Kid’s Game', 'Teen Titans (2003) #1–7.'),
          child('Vol. 2: Family Lost', 'Teen Titans #8–12 e #1/2.'),
          child('Vol. 3: Beast Boys and Girls', 'Teen Titans #13–19.'),
          child('The Future Is Now', 'Teen Titans #17–19 e Legion #16.'),
          child('Life and Death', 'Teen Titans #29–33 e Annual.'),
          child('Titans Around the World', 'Teen Titans #34–41.'),
          child('Titans East', 'Teen Titans #43–46 e #50–54.')
        ])
      ]),
      section('reboots', 'New 52, Rebirth e Dawn of DC', [
        run('New 52', 'Tim Drake reúne uma nova geração durante um período de continuidade reiniciada.', [
          child('Vol. 1: It’s Our Right to Fight', 'Teen Titans (2011) #1–7.'),
          child('Vol. 2: The Culling', 'Teen Titans #8–14 e Legion Lost.'),
          child('Vols. 3–5', 'Teen Titans #0, #15–30 e Annuals.'),
          child('Teen Titans (2014) Vols. 1–4', 'Nova série até #24 e Annuals.')
        ]),
        run('Rebirth — Damian, Dick e duas equipes', 'Damian lidera adolescentes enquanto os Titãs originais recuperam sua história.', [
          child('Teen Titans Vol. 1: Damian Knows Best', 'Rebirth e Teen Titans #1–5.'),
          child('Teen Titans Vols. 2–5', 'Teen Titans #6–20 e especiais.'),
          child('Titans Vol. 1: The Return of Wally West', 'Titans: Rebirth e #1–6.'),
          child('Titans Vols. 2–6', 'Titans #7–36 e especiais.'),
          child('Teen Titans Vols. 6–8', 'A formação de Damian até #47 e Annuals.'),
          child('Teen Titans Academy Vols. 1–2', 'Academia dos Titãs e caminho para Dark Crisis.')
        ]),
        run('Titans por Tom Taylor', 'Com a Liga ausente, os Titãs tornam-se a principal equipe da Terra.', [
          child('Nightwing #100–104', 'Fundação da nova Torre em Blüdhaven.'),
          child('Titans Vol. 1: Out of the Shadows', 'Titans (2023) #1–5.'),
          child('Titans: Beast World', 'Evento central e tie-ins principais.'),
          child('Titans Vol. 2: The Dark-Winged Queen', 'Titans #6–11.'),
          child('Titans Vol. 3', 'Titans #12–18.'),
          child('Titans (All In) #19 em diante', 'Nova fase após Absolute Power.')
        ])
      ])
    ]),

    order('jsa-reading-order', 'DC', 'Sociedade da Justiça', 'Sociedade da Justiça — JSA', 'https://www.comicbooktreasury.com/jsa-reading-order-the-justice-society-of-america/', [
      section('legacy', 'Era de Ouro e legado pós-Crise', [
        run('A primeira equipe de super-heróis', 'Flash, Lanterna Verde, Gavião Negro, Doutor Destino e outros heróis fundam a JSA.', [
          child('All-Star Comics #3', 'Primeiro encontro da Sociedade da Justiça.'),
          child('All-Star Comics Archives Vols. 1–5', 'All-Star Comics #3–23.'),
          child('All-Star Comics #24–57', 'Continuação da Era de Ouro.'),
          child('Crisis on Multiple Earths Vols. 1–6', 'Encontros anuais entre JSA e Liga da Justiça.'),
          child('All-Star Comics #58–74 / Adventure Comics #461–466', 'Renascimento da equipe nos anos 1970.'),
          child('America vs. the Justice Society #1–4', 'O Congresso julga o legado da equipe.')
        ]),
        run('A JSA no mundo pós-Crise', 'A equipe sai do limbo, enfrenta a Sociedade da Injustiça e sofre com Zero Hora.', [
          child('The Last Days of the Justice Society Special #1', 'A JSA parte para lutar eternamente no Ragnarok.'),
          child('Armageddon: Inferno #1–4', 'A equipe retorna ao presente.'),
          child('Justice Society of America #1–8 (1991)', 'Breve série de Len Strazewski e Mike Parobeck.'),
          child('JSA: The Golden Age #1–4', 'Elseworld de James Robinson.'),
          child('Zero Hour #0–4', 'Tragédia que elimina vários integrantes.'),
          child('Starman by James Robinson', 'Jack Knight mantém o legado da Era de Ouro vivo.')
        ])
      ]),
      section('johns', 'JSA por Geoff Johns', [
        run('Justice Be Done ao retorno de Hawkman', 'Veteranos treinam uma nova geração de heróis legados.', [
          child('Justice Society Returns', 'Nove especiais que preparam a nova série.'),
          child('JSA Vol. 1: Justice Be Done', 'JSA #1–5 e Secret Files.'),
          child('Vol. 2: Darkness Falls', 'JSA #6–15.'),
          child('Vol. 3: The Return of Hawkman', 'JSA #16–25.'),
          child('Vol. 4: Fair Play', 'JSA #26–31.'),
          child('Vol. 5: Stealing Thunder', 'JSA #32–38.'),
          child('JLA/JSA: Virtue and Vice', 'Graphic novel que une as equipes.')
        ]),
        run('Princes of Darkness, Black Reign e conclusão', 'A JSA enfrenta Mordru, Adão Negro e crises de legado.', [
          child('Vol. 6: Savage Times', 'JSA #39–45.'),
          child('Vol. 7: Princes of Darkness', 'JSA #46–55.'),
          child('Vol. 8: Black Reign', 'JSA #56–58 e Hawkman #23–25.'),
          child('Vols. 9–12', 'JSA #59–81 e especiais.'),
          child('JSA: Classified #1–9', 'Power Girl e histórias paralelas.'),
          child('Justice Society of America (2007) Vols. 1–6', 'A nova série até #28 e Annual.')
        ])
      ]),
      section('newgolden', 'Earth 2 e a Nova Era de Ouro', [
        run('JSA da Terra 2 — New 52', 'Uma realidade reiniciada cria versões jovens de Jay Garrick, Alan Scott e Kendra Saunders.', [
          child('Earth 2 Vol. 1: The Gathering', 'Earth 2 #1–6.'),
          child('Vol. 2: The Tower of Fate', 'Earth 2 #7–12 e Annual.'),
          child('Vols. 3–5', 'Earth 2 #13–26 e Annual.'),
          child('Earth 2: World’s End Vols. 1–2', 'Série semanal e capítulos relacionados.'),
          child('Earth 2: Society Vols. 1–4', 'Reconstrução da equipe em um novo mundo.')
        ]),
        run('The New Golden Age', 'Heróis perdidos retornam e Helena Wayne tenta salvar o futuro da Sociedade.', [
          child('Stargirl Spring Break Special #1', 'Prólogo dos ajudantes esquecidos.'),
          child('Flashpoint Beyond #0–6', 'A linha do tempo revela a Nova Era de Ouro.'),
          child('Stargirl: The Lost Children #1–6', 'Courtney encontra jovens heróis desaparecidos.'),
          child('The New Golden Age #1', 'Prólogo da nova série.'),
          child('Justice Society of America Vol. 1', 'Justice Society #1–7.'),
          child('Justice Society of America Vol. 2', 'Justice Society #8–12.'),
          child('Alan Scott / Jay Garrick / Wesley Dodds', 'Três minisséries de seis edições sobre a geração clássica.')
        ])
      ])
    ]),

    order('suicide-squad-reading-order', 'DC', 'Esquadrão Suicida', 'Esquadrão Suicida — Ordem de Leitura', 'https://www.comicbooktreasury.com/suicide-squad-reading-order/', [
      section('ostrander', 'Força-Tarefa X — John Ostrander', [
        run('Formação moderna e primeiras missões', 'Amanda Waller envia vilões presos em operações negáveis e quase impossíveis.', [
          child('Legends #1–6', 'Formação da equipe moderna.'),
          child('Suicide Squad Vol. 1: Trial by Fire', 'Suicide Squad (1987) #1–8 e Secret Origins #14.'),
          child('Vol. 2: The Nightshade Odyssey', 'Suicide Squad #9–16 e Justice League #13.'),
          child('Vol. 3: Rogues', 'Suicide Squad #17–25 e Annual.'),
          child('Vol. 4: The Janus Directive', 'Suicide Squad #23–30 e crossover com Checkmate/Firestorm.'),
          child('Vol. 5: Apokolips Now', 'Suicide Squad #31–39.'),
          child('Vol. 6: The Phoenix Gambit', 'Suicide Squad #40–49.')
        ]),
        run('Fim da primeira Força-Tarefa X', 'Waller, Rick Flag, Bronze Tiger e Deadshot chegam ao limite.', [
          child('Suicide Squad #50–58', 'Mudanças de comando e novas missões.'),
          child('Suicide Squad #59–66', 'Conflitos com governos e antigos membros.'),
          child('Suicide Squad Annuals #2–4', 'Operações paralelas.'),
          child('Suicide Squad: Dead Man’s Hand', 'Crossover com Batman, Green Arrow e outros títulos.'),
          child('Suicide Squad #67', 'Conclusão da série original.'),
          child('Suicide Squad: Raise the Flag #1–8', 'Ostrander retorna à equipe.')
        ])
      ]),
      section('new52', 'New 52 e a era cinematográfica', [
        run('Suicide Squad (2011)', 'Harley Quinn, Deadshot e King Shark lideram uma equipe mais explosiva.', [
          child('Vol. 1: Kicked in the Teeth', 'Suicide Squad #1–7.'),
          child('Vol. 2: Basilisk Rising', 'Suicide Squad #8–13 e #0.'),
          child('Vol. 3: Death Is for Suckers', 'Suicide Squad #14–19.'),
          child('Vol. 4: Discipline and Punish', 'Suicide Squad #20–23 e especiais.'),
          child('Vol. 5: Walled In', 'Suicide Squad #24–30.'),
          child('New Suicide Squad Vols. 1–4', 'New Suicide Squad #1–22 e Annual.')
        ]),
        run('Rebirth — Waller vs. a Liga', 'Rick Flag lidera Harley, Deadshot, Croc, Boomerang e Katana.', [
          child('Vol. 1: The Black Vault', 'Suicide Squad: Rebirth e #1–8.'),
          child('Justice League vs. Suicide Squad #1–6', 'As equipes colidem por causa de Maxwell Lord.'),
          child('Vol. 2: Going Sane', 'Suicide Squad #9–16.'),
          child('Vols. 3–5', 'Suicide Squad #17–32 e especiais.'),
          child('Vols. 6–8', 'Suicide Squad #33–50 e conclusão.')
        ])
      ]),
      section('recent', 'Tom Taylor, Infinite Frontier e Black Label', [
        run('Bad Blood', 'Uma nova equipe enfrenta a agenda secreta de Lok e a própria Força-Tarefa X.', [
          child('Suicide Squad: Bad Blood #1–5', 'Primeiro arco de Tom Taylor.'),
          child('Suicide Squad: Bad Blood #6–11', 'Revolta e conclusão da série.'),
          child('Future State: Suicide Squad #1–2', 'Uma equipe falsa protege a Terra futura.'),
          child('Suicide Squad: Get Joker! #1–3', 'Black Label de Brian Azzarello e Alex Maleev.')
        ]),
        run('A equipe de Peacemaker e Absolute Power', 'A Força-Tarefa X expande operações pelo multiverso e depois enfrenta Amanda Waller.', [
          child('Vol. 1: Give Peace a Chance', 'Suicide Squad (2021) #1–6.'),
          child('Vol. 2: Ambushed Earth', 'Suicide Squad #7–12.'),
          child('War for Earth-3', 'Crossover com Flash e Teen Titans Academy.'),
          child('Vol. 3: Death by the Life', 'Suicide Squad #13–15 e Annual.'),
          child('Suicide Squad: Dream Team #1–4', 'Waller recruta Dreamer antes de Absolute Power.'),
          child('Absolute Power #1–4', 'A grande ofensiva de Waller contra os meta-humanos.')
        ])
      ])
    ]),

    order('doom-patrol-reading-order', 'DC', 'Patrulha do Destino', 'Patrulha do Destino — Ordem de Leitura', 'https://www.comicbooktreasury.com/doom-patrol-reading-order/', [
      section('classic', 'Os heróis mais estranhos do mundo', [
        run('A Patrulha original', 'Robotman, Elasti-Girl e Negative Man unem traumas sob a liderança do Chefe.', [
          child('My Greatest Adventure #80–85', 'Formação da equipe.'),
          child('Doom Patrol #86–102', 'Primeiras aventuras e a Irmandade do Mal.'),
          child('Doom Patrol #103–113', 'Mento, Mutano e ameaças cada vez mais estranhas.'),
          child('Doom Patrol #114–121', 'Caminho para o sacrifício final.'),
          child('The Brave and the Bold #65 / Challengers #48', 'Encontros da Era de Prata.'),
          child('Showcase #94–96', 'Primeiro renascimento na Era de Bronze.')
        ]),
        run('Paul Kupperberg e o segundo grupo', 'Robotman retorna com Celsius, Tempest e Negative Woman.', [
          child('Doom Patrol #1–6 (1987)', 'Formação da nova equipe.'),
          child('Doom Patrol #7–12', 'Kalki e conflitos internos.'),
          child('Doom Patrol/Suicide Squad Special #1', 'As equipes colidem.'),
          child('Doom Patrol #13–18 e Annual #1', 'Invasion! e transição para Grant Morrison.')
        ])
      ]),
      section('vertigo', 'Grant Morrison e Rachel Pollack', [
        run('Doom Patrol por Grant Morrison', 'A série vira uma exploração surreal de identidade, arte e realidade.', [
          child('Book One', 'Doom Patrol #19–34.'),
          child('Book Two', 'Doom Patrol #35–50.'),
          child('Book Three', 'Doom Patrol #51–63 e Doom Force #1.'),
          child('Flex Mentallo #1–4', 'Minissérie derivada e companheira temática.')
        ]),
        run('Doom Patrol por Rachel Pollack', 'Dorothy, Coagula e a equipe enfrentam sexualidade, corpo e transformação.', [
          child('Doom Patrol #64–69', 'Nova formação e chegada de Coagula.'),
          child('Doom Patrol #70–75', 'A família False Memory.'),
          child('Doom Patrol #76–81', 'Novos mundos internos.'),
          child('Doom Patrol #82–87 e Annual #2', 'Conclusão da era Vertigo.'),
          child('Rachel Pollack Omnibus', 'A fase completa com Totems e Vertigo Jam.')
        ])
      ]),
      section('modern', 'Reboots, Young Animal e Unstoppable', [
        run('Arcudi, Byrne e Giffen', 'Várias tentativas reconstroem a equipe antes do retorno ao surrealismo.', [
          child('Doom Patrol (2001) #1–22', 'John Arcudi e Tan Eng Huat.'),
          child('JLA: Tenth Circle', 'Ponte para a reinvenção de John Byrne.'),
          child('Doom Patrol (2004) #1–18', 'A fase de John Byrne.'),
          child('Doom Patrol (2009) #1–11', 'Keith Giffen reúne diferentes gerações.'),
          child('Doom Patrol (2009) #12–22', 'Conclusão antes de Flashpoint.')
        ]),
        run('Doom Patrol por Gerard Way', 'Casey Brinke encontra Robotman, Danny e uma equipe impossível.', [
          child('Vol. 1: Brick by Brick', 'Doom Patrol (2016) #1–6.'),
          child('Vol. 2: Nada', 'Doom Patrol #7–12.'),
          child('Milk Wars', 'JLA/Doom Patrol e especiais Young Animal.'),
          child('Weight of the Worlds #1–7', 'Continuação da fase de Gerard Way.')
        ]),
        run('Unstoppable Doom Patrol', 'A equipe passa a resgatar novos meta-humanos perseguidos.', [
          child('Lazarus Planet: Dark Fate #1', 'Prelúdio da nova missão.'),
          child('Unstoppable Doom Patrol #1–3', 'Beast Girl e Degenerate entram na equipe.'),
          child('Unstoppable Doom Patrol #4–5', 'Ameaças corporativas e a nova Chefe.'),
          child('Unstoppable Doom Patrol #6–7', 'Conclusão da minissérie.')
        ])
      ])
    ]),

    order('hawkman-hawkgirl-reading-order', 'DC', 'Liga da Justiça', 'Gavião Negro e Mulher-Gavião — Ordem de Leitura', 'https://www.comicbooktreasury.com/hawkman-reading-order/', [
      section('origins', 'Reencarnações e policiais de Thanagar', [
        run('Carter Hall e Shiera — Era de Ouro', 'O príncipe Khufu e sua amada renascem através dos séculos.', [
          child('Flash Comics #1', 'Primeira aparição de Carter Hall.'),
          child('Golden Age Hawkman Archives', 'Histórias selecionadas de Flash Comics #1–22.'),
          child('All-Star Comics #3–57', 'Carter torna-se pilar da JSA.'),
          child('All-Star Squadron #1–67', 'As aventuras da geração de guerra.'),
          child('Hawkgirl: The Beginning', 'Histórias clássicas de Shiera ao lado de Carter.')
        ]),
        run('Katar Hol e Shayera — Era de Prata', 'Dois policiais de Thanagar estudam métodos terrestres e entram na Liga.', [
          child('The Brave and the Bold #34–36 e #42–44', 'Estreia de Katar e Shayera.'),
          child('Mystery in Space #87–90', 'Novas missões na Terra.'),
          child('Hawkman #1–12 (1964)', 'Primeiro ciclo da série.'),
          child('Hawkman #13–27', 'Sombras de Thanagar e novos inimigos.'),
          child('Justice League of America #31 em diante', 'Entrada dos Hawks na Liga.'),
          child('Shadow War of Hawkman', 'Hawkman #1–4 (1985) e Special.')
        ])
      ]),
      section('hawkworld', 'Hawkworld e a continuidade pós-Crise', [
        run('A reinvenção de Timothy Truman', 'Thanagar torna-se uma sociedade complexa e Katar um policial idealista.', [
          child('Hawkworld #1–3', 'Minissérie de prestígio e nova origem.'),
          child('Hawkworld Annual #1 / série #1–6', 'Katar e Shayera chegam à Terra.'),
          child('Hawkworld #7–17', 'Conflitos com Byth e o governo thanagariano.'),
          child('Hawkworld #18–32 e Annuals', 'Conclusão da série.'),
          child('Hawkman (1993) #1–13', 'Continuação direta e Zero Hour.'),
          child('Hawkman #14–33', 'A fusão no Hawk Avatar e o fim da fase.')
        ]),
        run('JSA por Geoff Johns', 'Carter retorna, Kendra Saunders assume como Hawkgirl e as vidas passadas convergem.', [
          child('JSA Vol. 3: The Return of Hawkman', 'JSA #16–25.'),
          child('Hawkman Book One', 'Hawkman (2002) #1–14 e Secret Files.'),
          child('Hawkman Book Two', 'Hawkman #15–25 e JSA #56–58.'),
          child('Hawkman #26–36', 'Atom, Headhunter e retorno de inimigos.'),
          child('Hawkgirl #50–56', 'Kendra assume o título da série.'),
          child('Hawkgirl #57–66', 'Conclusão da fase com Kendra.')
        ])
      ]),
      section('rebirth', 'Metal, reconciliação e fases atuais', [
        run('Hawkman por Robert Venditti', 'Carter descobre que suas reencarnações atravessam tempo, espaço e planetas.', [
          child('Dark Nights: Metal #1–6', 'O N-ésimo Metal volta ao centro do Universo DC.'),
          child('Vol. 1: Awakening', 'Hawkman (2018) #1–6.'),
          child('Vol. 2: Deathbringer', 'Hawkman #7–12.'),
          child('Vol. 3: Darkness Within', 'Hawkman #13–19.'),
          child('Vol. 4: Hawks Eternal', 'Hawkman #20–29.'),
          child('The Last Hawkman', 'Hawkman #30–35 e conclusão.')
        ]),
        run('Kendra Saunders — Liga e série solo', 'Kendra lidera a Liga contra a Totalidade e constrói nova vida em Metropolis.', [
          child('Dark Nights: Metal / No Justice', 'Kendra retorna como Hawkgirl.'),
          child('Justice League by Scott Snyder Vols. 1–6', 'Kendra integra a Liga durante Totality e Doom War.'),
          child('Hawkgirl #1–3 (2023)', 'Kendra muda-se para Metropolis.'),
          child('Hawkgirl #4–6', 'Conclusão da minissérie.'),
          child('Justice League Unlimited', 'Participações na equipe All In.')
        ])
      ])
    ]),

    order('blue-beetle-reading-order', 'DC', 'Liga da Justiça', 'Besouro Azul — Ted Kord e Jaime Reyes', 'https://www.comicbooktreasury.com/blue-beetle-reading-order/', [
      section('ted', 'Dan Garrett e Ted Kord', [
        run('O legado Charlton', 'O manto passa do arqueólogo Dan Garrett ao inventor Ted Kord.', [
          child('Blue Beetle #1–5 (Charlton, 1967)', 'Ted Kord e a origem ligada a Dan Garrett.'),
          child('Captain Atom #83–86', 'Primeiras histórias de Ted como Besouro.'),
          child('Secret Origins #2', 'Origem pós-Crise de Ted Kord.'),
          child('Blue Beetle #1–12 (1986)', 'Primeiro ano da série DC de Ted.'),
          child('Blue Beetle #13–24', 'Conclusão da série solo.')
        ]),
        run('Liga da Justiça Internacional e Blue & Gold', 'Ted e Booster Gold formam uma das amizades mais queridas da DC.', [
          child('Justice League International Vol. 1', 'Justice League #1–6 e JLI #7–25.'),
          child('Justice League International Vols. 2–3', 'Justice League America, Europe e Quarterly.'),
          child('Formerly Known as the Justice League #1–6', 'Reunião da Super Buddies.'),
          child('I Can’t Believe It’s Not the Justice League', 'JLA Classified #4–9.'),
          child('Countdown to Infinite Crisis #1', 'Investigação final de Ted.'),
          child('Blue & Gold #1–8', 'Ted e Booster voltam aos negócios.')
        ])
      ]),
      section('jaime', 'Jaime Reyes e o Escaravelho', [
        run('Origem e primeira série', 'Um adolescente de El Paso encontra o Escaravelho e entra em uma guerra com o Reach.', [
          child('Infinite Crisis #3–6', 'Jaime encontra o Escaravelho e ajuda os heróis.'),
          child('Book One', 'Blue Beetle (2006) #1–12.'),
          child('Book Two', 'Blue Beetle #13–25.'),
          child('Vol. 4: End Game', 'Blue Beetle #20–26.'),
          child('Vol. 5: Boundaries', 'Blue Beetle #29–34.'),
          child('Vol. 6: Black and Blue', 'Blue Beetle #27–28, #35–36 e Booster Gold.')
        ]),
        run('Teen Titans e Generation Lost', 'Jaime encontra uma geração de aliados e volta a trabalhar com a Liga.', [
          child('Teen Titans #50–61', 'Entrada gradual na equipe.'),
          child('Teen Titans #62–78', 'Jaime torna-se integrante regular.'),
          child('Teen Titans #79–87', 'Hunt for Raven e saída da equipe.'),
          child('Justice League: Generation Lost #1–24', 'Jaime, Booster e a antiga JLI contra Maxwell Lord.'),
          child('Supergirl #61–64', 'Jaime ajuda Kara contra o Reach.')
        ])
      ]),
      section('rebirth', 'New 52, Rebirth e Graduation Day', [
        run('Reboots do Escaravelho', 'A origem alienígena e depois mágica é reconstruída em duas continuidades.', [
          child('Blue Beetle Vol. 1: Metamorphosis', 'Blue Beetle (2011) #1–6.'),
          child('Vol. 2: Blue Diamond', 'Blue Beetle #0, #7–16 e Green Lantern: New Guardians #9.'),
          child('Threshold Vol. 1: The Hunted', 'Threshold #1–8 e Annual.'),
          child('Rebirth Vol. 1: The More Things Change', 'Blue Beetle: Rebirth e #1–5.'),
          child('Vol. 2: Hard Choices', 'Blue Beetle #6–12.'),
          child('Vol. 3: Road to Nowhere', 'Blue Beetle #13–18.')
        ]),
        run('Jaime forma sua própria comunidade', 'Ted orienta Jaime, que se prepara para uma ameaça ligada ao Reach.', [
          child('Blue Beetle: Graduation Day #1–6', 'Jaime termina a escola e encontra novos portadores.'),
          child('Blue Beetle Vol. 1: Scarab War', 'Blue Beetle (2023) #1–6.'),
          child('Blue Beetle Vol. 2', 'Blue Beetle #7–12.'),
          child('Absolute Power: Task Force VII', 'O Escaravelho é alvo das forças de Waller.')
        ])
      ])
    ]),

    order('doctor-fate-reading-order', 'DC', 'Constantine e o lado místico', 'Doutor Destino — Ordem de Leitura', 'https://www.comicbooktreasury.com/doctor-fate-reading-order/', [
      section('kent', 'Kent Nelson e a Ordem de Nabu', [
        run('Era de Ouro e encontros da JSA', 'Kent Nelson recebe o elmo de Nabu e torna-se campeão dos Senhores da Ordem.', [
          child('More Fun Comics #55–70', 'Origem e primeiras histórias de Doutor Destino.'),
          child('More Fun Comics #71–98', 'Continuação da Era de Ouro.'),
          child('All-Star Comics #3–20', 'Kent integra a Sociedade da Justiça.'),
          child('Crisis on Multiple Earths', 'Retorno nos encontros JLA/JSA.'),
          child('1st Issue Special #9', 'Aventura solo na Era de Bronze.'),
          child('DC Comics Presents #23', 'Encontro com Superman.')
        ]),
        run('Immortal Doctor Fate e a minissérie de DeMatteis', 'A relação entre Kent, Inza e Nabu recebe uma abordagem psicológica.', [
          child('The Flash #306–313 backups', 'Histórias reunidas em Immortal Doctor Fate.'),
          child('Doctor Fate #1–4 (1987)', 'Minissérie de J.M. DeMatteis e Keith Giffen.'),
          child('Doctor Fate #1–9 (1988)', 'Eric e Linda Strauss dividem o manto.'),
          child('Doctor Fate #10–24', 'A luta entre Ordem e Caos continua.'),
          child('Doctor Fate Annual #1', 'História complementar da fase.')
        ])
      ]),
      section('legacy', 'Inza, Jared Stevens e Hector Hall', [
        run('Inza Nelson e os anos 1990', 'Inza assume o manto e usa a magia para enfrentar injustiças sociais.', [
          child('Doctor Fate #25–31', 'Inza torna-se a única Doutora Destino.'),
          child('Doctor Fate #32–42', 'Conclusão da série.'),
          child('Fate #0–12', 'Jared Stevens recebe os artefatos de Nabu.'),
          child('Fate #13–23', 'Conclusão da primeira fase de Jared.'),
          child('The Book of Fate #1–12', 'O destino final de Jared Stevens.')
        ]),
        run('Hector Hall na JSA', 'O filho de Hawkman assume o elmo durante o renascimento da Sociedade.', [
          child('JSA Vol. 1: Justice Be Done', 'JSA #1–5 e apresentação do novo Destino.'),
          child('Doctor Fate #1–5 (2003)', 'Minissérie solo de Hector Hall.'),
          child('JSA Vols. 2–5', 'Hector torna-se pilar místico da equipe.'),
          child('JLA/JSA: Virtue and Vice', 'As equipes enfrentam pecados e virtudes.'),
          child('JSA Vols. 6–9', 'Princes of Darkness, Black Reign e destino de Hector.'),
          child('Day of Vengeance #1–6', 'O Espectro ataca a magia e o elmo perde seu portador.')
        ])
      ]),
      section('khalid', 'Khalid Nassour e a nova geração', [
        run('O Elmo procura sucessores', 'A magia escolhe novos portadores antes de chegar ao estudante Khalid Nassour.', [
          child('The Helmet of Fate #1–5', 'O elmo passa por vários candidatos.'),
          child('Countdown to Mystery #1–8', 'Kent V. Nelson assume o manto.'),
          child('Reign in Hell #1–8', 'Guerra pelo domínio infernal.'),
          child('Justice Society of America #29–40', 'Kent atua com a JSA.'),
          child('Earth 2 Vol. 2: The Tower of Fate', 'Khalid Ben-Hassin em outra Terra.')
        ]),
        run('Doctor Fate por Paul Levitz', 'Khalid Nassour concilia medicina, família egípcia e o peso de Nabu.', [
          child('Vol. 1: The Blood Price', 'Doctor Fate (2015) #1–7.'),
          child('Vol. 2: Prisoners of the Past', 'Doctor Fate #8–12.'),
          child('Vol. 3: Fateful Threads', 'Doctor Fate #13–18.'),
          child('Justice League Dark Vol. 2: Lords of Order', 'Khalid entra no conflito entre Ordem e magia.'),
          child('Justice League Dark Vols. 3–4', 'Khalid torna-se integrante efetivo.'),
          child('Justice Society of America: The New Golden Age', 'O legado do Doutor Destino volta à JSA.')
        ])
      ])
    ]),

    order('spectre-reading-order', 'DC', 'Constantine e o lado místico', 'Espectro — Ordem de Leitura', 'https://www.comicbooktreasury.com/the-spectre-reading-order/', [
      section('corrigan', 'Jim Corrigan — a Ira de Deus', [
        run('Era de Ouro e Bronze', 'O detetive assassinado torna-se hospedeiro de uma força de vingança divina.', [
          child('More Fun Comics #52–70', 'Origem e primeiras histórias do Espectro.'),
          child('More Fun Comics #71–101', 'Continuação da Era de Ouro.'),
          child('All-Star Comics #3–23', 'O Espectro integra a primeira JSA.'),
          child('Showcase #60–61 e #64', 'Retorno na Era de Prata.'),
          child('The Spectre #1–10 (1967)', 'Primeira série solo.'),
          child('Adventure Comics #431–440', 'A fase de vingança sombria de Fleisher e Aparo.'),
          child('Wrath of the Spectre', 'Coleção da fase Bronze e histórias adicionais.')
        ]),
        run('The Spectre por John Ostrander e Tom Mandrake', 'A run definitiva explora justiça, fé, genocídio e redenção.', [
          child('Vol. 1: Crimes and Judgments', 'The Spectre (1992) #1–12.'),
          child('Vol. 2: Wrath of God', 'The Spectre #13–22.'),
          child('Vol. 3: Requiem', 'The Spectre #23–31.'),
          child('The Spectre #32–45', 'Conflitos com a América e a humanidade de Corrigan.'),
          child('The Spectre #46–57', 'Viagem moral e confronto com forças cósmicas.'),
          child('The Spectre #58–62', 'Conclusão e libertação de Jim Corrigan.')
        ])
      ]),
      section('hal', 'Hal Jordan — espírito de redenção', [
        run('Day of Judgment e a série de 2001', 'O ex-Lanterna Verde tenta transformar vingança em redenção.', [
          child('JLA #28–31', 'Asmodel toma o poder do Espectro.'),
          child('Day of Judgment #1–5', 'Hal Jordan torna-se o novo hospedeiro.'),
          child('JLA/The Spectre: Soul War #1–2', 'Hal aprende a usar o poder.'),
          child('The Spectre (2001) #1–8', 'Primeiro arco solo de Hal.'),
          child('The Spectre #9–18', 'Missões de redenção e julgamentos.'),
          child('The Spectre #19–27', 'Conclusão da série.'),
          child('Green Lantern: Rebirth #1–6', 'Hal deixa o Espectro e volta à Tropa.')
        ])
      ]),
      section('crispus', 'Crispus Allen e o Espectro moderno', [
        run('Gotham Central, Infinite Crisis e Final Crisis', 'O detetive Crispus Allen morre e torna-se o novo elo humano da entidade.', [
          child('Gotham Central Vols. 1–4', 'A carreira e morte de Crispus Allen.'),
          child('Infinite Crisis #1–7', 'O Espectro sem hospedeiro destrói a magia.'),
          child('Infinite Crisis Aftermath: The Spectre #1–3', 'Crispus aceita o papel.'),
          child('Tales of the Unexpected #1–8', 'Primeiras missões do novo Espectro.'),
          child('Final Crisis: Revelations #1–5', 'Crispus, Renee Montoya e a Religião do Crime.'),
          child('Blackest Night #0–8', 'O poder do Espectro enfrenta Parallax.')
        ]),
        run('New 52, Rebirth e histórias recentes', 'Jim Corrigan retorna em uma continuidade reconfigurada.', [
          child('Phantom Stranger Vol. 1: A Stranger Among Us', 'O Espectro surge na nova cosmologia.'),
          child('Constantine Vol. 2: The Voice in the Fire', 'Confrontos durante Trinity War.'),
          child('Gotham by Midnight Vol. 1: We Do Not Sleep', 'Jim Corrigan trabalha na polícia sobrenatural.'),
          child('Gotham by Midnight Vol. 2: Rest in Peace', 'Conclusão da série.'),
          child('The Spectre: Crimes and Judgment', 'Reedição moderna da fase Ostrander.'),
          child('DC Horror Presents: The Conjuring of the Spectre', 'Histórias recentes de vingança sobrenatural.')
        ])
      ])
    ])
  ];

  const existingIds = new Set(orders.map(item => item.id));
  orders.push(...additions.filter(item => !existingIds.has(item.id)));
})();
