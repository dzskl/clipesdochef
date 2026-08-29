import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import Icon from './Icon.jsx';

/**
 * Logotipo usado no topo e no rodapé.
 * Controlado por site.config.js -> brand.logo
 *   type: 'image' → usa o arquivo em `src` (coloque-o em /public)
 *   type: 'text'  → usa a marca em texto com o ícone
 */
export default function Logo({ height, className = '' }) {
  const { logo, productName } = siteConfig.brand;
  const h = height || logo.height || 32;

  if (logo.type === 'image' && logo.src) {
    return (
      <img
        src={logo.src}
        alt={logo.alt || productName}
        style={{ height: h }}
        width="auto"
        className={`w-auto max-w-[190px] object-contain sm:max-w-[230px] ${className}`}
      />
    );
  }

  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary shadow-cta"
      >
        <Icon name="bolt" className="h-[18px] w-[18px]" strokeWidth={2} />
      </span>
      <span className="font-heading text-[15px] font-bold tracking-tight text-content sm:text-base">
        {logo.text}
      </span>
    </span>
  );
}
