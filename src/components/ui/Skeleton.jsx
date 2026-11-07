import React from 'react';

function Skeleton({ className = '' }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-[3px] bg-paper-deep ${className}`} />;
}

export default Skeleton;
