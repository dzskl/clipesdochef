import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

/**
 * Comparativo "sem × com".
 * No desktop vira uma tabela de 3 colunas; no celular, um card por linha.
 * Conteúdo em site.config.js -> comparison
 */
export default function Comparison() {
  const { comparison } = siteConfig;

  return (
    <Section id="comparativo">
      <SectionHeading
        eyebrow={comparison.eyebrow}
        title={comparison.title}
        subtitle={comparison.subtitle}
      />

      <Reveal delay={80} className="mx-auto mt-12 max-w-5xl">
        <div className="overflow-hidden rounded-card border border-line bg-surface shadow-card">
          {/* Cabeçalho — só no desktop */}
          <div className="hidden lg:grid lg:grid-cols-[1fr,1.15fr,1.15fr]">
            <div aria-hidden="true" />
            <div className="border-b border-line px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              {comparison.columns.without}
            </div>
            <div className="border-b border-l border-line bg-primary/[0.07] px-6 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-primary-light">
              {comparison.columns.with}
            </div>
          </div>

          <ul>
            {comparison.rows.map((row, index) => (
              <li
                key={row.label}
                className={`grid gap-0 lg:grid-cols-[1fr,1.15fr,1.15fr] ${
                  index > 0 ? 'border-t border-line' : ''
                }`}
              >
                <p className="px-5 pb-1 pt-5 font-heading text-[15px] font-semibold text-content sm:px-6 lg:flex lg:items-center lg:py-5">
                  {row.label}
                </p>

                <p className="flex items-start gap-2.5 px-5 py-3 text-[15px] leading-relaxed text-muted sm:px-6 lg:py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line text-muted"
                  >
                    <Icon name="close" className="h-3 w-3" strokeWidth={2.6} />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-muted/70 lg:hidden">
                      {comparison.columns.without}
                    </span>
                    {row.without}
                  </span>
                </p>

                <p className="flex items-start gap-2.5 bg-primary/[0.07] px-5 py-3 text-[15px] leading-relaxed text-content/90 sm:px-6 lg:border-l lg:border-line lg:py-5">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/25 text-primary-light"
                  >
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>
                    <span className="mb-0.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-light lg:hidden">
                      {comparison.columns.with}
                    </span>
                    {row.with}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
