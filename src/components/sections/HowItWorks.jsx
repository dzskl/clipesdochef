import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import BuyButton from '../ui/BuyButton.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function HowItWorks() {
  const { howItWorks } = siteConfig;
  const steps = howItWorks.steps;

  return (
    <Section id="como-funciona">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        subtitle={howItWorks.subtitle}
      />

      <ol
        className={`mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6 ${
          steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
        }`}
      >
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 100} className="relative">
            {/* linha conectora entre os passos (apenas no desktop) */}
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(50%+2.5rem)] top-9 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-line to-transparent lg:block"
              />
            )}
            <article className="card card-hover h-full text-center sm:text-left">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 font-heading text-xl font-bold text-primary-light sm:mx-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-content">{step.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{step.text}</p>
            </article>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={150} className="mt-10 flex justify-center">
        <BuyButton>{howItWorks.ctaLabel}</BuyButton>
      </Reveal>
    </Section>
  );
}
