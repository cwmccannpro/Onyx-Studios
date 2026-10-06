export default function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={`flex w-fit items-center gap-2 text-primary text-xs uppercase tracking-[0.2em] ${className}`}
    >
      <span className="h-px w-6 bg-primary/50" aria-hidden />
      {children}
    </p>
  );
}
