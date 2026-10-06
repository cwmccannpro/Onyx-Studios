import { motion, useInView } from 'framer-motion';
import { Fragment, useRef } from 'react';

export interface StyledSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: StyledSegment[];
  className?: string;
  style?: React.CSSProperties;
  align?: 'center' | 'start';
}

export default function WordsPullUpMultiStyle({
  segments,
  className = '',
  style,
  align = 'center',
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words = segments.flatMap((segment) =>
    segment.text
      .split(' ')
      .filter(Boolean)
      .map((word) => ({ word, className: segment.className ?? '' })),
  );

  return (
    <div
      ref={ref}
      className={`block w-full text-balance ${align === 'center' ? 'text-center' : 'text-left'} ${className}`}
      style={style}
      aria-hidden="true"
    >
      {words.map(({ word, className: wordClass }, i) => (
        <Fragment key={i}>
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={`inline-block ${wordClass}`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </div>
  );
}
