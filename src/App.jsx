import React, { useEffect } from 'react';
import { siteConfig } from './config/site.config.js';
import { applyTheme } from './lib/theme.js';

import Header from './components/sections/Header.jsx';
import Hero from './components/sections/Hero.jsx';
import Problem from './components/sections/Problem.jsx';
import Product from './components/sections/Product.jsx';
import Benefits from './components/sections/Benefits.jsx';
import Comparison from './components/sections/Comparison.jsx';
import HowItWorks from './components/sections/HowItWorks.jsx';
import Included from './components/sections/Included.jsx';
import Testimonials from './components/sections/Testimonials.jsx';
import Offer from './components/sections/Offer.jsx';
import Guarantee from './components/sections/Guarantee.jsx';
import Faq from './components/sections/Faq.jsx';
import FinalCta from './components/sections/FinalCta.jsx';
import Footer from './components/sections/Footer.jsx';
import StickyCta from './components/sections/StickyCta.jsx';

export default function App() {
  // Reaplica tema e title a partir do config (permite editar cores com o dev server ligado)
  useEffect(() => {
    applyTheme(siteConfig.theme);
    document.documentElement.classList.toggle(
      'smooth-scroll',
      Boolean(siteConfig.behavior.smoothScroll),
    );
    document.documentElement.lang = siteConfig.seo.lang;
  }, []);

  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Problem />
        <Product />
        <Benefits />
        <Comparison />
        <HowItWorks />
        <Included />
        <Testimonials />
        <Offer />
        <Guarantee />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta />
      {/* respiro para a barra fixa do celular não cobrir o rodapé */}
      <div aria-hidden="true" className="h-20 sm:hidden" />
    </>
  );
}
