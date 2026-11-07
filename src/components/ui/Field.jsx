import React, { useId } from 'react';

export const inputClass =
  'w-full h-11 bg-transparent border border-muted rounded-[4px] px-3.5 text-[15px] text-ink ' +
  'placeholder:text-muted transition-colors duration-200 hover:border-ink ' +
  'focus:outline-none focus:border-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ' +
  'aria-[invalid=true]:border-brick';

/**
 * Label + control + hint/error. Renders an <input> unless `children` supplies a custom control,
 * in which case `children` is a render function receiving the generated id and aria props.
 */
function Field({ label, hint, error, className = '', children, ...inputProps }) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const controlProps = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy,
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-ink">
        {label}
      </label>
      {typeof children === 'function' ? children(controlProps) : <input className={inputClass} {...controlProps} {...inputProps} />}
      {error ? (
        <p id={`${id}-error`} className="text-sm text-brick">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export default Field;
