import { useCallback, useEffect, useRef, useState } from "react";

export function usePublicHeaderMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVacationCategoriesOpen, setIsVacationCategoriesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleMobileMenuClose = useCallback(() => {
    setIsVacationCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    if (isMobileMenuOpen) {
      setIsVacationCategoriesOpen(false);
    }

    setIsMobileMenuOpen((currentValue) => !currentValue);
  }, [isMobileMenuOpen]);

  const handleVacationCategoriesToggle = useCallback(() => {
    setIsVacationCategoriesOpen((currentValue) => !currentValue);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const previousBodyOverflow = document.body.style.overflow;
    const focusableSelector =
      "#public-mobile-navigation a[href], #public-mobile-navigation button:not([disabled])";

    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      const menuPanel = document.getElementById("public-mobile-navigation");
      menuPanel?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        handleMobileMenuClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleMobileMenuClose();
        return;
      }

      if (event.key !== "Tab" || !mobileMenuRef.current) {
        return;
      }

      const focusableElements = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
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

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [handleMobileMenuClose, isMobileMenuOpen]);

  return {
    handleMobileMenuClose,
    handleMobileMenuToggle,
    handleVacationCategoriesToggle,
    isVacationCategoriesOpen,
    isMobileMenuOpen,
    mobileMenuRef,
  };
}
