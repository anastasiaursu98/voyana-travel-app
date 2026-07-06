import type { ReactNode } from "react";

type HorizontalRailProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
};

export function HorizontalRail({
  children,
  className = "",
}: HorizontalRailProps) {
  return (
    <div className={`relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-[linear-gradient(90deg,currentColor_0%,transparent_100%)] opacity-10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-[linear-gradient(270deg,currentColor_0%,transparent_100%)] opacity-10"
      />
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  );
}
