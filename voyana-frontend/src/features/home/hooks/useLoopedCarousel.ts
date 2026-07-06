import { useMemo, useState } from "react";

type Direction = 1 | -1;

export function useLoopedCarousel<TItem>(
  items: readonly TItem[],
  visibleCount: number,
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>(1);
  const hasMultipleItems = items.length > 1;

  const goToItem = (nextDirection: Direction) => {
    if (!hasMultipleItems) {
      return;
    }

    setDirection(nextDirection);
    setCurrentIndex((index) => {
      if (nextDirection === 1) {
        return (index + 1) % items.length;
      }

      return (index - 1 + items.length) % items.length;
    });
  };

  const visibleItems = useMemo(() => {
    const orderedItems =
      currentIndex === 0
        ? items
        : [...items.slice(currentIndex), ...items.slice(0, currentIndex)];

    return orderedItems.slice(0, visibleCount);
  }, [currentIndex, items, visibleCount]);

  return {
    direction,
    goNext: () => goToItem(1),
    goPrevious: () => goToItem(-1),
    hasMultipleItems,
    visibleItems,
  };
}
