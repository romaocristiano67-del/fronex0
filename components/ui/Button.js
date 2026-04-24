import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  className = '',
  ...props
}) => {
  const baseClasses =
    'group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium tracking-[0.01em] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300/60 focus:ring-offset-2 focus:ring-offset-transparent disabled:pointer-events-none disabled:opacity-60';

  const variants = {
    primary:
      'border border-cyan-300/[0.25] bg-[linear-gradient(135deg,rgba(98,224,255,0.22),rgba(38,102,255,0.2))] text-white shadow-[0_12px_40px_rgba(22,89,255,0.24)] hover:-translate-y-0.5 hover:border-cyan-200/[0.40] hover:shadow-[0_18px_50px_rgba(38,102,255,0.3)]',
    secondary:
      'border border-white/[0.12] bg-white/[0.06] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-white/[0.22] hover:bg-white/10',
    accent:
      'border border-teal-300/30 bg-[linear-gradient(135deg,rgba(77,227,194,0.24),rgba(86,194,255,0.18))] text-white shadow-[0_12px_36px_rgba(30,182,214,0.22)] hover:-translate-y-0.5',
    outline:
      'border border-white/[0.18] bg-transparent text-white hover:-translate-y-0.5 hover:border-cyan-200/30 hover:bg-white/[0.06]',
  };

  const sizes = {
    small: 'px-4 py-2.5 text-sm',
    medium: 'px-5 py-3 text-sm md:text-base',
    large: 'px-6 py-3.5 text-sm md:px-7 md:py-4 md:text-base',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="button-shine absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {content}
    </button>
  );
};
