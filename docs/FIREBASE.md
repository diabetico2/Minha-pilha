# Ativar contas e sincronização

O site continua no GitHub Pages. O Firebase fornece Authentication (e-mail e senha) e Realtime Database, no plano **Spark**, sem cartão. Não é necessário Firestore, Storage, Functions, Analytics nem plano Blaze.

O projeto ativo é `minha-pilha-diabetico2`, com Realtime Database em `us-central1`. O domínio `diabetico2.github.io` está autorizado e as regras de `firebase/database.rules.json` foram publicadas. O plano foi confirmado no console como **Spark — US$ 0/mês**, sem vincular faturamento. Ao atingir a cota gratuita, o serviço pode ficar indisponível até a renovação; mantenha o projeto no Spark para evitar cobranças por excedentes.

## Configuração inicial

1. Entre em https://console.firebase.google.com/ com a conta Google que será proprietária do projeto.
2. Crie o projeto **Minha Pilha**, no plano Spark. Analytics é opcional e não é usado pelo site.
3. Em **Authentication → Sign-in method**, habilite **E-mail/senha**. Não é necessário habilitar link por e-mail.
4. Em **Authentication → Settings → Authorized domains**, adicione `diabetico2.github.io`.
5. Crie um **Realtime Database** em modo bloqueado. Em **Rules**, publique o conteúdo de `firebase/database.rules.json`. Não use modo de teste nem acesso público.
6. Registre um aplicativo **Web** chamado **Minha Pilha** nas configurações do projeto. Não precisa ativar Firebase Hosting.
7. Copie a configuração pública do aplicativo para `config/firebase-config.js`, incluindo a URL exata do Realtime Database:

```js
window.MINHA_PILHA_FIREBASE = {
  apiKey: 'CHAVE_PUBLICA_DO_APP',
  authDomain: 'SEU_PROJETO.firebaseapp.com',
  databaseURL: 'URL_EXATA_MOSTRADA_NO_REALTIME_DATABASE',
  projectId: 'SEU_PROJETO',
  appId: 'ID_DO_APLICATIVO_WEB'
};
```

Esses identificadores do aplicativo Web são públicos. Nunca coloque senha, chave privada ou credenciais de conta de serviço no repositório. O controle de acesso é feito pelas regras do banco e pelo login.

8. Publique os arquivos do site. Crie a sua conta pelo botão **Entrar → Criar conta**.
9. No navegador onde está sua pilha antiga, entre na conta e use **Adicionar pilha deste navegador**. Essa etapa transfere as marcações sem arquivo JSON. Em outros dispositivos, basta entrar com a mesma conta.

## Importar um save antigo em JSON

Entre na conta desejada, aguarde a pilha carregar e use **Restaurar** para selecionar o JSON antigo. A restauração substitui o progresso dessa conta pelo conteúdo do arquivo e sincroniza com o banco. Aguarde **Pilha sincronizada na conta** antes de abrir outro dispositivo. **Salvar backup** continua exportando a pilha em JSON, com ou sem login.

Se a conta já tem leituras que você quer preservar, salve um backup dela antes de restaurar. Para combinar a pilha local com a conta, prefira **Adicionar pilha deste navegador**, que mantém as notas e os marcadores já existentes na conta.

## Como os dados são preservados

- A pilha sem login mantém a chave local original `minha-pilha-v1`.
- Cada conta usa seu próprio cache local e seu próprio caminho `/piles/UID` no banco. Uma conta não pode consultar nem alterar o caminho de outra.
- Leituras, pontos de leitura, notas, favoritas, fila, datas de leitura e listas pessoais são sincronizados. A página selecionada e a data do backup externo ficam no dispositivo.
- Apenas os campos alterados são enviados. Mudanças em itens diferentes são combinadas. Quando dois dispositivos alteram o mesmo campo, prevalece a última alteração recebida pelo servidor.
- Alterações sem conexão ficam em uma fila local e são reenviadas ao reconectar. Aguarde **Pilha sincronizada na conta** antes de mudar de dispositivo. Se o navegador não puder gravar a fila, o site avisa para salvar um backup.
- As abas do mesmo navegador coordenam os envios com Web Locks. A sincronização exige um navegador moderno com suporte à API.
- Adicionar a pilha local preserva as notas e os marcadores já existentes na conta. A cópia local original permanece disponível ao sair.
- **Limpar minha estante**, enquanto conectado, limpa também os itens conhecidos na conta. A confirmação informa esse alcance. O backup JSON continua disponível como cópia adicional.
- Senhas são processadas pelo Firebase Authentication; não são armazenadas na pilha nem no código do site.

