import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';
import { siteConfig } from '../../config/site.config.js';
import { cx } from '../../lib/text.jsx';

/**
 * Envolve qualquer bloco para animar a entrada quando ele aparece na tela.
 * Desligue tudo em site.config.js -> behavior.animations = false.
 *
 * A direção vem de behavior.revealDirection ('up' ou 'down'), e a prop
 * `direction` permite exceção em um bloco específico. Só há variantes
 * verticais de propósito: deslocamento horizontal em bloco largo pode
 * gerar scroll lateral em telas pequenas.
 */
const entradas = {
  up: 'translate-y-5',    // o bloco sobe ao entrar
  down: '-translate-y-5', // o bloco desce ao entrar
};

export default function Reveal({
  children,
  delay = 0,
  direction,
  className = '',
  as: Tag = 'div',
}) {
  const enabled = siteConfig.behavior.animations;
  const { ref, visible } = useReveal();

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  const escolhida = direction || siteConfig.behavior.revealDirection;

  return (
    <Tag
      ref={ref}
      className={cx(
        'transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)]',
        'will-change-[opacity,transform] motion-reduce:transition-none',
        visible
          ? 'translate-y-0 opacity-100'
          : cx(entradas[escolhida] ?? entradas.up, 'opacity-0'),
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
