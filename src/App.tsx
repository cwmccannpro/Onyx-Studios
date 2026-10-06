import { MotionConfig } from 'framer-motion';
import { useRef } from 'react';
import FloatingProjectCTA from './components/FloatingProjectCTA';
import Hero from './components/Hero';
import About from './components/About';
import Work from './components/Work';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const projectSectionsRef = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" className="relative min-h-screen bg-onyx-950">
        <main>
          <Hero />
          <div ref={projectSectionsRef}>
            <About />
            <Work />
            <Process />
          </div>
          <Contact />
        </main>
        <Footer />
        <FloatingProjectCTA regionRef={projectSectionsRef} />
        {/* Page-wide film grain to carry the hero's faded look */}
        <div className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-[0.035]" aria-hidden />
      </div>
    </MotionConfig>
  );
}
