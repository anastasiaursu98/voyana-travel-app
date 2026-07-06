import type { ImgHTMLAttributes } from "react";

type ResponsiveImageProps = ImgHTMLAttributes<HTMLImageElement>;

export function ResponsiveImage({
  className = "",
  loading = "lazy",
  decoding = "async",
  ...props
}: ResponsiveImageProps) {
  return (
    <img
      className={`h-full w-full object-cover ${className}`}
      loading={loading}
      decoding={decoding}
      {...props}
    />
  );
}
