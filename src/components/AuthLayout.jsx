import React from 'react';
import Reveal from './ui/Reveal';

/** Two-column layout for auth screens: editorial statement left, form right. */
function AuthLayout({ title, lede, aside, children }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 py-6 md:py-12">
      <Reveal className="lg:col-span-6 lg:pt-4">
        <h1 className="font-display text-6xl md:text-7xl leading-[0.95] tracking-[-0.03em]">{title}</h1>
        {lede && <p className="mt-6 text-lg text-muted leading-relaxed max-w-md">{lede}</p>}
        {aside && <div className="mt-10 hidden lg:block">{aside}</div>}
      </Reveal>
      <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
        <div className="border-t-2 border-ink pt-8">{children}</div>
      </Reveal>
    </div>
  );
}

export default AuthLayout;
