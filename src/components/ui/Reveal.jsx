import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fades + lifts content in once when it scrolls into view.
 * Falls back to a plain element when the user prefers reduced motion.
 */
function Reveal({ as = 'div', delay = 0, y = 16, className = '', children, ...props }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}

export default Reveal;
