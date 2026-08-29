import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Section, SectionHeading } from '../ui/Section.jsx';
import { isPlaceholder, Val } from '../../lib/text.jsx';
import BuyButton from '../ui/BuyButton.jsx';
import Icon from '../ui/Icon.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Offer() {
  const { offer, guarantee } = siteConfig;
  const priceIsPlaceholder = isPlaceholder(offer.price);

  return (
    <Section id="oferta" className="relative overflow-hidden">
      <div aria-hidden="true" className="ambient pointer-events-none absolute inset-0" />

      <div className="relative">
        <SectionHeading eyebrow={offer.eyebrow} title={offer.title} subtitle={offer.subtitle} />

        <Reveal delay={100} className="mx-auto mt-12 max-w-3xl">
          <div className="relative rounded-[calc(var(--radius-card)+6px)] bg-gradient-to-br from-primary/60 via-primary/20 to-secondary/50 p-px shadow-glow">
            <article className="rounded-[calc(var(--radius-card)+5px)] bg-surface p-6 sm:p-9">
              <header className="flex flex-col items-center gap-3 text-center">
                <span className="eyebrow border-primary/40 text-primary-light">{offer.planName}</span>

                {offer.oldPrice && (
                  <p className="mt-2 flex items-center gap-2 text-sm text-muted">
                    {offer.oldPriceLabel}{' '}
                    <span className="line-through decoration-muted/70">
                      <Val>{offer.oldPrice}</Val>
                    </span>
                  </p>
                )}

                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                  {offer.priceLabel}
                </p>

                <p
                  className={`font-heading font-extrabold leading-none text-content ${
                    priceIsPlaceholder
                      ? 'text-[clamp(1.25rem,4.4vw,1.9rem)]'
                      : 'text-[clamp(2.5rem,9vw,4rem)]'
                  }`}
                >
                  <Val>{offer.price}</Val>
                </p>

                <p className="text-[15px] text-muted">
                  <Val>{offer.paymentInfo}</Val>
                </p>
              </header>

              <div className="hairline my-7" />

              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">
                Você recebe agora
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {offer.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-content/90">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary-light">
                      <Icon name="check" className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <BuyButton full size="lg">
                  {offer.ctaLabel}
                </BuyButton>
                <p className="mt-3.5 text-center text-[13px] text-muted">{offer.ctaSubtext}</p>
              </div>

              <div className="mt-7 flex flex-col items-center gap-4 border-t border-line pt-6 sm:flex-row sm:justify-between">
                <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {offer.paymentMethods.map((method) => (
                    <li
                      key={method}
                      className="flex items-center gap-1.5 rounded-lg border border-line bg-white/[0.03] px-2.5 py-1.5 text-xs text-muted"
                    >
                      <Icon name="creditCard" className="h-3.5 w-3.5" />
                      {method}
                    </li>
                  ))}
                </ul>
                <p className="flex items-center gap-2 text-xs text-muted">
                  <Icon name="lock" className="h-4 w-4 text-primary-light" />
                  Ambiente de pagamento seguro
                </p>
              </div>

              {offer.scarcity?.enabled && (
                <p className="mt-5 flex items-start justify-center gap-2 rounded-2xl border border-dashed border-line bg-white/[0.02] p-3.5 text-center text-[13px] leading-relaxed text-muted">
                  <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                  {offer.scarcity.text}
                </p>
              )}
            </article>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[13px] text-muted">
            <Icon name="shield" className="h-4 w-4 text-primary-light" />
            Compra protegida por garantia de <Val>{guarantee.days}</Val>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
