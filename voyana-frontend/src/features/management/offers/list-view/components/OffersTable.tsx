import { ManagementActionMenu } from "../../../shared/ManagementActionMenu";
import type { OfferManagementItem } from "../../types/offerManagement.types";
import { OfferStatusBadge } from "./OfferStatusBadge";

const tableHeaders = [
  "Offer",
  "Destination",
  "Travel period",
  "Price",
  "Availability",
  "Status",
  "Last updated",
  "",
] as const;

type OffersTableProps = {
  offers: OfferManagementItem[];
};

export function OffersTable({ offers }: OffersTableProps) {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full min-w-280 border-collapse text-left">
        <thead>
          <tr className="bg-[rgb(var(--voyana-rgb-background-section)/0.72)]">
            {tableHeaders.map((header) => (
              <th
                key={header || "actions"}
                scope="col"
                className="border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.9)] px-4 py-3 text-[0.7rem] font-black uppercase tracking-[0.09em] text-(--voyana-color-text-muted) first:pl-5 last:pr-5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr
              key={offer.id}
              className="group border-b border-[rgb(var(--voyana-rgb-border-subtle)/0.72)] transition last:border-b-0 hover:bg-[rgb(var(--voyana-rgb-background-section)/0.58)]"
            >
              <td className="px-4 py-4 pl-5">
                <div className="flex min-w-58 items-center gap-3">
                  <img
                    src={offer.imageUrl}
                    alt=""
                    className="h-12 w-15 shrink-0 rounded-(--voyana-radius-card) object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black text-(--voyana-color-text-strong)">
                      {offer.name}
                    </p>
                    <p className="mt-1 text-xs font-bold text-(--voyana-color-text-muted)">
                      {offer.code}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4">
                <p className="text-sm font-bold text-(--voyana-color-text-strong)">
                  {offer.destination}
                </p>
                <p className="mt-1 text-xs font-semibold text-(--voyana-color-text-muted)">
                  {offer.category}
                </p>
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-(--voyana-color-text-body)">
                {offer.travelPeriod}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-black text-(--voyana-color-text-strong)">
                {offer.price}
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-(--voyana-color-text-body)">
                {offer.availability}
              </td>
              <td className="px-4 py-4">
                <OfferStatusBadge status={offer.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-4 text-sm font-semibold text-(--voyana-color-text-muted)">
                {offer.updatedAt}
              </td>
              <td className="px-4 py-4 pr-5">
                <ManagementActionMenu itemLabel={offer.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
