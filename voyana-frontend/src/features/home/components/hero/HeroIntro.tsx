export function HeroIntro() {
  return (
    <div className="w-full max-w-152 min-w-0 text-left">
      <div className="flex flex-wrap items-center justify-start gap-2 text-xs font-extrabold uppercase leading-none tracking-normal text-[rgb(var(--voyana-rgb-white)/0.92)] sm:text-sm">
        <span>Mountains</span>
        <span className="h-3 w-px bg-[rgb(var(--voyana-rgb-white)/0.78)]" />
        <span>Plains</span>
        <span className="h-3 w-px bg-[rgb(var(--voyana-rgb-white)/0.78)]" />
        <span>Beaches</span>
      </div>

      <h1 className="mt-4 max-w-lg text-[clamp(1.9rem,7vw,2.75rem)] font-black leading-[1.04] tracking-normal text-(--voyana-color-white) drop-shadow-(--voyana-shadow-text) sm:text-[clamp(2.15rem,5.5vw,3rem)] xl:text-[clamp(2rem,4.8vw,3.25rem)]">
        Your next escape starts here
      </h1>

      <p className="mt-4 max-w-124 text-sm font-medium leading-6 text-[rgb(var(--voyana-rgb-white)/0.86)] sm:max-w-140 sm:text-base sm:leading-7 xl:max-w-124">
        Explore destinations, resort packages, and handpicked travel experiences
        made for seamless booking.
      </p>
    </div>
  );
}
