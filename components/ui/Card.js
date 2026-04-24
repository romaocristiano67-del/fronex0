import React from 'react';

export const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = false,
  ...props
}) => {
  const baseClasses =
    'relative overflow-hidden rounded-[1.8rem] border transition-all duration-500 ease-out';

  const variants = {
    default:
      'border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] backdrop-blur-2xl shadow-[0_18px_60px_rgba(2,8,24,0.28)]',
    elevated:
      'border-white/[0.12] bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] backdrop-blur-2xl shadow-[0_24px_70px_rgba(2,8,24,0.34)]',
    minimal: 'border-white/[0.08] bg-white/[0.04] backdrop-blur-xl',
    gradient:
      'border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04)_40%,rgba(19,44,79,0.22)_100%)] backdrop-blur-2xl shadow-[0_18px_60px_rgba(2,8,24,0.28)]',
  };

  const hoverClasses = hover
    ? 'hover:-translate-y-1.5 hover:border-cyan-200/[0.18] hover:shadow-[0_28px_80px_rgba(7,16,32,0.38)]'
    : '';

  return (
    <div className={`${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`} {...props}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(118,228,255,0.14),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(45,107,255,0.12),transparent_32%)] opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-5 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 border-t border-white/10 pt-5 ${className}`}>{children}</div>
);
