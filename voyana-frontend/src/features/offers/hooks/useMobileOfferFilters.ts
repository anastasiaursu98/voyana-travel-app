import { useEffect, useRef, useState } from "react";

export function useMobileOfferFilters() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const mobileFiltersRef = useRef<HTMLDivElement>(null);

  const handleMobileFiltersOpen = () => {
    setIsMobileFiltersOpen(true);
  };

  const handleMobileFiltersClose = () => {
    setIsMobileFiltersOpen(false);
  };

  useEffect(() => {
    if (!isMobileFiltersOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    const focusableSelector =
      "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex='-1'])";

    window.requestAnimationFrame(() => {
      mobileFiltersRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileFiltersOpen(false);
        return;
      }

      if (event.key !== "Tab" || !mobileFiltersRef.current) {
        return;
      }

      const focusableElements = Array.from(
        mobileFiltersRef.current.querySelectorAll<HTMLElement>(
          focusableSelector,
        ),
      ).filter((element) => !element.hasAttribute("disabled"));

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isMobileFiltersOpen]);

  return {
    handleMobileFiltersClose,
    handleMobileFiltersOpen,
    isMobileFiltersOpen,
    mobileFiltersRef,
  };
}
