# Firebase Web SDK

`firebase.js` contém apenas Firebase App, Authentication e Realtime Database, versão **12.19.0**. Compilado com esbuild **0.28.2**. Avisos de licença Apache 2.0 preservados no bundle. Não inclui Analytics.

Para reconstruir, em uma pasta de trabalho separada:

```sh
npm install --save-exact firebase@12.19.0 esbuild@0.28.2
```

Copie `firebase-entry.js` para essa pasta como `entry.js` e execute:

```sh
npx esbuild ./entry.js --bundle --format=esm --minify --legal-comments=eof --outfile=firebase.js
```

Copie apenas o bundle resultante para `vendor/firebase.js`. A cópia local permite ao service worker manter o SDK disponível offline após o primeiro carregamento.
