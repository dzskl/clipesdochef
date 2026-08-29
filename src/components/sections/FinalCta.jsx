import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section } from '../ui/Section.jsx';
import { Highlight } from '../../lib/text.jsx';
import BuyButton from '../ui/BuyButton.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function FinalCta() {
  const { finalCta } = siteConfig;

  return (
    <Section id="cta-final" className="relative overflow-hidden">
      <div aria-hidden="true" className="ambient pointer-events-none absolute inset-0" />

      <Reveal className="relative">
        <div className="relative overflow-hidden rounded-card border border-line bg-surface px-6 py-12 text-center shadow-card sm:px-10 sm:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-56 w-[min(90%,40rem)] rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="title-lg text-content">
              <Highlight text={finalCta.title} />
            </h2>
            <p className="lead mt-5">{finalCta.subtitle}</p>

            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
              {finalCta.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-4 text-[15px] leading-relaxed text-content/90"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-light">
                    <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <BuyButton className="w-full sm:w-auto">{finalCta.ctaLabel}</BuyButton>
              <p className="mt-4 flex items-center justify-center gap-2 text-[13px] text-muted">
                <Icon name="lock" className="h-4 w-4 text-primary-light" />
                {finalCta.footnote}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
