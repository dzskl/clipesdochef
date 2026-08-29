import React from 'react';
import { cx } from '../../lib/text.jsx';
import Icon from './Icon.jsx';

/**
 * Espaço de imagem. Enquanto `src` estiver vazio, mostra um placeholder
 * elegante com o rótulo definido no config. Para publicar a imagem real,
 * coloque o arquivo em /public e escreva o caminho em `src` (ex.: '/mockup.png').
 * O `alt` é obrigatório para acessibilidade e SEO.
 */
export default function Media({
  src,
  alt = '',
  placeholder = '[IMAGEM]',
  ratio = '4 / 3',
  className = '',
  imgClassName = '',
  loading = 'lazy',
  priority = false,
  children,
}) {
  return (
    <div
      className={cx(
        'relative overflow-hidden rounded-card border border-line bg-surface-alt',
        className,
      )}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          fetchpriority={priority ? 'high' : undefined}
          className={cx('h-full w-full object-cover', imgClassName)}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 p-5 text-center"
          role="img"
          aria-label={`Espaço reservado para imagem: ${placeholder}`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-3 rounded-[calc(var(--radius-card)-6px)] border border-dashed border-line"
          />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-primary-light">
            <Icon name="sparkles" className="h-5 w-5" />
          </span>
          <span className="relative max-w-[85%] text-xs font-semibold uppercase tracking-[0.12em] text-muted sm:text-[13px]">
            {placeholder}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
