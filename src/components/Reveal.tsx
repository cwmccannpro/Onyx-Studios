import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface RevealProps {
  index?: number;
  className?: string;
  children: React.ReactNode;
}

// Scale + fade entrance, staggered by index. Shared by cards across sections.
export default function Reveal({ index = 0, className = '', children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
