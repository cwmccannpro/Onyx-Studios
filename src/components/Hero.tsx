import { motion } from 'framer-motion';
import ProjectButton from './ProjectButton';
import WordsPullUp from './WordsPullUp';
import { NAV_ITEMS } from '../data';

const HERO_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="hero-section h-[100svh] min-h-[560px] p-3 sm:p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] bg-onyx-900">
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />

        {/* Navbar */}
        <nav aria-label="Primary" className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-onyx-950 rounded-b-2xl md:rounded-b-3xl px-2 py-1 sm:px-4 md:px-6">
            <ul className="flex items-center gap-1 sm:gap-5 md:gap-8 lg:gap-10 whitespace-nowrap">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-xs sm:text-sm md:text-base text-cream/80 hover:text-cream transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-5 sm:px-6 sm:pb-6 md:px-8 md:pb-8">
          <div className="hero-content-grid grid grid-cols-12 items-end gap-5 md:gap-6">
            <div className="min-w-0 col-span-12 lg:col-span-8">
              <h1 className="sr-only">Onyx Studios, independent web design and development</h1>
              <WordsPullUp
                text="Onyx"
                className="hero-wordmark text-[30vw] sm:text-[26vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[min(20vw,32rem)] font-medium leading-[0.85] tracking-[-0.07em] text-cream pb-[0.1em]"
              />
            </div>

            <div className="min-w-0 col-span-12 lg:col-span-4 flex flex-col items-start gap-5 md:gap-6 lg:pb-[2vw]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
                className="hero-description text-primary/85 max-w-lg leading-relaxed"
              >
                Onyx Studios is my independent web studio in Buffalo, NY. I design and build websites for small
                businesses, from the first sketches to launch.
              </motion.p>

              <ProjectButton
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
