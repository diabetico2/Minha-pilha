# Minha Pilha

Biblioteca pessoal de quadrinhos e mangás, com ordens de leitura, progresso, notas, listas próprias e perfil sincronizado.

**[Abrir o site](https://diabetico2.github.io/Minha-pilha/)** · [Guia de uso](docs/GUIA.md) · [Firebase e sincronização](docs/FIREBASE.md)

## Organização

```text
assets/
  css/             Estilos que o site usa
  js/              Interface, perfil, listas e sincronização
  data/            Catálogo de leitura e índice das imagens
  images/          Ícone do app e capas do catálogo
  vendor/firebase/ SDK do Firebase, fonte de compilação e licença
config/            Configuração pública do aplicativo Firebase
firebase/          Regras de acesso ao banco
docs/
  fontes/          HTMLs originais usados na importação do catálogo
  archive/         Estilos históricos, fora da aplicação atual
tests/             Testes de comportamento, segurança e arquivos
tools/             Importação do catálogo e manutenção das imagens
index.html         Entrada do site
manifest.webmanifest  Instalação como aplicativo
sw.js              Cache offline (fica na raiz para cobrir o site)
404.html           Retorno para a página inicial
```

O projeto não precisa de compilação para publicar. O GitHub Pages serve a branch `main`, pasta `/`. Mantenha a estrutura das pastas ao copiar o site ou extrair o ZIP.

## Usar e desenvolver

Abra `index.html` para uso local básico. Para testar login, sincronização, instalação e cache, sirva a raiz por HTTP, por exemplo `python -m http.server 8000`, e abra `http://localhost:8000`.

Com Node.js instalado, rode `npm test`. Não é necessário instalar dependências para os testes. Eles verificam listas pessoais, perfil, isolamento entre contas, sincronização, caminhos dos arquivos, imagens e cache offline.

## Catálogo e imagens

As 109 listas e suas chaves de progresso foram preservadas. Imagens ficam junto com o site, em `assets/images/covers/`; o navegador não precisa buscar as capas no servidor de outra página. O índice `assets/data/catalogue-covers.js` mantém o endereço original e o crédito de cada imagem. Personagens e artes pertencem a seus respectivos criadores e editoras.

Para atualizar imagens, revise as referências do índice e execute `npm run covers:download`. Os nomes incluem um resumo do conteúdo para evitar capas antigas no cache. Depois, rode `npm test`; ele também detecta imagens sem uso. A ferramenta não é executada durante a navegação ou publicação normal.

O importador histórico é `tools/importar_html.py`. Ele lê `docs/fontes/` e reescreve `assets/data/data.js`; use somente ao revisar deliberadamente o catálogo. Não altere IDs ou a ordem dos itens existentes sem migrar o progresso.

## Contas e dados

Firebase Authentication e Realtime Database usam o plano gratuito Spark. A configuração web em `config/firebase-config.js` é pública; senhas e chaves privadas não pertencem ao repositório. As regras em `firebase/database.rules.json` isolam cada conta.

Mover arquivos do site não muda as chaves do armazenamento local nem o endereço do banco. Backup completo e compartilhamento de listas continuam em JSON. Veja os procedimentos no [guia](docs/GUIA.md).

## Versões preservadas

- Antes dos perfis: tag `backup/pre-perfis-80da19a`.
- Antes desta organização: commit `f8697d2` e ZIP `minha-pilha-antes-da-organizacao-f8697d2.zip` na pasta de backups entregue separadamente.

Backups do código ficam fora da pasta publicada. Use **Salvar backup** no site para exportar os dados da sua conta.
