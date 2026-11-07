import React from 'react';
import { formatDuration, formatPrice } from '../lib/shop';

/**
 * One line of the price list: name …… duration · price, with an optional actions slot.
 * `headingLevel` follows the page outline (2 under a page h1, 3 under a section h2).
 * Dotted leader collapses on narrow screens where duration drops under the name.
 */
function ServiceRow({ service, actions, as = 'li', headingLevel = 3, className = '' }) {
  const Tag = as;
  const Heading = `h${headingLevel}`;
  return (
    <Tag className={`group flex flex-col gap-3 py-5 border-b border-hairline sm:flex-row sm:items-center sm:gap-6 ${className}`}>
      <div className="flex items-baseline gap-4 min-w-0 flex-1">
        <Heading className="font-display text-2xl md:text-[1.9rem] leading-tight min-w-0 break-words">{service.name}</Heading>
        <span aria-hidden="true" className="hidden sm:block flex-1 min-w-8 translate-y-[-0.3em] border-b border-dotted border-muted/50" />
        <p className="ml-auto sm:ml-0 shrink-0 flex items-baseline gap-3 tabular-nums">
          <span className="text-sm text-muted">{formatDuration(service.durationMin)}</span>
          <span className="text-lg font-medium">{formatPrice(service.priceCents)}</span>
        </p>
      </div>
      {actions && <div className="flex shrink-0 gap-2 sm:justify-end">{actions}</div>}
    </Tag>
  );
}

export default ServiceRow;
