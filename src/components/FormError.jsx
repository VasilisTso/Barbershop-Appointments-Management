import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

/** Form-level error summary. Announced to screen readers when it appears. */
function FormError({ children }) {
  if (!children) return null;
  return (
    <div role="alert" className="flex gap-3 items-start bg-brick-wash text-brick rounded-[4px] px-4 py-3 text-sm mb-6">
      <FiAlertCircle aria-hidden="true" className="mt-0.5 shrink-0" />
      <p>{children}</p>
    </div>
  );
}

export default FormError;
