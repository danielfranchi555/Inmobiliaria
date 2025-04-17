import { Property } from "@prisma/client";

type Filters = {
  Type: string;
  Contract: string;
  Minprice: string;
  Maxprice: string;
  Currency: string;
};

export const filteredData = (
  data: Property[],
  filters: Filters
): Property[] => {
  return data.filter((property) => {
    const { Type, Contract, Minprice, Maxprice, Currency } = filters;

    // const propertyTypeAllFilter = propertyType || "";
    const propertyTypeFilter = Type || "";
    const contractTypeFilter = Contract || "";
    const minPriceFilter = Minprice || "";
    const maxPriceFilter = Maxprice || "";
    const currencyFilter = Currency || "";

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

    const matchesCurrency = currencyFilter
      ? property.currency === currencyFilter
      : true;

    return (
      matchesPropertyType &&
      matchesContractType &&
      matchesCurrency &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });
};
