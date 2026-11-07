import React from 'react';

function Wordmark({ className = '' }) {
  return (
    <span className={`font-display leading-none tracking-[-0.01em] ${className}`}>
      Barbershop <span className="italic text-accent">VT</span>
    </span>
  );
}

export default Wordmark;
