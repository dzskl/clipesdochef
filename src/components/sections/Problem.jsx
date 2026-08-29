import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Problem() {
  const { problem } = siteConfig;

  return (
    <Section id="problema" className="bg-surface-alt/40">
      <SectionHeading eyebrow={problem.eyebrow} title={problem.title} subtitle={problem.intro} />

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {problem.pains.map((pain, index) => (
          <Reveal as="li" key={pain.title} delay={index * 90}>
            <article className="card card-hover h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.04] text-primary-light">
                <Icon name={pain.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-content">{pain.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{pain.text}</p>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal delay={120} className="mt-6 lg:mt-8">
        <div className="relative overflow-hidden rounded-card border border-line bg-surface p-6 shadow-card sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary/15 blur-3xl"
          />
          <div className="relative grid gap-6 lg:grid-cols-[0.9fr,1.1fr] lg:gap-10">
            <div>
              <h3 className="title-lg text-[clamp(1.35rem,3vw,1.9rem)] text-content">
                {problem.bridgeTitle}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">{problem.bridgeText}</p>
            </div>
            <ul className="flex flex-col gap-3 self-center">
              {problem.bridgeList.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-4"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary-light">
                    <Icon name="close" className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-[15px] leading-relaxed text-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
