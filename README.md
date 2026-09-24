# Minha Pilha — Edição 02

Versão atualizada da biblioteca pessoal de quadrinhos, pronta para abrir no navegador ou substituir a versão anterior no GitHub Pages.

## Abrir

Extraia o ZIP e abra **index.html**. Mantenha os arquivos juntos na mesma pasta. A prévia aberta no Codex funciona enquanto o servidor local estiver ativo; o pacote funciona independentemente dessa prévia.

## O que mudou

- Biblioteca lateral com busca por personagem, editora e ordem.
- Tela de leitura direta, com próximo item e ponto de leitura em destaque.
- Itens associados recolhíveis e opção de expandir todos os detalhes.
- Estante separada em andamento, favoritas, quero ler e concluídas.
- Ordens totalmente lidas saem de “Em andamento”, mesmo com um ponto de leitura salvo.
- Clique novamente no marcador ativo para remover o ponto de leitura.
- Interface adaptada a celular e computador, navegação por teclado e atalho `/` para busca.
- Correção da próxima leitura para incluir a obra principal, mesmo quando há itens associados.
- Validação dos backups antes de restaurar e aviso quando o navegador não consegue salvar.

As 107 ordens anteriores e suas chaves de progresso foram preservadas. A biblioteca agora inclui também Watchmen e V de Vingança, detalhados por volumes e edições. A contagem inclui itens principais e associados, conforme a versão anterior. Doctor Fate aparece com o nome em inglês para distingui-lo do Doutor Destino da Marvel.

### Novas leituras

- **Watchmen:** obra original, volumes de Before Watchmen, especiais, The Button, os dois volumes de Doomsday Clock, Flashpoint Beyond e Rorschach. A obra original vem primeiro; as expansões são opcionais. Referência: [Comic Book Treasury](https://www.comicbooktreasury.com/comics-watchmen-reading-order-doomsday-clock/). A divisão de Doomsday Clock em #1–6 e #7–12 segue a [DC](https://www.dc.com/blog/2019/04/26/geoff-johns-and-gary-frank-s-doomsday-clock-part-one-is-coming-this-october).
- **V de Vingança:** série completa em dez edições, conforme a [DC](https://www.dc.com/blog/2023/01/10/dc-universe-infinit-es-new-ultra-tier-from-a-to-z).

As novas ordens mantêm a organização por editora, universo, fases, volumes e subitens solicitada no v1. As listas antigas não passaram por uma nova revisão bibliográfica.

## Trazer o progresso anterior

1. Na versão anterior, use **Salvar backup**.
2. Nesta versão, use **Restaurar** e selecione o JSON.

Os backups anteriores continuam compatíveis. Quando a versão é atualizada no mesmo endereço e navegador, o progresso existente continua acessível. Sem login, o progresso fica apenas no navegador.

## Conta e sincronização

A sincronização usa Firebase Authentication e Realtime Database no projeto `minha-pilha-diabetico2`, configurado no plano **Spark, sem custo e sem cartão**. As regras publicadas permitem que cada conta leia e altere somente a própria pilha. Consulte [FIREBASE.md](FIREBASE.md) para detalhes de configuração e manutenção.

Use **Entrar → Criar conta** para cadastrar e-mail e senha. No dispositivo com a pilha antiga, use **Adicionar pilha deste navegador** uma vez. Depois, use a mesma conta nos demais dispositivos. Para importar um save em JSON, entre na conta, aguarde o carregamento e use **Restaurar**. A restauração substitui o progresso da conta pelo arquivo; aguarde **Pilha sincronizada na conta** antes de mudar de dispositivo. **Salvar backup** continua exportando JSON, com ou sem login.

Testes da lógica de sincronização: `node tests/sync.test.cjs`. Além dos testes locais, foram verificados no Firebase real: cadastro e login, recebimento em outro cliente, combinação de alterações, remoção de marcações, isolamento entre contas, bloqueio de acesso sem login e validação dos dados. A importação de JSON pela interface também foi conferida no banco. Os testes reais usam contas temporárias, sem alterar pilhas pessoais.

## Leitura e notas

Marque a caixa de um item quando terminar. Use a bandeirinha para guardar onde parou e **Nota** para registrar comentários. **Marcar tudo** atua no grupo completo. Como antes, concluir todos os itens associados marca também o principal; desmarcar um associado mantém a marcação principal.

## Offline e instalação

Quando servido por HTTPS ou localhost, o app mantém os arquivos disponíveis offline após o primeiro carregamento completo. A instalação aparece quando o navegador oferece suporte. Abrir diretamente o arquivo HTML permite o uso local, mas não instala o aplicativo.

## GitHub Pages

Envie o conteúdo desta pasta para o repositório da versão anterior, mantendo o endereço usado anteriormente. Em **Settings → Pages**, mantenha a publicação pela branch e pasta configuradas. Guarde um backup JSON antes de trocar os arquivos.

## Adicionar ordens

O importador original continua disponível em `ferramentas/importar_html.py`. A pasta `fontes/` preserva os arquivos de referência. Não altere IDs, chaves de seções ou índices de itens existentes sem migrar o progresso.
