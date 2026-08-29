import React from 'react';
import { cx, Highlight } from '../../lib/text.jsx';
import Reveal from './Reveal.jsx';

/** Casca padrão de todas as seções (espaçamento e container consistentes). */
export function Section({ id, className = '', tight = false, children, ...rest }) {
  return (
    <section id={id} className={cx(tight ? 'section-tight' : 'section', className)} {...rest}>
      <div className="container">{children}</div>
    </section>
  );
}

/** Cabeçalho padrão: eyebrow + título + subtítulo. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className = '',
  as: Tag = 'h2',
}) {
  return (
    <Reveal
      className={cx(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        align === 'center' && 'mx-auto max-w-3xl',
        className,
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {title && (
        <Tag className="title-lg">
          <Highlight text={title} />
        </Tag>
      )}
      {subtitle && <p className="lead max-w-2xl">{subtitle}</p>}
    </Reveal>
  );
}

export default Section;
