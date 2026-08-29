import React from 'react';

/**
 * Conjunto de ícones em SVG inline — sem bibliotecas externas,
 * sem requisições e sem risco de direitos autorais.
 * Use o nome do ícone no site.config.js (campo `icon`).
 */
const paths = {
  bolt: <path d="M13 2.5 4.8 13.4a.6.6 0 0 0 .48.96H10l-1 7.14 8.2-10.9a.6.6 0 0 0-.48-.96H12l1-7.14Z" />,
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.2c0 4.3 2.9 8.3 7 9.8 4.1-1.5 7-5.5 7-9.8V6l-7-3Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 1.9" />
    </>
  ),
  chart: <path d="M3.5 20h17M7 20v-5.5M12 20V8M17 20v-8.5" />,
  gift: (
    <>
      <path d="M4 10.5h16V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9.5Z" />
      <path d="M3 7.5h18v3H3zM12 7.5V21" />
      <path d="M12 7.5S10.8 3 8.6 3a2.3 2.3 0 0 0 0 4.5H12ZM12 7.5s1.2-4.5 3.4-4.5a2.3 2.3 0 0 1 0 4.5H12Z" />
    </>
  ),
  sparkles: (
    <>
      <path d="m12 3 1.7 4.6L18.3 9.3l-4.6 1.7L12 15.6l-1.7-4.6L5.7 9.3l4.6-1.7L12 3Z" />
      <path d="M18.5 15.2l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8.8-2.1Z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
      <path d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7" />
      <path d="M12 14.6v2" />
    </>
  ),
  play: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M10.4 9.2 15 12l-4.6 2.8V9.2Z" />
    </>
  ),
  check: <path d="m4.5 12.4 5 5 10-10.8" />,
  star: <path d="m12 3.6 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.8l5.9-.8L12 3.6Z" />,
  users: (
    <>
      <circle cx="9.2" cy="8.4" r="3.4" />
      <path d="M3.5 20a5.7 5.7 0 0 1 11.4 0" />
      <path d="M16.2 5.4a3.4 3.4 0 0 1 0 6.6M17.4 14.7A5.7 5.7 0 0 1 20.5 20" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.3L12 12 3.5 7.8 12 3.5Z" />
      <path d="m3.5 12.2 8.5 4.3 8.5-4.3M3.5 16.5 12 20.8l8.5-4.3" />
    </>
  ),
  rocket: (
    <>
      <path d="M13.6 4.1c3-1.3 6.3-1 6.3-1s.3 3.3-1 6.3c-1.1 2.5-3 4.2-5.2 5.5l-3.6-3.6c1.3-2.2 3-4.1 5.5-5.2Z" />
      <path d="m10.1 11.3-2.6.7-1.9 4.4 4.4-1.9.7-2.6ZM6.4 17.6c-.9.9-1 3-1 3s2.1-.1 3-1" />
      <circle cx="15.4" cy="8.6" r="1.3" />
    </>
  ),
  heart: <path d="M12 20.2S4.5 15.8 4.5 10.6A3.9 3.9 0 0 1 12 8.5a3.9 3.9 0 0 1 7.5 2.1c0 5.2-7.5 9.6-7.5 9.6Z" />,
  wallet: (
    <>
      <path d="M3.8 8.2A2.2 2.2 0 0 1 6 6h11.5a1 1 0 0 1 1 1v1.2" />
      <rect x="3.8" y="8.2" width="16.4" height="11.5" rx="2.4" />
      <circle cx="16.2" cy="14" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  mail: (
    <>
      <rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.4" />
      <path d="m4.2 7.4 7.8 5.3 7.8-5.3" />
    </>
  ),
  phone: <path d="M8 3.6h-.9A3.1 3.1 0 0 0 4 6.7c0 7.6 5.7 13.7 13.3 13.7a3.1 3.1 0 0 0 3.1-3.1v-.9l-4-1.6-2 2.1a12.2 12.2 0 0 1-6.5-6.6l2.1-2L8 3.6Z" />,
  chat: (
    <>
      <path d="M20.4 12.4c0 4-3.8 7.2-8.4 7.2a9.9 9.9 0 0 1-2.6-.3l-5 1.4 1.5-4a6.8 6.8 0 0 1-1.7-4.3c0-4 3.8-7.2 8.4-7.2s7.8 3.2 7.8 7.2Z" />
      <path d="M9 12.2h.01M12.4 12.2h.01M15.8 12.2h.01" strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  download: <path d="M12 4v10m0 0-4-4m4 4 4-4M4.5 19.5h15" />,
  book: (
    <>
      <path d="M5 4.6A1.6 1.6 0 0 1 6.6 3H19v14.4H6.6A1.6 1.6 0 0 0 5 19V4.6Z" />
      <path d="M5 19a1.6 1.6 0 0 0 1.6 1.6H19" />
    </>
  ),
  tool: <path d="M15.6 3.6a5 5 0 0 0-5.9 6.6L3.8 16a2 2 0 1 0 2.8 2.8l5.8-5.8a5 5 0 0 0 6.6-5.9l-2.9 2.9-2.6-.7-.7-2.6 2.8-2.9Z" />,
  plus: <path d="M12 5.5v13M5.5 12h13" />,
  minus: <path d="M5.5 12h13" />,
  arrowRight: <path d="M4.5 12h14m0 0-5.2-5.2M18.5 12l-5.2 5.2" />,
  arrowDown: <path d="M12 4.5v14m0 0 5.2-5.2M12 18.5l-5.2-5.2" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m6 6 12 12M18 6 6 18" />,
  quote: <path d="M9.6 6.4C6.7 7.6 5 10.2 5 13.4v4.2h5.4v-5.4H8.2c0-2 .7-3.3 2.4-4l-1-1.8Zm8.4 0c-2.9 1.2-4.6 3.8-4.6 7v4.2H19v-5.4h-2.2c0-2 .7-3.3 2.4-4l-1.2-1.8Z" />,
  creditCard: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 10h18M6.5 14.6h3.2" />
    </>
  ),
  instagram: (
    <>
      <rect x="3.6" y="3.6" width="16.8" height="16.8" rx="5" />
      <circle cx="12" cy="12" r="3.9" />
      <circle cx="16.9" cy="7.1" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.8" y="5.6" width="18.4" height="12.8" rx="4" />
      <path d="m10.4 9.4 4.8 2.6-4.8 2.6V9.4Z" />
    </>
  ),
};

export const iconNames = Object.keys(paths);

export default function Icon({ name = 'check', className = 'h-5 w-5', strokeWidth = 1.7, ...rest }) {
  const shape = paths[name] || paths.check;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {shape}
    </svg>
  );
}
