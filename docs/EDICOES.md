# Edições dentro das histórias

Abra **Edições desta história** para ver a publicação e cada número. Exemplo:

```text
Robin: Year One
  Edições próprias: Robin: Year One #1–4
  Itens associados
    Batman: King Tut’s Tomb
      Batman Confidential #26–28
        #26 / #27 / #28
      The Brave and the Bold #164, 171
        #164 / #171
      Batman #353
        #353
```

Marcar uma edição atualiza suas outras ocorrências na própria pilha, mesmo em listas diferentes. Desmarcar faz o mesmo. O botão **Em outros itens** mostra as histórias relacionadas e permite abri-las. Uma história fica parcialmente lida enquanto faltar alguma edição; sua caixa principal marca todo o conteúdo. **Marcar tudo** também inclui os itens associados. Concluir as histórias associadas não conclui automaticamente a obra principal: ler King Tut não equivale a ler Robin: Year One.

## Correspondências e limites

A identidade é `editora + série + versão/ano inicial + número`, nunca apenas o número ou o nome do personagem. Batman (1940) #1, Batman (2011) #1 e Batman (2016) #1 são leituras diferentes; anuais também são separados. O ano representa a série original, não o ano de lançamento do encadernado. Volume e ano explícitos têm prioridade; equivalências selecionadas ficam no registro de `assets/js/issue-model.js`.

O aplicativo reconhece intervalos e listas de números nos títulos e no conteúdo declarado pela fonte. Não é uma nova revisão bibliográfica das 109 ordens. Referências a trechos, histórias secundárias e publicações ambíguas não recebem uma equivalência presumida. Quando há numeração, mas falta a identificação da série, os números ficam com marcação local àquela história. Sem numeração suficiente, permanece a caixa da história completa. Textos residuais podem exigir a confirmação manual da história após marcar suas edições.

Listas pessoais também mostram subedições. Para facilitar o reconhecimento, use um título como `Batman Confidential (2007) #26–28` ou detalhes como `Reúne Batman Confidential (2007) #26–28.`. Séries DC identificadas no registro podem se vincular ao catálogo. Outras comics e mangás pessoais ficam locais quando não há editora/versão confirmada. O JSON de compartilhamento continua contendo apenas o conteúdo; quem importa recebe IDs próprios e seu próprio progresso.

Referências usadas para as equivalências selecionadas:

- [DC — Batman: King Tut’s Tomb](https://www.dc.com/graphic-novels/batman-confidential-2007/batman-king-tuts-tomb): conteúdo de seis edições e série Batman Confidential de 2007.
- [DC — Robin: Year One](https://www.dc.com/graphic-novels/robin-year-one-2000/robin-year-one) e [Batgirl/Robin: Year One](https://www.dc.com/graphic-novels/batgirl-year-one-2003/batgirl/robin-year-one): identificação da minissérie e números #1–4.
- [DC — Timeline, parte dois](https://static.dc.com/2025-09/Timeline%20Part%20Two.pdf): JLA: Year One (1998) #1–12 e séries históricas.
- [DC — Batman: Prey](https://www.dc.com/graphic-novels/batman-legends-of-the-dark-knight-1989/batman-prey) e [Batman: Venom](https://www.dc.com/graphic-novels/batman-legends-of-the-dark-knight-1989/batman-venom-new-edition): Legends of the Dark Knight, série de 1989.
- [DC — histórico das séries de Batman](https://www.dc.com/blog/2025-09-10/knight-life-a-history-of-ongoing-batman-titles): séries e relançamentos.
- [DC Universe Infinite — Batman (1940) #1](https://www.dcuniverseinfinite.com/comics/book/batman-1940-1/fc38500e-f6d5-439f-9f72-a9aeee0d4d1f): ano inicial da revista Batman.

## Saves e banco de dados

O campo privado `/piles/UID/issueRead` guarda uma string JSON `{ "read": true, "date": "..." }` por edição. A chave é codificada em hexadecimal UTF-8 como os demais mapas. `read:false` permanece registrado, impedindo que uma marca antiga de encadernado recoloque uma edição desmarcada. O servidor valida tipo e tamanho; o aplicativo valida a estrutura interna. A autenticação e o acesso exclusivo do dono continuam iguais.

Os IDs e a ordem dos 5.696 itens originais foram preservados. Ao ler um save antigo, o aplicativo considera lidas as edições de histórias já marcadas, preservando datas conhecidas e deixando datas desconhecidas vazias. A primeira alteração materializa essas marcas antes de modificar qualquer edição. A visualização de uma atualização remota não escreve de volta no banco. Alterações independentes se combinam; conflitos na mesma edição seguem a última escrita recebida. Aguarde a sincronização antes de editar o mesmo conteúdo em outro aparelho.

Notas, avaliações e datas corrigidas manualmente continuam pertencendo à história. Os totais do diário e as metas continuam contando os itens originais completos, não os novos subnúmeros. Uma revista presente em dois encadernados pode contribuir para dois itens concluídos: esses totais não são uma contagem de revistas únicas.

Remover uma lista pessoal guarda suas marcas locais na lixeira; restaurar recupera esses dados. Marcas compartilhadas por série permanecem na pilha porque também podem pertencer a outras listas.

## Backups e retorno

- Código anterior: tag `backup/pre-edicoes-cruzadas-14f7b63` e ZIP `minha-pilha-antes-edicoes-cruzadas-14f7b63.zip`, fora da pasta publicada.
- Antes da primeira marcação nesta versão, o navegador guarda uma cópia separada da pilha daquela conta. Baixe-a em **Cópias de segurança → Backup antes das edições**. Essa cópia fica naquele navegador; não é um backup automático remoto do Firebase.
- **Salvar backup** exporta o esquema versão 8, incluindo `issueRead`; **Restaurar** aceita backups anteriores. Selecionar um backup antigo restaura aquele estado e substitui a pilha atual.
- Antes de voltar ao código antigo, exporte a versão 8: versões anteriores não conhecem o progresso parcial por edição. A tag guarda o código, não os dados pessoais.

Testes: `npm test` inclui parser, numerações, relançamentos, marcação cruzada, desmarcação, saves antigos, sincronização offline e contas separadas. Em 08/10/2026 também foram testados no Firebase real recebimento em outro cliente, combinação de edições, desmarcação e bloqueio de acesso anônimo/de outra conta, usando contas temporárias removidas ao final.
