import { Property } from "@prisma/client";

type Filters = {
  propertyType: string;
  contractType: string;
  maxPrice: string;
};

export const filteredData = (
  data: Property[],
  filters: Filters
): Property[] => {
  return data.filter((property) => {
    const { propertyType, contractType, maxPrice } = filters;

    const propertyTypeFilter = propertyType || "";
    const contractTypeFilter = contractType || "";
    const maxPriceFilter = maxPrice || "";

    const matchesPropertyType = propertyTypeFilter
      ? property.propertyType === propertyTypeFilter
      : true;
    const matchesContractType = contractTypeFilter
      ? property.listingType === contractTypeFilter
      : true;
    const matchesMaxPrice = maxPriceFilter
      ? property.price <= Number(maxPriceFilter)
      : true;

    return matchesPropertyType && matchesContractType && matchesMaxPrice;
  });
};
