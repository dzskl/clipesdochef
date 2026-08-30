import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { siteConfig } from './src/config/site.config.js';
import { themeInlineStyle } from './src/lib/theme.js';

/**
 * Injeta no index.html tudo o que vem do site.config.js:
 * SEO, favicon, Open Graph e as CSS variables do tema.
 * Assim existe UMA única fonte de verdade para a página inteira.
 */
function injectSiteConfig() {
  const { seo, brand, theme } = siteConfig;
  const clean = (value) => String(value ?? '').replace(/"/g, '&quot;');
  const url = `https://${String(brand.domain).replace(/^https?:\/\//, '')}`;

  // O config usa caminhos relativos ('./arquivo'), que é o que faz a pasta dist/
  // funcionar aberta por file://. Mas og:image exige URL absoluta, e concatenar
  // direto grudaria o ponto do './' no domínio ('...com.br./og-image.jpg'),
  // quebrando a miniatura ao compartilhar o link.
  const absoluta = (caminho) => {
    const p = String(caminho ?? '');
    if (/^https?:\/\//.test(p)) return p;
    return `${url}/${p.replace(/^\.?\/+/, '')}`;
  };

  const tokens = {
    '{{LANG}}': seo.lang || 'pt-BR',
    '{{LOCALE}}': seo.locale || 'pt_BR',
    '{{TITLE}}': clean(seo.title),
    '{{DESCRIPTION}}': clean(seo.description),
    '{{OG_IMAGE}}': absoluta(seo.ogImage),
    '{{FAVICON}}': seo.favicon,
    '{{SITE_URL}}': url,
    '{{PRODUCT_NAME}}': clean(brand.productName),
    '{{THEME_COLOR}}': theme.background,
    '{{THEME_STYLE}}': themeInlineStyle(theme),
  };

  return {
    name: 'inject-site-config',
    transformIndexHtml(html) {
      return Object.entries(tokens).reduce(
        (acc, [token, value]) => acc.split(token).join(value),
        html,
      );
    },
    // No build, transforma o script em clássico para que a pasta dist/
    // também funcione abrindo o index.html direto no navegador (file://),
    // onde módulos ES são bloqueados por CORS.
    // Recarrega a página ao salvar o site.config.js durante o `npm run dev`
    handleHotUpdate({ file, server }) {
      if (file.endsWith('site.config.js')) {
        server.ws.send({ type: 'full-reload' });
      }
    },
  };
}

/** Deixa o dist/ abrível por duplo clique (file://) */
function scriptClassico() {
  return {
    name: 'script-classico',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml(html) {
      return html
        .replace(/<script type="module" crossorigin/g, '<script defer')
        .replace(/<link rel="modulepreload"[^>]*>/g, '')
        .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"');
    },
  };
}

export default defineConfig({
  // Caminhos relativos: a pasta dist/ funciona tanto em hospedagem
  // quanto abrindo o index.html direto no navegador (duplo clique).
  base: './',
  plugins: [react(), injectSiteConfig(), scriptClassico()],
  build: {
    target: 'es2019',
    cssCodeSplit: false,
    reportCompressedSize: false,
    rollupOptions: {
      output: { format: 'iife', inlineDynamicImports: true },
    },
  },
});
