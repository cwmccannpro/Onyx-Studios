import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PROJECTS, type Project } from '../data';
import Eyebrow from './Eyebrow';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

function Mockup({ project, eager }: { project: Project; eager: boolean }) {
  const base = `/work/${project.slug}`;
  return (
    <div className="relative pb-6 sm:pb-8 pr-3 sm:pr-6">
      {/* Browser frame */}
      <div className="overflow-hidden rounded-xl sm:rounded-2xl border border-white/[0.08] bg-onyx-800 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2 sm:px-4 sm:py-2.5">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-white/15" />
          <span className="ml-3 hidden sm:block truncate rounded-full bg-white/[0.05] px-3 py-0.5 text-[10px] text-cream/40">
            {project.client}
          </span>
        </div>
        <picture>
          <source media="(max-width: 767px)" srcSet={`${base}-desktop-sm.webp`} />
          <img
            src={`${base}-desktop.webp`}
            alt={`${project.client} website on desktop`}
            width={1440}
            height={900}
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            draggable={false}
            className="block aspect-[16/10] w-full object-cover object-top select-none"
          />
        </picture>
      </div>

      {/* Phone frame */}
      <div className="absolute bottom-0 right-0 w-[23%] max-w-[180px] overflow-hidden rounded-[0.9rem] sm:rounded-[1.4rem] border-[3px] sm:border-4 border-onyx-600 bg-onyx-950 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]">
        <img
          src={`${base}-mobile.webp`}
          alt={`${project.client} website on mobile`}
          width={390}
          height={844}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          draggable={false}
          className="block aspect-[390/844] w-full object-cover object-top select-none"
        />
      </div>
    </div>
  );
}

export default function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const justDragged = useRef(false);

  const goTo = useCallback((index: number) => {
    const i = Math.max(0, Math.min(PROJECTS.length - 1, index));
    const track = trackRef.current;
    const slide = slideRefs.current[i];
    if (!track || !slide) return;
    const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
    track.scrollTo({ left: slide.offsetLeft - padLeft, behavior: 'smooth' });
  }, []);

  // Track which slide is closest to the start of the viewport.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const padLeft = parseFloat(getComputedStyle(track).paddingLeft) || 0;
        let best = 0;
        let bestDist = Infinity;
        slideRefs.current.forEach((slide, i) => {
          if (!slide) return;
          const dist = Math.abs(slide.offsetLeft - padLeft - track.scrollLeft);
          if (dist < bestDist) {
            bestDist = dist;
            best = i;
          }
        });
        setActive(best);
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Mouse drag-to-scroll (touch devices use native swipe + snap).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return;
    justDragged.current = false;
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false };
    trackRef.current.style.scrollSnapType = 'none';
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current || !trackRef.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    trackRef.current.scrollLeft = drag.current.left - dx;
  };
  const endDrag = () => {
    if (!drag.current || !trackRef.current) return;
    const track = trackRef.current;
    const moved = drag.current.moved;
    drag.current = null;
    justDragged.current = moved;
    if (!moved) {
      track.style.scrollSnapType = '';
      return;
    }
    goTo(active);
    window.setTimeout(() => (track.style.scrollSnapType = ''), 450);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  const navButton =
    'flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-white/10 text-cream transition-all duration-300 hover:bg-primary hover:text-onyx-950 hover:border-primary disabled:opacity-30 disabled:pointer-events-none';

  return (
    <section id="work" className="section-spacing relative scroll-mt-4 overflow-hidden">
      <div className="onyx-haze absolute inset-0 pointer-events-none" />

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Eyebrow className="mb-5 sm:mb-6">Selected work</Eyebrow>
            <h2 className="sr-only">A few recent projects.</h2>
            <WordsPullUpMultiStyle
              align="start"
              className="section-heading text-cream"
              segments={[
                { text: 'A few recent', className: 'font-normal' },
                { text: 'projects.', className: 'font-normal text-primary/80' },
              ]}
            />
            <p className="mt-5 max-w-md body-copy text-cream/65">
              Websites for shops, contractors and family businesses. Take a look at the designs and the details
              behind each one.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <span className="whitespace-nowrap font-normal text-2xl sm:text-3xl text-cream tabular-nums" aria-live="polite">
              {String(active + 1).padStart(2, '0')}
              <span className="text-cream/30"> / {String(PROJECTS.length).padStart(2, '0')}</span>
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                className={navButton}
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous project"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                className={navButton}
                onClick={() => goTo(active + 1)}
                disabled={active === PROJECTS.length - 1}
                aria-label="Next project"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Track */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-12 sm:mt-16"
      >
        <div
          ref={trackRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client projects"
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerLeave={endDrag}
          className="no-scrollbar flex snap-x snap-mandatory gap-4 sm:gap-6 lg:gap-8 overflow-x-auto overscroll-x-contain track-gutter pb-2 outline-none cursor-grab active:cursor-grabbing focus-visible:ring-1 focus-visible:ring-primary/40"
        >
          {PROJECTS.map((project, i) => {
            const isActive = i === active;
            return (
              <div
                key={project.slug}
                ref={(el) => (slideRefs.current[i] = el)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${PROJECTS.length}: ${project.client}`}
                onClick={() => {
                  if (justDragged.current) {
                    justDragged.current = false;
                    return;
                  }
                  if (!isActive) goTo(i);
                }}
                className={`w-[86%] sm:w-[78%] lg:w-[64%] xl:w-[58%] max-w-[980px] shrink-0 snap-start transition-[opacity,filter] duration-500 ${
                  isActive ? 'opacity-100' : 'opacity-35 saturate-50 cursor-pointer'
                }`}
              >
                <Mockup project={project} eager={i < 2} />

                <div className="mt-6 sm:mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-10">
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-primary/70">
                      {project.category}
                    </p>
                    <h3 className="mt-2 text-2xl sm:text-3xl text-cream leading-tight">{project.client}</h3>
                    <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-cream/60">
                      <MapPin className="h-3.5 w-3.5" />
                      {project.location}
                    </p>
                  </div>
                  <div>
                    <p className="body-copy text-cream/65">{project.summary}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-white/10 px-3 py-1 text-xs text-cream/65"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Spacer so the last slide can snap to the start */}
          <div className="w-[10%] sm:w-[18%] lg:w-[30%] shrink-0" aria-hidden />
        </div>
      </motion.div>

      {/* Progress */}
      <div className="relative mx-auto mt-10 sm:mt-14 max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-1 sm:gap-2" role="tablist" aria-label="Choose project">
          {PROJECTS.map((project, i) => (
            <button
              key={project.slug}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show ${project.client}`}
              onClick={() => goTo(i)}
              className="group relative h-12 min-w-11 flex-1"
            >
              <span
                className={`absolute inset-x-0 top-1/2 h-px -translate-y-1/2 transition-colors duration-500 ${
                  i === active ? 'bg-primary' : i < active ? 'bg-primary/40' : 'bg-white/10 group-hover:bg-white/25'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
