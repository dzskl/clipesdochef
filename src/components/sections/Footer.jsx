import React from 'react';
import { siteConfig } from '../../config/site.config.js';
import { isPlaceholder, Val } from '../../lib/text.jsx';
import Icon from '../ui/Icon.jsx';
import Logo from '../ui/Logo.jsx';

/** Link que não quebra: enquanto o href for placeholder, vira texto simples. */
function SafeLink({ href, className = '', children, ...rest }) {
  if (!href || isPlaceholder(href)) {
    return (
      <span className={`${className} cursor-default opacity-70`} title="Link ainda não configurado">
        {children}
      </span>
    );
  }
  return (
    <a href={href} className={className} {...rest}>
      {children}
    </a>
  );
}

export default function Footer() {
  const { footer, brand, nav } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-alt/60">
      <div className="container py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr,1fr,1fr] lg:gap-12">
          {/* Marca */}
          <div>
            <Logo height={38} />
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-muted">{footer.about}</p>

            <ul className="mt-6 flex flex-wrap gap-2.5">
              {footer.social.map((item) => (
                <li key={item.label}>
                  <SafeLink
                    href={item.href}
                    aria-label={item.label}
                    rel="noopener"
                    target="_blank"
                    className="flex h-11 w-11 items-center justify-center rounded-xl border border-line
                               bg-white/[0.03] text-muted transition hover:border-primary/40 hover:text-primary-light"
                  >
                    <Icon name={item.icon} className="h-[18px] w-[18px]" />
                  </SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-content">
              Navegação
            </h2>
            <ul className="mt-4 flex flex-col gap-0.5">
              {nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[40px] items-center text-[15px] text-muted transition hover:text-primary-light"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato e legal */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-content">
              Contato
            </h2>
            {/* Deixe o campo vazio em site.config.js para a linha sumir daqui */}
            <ul className="mt-5 flex flex-col gap-3 text-[15px] text-muted">
              {footer.email && (
                <li className="flex items-start gap-2.5">
                  <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                  <SafeLink
                    href={`mailto:${footer.email}`}
                    className="underline-offset-4 transition hover:text-primary-light hover:underline"
                  >
                    <Val>{footer.email}</Val>
                  </SafeLink>
                </li>
              )}
              {footer.phone && (
                <li className="flex items-start gap-2.5">
                  <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                  <Val>{footer.phone}</Val>
                </li>
              )}
              {footer.address && (
                <li className="flex items-start gap-2.5">
                  <Icon name="target" className="mt-0.5 h-4 w-4 shrink-0 text-primary-light" />
                  <Val>{footer.address}</Val>
                </li>
              )}
            </ul>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-content">
              Institucional
            </h2>
            <ul className="mt-4 flex flex-col gap-0.5">
              {footer.links.map((link) => (
                <li key={link.label}>
                  <SafeLink
                    href={link.href}
                    className="inline-flex min-h-[40px] items-center text-[15px] text-muted underline-offset-4 transition hover:text-primary-light hover:underline"
                  >
                    {link.label}
                  </SafeLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="hairline my-10" />

        <div className="flex flex-col gap-5">
          <p className="text-[13px] leading-relaxed text-muted">{footer.disclaimer}</p>
          <div className="flex flex-col gap-2 text-[13px] text-muted sm:flex-row sm:items-center sm:justify-between">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Val>{brand.companyName}</Val>
              {footer.cnpj && (
                <>
                  <span aria-hidden="true">•</span>
                  CNPJ: <Val>{footer.cnpj}</Val>
                </>
              )}
            </p>
            <p>
              © {year} <Val>{brand.productName}</Val>. {footer.copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
