export function HeroIntro() {
  return (
    <div className="w-full max-w-152 min-w-0 text-left">
      <div className="flex flex-wrap items-center justify-start gap-2 text-xs font-extrabold uppercase leading-none tracking-normal text-[rgb(var(--voyana-rgb-white)/0.92)] sm:text-sm">
        <span>Curated vacation packages</span>
        <span className="h-3 w-px bg-[rgb(var(--voyana-rgb-white)/0.78)]" />
        <span>Clear prices</span>
        <span className="h-3 w-px bg-[rgb(var(--voyana-rgb-white)/0.78)]" />
        <span>Easier decisions</span>
      </div>

      <h1 className="mt-4 max-w-lg text-[clamp(1.9rem,7vw,2.75rem)] font-black leading-[1.04] tracking-normal text-(--voyana-color-white) drop-shadow-(--voyana-shadow-text) sm:text-[clamp(2.15rem,5.5vw,3rem)] xl:text-[clamp(2rem,4.8vw,3.25rem)]">
        Find the vacation that fits your mood, budget, and dates.
      </h1>

      <p className="mt-4 max-w-124 text-sm font-medium leading-6 text-[rgb(var(--voyana-rgb-white)/0.86)] sm:max-w-140 sm:text-base sm:leading-7 xl:max-w-124">
        Tell us what kind of trip you want, and Voyana helps you compare beach
        escapes, city breaks, family holidays, luxury stays, and last-minute
        deals in one place.
      </p>
    </div>
  );
}
