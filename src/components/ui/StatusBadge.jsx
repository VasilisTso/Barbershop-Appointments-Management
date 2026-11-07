import React from 'react';

const styles = {
  PENDING: { label: 'Pending', className: 'bg-ochre-wash text-ochre' },
  CONFIRMED: { label: 'Confirmed', className: 'bg-sage-wash text-sage' },
  CANCELLED: { label: 'Cancelled', className: 'bg-brick-wash text-brick' },
  COMPLETED: { label: 'Completed', className: 'bg-paper-deep text-muted' },
};

function StatusBadge({ status }) {
  const s = styles[status] || styles.PENDING;
  return (
    <span className={`inline-flex items-center gap-1.5 h-6 px-2 rounded-[3px] text-xs font-medium ${s.className}`}>
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {s.label}
    </span>
  );
}

export default StatusBadge;
