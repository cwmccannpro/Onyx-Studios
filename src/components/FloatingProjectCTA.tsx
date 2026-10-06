import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState, type RefObject } from 'react';
import ProjectButton from './ProjectButton';

export default function FloatingProjectCTA({ regionRef }: { regionRef: RefObject<HTMLElement> }) {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const region = regionRef.current;
    if (!region) return;
    let frame = 0;

    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const { top, bottom } = region.getBoundingClientRect();
        const midpoint = window.innerHeight / 2;
        setIsVisible(top <= midpoint && bottom > midpoint);
      });
    };

    // One continuous region keeps the CTA visible in the spaces between sections.
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(region);

    // Keep keyboard-focused controls above the floating button.
    const keepFocusVisible = (event: FocusEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLElement) || !region.contains(target)) return;
      const button = document.querySelector('[data-floating-project-cta] a');
      if (!button) return;
      const targetRect = target.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();
      if (
        targetRect.bottom > buttonRect.top - 16 && targetRect.top < buttonRect.bottom &&
        targetRect.right > buttonRect.left && targetRect.left < buttonRect.right
      ) {
        window.scrollBy({ top: targetRect.bottom - buttonRect.top + 24, behavior: reduceMotion ? 'instant' : 'smooth' });
      }
    };
    document.addEventListener('focusin', keepFocusVisible);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      document.removeEventListener('focusin', keepFocusVisible);
    };
  }, [regionRef, reduceMotion]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="floating-project-cta"
          data-floating-project-cta
          initial={{ opacity: 0, y: reduceMotion ? 0 : 96, scale: reduceMotion ? 1 : 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: reduceMotion ? 0 : 80,
            scale: reduceMotion ? 1 : 0.96,
            transition: { duration: reduceMotion ? 0 : 0.18, ease: [0.4, 0, 1, 1] },
          }}
          transition={reduceMotion
            ? { duration: 0 }
            : { type: 'spring', stiffness: 340, damping: 24, mass: 0.85, opacity: { duration: 0.18 } }}
          className="floating-project-cta"
        >
          <ProjectButton className="pointer-events-auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
