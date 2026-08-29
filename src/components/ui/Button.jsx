import React from 'react';
import { cx } from '../../lib/text.jsx';
import Icon from './Icon.jsx';

/**
 * Botão único da página (links e botões usam o mesmo componente).
 * Alturas mínimas de 48px garantem área de toque confortável no celular.
 */
const variants = {
  primary:
    'bg-primary text-on-primary shadow-cta hover:bg-primary-dark hover:-translate-y-0.5 ' +
    'hover:shadow-glow active:translate-y-0 active:scale-[0.98]',
  secondary:
    'border border-line bg-white/[0.04] text-content hover:-translate-y-0.5 ' +
    'hover:border-primary/50 hover:bg-white/[0.07] active:translate-y-0 active:scale-[0.98]',
  ghost: 'text-content hover:text-primary-light',
  outline:
    'border border-primary/60 text-primary-light hover:-translate-y-0.5 hover:bg-primary ' +
    'hover:text-on-primary active:translate-y-0 active:scale-[0.98]',
};

const sizes = {
  sm: 'min-h-[42px] px-4 text-sm',
  md: 'min-h-[50px] px-6 text-[15px]',
  lg: 'min-h-[58px] px-7 text-base sm:text-lg',
};

export default function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  icon,
  iconAfter = true,
  className = '',
  children,
  full = false,
  ...rest
}) {
  const Component = as || (href ? 'a' : 'button');
  const base = cx(
    'group relative inline-flex select-none items-center justify-center gap-2.5 overflow-hidden',
    'rounded-full font-semibold leading-tight tracking-tight sm:whitespace-nowrap',
    'transition-all duration-200 ease-out will-change-transform',
    'focus-visible:outline-2 focus-visible:outline-offset-4 disabled:opacity-60',
    sizes[size],
    variants[variant],
    full && 'w-full',
    className,
  );

  return (
    <Component
      href={href}
      className={base}
      {...(Component === 'button' ? { type: rest.type || 'button' } : null)}
      {...rest}
    >
      {/* microinteração: brilho que atravessa o botão no hover */}
      {variant === 'primary' && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r
                     from-transparent via-white/45 to-transparent transition-transform
                     duration-[850ms] ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative flex items-center gap-2.5 text-center">
        {icon && !iconAfter && <Icon name={icon} className="h-[18px] w-[18px] shrink-0" />}
        {children}
        {icon && iconAfter && (
          <Icon
            name={icon}
            className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )}
      </span>
    </Component>
  );
}
