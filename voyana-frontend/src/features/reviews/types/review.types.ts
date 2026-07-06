export type Review = {
  avatarInitials?: string;
  avatarUrl?: string;
  date?: string;
  destination?: string;
  location?: string;
  name: string;
  quote: string;
  rating: number;
  stayType?: string;
};

export type ReviewCategoryScore = {
  label: string;
  score: number;
};

export type ReviewSummary = {
  label: string;
  reviewCount: number;
  score: number;
};
