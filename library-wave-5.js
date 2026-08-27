(() => {
  const orders = window.EXPANDED_ORDERS || [];
  const child = (title, details = '') => ({ title, details, companions: [] });
  const run = (title, details, companions) => ({ title, details, companions });
  const section = (key, title, items) => ({ key, title, items });

  const doctorDoom = {
    id: 'doctor-doom-reading-order',
    publisher: 'Marvel',
    family: 'Quarteto Fantástico',
    title: 'Doutor Destino — Ordem de Leitura',
    source: 'https://www.comicbooktreasury.com/doctor-doom-reading-order/',
    sections: [
      section('starting-point', 'Ponto de partida — a vida de Victor von Doom', [
        run('Books of Doom', 'A origem moderna de Victor: infância na Latvéria, rivalidade com Reed Richards e ascensão ao trono.', [
          child('Books of Doom #1', 'A infância de Victor e o legado de sua mãe, Cynthia.'),
          child('Books of Doom #2', 'Ciência e magia tornam-se suas armas.'),
          child('Books of Doom #3', 'Victor chega aos Estados Unidos e conhece Reed Richards.'),
          child('Books of Doom #4', 'O experimento, a cicatriz e o exílio.'),
          child('Books of Doom #5', 'A armadura, a máscara e o retorno à Latvéria.'),
          child('Books of Doom #6', 'Victor conquista o trono e se torna Doutor Destino.')
        ]),
        run('A origem clássica e o primeiro confronto', 'As histórias fundamentais de Stan Lee e Jack Kirby.', [
          child('Fantastic Four #5', 'Primeira aparição do Doutor Destino.'),
          child('Fantastic Four #6', 'Destino e Namor formam uma aliança contra o Quarteto.'),
          child('Fantastic Four Annual #2', 'Origem clássica de Victor von Doom.'),
          child('Amazing Spider-Man #5', 'O primeiro encontro de Destino com o Homem-Aranha.'),
          child('Fantastic Four #39–40', 'Destino toma o Edifício Baxter e enfrenta um Quarteto sem poderes.')
        ])
      ]),
      section('classic', 'Era clássica — soberano, cientista e feiticeiro', [
        run('Astonishing Tales e Super-Villain Team-Up', 'Destino ganha aventuras próprias e uma parceria explosiva com Namor.', [
          child('Astonishing Tales #1–3', 'Destino enfrenta o Príncipe Rudolfo e protege seu trono.'),
          child('Astonishing Tales #6–8', 'A busca por poder e a guerra pela Latvéria.'),
          child('Giant-Size Super-Villain Team-Up #1–2', 'Destino e Namor em uma aliança instável.'),
          child('Super-Villain Team-Up #1–7', 'A parceria se transforma em conflito.'),
          child('Super-Villain Team-Up #8–14', 'Intrigas internacionais e a conclusão da equipe de vilões.')
        ]),
        run('Destino contra os grandes heróis da Marvel', 'Confrontos que mostram o alcance científico e político do monarca.', [
          child('Uncanny X-Men #145–147', 'Os X-Men invadem o castelo de Destino.'),
          child('Iron Man #149–150', 'Tony Stark e Victor presos na era do Rei Arthur.'),
          child('Fantastic Four #246–247', 'Destino recupera o controle da Latvéria.'),
          child('Fantastic Four #258', 'Um retrato definitivo da mente de Victor.'),
          child('Fantastic Four #278–279', 'Destino, Kristoff e a disputa por sua identidade.')
        ]),
        run('Guerras Secretas e o poder de um deus', 'Destino desafia o Beyonder e prova que sua ambição não possui limites.', [
          child('Marvel Super Heroes Secret Wars #1–9', 'Victor reúne aliados e estuda o poder do Beyonder.'),
          child('Marvel Super Heroes Secret Wars #10', 'Destino executa seu plano impossível.'),
          child('Marvel Super Heroes Secret Wars #11–12', 'O preço de possuir poder absoluto.'),
          child('Marvel Graphic Novel: Emperor Doom', 'Destino domina a humanidade por controle mental.'),
          child('Fantastic Four #350 e #352', 'Um duelo de inteligência entre Destino e Reed Richards.')
        ])
      ]),
      section('masterpieces', 'Histórias essenciais — magia, honra e obsessão', [
        run('Doctor Strange & Doctor Doom: Triumph and Torment', 'Destino pede a ajuda do Doutor Estranho para resgatar a alma de sua mãe do inferno.', [
          child('Doctor Strange and Doctor Doom: Triumph and Torment', 'Graphic novel completa de Roger Stern e Mike Mignola.'),
          child('Doctor Strange, Sorcerer Supreme #57', 'Consequências místicas e novo encontro com Victor.'),
          child('Doctor Strange, Sorcerer Supreme #62', 'Outro capítulo da relação entre os dois feiticeiros.')
        ]),
        run('Doom 2099', 'Um homem que pode ser Victor chega a uma Latvéria futurista dominada por corporações.', [
          child('Doom 2099 #1–8', 'Retorno à Latvéria e reconstrução do poder.'),
          child('Doom 2099 #9–14', 'Destino consolida seu domínio.'),
          child('Doom 2099 #15–25', 'A guerra contra as megacorporações.'),
          child('Doom 2099 #26–34', 'Victor assume o controle dos Estados Unidos.'),
          child('Doom 2099 #35–39', 'A queda do presidente Destino.'),
          child('Doom 2099 #40–44', 'Últimos conflitos do soberano no ano 2099.')
        ])
      ]),
      section('modern', 'Anos 2000 — Unthinkable e o Mestre do Destino', [
        run('Fantastic Four: Unthinkable', 'Victor abandona limites científicos e ataca a família Richards com magia.', [
          child('Fantastic Four (1998) #67–70', 'O início de Unthinkable.'),
          child('Fantastic Four #500–502', 'Conclusão do confronto e suas consequências.'),
          child('Fantastic Four #503–508', 'O Quarteto tenta se recuperar do ataque.'),
          child('Fantastic Four #509–513', 'O legado da batalha com Destino.')
        ]),
        run('Guerra Civil, Homem de Ferro e Mestres do Mal', 'Destino volta ao centro da política e da ciência do Universo Marvel.', [
          child('Fantastic Four #536–537', 'Destino e o caminho para Guerra Civil.'),
          child('Mighty Avengers #7–11', 'A equipe invade a Latvéria.'),
          child('Iron Man: Legacy of Doom #1–4', 'Conclusão da trilogia de Camelot com Tony Stark.'),
          child('Fantastic Four #554–561', 'O retorno de Victor na fase de Mark Millar.'),
          child('Fantastic Four #562–569', 'Master of Doom.'),
          child('Doctor Doom and the Masters of Evil #1–4', 'Minissérie de ação com o jovem quarteto de heróis.')
        ])
      ]),
      section('hickman', 'Jonathan Hickman — Fundação Futuro e Guerras Secretas', [
        run('Fantastic Four e FF', 'Destino se aproxima da Fundação Futuro e entra no grande plano de Reed Richards.', [
          child('Fantastic Four #570–588', 'Conselho de Reeds, Guerra das Quatro Cidades e preparação da Fundação Futuro.'),
          child('FF #1–11', 'Victor trabalha ao lado da Fundação Futuro.'),
          child('Fantastic Four #600–604', 'O retorno da equipe e a guerra final.'),
          child('FF #12–23', 'Destino, os Reeds e o desfecho da Fundação Futuro.'),
          child('Fantastic Four #605–611', 'Epílogo da longa fase de Hickman.')
        ]),
        run('Time Runs Out e Secret Wars', 'Quando o multiverso morre, Destino constrói Battleworld e se torna seu deus imperador.', [
          child('Avengers (2012) #35–44', 'Time Runs Out e a contagem regressiva para a incursão final.'),
          child('New Avengers (2013) #24–33', 'Doutor Estranho, Homem-Molecular e o plano de Destino.'),
          child('Secret Wars (2015) #1–3', 'O fim do multiverso e a apresentação de Battleworld.'),
          child('Secret Wars #4–6', 'As rachaduras no reino do Deus Imperador Destino.'),
          child('Secret Wars #7–9', 'Reed e Victor decidem o futuro de toda a realidade.')
        ])
      ]),
      section('infamous', 'Infamous Iron Man — a tentativa de redenção', [
        run('Victor von Doom assume o legado de Tony Stark', 'Após Guerras Secretas, Victor tenta provar que pode ser um herói.', [
          child('Invincible Iron Man (2015) #1–11', 'O contexto de Tony Stark antes de Civil War II.'),
          child('Invincible Iron Man #12–14', 'Civil War II e a queda de Tony.'),
          child('Infamous Iron Man #1–6', 'Victor veste sua própria armadura de Homem de Ferro.'),
          child('Infamous Iron Man #7–12', 'The Absolution of Doom.'),
          child('Marvel 2-In-One (2017) #1–6', 'Victor ajuda Ben e Johnny a procurar a família Richards.'),
          child('Iron Man #593–600', 'The Search for Tony Stark e o fim da fase Infamous.')
        ])
      ]),
      section('solo', 'Retorno ao trono — série solo e Reckoning War', [
        run('Doctor Doom por Christopher Cantwell', 'Acusado de um desastre global, Victor perde seu reino e precisa limpar seu nome.', [
          child('Doctor Doom (2019) #1–5', 'Pottersville.'),
          child('Doctor Doom #6–10', 'Bedford Falls e a conclusão da série.'),
          child('X-Men/Fantastic Four #1–4', 'Destino se envolve na disputa pelo futuro de Franklin Richards.'),
          child('Savage Avengers #26–28', 'Victor contra Kulan Gath.')
        ]),
        run('Bride of Doom e Reckoning War', 'O casamento de Victor conduz a uma nova crise cósmica.', [
          child('Fantastic Four (2018) #31–35', 'The Bride of Doom.'),
          child('Guardians of the Galaxy (2020) #13–18', 'Destino entre os Guardiões.'),
          child('Fantastic Four: Reckoning War Alpha #1', 'Início do conflito.'),
          child('Fantastic Four #40–42', 'Reckoning War — parte inicial.'),
          child('Fantastic Four #43–46', 'Desfecho da guerra e o papel de Destino.')
        ])
      ]),
      section('sorcerer-supreme', 'Destino Supremo — Blood Hunt e One World Under Doom', [
        run('O novo Mago Supremo', 'Victor aproveita a invasão vampírica para assumir o maior posto místico da Terra.', [
          child('Doom (2024) #1', 'Uma visão do futuro em que somente Destino pode salvar o universo.'),
          child('Blood Hunt (2024) #1–5', 'A noite eterna e a ascensão mística de Victor.'),
          child('Avengers (2023) #19', 'Destino testa os Vingadores como Mago Supremo.'),
          child('Amazing Spider-Man (2022) #61–70', 'As Oito Mortes do Homem-Aranha.'),
          child('Fantastic Four (2022) #23–28', 'Prólogo para a nova ordem mundial.')
        ]),
        run('One World Under Doom', 'Doutor Destino declara-se imperador do mundo e obriga todos os heróis a responder.', [
          child('One World Under Doom #1–3', 'A tomada do poder e a reação dos heróis.'),
          child('One World Under Doom #4–6', 'A resistência cresce e o império começa a rachar.'),
          child('One World Under Doom #7–9', 'Conclusão do reinado mundial de Destino.'),
          child('Fantastic Four (2022) #29–33', 'A família Richards durante o domínio de Victor.'),
          child('Red Hulk (2025) #1–10', 'Prisioneiro de guerra e missão na Latvéria.'),
          child('Thunderbolts: Doomstrike #1–5', 'Os Thunderbolts contra o regime.'),
          child('Superior Avengers #1–6', 'A equipe de Vingadores criada pelo império.'),
          child('Doom’s Division #1–5', 'A Divisão Tigre sob a nova ordem.'),
          child('Doom Academy #1–5', 'A Strange Academy transferida para a Latvéria.'),
          child('The Will of Doom #1', 'Epílogo do evento.')
        ])
      ])
    ]
  };

  if (!orders.some(order => order.id === doctorDoom.id)) orders.push(doctorDoom);
})();
