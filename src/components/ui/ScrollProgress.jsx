import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { useScrollProgress } from '../../hooks/useReveal.js';

/**
 * Barra fina no topo mostrando o quanto da página já foi lida.
 * Desligue em site.config.js -> behavior.scrollProgress = false.
 *
 * Anima por `scaleX` (composto pela GPU) em vez de `width`,
 * que forçaria recálculo de layout a cada quadro de rolagem.
 */
export default function ScrollProgress() {
  const progress = useScrollProgress();

  if (!siteConfig.behavior.scrollProgress) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-primary-light to-secondary"
        style={{
          transform: `scaleX(${progress})`,
          boxShadow: progress > 0.01 ? '0 0 14px rgb(var(--color-primary) / 0.55)' : 'none',
        }}
      />
    </div>
  );
}
