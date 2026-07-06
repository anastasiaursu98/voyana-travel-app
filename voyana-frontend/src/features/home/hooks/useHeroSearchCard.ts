import { useEffect, useRef, useState } from "react";
import type { HeroSearchPanel } from "../components/hero/hero-search-card/types";

export function useHeroSearchCard() {
  const [activePanel, setActivePanel] = useState<HeroSearchPanel | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePanelToggle = (panel: HeroSearchPanel) => {
    setActivePanel((currentPanel) => (currentPanel === panel ? null : panel));
  };

  const handlePanelClose = () => {
    setActivePanel(null);
  };

  useEffect(() => {
    if (!activePanel) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActivePanel(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActivePanel(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activePanel]);

  return {
    activePanel,
    containerRef,
    handlePanelClose,
    handlePanelToggle,
  };
}
