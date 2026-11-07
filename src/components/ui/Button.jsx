import React from 'react';

const base =
  'inline-flex items-center justify-center gap-2 font-medium tracking-[-0.005em] rounded-[4px] ' +
  'transition-[background-color,color,border-color,transform] duration-200 ease-[var(--ease-out-expo)] ' +
  'active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 cursor-pointer select-none';

const variants = {
  primary: 'bg-ink text-paper hover:bg-accent',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-paper',
  ghost: 'text-ink hover:bg-paper-deep',
  quietDanger: 'text-brick hover:bg-brick-wash',
  danger: 'border border-brick/40 text-brick hover:bg-brick hover:text-paper hover:border-brick',
};

const sizes = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-13 px-7 text-base',
};

/**
 * Shared button. Pass `as={Link}` (plus `to`) to render a router link with button styling.
 */
function Button({ as = 'button', variant = 'primary', size = 'md', className = '', type, ...props }) {
  const Component = as;
  const resolvedType = Component === 'button' ? type || 'button' : type;
  return (
    <Component
      type={resolvedType}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    />
  );
}

export default Button;
