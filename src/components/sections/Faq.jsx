import React, { useState } from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

function Item({ item, index, open, onToggle }) {
  const buttonId = `faq-botao-${index}`;
  const panelId = `faq-painel-${index}`;

  return (
    <li className="overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-primary/35">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left
                     text-[15px] font-semibold text-content transition sm:px-6 sm:text-base"
        >
          {item.q}
          <span
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line
                        text-primary-light transition-transform duration-300 ${open ? 'rotate-45 bg-primary/15' : ''}`}
          >
            <Icon name="plus" className="h-4 w-4" strokeWidth={2.2} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className="px-5 pb-5 sm:px-6"
      >
        <p className="border-t border-line pt-4 text-[15px] leading-relaxed text-muted">{item.a}</p>
      </div>
    </li>
  );
}

export default function Faq() {
  const { faq } = siteConfig;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faq">
      <SectionHeading eyebrow={faq.eyebrow} title={faq.title} subtitle={faq.subtitle} />

      <Reveal delay={80} className="mx-auto mt-10 max-w-3xl">
        <ul className="flex flex-col gap-3">
          {faq.items.map((item, index) => (
            <Item
              key={item.q}
              item={item}
              index={index}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
