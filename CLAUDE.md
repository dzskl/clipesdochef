# ClipesDoChef — página de vendas

Contexto para quem continuar este projeto. Leia inteiro antes da primeira alteração.

---

## 1. O que é

Landing page de vendas de produto digital, escrita do zero em React + Vite + Tailwind.
Produto: **ClipesDoChef** — biblioteca de cortes de vídeo organizada por nicho, com
templates de edição no Canva e aulas para iniciantes. O comprador usa o material para
abastecer páginas no TikTok, Instagram, YouTube, Facebook e Kwai. Vendido pela Hotmart
por **R$ 37,90** (pagamento único).

A dona do projeto (Bianca) **não é desenvolvedora**. Ela edita textos e valores; qualquer
coisa que exija mexer em JSX deve ser feita por quem estiver assistindo, não delegada a ela.

---

## 2. Comandos

```bash
npm install     # primeira vez
npm run dev     # http://localhost:5173
npm run build   # gera dist/
npm run preview # testa o build
```

### Particularidades da máquina dela (Windows)

- Node **v24.19.0** instalado em `C:\Program Files\nodejs`, mas o **PATH é instável**:
  `npm` frequentemente não é reconhecido em janelas novas do PowerShell.
- Contorno que funciona sempre:
  ```powershell
  & "C:\Program Files\nodejs\npm.cmd" install
  ```
- Ou, para corrigir a janela atual:
  ```powershell
  $env:Path += ";C:\Program Files\nodejs"
  ```
- A execution policy do PowerShell bloqueia `npm.ps1`. Use `npm.cmd` ou rode uma vez:
  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
  ```
- Projeto em `C:\Users\Administrator\Downloads\pagina-de-vendas_1`.

---

## 3. Arquitetura — leia isto antes de editar qualquer coisa

### 3.1 Uma única fonte de verdade: `src/config/site.config.js`

**Todo** o conteúdo da página vive nesse arquivo: marca, cores, SEO, textos de todas as
seções, preço, bônus, FAQ, rodapé. Os componentes são só apresentação.

Regra: **nunca escreva texto de conteúdo dentro de um `.jsx`.** Se um texto novo precisa
existir, ele entra no config e o componente lê de lá. Isso é o que permite a Bianca alterar
a página sozinha.

### 3.2 Cores por CSS variables

`site.config.js → theme` contém hexadecimais. `src/lib/theme.js` converte para triplas RGB
e injeta:

- no build/dev, via `vite.config.js`, no atributo `style` da tag `<html>` (evita flash de cor);
- em runtime, via `applyTheme()` no `App.jsx` (permite hot reload das cores).

`tailwind.config.js` mapeia os tokens (`bg-primary`, `text-muted`, etc.) para essas variables.
**Não escreva cor literal em componente nenhum.** Trocar a paleta = editar `theme` no config.

### 3.3 Os três vermelhos — não unifique

| Token | Uso | Por quê |
|---|---|---|
| `primary` `#E1000F` | preenchimento de botões e selos | branco em cima dá 4,99:1 (AA exige 4,5) |
| `primaryLight` `#FF3B45` | textos pequenos, ícones, degradê de títulos | 5,72:1 sobre o fundo escuro |
| `primaryDark` `#A80009` | hover dos botões | — |

Um vermelho só **não resolve**: para passar em contraste com branco por cima ele precisa
ser escuro; para passar como texto no fundo quase preto precisa ser claro. São requisitos
matematicamente opostos. Se alguém "simplificar" isso para um token só, a acessibilidade quebra.

`secondary` `#E3A93C` é o dourado da coroa da arte — usado em brilhos e no degradê dos títulos.

### 3.4 Convenções de texto no config

- **Placeholders**: texto entre `[COLCHETES]` é renderizado com borda tracejada vermelha
  pelo componente `<Val>` (`src/lib/text.jsx`). Some sozinho quando o valor real entra.
  Serve de checklist visual do que falta.
- **Destaque em títulos**: trecho entre `*asteriscos*` recebe o degradê vermelho→dourado
  via `<Highlight>`. Ex.: `'Comece a *vender hoje*'`.
- **Ícones**: campo `icon` aceita nomes de `src/components/ui/Icon.jsx` — `bolt, target,
  shield, clock, chart, gift, sparkles, lock, play, check, star, users, layers, rocket,
  heart, wallet, mail, phone, chat, download, book, tool`. São SVG inline, **sem biblioteca
  externa**. Precisa de um ícone novo? Adicione o path em `Icon.jsx`, não instale pacote.

