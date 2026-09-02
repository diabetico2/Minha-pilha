# Minha Pilha

Checklist pessoal de ordens de leitura de quadrinhos, pronto para GitHub Pages.

## Usar localmente

Abra `index.html` no navegador. O progresso é salvo automaticamente no armazenamento desse navegador, com uma segunda cópia interna de segurança. Use **Salvar backup** para baixar uma cópia e **Restaurar** para levá-la a outro navegador.

## Recursos pessoais

- Checklist com marcação automática entre volumes e subitens.
- Ponto de leitura, próxima HQ não lida e filtro por era/fase.
- Estante de ordens em andamento, favoritas e “Quero ler”.
- Notas pessoais e data de conclusão em cada item.
- Backup em JSON, lembrete de cópia externa e recuperação interna automática.
- Funcionamento offline e instalação como aplicativo quando o navegador oferecer essa opção.
- Tema de cores automático de acordo com o personagem ou equipe selecionada.

## Publicar no GitHub Pages

1. Envie todos os arquivos desta pasta para a raiz de um repositório no GitHub.
2. No repositório, abra **Settings → Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**, a branch principal e a pasta `/ (root)`.
4. Salve e aguarde o endereço público aparecer.

## Adicionar novas ordens no futuro

Coloque os novos HTMLs salvos da mesma fonte dentro da pasta `fontes/` e execute:

```powershell
python ferramentas/importar_html.py
```

O arquivo `data.js` será reconstruído. Os identificadores são derivados dos títulos; assim, o progresso das ordens já existentes continua válido enquanto seus títulos não forem alterados.

## Estrutura

- `index.html`: interface.
- `styles.css`: visual responsivo.
- `app.js`: checklist, estante pessoal, notas, datas, busca, filtros, backup e armazenamento local.
- `data.js`: ordens extraídas dos HTMLs fornecidos.
- `expanded-data.js`: ordens adicionais pesquisadas para a biblioteca.
- `deep-expansions.js`: detalhamento de fases, crossovers e títulos paralelos.
- `volume-audit.js`: agrupamento das runs por volumes e personagens da expansão mais recente.
- `library-wave-3.js`: personagens adicionais, equipes, mutantes e universos alternativos, sempre divididos por fases e volumes.
- `library-wave-4.js`: última expansão da biblioteca, com jovens heróis, núcleo urbano e cósmico da Marvel, mais mutantes, Aranhas e equipes e personagens clássicos da DC.
- `library-wave-5.js`: ordem completa do Doutor Destino, da origem clássica a *One World Under Doom*.
- `enhancements.css`: acabamento visual da estante, notas, filtros e navegação de leitura.
- `character-themes.js` e `character-themes.css`: paletas dinâmicas de personagens, equipes e editoras.
- `manifest.webmanifest`, `app-icon.svg` e `sw.js`: instalação e funcionamento offline.
- `fontes/`: local para novos HTMLs.
- `ferramentas/importar_html.py`: importador sem dependências externas.

As listas originais foram preservadas como referência de ordem. Links de fonte apontam para o Comic Book Treasury quando disponíveis.
