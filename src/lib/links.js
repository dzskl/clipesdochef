import { isPlaceholder } from './text.jsx';

/**
 * Enquanto o CHECKOUT_URL for um placeholder, os botões de compra
 * NÃO viram links quebrados: eles rolam a página até a seção de oferta.
 * Basta colar a URL real em site.config.js -> offer.checkoutUrl.
 */
export function checkoutHref(url) {
  if (!url || isPlaceholder(url)) return null;
  return url;
}

export const isCheckoutReady = (url) => checkoutHref(url) !== null;
