# Página de Vendas — React + Vite + Tailwind CSS

Landing page de conversão completa, responsiva e pronta para receber os dados reais
do produto. **Todo o conteúdo atual é placeholder** — nada foi inventado como se fosse real.

---

## 1. Como ver e como publicar

### A) Só quero ver a página (sem instalar nada)
Descompacte `clipesdochef-site-pronto.zip` e dê **dois cliques em `index.html`**.
A página abre no navegador, com imagens, textos e tudo funcionando.

### B) Quero colocar no ar hoje (sem instalar nada)
1. Acesse **app.netlify.com/drop**
2. Arraste a **pasta inteira** que saiu do `clipesdochef-site-pronto.zip`
3. Em segundos o site está no ar com um endereço provisório
4. Em *Domain settings* você aponta o seu domínio próprio

O mesmo funciona no Vercel (vercel.com/new → "deploy static") e na Cloudflare Pages.

### C) Quero editar no meu computador
Precisa do **Node.js LTS** instalado (nodejs.org → botão LTS → next, next, finish).

1. Descompacte `pagina-de-vendas.zip`
2. Abra a pasta no Explorer, clique na barra de endereço, escreva `cmd` e dê Enter
3. Na janela preta, digite:

```bash
npm install     # só na primeira vez, baixa as dependências
npm run dev     # abre em http://localhost:5173
```

Deixe essa janela aberta. Toda vez que você salvar o `site.config.js`,
a página recarrega sozinha no navegador.

Quando terminar de editar:

```bash
npm run build   # gera a pasta dist/ pronta para publicar
```

A pasta `dist/` é a que você arrasta para o Netlify (passo B).

## 2. Estrutura de arquivos

```
pagina-de-vendas/
├── index.html                      SEO, Open Graph, fontes (preenchido pelo config)
├── vite.config.js                  injeta o config dentro do index.html
├── tailwind.config.js              tokens de design (lê as cores do config)
├── postcss.config.js
├── package.json
│
├── public/                         arquivos servidos como estão
│   ├── logo-clipesdochef.png       wordmark recortado da arte (header e rodapé)
│   ├── marca-clipesdochef.jpg      arte principal (hero)
│   ├── marca-hotmart.jpg           versão com selo Hotmart (seção do produto)
│   ├── favicon.png                 ícone recortado da arte
│   ├── apple-touch-icon.png
│   ├── og-image.jpg                imagem de compartilhamento 1200x630
│   ├── politica-de-privacidade.html   modelos provisórios de páginas legais
│   ├── termos-de-uso.html
│   └── politica-de-reembolso.html
│
└── src/
    ├── main.jsx                    ponto de entrada
    ├── App.jsx                     ordem das seções da página
    ├── index.css                   estilos base e classes reutilizáveis
    │
    ├── config/
    │   └── site.config.js          ★ ARQUIVO PRINCIPAL — edite aqui
    │
    ├── lib/
    │   ├── theme.js                converte as cores do config em CSS variables
    │   ├── text.jsx                destaque de títulos e marcação de placeholders
    │   └── links.js                proteção contra link de checkout vazio
    │
    ├── hooks/
    │   └── useReveal.js            animação de entrada + detecção de scroll
    │
    └── components/
        ├── ui/                     peças reutilizáveis
        │   ├── Button.jsx          botão único de toda a página
        │   ├── BuyButton.jsx       botão de compra (usa o checkout do config)
        │   ├── Section.jsx         casca + cabeçalho padrão das seções
        │   ├── Media.jsx           imagem com placeholder embutido
        │   ├── Reveal.jsx          animação de entrada
        │   └── Icon.jsx            ícones em SVG (sem biblioteca externa)
        │
        └── sections/               as 13 seções da página
            ├── Header.jsx          topo fixo + barra de aviso + menu mobile
            ├── Hero.jsx            primeira dobra
            ├── Problem.jsx         problema / oportunidade
            ├── Product.jsx         apresentação do produto
            ├── Benefits.jsx        cards de benefícios
            ├── HowItWorks.jsx      passo a passo
            ├── Included.jsx        produto principal + bônus
            ├── Testimonials.jsx    prova social
            ├── Offer.jsx           oferta e preço
            ├── Guarantee.jsx       garantia
            ├── Faq.jsx             perguntas frequentes
            ├── FinalCta.jsx        última chamada
            ├── Footer.jsx          rodapé
            └── StickyCta.jsx       barra de compra fixa no celular
```

