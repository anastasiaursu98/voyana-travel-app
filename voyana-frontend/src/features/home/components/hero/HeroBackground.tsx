import { AnimatePresence, motion } from "framer-motion";
import { heroTransition } from "../../constants/homeMotion";

type HeroBackgroundProps = {
  imageUrl: string;
};

export function HeroBackground({ imageUrl }: HeroBackgroundProps) {
  return (
    <>
      <div aria-hidden="true" className="absolute inset-0 isolate z-0">
        <AnimatePresence mode="sync" initial={false}>
          <motion.img
            key={imageUrl}
            src={imageUrl}
            alt=""
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1, zIndex: 0 }}
            exit={{ opacity: 0, scale: 1.02, zIndex: 1 }}
            transition={heroTransition}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[rgb(var(--voyana-rgb-background-dark)/0.1)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[image:var(--voyana-gradient-hero-horizontal)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-10 h-2/3 bg-[image:var(--voyana-gradient-hero-bottom)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-[image:var(--voyana-gradient-brand-tint)]"
      />
    </>
  );
}