### Perfil, foto e troca de senha

`/piles/UID/profile` armazena `displayName` (até 60 caracteres), `bio` (até 280) e `avatar` (JPEG, PNG ou WebP em data URL, até 32 mil caracteres). Assim como os demais mapas, os nomes dos campos são codificados em hexadecimal UTF-8 no banco. As regras aceitam apenas esses campos e mantêm leitura/escrita restritas ao proprietário. A capa opcional de uma lista fica dentro de seu JSON em `customOrders`, com limite de 100 mil caracteres.

Não há Storage, upload público ou diretório público de perfis. O navegador recorta/reduz as imagens antes do envio e o banco usa o plano Spark existente. O backup completo inclui o perfil; o JSON de compartilhamento inclui só a lista e sua capa. A limpeza da estante preserva o perfil.

A troca de senha usa `reauthenticateWithCredential` com a senha atual, confere se a conta continua a mesma e então chama `updatePassword`. A senha não passa pelo Realtime Database, cache da pilha ou fila offline. Referência: [gerenciar usuários no Firebase Auth](https://firebase.google.com/docs/auth/web/manage-users).

O console está configurado para enviar modelos em português (Brasil), e o SDK também define `auth.languageCode = 'pt-BR'`. A personalização do remetente, assunto e mensagem foi recusada pelo console deste projeto em 24/09/2026 (aviso de indisponibilidade da edição); por isso, não considerar esse modelo personalizado como publicado. Resolver pelo suporte do Firebase antes de tentar novamente. O site orienta a procurar o remetente padrão no spam. Um domínio próprio de envio exige domínio e registros DNS sob controle do proprietário; não foi contratado nenhum domínio ou serviço. Referência: [domínio para e-mails de autenticação](https://firebase.google.com/docs/auth/email-custom-domain).

### Listas pessoais

O campo `customOrders` fica em `/piles/UID/customOrders`, protegido pelas mesmas regras de proprietário. Cada entrada é uma lista serializada como JSON, com limite de 200 mil caracteres e identificador `personal-UUID`. Os itens têm identificadores estáveis; trocar o título ou a posição não desloca o progresso para outro volume. O catálogo padrão permanece nos arquivos estáticos e não pode ser sobrescrito por uma lista importada.

Publique a versão atual de `firebase/database.rules.json` antes dos novos scripts. Ela permite o novo campo apenas dentro da pilha privada, mantendo os bloqueios para visitantes e outros usuários. As listas seguem a fila offline e o cache individual de cada conta. O backup completo inclui `customOrders`; arquivos antigos continuam válidos e resultam em uma pilha sem listas pessoais. O JSON de **Compartilhar lista** usa o esquema separado `minha-pilha-list`, sem progresso ou identificação da conta, e cria novos identificadores a cada importação.

## Validação ao alterar a configuração

Teste com duas contas: cada uma deve ver apenas sua pilha. Teste marcar um item em dois dispositivos, remover uma marcação, sair/entrar e reconectar após uma alteração offline. Uma requisição sem login ou com outro UID deve ser negada pelas regras publicadas.

As cotas gratuitas podem mudar: [preços do Firebase](https://firebase.google.com/pricing). Referências: [login com senha](https://firebase.google.com/docs/auth/web/password-auth), [atualizações por campo](https://firebase.google.com/docs/database/web/read-and-write) e [regras de acesso](https://firebase.google.com/docs/database/security).
