# CLER — Landing Page | Next.js + TypeScript

Projeto modularizado com seções TSX na landing page e uma página de trajetória sob demanda, preservando o conteúdo, as imagens e a identidade do CLER, com AOS, modo escuro e traduções PT/EN.

> **ATENÇÃO — migração para Web Summit:** veja [DEPLOY-WEBSUMMIT.md](DEPLOY-WEBSUMMIT.md) antes de executar/publicar. Os arquivos Framer originais não puderam ser baixados neste ambiente; use `npm run assets:sync` numa máquina com internet para gerar os 10 conjuntos de imagens WebP locais. O build bloqueia a publicação até isso estar concluído. GA4 é opcional e só é ativado por consentimento após configurar `NEXT_PUBLIC_GA_MEASUREMENT_ID`.

## Instalação e execução

Requisito: Node.js 20.9+ e internet na primeira instalação.

```bash
npm install
npm run assets:sync
npm run dev
```

Abra **http://localhost:3000**.

> **Importante:** durante `npm install`, o script `postinstall` baixa **12 arquivos TSX originais** da coleção **https://lucide-animated.com/** para `src/components/icons/`. São os componentes individuais, com animações próprias em Motion, e **não** ícones estáticos do pacote `lucide-react`.
>
> O instalador tenta primeiro o repositório oficial [`pqoqubbw/icons`](https://github.com/pqoqubbw/icons), depois o registry oficial `lucide-animated.com/r/<icon>.json`. Se não conseguir acessar nenhuma das fontes, apresenta um erro e orienta a executar `npm run icons:install` quando houver internet. Depois de baixados, os arquivos ficam **locais** e não precisam de internet para renderizar.

Para validar após instalar:

```bash
npm run typecheck
npm run build
```

Para atualizar os ícones com as versões oficiais mais recentes:

```bash
npm run icons:install
```

## Estrutura

```text
public/assets/              # Imagens da landing original
src/app/
  layout.tsx               # Next App Router, metadados, estilos AOS
  page.tsx                 # Ordem das seções
  globals.css              # Identidade original, temas e responsividade
src/components/
  sections/                # Seções independentes TSX + teaser da trajetória
  layout/                  # Header, Footer, modal legal
  ui/
    AnimatedIcon.tsx       # Mapeamento dos 12 ícones oficiais
    AosInit.tsx            # Inicializador de AOS para App Router
    BackToTop.tsx          # Botão de voltar ao topo
  icons/                   # Componentes Lucide Animated baixados no npm install
src/contexts/AppContext.tsx # Tema, idioma, notificações e modal
src/lib/
  translations.ts          # Todas as traduções PT/EN, inclusive termos legais
  utils.ts                 # Utilitário `cn` usado pelos ícones oficiais
scripts/
  install-lucide-icons.mjs # Instala cada ícone real da coleção original
```

## Ícones originais usados

| Ícone da interface | Componente oficial | Arquivo TSX |
|---|---|---|
| Voltar ao topo | ArrowUpIcon | `arrow-up.tsx` |
| Notificações | BellIcon | `bell.tsx` |
| Relatórios | ChartLineIcon | `chart-line.tsx` |
| Menu secundário | ChevronDownIcon | `chevron-down.tsx` |
| Organização | HomeIcon | `home.tsx` (equivalente visual ao house) |
| Menu móvel | MenuIcon | `menu.tsx` |
| Tema escuro | MoonIcon | `moon.tsx` |
| Vídeo | PlayIcon | `play.tsx` |
| Digitalização | ScanTextIcon | `scan-text.tsx` |
| Tema claro | SunIcon | `sun.tsx` |
| Cuidados compartilhados | UsersIcon | `users.tsx` |
| Fechar | XIcon | `x.tsx` |

Cada arquivo é disponibilizado pelo repositório original sob licença MIT. Os componentes são instalados *em arquivos individuais*, do mesmo modo sugerido no site oficial. São animados de acordo com as variantes e os controles do Motion fornecidos pelo autor.

## AOS

O AOS é importado somente no cliente e inicializado **depois que as seções já foram montadas**. Usamos o evento `cler:aos:start`, disparado **dois frames após preparar o estado CSS** para garantir a transição também na entrada inicial. A inicialização é compartilhada (não duplica listeners no Strict Mode), e o código chama `refreshHard()` após atualizações de idioma/tema, carregamento de fontes ou mudança de altura das seções para recalcular as posições. Caso o AOS não carregue, o CSS mantém o conteúdo visível. A preferência do sistema por movimento reduzido é respeitada.

## Inglês

A versão EN possui todas as chaves presentes na versão PT, inclusive FAQ e termos. O controle de idioma do rodapé foi removido (o do header permanece). Foram corrigidos os textos alternativos das imagens, as descrições acessíveis do vídeo e da área de screenshots e os estilos de quebra de linha em títulos, botões, cards e conteúdo legal. O título da Hero agora usa `clamp()` responsivo para não partir palavras em duas linhas; o mesmo princípio foi aplicado a outros títulos. **As próprias capturas de tela do aplicativo, mantidas do projeto original, continuam mostrando a interface em português**, pois não foram modificadas.

## Observações

- A função de contato abre um **rascunho no aplicativo de e-mail** do usuário; não existe serviço de envio por backend.
- O modo escuro e o idioma selecionados são salvos em `localStorage`.
- As bibliotecas `aos` e `motion` são instaladas com o restante das dependências do npm.
- Ícones, cores e textos podem ser personalizados nos arquivos correspondentes, sem alterar as demais seções.

## Correção de AOS e títulos (novembro de 2026)

- **AOS:** `src/components/ui/AosInit.tsx` é executado apenas no navegador, compartilha o import para evitar dupla inicialização pelo React Strict Mode e espera dois frames antes de disparar o evento `cler:aos:start`. O CSS em `globals.css` mantém os elementos visíveis durante o SSR e só permite os estados ocultos do AOS após o JavaScript estar pronto.
- **Responsividade:** títulos não usam mais `overflow-wrap: break-word`; em vez disso, a fonte do título principal se adapta ao espaço disponível, mantendo `medicamentos` e `medication` inteiros. A largura das colunas também pode encolher sem causar overflow.
- **Acessibilidade:** quando o dispositivo pede movimento reduzido, as animações permanecem desativadas, intencionalmente.
- **Validação realizada:** arquivos TSX analisados quanto à sintaxe, CSS analisado por parser e layout isolado da Hero conferido em Chromium nas larguras 320, 375, 393, 760, 800, 1280 e 1440 px (textos PT/EN). O build completo e o comportamento do AOS no projeto real ainda exigem `npm install` e um teste local no navegador.


## Navegação acessível entre seções

A navbar usa `src/hooks/useSectionNavigation.ts`. Os links ainda preservam
`#sobre`, `#como-funciona`, `#para-quem`, `#parcerias` e `#faq` na URL para
compartilhamento, mas a rolagem é calculada pelo JavaScript até o título da
seção, descontando a altura real da barra fixa e adicionando 20 px de respiro.
No celular, essa medida considera apenas a barra principal, mesmo quando o menu
expansível estava aberto.

O destaque acompanha a seção realmente alcançada por meio de um cálculo
contínuo durante a rolagem e não depende de `IntersectionObserver`. O menu
**Mais** recebe indicador ativo quando a página Trajetória, Parcerias ou FAQ estiverem ativos.
A navegação respeita `prefers-reduced-motion`, mantém o foco acessível e
suporta links diretos com hash, histórico e botões voltar/avançar do navegador.

Para alterar o espaço entre o header e o começo da seção, modifique
`CONTENT_GAP` em `useSectionNavigation.ts` (atualmente 20 px).


## Seção Nossa trajetória (implementada a partir do PDF)

A seção `#trajetoria` foi inserida entre **Sobre o CLER** e **Como funciona**, utilizando os marcos documentados no PDF de oito páginas. Conteúdo preservado: origem e incentivo de 2024; desenvolvimento e eventos de 2025; ampliação em 2026; implantação, produto e conclusão. As 17 fotos das páginas 2 a 6 foram extraídas para `public/assets/trajectory` e possuem textos alternativos em PT/EN.

- `src/components/sections/Trajectory.tsx`: timeline semântica (`ol`), galerias com abertura da imagem original, próximos passos e conclusão, com efeitos AOS.
- `src/components/sections/Trajectory.module.css`: paleta e espaçamentos da landing, tema claro/escuro e layout adaptável no mobile.
- `src/lib/trajectory.ts`: dados e traduções completas da nova seção, integrados ao contexto de idioma existente.
- Header desktop e mobile: o link Trajetória agora faz rolagem real para a seção e participa do indicador de seção ativa.
- Footer: link Trajetória ativo e **botão de trocar idioma removido**. A troca PT/EN segue no header.

**Verificações:** 33 arquivos TS/TSX analisados quanto à sintaxe; CSS verificado por parser; imagens e navegação conferidas. O build completo depende de instalar os pacotes npm e os ícones originais, processo que não foi concluído no ambiente de execução. Execute `npm install`, `npm run typecheck` e `npm run build` antes de publicar.


## Trajetória sob demanda (feedback do cliente)

A linha do tempo completa deixou de ser exibida na landing page principal.
O conteúdo e as 17 imagens continuam disponíveis em **`/trajetoria`**.

- **Header:** "Mais → Trajetória" abre a página dedicada; o menu mobile tem link direto.
- **Rodapé:** "Trajetória" também abre a página dedicada (sem adicionar controle de idioma no footer).
- **Rota:** `src/app/trajetoria/page.tsx`, com navegação de retorno e breadcrumb traduzidos.
- **Conteúdo:** `src/components/sections/Trajectory.tsx` e `src/lib/trajectory.ts` permanecem completos em PT/EN.
- **Links para seções da landing:** de `/trajetoria`, os menus usam `/#...` para voltar à home e navegar até a seção certa.
- **Destaque do header:** o menu "Mais" permanece ativo quando `/trajetoria` está aberto e o link da trajetória recebe `aria-current="page"`.

A mudança reduz a extensão da página inicial, mas preserva o conteúdo histórico de forma voluntária e descobrível, conforme as heurísticas de controle do usuário, reconhecimento e simplicidade visual.


## Card de convite à trajetória na página inicial

A linha do tempo permanece exclusivamente em `/trajetoria`, mas a landing conta agora
com um **card de convite** logo depois de “Sobre o CLER” e antes de “Como funciona”.

- `src/components/sections/JourneyTeaser.tsx` — card semântico com link Next.js para `/trajetoria`, duas fotos reais existentes e ícone da coleção Lucide Animated.
- `src/components/sections/JourneyTeaser.module.css` — aparência do card, responsive, gradiente da marca, cores com contraste adequado e suporte automático ao tema claro/escuro pela variável `--paper`.
- `src/lib/translations.ts` — novos textos, CTA e descrições das imagens em PT/EN.
- `src/app/page.tsx` — nova seção no lugar da antiga trajetória.

O card não repete a cronologia completa nem ocupa a navegação principal.
Usa `data-aos` no contêiner e mantém o conteúdo legível quando as animações são
desativadas por preferência de movimento reduzido.

**Verificações:** sintaxe dos arquivos alterados e chaves PT/EN; imagens locais
confirmadas. Layout isolado conferido no Chromium em 320, 375, 768 e 1280 px,
nos modos claro/escuro e em ambos os idiomas, sem overflow horizontal.
A aplicação Next.js completa ainda precisa de `npm install` e teste do build local.


### Rolagem entre páginas

`src/components/ui/RouteScrollTop.tsx` é montado uma vez no `layout.tsx` e
reposiciona a tela no topo quando o `pathname` muda (por exemplo, ao abrir
`/trajetoria` ou voltar para `/`). O ajuste é instantâneo, independentemente
do `scroll-behavior: smooth` global. A navegação entre seções da landing page
(`#como-funciona`, `#faq` etc.) e os links que levam a uma seção específica
continuam funcionando normalmente, sem serem redefinidos pelo componente.


## Atualização — Seção "Comece a usar o CLER"
- `src/components/sections/GetStarted.tsx`: bloco reorganizado com o mockup local do telefone, selos informativos das lojas e ambos os links originais do PWA.
- `src/components/sections/GetStarted.module.css`: layout responsivo, contraste claro/escuro e composição do mockup com fundo transparente.
- `public/assets/cler-app-phone.webp`: imagem do telefone enviada na conversa, convertida para transparente.
- `src/lib/translations.ts`: novo aviso de disponibilidade futura traduzido para PT/EN.
- **Nota:** os selos App Store e Google Play NÃO são botões de download porque as URLs das lojas não foram fornecidas. Os dois botões existentes continuam abrindo `https://pwa.cler.app/`.

## Revisão de privacidade e desempenho (novembro/2026)

- `scripts/sync-remote-assets.mjs`: migração para 10 conjuntos de imagens locais responsivas, executada uma única vez; depois faça commit do resultado.
- `src/components/ui/PrivacyControls.tsx`: aceitação/recusa de analytics, com possibilidade de alteração.
- `src/lib/analytics.ts`: GA4 após consentimento e medição de UTM/eventos sem transmitir dados do formulário.
- `src/components/ui/ContactForm.tsx`: aviso de privacidade e checkbox de ciência obrigatório, rascunho de e-mail mantido.
- `src/app/layout.tsx`: `next/font/google` gera arquivos de fontes servidos pelo próprio domínio durante a visita.
- `src/components/sections/Benefits.tsx`: o print de 210×287 px não é ampliado artificialmente; necessário solicitar imagem original em alta resolução.
- `src/lib/translations.ts`: contato público adicionado à cláusula legal no lugar do marcador incompleto, sem afirmar nomeação de DPO.

**Importante:** revisão jurídica de RGPD/GDPR e configuração do GA4 ainda são decisões da empresa; estas mudanças técnicas não constituem parecer jurídico nem uma garantia de conformidade.
