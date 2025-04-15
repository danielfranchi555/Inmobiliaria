import { Property } from "@prisma/client";

type Filters = {
  propertyType: string;
  contractType: string;
  minPrice: string;
  maxPrice: string;
};

export const filteredData = (
  data: Property[],
  filters: Filters
): Property[] => {
  return data.filter((property) => {
    const { propertyType, contractType, minPrice, maxPrice } = filters;

    const propertyTypeFilter = propertyType || "";
    const contractTypeFilter = contractType || "";
    const minPriceFilter = minPrice || "";
    const maxPriceFilter = maxPrice || "";

    const matchesPropertyType = propertyTypeFilter
      ? property.propertyType === propertyTypeFilter
      : true;
    const matchesContractType = contractTypeFilter
      ? property.listingType === contractTypeFilter
      : true;

    const matchesMinPrice = minPriceFilter
      ? property.price >= Number(minPriceFilter)
      : true;

    const matchesMaxPrice = maxPriceFilter
      ? property.price <= Number(maxPriceFilter)
      : true;

    return (
      matchesPropertyType &&
      matchesContractType &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
};
