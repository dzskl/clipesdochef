import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import { isPlaceholder } from '../../lib/text.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

/** Iniciais do nome para o avatar enquanto não há foto */
function initials(name = '') {
  const clean = name.replace(/[[\]]/g, '').trim();
  const parts = clean.split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]).join('').toUpperCase() || '—';
}

export default function Testimonials() {
  const { testimonials } = siteConfig;
  // O aviso some sozinho assim que os depoimentos reais forem inseridos.
  const stillPlaceholder = testimonials.items.some((item) => isPlaceholder(item.quote));

  return (
    <Section id="depoimentos">
      <SectionHeading
        eyebrow={testimonials.eyebrow}
        title={testimonials.title}
        subtitle={testimonials.subtitle}
      />

      {stillPlaceholder && (
        <Reveal className="mx-auto mt-8 max-w-3xl">
          <p className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/[0.06] p-4 text-sm leading-relaxed text-muted">
            <Icon name="shield" className="mt-0.5 h-5 w-5 shrink-0 text-primary-light" />
            {testimonials.pendingNotice}
          </p>
        </Reveal>
      )}

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {testimonials.items.map((item, index) => (
          <Reveal as="li" key={`${item.name}-${index}`} delay={(index % 2) * 90}>
            <figure className="card card-hover flex h-full flex-col">
              <Icon name="quote" className="h-7 w-7 text-primary-light/60" strokeWidth={0} fill="currentColor" />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-content/90">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt={`Foto de ${item.name}`}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/[0.04] text-sm font-bold text-muted"
                  >
                    {initials(item.name)}
                  </span>
                )}
                <span className="text-sm leading-tight">
                  <strong className="block font-semibold text-content">{item.name}</strong>
                  <span className="text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
