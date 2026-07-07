import type { PropsWithChildren } from "react";

type VacationPackageSectionPanelProps = PropsWithChildren<{
  className?: string;
  description?: string;
  title: string;
}>;

export function VacationPackageSectionPanel({
  children,
  className = "",
  description,
  title,
}: VacationPackageSectionPanelProps) {
  return (
    <section
      className={`rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.96)] bg-white p-4 shadow-none sm:p-5 ${className}`}
    >
      <div>
        <h2 className="text-xl font-medium leading-none tracking-normal text-(--voyana-color-text-primary)">
          {title}
        </h2>
        {description ? (
          <p className="mt-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
            {description}
          </p>
        ) : null}
      </div>

      <div className="my-4 border-t border-[rgb(var(--voyana-rgb-border-subtle)/0.62)]" />

      {children}
    </section>
  );
}