### 3.5 Proteções contra link quebrado

- `offer.checkoutUrl` já tem a URL real da Hotmart. A guarda em `checkoutHref()`
  (`src/lib/links.js`) continua valendo: se o campo voltar a ser um placeholder, os botões
  de compra rolam até a seção de oferta em vez de virarem link morto.
  São **5 botões de compra** (`BuyButton`), todos apontando para o checkout com `rel="noopener"`.
  Os dois botões "Quero acessar" do cabeçalho (desktop e menu mobile) **não** são `BuyButton`:
  têm `href="#oferta"` fixo no `Header.jsx` e rolam até a oferta de propósito, para o visitante
  ver o preço antes do checkout.
- `SafeLink` no `Footer.jsx` faz o mesmo com links de rede social: href placeholder vira texto.
- Campos vazios no rodapé (`phone`, `address`) somem da lista em vez de deixar ícone órfão.

### 3.6 Imagens

- Caminhos começam com `./` (ex.: `'./marca-clipesdochef.jpg'`), e o build usa `base: './'`.
  Isso é **intencional**: faz a pasta `dist/` funcionar tanto hospedada quanto aberta por
  duplo clique no `index.html`. Não troque para caminho absoluto.
- O plugin `scriptClassico()` em `vite.config.js` remove `type="module"` e `crossorigin` do
  HTML do build, e o rollup gera IIFE — é o que permite abrir por `file://`. Também intencional.
- `<Media>` (`src/components/ui/Media.jsx`) mostra um placeholder tracejado quando `src` é
  vazio. `alt` é obrigatório.

### 3.7 Estrutura

```
src/
├── config/site.config.js       ← 100% do conteúdo
├── lib/
│   ├── theme.js                hex → CSS variables
│   ├── text.jsx                <Highlight>, <Val>, isPlaceholder, cx
│   └── links.js                guarda do checkout
├── hooks/useReveal.js          IntersectionObserver + scroll
├── components/ui/              Button, BuyButton, Section, Media, Reveal, Icon, Logo
└── components/sections/        Header, Hero, Problem, Product, Benefits, Comparison,
                                HowItWorks, Included, Testimonials, Offer, Guarantee,
                                Faq, FinalCta, Footer, StickyCta
public/
├── logo-clipesdochef.png       wordmark do cabeçalho (deitado) — grafia nova
├── letreiro-clipesdochef.png   letreiro empilhado, grafia nova — NÃO USADO na página:
│                               a proporção (1,3:1) não cabe na faixa do cabeçalho
├── marca-clipesdochef.jpg      arte principal (hero) — grafia nova
├── marca-hotmart.jpg           versão com selo Hotmart — AINDA COM A GRAFIA ANTIGA
├── templates-clipesdochef.jpg  arte do bônus 01 (templates no Canva)
├── favicon.png, apple-touch-icon.png, og-image.jpg
│                               gerados da arte nova (rosto e peça inteira)
└── politica-de-privacidade.html, termos-de-uso.html, politica-de-reembolso.html
                                (modelos provisórios, precisam de revisão jurídica)
```

---

## 4. Regras de conteúdo — inegociáveis

1. **Não inventar depoimentos.** A seção `testimonials` está com placeholders de propósito.
   Só entram depoimentos reais e autorizados pelos clientes. Enquanto houver placeholder,
   um aviso aparece na seção (some sozinho depois).
2. **Não inventar preço "de".** `offer.oldPrice` está vazio de propósito — preço riscado que
   nunca foi praticado é publicidade enganosa (art. 37 do CDC) e a Hotmart derruba.
   Só preencher se aquele valor foi realmente cobrado.
3. **Não inventar números.** `[Nº] nichos` e `mais de [Nº] cortes` seguem como placeholder
   porque ninguém confirmou os números reais. Não chute.
4. **Garantia**: os 7 dias são o direito de arrependimento do art. 49 do CDC, obrigatório em
   venda online no Brasil — por isso pode ficar escrito. Se a oferta for maior (14, 30 dias),
   alterar `guarantee.days`, `guarantee.title` e `guarantee.seal`.
5. **Sem promessa de ganho.** O copy fala de tempo economizado e material pronto, nunca de
   dinheiro garantido. O disclaimer do rodapé sustenta isso. Não introduza "ganhe R$ X".
6. **A referência (mistercuts.com.br) serviu só para entender o modelo de negócio.** Nenhum
   texto, imagem ou trecho de código foi copiado, e nada deve ser. O copy atual é autoral.

---

