/**
 * Converte as cores do site.config.js em CSS variables.
 * É usado em dois lugares:
 *  1) build/dev  -> vite.config.js injeta as variáveis no index.html (sem flash)
 *  2) runtime    -> App.jsx reaplica no <html> (permite hot reload das cores)
 */

const HEX = /^#?([a-f\d]{3}|[a-f\d]{6})$/i;

/** '#FFB020' -> '255 176 32' (formato exigido pelo Tailwind com alpha) */
export function hexToRgbTriplet(hex) {
  const match = String(hex).trim().match(HEX);
  if (!match) return '0 0 0';
  let value = match[1];
  if (value.length === 3) value = value.split('').map((c) => c + c).join('');
  const int = parseInt(value, 16);
  return `${(int >> 16) & 255} ${(int >> 8) & 255} ${int & 255}`;
}

/** Mapa: chave do theme -> nome da CSS variable */
const COLOR_KEYS = [
  'primary',
  'primaryLight',
  'primaryDark',
  'secondary',
  'background',
  'surface',
  'surfaceAlt',
  'border',
  'text',
  'textMuted',
  'onPrimary',
  'success',
];

const toKebab = (str) => str.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());

export function themeToCssVars(theme) {
  const vars = {};
  COLOR_KEYS.forEach((key) => {
    if (theme[key]) vars[`--color-${toKebab(key)}`] = hexToRgbTriplet(theme[key]);
  });
  if (theme.fontHeading) vars['--font-heading'] = theme.fontHeading;
  if (theme.fontBody) vars['--font-body'] = theme.fontBody;
  if (theme.radius) vars['--radius-card'] = theme.radius;
  return vars;
}

/** String pronta para o atributo style="" do <html> (evita flash de cor) */
export function themeInlineStyle(theme) {
  return Object.entries(themeToCssVars(theme))
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ');
}

/** Aplica no documento (usado no client) */
export function applyTheme(theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  Object.entries(themeToCssVars(theme)).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}
