import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import Reveal from '../ui/Reveal.jsx';

function List({ title, items, tone = 'positive' }) {
  const positive = tone === 'positive';
  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-5 sm:p-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-muted">
        <Icon
          name={positive ? 'check' : 'close'}
          className={positive ? 'h-4 w-4 text-primary-light' : 'h-4 w-4 text-muted'}
          strokeWidth={2.4}
        />
        {title}
      </h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-muted">
            <span
              aria-hidden="true"
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${positive ? 'bg-primary' : 'bg-line'}`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Product() {
  const { product } = siteConfig;

  return (
    <Section id="produto">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-[36px] bg-secondary/10 blur-2xl"
            />
            <Media
              src={product.image.src}
              alt={product.image.alt}
              placeholder={product.image.placeholder}
              ratio={product.image.ratio || '1 / 1'}
              className="relative"
            />
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={product.eyebrow}
            title={product.title}
            subtitle={product.description}
            align="left"
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Reveal delay={80}>
              <List title={product.forWho.title} items={product.forWho.items} />
            </Reveal>
            <Reveal delay={140}>
              <List title={product.notForWho.title} items={product.notForWho.items} tone="negative" />
            </Reveal>
          </div>
        </div>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-3 lg:mt-16 lg:gap-6">
        {product.differentials.map((item, index) => (
          <Reveal as="li" key={item.title} delay={index * 90}>
            <article className="card card-hover h-full">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/12 text-primary-light">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-content">{item.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
