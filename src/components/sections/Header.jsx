import React, { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site.config.js';
import { useScrolledPast } from '../../hooks/useReveal.js';
import { cx } from '../../lib/text.jsx';
import Button from '../ui/Button.jsx';
import Icon from '../ui/Icon.jsx';
import Logo from '../ui/Logo.jsx';

export default function Header() {
  const { nav, announcement } = siteConfig;
  const [open, setOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(announcement.enabled);
  const scrolled = useScrolledPast(16);

  // Fecha o menu com Esc e trava o scroll do fundo enquanto ele está aberto
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60]
                   focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm
                   focus:font-semibold focus:text-on-primary"
      >
        Pular para o conteúdo
      </a>

      {showBanner && (
        <div className="relative z-50 bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 text-content">
          <div className="container flex min-h-[48px] items-center gap-2 py-1.5">
            <p className="flex flex-1 flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[12.5px] leading-snug sm:text-sm">
              <span className="inline-flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="inline-block h-1.5 w-1.5 animate-pulse-soft rounded-full bg-primary"
                />
                {announcement.text}
              </span>
              {announcement.linkLabel && (
                <a
                  href={announcement.linkHref}
                  className="inline-flex min-h-[36px] items-center rounded-full px-3 font-semibold
                             text-primary-light underline underline-offset-4 transition hover:bg-white/5 hover:text-primary-dark"
                >
                  {announcement.linkLabel}
                </a>
              )}
            </p>
            <button
              type="button"
              onClick={() => setShowBanner(false)}
              aria-label="Fechar aviso"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-white/5 hover:text-content"
            >
              <Icon name="close" className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <header
        className={cx(
          'sticky top-0 z-40 w-full transition-all duration-300',
          scrolled
            ? 'border-b border-line/80 bg-background/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <a href="#topo" className="flex min-h-[44px] shrink-0 items-center" aria-label="Ir para o topo da página">
            <Logo />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex min-h-[40px] items-center rounded-full px-3.5 text-sm font-medium text-muted transition
                               hover:bg-white/[0.05] hover:text-content"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button href="#oferta" size="sm" className="hidden sm:inline-flex" icon="arrowRight">
              {nav.ctaLabel}
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-line
                         bg-white/[0.03] text-content transition hover:border-primary/40 lg:hidden"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-[45] lg:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
        <nav className="absolute inset-x-0 top-0 mt-[60px] origin-top border-b border-line bg-surface p-5 shadow-card">
          <ul className="flex flex-col gap-1">
            {siteConfig.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[52px] items-center justify-between rounded-xl px-4 text-[15px]
                             font-medium text-content transition hover:bg-white/[0.05]"
                >
                  {link.label}
                  <Icon name="arrowRight" className="h-4 w-4 text-muted" />
                </a>
              </li>
            ))}
          </ul>
          <Button
            href="#oferta"
            full
            size="md"
            className="mt-4"
            onClick={() => setOpen(false)}
            icon="arrowRight"
          >
            {siteConfig.nav.ctaLabel}
          </Button>
        </nav>
      </div>
    </>
  );
}
