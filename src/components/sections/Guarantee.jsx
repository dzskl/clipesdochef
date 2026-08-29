import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section } from '../ui/Section.jsx';
import { Highlight, Val } from '../../lib/text.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Guarantee() {
  const { guarantee } = siteConfig;

  return (
    <Section id="garantia" tight className="bg-surface-alt/40">
      <Reveal>
        <article className="relative overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card sm:p-9 lg:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
          />
          <div className="relative grid items-center gap-8 lg:grid-cols-[auto,1fr] lg:gap-12">
            {/* Selo */}
            <div className="mx-auto flex h-36 w-36 flex-col items-center justify-center rounded-full border-2 border-dashed border-primary/45 bg-primary/[0.07] text-center sm:h-40 sm:w-40">
              <Icon name="shield" className="h-9 w-9 text-primary-light" strokeWidth={1.5} />
              <span className="mt-2 px-3 text-[11px] font-bold uppercase leading-tight tracking-[0.1em] text-primary-light">
                {guarantee.seal}
              </span>
            </div>

            <div className="text-center lg:text-left">
              <span className="eyebrow">{guarantee.eyebrow}</span>
              <h2 className="title-lg mt-4 text-content">
                <Highlight text={guarantee.title} />
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{guarantee.description}</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-4 py-2 text-sm text-muted">
                <Icon name="clock" className="h-4 w-4 text-primary-light" />
                Prazo definido: <Val>{guarantee.days}</Val>
              </p>
            </div>
          </div>
        </article>
      </Reveal>
    </Section>
  );
}
