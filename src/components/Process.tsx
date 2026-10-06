import { PROCESS_STEPS } from '../data';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

export default function Process() {
  return (
    <section id="process" className="section-spacing relative scroll-mt-4 overflow-hidden px-4 sm:px-6">
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow className="mb-5 sm:mb-6">Process</Eyebrow>
          <h2 className="sr-only">From first call to launch.</h2>
          <WordsPullUpMultiStyle
            className="section-heading text-cream max-w-3xl"
            segments={[
              { text: 'From first call', className: 'font-normal' },
              { text: 'to launch.', className: 'font-normal text-primary/80' },
            ]}
          />
          <p className="mt-5 max-w-xl body-copy text-cream/65">
            We agree on the scope before work starts. You review the design, try the site and approve the final
            version before it goes live.
          </p>
        </div>

        <ol className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-2">
          {PROCESS_STEPS.map((step, i) => (
            <li key={step.number} className="h-full">
              <Reveal
                index={i}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-onyx-850 p-6 sm:p-7 transition-colors duration-500 hover:border-primary/20"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="font-light text-5xl sm:text-6xl leading-none text-primary/30 transition-colors duration-500 group-hover:text-primary/60">
                  {step.number}
                </span>
                <h3 className="mt-8 sm:mt-12 text-xl sm:text-2xl text-cream">{step.title}</h3>
                <p className="mt-3 body-copy text-cream/65">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
