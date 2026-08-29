import React, { useEffect, useState } from 'react';
import { siteConfig } from '../../config/site.config.js';
import { Val } from '../../lib/text.jsx';
import BuyButton from '../ui/BuyButton.jsx';

/**
 * Barra fixa de compra no celular. Aparece depois da primeira dobra
 * e se esconde quando a seção de oferta está visível.
 * Desligue em site.config.js -> behavior.stickyMobileCta = false.
 */
export default function StickyCta() {
  const { offer, behavior } = siteConfig;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!behavior.stickyMobileCta) return undefined;

    const offerSection = document.getElementById('oferta');
    let offerVisible = false;

    const onScroll = () => setVisible(window.scrollY > 600 && !offerVisible);
    window.addEventListener('scroll', onScroll, { passive: true });

    let observer;
    if (offerSection && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          offerVisible = entry.isIntersecting;
          onScroll();
        },
        { threshold: 0.12 },
      );
      observer.observe(offerSection);
    }

    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer?.disconnect();
    };
  }, [behavior.stickyMobileCta]);

  if (!behavior.stickyMobileCta) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-background/95 backdrop-blur-xl
                  transition-transform duration-300 sm:hidden ${
                    visible ? 'translate-y-0' : 'translate-y-full'
                  }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      aria-hidden={!visible}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] uppercase tracking-[0.12em] text-muted">
            {offer.priceLabel}
          </p>
          <p className="truncate text-[15px] font-bold leading-tight text-content">
            <Val>{offer.price}</Val>
          </p>
        </div>
        <BuyButton size="md" className="shrink-0 px-5 text-sm" tabIndex={visible ? 0 : -1}>
          Quero agora
        </BuyButton>
      </div>
    </div>
  );
}
