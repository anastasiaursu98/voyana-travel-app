import type { ReactNode } from "react";

type PublicContentContainerProps = {
  children: ReactNode;
  className?: string;
};

export const publicContentContainerClassName =
  "mx-auto w-full max-w-370 px-6 sm:px-10 lg:px-14 xl:px-15";

export function PublicContentContainer({
  children,
  className = "",
}: PublicContentContainerProps) {
  return (
    <div className={`${publicContentContainerClassName} ${className}`}>
      {children}
    </div>
  );
}
