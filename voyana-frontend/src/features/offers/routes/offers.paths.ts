export const offersPaths = {
  offers: "/offers",
  tourTemplateOfferDetails: "/offers/tour-template",
  offerDetails: "/offers/:offerId/:offerCode",
  allInclusiveOfferDetails:
    "/offers/all-inclusive-template/:offerId/:offerCode",
} as const;
