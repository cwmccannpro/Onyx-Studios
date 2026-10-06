import { motion, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type ProjectButtonProps = Pick<HTMLMotionProps<'a'>, 'initial' | 'animate' | 'transition' | 'className'>;

const CAL_CONFIG = JSON.stringify({
  layout: 'month_view',
  useSlotsViewOnSmallScreen: 'true',
  theme: 'dark',
  'ui.color-scheme': 'dark',
});

export default function ProjectButton({ className = '', ...animationProps }: ProjectButtonProps) {
  return (
    <motion.a
      {...animationProps}
      href="https://cal.com/cameron-mccann-9prmcz/cwmccann"
      target="_blank"
      rel="noopener noreferrer"
      aria-haspopup="dialog"
      data-cal-link="cameron-mccann-9prmcz/cwmccann"
      data-cal-namespace="cwmccann"
      data-cal-config={CAL_CONFIG}
      onClick={(event) => {
        // The direct link remains usable while the embed is loading or blocked.
        if (document.documentElement.dataset.calReady === 'true') event.preventDefault();
      }}
      className={
        'action-pill ' + className
      }
    >
      <span className="action-pill__label">Start a project</span>
      <span className="action-pill__icon" aria-hidden="true">
        <ArrowRight className="action-pill__arrow action-pill__arrow--first" />
        <ArrowRight className="action-pill__arrow action-pill__arrow--second" />
      </span>
    </motion.a>
  );
}
