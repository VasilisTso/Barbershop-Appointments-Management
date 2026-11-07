import React from 'react';
import Reveal from './Reveal';

/** Page title block: display heading, optional lede, optional actions on the right. */
function PageHeader({ title, lede, actions, className = '' }) {
  return (
    <Reveal as="header" className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-ink pb-6 mb-10 ${className}`}>
      <div className="max-w-2xl">
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] tracking-[-0.02em]">{title}</h1>
        {lede && <p className="mt-4 text-muted text-lg leading-relaxed">{lede}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
    </Reveal>
  );
}

export default PageHeader;
