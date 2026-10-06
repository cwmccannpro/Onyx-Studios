import { ArrowRight, Mail } from 'lucide-react';
import { useState } from 'react';
import { CONTACT_EMAIL } from '../data';
import Eyebrow from './Eyebrow';
import Reveal from './Reveal';
import WordsPullUpMultiStyle from './WordsPullUpMultiStyle';

const CONTACT_VIDEO =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4';

const fieldClass =
  'w-full rounded-xl border border-white/10 bg-onyx-950/60 px-4 py-3 text-base text-cream placeholder:text-cream/30 outline-none transition-colors focus:border-primary/50 focus:bg-onyx-950/80';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' });

  const update = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // No backend: compose the inquiry in the visitor's own email app.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New project inquiry${form.business ? ` from ${form.business}` : ''}`;
    const details = [`Name: ${form.name}`, `Email: ${form.email}`];
    if (form.business) details.push(`Business: ${form.business}`);
    const body = `${details.join('\n')}\n\n${form.message}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="scroll-mt-4 px-3 pb-3 pt-10 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
      <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/[0.06] bg-onyx-900">
        <video
          src={CONTACT_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-onyx-900/40 via-onyx-900/80 to-onyx-900" />
        <div className="noise-overlay absolute inset-0 opacity-[0.5] mix-blend-overlay pointer-events-none" />

        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-8 sm:py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow className="mb-5 sm:mb-6">Contact</Eyebrow>
            <h2 className="sr-only">Tell me what you have in mind.</h2>
            <WordsPullUpMultiStyle
              align="start"
              className="section-heading text-cream"
              segments={[
                { text: 'Tell me what', className: 'font-normal' },
                { text: 'you have in mind.', className: 'font-normal text-primary/80' },
              ]}
            />
            <p className="mt-6 max-w-md body-copy text-cream/70">
              Tell me about your business, what you’d like the site to do and when you need it. I’ll reply with a few
              questions and a plan for getting started.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-onyx-950/50 py-2 pl-2 pr-4 sm:pr-5 text-base text-cream transition-colors hover:border-primary/40"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-onyx-950">
                <Mail className="h-4 w-4" />
              </span>
              <span className="min-w-0 break-words">{CONTACT_EMAIL}</span>
            </a>
          </div>

          <Reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-white/[0.08] bg-onyx-850/80 p-4 sm:p-7 backdrop-blur-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-cream/65">Name</span>
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={update('name')}
                    className={fieldClass}
                    placeholder="Jane Smith"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-cream/65">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update('email')}
                    className={fieldClass}
                    placeholder="jane@business.com"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm text-cream/65">Business or current website</span>
                <input
                  name="business"
                  autoComplete="organization"
                  value={form.business}
                  onChange={update('business')}
                  className={fieldClass}
                  placeholder="Optional"
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm text-cream/65">What do you need?</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={update('message')}
                  className={`${fieldClass} resize-none`}
                  placeholder="A new site, a redesign, online booking…"
                />
              </label>

              <button
                type="submit"
                className="action-pill mt-6 w-full sm:w-auto"
              >
                <span className="action-pill__label">Write an email</span>
                <span className="action-pill__icon" aria-hidden="true">
                  <ArrowRight className="action-pill__arrow action-pill__arrow--first" />
                  <ArrowRight className="action-pill__arrow action-pill__arrow--second" />
                </span>
              </button>
              <p className="mt-3 text-sm text-cream/65 leading-relaxed">
                Opens your email app with these details filled in.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
