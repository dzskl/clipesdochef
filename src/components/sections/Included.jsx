import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import { Val } from '../../lib/text.jsx';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Included() {
  const { included } = siteConfig;

  return (
    <Section id="incluso" className="bg-surface-alt/40">
      <SectionHeading
        eyebrow={included.eyebrow}
        title={included.title}
        subtitle={included.subtitle}
      />

      {/* Produto principal */}
      <Reveal className="mt-12">
        <article className="relative overflow-hidden rounded-card border border-primary/25 bg-surface p-5 shadow-glow sm:p-8">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/12 blur-3xl"
          />
          <div className="relative grid items-center gap-7 lg:grid-cols-[0.85fr,1.15fr] lg:gap-12">
            <Media
              src={included.main.image.src}
              alt={included.main.image.alt}
              placeholder={included.main.image.placeholder}
              ratio="4 / 3"
            />
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-on-primary">
                <Icon name="star" className="h-3.5 w-3.5" strokeWidth={2.2} />
                {included.main.badge}
              </span>
              <h3 className="mt-4 font-heading text-[clamp(1.35rem,3vw,1.9rem)] font-bold leading-tight text-content">
                {included.main.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{included.main.text}</p>

              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {included.main.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] text-muted">
                    <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-primary-light" strokeWidth={2.6} />
                    {item}
                  </li>
                ))}
              </ul>

              {included.main.value && (
                <p className="mt-6 flex items-center gap-2 text-sm text-muted">
                  Valor de referência:
                  <Val>{included.main.value}</Val>
                </p>
              )}
            </div>
          </div>
        </article>
      </Reveal>

      {/* Bônus */}
      <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {included.bonuses.map((bonus, index) => (
          <Reveal as="li" key={bonus.title} delay={index * 90}>
            <article className="card card-hover flex h-full flex-col">
              <Media
                src={bonus.image.src}
                alt={bonus.image.alt}
                placeholder={bonus.image.placeholder}
                ratio="1 / 1"
                className="mb-5"
              />
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-secondary/40 bg-secondary/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-content">
                <Icon name="gift" className="h-3.5 w-3.5" />
                {bonus.badge}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug text-content">{bonus.title}</h3>
              <p className="mt-2.5 flex-1 text-[15px] leading-relaxed text-muted">{bonus.text}</p>
              {bonus.value && (
                <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
                  Valor: <Val>{bonus.value}</Val>
                </p>
              )}
            </article>
          </Reveal>
        ))}
      </ul>

      {included.totalValue && (
        <Reveal delay={120} className="mt-8">
          <div className="flex flex-col items-center justify-between gap-3 rounded-card border border-line bg-surface px-6 py-5 text-center sm:flex-row sm:text-left">
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">
              {included.totalLabel}
            </span>
            <span className="font-heading text-xl font-bold text-content sm:text-2xl">
              <Val>{included.totalValue}</Val>
            </span>
          </div>
        </Reveal>
      )}
    </Section>
  );
}
