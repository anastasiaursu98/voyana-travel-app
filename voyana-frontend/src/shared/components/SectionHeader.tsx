type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  inverse?: boolean;
  align?: "left" | "center" | "responsiveCenter";
  descriptionSize?: "default" | "large";
  titleAs?: "h1" | "h2" | "h3";
  titleSize?: "default" | "large" | "display";
  titleTransform?: "uppercase" | "none";
  className?: string;
};

const alignClasses = {
  center: "mx-auto text-center",
  left: "text-left",
  responsiveCenter: "mx-auto text-left sm:text-center",
} as const;

const centeredContentClasses = {
  center: "mx-auto",
  left: "",
  responsiveCenter: "sm:mx-auto",
} as const;

const titleSizeClasses = {
  default: "text-3xl leading-[1.05] sm:text-4xl lg:text-5xl",
  display: "text-4xl leading-[1.05] sm:text-5xl lg:text-6xl",
  large: "text-[2.35rem] leading-[1.05] sm:text-[3rem] lg:text-[3.35rem]",
} as const;

const descriptionSizeClasses = {
  default: "mt-4 text-sm leading-6 sm:text-base sm:leading-7",
  large: "mt-5 text-base leading-8 sm:text-lg sm:leading-9",
} as const;

export function SectionHeader({
  eyebrow,
  title,
  description,
  inverse = false,
  align = "left",
  descriptionSize = "default",
  titleAs: TitleTag = "h2",
  titleSize = "default",
  titleTransform = "uppercase",
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`max-w-4xl font-sans ${alignClasses[align]} ${className}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-black uppercase leading-none tracking-normal ${
            inverse
              ? "text-[rgb(var(--voyana-rgb-accent-warm)/0.92)]"
              : "text-(--voyana-color-text-muted)"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <TitleTag
        className={`${eyebrow ? "mt-3" : ""} max-w-4xl font-bold tracking-normal ${titleSizeClasses[titleSize]} ${
          titleTransform === "uppercase" ? "uppercase" : ""
        } ${centeredContentClasses[align]} ${
          inverse
            ? "text-(--voyana-color-white)"
            : "text-(--voyana-color-text-primary)"
        }`}
      >
        {title}
      </TitleTag>
      <p
        className={`max-w-4xl font-medium ${descriptionSizeClasses[descriptionSize]} ${centeredContentClasses[align]} ${
          inverse
            ? "text-[rgb(var(--voyana-rgb-white)/0.84)]"
            : "text-(--voyana-color-text-body)"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
