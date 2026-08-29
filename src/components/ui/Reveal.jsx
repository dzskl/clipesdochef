import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';
import { siteConfig } from '../../config/site.config.js';
import { cx } from '../../lib/text.jsx';

/**
 * Envolve qualquer bloco para animar a entrada quando ele aparece na tela.
 * Desligue tudo em site.config.js -> behavior.animations = false.
 *
 * `direction` escolhe de onde o bloco entra. Só há variantes verticais e de
 * escala de propósito: deslocamento horizontal em bloco largo pode gerar
 * scroll lateral em telas pequenas.
 */
const entradas = {
  up: 'translate-y-8 scale-[0.98]',
  down: '-translate-y-8 scale-[0.98]',
  zoom: 'scale-[0.94]',
  none: '',
};

export default function Reveal({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  as: Tag = 'div',
}) {
  const enabled = siteConfig.behavior.animations;
  const { ref, visible } = useReveal();

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      ref={ref}
      className={cx(
        'transition-[opacity,transform] duration-[750ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        'will-change-[opacity,transform] motion-reduce:transition-none',
        visible
          ? 'translate-y-0 scale-100 opacity-100'
          : cx(entradas[direction] ?? entradas.up, 'opacity-0'),
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
