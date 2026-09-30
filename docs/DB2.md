# Minha Pilha como projeto de Banco de Dados

O aplicativo usa Firebase Realtime Database, um banco NoSQL com estrutura em árvore JSON. A autenticação fica no Firebase Authentication; senhas não são armazenadas no Realtime Database.

## Estrutura e isolamento

Cada conta guarda sua pilha em `/piles/UID`. As regras exigem que `auth.uid` seja igual ao UID do caminho para permitir leitura ou escrita. O catálogo padrão é estático; apenas listas criadas pelo usuário ficam no banco.

| Campo | Conteúdo | Exemplo conceitual antes de codificar a chave |
| --- | --- | --- |
| read | Marcações de leitura | item → true |
| completedAt | Data da última marcação de cada item | item → data ISO |
| notes | Anotações privadas | item → texto |
| ratings | Avaliação inteira de 1 a 5 | item → 5 |
| sessions | Registros independentes de releitura | session-UUID → JSON com key, date, rating, note |
| tags | Tags privadas por lista | lista → array serializado em JSON |
| goals | Meta por mês, de 1 a 10.000 | 2026-09 → 20 |
| customOrders | Listas pessoais com identificadores estáveis | personal-UUID → JSON da lista |
| trash | Snapshot da lista removida, progresso e data de exclusão | personal-UUID → JSON do snapshot |
| profile | Nome, apresentação e avatar | displayName → nome |

As chaves dos mapas são codificadas em hexadecimal UTF-8 para evitar caracteres proibidos nos caminhos do Firebase. Exemplo: `2026-09` vira `323032362d3039`. Listas e snapshots são strings JSON, validadas estruturalmente pelo aplicativo; as regras verificam tipo e tamanho dessas strings, sem interpretar seu JSON interno.

## Operações demonstráveis

1. Criar uma lista pessoal e observar `customOrders` no console.
2. Marcar uma leitura: `read` e `completedAt` mudam juntos no mesmo envio.
3. Abrir **Avaliar / nota**, dar cinco estrelas e escrever uma anotação.
4. Criar uma meta no **Diário de leitura**. Marcar outro item e observar a contagem.
5. Filtrar o histórico por mês, título e avaliação; exportar CSV.
6. Excluir a lista: a lista e seu progresso saem dos mapas ativos e entram em `trash` no mesmo envio. Restaurar recupera os identificadores e dados originais.
7. Abrir a mesma conta em outro navegador, alterar uma meta e observar a sincronização.
8. Desconectar a rede, alterar um dado e reconectar. A fila local envia a alteração pendente.
9. Entrar em outra conta e demonstrar a separação das pilhas. A restrição também é aplicada no servidor, pelas regras.
10. Exportar o backup JSON versão 7 e conferir os novos mapas. Backups anteriores continuam aceitos.

## Consultas e decisões de modelagem

O diário cruza o catálogo com `read`, `completedAt`, `ratings` e `notes` no navegador. Ordenação, filtros, médias e totais mensais são calculados no cliente sobre a pilha já sincronizada: não são JOINs nem agregações executadas no servidor Firebase. O histórico combina leituras atualmente marcadas com registros independentes em `sessions`; não é um log imutável de auditoria. Cada releitura possui UUID próprio para que novas leituras em dispositivos diferentes não sobrescrevam o mesmo registro.

Pais que agrupam itens associados não contam outra vez nas metas. Por isso a contagem do diário pode ser menor que o progresso geral da biblioteca. Datas desconhecidas aparecem sem data e não contam para metas mensais. Exportar/importar não inventa datas; versões antigas podem ter registrado a data de importação, que pode ser corrigida. Os meses usam o fuso horário do dispositivo.

A lixeira realiza exclusão lógica com snapshot. O aplicativo limita a 20 listas e não expira conteúdo automaticamente. A exclusão definitiva exige confirmação. Remover uma lista do catálogo ativo também a retira temporariamente dos totais do diário; restaurá-la recupera sua participação.

A sincronização envia diferenças por campo com atualização atômica no caminho da conta. Alterações em chaves diferentes se combinam; alterações concorrentes na mesma chave seguem a última escrita recebida. A restauração verifica a cópia local, mas não é uma transação de bloqueio entre dispositivos: aguarde a sincronização antes de editar a mesma lista em outro aparelho.

Para uma escala maior, listas estruturadas em nós separados, paginação e índices no servidor seriam próximos passos. A implementação atual favorece uma pilha privada pequena, operação offline e o plano gratuito existente.

## Backup antes desta atualização

A versão anterior do código está na tag `backup/pre-diario-metas-56804cd` e no ZIP `minha-pilha-antes-diario-metas-56804cd.zip`. Esse backup guarda o código. Dados pessoais são exportados pelo botão **Salvar backup**; não ficam no Git. Ao voltar para uma versão antiga, guarde o backup de dados versão 7, pois o código anterior não conhece metas, avaliações ou lixeira.

## Compartilhamento público separado dos dados privados

As cópias publicadas ficam em `/sharedLists/UID/personal-UUID`, com `content` (JSON do esquema público de lista, até 200 mil caracteres) e `updatedAt`. As regras permitem leitura anônima de um link exato e escrita apenas pelo dono autenticado. Só o dono pode listar suas publicações; a raiz não pode ser enumerada. Não existe permissão pública em `/piles`.

A aplicação monta a publicação por uma lista explícita de campos; não serializa a pilha inteira. O servidor verifica estrutura externa, tipos e tamanhos; o JSON interno é validado pelo aplicativo. As regras não inspecionam o significado do texto dentro de `content`, como acontece também nas listas pessoais. Por isso o ato de publicar é explícito e acompanhado de uma descrição do que se torna público.

O destinatário importa uma nova lista com IDs próprios. Excluir o nó publicado revoga o link, sem apagar a lista privada ou cópias recebidas. Esta separação demonstra controle de acesso por recurso e replicação intencional de conteúdo. Publicações exigem internet; não fazem parte da fila offline nem do backup privado.

Para demonstrar: crie uma lista de exemplo, adicione uma tag, registre duas leituras com avaliações diferentes, publique e abra o link em uma janela sem login. Mostre que as notas e tags não aparecem, importe uma cópia e desative o link original. Por fim, busque `Batman #526` para demonstrar a consulta sobre títulos e detalhes do catálogo local. Busca, tags e agregações do diário são processadas no cliente.

Antes desta versão, o código foi preservado na tag `backup/pre-releituras-links-c3a4329` e no ZIP `minha-pilha-antes-releituras-links-c3a4329.zip`. Exporte seus dados antes de voltar ao código antigo: ele não conhece tags e releituras.
