# Minha Pilha — Edição 02

Versão atualizada da biblioteca pessoal de quadrinhos, pronta para abrir no navegador ou substituir a versão anterior no GitHub Pages.

## Abrir

Extraia o ZIP e abra **index.html**. Mantenha os arquivos juntos na mesma pasta. A prévia aberta no Codex funciona enquanto o servidor local estiver ativo; o pacote funciona independentemente dessa prévia.

## O que mudou

- Página **Início** com capas dos personagens e histórias, busca, filtros e acesso à leitura em andamento.
- **Meu perfil** com nome, foto, apresentação e estatísticas de leitura, sincronizados na própria conta.
- Troca de senha dentro do perfil: confirme a senha atual e digite a nova duas vezes. A sessão deste dispositivo permanece aberta.
- Capas nas listas pessoais: envie JPG, PNG ou WebP, ou crie uma capa escolhendo título, cor e estilo.
- A confirmação do botão **Excluir lista**, que já existia, explica quais dados serão removidos e o alcance entre dispositivos.
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

## Listas pessoais de comics e mangás

Use **Criar lista** para adicionar uma HQ ou mangá, com título, descrição e edições, volumes ou capítulos na sua ordem. É possível colar vários títulos, um por linha. As listas aparecem em **Minhas listas**, no início da biblioteca, e funcionam com marcações, notas, favoritas e a estante.

- **Editar lista** permite renomear, adicionar, remover e reordenar os seus itens. Renomear e reordenar preserva as marcações; remover um item apaga somente o progresso desse item.
- As 109 ordens do catálogo padrão permanecem protegidas: os controles de edição e exclusão aparecem apenas nas listas pessoais.
- Com login, cada lista fica na própria conta e sincroniza com os seus dispositivos. Sem login, fica neste navegador; use **Adicionar pilha deste navegador** depois de entrar para levá-la à conta.
- **Compartilhar lista** baixa um JSON com títulos, tipo, descrição e detalhes. Não inclui conta, notas, datas de leitura ou progresso. Envie o arquivo a quem quiser.
- A capa acompanha o JSON compartilhado. A foto, o nome e a apresentação do perfil ficam fora desse arquivo.
- **Importar lista** abre o JSON compartilhado para revisão antes de salvar uma cópia independente. A importação adiciona uma lista; não substitui o catálogo nem o progresso. Alterar uma cópia não altera a lista de quem a enviou.
- **Salvar backup** inclui todas as listas pessoais e o progresso. **Restaurar** substitui a pilha inteira pelo backup; um backup antigo sem listas pessoais restaura apenas o que está nesse arquivo.

Limites: 100 listas pessoais por pilha, 500 itens por lista e até 200 mil caracteres na representação de cada lista. Dois dispositivos podem alterar listas diferentes normalmente. Se uma lista mudar enquanto o editor estiver aberto, ele pede que você reabra a versão atual; edições simultâneas ainda não recebidas seguem a última gravação no servidor.

Testes: `node tests/personal-library.test.cjs` e `node tests/sync.test.cjs`. Ao publicar esta versão, atualize primeiro as regras do Firebase com `firebase/database.rules.json`, que inclui `customOrders` e `profile` dentro do caminho privado de cada conta.

## Perfil e imagens

Entre na conta e clique no seu nome ou em **Meu perfil**. Escolha a foto, preencha o nome e a apresentação e clique em **Salvar perfil**. Fotos são recortadas para 192 × 192 e capas para 480 × 320, reduzidas no navegador e guardadas no Realtime Database. O arquivo de origem pode ter até 8 MB; o resultado tem limite de 32 mil caracteres para fotos e 100 mil para capas. Não é necessário ativar Firebase Storage ou um plano pago.

As imagens do catálogo ficam em `assets/images/covers/`, servidas junto com o site e com crédito à fonte em cada cartão. Depois de visitadas, ficam disponíveis no cache offline. O catálogo e suas chaves de progresso não foram alterados.

O backup completo em JSON (versão 5) inclui o perfil, as listas com capas e o progresso. Backups antigos continuam válidos; restaurar substitui a pilha pelos dados presentes no arquivo. **Limpar minha estante** preserva o perfil.

## Recuperação de senha

Em **Entrar → Esqueci minha senha**, informe seu e-mail. Procure também na pasta Spam/Lixo eletrônico pelo remetente `noreply@minha-pilha-diabetico2.firebaseapp.com` e marque a mensagem legítima como **Não é spam**. O envio continua pelo Firebase; a aplicação não consegue garantir a classificação feita pelo provedor de e-mail.

O idioma padrão foi configurado para português (Brasil). Em 24/09/2026, o console recusou a personalização do modelo deste projeto, com a mensagem “As atualizações de modelos de e-mail não estão disponíveis para este projeto” e indicação de contato com o suporte. O remetente e o texto continuam sendo os modelos padrão; nenhum serviço pago foi ativado.

## Backup anterior à atualização de perfis

A versão estável anterior foi preservada na tag Git `backup/pre-perfis-80da19a`, baseada no commit `80da19a2d84eda2feccbb1c56d35fe8bcc336d4d`, e no ZIP `minha-pilha-antes-dos-perfis-80da19a.zip`. Esse é um backup do código; use **Salvar backup** para uma cópia dos dados da sua conta. Antes de voltar ao código antigo, exporte os dados atuais: a versão anterior não conhece o campo de perfil.

## Leitura e notas

Marque a caixa de um item quando terminar. Use a bandeirinha para guardar onde parou e **Nota** para registrar comentários. **Marcar tudo** atua no grupo completo. Como antes, concluir todos os itens associados marca também o principal; desmarcar um associado mantém a marcação principal.

## Offline e instalação

Quando servido por HTTPS ou localhost, o app mantém os arquivos disponíveis offline após o primeiro carregamento completo. A instalação aparece quando o navegador oferece suporte. Abrir diretamente o arquivo HTML permite o uso local, mas não instala o aplicativo.

## GitHub Pages

Envie o conteúdo desta pasta para o repositório da versão anterior, mantendo o endereço usado anteriormente. Em **Settings → Pages**, mantenha a publicação pela branch e pasta configuradas. Guarde um backup JSON antes de trocar os arquivos.

## Adicionar ordens

O importador original continua disponível em `tools/importar_html.py`. A pasta `docs/fontes/` preserva os arquivos de referência. Não altere IDs, chaves de seções ou índices de itens existentes sem migrar o progresso.
