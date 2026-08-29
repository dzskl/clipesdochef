import React from 'react';
import Button from './Button.jsx';
import { siteConfig } from '../../config/site.config.js';
import { checkoutHref } from '../../lib/links.js';

/**
 * Botão de compra. Enquanto `offer.checkoutUrl` for um placeholder,
 * ele rola até a seção de oferta em vez de virar um link quebrado.
 * Cole a URL real em site.config.js -> offer.checkoutUrl.
 */
export default function BuyButton({ children, size = 'lg', className = '', ...rest }) {
  const href = checkoutHref(siteConfig.offer.checkoutUrl);

  return (
    <Button
      href={href || '#oferta'}
      size={size}
      icon="arrowRight"
      className={className}
      {...(href ? { rel: 'noopener' } : {})}
      {...rest}
    >
      {children || siteConfig.offer.ctaLabel}
    </Button>
  );
}