---

## 3. Onde alterar cada coisa

**Quase tudo está em um único arquivo: `src/config/site.config.js`.**

| O que você quer mudar | Onde |
|---|---|
| Nome do produto e da empresa | `brand.productName`, `brand.companyName` |
| Logo (texto ou imagem) | `brand.logo` — use `type: 'image'` e `src: '/logo.svg'` |
| Cores | `theme.primary` (preenchimentos), `theme.primaryLight` (textos/ícones no escuro), `theme.primaryDark` (hover), `theme.secondary` (dourado) |
| Fontes | `theme.fontHeading`, `theme.fontBody` (atualize também o link no `index.html`) |
| Título e descrição do Google | `seo.title`, `seo.description` |
| Imagem de compartilhamento | `seo.ogImage` + arquivo em `public/` |
| Barra de aviso do topo | `announcement` (`enabled: false` remove) |
| Textos do topo da página | `hero` |
| Preço, preço antigo, parcelamento | `offer.oldPrice`, `offer.price`, `offer.paymentInfo` |
| **Link do checkout** | `offer.checkoutUrl` |
| Bônus | `included.bonuses` |
| Comparativo sem × com | `comparison.rows` |
| Depoimentos | `testimonials.items` |
| Garantia | `guarantee` |
| Perguntas frequentes | `faq.items` |
| Contato, CNPJ, links legais | `footer` |
| Barra fixa no celular / animações | `behavior` |

### Regras de escrita usadas no config

- Texto entre `[COLCHETES]` = placeholder. Aparece destacado na página com borda
  tracejada e o destaque some sozinho quando você coloca o valor real.
- Em títulos, o trecho entre `*asteriscos*` recebe o degradê da cor principal.
  Ex.: `'Comece a *vender hoje*'`
- Ícones disponíveis (campo `icon`): `bolt, target, shield, clock, chart, gift,
  sparkles, lock, play, check, star, users, layers, rocket, heart, wallet, mail,
  phone, chat, download, book, tool`.

### Imagens

Coloque os arquivos na pasta `public/` e escreva o caminho no config:

```js
image: { src: '/mockup-produto.png', alt: 'Descrição da imagem', placeholder: '[…]' }
```

Enquanto `src` estiver vazio, aparece o placeholder. O `alt` é obrigatório
(acessibilidade e SEO). Formatos recomendados: WebP ou PNG comprimido, no máximo
1600px de largura.

### Checkout

Enquanto `offer.checkoutUrl` for `[LINK DO CHECKOUT]`, todos os botões de compra
levam para a seção de oferta em vez de virarem links quebrados. Ao colar a URL real
(Hotmart, Kiwify, Eduzz, Braip, Stripe…), **todos os botões da página passam a
apontar para ela automaticamente**.

---

## 4. Antes de publicar — checklist

- [ ] Substituir todos os textos entre `[COLCHETES]`
- [ ] Colar a URL real do checkout
- [ ] Trocar `favicon.svg` e `og-image.svg`
- [ ] Publicar apenas depoimentos reais e autorizados pelos clientes
- [ ] Preencher a garantia só com a política que você realmente pratica
- [ ] Revisar as três páginas legais em `public/` com apoio jurídico (LGPD)
- [ ] Preencher CNPJ, e-mail e endereço no rodapé
- [ ] Conferir o domínio em `brand.domain` (usado no SEO e no Open Graph)
- [ ] Rodar `npm run build` e testar com `npm run preview`

---

## 5. O que já está verificado

- Build de produção sem erros ou avisos
- Sem scroll horizontal em 360, 390, 768, 1280, 1440 e 1920px
- Nenhum elemento estourando a tela em nenhum breakpoint
- Um único `<h1>` e hierarquia de headings sem saltos
- Contraste de texto entre 7,3:1 e 18,5:1 (WCAG AA exige 4,5:1)
- Navegação completa por teclado, com link "pular para o conteúdo"
- Menu mobile fecha com Esc e trava o scroll do fundo
- FAQ acessível com `aria-expanded` / `aria-controls`
- Animações respeitam `prefers-reduced-motion`
- Zero dependências além de React — os ícones são SVG inline
