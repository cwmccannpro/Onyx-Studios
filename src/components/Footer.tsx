import { ArrowUp } from 'lucide-react';
import { NAV_ITEMS } from '../data';

export default function Footer() {
  return (
    <footer className="px-4 pb-8 pt-10 sm:px-6 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/[0.06] pt-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-lg text-cream">
            Onyx <span className="text-primary/70">Studios</span>
          </p>
          <p className="mt-1 text-xs text-cream/35">
            © {new Date().getFullYear()} Onyx Studios. Buffalo, NY.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-2 gap-y-1 sm:gap-x-3">
          {NAV_ITEMS.map((item) => (
            <a key={item.label} href={item.href} className="inline-flex min-h-11 items-center px-2 text-sm text-cream/65 hover:text-cream transition-colors">
              {item.label}
            </a>
          ))}
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-cream/65 hover:text-cream transition-colors"
          >
            Top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
