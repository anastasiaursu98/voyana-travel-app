export type OfferManagementStatus = "Active" | "Draft" | "Sold out";

export type OfferManagementItem = {
  id: string;
  code: string;
  name: string;
  imageUrl: string;
  destination: string;
  category: string;
  travelPeriod: string;
  price: string;
  availability: string;
  status: OfferManagementStatus;
  updatedAt: string;
};
