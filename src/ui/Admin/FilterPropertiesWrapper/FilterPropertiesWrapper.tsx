import { getCities } from "@/app/(home)/actions";
import React from "react";
import { PropertyListingType, PropertyType } from "@prisma/client";
import { FilterPropertiesByCity } from "./FilterPropertiesByCity/FilterPropertiesByCity";
import { FilterPropertiesByTypes } from "./FilterPropertiesByTypes/FilterPropertiesByTypes";
import { FilterPropertiesByContracts } from "./FilterPropertiesByContracts/FilterPropertiesByContracts";
import { FilterSearchAddress } from "./FilterSearchAddress/FilterSearchAddress";

export async function FilterPropertiesWrapper() {
  const { data } = await getCities();
  const types = Object.values(PropertyType);
  const contracts = Object.values(PropertyListingType);

  return (
    <div className="flex justify-end px-4 gap-2">
      <FilterSearchAddress />
      <FilterPropertiesByCity cities={data} />
      <FilterPropertiesByTypes types={types} contracts={contracts} />
      <FilterPropertiesByContracts contracts={contracts} />
    </div>
  );
}
