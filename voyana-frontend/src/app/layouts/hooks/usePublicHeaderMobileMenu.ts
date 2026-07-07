import { useEffect, useRef, useState } from "react";

export function usePublicHeaderMobileMenu() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVacationCategoriesOpen, setIsVacationCategoriesOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      setIsVacationCategoriesOpen(false);
    }

    setIsMobileMenuOpen((currentValue) => !currentValue);
  };

  const handleMobileMenuClose = () => {
    setIsVacationCategoriesOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleVacationCategoriesToggle = () => {
    setIsVacationCategoriesOpen((currentValue) => !currentValue);
  };

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const previouslyFocusedElement = document.activeElement;
    const focusableSelector =
      "#public-mobile-navigation a[href], #public-mobile-navigation button:not([disabled])";

    window.requestAnimationFrame(() => {
      const menuPanel = document.getElementById("public-mobile-navigation");
      menuPanel?.focus();
    });

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsVacationCategoriesOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVacationCategoriesOpen(false);
        setIsMobileMenuOpen(false);
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

      if (previouslyFocusedElement instanceof HTMLElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [isMobileMenuOpen]);

  return {
    handleMobileMenuClose,
    handleMobileMenuToggle,
    handleVacationCategoriesToggle,
    isVacationCategoriesOpen,
    isMobileMenuOpen,
    mobileMenuRef,
  };
}