## 5. Estado atual

### Pronto
Todas as 13 seções + comparativo, copy completo em português, identidade visual aplicada a
partir da arte da marca, preço R$ 37,90, garantia de 7 dias, 10 perguntas no FAQ, rodapé com
e-mail `0x1trampo@gmail.com` e Instagram `instagram.com/clipesdochef`.

### Falta (dados que só a dona tem)
- [ ] `faq.items[6].a` — se o acesso é vitalício ou assinatura
- [ ] 3 prints: área de membros, aulas, coleções (`included.*.image.src`) — o de
      templates já entrou (`templates-clipesdochef.jpg`)
- [ ] Arte com o selo da Hotmart na grafia nova (substitui `marca-hotmart.jpg`)
- [ ] Revisão jurídica das 3 páginas em `public/`

A página não tem mais nenhum placeholder tracejado. Os campos de valor
(`included.*.value`, `included.totalValue`) ficaram **vazios de propósito**: só o combo
é vendido, não há pacote avulso, então não existe valor de referência a comparar. Os
blocos que os exibiam só voltam a aparecer se os campos forem preenchidos.

### Pendências em aberto
- **Domínio**: `brand.domain` está como `clipesdochef.com.br`, não confirmado.

### Resolvidas (não reabrir)
- **Grafia do nome** — confirmada pela dona: é **ClipesDoChef**. A arte da marca foi
  refeita com a grafia certa e já substituída em `marca-clipesdochef.jpg`, `og-image.jpg`,
  `favicon.png` e `apple-touch-icon.png`.

  O logo do cabeçalho também já está na grafia nova. **Só `marca-hotmart.jpg` ainda traz
  o `CLIIPSDOCHEF` antigo**, e depende de material que só a dona tem.

  Sobre o formato do logo: o cabeçalho renderiza a imagem com 40px de altura, então o
  letreiro precisa ser **deitado**. O atual tem proporção 3,1:1 e sai com 125px de
  largura. Uma versão empilhada em duas linhas (como `letreiro-clipesdochef.png`, 1,3:1)
  sairia com 53px e ficaria ilegível — por isso ela existe no projeto mas não é usada.
  Se algum dia faltar um letreiro deitado, a saída é trocar `brand.logo.type` para
  `'text'`, que faz o componente `Logo` renderizar `brand.logo.text`. Nunca propague a
  grafia de uma imagem para o texto.
- **Frequência de atualização** — confirmada pela dona: a biblioteca **não tem frequência
  fixa de atualização**. Toda promessa de atualização diária saiu do copy; o texto agora diz
  "com frequência" / "sempre crescendo". **Não reintroduza "todos os dias" descrevendo a
  biblioteca** — seria promessa contratual que o produto não sustenta.

  Atenção: quatro frases ainda dizem "todos os dias"/"todo dia" e **estão corretas** — elas
  falam da rotina de postagem do *comprador*, não da atualização do acervo:
  `seo.title`, `hero.headline`, `problem.bridgeText` e `benefits.items[2].text`.

---

## 6. Padrão de qualidade

A página foi validada com Chromium real. Mantenha esse nível ao alterar qualquer coisa:

- Sem scroll horizontal e sem elemento estourando a tela em **360, 390, 768, 1280, 1440 e 1920px**
- Um único `<h1>`; hierarquia de headings sem saltos (h2 → h3, nunca h2 → h4)
- Toda `<img>` com `alt`
- Contraste: texto principal 18,5:1 · texto secundário 8,0:1 · branco no botão 4,99:1 ·
  vermelho claro no fundo 5,7:1 · dourado 9,6:1 (mínimo AA = 4,5:1)
- Alvos de toque ≥ 40px de altura
- Menu mobile fecha com Esc e trava o scroll do fundo; FAQ com `aria-expanded`/`aria-controls`
- Animações respeitam `prefers-reduced-motion`
- Barra fixa de compra no celular aparece após a primeira dobra e some na seção de oferta

**Antes de dizer que terminou:** rode `npm run build` e confira nos breakpoints acima.
Placeholder tracejado na tela é esperado — é o que falta preencher, não é bug.

---

## 7. Publicar

`npm run build` gera `dist/`. Essa pasta:

- abre por duplo clique no `index.html` (sem servidor);
- pode ser arrastada para **app.netlify.com/drop** e o site fica no ar;
- funciona igual em Vercel e Cloudflare Pages.

Não há GitHub configurado. Existe conector de Netlify e Vercel disponíveis na conta Claude
dela, se ela quiser deploy sem terminal.
