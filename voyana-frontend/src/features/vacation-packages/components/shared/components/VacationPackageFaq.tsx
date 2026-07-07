import type { VacationPackageFaqItem } from "../../../types/vacationPackageDetails.types";
import { VacationPackageSectionPanel } from "./VacationPackageSectionPanel";

type VacationPackageFaqProps = {
  items: readonly VacationPackageFaqItem[];
  title?: string;
};

export function VacationPackageFaq({ items, title = "FAQ" }: VacationPackageFaqProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <VacationPackageSectionPanel title={title}>
      <div className="grid gap-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-lg border border-[rgb(var(--voyana-rgb-border-subtle)/0.7)] p-4"
          >
            <h3 className="text-sm font-semibold text-(--voyana-color-text-primary)">
              {item.question}
            </h3>
            <p className="mt-2 text-sm font-medium leading-6 text-(--voyana-color-text-body)">
              {item.answer}
            </p>
          </article>
        ))}
      </div>
    </VacationPackageSectionPanel>
  );
}
