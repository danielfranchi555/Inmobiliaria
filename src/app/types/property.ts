export type PropertyType = {
  id: string;
  title: string;
  description: string;
  price: number;
  listingType: "SALE" | "RENT";
  status: "AVAILABLE" | "SOLD" | "RENTED" | "PENDING"; // o el enum que uses
  propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND";
  address: string;
  currency: "USD" | "ARG"; // según tu schema
  city: string;
  bedrooms: number | null;
  bathrooms: number | null;
  squareMeters: number;
  parkingSpaces: number | null;
  furnished: boolean;
  neighborhood: string;
  studio: boolean;
  userSellerId: string | null;
  views: number;
  images: string[];
};
