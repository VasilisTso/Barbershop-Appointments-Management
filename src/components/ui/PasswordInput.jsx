import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Field, { inputClass } from './Field';

/** Password field with show/hide toggle. */
function PasswordInput({ label = 'Password', hint, error, ...inputProps }) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} hint={hint} error={error}>
      {(controlProps) => (
        <div className="relative">
          <input
            type={visible ? 'text' : 'password'}
            className={`${inputClass} pr-12`}
            {...controlProps}
            {...inputProps}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
            className="absolute right-1 top-1/2 -translate-y-1/2 grid place-items-center size-9 rounded-[4px] text-muted hover:text-ink transition-colors cursor-pointer"
          >
            {visible ? <FiEyeOff aria-hidden="true" /> : <FiEye aria-hidden="true" />}
          </button>
        </div>
      )}
    </Field>
  );
}

export default PasswordInput;
