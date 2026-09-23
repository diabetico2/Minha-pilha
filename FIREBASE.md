# Ativar contas e sincronização

O site continua no GitHub Pages. O Firebase fornece Authentication (e-mail e senha) e Realtime Database, no plano **Spark**, sem cartão. Não é necessário Firestore, Storage, Functions, Analytics nem plano Blaze.

## Configuração inicial

1. Entre em https://console.firebase.google.com/ com a conta Google que será proprietária do projeto.
2. Crie o projeto **Minha Pilha**, no plano Spark. Analytics é opcional e não é usado pelo site.
3. Em **Authentication → Sign-in method**, habilite **E-mail/senha**. Não é necessário habilitar link por e-mail.
4. Em **Authentication → Settings → Authorized domains**, adicione `diabetico2.github.io`.
5. Crie um **Realtime Database** em modo bloqueado. Em **Rules**, publique o conteúdo de `database.rules.json`. Não use modo de teste nem acesso público.
6. Registre um aplicativo **Web** chamado **Minha Pilha** nas configurações do projeto. Não precisa ativar Firebase Hosting.
7. Copie a configuração pública do aplicativo para `firebase-config.js`, incluindo a URL exata do Realtime Database:

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

## Como os dados são preservados

- A pilha sem login mantém a chave local original `minha-pilha-v1`.
- Cada conta usa seu próprio cache local e seu próprio caminho `/piles/UID` no banco. Uma conta não pode consultar nem alterar o caminho de outra.
- Leituras, pontos de leitura, notas, favoritas, fila e datas de leitura são sincronizados. A página selecionada e a data do backup externo ficam no dispositivo.
- Apenas os campos alterados são enviados. Mudanças em itens diferentes são combinadas. Quando dois dispositivos alteram o mesmo campo, prevalece a última alteração recebida pelo servidor.
- Alterações sem conexão ficam em uma fila local e são reenviadas ao reconectar. Aguarde **Pilha sincronizada na conta** antes de mudar de dispositivo. Se o navegador não puder gravar a fila, o site avisa para salvar um backup.
- As abas do mesmo navegador coordenam os envios com Web Locks. A sincronização exige um navegador moderno com suporte à API.
- Adicionar a pilha local preserva as notas e os marcadores já existentes na conta. A cópia local original permanece disponível ao sair.
- **Limpar minha estante**, enquanto conectado, limpa também os itens conhecidos na conta. A confirmação informa esse alcance. O backup JSON continua disponível como cópia adicional.
- Senhas são processadas pelo Firebase Authentication; não são armazenadas na pilha nem no código do site.

## Validação antes de ativar

Teste com duas contas: cada uma deve ver apenas sua pilha. Teste marcar um item em dois dispositivos, remover uma marcação, sair/entrar e reconectar após uma alteração offline. Uma requisição sem login ou com outro UID deve ser negada pelas regras publicadas.

As cotas gratuitas podem mudar: [preços do Firebase](https://firebase.google.com/pricing). Referências: [login com senha](https://firebase.google.com/docs/auth/web/password-auth), [atualizações por campo](https://firebase.google.com/docs/database/web/read-and-write) e [regras de acesso](https://firebase.google.com/docs/database/security).
