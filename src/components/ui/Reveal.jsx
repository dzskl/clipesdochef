import React from 'react';
import { useReveal } from '../../hooks/useReveal.js';
import { siteConfig } from '../../config/site.config.js';
import { cx } from '../../lib/text.jsx';

/**
 * Envolve qualquer bloco para animar a entrada (discreta).
 * Desligue tudo em site.config.js -> behavior.animations = false.
 */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }) {
  const enabled = siteConfig.behavior.animations;
  const { ref, visible } = useReveal();

  if (!enabled) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      ref={ref}
      className={cx(
        'transition-[opacity,transform] duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0',
        className,
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
}
