import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { ArrowUpRight, Code2, MessagesSquare, Smartphone } from 'lucide-react';
import { PERSONAL_PORTFOLIO_URL } from '../data';
import { useRef } from 'react';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const BODY_TEXT =
  'I’m Cameron McCann, based in Buffalo, NY. My background is in applied mathematics, computer science and IT. At Onyx, I design and build websites for small businesses, working directly with you from the first conversation through launch.';

const PILLARS = [
  {
    icon: MessagesSquare,
    title: 'Work directly with me',
    text: 'I handle the design and development, so you always know who to call with a question or an idea.',
  },
  {
    icon: Code2,
    title: 'Made for your business',
    text: 'The layout, content and features are planned around your business and what your customers need.',
  },
  {
    icon: Smartphone,
    title: 'Ready for every screen',
    text: 'I check the site on phones, tablets and desktops, including the forms, menus and small details.',
  },
];

function AnimatedLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const charProgress = index / total;
  const opacity = useTransform(progress, [charProgress - 0.1, charProgress + 0.05], [0.6, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export default function About() {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ['start 0.85', 'end 0.35'],
  });

  const chars = BODY_TEXT.split('');

  return (
    <section id="about" className="section-spacing relative scroll-mt-4 px-3 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/[0.06] bg-onyx-850 px-5 py-16 sm:px-10 sm:py-20 md:px-16 md:py-24 text-center">
        <div className="onyx-haze absolute inset-0 pointer-events-none" />
        <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

        <div className="relative">
          <Eyebrow className="mx-auto mb-6 sm:mb-8">About</Eyebrow>

          <h2 className="sr-only">The person behind Onyx.</h2>
          <WordsPullUpMultiStyle
            className="section-heading max-w-3xl mx-auto text-cream"
            segments={[
              { text: 'The person', className: 'font-normal' },
              { text: 'behind Onyx.', className: 'font-normal text-primary/80' },
            ]}
          />

          <p
            ref={paragraphRef}
            aria-label={BODY_TEXT}
            className="body-copy text-primary max-w-2xl mx-auto mt-8 sm:mt-10"
          >
            {chars.map((char, i) => (
              <AnimatedLetter key={i} char={char} index={i} total={chars.length} progress={scrollYProgress} />
            ))}
          </p>

          <Reveal className="mx-auto mt-8 max-w-2xl rounded-2xl border border-white/10 bg-onyx-900/60 p-5 sm:p-6">
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:text-left">
              <div className="max-w-sm">
                <h3 className="text-base text-cream">More about me</h3>
                <p className="mt-2 body-copy text-cream/65">
                  My personal portfolio covers my background, experience and projects outside the studio.
                </p>
              </div>
              <a
                href={PERSONAL_PORTFOLIO_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit my personal portfolio at cwmccann.pro (opens in a new tab)"
                className="group inline-flex min-h-11 shrink-0 items-center gap-3 rounded-full border border-primary/25 px-5 py-3 text-sm text-cream transition-colors hover:border-primary/60 hover:bg-primary/5"
              >
                cwmccann.pro
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-3 text-left">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                index={i}
                className="rounded-2xl border border-white/[0.06] bg-onyx-900/70 p-5 sm:p-6"
              >
                <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                <h3 className="mt-5 text-lg text-cream">{title}</h3>
                <p className="mt-2 body-copy text-cream/65">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
