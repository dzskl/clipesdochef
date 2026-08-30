import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../config/site.config.js';
import { cx } from '../../lib/text.jsx';

/**
 * Chuva de cédulas atrás do Hero, em canvas 2D puro (sem biblioteca).
 * Desligue em site.config.js -> behavior.particles = false.
 *
 * Decisões que valem manter:
 *  - Canvas em vez de dezenas de <div> ou SVG animado: um único elemento no DOM,
 *    sem custo de layout a cada quadro.
 *  - A cor sai da CSS variable do tema. Se ela não puder ser lida, o efeito
 *    simplesmente não roda — nenhuma cor literal mora neste arquivo.
 *  - O texto do Hero é a prioridade: nada de movimento brusco, e o efeito fica
 *    atrás de tudo. Mas ele também precisa ser percebido: com cédulas de 16 a
 *    34px a 10-28% de opacidade, o desenho cobria 0,6% do Hero e sumia contra o
 *    fundo escuro já texturizado. Estes são os números que aparecem sem disputar
 *    com o título — ajuste aqui se quiser mais ou menos presença.
 */

const MAX_PARTICULAS = 20;
const OPACIDADE_MIN = 0.2;
const OPACIDADE_MAX = 0.5;
const LARGURA_MIN = 26;   // px da cédula (a altura sai da proporção 2:1)
const LARGURA_MAX = 58;

const aleatorio = (min, max) => min + Math.random() * (max - min);

/** Lê '--color-secondary' (formato '227 169 60') e devolve [r, g, b] ou null. */
function corDoTema() {
  if (typeof window === 'undefined') return null;
  const bruto = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue('--color-secondary');
  const partes = String(bruto)
    .trim()
    .split(/[\s,/]+/)
    .map(Number)
    .filter((n) => Number.isFinite(n));
  return partes.length >= 3 ? partes.slice(0, 3) : null;
}

/** roundRect ainda não existe em todo navegador — este é o desenho equivalente. */
function cedula(ctx, x, y, largura, altura, raio) {
  const r = Math.min(raio, largura / 2, altura / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + largura, y, x + largura, y + altura, r);
  ctx.arcTo(x + largura, y + altura, x, y + altura, r);
  ctx.arcTo(x, y + altura, x, y, r);
  ctx.arcTo(x, y, x + largura, y, r);
  ctx.closePath();
}

/** A preferência de movimento reduzido tira a animação, não a decoração:
 *  nesse caso as cédulas são desenhadas uma vez e ficam paradas. */
const querMovimento = () =>
  typeof window !== 'undefined' &&
  !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export default function MoneyRain({ className = '' }) {
  const canvasRef = useRef(null);
  const ligado = Boolean(siteConfig.behavior.particles);
  const [comMovimento, setComMovimento] = useState(querMovimento);

  // Acompanha o prefers-reduced-motion em tempo real: ligar a preferência
  // congela as cédulas, desligar volta a animar.
  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (!mq) return undefined;
    const aoMudar = () => setComMovimento(querMovimento());
    mq.addEventListener('change', aoMudar);
    return () => mq.removeEventListener('change', aoMudar);
  }, []);

  useEffect(() => {
    if (!ligado) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const cor = corDoTema();
    if (!ctx || !cor) return undefined;

    const [r, g, b] = cor;
    let largura = 0;
    let altura = 0;
    let quadro = 0;
    let ultimo = 0;
    const notas = [];

    const nova = (acimaDoTopo) => ({
      x: aleatorio(0, largura),
      // ao iniciar, espalha as notas pela altura toda; ao reciclar, entra por cima
      y: acimaDoTopo ? aleatorio(-altura, -20) : aleatorio(0, altura),
      largura: aleatorio(LARGURA_MIN, LARGURA_MAX),
      // nota menor cai mais devagar e mais apagada: dá sensação de profundidade
      velocidade: 0,
      angulo: aleatorio(0, Math.PI * 2),
      giro: aleatorio(-0.6, 0.6),
      opacidade: 0,
    });

    const calibrar = (nota) => {
      const profundidade = (nota.largura - LARGURA_MIN) / (LARGURA_MAX - LARGURA_MIN);
      nota.velocidade = aleatorio(14, 30) + profundidade * 34;
      nota.opacidade = OPACIDADE_MIN + profundidade * (OPACIDADE_MAX - OPACIDADE_MIN);
      return nota;
    };

    const dimensionar = () => {
      const larguraAnterior = largura;
      const alturaAnterior = altura;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      largura = Math.max(1, rect.width);
      altura = Math.max(1, rect.height);
      // atribuir width/height limpa o canvas e zera a transformação
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!notas.length) {
        for (let i = 0; i < MAX_PARTICULAS; i += 1) notas.push(calibrar(nova(false)));
      } else if (larguraAnterior > 1 && alturaAnterior > 1) {
        // acompanha o novo tamanho em vez de recriar tudo: o Hero muda de altura
        // quando a fonte carrega, e recriar faria as notas saltarem de lugar
        const fx = largura / larguraAnterior;
        const fy = altura / alturaAnterior;
        notas.forEach((nota) => {
          nota.x *= fx;
          nota.y *= fy;
        });
      }

      // Sem loop não existe próximo quadro para repintar o que a linha acima
      // apagou — então o redimensionamento precisa redesenhar por conta própria.
      if (!comMovimento) pintar(0);
    };

    /** Pinta o estado atual das notas. dt = 0 desenha sem avançar nada. */
    const pintar = (dt) => {
      ctx.clearRect(0, 0, largura, altura);
      ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;

      notas.forEach((nota) => {
        nota.y += nota.velocidade * dt;
        nota.angulo += nota.giro * dt;

        const h = nota.largura / 2; // proporção de cédula, ~2:1
        if (nota.y - h > altura) {
          Object.assign(nota, calibrar(nova(true)));
          return;
        }

        ctx.save();
        ctx.translate(nota.x, nota.y);
        ctx.rotate(nota.angulo);
        ctx.globalAlpha = nota.opacidade;
        cedula(ctx, -nota.largura / 2, -h / 2, nota.largura, h, Math.max(2, h * 0.18));
        ctx.fill();
        ctx.restore();
      });
    };

    const passo = (agora) => {
      const dt = Math.min((agora - ultimo) / 1000, 0.05); // limita salto após aba oculta
      ultimo = agora;
      pintar(dt);
      quadro = window.requestAnimationFrame(passo);
    };

    const iniciar = () => {
      if (quadro || !comMovimento) return;
      ultimo = window.performance.now();
      quadro = window.requestAnimationFrame(passo);
    };

    const parar = () => {
      if (!quadro) return;
      window.cancelAnimationFrame(quadro);
      quadro = 0;
    };

    // Aba em segundo plano não precisa desenhar nada — poupa bateria.
    const aoTrocarVisibilidade = () => (document.hidden ? parar() : iniciar());

    dimensionar();
    if (comMovimento) iniciar();
    else pintar(0); // sem animação: um único quadro, cédulas paradas

    const observer =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(dimensionar) : null;
    if (observer) observer.observe(canvas);
    else window.addEventListener('resize', dimensionar);
    document.addEventListener('visibilitychange', aoTrocarVisibilidade);

    return () => {
      parar();
      if (observer) observer.disconnect();
      else window.removeEventListener('resize', dimensionar);
      document.removeEventListener('visibilitychange', aoTrocarVisibilidade);
    };
  }, [ligado, comMovimento]);

  if (!ligado) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cx('pointer-events-none absolute inset-0 z-0 h-full w-full', className)}
    />
  );
}
