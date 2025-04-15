import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { PropertyListingType, PropertyStatus } from "@prisma/client";
type Inputs = {
  title: string;
  price: number;
  currency: string;
  status: PropertyStatus; // Asegúrate de que `PropertyStatus` esté definido
  address: string;
  city: string;
  neighborhood: string;
  bedrooms: number | null;
  studio: boolean;
  squareMeters: number;
  bathrooms: number | null;
  parkingSpaces: number | null;
  furnished: boolean;
  description: string;
  images: File[] | string[];
  listingType: PropertyListingType; // Nueva propiedad
  userSellerId: string | null; // Nueva propiedad
  propertyType: "HOUSE" | "APARTMENT" | "COMMERCIAL" | "LAND"; // Added missing property
};

export function UseSelect({
  options,
  text,
  setValue,
  trigger,
  value,
  watch,
  dataTestid,
}: {
  options: string[];
  text: string;
  setValue: UseFormSetValue<Inputs>;
  trigger: UseFormTrigger<Inputs>;
  value: string;
  watch: string;
  dataTestid: string;
}) {
  return (
    <Select
      value={watch || ""}
      onValueChange={(selectedValue) => {
        setValue(value as keyof Inputs, selectedValue);
        trigger(value as keyof Inputs);
      }}
    >
      <SelectTrigger className="w-full" data-testid={dataTestid}>
        <SelectValue placeholder={text} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
              data-testid={`select-item-${option.replace(/\s/g, "-")}`}
            >
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
