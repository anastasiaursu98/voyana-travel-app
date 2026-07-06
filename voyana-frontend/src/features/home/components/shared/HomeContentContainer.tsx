import type { ReactNode } from "react";
import { publicContentContainerClassName } from "../../../../shared/components/PublicContentContainer";

type HomeContentContainerProps = {
  children: ReactNode;
  className?: string;
};

export function HomeContentContainer({
  children,
  className = "",
}: HomeContentContainerProps) {
  return (
    <div className={`${publicContentContainerClassName} ${className}`}>
      {children}
    </div>
  );
}
