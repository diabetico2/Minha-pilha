(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const child = (title, details = '') => ({ title, details, companions: [] });
  const run = (title, details, companions) => ({ title, details, companions });
  const section = (key, title, items) => ({ key, title, items });
  const order = (id, publisher, family, title, source, sections) => ({ id, publisher, family, title, source, sections });

  const additions = [
    order('black-cat-reading-order', 'Marvel', 'Homem-Aranha', 'Gata Negra — Ordem de Leitura', 'https://www.comicbooktreasury.com/black-cat-reading-order-marvel/', [
      section('origins', 'Felicia Hardy antes da série solo', [
        run('Primeiros encontros com o Homem-Aranha', 'A apresentação de Felicia, sua relação com Peter e a fase de parceira e rival.', [
          child('Amazing Spider-Man #194–195', 'Primeira aparição e estreia como Gata Negra.'),
          child('Amazing Spider-Man #204–205', 'O retorno de Felicia.'),
          child('Amazing Spider-Man #226–227', 'Nova tentativa de se aproximar de Peter.'),
          child('Peter Parker, The Spectacular Spider-Man #74–100', 'A relação com Peter, seus poderes e a parceria com o herói.'),
          child('Spider-Man/Black Cat: The Evil That Men Do #1–6', 'Minissérie de Kevin Smith e Terry Dodson.')
        ]),
        run('Séries, golpes e equipe com Wolverine', 'Histórias solo anteriores à fase de Jed MacKay.', [
          child('Black Cat #1–4 (1994)', 'Primeira minissérie solo de Felicia.'),
          child('Claws #1–3', 'Gata Negra e Wolverine contra Arcade.'),
          child('Claws II #1–3', 'Segundo encontro com Wolverine.'),
          child('Black Cat: The Accused', 'Amazing Spider-Man Presents: Black Cat #1–4.'),
          child('Black Cat: A Clash of Thieves', 'Black Cat #1–4 (2010).')
        ])
      ]),
      section('mackay', 'Gata Negra por Jed MacKay', [
        run('Black Cat (2019)', 'O grande ponto de entrada moderno: três volumes e golpes cada vez maiores.', [
          child('Vol. 1: Grand Theft Marvel', 'Black Cat (2019) #1–5.'),
          child('Vol. 2: On the Run', 'Black Cat (2019) #6–10.'),
          child('Vol. 3: All Dressed Up', 'Black Cat (2019) #11–12 e Annual #1.'),
          child('Black Cat Annual (2020) #1', 'Casamento, golpe e ligação com a nova série.')
        ]),
        run('Black Cat (2020) e Infinity Score', 'Continuação direta após King in Black.', [
          child('Vol. 4: Queen in Black', 'Black Cat (2020) #1–4.'),
          child('Vol. 5: I’ll Take Manhattan', 'Black Cat (2020) #5–7 e material relacionado.'),
          child('Vol. 6: Infinity Score', 'Black Cat (2020) #8–10.'),
          child('Giant-Size Black Cat: Infinity Score #1', 'Conclusão do golpe cósmico.')
        ])
      ]),
      section('recent', 'Iron Cat, Mary Jane e Jackpot', [
        run('A era Iron Cat', 'Felicia enfrenta o passado e uma armadura ligada a Tony Stark.', [
          child('Iron Cat #1', 'O roubo da armadura e o início do mistério.'),
          child('Iron Cat #2', 'Felicia e Tony formam uma aliança desconfortável.'),
          child('Iron Cat #3', 'A perseguição se aproxima do alvo real.'),
          child('Iron Cat #4', 'O plano da antagonista chega ao limite.'),
          child('Iron Cat #5', 'Conclusão da minissérie.')
        ]),
        run('Mary Jane & Black Cat / Jackpot', 'As aventuras de Felicia ao lado de Mary Jane Watson.', [
          child('Mary Jane & Black Cat: Beyond #1', 'Primeiro especial da dupla.'),
          child('Mary Jane & Black Cat: Dark Web #1–5', 'Minissérie durante Dark Web.'),
          child('Jackpot #1', 'Mary Jane assume sua identidade heroica.'),
          child('Jackpot & Black Cat #1–4', 'Dupla reunida contra uma conspiração tecnológica.')
        ])
      ])
    ]),

    order('blade-reading-order', 'Marvel', 'Lado sobrenatural', 'Blade — Ordem de Leitura', 'https://www.comicbooktreasury.com/blade-reading-order/', [
      section('classic', 'Tomb of Dracula e os Nightstalkers', [
        run('Os primeiros anos de Blade', 'A origem do caçador de vampiros nas páginas de Tomb of Dracula.', [
          child('Tomb of Dracula #10', 'Primeira aparição de Blade.'),
          child('Tomb of Dracula #12–24', 'Primeiros confrontos com Drácula e seus servos.'),
          child('Tomb of Dracula #30–53', 'Aliança instável com outros caçadores.'),
          child('Marvel Preview #3 e #8', 'Aventuras solo em preto e branco.'),
          child('Blade: The Early Years', 'Seleção das histórias essenciais do período clássico.')
        ]),
        run('Nightstalkers e Midnight Sons', 'Blade, Hannibal King e Frank Drake formam uma equipe sobrenatural.', [
          child('Nightstalkers #1–6', 'Formação da equipe e Rise of the Midnight Sons.'),
          child('Nightstalkers #7–12', 'Conflitos com Lilin e Drácula.'),
          child('Midnight Sons Unlimited #1–4', 'Missões compartilhadas da linha sobrenatural.'),
          child('Nightstalkers #13–18', 'Caminho para Siege of Darkness.'),
          child('Blade: The Vampire-Hunter #1–10', 'Série solo de 1994 após a dissolução dos Nightstalkers.')
        ])
      ]),
      section('modern', 'Blade moderno', [
        run('De Marc Guggenheim a Avengers', 'Séries solo, invasão vampírica e retorno aos grandes times.', [
          child('Blade (1998) #1–3', 'Minissérie com Hannibal King.'),
          child('Blade (1999) #1–6', 'A série ligada ao selo Marvel Knights.'),
          child('Blade (2006) #1–6', 'Primeira metade da fase de Marc Guggenheim.'),
          child('Blade (2006) #7–12', 'Conclusão da série e novas revelações.'),
          child('Captain Britain and MI13: Vampire State', 'Blade integra o MI13 contra Drácula.'),
          child('Avengers: Challenge of the Ghost Riders / Age of Khonshu', 'Blade atua com os Vingadores de Jason Aaron.')
        ]),
        run('Blade por Bryan Hill', 'Ponto de entrada recente, com Adana e uma guerra sobrenatural.', [
          child('Blade Vol. 1: Mother of Evil', 'Blade (2023) #1–5.'),
          child('Blade Vol. 2: Evil Against Evil', 'Blade (2023) #6–10.'),
          child('Blade: Red Band #1–5', 'Continuação adulta após Blood Hunt.'),
          child('Blood Hunt #1–5', 'Evento em que Blade ocupa o centro da invasão vampírica.'),
          child('Midnight Sons: Blood Hunt #1–3', 'Equipe sobrenatural reage às consequências do evento.')
        ])
      ])
    ]),

    order('doctor-strange-reading-order', 'Marvel', 'Lado sobrenatural', 'Doutor Estranho — Ordem de Leitura', 'https://www.comicbooktreasury.com/doctor-strange-reading-order/', [
      section('foundations', 'Mestre das Artes Místicas', [
        run('Steve Ditko, Roy Thomas e os clássicos', 'A origem de Stephen Strange e a formação de sua mitologia.', [
          child('Strange Tales #110–111 e #114–146', 'Origem, Barão Mordo, Dormammu, Clea e Eternidade.'),
          child('Strange Tales #147–168', 'A fase final do título compartilhado.'),
          child('Doctor Strange #169–183', 'Primeira série solo numerada.'),
          child('Marvel Premiere #3–14', 'O retorno de Strange e novas dimensões.'),
          child('Doctor Strange: A Separate Reality', 'Seleção essencial das primeiras fases.')
        ]),
        run('Doctor Strange: Sorcerer Supreme', 'A longa série de 1988 e seus grandes ciclos.', [
          child('Into the Dark Dimension', 'Doctor Strange: Sorcerer Supreme #1–13.'),
          child('Infinity War e Infinity Crusade', 'Edições ligadas à saga cósmica de Jim Starlin.'),
          child('Siege of Darkness', 'Doctor Strange #60–62 e títulos dos Midnight Sons.'),
          child('Strange Tales e Dead Again', 'Arcos centrais da metade final da série.'),
          child('Doctor Strange: Sorcerer Supreme #76–90', 'Conclusão do volume clássico.')
        ])
      ]),
      section('modern', 'Do Juramento a Jason Aaron', [
        run('Pontos de entrada modernos', 'Minisséries e fases que recolocam Stephen no centro do Universo Marvel.', [
          child('Doctor Strange: The Oath #1–5', 'História essencial de Brian K. Vaughan e Marcos Martín.'),
          child('Doctor Strange: Season One', 'Releitura acessível da origem.'),
          child('New Avengers: Illuminati #1–5', 'Stephen integra o grupo secreto.'),
          child('New Avengers por Jonathan Hickman', 'Incursões, Illuminati e caminho para Secret Wars.'),
          child('Doctor Strange: The Last Days of Magic', 'Especial que amplia o arco de Jason Aaron.')
        ]),
        run('Doctor Strange por Jason Aaron', 'A magia está morrendo e Strange paga o preço de cada feitiço.', [
          child('Vol. 1: The Way of the Weird', 'Doctor Strange (2015) #1–5.'),
          child('Vol. 2: The Last Days of Magic', 'Doctor Strange #6–10 e especial.'),
          child('Vol. 3: Blood in the Aether', 'Doctor Strange #11–16.'),
          child('Vol. 4: Mr. Misery', 'Doctor Strange #17–20.'),
          child('Secret Empire: Doctor Strange', 'Doctor Strange #21–24 e material do evento.')
        ])
      ]),
      section('recent', 'Cates, Waid e Jed MacKay', [
        run('Donny Cates e Damnation', 'Stephen recupera a magia, lida com Loki e enfrenta Mephisto em Las Vegas.', [
          child('Loki: Sorcerer Supreme', 'Doctor Strange #381–385.'),
          child('Doctor Strange: Damnation #1–4', 'Minissérie central do evento.'),
          child('Doctor Strange #386–390', 'Capítulos paralelos e conclusão da fase.'),
          child('Doctor Strange: Damnation — Complete Collection', 'Ordem integrada com Iron Fist, Ben Reilly e Johnny Blaze.')
        ]),
        run('Doctor Strange por Mark Waid', 'Uma fase de ciência, magia, espaço e cirurgia.', [
          child('Vol. 1: Across the Universe', 'Doctor Strange (2018) #1–5.'),
          child('Vol. 2: Remittance', 'Doctor Strange #6–11.'),
          child('Vol. 3: Herald', 'Doctor Strange #12–17.'),
          child('Vol. 4: The Choice', 'Doctor Strange #18–20.'),
          child('Surgeon Supreme Vol. 1: Under the Knife', 'Doctor Strange: Surgeon Supreme #1–6.')
        ]),
        run('A saga de Jed MacKay', 'Morte, sucessão por Clea e retorno de Stephen.', [
          child('The Death of Doctor Strange #1–5', 'A investigação do assassinato de Stephen.'),
          child('Strange Vol. 1: I Belong to Death', 'Strange (2022) #1–5, protagonizada por Clea.'),
          child('Strange Vol. 2: The Doctor Strange of Death', 'Strange (2022) #6–10.'),
          child('Doctor Strange Vol. 1: The Life of Doctor Strange', 'Doctor Strange (2023) #1–5.'),
          child('Vol. 2: The War-Hound of the Vishanti', 'Doctor Strange #6–10.'),
          child('Vol. 3: The General Strange', 'Doctor Strange #11–18.')
        ])
      ])
    ]),

    order('midnight-sons-reading-order', 'Marvel', 'Lado sobrenatural', 'Midnight Sons — Ordem de Leitura', 'https://comicbookreadingorders.com/marvel/events/rise-of-the-midnight-sons-reading-order/', [
      section('rise', 'Rise of the Midnight Sons', [
        run('Prólogo — Danny Ketch e Johnny Blaze', 'As visões que levam à união dos nove guerreiros contra Lilith.', [
          child('Ghost Rider (1990) #1–10', 'Base da fase de Danny Ketch.'),
          child('Ghost Rider #25–27', 'Johnny Blaze retorna e a ameaça dos Lilin se aproxima.'),
          child('Ghost Rider #28', 'Parte 1: Visions.'),
          child('Ghost Rider/Blaze: Spirits of Vengeance #1', 'Parte 2: formação dos Spirits of Vengeance.'),
          child('Ghost Rider #29–30', 'Confrontos paralelos durante a reunião da equipe.')
        ]),
        run('O crossover Rise of the Midnight Sons', 'Seis capítulos centrais, com as séries derivadas em ordem.', [
          child('Ghost Rider #28', 'Parte 1 — Visions.'),
          child('Spirits of Vengeance #1', 'Parte 2 — Spirits of Vengeance.'),
          child('Morbius: The Living Vampire #1', 'Parte 3 — Morbius.'),
          child('Darkhold: Pages from the Book of Sins #1', 'Parte 4 — os Darkhold Redeemers.'),
          child('Nightstalkers #1', 'Parte 5 — Blade, Hannibal King e Frank Drake.'),
          child('Ghost Rider #31', 'Parte 6 — Midnight Sons.')
        ])
      ]),
      section('line', 'A linha Midnight Sons dos anos 1990', [
        run('Séries paralelas', 'Acompanhe cada núcleo separadamente antes dos próximos crossovers.', [
          child('Spirits of Vengeance #2–6', 'Johnny Blaze e Danny Ketch na estrada.'),
          child('Morbius: The Living Vampire #2–12', 'A luta de Michael Morbius contra sua fome.'),
          child('Darkhold #2–11', 'Os Redeemers perseguem páginas do livro de Chthon.'),
          child('Nightstalkers #2–12', 'Blade, Hannibal King e Frank Drake.'),
          child('Midnight Sons Unlimited #1–3', 'Antologia que conecta os núcleos.')
        ]),
        run('Midnight Massacre', 'Blade é corrompido pela profecia Switchblade e caça seus aliados.', [
          child('Nightstalkers #10', 'Abertura do massacre.'),
          child('Ghost Rider #40', 'A caçada chega ao Ghost Rider.'),
          child('Darkhold #11', 'Os Redeemers entram no conflito.'),
          child('Morbius #12', 'Morbius enfrenta Switchblade.'),
          child('Spirits of Vengeance #13', 'Conclusão do crossover.')
        ]),
        run('Siege of Darkness', 'Grande conclusão em 17 partes da primeira era Midnight Sons.', [
          child('Midnight Sons Unlimited #4', 'Prólogo e mobilização das equipes.'),
          child('Ghost Rider #44–45', 'Primeiros capítulos do cerco.'),
          child('Spirits of Vengeance #17–18', 'Johnny e Danny contra Zarathos.'),
          child('Darkhold #15–16', 'O Darkhold no centro da crise.'),
          child('Morbius #16–17', 'A frente vampírica.'),
          child('Nightstalkers #14–15', 'Destino da equipe de Blade.'),
          child('Marvel Comics Presents #143–146', 'Capítulos complementares.'),
          child('Doctor Strange: Sorcerer Supreme #60–61', 'Conclusão mística do evento.')
        ])
      ]),
      section('revivals', 'Retornos modernos da equipe', [
        run('Damnation — os novos Midnight Sons', 'Wong reúne uma equipe para libertar Las Vegas de Mephisto.', [
          child('Doctor Strange #386', 'Preparação para Damnation.'),
          child('Doctor Strange: Damnation #1', 'Las Vegas se torna um reino infernal.'),
          child('Doctor Strange #387 / Damnation #2', 'A equipe de Wong entra em ação.'),
          child('Iron Fist #78–79 e Ben Reilly #15–16', 'Frentes paralelas do evento.'),
          child('Johnny Blaze: Ghost Rider #1', 'Johnny enfrenta o trono do Inferno.'),
          child('Damnation #3–4 / Doctor Strange #388–389', 'Conclusão da guerra contra Mephisto.')
        ]),
        run('Novas encarnações', 'Equipes sobrenaturais contemporâneas e histórias autônomas.', [
          child('Marvel Zombies 4 #1–4', 'Morbius reúne uma versão dos Midnight Sons.'),
          child('Midnight Suns #1–5 (2022)', 'Magik, Nico Minoru, Blade, Kushala e Zoe Laveau.'),
          child('Midnight Sons: Blood Hunt #1–3', 'Danny Ketch e aliados durante a invasão vampírica.'),
          child('Spirits of Vengeance (2024) #1–5', 'Os personagens sobrenaturais se reúnem novamente.')
        ])
      ])
    ]),

    order('deadpool-reading-order', 'Marvel', 'Deadpool', 'Deadpool — Ordem de Leitura', 'https://www.comicbooktreasury.com/deadpool-reading-order/', [
      section('origins', 'Dos Novos Mutantes à fase de Joe Kelly', [
        run('Mercenário, vilão e primeiras minisséries', 'Wade começa como adversário de Cable e ganha sua própria voz.', [
          child('New Mutants #98', 'Primeira aparição de Deadpool.'),
          child('X-Force #1–24', 'Aparições importantes como antagonista e agente de Tolliver.'),
          child('The Circle Chase #1–4', 'Primeira minissérie solo.'),
          child('Sins of the Past #1–4', 'Segunda minissérie e aprofundamento do passado.'),
          child('Deadpool: Mission Improbable', 'Deadpool (1997) #1–9 e Daredevil/Deadpool Annual.')
        ]),
        run('Deadpool por Joe Kelly e sucessores', 'A série que define o humor, as vozes internas e a quebra da quarta parede.', [
          child('Deadpool Classic Vol. 2', 'Deadpool (1997) #10–17 e Death Annual.'),
          child('Deadpool Classic Vol. 3', 'Deadpool #18–25 e #0.'),
          child('Deadpool Classic Vol. 4', 'Deadpool #26–33 e Baby’s First Deadpool Book.'),
          child('Deadpool Classic Vol. 5', 'Deadpool #34–45 e Black Panther #23.'),
          child('Deadpool Classic Vols. 6–9', 'Deadpool #46–69 e Agent X #1–6.')
        ])
      ]),
      section('cable-way', 'Cable & Deadpool e Daniel Way', [
        run('Cable & Deadpool', 'Uma dupla improvável em uma série longa e interligada.', [
          child('Ultimate Collection Vol. 1', 'Cable & Deadpool #1–18.'),
          child('Ultimate Collection Vol. 2', 'Cable & Deadpool #19–35.'),
          child('Ultimate Collection Vol. 3', 'Cable & Deadpool #36–50 e Deadpool/GLI Summer Fun.'),
          child('Deadpool vs. the Marvel Universe', 'Participações importantes do período.')
        ]),
        run('Deadpool por Daniel Way', 'A fase de 2008, ligada a Secret Invasion e Dark Reign.', [
          child('Vol. 1: Secret Invasion', 'Deadpool (2008) #1–5.'),
          child('Vol. 2: Dark Reign', 'Deadpool #6–12.'),
          child('Vol. 3: X Marks the Spot', 'Deadpool #13–18.'),
          child('Vols. 4–7', 'Deadpool #19–44 e especiais.'),
          child('Deadpool Kills Deadpool / Dead Presidents', 'Minisséries e histórias paralelas populares.'),
          child('Deadpool (2008) #45–63', 'Evil Deadpool, institucionalização e conclusão da fase.')
        ])
      ]),
      section('duggan', 'A maratona de Gerry Duggan', [
        run('Dead Presidents e a série de 2012', 'Wade ganha uma equipe de apoio e uma história contínua mais emocional.', [
          child('Vol. 1: Dead Presidents', 'Deadpool (2012) #1–6.'),
          child('Vol. 2: Soul Hunter', 'Deadpool #7–12.'),
          child('Vol. 3: The Good, the Bad and the Ugly', 'Deadpool #13–19.'),
          child('Vols. 4–6', 'Deadpool #20–34, Annuals e especiais.'),
          child('The Death of Deadpool', 'Deadpool #35–45 e o fim antes de Secret Wars.')
        ]),
        run('World’s Greatest e Mercs for Money', 'Deadpool vira um herói famoso, chefe de equipe e agente da Hydra.', [
          child('World’s Greatest Vols. 1–3', 'Deadpool (2015) #1–13 e especiais.'),
          child('Deadpool & the Mercs for Money Vols. 1–2', 'Minissérie e série principal da equipe.'),
          child('World’s Greatest Vols. 4–7', 'Deadpool #14–27, Annual e eventos.'),
          child('’Til Death Do Us…', 'Crossover com Spider-Man/Deadpool e Mercs for Money.'),
          child('Secret Empire', 'Deadpool #31–36 e o colapso de Wade.'),
          child('The Despicable Deadpool Vols. 1–4', 'Deadpool #287–300.')
        ])
      ]),
      section('recent', 'Fresh Start, Krakoa e fase atual', [
        run('Skottie Young e Kelly Thompson', 'Novos empregos, Monster Island e Elsa Bloodstone.', [
          child('Vol. 1: Mercin’ Hard for the Money', 'Deadpool (2018) #1–6.'),
          child('Vol. 2: Good Night', 'Deadpool #7–12.'),
          child('Vol. 3: Weasel Goes to Hell', 'Deadpool #13–15 e material relacionado.'),
          child('Deadpool by Kelly Thompson', 'Deadpool (2019) #1–10.')
        ]),
        run('Deadpool no período Krakoa e além', 'Wade tenta ingressar na comunidade mutante e protege sua filha Ellie.', [
          child('Deadpool: Black, White & Blood #1–4', 'Antologia de histórias curtas.'),
          child('Deadpool Vol. 1: Blood Bond', 'Deadpool (2022) #1–5.'),
          child('Deadpool Vol. 2: All-Out Deadpool', 'Deadpool (2022) #6–10.'),
          child('Deadpool (2024) Vol. 1', 'Deadpool #1–5 de Cody Ziglar.'),
          child('Deadpool (2024) Vol. 2', 'Deadpool #6–10 e foco em Ellie Camacho.'),
          child('Wade Wilson: Deadpool (2026) #1 em diante', 'Novo ponto de entrada da fase Shadows of Tomorrow.')
        ])
      ])
    ]),

    order('wolverine-reading-order', 'Marvel', 'X-Men', 'Wolverine — Ordem de Leitura', 'https://www.comicbooktreasury.com/wolverine-reading-order/', [
      section('classic', 'Arma X e a série clássica', [
        run('Origens, Japão e Arma X', 'As histórias que definem Logan antes de sua longa série solo.', [
          child('Incredible Hulk #180–182', 'Primeira aparição e primeiro confronto com Hulk.'),
          child('Giant-Size X-Men #1 / Uncanny X-Men #94 em diante', 'Entrada de Logan na nova equipe.'),
          child('Wolverine #1–4 (1982)', 'Minissérie de Chris Claremont e Frank Miller no Japão.'),
          child('Kitty Pryde and Wolverine #1–6', 'Logan treina Kitty no Japão.'),
          child('Weapon X', 'Marvel Comics Presents #72–84, por Barry Windsor-Smith.'),
          child('Wolverine: Origin #1–6', 'Revelação da infância de James Howlett.')
        ]),
        run('Wolverine (1988) — primeiros ciclos', 'Madripoor, Japão, Weapon X e a perda do adamantium.', [
          child('Epic Collection: Madripoor Nights', 'Wolverine #1–16 e histórias relacionadas.'),
          child('Epic Collection: Back to Basics', 'Wolverine #17–30.'),
          child('Epic Collection: Blood and Claws', 'Wolverine #31–44.'),
          child('Epic Collection: The Dying Game', 'Wolverine #69–86 e especiais.'),
          child('Fatal Attractions', 'X-Men #25 e Wolverine #75; Magneto remove o adamantium.'),
          child('Wolverine #87–109', 'A fase sem adamantium e a transformação feral.')
        ])
      ]),
      section('modern', 'Rucka, Millar e Aaron', [
        run('Wolverine por Greg Rucka', 'Um ponto de entrada moderno, mais humano e investigativo.', [
          child('Vol. 1: The Brotherhood', 'Wolverine (2003) #1–6.'),
          child('Vol. 2: Coyote Crossing', 'Wolverine #7–11.'),
          child('Vol. 3: Return of the Native', 'Wolverine #12–19.'),
          child('Enemy of the State — preparação', 'Wolverine #19 e a transição para Mark Millar.')
        ]),
        run('Enemy of the State e Old Man Logan', 'Os grandes épicos de Mark Millar.', [
          child('Enemy of the State Vol. 1', 'Wolverine #20–25.'),
          child('Enemy of the State Vol. 2', 'Wolverine #26–32.'),
          child('Old Man Logan', 'Wolverine #66–72 e Giant-Size Old Man Logan.'),
          child('Wolverine: Civil War', 'Wolverine #42–48.'),
          child('Wolverine: Evolution', 'Wolverine #50–55.')
        ]),
        run('Wolverine por Jason Aaron', 'Vingança, inferno, escola e uma enorme rede de histórias.', [
          child('Get Mystique', 'Wolverine #62–65.'),
          child('Manifest Destiny / Weapon X', 'Wolverine: Manifest Destiny #1–4 e Weapon X #1–16.'),
          child('Wolverine Goes to Hell', 'Wolverine (2010) #1–5.'),
          child('Wolverine’s Revenge', 'Wolverine #6–16.'),
          child('Wolverine and the X-Men Vols. 1–8', 'A escola Jean Grey e os eventos AvX/Infinity.')
        ])
      ]),
      section('death-krakoa', 'Morte, retorno e Krakoa', [
        run('Morte e legado de Logan', 'A queda do Wolverine e as histórias dos personagens que carregam seu legado.', [
          child('Death of Wolverine #1–4', 'A minissérie central.'),
          child('Death of Wolverine: The Weapon X Program #1–5', 'Consequências no programa Arma X.'),
          child('Wolverines #1–20', 'X-23, Daken, Mística, Dentes-de-Sabre e aliados.'),
          child('Old Man Logan (2015) #1–5', 'O Velho Logan entra em Secret Wars.'),
          child('Old Man Logan (2016) #1–50', 'O personagem permanece na Terra-616.')
        ]),
        run('Return of Wolverine e Krakoa', 'Logan volta, entra na X-Force e encara ameaças mutantes e vampíricas.', [
          child('Hunt for Wolverine', 'One-shot e quatro minisséries de busca.'),
          child('Return of Wolverine #1–5', 'Retorno oficial de Logan.'),
          child('Wolverine Vol. 1: The Flower Cartel', 'Wolverine (2020) #1–5.'),
          child('Wolverine Vols. 2–4', 'Wolverine #6–19, X of Swords e vampires.'),
          child('Wolverine Vols. 5–8', 'Wolverine #20–40 e X Lives/X Deaths.'),
          child('Sabretooth War', 'Wolverine #41–50.')
        ]),
        run('From the Ashes', 'Novas histórias solo e o reencontro com Deadpool.', [
          child('Wolverine: Revenge #1–5', 'Minissérie independente de Jonathan Hickman e Greg Capullo.'),
          child('Wolverine (2024) Vol. 1', 'Wolverine #1–5.'),
          child('Wolverine (2024) Vol. 2', 'Wolverine #6–10.'),
          child('Deadpool/Wolverine #1 em diante', 'Série da dupla após Krakoa.')
        ])
      ])
    ]),

    order('x-23-laura-kinney-reading-order', 'Marvel', 'X-Men', 'X-23 / Laura Kinney — Ordem de Leitura', 'https://www.comicbooktreasury.com/laura-kinney-reading-order/', [
      section('origin', 'Origem e primeiros anos', [
        run('A criação da X-23', 'Laura escapa do projeto que a criou e busca uma vida própria.', [
          child('X-23: Innocence Lost #1–6', 'A criação e infância de Laura.'),
          child('X-23: Target X #1–6', 'Fuga, família Kinney e encontro com Wolverine.'),
          child('NYX #1–7', 'Laura em Nova York antes dos X-Men.'),
          child('Uncanny X-Men #450–460', 'Primeiras interações com a equipe principal.'),
          child('New X-Men: Childhood’s End', 'Laura se torna aluna do Instituto Xavier.')
        ]),
        run('X-Force e a primeira série solo', 'Laura integra a equipe de operações secretas de Ciclope.', [
          child('X-Force by Kyle & Yost Vol. 1', 'X-Force #1–13 e especiais.'),
          child('Messiah War', 'X-Force #14–16, Cable #13–15 e one-shot.'),
          child('X-Force Vol. 3: Not Forgotten', 'X-Force #17–20.'),
          child('X-Necrosha', 'X-Force #21–25 e tie-ins.'),
          child('X-Men: Second Coming', 'Conclusão da missão de X-Force e ruptura com Logan.')
        ])
      ]),
      section('solo', 'X-23 solo e a era jovem X-Men', [
        run('X-23 por Marjorie Liu', 'Uma jornada de identidade, amizade e controle sobre a própria vida.', [
          child('Vol. 1: The Killing Dream', 'X-23 (2010) #1–6.'),
          child('Daken/X-23: Collision', 'Daken #5–9 e X-23 #7–9.'),
          child('Vol. 2: Chaos Theory', 'X-23 #10–16.'),
          child('Vol. 3: Don’t Look Back', 'X-23 #17–21.'),
          child('Avengers Academy #23–39', 'Laura encontra uma nova equipe e novos amigos.')
        ]),
        run('All-New X-Men', 'Laura se une aos cinco X-Men deslocados no tempo.', [
          child('All-New X-Men Vols. 4–7', 'All-New X-Men #18–41, Trial of Jean Grey e Black Vortex.'),
          child('All-New X-Men (2015) Vol. 1', 'All-New X-Men #1–6.'),
          child('Vol. 2: Apocalypse Wars', 'All-New X-Men #7–11.'),
          child('Vol. 3: Hell Hath So Much Fury', 'All-New X-Men #12–16.'),
          child('Vol. 4: IvX', 'All-New X-Men #17–19 e Annual.')
        ])
      ]),
      section('wolverine', 'Laura assume o nome Wolverine', [
        run('All-New Wolverine por Tom Taylor', 'A fase definitiva de Laura como Wolverine, com Gabby/Honey Badger.', [
          child('Vol. 1: The Four Sisters', 'All-New Wolverine #1–6.'),
          child('Vol. 2: Civil War II', 'All-New Wolverine #7–12.'),
          child('Vol. 3: Enemy of the State II', 'All-New Wolverine #13–18.'),
          child('Vol. 4: Immune', 'All-New Wolverine #19–24.'),
          child('Vol. 5: Orphans of X', 'All-New Wolverine #25–30.'),
          child('Vol. 6: Old Woman Laura', 'All-New Wolverine #31–35.')
        ]),
        run('X-23, Krakoa e NYX', 'Laura recupera seu nome, entra no Vault e passa a coexistir com Talon.', [
          child('X-23 Vol. 1: Family Album', 'X-23 (2018) #1–6.'),
          child('X-23 Vol. 2: X-Assassin', 'X-23 (2018) #7–12.'),
          child('X-Men #5 e #18–19', 'A missão no Vault e o retorno de Laura/Talon.'),
          child('X-Terminators #1–5', 'Laura, Jubileu, Boom-Boom e Dazzler.'),
          child('X-23: Deadly Regenesis #1–5', 'História ambientada na era Utopia.'),
          child('NYX (2024) #1 em diante', 'Laura protege jovens mutantes em Nova York.')
        ])
      ])
    ]),

    order('marvel-alternate-universes-reading-order', 'Marvel', 'Universos alternativos', 'Marvel — Universos Alternativos', 'https://www.comicbooktreasury.com/marvel-reading-orders/', [
      section('classics', 'Realidades alternativas essenciais', [
        run('Marvels, 1602 e futuros possíveis', 'Histórias independentes que reinventam toda a mitologia Marvel.', [
          child('Marvels #0–4', 'A história do Universo Marvel pelos olhos de Phil Sheldon.'),
          child('Marvel 1602 #1–8', 'Neil Gaiman transporta os heróis para o século XVII.'),
          child('1602: New World #1–5', 'Continuação direta do universo 1602.'),
          child('Spider-Man 1602 #1–5', 'A trajetória de Peter Parquagh.'),
          child('Fantastic Four 1602 #1–5', 'A família fantástica no Novo Mundo.'),
          child('Old Man Logan', 'Wolverine #66–72 e Giant-Size Old Man Logan.')
        ]),
        run('Terra X — Earth-9997', 'Leia a trilogia na ordem de publicação para preservar suas revelações.', [
          child('Earth X #0–12, X e epílogo', 'Primeiro ciclo da realidade distópica.'),
          child('Universe X #0–12 e especiais', 'Expansão cósmica da mitologia.'),
          child('Paradise X #0–12 e especiais', 'Conclusão da trilogia original.'),
          child('Marvels X #1–6', 'Prelúdio publicado depois da trilogia.'),
          child('Weapon X-Men #1–5', 'Retorno recente a personagens ligados à realidade.')
        ])
      ]),
      section('ultimate1610', 'Ultimate Marvel — Terra-1610', [
        run('Nascimento do Universo Ultimate', 'As séries que constroem a primeira grande linha alternativa da Marvel.', [
          child('Ultimate Spider-Man Vols. 1–6', 'Primeiro grande ciclo de Peter Parker por Bendis e Bagley.'),
          child('Ultimate X-Men Vols. 1–6', 'A nova origem dos mutantes da Terra-1610.'),
          child('The Ultimates Vol. 1: Super-Human', 'The Ultimates #1–6.'),
          child('The Ultimates Vol. 2: Homeland Security', 'The Ultimates #7–13.'),
          child('Ultimate Fantastic Four Vols. 1–3', 'Origem do Quarteto e os primeiros experimentos de Reed.'),
          child('Ultimate Galactus Trilogy', 'Ultimate Nightmare, Secret e Extinction.')
        ]),
        run('Ultimatum, Miles Morales e o fim', 'A linha se transforma, apresenta Miles e caminha para Secret Wars.', [
          child('Ultimates 2 #1–13', 'O segundo grande ciclo de Millar e Hitch.'),
          child('Ultimatum #1–5 e tie-ins', 'O cataclismo que encerra a primeira fase.'),
          child('Ultimate Comics: Spider-Man — Miles Morales', 'Ultimate Fallout #4 e Ultimate Comics Spider-Man #1–28.'),
          child('Ultimate Comics: Ultimates #1–30', 'Reconstrução política do universo.'),
          child('Cataclysm: The Ultimates’ Last Stand', 'Galactus ameaça a Terra-1610.'),
          child('Ultimate End #1–5', 'Despedida durante Secret Wars (2015).')
        ])
      ]),
      section('other', 'Apocalipses, zumbis e eras alternativas', [
        run('Era do Apocalipse', 'Uma linha do tempo em que Xavier morreu antes de formar os X-Men.', [
          child('X-Men: Alpha', 'Abertura do evento.'),
          child('Astonishing X-Men #1–4 / Amazing X-Men #1–4', 'Duas frentes principais.'),
          child('Factor X #1–4 / Generation Next #1–4', 'Equipes e missões paralelas.'),
          child('Gambit and the X-Ternals #1–4 / X-Calibre #1–4', 'Busca cósmica e resistência.'),
          child('Weapon X #1–4 / X-Man #1–4', 'Logan e Nate Grey.'),
          child('X-Men: Omega', 'Conclusão da saga original.')
        ]),
        run('Marvel Zombies', 'A infecção atravessa realidades e gera sua própria longa linha.', [
          child('Ultimate Fantastic Four #21–23 e #30–32', 'Primeiro contato com o universo zumbi.'),
          child('Marvel Zombies #1–5', 'A minissérie original.'),
          child('Marvel Zombies: Dead Days', 'Prelúdio da infecção.'),
          child('Marvel Zombies 2 #1–5', 'Retorno dos heróis cósmicos.'),
          child('Marvel Zombies 3 #1–4', 'A.R.M.O.R. tenta conter a ameaça.'),
          child('Marvel Zombies 4 #1–4', 'Midnight Sons contra uma nova infestação.'),
          child('Marvel Zombies Return #1–5', 'A praga alcança outra Terra.')
        ]),
        run('What If…? e histórias autônomas', 'Pontos isolados para explorar sem compromisso com uma ordem longa.', [
          child('What If? Classic Vols. 1–7', 'As primeiras realidades alternativas da Marvel.'),
          child('Bullet Points #1–5', 'Uma mudança transforma as origens de vários heróis.'),
          child('Ruins #1–2', 'Reflexo sombrio de Marvels.'),
          child('House of M #1–8', 'Wanda cria uma realidade governada por mutantes.'),
          child('Secret Wars (2015) #1–9', 'Battleworld reúne fragmentos do multiverso.'),
          child('Heroes Reborn (2021) #1–7 e Heroes Return #1', 'Um mundo sem Vingadores.')
        ])
      ]),
      section('ultimate6160', 'Novo Universo Ultimate — Terra-6160', [
        run('Ultimate Invasion e o novo mundo', 'O Criador remodela uma Terra sem a era heroica tradicional.', [
          child('Ultimate Invasion #1–4', 'A criação da Terra-6160.'),
          child('Ultimate Universe #1', 'Tony Stark e aliados iniciam a resistência.'),
          child('Ultimate Spider-Man Vol. 1: Married with Children', 'Ultimate Spider-Man (2024) #1–6.'),
          child('Ultimate Black Panther Vol. 1: Peace and War', 'Ultimate Black Panther #1–6.'),
          child('Ultimate X-Men Vol. 1: Fears and Hates', 'Ultimate X-Men #1–6.'),
          child('Ultimates Vol. 1: Fix the World', 'Ultimates (2024) #1–6.')
        ]),
        run('Expansão e caminho para o retorno do Criador', 'As quatro séries avançam em paralelo pelo calendário da Terra-6160.', [
          child('Ultimate Spider-Man Vol. 2: The Paper', 'Ultimate Spider-Man #7–12.'),
          child('Ultimate Black Panther Vol. 2', 'Ultimate Black Panther #7–12.'),
          child('Ultimate X-Men Vol. 2: Children of the Atom', 'Ultimate X-Men #7–12.'),
          child('Ultimates Vol. 2: All Power to the People', 'Ultimates #7–12.'),
          child('Ultimate Universe: One Year In #1', 'Balanço do primeiro ano.'),
          child('Ultimate Wolverine #1 em diante', 'Arma do Conselho do Criador.')
        ])
      ])
    ]),

    order('dc-elseworlds-absolute-reading-order', 'DC', 'Elseworlds e universos alternativos', 'DC — Elseworlds e Universo Absolute', 'https://www.comicbooktreasury.com/dc-absolute-universe-reading-order/', [
      section('classics', 'Elseworlds essenciais', [
        run('Batman e Superman reinventados', 'Histórias fechadas que mudam época, origem ou destino dos maiores heróis.', [
          child('Batman: Gotham by Gaslight', 'Batman caça Jack, o Estripador, na Gotham vitoriana.'),
          child('Batman: The Doom That Came to Gotham', 'Batman encontra o horror cósmico.'),
          child('Batman & Dracula: Red Rain', 'Primeiro volume da trilogia vampírica.'),
          child('Superman: Red Son #1–3', 'Kal-El cai na União Soviética.'),
          child('Superman: Secret Identity #1–4', 'Um jovem chamado Clark Kent vive num mundo sem super-heróis.'),
          child('Superman: Speeding Bullets', 'Kal-El é criado pelos Wayne.')
        ]),
        run('Mundos completos', 'Realidades que reimaginam o Universo DC como um todo.', [
          child('Kingdom Come #1–4', 'A geração clássica retorna diante de sucessores violentos.'),
          child('DC: The New Frontier #1–6', 'A transição da Era de Ouro para a Era de Prata.'),
          child('JLA: The Nail #1–3', 'Um mundo em que Superman nunca foi encontrado pelos Kent.'),
          child('JLA: Another Nail #1–3', 'Continuação e expansão daquela realidade.'),
          child('Justice Riders', 'A Liga da Justiça no Velho Oeste.'),
          child('DCeased #1–6', 'Uma equação antivida transforma o planeta.')
        ])
      ]),
      section('long', 'Universos alternativos de longa duração', [
        run('Injustice', 'A queda de Superman e a resistência de Batman antes e entre os jogos.', [
          child('Injustice: Gods Among Us — Year One', 'Edições #1–12 e Annual.'),
          child('Year Two', 'A guerra contra a Tropa dos Lanternas Verdes.'),
          child('Year Three', 'A frente mágica do conflito.'),
          child('Year Four', 'Deuses do Olimpo entram na guerra.'),
          child('Year Five', 'Último ano antes do primeiro jogo.'),
          child('Ground Zero', 'Os acontecimentos do jogo pela perspectiva de Harley.'),
          child('Injustice 2 Vols. 1–6', 'A reconstrução do mundo e o caminho para o segundo jogo.')
        ]),
        run('DCeased', 'A saga completa da Equação Antivida zumbi.', [
          child('DCeased #1–6', 'A queda do mundo original.'),
          child('A Good Day to Die #1', 'Heróis mágicos procuram uma solução.'),
          child('Unkillables #1–3', 'Vilões e sobreviventes formam uma comunidade.'),
          child('Hope at World’s End #1–15', 'Histórias durante o primeiro surto.'),
          child('Dead Planet #1–7', 'Retorno à Terra e busca pela cura.'),
          child('War of the Undead Gods #1–8', 'Conclusão cósmica da saga.')
        ]),
        run('Earth One', 'Graphic novels modernas e independentes para cada herói.', [
          child('Superman: Earth One Vols. 1–3', 'A formação do jovem Clark Kent.'),
          child('Batman: Earth One Vols. 1–3', 'Uma Gotham mais realista e um Batman inexperiente.'),
          child('Wonder Woman: Earth One Vols. 1–3', 'Amazônia reinterpretada por Grant Morrison.'),
          child('Green Lantern: Earth One Vols. 1–2', 'Ficção científica espacial com Hal Jordan.'),
          child('Teen Titans: Earth One Vols. 1–2', 'As origens do grupo em uma realidade própria.')
        ])
      ]),
      section('absolute', 'Universo Absolute', [
        run('DC All In e o nascimento do mundo Absolute', 'Uma realidade formada sob a influência de Darkseid.', [
          child('DC All In Special #1', 'Prólogo compartilhado com a linha principal.'),
          child('Absolute Batman Vol. 1', 'Absolute Batman #1–7.'),
          child('Absolute Wonder Woman Vol. 1', 'Absolute Wonder Woman #1–7.'),
          child('Absolute Superman Vol. 1', 'Absolute Superman #1–7.'),
          child('Absolute Flash Vol. 1', 'Absolute Flash #1–7.'),
          child('Absolute Green Lantern Vol. 1', 'Absolute Green Lantern #1–7.'),
          child('Absolute Martian Manhunter Vol. 1', 'Absolute Martian Manhunter #1–7.')
        ]),
        run('Segundo ciclo do Absolute', 'Continue cada série em paralelo depois dos primeiros arcos.', [
          child('Absolute Batman Vol. 2', 'Continuação após #7.'),
          child('Absolute Wonder Woman Vol. 2', 'Continuação após #7.'),
          child('Absolute Superman Vol. 2', 'Continuação após #7.'),
          child('Absolute Flash Vol. 2', 'Continuação da jornada de Wally West.'),
          child('Absolute Green Lantern Vol. 2', 'Expansão do mistério cósmico.'),
          child('Absolute Martian Manhunter Vol. 2', 'Continuação da experiência psíquica de John Jones.')
        ])
      ])
    ]),

    order('captain-america-reading-order', 'Marvel', 'Vingadores', 'Capitão América — Ordem de Leitura', 'https://www.comicbooktreasury.com/captain-america-reading-order/', [
      section('classic', 'Do retorno de Steve à era moderna', [
        run('O Sentinela da Liberdade', 'A base clássica de Steve Rogers após ser encontrado pelos Vingadores.', [
          child('Avengers #4', 'O retorno de Steve Rogers ao mundo moderno.'),
          child('Captain America Epic: Captain America Lives Again', 'Avengers #4 e Tales of Suspense #58–96.'),
          child('Epic: The Coming of the Falcon', 'Captain America #114–138 e a estreia de Sam Wilson.'),
          child('Secret Empire (1974)', 'Captain America #169–176; a grande crise de confiança de Steve.'),
          child('Captain America: Man Without a Country', 'Captain America #444–454 e material relacionado.')
        ]),
        run('Mark Gruenwald', 'A longa fase que apresenta a Sociedade da Serpente, John Walker e Crossbones.', [
          child('Epic: Society of Serpents', 'Captain America #302–317.'),
          child('Epic: Justice Is Served', 'Captain America #318–332.'),
          child('Epic: The Captain', 'Captain America #333–350 e Iron Man #228.'),
          child('Epic: Arena of Death', 'Captain America #351–371.'),
          child('Epic: Streets of Poison', 'Captain America #372–386 e Annuals.'),
          child('Epic: Superia Stratagem', 'Captain America #387–397 e especiais.')
        ])
      ]),
      section('brubaker', 'Capitão América por Ed Brubaker', [
        run('Soldado Invernal e Guerra Civil', 'A fase definitiva que traz Bucky de volta e muda o legado do escudo.', [
          child('Vol. 1: Winter Soldier Book One', 'Captain America (2005) #1–7.'),
          child('Vol. 2: Winter Soldier Book Two', 'Captain America #8–9 e #11–14.'),
          child('Vol. 3: Red Menace', 'Captain America #15–21.'),
          child('Civil War: Captain America', 'Captain America #22–24 e Winter Soldier: Winter Kills.'),
          child('The Death of Captain America Vol. 1', 'Captain America #25–30.'),
          child('The Death of Captain America Vols. 2–3', 'Captain America #31–42.')
        ]),
        run('BuckyCap, Reborn e a conclusão', 'Bucky assume o escudo e Steve retorna.', [
          child('The Man with No Face', 'Captain America #43–48.'),
          child('Road to Reborn', 'Captain America #49–50 e #600–601.'),
          child('Captain America: Reborn #1–6', 'O retorno de Steve Rogers.'),
          child('Two Americas / No Escape', 'Captain America #602–610.'),
          child('The Trial of Captain America', 'Captain America #611–615.'),
          child('Prisoner of War', 'Captain America #616–619 e material relacionado.')
        ])
      ]),
      section('recent', 'Marvel NOW ao presente', [
        run('Remender, Spencer e Secret Empire', 'Dimensão Z, Sam Wilson como Capitão e a realidade Hydra.', [
          child('Castaway in Dimension Z Books 1–2', 'Captain America (2012) #1–10.'),
          child('Loose Nuke / Iron Nail / Tomorrow Soldier', 'Captain America #11–25.'),
          child('All-New Captain America #1–6', 'Sam Wilson assume o manto.'),
          child('Sam Wilson Vols. 1–5', 'Captain America: Sam Wilson #1–21.'),
          child('Steve Rogers Vols. 1–3', 'Captain America: Steve Rogers #1–19.'),
          child('Secret Empire #0–10 e Omega', 'Conclusão da trama de Hydra Cap.')
        ]),
        run('Coates, Symbol of Truth e novos ciclos', 'Steve e Sam atuam em séries paralelas e redefinem o símbolo.', [
          child('Ta-Nehisi Coates Vols. 1–5', 'Captain America (2018) #1–30.'),
          child('Sentinel of Liberty Vols. 1–2', 'Captain America: Sentinel of Liberty #1–11.'),
          child('Cold War', 'Captain America: Cold War Alpha/Omega e capítulos de Steve e Sam.'),
          child('Symbol of Truth Vols. 1–2', 'Captain America: Symbol of Truth #1–14.'),
          child('Captain America por J. Michael Straczynski', 'Captain America (2023) #1–16.'),
          child('Captain America (2025) por Chip Zdarsky', 'Novo ponto de entrada contemporâneo.')
        ])
      ])
    ]),

    order('thor-reading-order', 'Marvel', 'Vingadores', 'Thor — Ordem de Leitura', 'https://www.comicbooktreasury.com/thor-reading-order/', [
      section('classic', 'Asgard clássico e Walt Simonson', [
        run('Journey into Mystery e a Era de Prata', 'A chegada de Donald Blake, Loki, Jane Foster e os Nove Reinos.', [
          child('Thor Epic: The God of Thunder', 'Journey into Mystery #83–109.'),
          child('Epic: When Titans Clash', 'Journey into Mystery #110–125 e Annual.'),
          child('Epic: The Wrath of Odin', 'Journey into Mystery #126 e Thor #127–153.'),
          child('Epic: To Wake the Mangog', 'Thor #154–174.'),
          child('Thor #175–228', 'Ragnarok, Galactus, Surtur e os grandes mitos de Lee/Kirby.')
        ]),
        run('Thor por Walt Simonson', 'Uma das grandes runs da Marvel: Beta Ray Bill, Surtur e a maldição de Hela.', [
          child('Thor by Walt Simonson Vol. 1', 'Thor #337–345.'),
          child('Vol. 2', 'Thor #346–355.'),
          child('Vol. 3', 'Thor #356–363 e Balder the Brave #1–2.'),
          child('Vol. 4', 'Thor #364–374 e Balder #3–4.'),
          child('Vol. 5', 'Thor #375–382.'),
          child('Thor by Walt Simonson Omnibus', 'A fase completa, #337–382 e Balder the Brave #1–4.')
        ])
      ]),
      section('rebirth', 'Heroes Return e o Ragnarok moderno', [
        run('Dan Jurgens', 'Thor volta após Heroes Reborn e assume responsabilidades cada vez maiores.', [
          child('Thor by Dan Jurgens Vol. 1', 'Thor (1998) #1–8 e especiais.'),
          child('Vol. 2', 'Thor #9–13 e Annual.'),
          child('Vol. 3', 'Thor #14–25 e Peter Parker: Spider-Man #2.'),
          child('Death of Odin', 'Thor #36–43 e Annual 2001.'),
          child('Lord of Asgard', 'Thor #44–79; a era do Rei Thor.'),
          child('Thor: Disassembled — Ragnarok', 'Thor #80–85.')
        ]),
        run('J. Michael Straczynski e Siege', 'Asgard retorna sobre Oklahoma e Thor reencontra seus aliados.', [
          child('Thor by JMS Vol. 1', 'Thor (2007) #1–6.'),
          child('Vol. 2', 'Thor #7–12 e #600.'),
          child('Vol. 3', 'Thor #601–603 e Giant-Size Finale.'),
          child('Thor: Latverian Prometheus', 'Thor #604–606 e especiais.'),
          child('Siege #1–4', 'A queda de Asgard e o fim de Dark Reign.'),
          child('Thor by Kieron Gillen', 'Thor #607–614 e New Mutants #11.')
        ])
      ]),
      section('aaron', 'A saga de Thor por Jason Aaron', [
        run('Thor: God of Thunder', 'Três eras de Thor e o início da guerra contra Gorr.', [
          child('Vol. 1: The God Butcher', 'Thor: God of Thunder #1–5.'),
          child('Vol. 2: Godbomb', 'Thor: God of Thunder #6–11.'),
          child('Vol. 3: The Accursed', 'Thor: God of Thunder #12–18.'),
          child('Vol. 4: Last Days of Midgard', 'Thor: God of Thunder #19–25.')
        ]),
        run('Jane Foster, Guerra dos Reinos e Rei Thor', 'Jane assume Mjolnir enquanto Malekith conquista os reinos.', [
          child('Thor Vol. 1: Goddess of Thunder', 'Thor (2014) #1–5.'),
          child('Thor Vol. 2: Who Holds the Hammer?', 'Thor #6–8 e Annual.'),
          child('Mighty Thor Vols. 1–5', 'Mighty Thor (2015) #1–23.'),
          child('The Death of the Mighty Thor', 'Mighty Thor #700–706 e Gates of Valhalla.'),
          child('Thor (2018) Vols. 1–3', 'Thor #1–16.'),
          child('War of the Realms #1–6', 'Conclusão do conflito de Malekith.'),
          child('King Thor #1–4', 'Epílogo da saga de Jason Aaron.')
        ])
      ]),
      section('cates', 'Donny Cates e Immortal Thor', [
        run('Thor por Donny Cates', 'Thor se torna arauto de Galactus e enfrenta Thanos e o próprio Mjolnir.', [
          child('Vol. 1: The Devourer King', 'Thor (2020) #1–6.'),
          child('Vol. 2: Prey', 'Thor #7–14.'),
          child('Vol. 3: Revelations', 'Thor #15–18.'),
          child('Vol. 4: God of Hammers', 'Thor #19–24.'),
          child('Vol. 5: The Legacy of Thanos', 'Thor #25–30.'),
          child('Vol. 6: Blood of the Fathers', 'Thor #31–35.')
        ]),
        run('Immortal Thor por Al Ewing', 'Mitos antigos, Utgard e a natureza das histórias de Thor.', [
          child('Vol. 1: All Weather Turns to Storm', 'Immortal Thor #1–5.'),
          child('Vol. 2: All Trials Are One', 'Immortal Thor #6–10.'),
          child('Vol. 3: The End of All Songs', 'Immortal Thor #11–15.'),
          child('Vol. 4: The Lost Son of Odin', 'Immortal Thor #16–20.'),
          child('Roxxon Presents: Thor #1', 'Capítulo satírico ligado à run.')
        ])
      ])
    ]),

    order('black-widow-reading-order', 'Marvel', 'Vingadores', 'Viúva Negra — Ordem de Leitura', 'https://www.comicbooktreasury.com/black-widow-reading-order-natasha-romanoff/', [
      section('classic', 'Espiã, Vingadora e parceira do Demolidor', [
        run('Primeiros anos de Natasha', 'Da antagonista soviética à heroína e integrante dos Vingadores.', [
          child('Tales of Suspense #52–64', 'Primeiras aparições ao lado e contra o Homem de Ferro.'),
          child('Amazing Spider-Man #86', 'O visual clássico da Viúva Negra.'),
          child('Amazing Adventures #1–8', 'Primeiras histórias solo.'),
          child('Daredevil #81–124', 'Parceria e romance com Matt Murdock.'),
          child('Champions #1–17', 'Natasha lidera uma equipe em Los Angeles.'),
          child('Black Widow: The Coldest War', 'Graphic novel do fim da Guerra Fria.')
        ]),
        run('Marvel Knights e a Sala Vermelha', 'Minisséries de espionagem que redefinem Natasha e introduzem Yelena.', [
          child('Black Widow: The Itsy-Bitsy Spider #1–3', 'Natasha encontra Yelena Belova.'),
          child('Black Widow: Breakdown #1–3', 'Natasha, Yelena e uma troca de identidades.'),
          child('Black Widow: Homecoming #1–6', 'Richard K. Morgan revisita a Sala Vermelha.'),
          child('Black Widow: The Things They Say About Her #1–6', 'Continuação direta de Homecoming.'),
          child('Black Widow: Deadly Origin #1–4', 'O passado de Natasha volta para destruí-la.')
        ])
      ]),
      section('modern', 'Séries solo modernas', [
        run('De Marjorie Liu a Nathan Edmondson', 'Natasha enfrenta conspirações e tenta equilibrar as dívidas de seu passado.', [
          child('Black Widow Vol. 1: The Name of the Rose', 'Black Widow (2010) #1–5.'),
          child('Vol. 2: Kiss or Kill', 'Black Widow #6–8 e material relacionado.'),
          child('The Finely Woven Thread', 'Black Widow (2014) #1–6.'),
          child('The Tightly Tangled Web', 'Black Widow (2014) #7–12.'),
          child('Last Days', 'Black Widow (2014) #13–20.')
        ]),
        run('Mark Waid e Chris Samnee', 'Uma fuga em alta velocidade revela novos segredos da Sala Vermelha.', [
          child('Vol. 1: S.H.I.E.L.D.’s Most Wanted', 'Black Widow (2016) #1–6.'),
          child('Vol. 2: No More Secrets', 'Black Widow (2016) #7–12.'),
          child('Tales of Suspense: Hawkeye & Winter Soldier #100–104', 'Clint e Bucky investigam a aparente morte de Natasha.'),
          child('Web of Black Widow #1–5', 'Natasha confronta lembranças manipuladas.')
        ])
      ]),
      section('thompson', 'Black Widow por Kelly Thompson', [
        run('A teia de San Francisco', 'Uma vida perfeita demais leva Natasha a uma nova família de agentes.', [
          child('Vol. 1: The Ties That Bind', 'Black Widow (2020) #1–5.'),
          child('Vol. 2: I Am the Black Widow', 'Black Widow #6–10.'),
          child('Vol. 3: Die by the Blade', 'Black Widow #11–15.'),
          child('Black Widow & Hawkeye #1–4', 'Natasha e Clint em uma missão ligada à Sala Vermelha.'),
          child('White Widow #1–4', 'Yelena Belova em sua própria série.')
        ])
      ])
    ]),

    order('hawkeye-reading-order', 'Marvel', 'Vingadores', 'Gavião Arqueiro — Clint Barton e Kate Bishop', 'https://www.comicbooktreasury.com/clint-barton-reading-order/', [
      section('clint', 'Clint Barton — do circo aos Vingadores', [
        run('Origem e primeiras séries solo', 'O ex-vilão entra nos Vingadores e se torna líder da Costa Oeste.', [
          child('Tales of Suspense #57, #60 e #64', 'Primeiras aparições de Clint Barton.'),
          child('Avengers #16–109', 'Clint integra a equipe clássica, também como Golias.'),
          child('Hawkeye #1–4 (1983)', 'Primeira minissérie solo e romance com Bobbi Morse.'),
          child('West Coast Avengers #1–4', 'Formação do time da Costa Oeste.'),
          child('Avengers West Coast Epic Collections', 'A longa liderança de Clint.'),
          child('Hawkeye: Solo Avengers Classic', 'Histórias solo e encontros com outros Vingadores.')
        ]),
        run('Thunderbolts, New Avengers e Ronin', 'Clint lidera antigos vilões e retorna após House of M.', [
          child('Thunderbolts #20–50', 'Clint assume a liderança da equipe.'),
          child('Avengers Disassembled', 'O fim trágico da velha equipe.'),
          child('House of M #1–8', 'Retorno de Clint numa realidade alterada.'),
          child('New Avengers #26–37', 'Clint assume a identidade de Ronin.'),
          child('Hawkeye & Mockingbird #1–6', 'Clint e Bobbi voltam a trabalhar juntos.'),
          child('Widowmaker #1–4', 'Crossover com Black Widow e Mockingbird.')
        ])
      ]),
      section('fraction', 'Hawkeye por Fraction e Aja', [
        run('Clint Barton e Kate Bishop', 'A celebrada fase sobre o que Clint faz quando não está com os Vingadores.', [
          child('Vol. 1: My Life as a Weapon', 'Hawkeye (2012) #1–5 e Young Avengers Presents #6.'),
          child('Vol. 2: Little Hits', 'Hawkeye #6–11.'),
          child('Vol. 3: L.A. Woman', 'Hawkeye #14, #16, #18 e #20; foco em Kate.'),
          child('Vol. 4: Rio Bravo', 'Hawkeye #12–13, #15, #17 e #19, #21–22.'),
          child('Hawkeye by Fraction & Aja Omnibus', 'A run completa numa única coleção.')
        ]),
        run('All-New Hawkeye', 'Jeff Lemire explora a infância de Clint e o futuro possível de Clint e Kate.', [
          child('Vol. 1: Anchor Points', 'All-New Hawkeye (2015A) #1–5.'),
          child('Vol. 2: Hawkeyes', 'All-New Hawkeye (2015B) #1–6.'),
          child('Occupy Avengers Vols. 1–2', 'Clint viaja pelo país após Civil War II.'),
          child('Tales of Suspense: Hawkeye & Winter Soldier #100–104', 'Busca por Natasha Romanoff.'),
          child('Hawkeye: Freefall #1–6', 'Clint, Ronin e o Rei do Crime.')
        ])
      ]),
      section('kate', 'Kate Bishop em carreira solo', [
        run('Young Avengers e Los Angeles', 'Kate conquista o nome Hawkeye e abre sua própria agência.', [
          child('Young Avengers #1–12 e Special', 'Formação da equipe e início de Kate.'),
          child('Young Avengers Presents #6', 'Clint entrega oficialmente o nome Hawkeye a Kate.'),
          child('Young Avengers por Kieron Gillen', 'Young Avengers (2013) #1–15.'),
          child('Hawkeye: Kate Bishop Vol. 1 — Anchor Points', 'Hawkeye (2016) #1–6.'),
          child('Vol. 2: Masks', 'Hawkeye #7–12.'),
          child('Vol. 3: Family Reunion', 'Hawkeye #13–16 e Generations.')
        ]),
        run('West Coast Avengers e novas aventuras', 'Kate monta sua equipe e volta para Nova York.', [
          child('West Coast Avengers Vol. 1: Best Coast', 'West Coast Avengers (2018) #1–4.'),
          child('Vol. 2: City of Evils', 'West Coast Avengers #5–10.'),
          child('Hawkeye: Kate Bishop #1–5', 'Kate retorna para casa e investiga um retiro suspeito.'),
          child('Black Widow & Hawkeye #1–4', 'Missão com Natasha e Clint.')
        ])
      ])
    ]),

    order('scarlet-witch-reading-order', 'Marvel', 'Vingadores', 'Feiticeira Escarlate — Ordem de Leitura', 'https://www.comicbooktreasury.com/scarlet-witch-reading-order/', [
      section('foundation', 'Irmandade, Vingadores, Visão e Wanda', [
        run('Os primeiros anos de Wanda Maximoff', 'De integrante relutante da Irmandade a pilar dos Vingadores.', [
          child('X-Men #4–7 e #11', 'Primeiras aparições de Wanda e Pietro.'),
          child('Avengers #16–49', 'A primeira formação do Kooky Quartet.'),
          child('Avengers Epic: Behold… The Vision', 'Chegada do Visão e início do relacionamento.'),
          child('Giant-Size Avengers #4', 'Casamento de Wanda e Visão.'),
          child('Avengers #181–200', 'Wanda, Pietro, Django Maximoff e o período de Wundagore.')
        ]),
        run('Visão e Feiticeira Escarlate', 'Família, filhos e as tragédias que preparam Avengers Disassembled.', [
          child('Vision and the Scarlet Witch #1–4 (1982)', 'Primeira minissérie do casal.'),
          child('Vision and the Scarlet Witch #1–12 (1985)', 'A vida familiar e o nascimento dos gêmeos.'),
          child('West Coast Avengers #42–45', 'Vision Quest.'),
          child('Avengers West Coast #51–62', 'Darker Than Scarlet.'),
          child('Avengers: Disassembled', 'Avengers #500–503 e Finale.'),
          child('House of M #1–8', 'Wanda remodela o mundo.')
        ])
      ]),
      section('return', 'Retorno e primeira grande série solo', [
        run('Children’s Crusade e Uncanny Avengers', 'Os Jovens Vingadores procuram Wanda e ela volta à vida heroica.', [
          child('Avengers: The Children’s Crusade #1–9', 'Busca por Wanda e destino de Wiccan e Speed.'),
          child('Avengers vs. X-Men #0–12', 'Wanda enfrenta a Força Fênix.'),
          child('Uncanny Avengers Vols. 1–5', 'Wanda entra na Unity Squad.'),
          child('AXIS #1–9', 'Consequências do confronto com Red Onslaught.'),
          child('Uncanny Avengers Vol. 2', 'Nova formação antes de Secret Wars.')
        ]),
        run('Scarlet Witch por James Robinson', 'Wanda viaja pelo mundo para reparar a feitiçaria.', [
          child('Vol. 1: Witches’ Road', 'Scarlet Witch (2015) #1–5.'),
          child('Vol. 2: World of Witchcraft', 'Scarlet Witch #6–10.'),
          child('Vol. 3: The Final Hex', 'Scarlet Witch #11–15.'),
          child('Doctor Strange: Last Days of Magic', 'Leitura paralela para a crise da magia.'),
          child('Vision by Tom King #1–12', 'Leitura opcional sobre a família do Visão.')
        ])
      ]),
      section('orlando', 'A Última Porta — Steve Orlando', [
        run('Scarlet Witch e Quicksilver', 'Wanda abre uma loja para quem não tem mais a quem recorrer.', [
          child('Vol. 1: The Last Door', 'Scarlet Witch (2023) #1–5 e Annual.'),
          child('Vol. 2: Magnum Opus', 'Scarlet Witch (2023) #6–10.'),
          child('Scarlet Witch & Quicksilver #1–4', 'Os gêmeos enfrentam uma ameaça familiar.'),
          child('Scarlet Witch (2024) Vol. 1: Queen of Chaos', 'Scarlet Witch #1–5.'),
          child('Vol. 2: Amaranth Rising', 'Scarlet Witch #6–10.')
        ]),
        run('Wanda nos Vingadores de Jed MacKay', 'Acompanhe em paralelo à série solo.', [
          child('Avengers Vol. 1: The Impossible City', 'Avengers (2023) #1–6.'),
          child('Vol. 2: Twilight Dreaming', 'Avengers #7–11.'),
          child('Vol. 3: Blood Hunt', 'Avengers #12–16.'),
          child('Vol. 4: Storm', 'Avengers #17–23.')
        ])
      ])
    ]),

    order('captain-marvel-carol-danvers-reading-order', 'Marvel', 'Vingadores', 'Capitã Marvel — Carol Danvers', 'https://www.comicbooktreasury.com/carol-danvers-reading-order/', [
      section('msmarvel', 'De Carol Danvers a Ms. Marvel e Binary', [
        run('Origem e a primeira Ms. Marvel', 'Carol ganha poderes Kree, entra nos Vingadores e encontra Rogue.', [
          child('Captain Marvel Masterworks Vols. 1–2', 'Marvel Super-Heroes #12–13 e Captain Marvel #1–21.'),
          child('Ms. Marvel Epic: This Woman, This Warrior', 'Ms. Marvel (1977) #1–14 e participações.'),
          child('Epic: The Woman Who Fell to Earth', 'Ms. Marvel #15–23, Avengers #200 e Annual #10.'),
          child('Uncanny X-Men #150, #153–171', 'Carol com os X-Men e transformação em Binary.'),
          child('Avengers #4 (1998) em diante', 'Retorno como Warbird e luta contra o alcoolismo.')
        ]),
        run('Ms. Marvel (2006)', 'Carol volta ao primeiro plano durante House of M, Civil War e Secret Invasion.', [
          child('Vol. 1: Best of the Best', 'Ms. Marvel (2006) #1–5.'),
          child('Vol. 2: Civil War', 'Ms. Marvel #6–10 e Special.'),
          child('Vol. 3: Operation Lightning Storm', 'Ms. Marvel #11–17.'),
          child('Vols. 4–6', 'Ms. Marvel #18–34 e Annual.'),
          child('Vols. 7–9', 'Ms. Marvel #35–50 e especiais.')
        ])
      ]),
      section('deconnick', 'Carol se torna Capitã Marvel', [
        run('Kelly Sue DeConnick', 'O novo uniforme, o novo nome e a fase que define a Carol moderna.', [
          child('Earth’s Mightiest Hero Vol. 1', 'Captain Marvel (2012) #1–12.'),
          child('Vol. 2', 'Captain Marvel #13–17, Enemy Within e Avengers Assemble.'),
          child('Vol. 3', 'Captain Marvel (2014) #1–11.'),
          child('Vol. 4', 'Captain Marvel #12–15 e Carol Corps #1–4.'),
          child('The Enemy Within', 'Crossover completo com Avengers Assemble.')
        ]),
        run('Alpha Flight, Civil War II e Life of Captain Marvel', 'Carol lidera a defesa espacial e confronta Tony Stark.', [
          child('Earth’s Mightiest Hero Vol. 5', 'Captain Marvel (2016) #1–10.'),
          child('Civil War II #0–8', 'Evento central com Carol no comando.'),
          child('Mighty Captain Marvel #0–9', 'Fase de Margaret Stohl.'),
          child('Captain Marvel #125–129', 'Dark Origins.'),
          child('The Life of Captain Marvel #1–5', 'Nova exploração de sua origem familiar.')
        ])
      ]),
      section('thompson', 'Captain Marvel por Kelly Thompson', [
        run('A longa série de 2019', 'Carol enfrenta Nuclear Man, Vox Supreme, magia e os Brood.', [
          child('Vol. 1: Re-Entry', 'Captain Marvel (2019) #1–5.'),
          child('Vol. 2: Falling Star', 'Captain Marvel #6–11.'),
          child('Vol. 3: The Last Avenger', 'Captain Marvel #12–16.'),
          child('Vols. 4–6', 'Captain Marvel #17–30; Empyre e Strange Magic.'),
          child('Vols. 7–8', 'Captain Marvel #31–41; Last of the Marvels e Trials.'),
          child('Revenge of the Brood Parts 1–2', 'Captain Marvel #42–50.')
        ]),
        run('Fases recentes', 'Novos uniformes, novas equipes e o futuro de Carol.', [
          child('Captain Marvel: The Omen', 'Captain Marvel (2023) #1–5.'),
          child('Captain Marvel: The Undone', 'Captain Marvel (2023) #6–10.'),
          child('Avengers by Jed MacKay', 'Carol lidera a equipe a partir de Avengers #1 (2023).'),
          child('Aliens vs. Avengers', 'Minissérie alternativa de Jonathan Hickman e Esad Ribić.')
        ])
      ])
    ]),

    order('black-panther-reading-order', 'Marvel', 'Vingadores', 'Pantera Negra — Ordem de Leitura', 'https://www.comicbooktreasury.com/black-panther-reading-order/', [
      section('classic', 'Wakanda, Vingadores e os clássicos', [
        run('Primeiros anos de T’Challa', 'Da estreia no Quarteto Fantástico ao primeiro grande ciclo solo.', [
          child('Fantastic Four #52–53', 'Primeira aparição de T’Challa e Wakanda.'),
          child('Avengers #52–88', 'Entrada e primeira longa passagem nos Vingadores.'),
          child('Jungle Action #6–18 — Panther’s Rage', 'A saga de Don McGregor em Wakanda.'),
          child('Jungle Action #19–24', 'Panther vs. the Klan.'),
          child('Black Panther (1977) #1–15', 'Série de Jack Kirby.'),
          child('Panther’s Prey #1–4', 'Retorno de Don McGregor ao personagem.')
        ]),
        run('Black Panther por Christopher Priest', 'A run que redefine T’Challa como rei, estrategista e figura geopolítica.', [
          child('Complete Collection Vol. 1', 'Black Panther (1998) #1–17.'),
          child('Vol. 2', 'Black Panther #18–35 e Deadpool #44.'),
          child('Vol. 3', 'Black Panther #36–49, #57–58 e participações.'),
          child('Vol. 4', 'Black Panther #50–56, #59–62 e The Crew #1–7.'),
          child('The Client / Enemy of the State', 'Os dois primeiros arcos, ótima porta de entrada.')
        ])
      ]),
      section('hudlin', 'Reginald Hudlin, Shuri e Doomwar', [
        run('Quem é o Pantera Negra?', 'Nova versão da origem, casamento com Tempestade e Guerra Civil.', [
          child('Who Is the Black Panther?', 'Black Panther (2005) #1–6.'),
          child('Wild Kingdom', 'Black Panther #7–13.'),
          child('Bad Mutha', 'Black Panther #14–18.'),
          child('Bride of the Panther', 'Black Panther #19–25.'),
          child('Four the Hard Way / Little Green Men', 'Black Panther #26–38.'),
          child('Secret Invasion: See Wakanda and Die', 'Black Panther #39–41.')
        ]),
        run('Shuri assume o manto', 'T’Challa se recupera enquanto sua irmã governa Wakanda.', [
          child('Black Panther: Deadliest of the Species', 'Black Panther (2009) #1–6.'),
          child('Power', 'Black Panther #7–12.'),
          child('Doomwar #1–6', 'Wakanda enfrenta Latvéria.'),
          child('Black Panther: Man Without Fear #513–518', 'T’Challa protege Hell’s Kitchen.'),
          child('Most Dangerous Man Alive #519–529', 'Conclusão da fase urbana.')
        ])
      ]),
      section('modern', 'Ta-Nehisi Coates e as fases atuais', [
        run('A Nation Under Our Feet', 'Revolução política, deuses ausentes e a reconstrução de Wakanda.', [
          child('Book One', 'Black Panther (2016) #1–4.'),
          child('Book Two', 'Black Panther #5–8.'),
          child('Book Three', 'Black Panther #9–12.'),
          child('Avengers of the New World Books 1–2', 'Black Panther #13–18.'),
          child('Intergalactic Empire of Wakanda Parts 1–4', 'Black Panther (2018) #1–25.')
        ]),
        run('Ridley, Eve Ewing e Ultimate', 'Conspirações em Wakanda, vida nas ruas e uma nova realidade.', [
          child('The Long Shadow', 'Black Panther (2021) #1–5.'),
          child('Range Wars', 'Black Panther #6–10.'),
          child('All This and the World Too', 'Black Panther #11–15.'),
          child('Reign at Dusk Vol. 1', 'Black Panther (2023) #1–5.'),
          child('Reign at Dusk Vol. 2', 'Black Panther #6–10.'),
          child('Ultimate Black Panther Vol. 1', 'Ultimate Black Panther (2024) #1–6.'),
          child('Ultimate Black Panther Vol. 2', 'Ultimate Black Panther #7–12.')
        ])
      ])
    ]),

    order('ant-man-wasp-reading-order', 'Marvel', 'Vingadores', 'Homem-Formiga e Vespa — Ordem de Leitura', 'https://www.comicbooktreasury.com/ant-man-reading-order/', [
      section('founders', 'Hank Pym e Janet van Dyne', [
        run('Tales to Astonish e fundação dos Vingadores', 'O cientista, a socialite e as várias identidades de Hank.', [
          child('Tales to Astonish #27', 'Primeira aventura de Hank Pym.'),
          child('Tales to Astonish #35–43', 'Hank atua como Homem-Formiga.'),
          child('Tales to Astonish #44–69', 'Janet surge como Vespa e forma a dupla.'),
          child('Avengers #1–16', 'Os dois fundam os Vingadores; Janet nomeia a equipe.'),
          child('Avengers #28–60', 'Hank como Golias e Jaqueta Amarela.'),
          child('Avengers #212–230', 'Queda de Hank e divórcio de Janet.')
        ]),
        run('Legados de Hank e Janet', 'Histórias que aprofundam o casal e seu impacto nos Vingadores.', [
          child('West Coast Avengers #21–45', 'Hank se recupera e atua como cientista aventureiro.'),
          child('Avengers Forever #1–12', 'A Jaqueta Amarela no centro de uma crise temporal.'),
          child('Mighty Avengers #1–20', 'Janet e Hank durante Initiative e Secret Invasion.'),
          child('Mighty Avengers por Dan Slott', 'Hank lidera uma equipe após Secret Invasion.'),
          child('Avengers Academy #1–39', 'Hank orienta jovens heróis.'),
          child('Uncanny Avengers: Rage of Ultron', 'Confronto decisivo entre Hank e Ultron.')
        ])
      ]),
      section('scott', 'Scott Lang — o segundo Homem-Formiga', [
        run('Origem, Quarteto Fantástico e Vingadores', 'Scott rouba o traje para salvar a filha e conquista a confiança de Hank.', [
          child('Marvel Premiere #47–48', 'Origem de Scott Lang.'),
          child('Iron Man #133–135', 'Primeiras missões após assumir o traje.'),
          child('Fantastic Four #384–416', 'Scott trabalha com o Quarteto Fantástico.'),
          child('Avengers #62–76 (1998)', 'Scott integra os Vingadores antes de Disassembled.'),
          child('Avengers: The Children’s Crusade', 'Retorno de Scott e reunião com Cassie.')
        ]),
        run('Ant-Man por Nick Spencer', 'Scott abre uma empresa em Miami e tenta ser um pai melhor.', [
          child('Vol. 1: Second-Chance Man', 'Ant-Man (2015) #1–5.'),
          child('Annual #1 / Last Days #1–4', 'O fim antes de Secret Wars.'),
          child('Astonishing Ant-Man Vol. 1: Everybody Loves Team-Ups', 'Astonishing Ant-Man #1–6.'),
          child('Vol. 2: Small-Time Criminal', 'Astonishing Ant-Man #7–11.'),
          child('Vol. 3: The Trial of Ant-Man', 'Astonishing Ant-Man #12–13 e material relacionado.'),
          child('Ant-Man (2020) #1–5', 'Scott e Cassie combatem uma ameaça de insetos.')
        ])
      ]),
      section('wasps', 'Janet e Nadia van Dyne', [
        run('A Vespa original', 'Janet como heroína solo, líder e símbolo dos Vingadores.', [
          child('Avengers #217 e #227–279', 'Janet preside uma das formações mais importantes da equipe.'),
          child('Avengers Forever', 'O legado dos fundadores visto através do tempo.'),
          child('Uncanny Avengers #5–23', 'Janet integra a Unity Squad.'),
          child('Wasp #1–4 (2023)', 'Minissérie de Al Ewing sobre Janet, Nadia e a família van Dyne.'),
          child('Avengers Inc. #1–5', 'Janet investiga crimes de super-heróis.')
        ]),
        run('The Unstoppable Wasp — Nadia', 'A filha de Hank escapa da Sala Vermelha e cria o G.I.R.L.', [
          child('Vol. 1: Unstoppable!', 'Unstoppable Wasp (2017) #1–4.'),
          child('Vol. 2: Agents of G.I.R.L.', 'Unstoppable Wasp #5–8.'),
          child('Vol. 1: Unlimited Vol. 1', 'Unstoppable Wasp (2018) #1–5.'),
          child('Vol. 2: G.I.R.L. vs A.I.M.', 'Unstoppable Wasp #6–10.'),
          child('Ant-Man and the Wasp #1–5', 'Scott Lang e Nadia numa aventura no Microverso.')
        ])
      ])
    ]),

    order('aquaman-reading-order', 'DC', 'Liga da Justiça', 'Aquaman — Ordem de Leitura', 'https://www.comicbooktreasury.com/aquaman-reading-order/', [
      section('postcrisis', 'Pós-Crise — Atlântida e o rei guerreiro', [
        run('A nova origem de Arthur Curry', 'As minisséries que reconstroem Atlântida após Crise nas Infinitas Terras.', [
          child('Aquaman #1–4 (1986)', 'A minissérie do uniforme azul.'),
          child('Aquaman Special #1 (1988)', 'Releitura pós-Crise da origem.'),
          child('The Legend of Aquaman', 'Aquaman (1989) #1–5 e Special.'),
          child('Aquaman (1991) #1–13', 'A série de Shaun McLaughlin.'),
          child('Atlantis Chronicles #1–7', 'Peter David conta a história de Atlântida.'),
          child('Time and Tide #1–4', 'Origem moderna e ponte para a série de 1994.')
        ]),
        run('Aquaman por Peter David', 'Arthur perde a mão, assume o arpão e reúne uma nova família de heróis do mar.', [
          child('Book One', 'Aquaman (1994) #0–8 e Time and Tide #1–4.'),
          child('Book Two', 'Aquaman #9–20 e Annual #1.'),
          child('Aquaman #21–35', 'Koryak, Dolphin e conflitos pelo trono.'),
          child('Aquaman #36–49', 'A guerra de Atlântida e conclusão da fase.'),
          child('Tempest #1–4', 'Garth assume uma nova identidade.'),
          child('JLA por Grant Morrison', 'Arthur integra a formação principal da Liga.')
        ])
      ]),
      section('subdiego', 'Waterbearer, Sub-Diego e Brightest Day', [
        run('Aquaman (2003)', 'Magia aquática, a cidade submersa e a luta para proteger seus habitantes.', [
          child('Vol. 1: The Waterbearer', 'Aquaman (2003) #1–6 e Secret Files.'),
          child('Aquaman #7–14', 'Continuação digital da fase inicial.'),
          child('Vol. 2: Sub Diego', 'Aquaman #15–22.'),
          child('Vol. 3: To Serve and Protect', 'Aquaman #23–31.'),
          child('Vol. 4: Kingdom Lost', 'Aquaman #32–39.'),
          child('Sword of Atlantis #40–57', 'Arthur Joseph Curry assume o nome Aquaman.')
        ]),
        run('Blackest Night e Brightest Day', 'Morte, ressurreição e restauração da família de Aquaman.', [
          child('Blackest Night #0–8', 'Arthur retorna como Lanterna Negro.'),
          child('Blackest Night: Aquaman', 'Edições ligadas aos personagens de Atlântida.'),
          child('Brightest Day #0–24', 'Arthur e Mera voltam ao centro do Universo DC.'),
          child('Aquaman: Death of a Prince', 'Leitura clássica recomendada para entender a família Curry.'),
          child('Brightest Day Aftermath: The Search for Swamp Thing #1–3', 'Ponte para o New 52.')
        ])
      ]),
      section('new52', 'New 52 — Geoff Johns e sucessores', [
        run('Aquaman por Geoff Johns', 'O ponto de entrada moderno mais direto para Arthur e Mera.', [
          child('Vol. 1: The Trench', 'Aquaman (2011) #1–6.'),
          child('Vol. 2: The Others', 'Aquaman #7–13.'),
          child('Vol. 3: Throne of Atlantis', 'Aquaman #0, #14–16 e Justice League #15–17.'),
          child('Vol. 4: Death of a King', 'Aquaman #17–19 e #21–25.'),
          child('Black Manta #23.1 / Ocean Master #23.2', 'Capítulos de vilões do período Forever Evil.')
        ]),
        run('Depois de Geoff Johns', 'Jeff Parker, Cullen Bunn e Dan Abnett levam a série até Rebirth.', [
          child('Vol. 5: Sea of Storms', 'Aquaman #26–31 e Annual #2.'),
          child('Vol. 6: Maelstrom', 'Aquaman #32–40 e Secret Origins.'),
          child('Aquaman and the Others Vols. 1–2', 'Série paralela #1–11 e especiais.'),
          child('Vol. 7: Exiled', 'Aquaman #41–48.'),
          child('Vol. 8: Out of Darkness', 'Aquaman #49–52 e prévia de Rebirth.')
        ])
      ]),
      section('rebirth', 'Rebirth e era recente', [
        run('Aquaman por Dan Abnett', 'Diplomacia, guerra civil em Atlântida e o reinado de Corum Rath.', [
          child('Vol. 1: The Drowning', 'Aquaman (2016) #1–6 e Rebirth.'),
          child('Vol. 2: Black Manta Rising', 'Aquaman #7–15.'),
          child('Vol. 3: Crown of Atlantis', 'Aquaman #16–24.'),
          child('Vol. 4: Underworld', 'Aquaman #25–30.'),
          child('Vol. 5: The Crown Comes Down', 'Aquaman #31–38.'),
          child('Vol. 6: Kingslayer', 'Aquaman #39–42 e Suicide Squad #45–46.')
        ]),
        run('Kelly Sue DeConnick e Aquamen', 'Amnésia, novos deuses do mar e o legado de Jackson Hyde.', [
          child('Vol. 1: Unspoken Water', 'Aquaman #43–47.'),
          child('Vol. 2: Amnesty', 'Aquaman #48–52.'),
          child('Vol. 3: Manta vs. Machine', 'Aquaman #53–57 e Annual.'),
          child('Vol. 4: Echoes of a Life Lived Well', 'Aquaman #58–65.'),
          child('Aquaman: The Becoming #1–6', 'Jackson Hyde se prepara para o manto.'),
          child('Black Manta #1–6', 'Série paralela de David Hyde.'),
          child('Aquamen #1–6', 'Arthur e Jackson dividem o protagonismo.')
        ])
      ])
    ]),

    order('martian-manhunter-reading-order', 'DC', 'Liga da Justiça', 'Caçador de Marte — Ordem de Leitura', 'https://www.comicbooktreasury.com/martian-manhunter-reading-order-jonn-jonzz/', [
      section('postcrisis', 'Pós-Crise e Liga da Justiça Internacional', [
        run('Nova origem e JLI', 'J’onn é o elo entre a antiga Liga e a nova equipe de Giffen e DeMatteis.', [
          child('Martian Manhunter #1–4 (1988)', 'Minissérie que atualiza a origem pós-Crise.'),
          child('Justice League International Vol. 1', 'Justice League #1–6 e JLI #7–25.'),
          child('Justice League International Vol. 2', 'Justice League America #26–50 e séries paralelas.'),
          child('Justice League International Vol. 3', 'Justice League America #51–60 e material posterior.'),
          child('Martian Manhunter: American Secrets #1–3', 'Mistério ambientado em 1959, fora da continuidade estrita.'),
          child('Justice League Task Force #1–37', 'J’onn lidera a equipe de missões especiais.')
        ]),
        run('Martian Manhunter por Ostrander e Mandrake', 'A série que explora as identidades de J’onn e a sociedade marciana.', [
          child('Vol. 1: Son of Mars', 'Martian Manhunter (1998) #0–9.'),
          child('Vol. 2: Rings of Saturn', 'Martian Manhunter #10–17 e #1.000.000.'),
          child('Martian Manhunter #18–25', 'Identidades humanas e novas ameaças marcianas.'),
          child('Martian Manhunter #26–33', 'Conspiração e segredos do passado.'),
          child('Martian Manhunter #34–38', 'Conclusão da série.'),
          child('JLA por Grant Morrison e Mark Waid', 'Leitura paralela essencial da mesma época.')
        ])
      ]),
      section('death-return', 'Crises, morte e retorno', [
        run('Outsiders, Final Crisis e Blackest Night', 'O período sombrio que leva à morte e ressurreição de J’onn.', [
          child('Martian Manhunter: Others Among Us #1–8', 'Nova série e visual após Infinite Crisis.'),
          child('Salvation Run #1–7', 'J’onn se infiltra no planeta-prisão.'),
          child('Final Crisis #1 / Final Crisis: Requiem', 'Morte e homenagem ao Caçador de Marte.'),
          child('Blackest Night #0–8', 'Retorno como Lanterna Negro e ressurreição.'),
          child('Brightest Day #0–24', 'J’onn descobre o motivo de seu retorno.')
        ]),
        run('New 52', 'Stormwatch, Justice League of America e uma nova interpretação solo.', [
          child('Stormwatch Vol. 1: The Dark Side', 'Stormwatch (2011) #1–6.'),
          child('Stormwatch Vols. 2–4', 'Stormwatch #7–24 e especiais.'),
          child('Justice League of America: World’s Most Dangerous', 'Justice League of America (2013) #1–7.'),
          child('Justice League United Vols. 1–2', 'Justice League United #0–10 e Annual.'),
          child('Martian Manhunter Vol. 1: The Epiphany', 'Martian Manhunter (2015) #1–6.'),
          child('Vol. 2: The Red Rising', 'Martian Manhunter #7–12 e JLA #5.')
        ])
      ]),
      section('recent', 'Rebirth, Black Label e Absolute', [
        run('Identidade e memória', 'Histórias recentes que voltam à origem marciana e à vida de John Jones.', [
          child('Martian Manhunter: Identity #1–6', 'Steve Orlando e Riley Rossmo reconstroem a origem de J’onn.'),
          child('Justice League by Scott Snyder Vols. 1–6', 'J’onn lidera a Liga durante Totality e Doom War.'),
          child('Justice League: Last Ride #1–7', 'Futuro alternativo com J’onn no centro da ruptura.'),
          child('DC: The New Frontier #1–6', 'Versão alternativa excelente como introdução ao personagem.')
        ]),
        run('Absolute Martian Manhunter', 'Uma reinvenção psíquica e experimental de John Jones.', [
          child('DC All In Special #1', 'Nascimento do Universo Absolute.'),
          child('Absolute Martian Manhunter #1', 'Primeiro contato de John com uma presença marciana.'),
          child('Absolute Martian Manhunter #2', 'A mente do agente começa a se transformar.'),
          child('Absolute Martian Manhunter #3', 'Camadas de identidade e percepção.'),
          child('Absolute Martian Manhunter #4–7', 'Conclusão do primeiro arco.')
        ])
      ])
    ]),

    order('shazam-reading-order', 'DC', 'Liga da Justiça', 'Shazam — Ordem de Leitura', 'https://www.comicbooktreasury.com/captain-marvel-shazam-reading-order-dc-comics/', [
      section('postcrisis', 'Pós-Crise — o Poder de Shazam', [
        run('Billy Batson reintroduzido', 'A transição das histórias clássicas para a continuidade pós-Crise.', [
          child('Shazam! The New Beginning #1–4', 'Primeira origem pós-Crise.'),
          child('The Power of Shazam! Graphic Novel', 'Jerry Ordway redefine Billy, Sivana e Adão Negro.'),
          child('The Power of Shazam! #1–12', 'Primeiro ano da série regular.'),
          child('The Power of Shazam! #13–23', 'A Família Marvel cresce.'),
          child('The Power of Shazam! #24–36', 'Conflitos com Mister Mind e Sivana.'),
          child('The Power of Shazam! #37–47 e #1.000.000', 'Conclusão da série.')
        ]),
        run('JSA, Trials e Monster Society', 'Billy e Adão Negro entram no centro da Sociedade da Justiça.', [
          child('JSA: Darkness Falls', 'JSA #6–15; retorno de Adão Negro.'),
          child('JSA: Stealing Thunder', 'JSA #32–45.'),
          child('JSA: Black Reign', 'JSA #56–58 e Hawkman #23–25.'),
          child('Day of Vengeance #1–6', 'O Espectro declara guerra à magia.'),
          child('The Trials of Shazam! #1–12', 'Freddy Freeman busca assumir o poder.'),
          child('Shazam! The Monster Society of Evil #1–4', 'Releitura independente de Jeff Smith.')
        ])
      ]),
      section('new52', 'New 52 — Geoff Johns', [
        run('Shazam! na Liga da Justiça', 'A origem moderna publicada como história complementar de Justice League.', [
          child('Justice League #7–11', 'Billy conhece o Mago e ganha seus poderes.'),
          child('Justice League #0, #14–16', 'Sivana e Adão Negro se aproximam.'),
          child('Justice League #18–21', 'Conclusão da origem de Shazam.'),
          child('Shazam! Vol. 1', 'A história completa de Geoff Johns e Gary Frank.'),
          child('Justice League: Trinity War', 'Billy entra no conflito das três Ligas.'),
          child('Justice League: Darkseid War — Shazam #1', 'Os novos deuses que alimentam o poder de Billy.')
        ]),
        run('Shazam! (2018)', 'A Família Shazam explora os Sete Reinos Mágicos.', [
          child('Vol. 1: The Seven Magic Lands', 'Shazam! (2018) #1–6.'),
          child('Vol. 2: The Seven Magic Lands Part 2', 'Shazam! #7–11 e #13–14.'),
          child('Shazam! #12 e #15', 'Capítulos finais e histórias isoladas.'),
          child('Black Adam: Endless Winter Special #1', 'Billy e Adão Negro no evento de inverno.')
        ])
      ]),
      section('recent', 'Infinite Frontier, Dawn of DC e Absolute', [
        run('Billy, Mary e a Família Shazam', 'O poder muda de mãos e ganha novos pontos de entrada.', [
          child('Shazam! (2021) #1–4', 'Billy na Academia Jovens Titãs.'),
          child('The New Champion of Shazam! #1–4', 'Mary Bromfield assume o protagonismo.'),
          child('Lazarus Planet: We Once Were Gods #1', 'Ponte para a fase Dawn of DC.'),
          child('Shazam! Vol. 1: Meet the Captain!', 'Shazam! (2023) #1–6.'),
          child('Vol. 2: Moving Day', 'Shazam! #7–12.'),
          child('Vol. 3: Welcome to the Wildlands', 'Shazam! #13–18.')
        ]),
        run('Adão Negro — leitura paralela', 'O rival e antecessor de Billy em suas principais fases solo.', [
          child('Black Adam: The Dark Age #1–6', 'Teth-Adam tenta recuperar seus poderes e Isis.'),
          child('52 #1–52', 'A família Black Marvel e a queda de Kahndaq.'),
          child('Black Adam Vol. 1: Theogony', 'Black Adam (2022) #1–6.'),
          child('Black Adam Vol. 2: East of Egypt', 'Black Adam #7–12.'),
          child('Justice Society of America (2022)', 'Legado de Black Adam na JSA.')
        ])
      ])
    ]),

    order('cyborg-reading-order', 'DC', 'Liga da Justiça', 'Ciborgue — Ordem de Leitura', 'https://www.comicbooktreasury.com/dc-comics-reading-orders/', [
      section('titans', 'Novos Titãs — origem de Victor Stone', [
        run('The New Teen Titans', 'A fase essencial de Marv Wolfman e George Pérez.', [
          child('DC Comics Presents #26', 'Primeira aparição de Victor Stone e da nova equipe.'),
          child('New Teen Titans Vol. 1', 'The New Teen Titans #1–8.'),
          child('Vol. 2', 'The New Teen Titans #9–16.'),
          child('Vol. 3', 'The New Teen Titans #17–20 e Tales #1–4.'),
          child('The Judas Contract', 'Tales of the Teen Titans #42–44 e Annual #3.'),
          child('New Teen Titans: The Terror of Trigon', 'The New Teen Titans (1984) #1–5.')
        ]),
        run('Reconstruções e Titans', 'Victor passa por várias transformações antes do reboot.', [
          child('New Titans #50–61', 'Cyborg, Technis e a busca por humanidade.'),
          child('JLA/Titans #1–3', 'A entidade Technis ameaça o planeta.'),
          child('Titans #1–25 (1999)', 'Victor retorna à equipe principal.'),
          child('Teen Titans #1–33 (2003)', 'Cyborg atua como mentor da nova geração.'),
          child('Titans East Special / Titans #1–12 (2008)', 'Reunião da formação clássica.')
        ])
      ]),
      section('new52', 'New 52 — fundador da Liga da Justiça', [
        run('Justice League por Geoff Johns', 'Victor é reconstruído por uma Caixa Materna durante a invasão de Darkseid.', [
          child('Justice League Vol. 1: Origin', 'Justice League (2011) #1–6.'),
          child('Vol. 2: The Villain’s Journey', 'Justice League #7–12.'),
          child('Throne of Atlantis', 'Justice League #15–17 e Aquaman #14–16.'),
          child('Trinity War / Forever Evil', 'A Rede é atacada e Victor ganha um novo corpo.'),
          child('Injustice League', 'Justice League #30–39.'),
          child('Darkseid War', 'Justice League #40–50 e especiais.')
        ]),
        run('Primeira série solo', 'Victor enfrenta ameaças digitais, tecnológicas e familiares.', [
          child('Vol. 1: Unplugged', 'Cyborg (2015) #1–6.'),
          child('Vol. 2: Enemy of the State', 'Cyborg (2015) #7–12.'),
          child('Cyborg: Rebirth #1', 'Ponte para a nova fase.'),
          child('Vol. 1: The Imitation of Life', 'Cyborg (2016) #1–5.'),
          child('Vol. 2: Danger in Detroit', 'Cyborg #6–13.'),
          child('Vol. 3: Singularity', 'Cyborg #14–20.')
        ])
      ]),
      section('recent', 'Liga da Justiça Odisseia e Dawn of DC', [
        run('Odisseia cósmica', 'Victor lidera uma equipe através do Setor Fantasma.', [
          child('Justice League: No Justice #1–4', 'Prólogo que reorganiza as equipes.'),
          child('Justice League Odyssey Vol. 1: The Ghost Sector', 'Justice League Odyssey #1–5.'),
          child('Vol. 2: Death of the Dark', 'Justice League Odyssey #6–12.'),
          child('Vol. 3: The Last Stand', 'Justice League Odyssey #13–18.'),
          child('Vol. 4: Last Stand', 'Justice League Odyssey #19–25.')
        ]),
        run('Cyborg: Homecoming', 'Victor volta a Detroit e confronta uma ameaça ligada à tecnologia de seu pai.', [
          child('DC Power: A Celebration #1', 'História que prepara a nova série.'),
          child('Cyborg (2023) #1', 'Retorno de Victor a Detroit.'),
          child('Cyborg (2023) #2', 'A ameaça Solace se revela.'),
          child('Cyborg (2023) #3–4', 'Família, cidade e consciência digital.'),
          child('Cyborg (2023) #5–6', 'Conclusão da minissérie.')
        ])
      ])
    ]),

    order('zatanna-reading-order', 'DC', 'Constantine e o lado místico', 'Zatanna — Ordem de Leitura', 'https://www.comicbooktreasury.com/zatanna-reading-order/', [
      section('postcrisis', 'Pós-Crise e a magia da DC', [
        run('De Zatara a Seven Soldiers', 'A busca pelo pai, a Liga e as histórias que definem a Zatanna moderna.', [
          child('The Search for Zatara', 'Hawkman #4, Atom #19, Green Lantern #42 e capítulos seguintes.'),
          child('Justice League of America #161–190', 'Zatanna se torna integrante regular da Liga.'),
          child('Saga of the Swamp Thing #49–50', 'Crise mágica e destino de Zatara.'),
          child('Zatanna Special #1 (1987)', 'Exploração da linhagem de Sindella.'),
          child('Zatanna: Come Together #1–4', 'Primeira minissérie solo.'),
          child('Zatanna: Everyday Magic #1', 'Encontro com John Constantine.')
        ]),
        run('Identity Crisis e Seven Soldiers', 'As decisões de Zatanna têm consequências profundas para a Liga.', [
          child('Identity Crisis #1–7', 'O papel controverso de Zatanna na Liga.'),
          child('Seven Soldiers #0', 'Prólogo do projeto de Grant Morrison.'),
          child('Seven Soldiers: Zatanna #1–4', 'Zatanna enfrenta culpa e perda de confiança.'),
          child('Seven Soldiers #1', 'Conclusão compartilhada.'),
          child('Detective Comics #833–834', 'Zatanna e Batman discutem confiança e memória.'),
          child('Black Canary and Zatanna: Bloodspell', 'Aventura e amizade com Dinah Lance.')
        ])
      ]),
      section('dini', 'Zatanna por Paul Dini', [
        run('A primeira série regular', 'Magia de palco, ameaças ocultas e a vida pessoal de Zatanna.', [
          child('Vol. 1: The Mistress of Magic', 'Zatanna (2010) #1–6.'),
          child('Vol. 2: Shades of the Past', 'Zatanna #7–12.'),
          child('Vol. 3: A New Look', 'Zatanna #13–16.'),
          child('Zatanna: Everyday Magic', 'One-shot incluído nas coleções de Paul Dini.'),
          child('Zatanna by Paul Dini Omnibus', 'Série completa, especiais e aparições em Detective Comics.')
        ]),
        run('Justice League Dark — New 52', 'Zatanna se torna o centro mágico da nova equipe.', [
          child('Vol. 1: In the Dark', 'Justice League Dark #1–6.'),
          child('Vol. 2: The Books of Magic', 'Justice League Dark #0, #7–13 e Annual.'),
          child('Vol. 3: The Death of Magic', 'Justice League Dark #14–19.'),
          child('Trinity War / Forever Evil: Blight', 'Justice League Dark #22–29 e séries paralelas.'),
          child('Vols. 5–6', 'Justice League Dark #30–40 e Annual #2.')
        ])
      ]),
      section('rebirth', 'Rebirth, Black Label e All In', [
        run('Justice League Dark por James Tynion IV e Ram V', 'Zatanna e Mulher-Maravilha lideram a defesa contra ameaças mágicas.', [
          child('Vol. 1: The Last Age of Magic', 'Justice League Dark (2018) #1–3 e #5–7.'),
          child('The Witching Hour', 'JLD/Wonder Woman especiais, Wonder Woman #56–57 e JLD #4.'),
          child('Vol. 2: Lords of Order', 'Justice League Dark #8–13 e Annual.'),
          child('Vol. 3: The Witching War', 'Justice League Dark #14–19.'),
          child('Vol. 4: A Costly Trick of Magic', 'Justice League Dark #20–28.'),
          child('Justice League #59–71 backups', 'Continuação da equipe na série principal.')
        ]),
        run('Novas histórias solo', 'Versões independentes e o retorno de Zatanna à estrada.', [
          child('Zatanna: Bring Down the House #1–5', 'Black Label de Mariko Tamaki e Javier Rodríguez.'),
          child('Zatanna: It’s Showtime', 'Coleção da minissérie de Jamal Campbell.'),
          child('Zatanna (2025) #1–6', 'Turnê mágica e novo ponto de entrada.'),
          child('Zatanna & the Ripper Vols. 1–4', 'Webtoon em universo próprio.'),
          child('Mystik U #1–3', 'Zatanna estudante em uma universidade mágica alternativa.')
        ])
      ])
    ]),

    order('justice-league-dark-reading-order', 'DC', 'Constantine e o lado místico', 'Liga da Justiça Sombria — Ordem de Leitura', 'https://www.comicbooktreasury.com/justice-league-dark-reading-order/', [
      section('new52', 'New 52 — a formação original', [
        run('Peter Milligan e Jeff Lemire', 'Constantine, Zatanna, Madame Xanadu, Deadman e Shade enfrentam o impossível.', [
          child('The Search for Swamp Thing #1–3', 'Prólogo opcional antes do reboot.'),
          child('Vol. 1: In the Dark', 'Justice League Dark #1–6.'),
          child('I, Vampire Vol. 2: Rise of the Vampires', 'I, Vampire #7–12 e JLD #7–8.'),
          child('Vol. 2: The Books of Magic', 'Justice League Dark #0, #7–13 e Annual.'),
          child('Vol. 3: The Death of Magic', 'Justice League Dark #14–19.'),
          child('Justice League Dark #20–21', 'Ponte para Trinity War.')
        ]),
        run('Trinity War, Blight e conclusão', 'A equipe entra em eventos maiores sem perder a trama sobrenatural.', [
          child('Trinity War', 'JLA #6–7, Justice League #22–23, JLD #22–23 e tie-ins.'),
          child('Forever Evil: Blight', 'JLD #24–29, Constantine #9–12 e Trinity of Sin.'),
          child('Vol. 5: Paradise Lost', 'Justice League Dark #30–34 e Futures End.'),
          child('Vol. 6: Lost in Forever', 'Justice League Dark #35–40 e Annual #2.'),
          child('Justice League Dark: The New 52 Omnibus', 'A fase completa e seus crossovers principais.')
        ])
      ]),
      section('rebirth', 'Rebirth — Mulher-Maravilha e a Árvore das Maravilhas', [
        run('The Last Age of Magic e Witching Hour', 'A magia está morrendo e Diana reúne uma nova equipe.', [
          child('No Justice #1–4', 'A semente do problema mágico.'),
          child('Vol. 1: The Last Age of Magic', 'Justice League Dark (2018) #1–3 e #5–7.'),
          child('Wonder Woman & JLD: The Witching Hour', 'Especiais, Wonder Woman #56–57 e JLD #4.'),
          child('Vol. 2: Lords of Order', 'Justice League Dark #8–13 e Annual.'),
          child('Vol. 3: The Witching War', 'Justice League Dark #14–19.')
        ]),
        run('A Costly Trick of Magic e backups', 'Ram V conclui a série e continua a equipe em Justice League.', [
          child('Vol. 4: A Costly Trick of Magic', 'Justice League Dark #20–28.'),
          child('Justice League Dark #29', 'Capítulo de Endless Winter.'),
          child('Justice League #59–63 backups', 'Merlin ataca a comunidade mágica.'),
          child('Justice League #64–68 backups', 'Ragman, Etrigan e a busca por aliados.'),
          child('Justice League #69–71 backups / JLD Annual', 'Conclusão do arco de Merlin.')
        ])
      ]),
      section('other', 'Outras versões da equipe', [
        run('Future State, animação e linhas alternativas', 'Histórias independentes que usam o conceito da Liga Sombria.', [
          child('Future State: Justice League #1–2', 'A JLD sobrevive num futuro dominado por Merlin.'),
          child('Justice League Dark: The Great Wickedness', 'Coleção do material Future State e backups.'),
          child('Justice League Dark — The Animated Movie', 'Adaptação em quadrinhos e material ligado à animação.'),
          child('DC vs. Vampires: JLD #1', 'Equipe mágica na realidade de DC vs. Vampires.'),
          child('Knight Terrors: Zatanna #1–2', 'Zatanna e Cliff Steele durante o evento.')
        ])
      ])
    ]),

    order('cyclops-reading-order', 'Marvel', 'X-Men', 'Ciclope — Ordem de Leitura', 'https://www.comicbooktreasury.com/cyclops-reading-order/', [
      section('leader', 'O primeiro X-Man e líder de campo', [
        run('Origem, equipe original e Fênix', 'Scott Summers aprende a liderar e carrega o peso das decisões dos X-Men.', [
          child('X-Men #1–23', 'A formação original e os primeiros anos de Scott.'),
          child('X-Men #32–66', 'Alex Summers, Polaris e o fim da primeira série.'),
          child('Giant-Size X-Men #1 / Uncanny X-Men #94–108', 'Scott lidera a nova formação.'),
          child('Proteus Saga — Uncanny X-Men #125–128', 'A equipe enfrenta o filho de Moira MacTaggert.'),
          child('Dark Phoenix Saga — #129–138', 'A tragédia que define Scott e Jean.'),
          child('Cyclops: The Retribution #1–4', 'Scott é possuído por uma entidade ligada a Apocalipse.')
        ]),
        run('X-Factor e o retorno da equipe original', 'Scott reencontra Jean e funda o X-Factor enquanto enfrenta Apocalipse.', [
          child('X-Factor Epic: Genesis & Apocalypse', 'Avengers #263, Fantastic Four #286 e X-Factor #1–9.'),
          child('Mutant Massacre', 'X-Factor #9–11 e títulos X-Men relacionados.'),
          child('Fall of the Mutants', 'X-Factor #24–26 e tie-ins.'),
          child('Inferno', 'X-Factor #33–40 e títulos paralelos.'),
          child('Endgame', 'X-Factor #60–68; destino de Nathan Summers.'),
          child('X-Cutioner’s Song', 'Scott e Jean enfrentam Stryfe e o legado de Cable.')
        ])
      ]),
      section('modern', 'New X-Men, Astonishing e a revolução mutante', [
        run('Grant Morrison e Joss Whedon', 'Scott questiona sua vida, seu casamento e o futuro da espécie mutante.', [
          child('New X-Men Vol. 1: E Is for Extinction', 'New X-Men #114–117.'),
          child('New X-Men Vols. 2–7', 'New X-Men #118–154 e Annual.'),
          child('Astonishing X-Men Vol. 1: Gifted', 'Astonishing X-Men #1–6.'),
          child('Vol. 2: Dangerous', 'Astonishing X-Men #7–12.'),
          child('Vol. 3: Torn', 'Astonishing X-Men #13–18.'),
          child('Vol. 4: Unstoppable', 'Astonishing X-Men #19–24 e Giant-Size.')
        ]),
        run('Messiah Complex a AvX', 'Ciclope se torna o comandante de uma espécie à beira da extinção.', [
          child('Messiah Complex', 'Evento que apresenta Hope Summers.'),
          child('Uncanny X-Men: Manifest Destiny / Lovelorn', 'A mudança para São Francisco.'),
          child('Utopia', 'Dark Avengers/Uncanny X-Men: Utopia e capítulos paralelos.'),
          child('Nation X / Second Coming', 'A ilha de Utopia e o retorno de Cable e Hope.'),
          child('Schism #1–5', 'Scott e Wolverine dividem a comunidade mutante.'),
          child('Avengers vs. X-Men #0–12', 'Scott recebe o poder da Fênix.')
        ])
      ]),
      section('revolution', 'Revolução, retorno e Krakoa', [
        run('Uncanny X-Men por Brian Michael Bendis', 'Scott inicia uma revolução mutante depois de AvX.', [
          child('Vol. 1: Revolution', 'Uncanny X-Men (2013) #1–5.'),
          child('Vol. 2: Broken', 'Uncanny X-Men #6–11.'),
          child('Battle of the Atom', 'Crossover com All-New X-Men.'),
          child('Vols. 3–5', 'Uncanny X-Men #14–31.'),
          child('The Last Will and Testament of Charles Xavier', 'Uncanny X-Men #32–35 e #600.')
        ]),
        run('Ciclope jovem e campeão de Krakoa', 'A versão adolescente viaja pelo espaço; o adulto volta a liderar os X-Men.', [
          child('Cyclops Vol. 1: Starstruck', 'Cyclops (2014) #1–5.'),
          child('Vol. 2: I Will Sing No More', 'Cyclops #6–12.'),
          child('Phoenix Resurrection #1–5', 'Jean retorna e Scott aparece brevemente.'),
          child('Uncanny X-Men Annual #1 (2019)', 'Retorno completo de Scott.'),
          child('House of X / Powers of X', 'Fundação de Krakoa.'),
          child('X-Men by Jonathan Hickman', 'Scott lidera missões na primeira fase de Krakoa.'),
          child('X-Men by Gerry Duggan Vols. 1–6', 'Ciclope integra a equipe eleita pelos mutantes.')
        ])
      ])
    ]),

    order('jean-grey-reading-order', 'Marvel', 'X-Men', 'Jean Grey / Fênix — Ordem de Leitura', 'https://www.comicbooktreasury.com/jean-grey-reading-order/', [
      section('phoenix', 'Marvel Girl e a Saga da Fênix', [
        run('Da equipe original à Fênix', 'Jean cresce de aluna de Xavier a uma das forças mais poderosas do universo.', [
          child('X-Men #1–66', 'A trajetória completa de Jean na equipe original.'),
          child('X-Men Origins: Jean Grey #1', 'Releitura moderna de sua origem.'),
          child('X-Men: Season One', 'O primeiro ano pela perspectiva de Jean.'),
          child('Uncanny X-Men #98–108', 'A transformação em Fênix e o Cristal M’Kraan.'),
          child('Uncanny X-Men #109–128', 'O poder da Fênix cresce e o Clube do Inferno se aproxima.'),
          child('Dark Phoenix Saga — #129–138', 'Corrupção, sacrifício e fim da Fênix Negra.')
        ]),
        run('Retorno e X-Factor', 'Jean volta, reúne a equipe original e descobre a verdade sobre a Fênix.', [
          child('Avengers #263 / Fantastic Four #286', 'A descoberta do casulo de Jean.'),
          child('X-Factor #1–9', 'Retorno da equipe original.'),
          child('Inferno', 'X-Factor #33–40 e o acerto com Madelyne Pryor.'),
          child('X-Factor #65–68', 'Muir Island Saga e retorno aos X-Men.'),
          child('X-Men #1–30 (1991)', 'Equipe Azul e casamento com Scott.'),
          child('Adventures of Cyclops and Phoenix #1–4', 'Jean e Scott criam Nathan no futuro.')
        ])
      ]),
      section('newxmen', 'New X-Men, morte e ecos da Fênix', [
        run('New X-Men por Grant Morrison', 'Jean manifesta a Fênix outra vez enquanto seu casamento se desfaz.', [
          child('E Is for Extinction', 'New X-Men #114–117.'),
          child('Imperial / New Worlds', 'New X-Men #118–133.'),
          child('Riot at Xavier’s / Assault on Weapon Plus', 'New X-Men #134–145.'),
          child('Planet X / Here Comes Tomorrow', 'New X-Men #146–154.'),
          child('Phoenix: Endsong #1–5', 'A Fênix tenta ressuscitar Jean.'),
          child('Phoenix: Warsong #1–5', 'A Força Fênix busca as Stepford Cuckoos.')
        ]),
        run('A jovem Jean no presente', 'A versão adolescente dos cinco originais enfrenta o futuro que a espera.', [
          child('All-New X-Men Vols. 1–3', 'All-New X-Men #1–17 e Special.'),
          child('Battle of the Atom', 'Crossover sobre o destino dos jovens X-Men.'),
          child('Trial of Jean Grey', 'All-New X-Men #22–24 e Guardians #11–13.'),
          child('All-New X-Men Vols. 5–7', 'All-New X-Men #25–41.'),
          child('Jean Grey Vol. 1: Nightmare Fuel', 'Jean Grey (2017) #1–6.'),
          child('Jean Grey Vol. 2: Final Fight', 'Jean Grey #7–11.')
        ])
      ]),
      section('return', 'Ressurreição, Krakoa e renascimento cósmico', [
        run('X-Men Red e Krakoa', 'Jean retorna adulta, lidera uma equipe e ajuda a fundar a nação mutante.', [
          child('Phoenix Resurrection #1–5', 'Retorno definitivo de Jean Grey.'),
          child('X-Men Red Vol. 1: The Hate Machine', 'X-Men Red (2018) #1–5 e Annual.'),
          child('Vol. 2: Waging Peace', 'X-Men Red #6–11.'),
          child('House of X / Powers of X', 'Jean participa da fundação de Krakoa.'),
          child('X-Force (2019) #1–20', 'Jean integra a inteligência e o Conselho Silencioso.'),
          child('X-Men (2021) Vols. 1–3', 'Jean entra na primeira equipe eleita de Krakoa.')
        ]),
        run('A queda de Krakoa e Phoenix', 'Jean encara seus erros, morre outra vez e parte para uma missão cósmica.', [
          child('Jean Grey #1–4 (2023)', 'Julgamento interior durante Fall of X.'),
          child('Immortal X-Men #14–18', 'Jean e o Conselho durante a queda.'),
          child('Rise of the Powers of X / X-Men Forever', 'Retorno e união com a Fênix.'),
          child('Phoenix Vol. 1: Orbital Resonance', 'Phoenix (2024) #1–5.'),
          child('Phoenix Vol. 2: Cosmic Ascent', 'Phoenix #6–10.'),
          child('Phoenix Vol. 3', 'Phoenix #11–15.')
        ])
      ])
    ]),

    order('storm-reading-order', 'Marvel', 'X-Men', 'Tempestade — Ordem de Leitura', 'https://www.comicbooktreasury.com/storm-reading-order/', [
      section('claremont', 'Deusa, líder e Morlock', [
        run('A Tempestade de Chris Claremont', 'Ororo entra nos X-Men, assume a liderança e passa por mudanças profundas.', [
          child('Giant-Size X-Men #1', 'Primeira aparição de Ororo na equipe.'),
          child('Uncanny X-Men #94–138', 'Primeiros anos, Proteus e Saga da Fênix Negra.'),
          child('Uncanny X-Men #139–170', 'Ororo assume a liderança e conhece os Morlocks.'),
          child('Uncanny X-Men #171–187', 'Mudança punk, Japão e perda dos poderes.'),
          child('Lifedeath I e II — #186 e #198', 'As histórias centrais com Forge.'),
          child('Uncanny X-Men #201', 'Duelo pela liderança contra Ciclope.')
        ]),
        run('Sem poderes, Fall of the Mutants e retorno', 'Ororo lidera por habilidade e recupera seus poderes antes da era Azul/Dourada.', [
          child('Uncanny X-Men #202–219', 'Liderança sem poderes e Massacre de Mutantes.'),
          child('Fall of the Mutants — #220–227', 'Sacrifício dos X-Men em Dallas.'),
          child('Uncanny X-Men #228–253', 'Era australiana e retorno ao mundo.'),
          child('Uncanny X-Men #267–280', 'Ororo recupera idade e poderes.'),
          child('X-Men (1991) #1–11', 'Liderança da Equipe Dourada.'),
          child('Storm #1–4 (1996)', 'Primeira minissérie solo.')
        ])
      ]),
      section('queen', 'X-Treme X-Men e rainha de Wakanda', [
        run('X-Treme X-Men', 'Ororo lidera uma equipe independente em busca dos diários de Sina.', [
          child('Vol. 1: Destiny', 'X-Treme X-Men #1–9.'),
          child('Vol. 2: Invasion', 'X-Treme X-Men #10–18.'),
          child('Vol. 3: Schism', 'X-Treme X-Men #19–23 e X-Posé.'),
          child('Vols. 4–7', 'X-Treme X-Men #24–46 e especiais.'),
          child('Storm: The Arena', 'X-Treme X-Men #37–39 e material relacionado.')
        ]),
        run('Casamento, Wakanda e Utopia', 'Ororo se casa com T’Challa e divide seu tempo entre reino e mutantes.', [
          child('Storm (2006) #1–6', 'Origem do romance com T’Challa.'),
          child('Black Panther #14–25', 'Casamento e Guerra Civil.'),
          child('Fantastic Four #544–550', 'T’Challa e Ororo substituem Reed e Sue.'),
          child('Worlds Apart #1–4', 'Ororo é forçada a escolher entre os X-Men e Wakanda.'),
          child('X-Men: Schism / Regenesis', 'Retorno integral à liderança mutante.'),
          child('Avengers vs. X-Men', 'Ruptura definitiva do casamento.')
        ])
      ]),
      section('modern', 'Série solo, Krakoa e From the Ashes', [
        run('Storm por Greg Pak e Extraordinary X-Men', 'Ororo lidera os mutantes em uma crise global.', [
          child('Vol. 1: Make It Rain', 'Storm (2014) #1–5.'),
          child('Vol. 2: Bring the Thunder', 'Storm (2014) #6–11.'),
          child('Extraordinary X-Men Vols. 1–4', 'Extraordinary X-Men #1–20 e Annual.'),
          child('X-Men Gold Vols. 1–7', 'Ororo integra e ocasionalmente lidera a equipe de Kitty Pryde.'),
          child('Shuri #6–7', 'Ororo volta a Wakanda e encontra Shuri.')
        ]),
        run('Krakoa, Arakko e o sistema solar', 'Tempestade se torna regente de Marte e voz do sistema Sol.', [
          child('Marauders Vols. 1–3', 'Ororo integra a tripulação de Kate Pryde.'),
          child('Giant-Size X-Men: Storm #1', 'Uma ameaça tecnorgânica muda seu rumo.'),
          child('S.W.O.R.D. #6–11', 'Arakko é terraformado e Ororo assume o trono.'),
          child('X-Men Red Vol. 1: The Broken Land', 'X-Men Red (2022) #1–5.'),
          child('Vol. 2: The Trials of X', 'X-Men Red #6–10.'),
          child('Sins of Sinister / Vols. 3–4', 'X-Men Red #11–18 e especiais.'),
          child('Resurrection of Magneto #1–4', 'Ororo busca Magneto além da morte.')
        ]),
        run('Storm (2024)', 'Ororo entra no cenário global e integra os Vingadores.', [
          child('Storm Vol. 1: Earth’s Mightiest Mutant', 'Storm (2024) #1–5.'),
          child('Storm Vol. 2', 'Storm (2024) #6–10.'),
          child('Avengers Vol. 4: Storm', 'Avengers (2023) #17–23.'),
          child('Giant-Size X-Men: Storm #1', 'Capítulo especial do aniversário mutante.')
        ])
      ])
    ]),

    order('magneto-reading-order', 'Marvel', 'X-Men', 'Magneto — Ordem de Leitura', 'https://www.comicbooktreasury.com/magneto-comics-reading-order/', [
      section('enemy', 'Inimigo dos X-Men e sobrevivente', [
        run('A Irmandade e o Mestre do Magnetismo', 'Erik surge como antagonista, mas sua história e motivações se tornam mais complexas.', [
          child('X-Men #1', 'Primeira aparição de Magneto.'),
          child('X-Men #4–7', 'Formação da Irmandade de Mutantes.'),
          child('X-Men #17–18', 'Retorno e confronto com Xavier.'),
          child('Defenders #15–16', 'Magneto é reduzido à infância.'),
          child('Uncanny X-Men #104 e #111–113', 'Retorno adulto e prisão dos X-Men.'),
          child('Uncanny X-Men #150', 'O limite moral de Magneto começa a mudar.')
        ]),
        run('Do julgamento à direção da escola', 'Magneto busca redenção e assume o legado de Xavier.', [
          child('Uncanny X-Men #196–200', 'O julgamento de Magneto.'),
          child('New Mutants #35–54', 'Magneto dirige a escola e orienta os jovens mutantes.'),
          child('X-Men vs. Avengers #1–4', 'As nações do mundo tentam capturá-lo.'),
          child('Fatal Attractions', 'X-Men #25 e Wolverine #75.'),
          child('Magneto War', 'X-Men #85–87 e Uncanny #366–367.'),
          child('Magneto Testament #1–5', 'Infância de Max Eisenhardt durante o Holocausto.')
        ])
      ]),
      section('genosha', 'Genosha, House of M e Utopia', [
        run('Rei de Genosha', 'Magneto ganha uma nação e volta a confrontar a humanidade.', [
          child('Magneto Rex #1–3', 'Erik assume o controle de Genosha.'),
          child('Magneto: Dark Seduction #1–4', 'Diplomacia e manipulação na nova nação.'),
          child('Eve of Destruction', 'X-Men #110–113 e Uncanny X-Men #392–393.'),
          child('New X-Men: E Is for Extinction', 'O genocídio de Genosha.'),
          child('Excalibur (2004) #1–14', 'Xavier e Magneto reconstroem Genosha.'),
          child('House of M #1–8', 'A família Magnus governa uma realidade alterada.')
        ]),
        run('Aliança com Ciclope', 'Magneto se junta aos X-Men em Utopia e enfrenta ameaças à espécie.', [
          child('Uncanny X-Men #515–522', 'Magneto chega a Utopia.'),
          child('Second Coming', 'Erik ajuda a defender Hope e a ilha.'),
          child('Magneto: Not a Hero #1–4', 'Um sósia assassino ameaça sua posição.'),
          child('Avengers vs. X-Men #0–12', 'Magneto apoia Ciclope.'),
          child('Uncanny X-Men by Bendis', 'Erik integra a revolução mutante.'),
          child('AXIS #1–9', 'Magneto reúne vilões contra Red Onslaught.')
        ])
      ]),
      section('solo', 'Magneto solo e Krakoa', [
        run('Magneto por Cullen Bunn', 'Erik caça ameaças antimutantes com métodos letais.', [
          child('Vol. 1: Infamous', 'Magneto (2014) #1–6.'),
          child('Vol. 2: Reversals', 'Magneto #7–12.'),
          child('Vol. 3: Shadow Games', 'Magneto #13–17.'),
          child('Vol. 4: Last Days', 'Magneto #18–21.'),
          child('Uncanny X-Men: Survival of the Fittest', 'Uncanny X-Men (2016) #1–5.'),
          child('Uncanny X-Men Vols. 2–4', 'Uncanny X-Men #6–19 e Annual.')
        ]),
        run('Conselho Silencioso, Arakko e ressurreição', 'Erik ajuda a fundar Krakoa e escolhe um novo lar em Marte.', [
          child('House of X / Powers of X', 'Magneto anuncia a nova nação mutante.'),
          child('X-Men by Jonathan Hickman', 'Diplomacia e defesa de Krakoa.'),
          child('X-Men: The Trial of Magneto #1–5', 'Morte de Wanda e crise de ressurreição.'),
          child('X-Men Red Vols. 1–2', 'Magneto forma a Irmandade de Arakko.'),
          child('A.X.E.: Judgment Day', 'Última batalha de Magneto em Arakko.'),
          child('Resurrection of Magneto #1–4', 'Tempestade busca seu velho amigo além da morte.')
        ])
      ])
    ]),

    order('new-mutants-reading-order', 'Marvel', 'X-Men', 'Novos Mutantes — Ordem de Leitura', 'https://www.comicbooktreasury.com/x-men-the-new-mutants-reading-order/', [
      section('original', 'A equipe original — 1983 a 1991', [
        run('Claremont, McLeod e Sienkiewicz', 'Cinco jovens mutantes entram na escola e enfrentam o Urso Místico e Legião.', [
          child('Epic: Renewal', 'Marvel Graphic Novel #4, New Mutants #1–12 e Magik #1–4.'),
          child('Epic: The Demon Bear Saga', 'New Mutants #13–31 e Annual #1.'),
          child('Epic: Asgardian Wars', 'New Mutants #32–44, Annual #2 e especiais.'),
          child('Epic: Fallen Angels', 'New Mutants #45–54, Annual #3 e Fallen Angels #1–8.'),
          child('New Mutants Classic Vols. 1–7', 'Alternativa em coleções menores para #1–54.')
        ]),
        run('Louise Simonson, Inferno e Cable', 'A equipe sofre perdas, entra em guerra e se transforma na X-Force.', [
          child('Epic: Sudden Death', 'New Mutants #55–70 e Annual #4.'),
          child('Epic: Curse of the Valkyries', 'X-Terminators #1–4 e New Mutants #71–85.'),
          child('Epic: Cable', 'New Mutants #86–94 e Annuals #5–6.'),
          child('X-Tinction Agenda', 'New Mutants #95–97 e títulos X-Men relacionados.'),
          child('Epic: The End of the Beginning', 'New Mutants #95–100, Annual #7 e crossover.'),
          child('X-Force: A Force to Be Reckoned With', 'New Mutants #98–100 e X-Force #1–4.')
        ])
      ]),
      section('school', 'Back to School e Academy X', [
        run('Novos alunos no Instituto Xavier', 'Os integrantes clássicos viram mentores de uma nova geração.', [
          child('New Mutants: Back to School Complete Collection', 'New Mutants (2003) #1–13 e X-Men Unlimited.'),
          child('New X-Men: Academy X Complete Collection', 'New X-Men #1–15, Yearbook e Hellions #1–4.'),
          child('Childhood’s End Complete Collection', 'New X-Men #16–32.'),
          child('Quest for Magik Complete Collection', 'New X-Men #33–43 e X-Infernus #1–4.'),
          child('Messiah Complex', 'New X-Men #44–46 e capítulos de X-Men/X-Factor/X-Force.')
        ]),
        run('Reunião da equipe clássica', 'Os antigos alunos voltam como veteranos durante Utopia.', [
          child('Return of Legion', 'New Mutants (2009) #1–5.'),
          child('Necrosha', 'New Mutants #6–11.'),
          child('Second Coming', 'New Mutants #12–14 e crossover.'),
          child('Fall of the New Mutants', 'New Mutants #15–21.'),
          child('Age of X', 'New Mutants #22–24 e X-Men Legacy.'),
          child('Abnett & Lanning Complete Collections Vols. 1–2', 'New Mutants #25–50 e Exiled.')
        ])
      ]),
      section('krakoa', 'Dead Souls e renascimento em Krakoa', [
        run('Antes e durante Krakoa', 'A equipe volta às raízes de horror, amizade e amadurecimento.', [
          child('New Mutants: Dead Souls #1–6', 'Magik lidera investigações sobrenaturais.'),
          child('New Mutants by Jonathan Hickman Vol. 1', 'New Mutants (2019) #1–2, #5 e #7.'),
          child('New Mutants by Ed Brisson Vol. 1', 'New Mutants #3–4, #6 e #8–12.'),
          child('New Mutants by Vita Ayala Vol. 1', 'New Mutants #14–18.'),
          child('Vol. 2', 'New Mutants #19–24.'),
          child('Vol. 3', 'New Mutants #25–28.'),
          child('New Mutants: Lethal Legion #1–5', 'Uma missão de roubo após a fase principal.')
        ])
      ])
    ]),

    order('guardians-of-the-galaxy-reading-order', 'Marvel', 'Cosmos Marvel', 'Guardiões da Galáxia — Ordem de Leitura', 'https://www.comicbooktreasury.com/guardians-of-the-galaxy-reading-order/', [
      section('original', 'Guardiões originais — Terra-691', [
        run('A equipe do século XXXI', 'Vance Astro, Yondu, Martinex e Charlie-27 lutam contra os Badoon.', [
          child('Epic: Earth Shall Overcome', 'Marvel Super-Heroes #18, Marvel Two-in-One e Marvel Presents #3–12.'),
          child('Epic: Quest for the Shield', 'Avengers #167–177 e histórias relacionadas.'),
          child('Guardians of the Galaxy Classic Vol. 1', 'Guardians (1990) #1–7.'),
          child('Classic Vol. 2', 'Guardians #8–20 e Annual #1.'),
          child('Classic Vol. 3', 'Guardians #21–29 e Annual #2.'),
          child('Guardians #30–62', 'Conclusão da série dos anos 1990 e Galactic Guardians.')
        ])
      ]),
      section('annihilation', 'Annihilation e a equipe moderna', [
        run('Annihilation e Annihilation: Conquest', 'As guerras cósmicas que aproximam os futuros Guardiões.', [
          child('Drax the Destroyer #1–4', 'Prólogo terrestre.'),
          child('Annihilation: Prologue / Nova #1–4', 'A Onda de Aniquilação ataca.'),
          child('Annihilation: Silver Surfer / Super-Skrull / Ronan', 'Três frentes da guerra.'),
          child('Annihilation #1–6 e Heralds of Galactus', 'Conclusão do primeiro evento.'),
          child('Conquest: Star-Lord #1–4', 'Peter Quill reúne a equipe que inspira os Guardiões.'),
          child('Annihilation: Conquest #1–6', 'Guerra contra a Falange e Ultron.')
        ]),
        run('Guardiões por Abnett e Lanning', 'A equipe moderna protege o espaço-tempo de novas fissuras.', [
          child('Complete Collection Vol. 1', 'Guardians of the Galaxy (2008) #1–12.'),
          child('War of Kings', 'Evento paralelo após Guardians #12.'),
          child('Complete Collection Vol. 2', 'Guardians #13–25.'),
          child('Realm of Kings', 'Expansão dos conflitos cósmicos.'),
          child('The Thanos Imperative #1–6', 'Conclusão da era Cancerverse.'),
          child('Annihilators / Earthfall #1–4', 'Epílogo com parte da equipe cósmica.')
        ])
      ]),
      section('modern', 'Bendis, Duggan, Cates e Ewing', [
        run('Guardians por Brian Michael Bendis', 'A equipe se aproxima da Terra e recebe novos integrantes.', [
          child('Vol. 1: Cosmic Avengers', 'Guardians (2013) #0.1 e #1–3.'),
          child('Vol. 2: Angela', 'Guardians #4–10.'),
          child('Trial of Jean Grey', 'Guardians #11–13 e All-New X-Men #22–24.'),
          child('Vols. 3–5', 'Guardians #14–27 e Annual.'),
          child('Guardians Team-Up Vols. 1–2', 'Série de encontros com heróis da Terra.'),
          child('Guardians (2015) Vols. 1–4', 'A nova formação até Grounded e Civil War II.')
        ]),
        run('Duggan, Infinity Wars e Donny Cates', 'Pedras do Infinito, Gamora e uma nova formação após a morte de Thanos.', [
          child('All-New Guardians Vol. 1: Communication Breakdown', 'All-New Guardians #1–2, #4, #6 e #8–10.'),
          child('Vol. 2: Riders in the Sky', 'All-New Guardians #3, #5, #7, #9, #11–12.'),
          child('Infinity Countdown #1–5', 'A busca pelas Joias do Infinito.'),
          child('Infinity Wars #1–6', 'Gamora dobra o universo.'),
          child('Cates Vol. 1: The Final Gauntlet', 'Guardians (2019) #1–6.'),
          child('Cates Vol. 2: Faithless', 'Guardians #7–12 e Annual.')
        ]),
        run('Guardians por Al Ewing e além', 'A equipe assume oficialmente o papel de super-heróis galácticos.', [
          child('Vol. 1: Then It’s Us', 'Guardians (2020) #1–5.'),
          child('Vol. 2: Here We Make Our Stand', 'Guardians #6–12.'),
          child('Vol. 3: We’re Super Heroes', 'Guardians #13–18.'),
          child('The Last Annihilation', 'Guardians #16–18 e tie-ins.'),
          child('Guardians (2023) Vol. 1: Grootfall', 'Guardians #1–5.'),
          child('Vol. 2: Grootrise', 'Guardians #6–10.')
        ])
      ])
    ]),

    order('silver-surfer-reading-order', 'Marvel', 'Cosmos Marvel', 'Surfista Prateado — Ordem de Leitura', 'https://www.comicbooktreasury.com/silver-surfer-reading-order/', [
      section('classic', 'Galactus e a série de Stan Lee', [
        run('O arauto rebelde', 'Norrin Radd chega à Terra e se volta contra Galactus.', [
          child('Fantastic Four #48–50', 'A Trilogia de Galactus e primeira aparição do Surfista.'),
          child('Epic: When Calls Galactus', 'Fantastic Four #49, #55, #57–60, #72, #74–77 e material relacionado.'),
          child('Silver Surfer Masterworks Vol. 1', 'Silver Surfer (1968) #1–6 e extras.'),
          child('Masterworks Vol. 2', 'Silver Surfer #7–18.'),
          child('Silver Surfer: Parable #1–2', 'Stan Lee e Moebius reimaginam Galactus.'),
          child('Silver Surfer: Judgment Day', 'Graphic novel de Stan Lee e John Buscema.')
        ]),
        run('Retorno às estrelas', 'Norrin se liberta da Terra e atravessa a saga cósmica de Jim Starlin.', [
          child('Epic: Freedom', 'Silver Surfer (1982) #1 e série de 1987 #1–14.'),
          child('Epic: Parable', 'Silver Surfer #15–23, Annuals e graphic novels.'),
          child('Silver Surfer #24–38', 'Reencontro com Nova e Galactus.'),
          child('Rebirth of Thanos', 'Silver Surfer #34–38 e Thanos Quest #1–2.'),
          child('Infinity Gauntlet', 'Silver Surfer #44–60 e evento principal.'),
          child('Infinity War / Infinity Crusade', 'Aventuras cósmicas seguintes e tie-ins do Surfer.')
        ])
      ]),
      section('annihilation', 'Annihilation e os Defensores', [
        run('Do exílio à Onda de Aniquilação', 'Minisséries reflexivas e o retorno de Norrin ao serviço de Galactus.', [
          child('Silver Surfer: Communion', 'Silver Surfer (2003) #1–6.'),
          child('Silver Surfer: Requiem #1–4', 'História independente sobre os últimos dias de Norrin.'),
          child('Silver Surfer: In Thy Name #1–4', 'Norrin encontra uma civilização utópica.'),
          child('Annihilation: Silver Surfer #1–4', 'Norrin volta a ser arauto para enfrentar Annihilus.'),
          child('Annihilation #1–6 e Heralds of Galactus', 'Conclusão da guerra.'),
          child('The Thanos Imperative #1–6', 'A ameaça do Cancerverse.')
        ]),
        run('Defensores e retorno à Terra', 'Norrin se reúne com Strange, Hulk e Namor em diferentes formações.', [
          child('Defenders: Indefensible #1–5', 'Minissérie de Giffen, DeMatteis e Maguire.'),
          child('Defenders by Matt Fraction Vol. 1', 'Defenders (2011) #1–6.'),
          child('Vol. 2', 'Defenders #7–12.'),
          child('Defenders: The Best Defense', 'Cinco especiais conectados.'),
          child('Defenders: There Are No Rules #1–5', 'Al Ewing e Javier Rodríguez exploram o cosmos.'),
          child('Defenders: Beyond #1–5', 'Continuação multiversal da equipe.')
        ])
      ]),
      section('slott', 'Dan Slott, Mike Allred e o Surfista moderno', [
        run('A viagem com Dawn Greenwood', 'Norrin redescobre o universo ao lado de uma humana da Terra.', [
          child('Vol. 1: New Dawn', 'Silver Surfer (2014) #1–5 e Point One.'),
          child('Vol. 2: Worlds Apart', 'Silver Surfer #6–10.'),
          child('Vol. 3: Last Days', 'Silver Surfer #11–15.'),
          child('Vol. 4: Citizen of Earth', 'Silver Surfer (2016) #1–6.'),
          child('Vol. 5: A Power Greater Than Cosmic', 'Silver Surfer #7–14.'),
          child('Silver Surfer by Slott & Allred Omnibus', 'A saga completa em um volume.')
        ]),
        run('Silver Surfer: Black e histórias recentes', 'Norrin atravessa um buraco negro e encontra Knull no início do tempo.', [
          child('Silver Surfer: Black #1–5', 'Donny Cates e Tradd Moore.'),
          child('Doctor Strange by Mark Waid Vol. 3: Herald', 'Doctor Strange #12–17 com Norrin.'),
          child('Annihilation: Scourge', 'O Surfista enfrenta uma nova invasão da Zona Negativa.'),
          child('King in Black #1–5', 'Norrin volta a enfrentar Knull.'),
          child('Silver Surfer Rebirth #1–5', 'Ron Marz e Ron Lim retornam ao período clássico.'),
          child('Silver Surfer Rebirth: Legacy #1–5', 'Continuação com Genis-Vell.')
        ])
      ])
    ]),

    order('magik-reading-order', 'Marvel', 'X-Men', 'Magia / Illyana Rasputin — Ordem de Leitura', 'https://www.comicbooktreasury.com/magik-reading-order/', [
      section('limbo', 'Origem no Limbo e Novos Mutantes', [
        run('De criança a Magia', 'Illyana cresce no Limbo e volta à Terra como feiticeira e mutante.', [
          child('Giant-Size X-Men #1', 'Primeira aparição de Illyana criança.'),
          child('Uncanny X-Men #145–147', 'Belasco sequestra Illyana.'),
          child('Magik #1–4 (1983)', 'Os sete anos no Limbo e a criação da Soulsword.'),
          child('New Mutants #14–31', 'Illyana entra na equipe e enfrenta o Urso Místico e Legião.'),
          child('New Mutants Special Edition #1 / X-Men Annual #9', 'Asgardian Wars.'),
          child('New Mutants #45–54', 'A relação com o Limbo se aprofunda.')
        ]),
        run('Inferno e perda', 'Darkchylde ameaça dominar Illyana e a realidade.', [
          child('New Mutants #62–70', 'Caminho para Inferno.'),
          child('X-Terminators #1–4', 'Demônios invadem Nova York.'),
          child('Inferno — New Mutants #71–73', 'Confronto final com Belasco e N’astirh.'),
          child('Uncanny X-Men #239–243 / X-Factor #35–39', 'Capítulos paralelos e conclusão do evento.'),
          child('Uncanny X-Men #303', 'O impacto do Vírus Legado sobre Illyana criança.')
        ])
      ]),
      section('return', 'Retorno, Utopia e revolução', [
        run('Quest for Magik e New Mutants', 'A Soulsword chama por sua dona e Illyana retorna ao mundo.', [
          child('New X-Men: Quest for Magik', 'New X-Men #37–41.'),
          child('X-Infernus #1–4', 'Os X-Men tentam resgatar Illyana do Limbo.'),
          child('New Mutants: Return of Legion', 'New Mutants (2009) #1–5.'),
          child('New Mutants #6–21', 'Necrosha, Second Coming e Fall of the New Mutants.'),
          child('New Mutants #25–50', 'Illyana resolve dívidas do passado.'),
          child('Avengers vs. X-Men', 'Illyana recebe parte da Força Fênix.')
        ]),
        run('Uncanny X-Men por Bendis', 'Magia treina com Doutor Estranho e integra a revolução de Ciclope.', [
          child('Vol. 1: Revolution', 'Uncanny X-Men (2013) #1–5.'),
          child('Vol. 2: Broken', 'Uncanny X-Men #6–11.'),
          child('Vol. 3: The Good, the Bad, the Inhuman', 'Uncanny X-Men #14–18.'),
          child('Vol. 4: X-Men vs. S.H.I.E.L.D.', 'Uncanny X-Men #19–25.'),
          child('Vol. 5: The Omega Mutant', 'Uncanny X-Men #26–31.'),
          child('Vol. 6: Storyville', 'Uncanny X-Men #32–35 e #600.')
        ])
      ]),
      section('krakoa', 'Krakoa e o lado místico', [
        run('Capitã dos Novos Mutantes', 'Illyana lidera equipes, ensina magia e defende Krakoa.', [
          child('New Mutants by Hickman / Brisson', 'New Mutants (2019) #1–12.'),
          child('X of Swords', 'Illyana reúne portadores de espadas e entra no torneio.'),
          child('New Mutants by Vita Ayala', 'New Mutants #14–28.'),
          child('Strange Academy #1–18', 'Magik atua como professora convidada.'),
          child('The Death of Doctor Strange: X-Men/Black Knight #1', 'A crise mágica alcança Krakoa.'),
          child('Midnight Suns #1–5', 'Illyana lidera uma equipe sobrenatural moderna.')
        ]),
        run('From the Ashes', 'Illyana ganha uma série solo e volta a enfrentar horrores do Limbo.', [
          child('Uncanny X-Men (2024) #1–10', 'Magik integra a equipe de Rogue.'),
          child('Magik (2025) #1', 'Novo ponto de entrada solo.'),
          child('Magik (2025) #2–5', 'Primeiro arco da série.'),
          child('Magik (2025) #6–10', 'Segundo ciclo e expansão da ameaça mística.')
        ])
      ])
    ])
  ];

  const existingIds = new Set(orders.map(item => item.id));
  orders.push(...additions.filter(item => !existingIds.has(item.id)));
})();
