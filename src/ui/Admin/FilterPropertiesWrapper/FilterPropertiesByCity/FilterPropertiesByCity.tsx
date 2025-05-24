"use client";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

type cityProp = {
  label: string;
  value: string;
};
type Props = {
  cities: cityProp[] | null;
};

export function FilterPropertiesByCity({ cities }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("City", value);
    } else {
      params.delete("City");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        onValueChange={handleFilter}
        value={searchParams.get("City") || ""}
      >
        <SelectTrigger className="border">
          <SelectValue placeholder="Ciudad" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Ciudades</SelectLabel>
            {cities?.map((item, index) => (
              <SelectItem key={index} value={item.value}>
                {capitalizeFirstLetter(item.label)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
