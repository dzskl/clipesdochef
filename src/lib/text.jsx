import React from 'react';

/**
 * Utilitários de texto usados por todas as seções.
 */

/** true quando o texto ainda é um placeholder do tipo [ALGUMA COISA] */
export const isPlaceholder = (value) =>
  typeof value === 'string' && /\[[^\]]+\]/.test(value);

/**
 * <Highlight> — em qualquer título do site.config.js, o trecho entre
 * *asteriscos* recebe o degradê da cor primária.
 * Ex.: 'Comece a *vender hoje*'
 */
export function Highlight({ text = '' }) {
  const parts = String(text).split('*');
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="gradient-text">
            {part}
          </span>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

/**
 * <Val> — imprime um valor do config. Se ainda for placeholder,
 * mostra com destaque tracejado para você não esquecer de preencher.
 */
export function Val({ children, className = '' }) {
  const text = children == null ? '' : String(children);
  if (!isPlaceholder(text)) return <>{text}</>;
  return <span className={`ph ${className}`}>{text}</span>;
}

/** Junta classes ignorando valores falsos */
export const cx = (...classes) => classes.filter(Boolean).join(' ');
