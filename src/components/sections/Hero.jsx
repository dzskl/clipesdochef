import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Highlight } from '../../lib/text.jsx';
import Button from '../ui/Button.jsx';
import BuyButton from '../ui/BuyButton.jsx';
import Icon from '../ui/Icon.jsx';
import Media from '../ui/Media.jsx';
import MoneyRain from '../ui/MoneyRain.jsx';
import MoneyVideo from '../ui/MoneyVideo.jsx';
import Reveal from '../ui/Reveal.jsx';

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="topo" className="relative overflow-hidden">
      {/* Fundo ambiente: só gradientes e uma malha sutil — zero imagens */}
      <div aria-hidden="true" className="ambient pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--color-border)/0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--color-border)/0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(70% 55% at 50% 0%, #000 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(70% 55% at 50% 0%, #000 25%, transparent 75%)',
        }}
      />
      {/* Fundo animado atrás de tudo, sem afetar o layout: o vídeo quando há um
          configurado, senão as cédulas desenhadas em canvas */}
      {hero.video?.src ? <MoneyVideo /> : <MoneyRain />}

      <div className="container relative z-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:gap-14">
          {/* Coluna de texto */}
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow">
                <Icon name="sparkles" className="h-3.5 w-3.5 text-primary-light" />
                {hero.eyebrow}
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="title-xl mt-5 text-content lg:mt-4">
                <Highlight text={hero.headline} />
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="lead mt-5 max-w-xl lg:mt-4">{hero.subheadline}</p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:mt-7">
                <BuyButton className="w-full sm:w-auto">{hero.ctaPrimary}</BuyButton>
                {hero.ctaSecondary && (
                  <Button
                    href={hero.ctaSecondaryHref}
                    variant="secondary"
                    size="lg"
                    icon="arrowDown"
                    className="w-full sm:w-auto"
                  >
                    {hero.ctaSecondary}
                  </Button>
                )}
              </div>
            </Reveal>

            {hero.trustBadges?.length > 0 && (
              <Reveal delay={280}>
                <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 lg:mt-6">
                  {hero.trustBadges.map((badge) => (
                    <li key={badge.label} className="flex items-center gap-2 text-[13px] text-muted sm:text-sm">
                      <Icon name={badge.icon} className="h-[18px] w-[18px] shrink-0 text-primary-light" />
                      {badge.label}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          {/* Coluna do mockup */}
          <Reveal delay={200}>
           <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[40px] bg-primary/10 blur-3xl sm:-inset-10"
            />
            <div className="relative rounded-[28px] border border-line bg-surface/80 p-3 shadow-card backdrop-blur-sm sm:p-4">
              {/* barra decorativa estilo janela */}
              <div aria-hidden="true" className="mb-3 flex items-center gap-1.5 px-1">
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
                <span className="h-2.5 w-2.5 rounded-full bg-line" />
              </div>
              <Media
                src={hero.image.src}
                alt={hero.image.alt}
                placeholder={hero.image.placeholder}
                ratio={hero.image.ratio || '4 / 3'}
                loading="eager"
                priority
                className="border-line/70"
              />
            </div>

            {/* Card flutuante — reforço visual de profissionalismo */}
            <div className="absolute -bottom-5 left-4 hidden items-center gap-3 rounded-2xl border border-line bg-surface/95 px-4 py-3 shadow-card backdrop-blur sm:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary-light">
                <Icon name="bolt" className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] leading-tight text-muted">
                <strong className="block font-semibold text-content">Acesso imediato</strong>
                após a confirmação do pagamento
              </span>
            </div>

           </div>

            {hero.image.caption && (
              <p className="mt-6 text-center text-xs text-muted sm:mt-12">{hero.image.caption}</p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
