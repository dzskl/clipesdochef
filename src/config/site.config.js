/* ============================================================================
 *  ARQUIVO CENTRAL DE CONFIGURAÇÃO  —  edite SOMENTE este arquivo
 *  para alterar nome, cores, preços, textos, imagens, bônus e checkout.
 *
 *  Convenções usadas aqui:
 *  • Textos entre [COLCHETES] são PLACEHOLDERS. Eles aparecem na página com
 *    um estilo tracejado, indicando visualmente o que ainda falta preencher.
 *    Ao substituir por um texto real, o estilo tracejado some sozinho.
 *  • Em títulos, o trecho entre *asteriscos* recebe o destaque em degradê.
 *    Ex.: 'Transforme seu *resultado* hoje'
 *  • Ícones aceitos (campo `icon`): bolt, target, shield, clock, chart, gift,
 *    sparkles, lock, play, check, star, users, layers, rocket, heart, wallet,
 *    mail, phone, chat, download, book, tool.
 * ==========================================================================*/

export const siteConfig = {
  /* ==========================================================================
   * 1. MARCA
   * ========================================================================*/
  brand: {
    productName: 'ClipesDoChef',           // nome do produto
    companyName: 'ClipesDoChef',           // venda como pessoa física, sem CNPJ
    domain: 'clipesdochef.com',            // confirmado — usado em SEO/Open Graph
    logo: {
      type: 'image',                       // 'text' = usa o texto | 'image' = usa src
      text: 'ClipesDoChef',                // usado se type === 'text'
      src: './logo-clipesdochef.png',       // arquivo em /public (caminho começa com ./)
      alt: 'ClipesDoChef',
      height: 40,                          // altura em px do logo em imagem
    },
  },

  /* ==========================================================================
   * 2. IDENTIDADE VISUAL (cores, fontes, cantos)
   *    Estes valores viram CSS variables e re-tematizam a página inteira.
   * ========================================================================*/
  theme: {
    primary: '#E1000F',        // COR PRIMÁRIA — preenchimento de botões e selos
    primaryLight: '#FF3B45',   // vermelho claro — textos pequenos e ícones no escuro
    primaryDark: '#A80009',    // vermelho escuro — hover dos botões
    secondary: '#E3A93C',      // COR SECUNDÁRIA (dourado da coroa) — brilhos e detalhes
    background: '#0A0608',     // fundo da página
    surface: '#150E10',        // fundo dos cards
    surfaceAlt: '#1C1214',     // fundo de seções alternadas
    border: '#332326',         // bordas
    text: '#F7F2F2',           // texto principal
    textMuted: '#ADA1A3',      // texto secundário
    onPrimary: '#FFFFFF',      // texto DENTRO dos botões primários
    success: '#2FD48F',
    fontHeading: "'Sora', system-ui, -apple-system, 'Segoe UI', sans-serif",
    fontBody: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
    radius: '20px',            // raio padrão dos cards
  },

  /* ==========================================================================
   * 3. SEO / COMPARTILHAMENTO
   * ========================================================================*/
  seo: {
    title: 'ClipesDoChef — cortes prontos para postar todos os dias',
    description:
      'Biblioteca de cortes separados por nicho, com templates no Canva e aulas passo a passo. Monte e abasteça suas páginas sem gravar nem aparecer.',
    ogImage: './og-image.jpg',   // 1200x630
    favicon: './favicon.png',
    lang: 'pt-BR',
    locale: 'pt_BR',
  },

  /* ==========================================================================
   * 4. BARRA DE AVISO (topo)  —  enabled: false remove a barra
   * ========================================================================*/
  announcement: {
    enabled: true,
    text: 'A biblioteca recebe cortes novos com frequência, sem custo extra',
    linkLabel: 'Ver o que está incluso',
    linkHref: '#incluso',
  },

  /* ==========================================================================
   * 5. NAVEGAÇÃO
   * ========================================================================*/
  nav: {
    links: [
      { label: 'O produto', href: '#produto' },
      { label: 'Benefícios', href: '#beneficios' },
      { label: 'Como funciona', href: '#como-funciona' },
      { label: 'Dúvidas', href: '#faq' },
    ],
    ctaLabel: 'Quero acessar',
  },

  /* ==========================================================================
   * 6. HERO (primeira dobra)
   * ========================================================================*/
  hero: {
    eyebrow: 'Para quem quer crescer páginas sem gravar nada',
    headline: 'Cortes prontos para postar *todos os dias* — sem gravar, sem aparecer',
    subheadline:
      'O ClipesDoChef é uma biblioteca de vídeos curtos organizada por nicho, com templates de edição e aulas passo a passo. Você escolhe o corte, edita em minutos e publica no TikTok, Instagram, YouTube, Facebook ou Kwai.',
    ctaPrimary: 'QUERO TER ACESSO AGORA',
    ctaSecondary: 'Ver como funciona',
    ctaSecondaryHref: '#como-funciona',
    image: {
      src: './marca-clipesdochef.jpg',            // arquivo em /public
      alt: 'Arte do ClipesDoChef',
      placeholder: '[IMAGEM PRINCIPAL DO PRODUTO]',
      ratio: '1 / 1',                            // proporção do quadro
      caption: 'Acervo organizado por nicho e sempre crescendo',
    },
    // Vídeo de fundo do Hero (arquivo em /public). Deixe src vazio para voltar
    // às cédulas desenhadas. O vídeo precisa ter fundo escuro: ele é misturado
    // no modo 'screen', que faz o preto sumir e só as notas aparecerem.
    video: {
      srcWebm: './loop-dinheiro.webm', // preferido: 23% menor que o mp4
      src: './loop-dinheiro.mp4',      // reserva, para navegadores sem VP9 (Safari antigo)
      poster: './loop-dinheiro.jpg',   // 1º quadro, exibido enquanto o vídeo carrega
      velocidade: 0.5,                 // 1 = ritmo original; menor = notas caem mais devagar
    },
    // Selos de confiança abaixo do CTA (deixe [] para esconder)
    trustBadges: [
      { icon: 'lock', label: 'Pagamento seguro' },
      { icon: 'bolt', label: 'Acesso imediato' },
      { icon: 'shield', label: 'Garantia de 7 dias' },
    ],
  },

  /* ==========================================================================
   * 7. PROBLEMA / OPORTUNIDADE
   * ========================================================================*/
  problem: {
    eyebrow: 'O ponto de partida',
    title: 'Não falta vontade de postar. Falta *material pronto para postar*',
    intro:
      'Você já viu páginas de cortes crescendo rápido e pensou em montar a sua. Aí chega a parte que ninguém mostra: procurar vídeo bom, baixar, cortar, legendar, escolher trilha — e recomeçar tudo no dia seguinte.',
    pains: [
      {
        icon: 'clock',
        title: 'O tempo some na garimpagem',
        text: 'Você gasta mais tempo procurando vídeo do que publicando. E quando finalmente acha um corte bom, o assunto já esfriou.',
      },
      {
        icon: 'layers',
        title: 'Vídeo repetido não engaja',
        text: 'Baixar o mesmo material que todo mundo baixa faz sua página virar mais uma no meio da multidão. Sem variedade, o alcance trava.',
      },
      {
        icon: 'target',
        title: 'Sem constância, a página morre',
        text: 'As redes entregam para quem publica com frequência. Sem uma fonte fixa de material, você começa animado e para na segunda semana.',
      },
    ],
    bridgeTitle: 'Por que garimpar vídeo solto não sustenta uma página',
    bridgeText:
      'O problema não é falta de esforço — é o modelo. Caçar vídeo na internet é um trabalho que recomeça do zero todo dia, não acumula nada e deixa você refém do que apareceu no seu feed naquela manhã.',
    bridgeList: [
      'Você depende de sorte para achar um corte bom no dia certo',
      'Baixar em qualidade ruim derruba a entrega do vídeo',
      'Sem organização por nicho, sua página não constrói público fiel',
    ],
  },

  /* ==========================================================================
   * 8. APRESENTAÇÃO DO PRODUTO
   * ========================================================================*/
  product: {
    eyebrow: 'A solução',
    title: 'Conheça o *ClipesDoChef*',
    description:
      'É uma área de membros com uma biblioteca de cortes prontos, separados por nicho e com material novo entrando com frequência. Junto vêm os templates de edição no Canva e aulas curtas mostrando o caminho completo: escolher o nicho, montar a página, editar o vídeo e publicar.',
    forWho: {
      title: 'Feito para',
      items: [
        'Quem quer começar uma página de cortes do zero, sem experiência',
        'Quem já tem página e trava na hora de achar conteúdo',
        'Quem não quer gravar, aparecer nem comprar equipamento',
        'Quem tem pouco tempo e precisa de material já selecionado',
      ],
    },
    notForWho: {
      title: 'Não é para',
      items: [
        'Quem procura ganho garantido ou dinheiro sem trabalho',
        'Quem não pretende publicar com constância',
      ],
    },
    differentials: [
      { icon: 'layers', title: 'Acervo separado por nicho', text: 'Nada de pasta bagunçada: os cortes vêm organizados por tema, para você abastecer uma página com identidade clara.' },
      { icon: 'rocket', title: 'Acervo sempre crescendo', text: 'Material novo entra com frequência, incluindo o que está repercutindo, para você não postar só o que já saturou.' },
      { icon: 'tool', title: 'Templates e aulas inclusos', text: 'Modelos editáveis no Canva e aulas curtas cobrindo a edição, a publicação e a rotina de postagem em cada rede.' },
    ],
    image: {
      src: './marca-hotmart.jpg',
      alt: 'ClipesDoChef — produto disponível na Hotmart',
      placeholder: '[IMAGEM DE APRESENTAÇÃO DO PRODUTO]',
      ratio: '1 / 1',
    },
  },

  /* ==========================================================================
   * 9. BENEFÍCIOS (cards)
   * ========================================================================*/
  benefits: {
    eyebrow: 'Benefícios',
    title: 'O que muda na prática *depois do acesso*',
    subtitle: 'Menos tempo caçando vídeo, mais tempo publicando.',
    items: [
      { icon: 'bolt',     title: 'Material pronto esperando', text: 'Você abre a biblioteca, escolhe o corte e já parte para a edição. A parte demorada do trabalho já está feita.' },
      { icon: 'layers',   title: 'Nichos organizados',       text: 'Escolha um tema e abasteça sua página com conteúdo coerente, do jeito que as redes entregam melhor.' },
      { icon: 'clock',    title: 'Rotina de postagem viável', text: 'Dá para deixar a semana inteira editada e agendada em uma única sessão, em vez de correr atrás de vídeo todo dia.' },
      { icon: 'wallet',   title: 'Sem custo de produção',    text: 'Nada de câmera, microfone, iluminação ou equipe. Seu investimento é o acesso e o seu tempo de edição.' },
      { icon: 'sparkles', title: 'Templates que poupam decisão', text: 'Modelos prontos no Canva para capa, legenda e formato vertical — você não começa do zero a cada vídeo.' },
      { icon: 'chart',    title: 'Dá para escalar',          text: 'Com acervo suficiente, você consegue manter mais de uma página ao mesmo tempo, cada uma em um nicho diferente.' },
    ],
  },

  /* ==========================================================================
   * 9b. COMPARATIVO  (sem × com)
   * ========================================================================*/
  comparison: {
    eyebrow: 'Comparativo',
    title: 'Fazendo por conta própria × *com o ClipesDoChef*',
    subtitle: 'A diferença não está no esforço. Está em quanto do trabalho já vem pronto quando você senta para editar.',
    columns: {
      without: 'Garimpando sozinho',
      with: 'Com o ClipesDoChef',
    },
    rows: [
      { label: 'Achar o vídeo',        without: 'Horas rolando o feed até aparecer algo aproveitável', with: 'Biblioteca separada por nicho: você escolhe e baixa' },
      { label: 'Qualidade do arquivo', without: 'Gravação de tela, marca d\u2019água e imagem tremida',   with: 'Arquivos prontos para editar, sem remendo' },
      { label: 'Assunto do momento',   without: 'Você descobre quando o assunto já passou',           with: 'Coleções do que está repercutindo, renovadas com frequência' },
      { label: 'Edição',               without: 'Começar do zero a cada vídeo',                       with: 'Templates no Canva prontos para preencher' },
      { label: 'Aprendizado',          without: 'Tutorial solto, cada um ensinando de um jeito',      with: 'Aulas curtas na ordem certa, do nicho à publicação' },
      { label: 'Constância',           without: 'Depende da sua energia naquele dia',                 with: 'Dá para editar a semana inteira de uma vez só' },
    ],
  },

  /* ==========================================================================
   * 10. COMO FUNCIONA (passos)
   * ========================================================================*/
  howItWorks: {
    eyebrow: 'Como funciona',
    title: 'Do acesso ao primeiro vídeo no ar em *4 passos*',
    subtitle: 'Não exige experiência com edição nem equipamento — só o celular ou o computador que você já usa.',
    steps: [
      { title: 'Entre na área de membros', text: 'Assim que o pagamento é confirmado, você recebe o acesso por e-mail e entra na biblioteca pelo navegador.' },
      { title: 'Escolha o seu nicho',      text: 'Navegue pelas pastas temáticas e baixe os cortes que combinam com a página que você quer construir.' },
      { title: 'Edite com os templates',   text: 'Use os modelos do Canva para montar o vídeo no formato certo de cada rede. As aulas mostram o passo a passo.' },
      { title: 'Publique e mantenha o ritmo', text: 'Suba no TikTok, Instagram, YouTube, Facebook ou Kwai e siga postando. A biblioteca continua recebendo material novo.' },
    ],
    ctaLabel: 'Quero começar agora',
  },

  /* ==========================================================================
   * 11. O QUE ESTÁ INCLUSO (produto principal + bônus)
   *     value: valor de referência de cada item — usado na soma da oferta.
   * ========================================================================*/
  included: {
    eyebrow: 'O que está incluso',
    title: 'Tudo o que você recebe *ao garantir seu acesso*',
    subtitle: 'O acervo, as ferramentas de edição e o caminho explicado do começo ao fim.',
    main: {
      badge: 'Produto principal',
      title: 'Acesso à biblioteca ClipesDoChef',
      text: 'Acervo de cortes em boa qualidade, separado por nicho e sempre em crescimento. Você baixa o que quiser e usa nas suas páginas.',
      value: '',                  // vazio = a linha de valor some
      image: { src: '', alt: 'Área de membros do ClipesDoChef', placeholder: '[PRINT DA ÁREA DE MEMBROS]' },
      highlights: [
        'Diversos nichos organizados por tema',
        'Mais de 7.000 cortes disponíveis',
        'Novos cortes adicionados com frequência',
        'Download sem limite de quantidade',
      ],
    },
    bonuses: [
      { badge: 'Bônus 01', title: 'Pacote de templates no Canva', text: 'Modelos editáveis de capa, legenda e formato vertical para montar o vídeo sem começar do zero.', value: '', image: { src: './templates-clipesdochef.jpg', alt: 'Pacote de templates virais do ClipesDoChef, editáveis no Canva', placeholder: '[PRINT DOS TEMPLATES]' } },
      { badge: 'Bônus 02', title: 'Aulas de primeiros passos', text: 'Vídeos curtos mostrando como escolher o nicho, montar a página, editar e publicar em cada rede social.', value: '', image: { src: '', alt: 'Aulas de primeiros passos', placeholder: '[PRINT DAS AULAS]' } },
      { badge: 'Bônus 03', title: 'Coleções de assuntos em alta', text: 'Seleções temáticas com o que está repercutindo no momento, para você publicar enquanto o assunto ainda rende.', value: '', image: { src: '', alt: 'Coleções de assuntos em alta', placeholder: '[PRINT DAS COLEÇÕES]' } },
    ],
    totalLabel: 'Valor total do pacote',
    totalValue: '',                          // vazio = a faixa de total some
  },

  /* ==========================================================================
   * 12. OFERTA
   * ========================================================================*/
  offer: {
    eyebrow: 'Oferta',
    title: 'Garanta seu acesso ao *ClipesDoChef*',
    subtitle: 'Enquanto você decide, quem já está dentro publicou mais uma semana de conteúdo.',
    planName: 'Acesso completo',
    oldPriceLabel: 'De',
    // Deixe VAZIO se não houver um preço anterior realmente praticado.
    // Preço "de" que nunca foi cobrado é publicidade enganosa (art. 37 do CDC).
    oldPrice: '',                             // ex.: 'R$ 97,00'
    priceLabel: 'Por apenas',
    price: 'R$ 37,90',
    paymentInfo: 'Pagamento único — Pix, cartão ou boleto',
    checkoutUrl: 'https://pay.hotmart.com/N107383436T',   // checkout da Hotmart
    ctaLabel: 'QUERO TER ACESSO AGORA',
    ctaSubtext: 'Acesso liberado logo após a confirmação do pagamento',
    includes: [
      'Biblioteca completa de cortes, separada por nicho',
      'Novos cortes adicionados com frequência',
      'Pacote de templates editáveis no Canva',
      'Aulas de primeiros passos, do zero',
      'Coleções de assuntos em alta',
      'Suporte pelo canal oficial de atendimento',
    ],
    paymentMethods: ['Pix', 'Cartão de crédito', 'Boleto'],
    scarcity: {
      enabled: false,   // ligue apenas se houver uma condição real (vagas, prazo, lote)
      text: '[CONDIÇÃO / DISPONIBILIDADE — descreva apenas se for verdadeira]',
    },
  },

  /* ==========================================================================
   * 13. GARANTIA
   *     O prazo de 7 dias é o direito de arrependimento do art. 49 do CDC,
   *     obrigatório em compras online no Brasil. Se você oferecer mais que
   *     isso (14, 30 dias), altere os três campos abaixo.
   * ========================================================================*/
  guarantee: {
    eyebrow: 'Risco zero',
    days: '7 dias',
    title: 'Garantia de *7 dias*',
    description:
      'Você tem 7 dias, contados a partir da compra, para entrar, olhar tudo por dentro e decidir com calma. Se concluir que não é para você, é só pedir o reembolso pelo nosso canal de atendimento que devolvemos o valor integral, sem precisar justificar. Esse é o direito de arrependimento previsto no artigo 49 do Código de Defesa do Consumidor.',
    seal: 'Garantia 7 dias',
  },

  /* ==========================================================================
   * 14. FAQ
   * ========================================================================*/
  faq: {
    eyebrow: 'Dúvidas frequentes',
    title: 'Ainda com alguma *dúvida*?',
    subtitle: 'Se a sua pergunta não estiver aqui, fale com a gente pelo e-mail no rodapé.',
    items: [
      { q: 'Como vou receber o acesso?', a: 'Assim que o pagamento é confirmado, você recebe um e-mail com os dados de acesso à área de membros. É tudo online: você entra pelo navegador, no celular ou no computador.' },
      { q: 'Em quanto tempo o acesso é liberado?', a: 'No Pix e no cartão de crédito a liberação é praticamente imediata. No boleto, depende da compensação bancária, que costuma levar até dois dias úteis. Se o e-mail não chegar, confira a caixa de spam e chame o suporte.' },
      { q: 'Para quem é o ClipesDoChef?', a: 'Para quem quer crescer páginas de cortes nas redes sem produzir vídeo próprio: tanto quem está montando a primeira página quanto quem já publica e não quer mais perder tempo procurando material.' },
      { q: 'Preciso ter experiência para começar?', a: 'Não. As aulas começam do zero e os templates já vêm prontos. Se você usa o celular no dia a dia e sabe o básico do Canva, consegue montar seu primeiro vídeo no mesmo dia.' },
      { q: 'Preciso gravar ou aparecer nos vídeos?', a: 'Não. Todo o material de vídeo vem da biblioteca. Seu trabalho é escolher o corte, editar e publicar.' },
      { q: 'Posso usar em mais de uma página?', a: 'Sim. O acesso é pessoal e intransferível, mas o material pode ser usado nas suas próprias páginas, em quantas redes você quiser.' },
      { q: 'Por quanto tempo tenho acesso?', a: '[Informe aqui se o acesso é vitalício ou por período/assinatura, e se as atualizações estão incluídas.]' },
      { q: 'Existe suporte?', a: 'Sim. O atendimento é feito pelo nosso canal oficial de contato, com resposta em horário comercial.' },
      { q: 'Como funciona a garantia?', a: 'Você tem 7 dias a partir da compra para pedir o reembolso integral, sem precisar justificar, pelo nosso canal de atendimento. É o direito de arrependimento do artigo 49 do Código de Defesa do Consumidor.' },
      { q: 'O pagamento é seguro?', a: 'Sim. A compra é processada pela Hotmart, responsável pelo pagamento e pela liberação do acesso. Aceitamos Pix, cartão de crédito e boleto.' },
    ],
  },

  /* ==========================================================================
   * 15. CTA FINAL
   * ========================================================================*/
  finalCta: {
    title: 'Amanhã você pode estar caçando vídeo de novo — ou *com a semana inteira já postada*',
    subtitle: 'A biblioteca, os templates e o passo a passo ficam disponíveis assim que o pagamento é confirmado.',
    bullets: [
      'Biblioteca separada por nicho e sempre crescendo',
      'Templates no Canva e aulas para quem está começando do zero',
      'Acesso imediato e garantia de 7 dias',
    ],
    ctaLabel: 'QUERO TER ACESSO AGORA',
    footnote: 'Compra 100% segura • Acesso imediato após a confirmação',
  },

  /* ==========================================================================
   * 16. RODAPÉ
   * ========================================================================*/
  footer: {
    about: 'O ClipesDoChef é uma biblioteca de cortes e materiais de edição para quem constrói páginas de conteúdo nas redes sociais.',
    email: 'contato@clipesdochef.com',
    phone: '',                 // vazio = a linha some do rodapé
    address: '',               // vazio = a linha some do rodapé
    cnpj: '',                  // vazio = a linha some do rodapé
    links: [
      { label: 'Política de Privacidade', href: 'politica-de-privacidade.html' },
      { label: 'Termos de Uso', href: 'termos-de-uso.html' },
      { label: 'Política de Reembolso', href: 'politica-de-reembolso.html' },
      { label: 'Contato', href: 'mailto:contato@clipesdochef.com' },
    ],
    // Para adicionar outra rede, copie uma linha e troque label/href/icon
    // (ícones disponíveis para redes: instagram, youtube, chat).
    social: [
      { label: 'Instagram', href: 'https://www.instagram.com/clipesdochef', icon: 'instagram' },
    ],
    disclaimer:
      'Este site não é afiliado ao Facebook, Instagram, TikTok, YouTube, Kwai ou a qualquer uma dessas empresas. O ClipesDoChef comercializa acesso a uma biblioteca de conteúdo e a materiais de apoio; os resultados dependem da dedicação e da aplicação de cada pessoa, e não há promessa de ganho ou resultado garantido.',
    copyright: 'Todos os direitos reservados.',
  },

  /* ==========================================================================
   * 17. COMPORTAMENTO DA PÁGINA
   * ========================================================================*/
  behavior: {
    stickyMobileCta: true,   // barra fixa de compra no celular
    animations: true,        // animações de entrada (respeita prefers-reduced-motion)
    scrollProgress: true,    // barra fina de progresso de leitura no topo
    particles: true,         // chuva de notas atrás do Hero — false desliga o efeito
    revealDirection: 'down', // de onde os blocos entram: 'up' ou 'down'.
                             // 'up' (subindo) é o padrão mais confortável em páginas longas
    smoothScroll: true,
  },
};

export default siteConfig;
