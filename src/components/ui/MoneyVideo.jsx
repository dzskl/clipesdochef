import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../config/site.config.js';
import { cx } from '../../lib/text.jsx';

/**
 * Vídeo de fundo do Hero. Configurado em site.config.js -> hero.video.
 * Deixe `src` vazio para voltar às cédulas desenhadas (MoneyRain).
 *
 * Por que `mix-blend-mode: screen`: MP4 não tem canal de transparência, então o
 * vídeo chega com o próprio fundo quase preto. No modo `screen` o preto some e
 * só as notas iluminadas aparecem — é o que evita um retângulo visível por cima
 * do Hero. Se um dia o vídeo trocar por um de fundo claro, esse truque deixa de
 * funcionar e o certo passa a ser recortar o vídeo com transparência (WebM/VP9).
 *
 * O vídeo é vertical (9:16). Com `object-cover` ele preenche a área: no celular
 * cabe quase inteiro, no desktop aparece uma faixa horizontal do meio.
 */

// Opacidade do vídeo. Acima disso ele começa a disputar com o título do Hero.
const OPACIDADE = 0.55;

const querMovimento = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function MoneyVideo({ className = '' }) {
  const videoRef = useRef(null);
  const { video } = siteConfig.hero;
  const [comMovimento, setComMovimento] = useState(querMovimento);

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    const aoMudar = () => setComMovimento(querMovimento());
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return undefined;

    // Ritmo do loop. Fica no elemento, não no arquivo, para dar para ajustar
    // pelo config sem reprocessar o vídeo.
    const velocidade = Number(video.velocidade);
    if (Number.isFinite(velocidade) && velocidade > 0) el.playbackRate = velocidade;

    // Movimento reduzido: fica no pôster, parado. Mesma regra das cédulas.
    if (!comMovimento) {
      el.pause();
      el.currentTime = 0;
      return undefined;
    }

    // `play()` devolve promessa e pode ser recusado por política de autoplay;
    // sem o catch isso vira erro não tratado no console.
    const tocar = () => {
      const p = el.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };

    // Decodificar vídeo em aba oculta gasta bateria à toa.
    const aoTrocarVisibilidade = () => (document.hidden ? el.pause() : tocar());

    tocar();
    document.addEventListener('visibilitychange', aoTrocarVisibilidade);
    return () => document.removeEventListener('visibilitychange', aoTrocarVisibilidade);
  }, [comMovimento, video.velocidade]);

  if (!video?.src) return null;

  return (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        loop
        playsInline
        autoPlay={comMovimento}
        preload="auto"
        poster={video.poster || undefined}
        className={cx(
          'pointer-events-none absolute inset-0 z-0 h-full w-full object-cover',
          className,
        )}
        style={{ mixBlendMode: 'screen', opacity: OPACIDADE }}
      >
        {video.srcWebm && <source src={video.srcWebm} type="video/webm" />}
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Véu: o vídeo é filmado, não desenhado, e uma nota clara pode passar
          atrás do título a qualquer momento. Esta camada garante o contraste do
          texto em qualquer quadro, sem depender de sorte. A cor vem do tema. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-background/55"
      />
    </>
  );
}
