# Minha Pilha — Edição 02

Versão atualizada da biblioteca pessoal de quadrinhos, pronta para abrir no navegador ou substituir a versão anterior no GitHub Pages.

## Abrir

Extraia o ZIP e abra **index.html**. Mantenha os arquivos juntos na mesma pasta. A prévia aberta no Codex funciona enquanto o servidor local estiver ativo; o pacote funciona independentemente dessa prévia.

## O que mudou

- Biblioteca lateral com busca por personagem, editora e ordem.
- Tela de leitura direta, com próximo item e ponto de leitura em destaque.
- Itens associados recolhíveis e opção de expandir todos os detalhes.
- Estante separada em andamento, favoritas e quero ler.
- Interface adaptada a celular e computador, navegação por teclado e atalho `/` para busca.
- Correção da próxima leitura para incluir a obra principal, mesmo quando há itens associados.
- Validação dos backups antes de restaurar e aviso quando o navegador não consegue salvar.

As 107 ordens e os 5.587 itens foram preservados. Esta atualização é da interface e do funcionamento; não é uma revisão bibliográfica do catálogo. Títulos e descrições da fonte permanecem no idioma original. A contagem inclui itens principais e associados, conforme a versão anterior.

## Trazer o progresso anterior

1. Na versão anterior, use **Salvar backup**.
2. Nesta versão, use **Restaurar** e selecione o JSON.

Os backups anteriores continuam compatíveis. Quando a versão é atualizada no mesmo endereço e navegador, o progresso existente continua acessível. Abrir em outro endereço, outro navegador ou outra pasta pode exigir restauração do backup. O progresso é local, sem sincronização automática entre dispositivos.

## Leitura e notas

Marque a caixa de um item quando terminar. Use a bandeirinha para guardar onde parou e **Nota** para registrar comentários. **Marcar tudo** atua no grupo completo. Como antes, concluir todos os itens associados marca também o principal; desmarcar um associado mantém a marcação principal.

## Offline e instalação

Quando servido por HTTPS ou localhost, o app mantém os arquivos disponíveis offline após o primeiro carregamento completo. A instalação aparece quando o navegador oferece suporte. Abrir diretamente o arquivo HTML permite o uso local, mas não instala o aplicativo.

## GitHub Pages

Envie o conteúdo desta pasta para o repositório da versão anterior, mantendo o endereço usado anteriormente. Em **Settings → Pages**, mantenha a publicação pela branch e pasta configuradas. Guarde um backup JSON antes de trocar os arquivos.

## Adicionar ordens

O importador original continua disponível em `ferramentas/importar_html.py`. A pasta `fontes/` preserva os arquivos de referência. Não altere IDs, chaves de seções ou índices de itens existentes sem migrar o progresso.
