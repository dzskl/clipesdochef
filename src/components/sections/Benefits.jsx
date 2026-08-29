import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Benefits() {
  const { benefits } = siteConfig;

  return (
    <Section id="beneficios" className="bg-surface-alt/40">
      <SectionHeading
        eyebrow={benefits.eyebrow}
        title={benefits.title}
        subtitle={benefits.subtitle}
      />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {benefits.items.map((item, index) => (
          <Reveal as="li" key={item.title} delay={(index % 3) * 90}>
            <article className="card card-hover group h-full">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/20 text-primary-light transition-transform duration-300 group-hover:scale-105">
                  <Icon name={item.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className="text-[17px] font-semibold leading-snug text-content">{item.title}</h3>
              </div>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
