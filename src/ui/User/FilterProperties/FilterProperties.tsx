"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Delete, DeleteIcon, Trash2 } from "lucide-react";

const propertiesTypes = [
  { id: 1, name: "HOUSE", label: "House" },
  { id: 2, name: "APARTMENT", label: "Apartment" },
  { id: 3, name: "COMMERCIAL", label: "Commercial" },
  { id: 4, name: "LAND", label: "Land" },
];

const contractTypes = [
  { id: 1, name: "RENT", label: "Rent" },
  { id: 2, name: "SALE", label: "Sale" },
];

const FilterProperties = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const setFilter = (key: string, value: string) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const clearFilters = () => {
    params.delete("propertyType");
    params.delete("contractType");
    params.delete("maxPrice");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">Filter your search</h2>
      <div className="grid gap-6 md:flex md:justify-around md:gap-5  ">
        {/* SELECT TYPE PROPERTY */}
        <div className="w-full flex flex-col gap-2">
          <Label>Property Type</Label>
          <Select onValueChange={(value) => setFilter("propertyType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                {propertiesTypes.map((prop) => (
                  <SelectItem key={prop.id} value={prop.name}>
                    {prop.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <input type="hidden" name="propertyType" />
        </div>
        {/* // SELECT PRICE MAX */}
        <div className="w-full flex flex-col gap-2">
          <Label>Contract Type </Label>
          <Select onValueChange={(value) => setFilter("contractType", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a contract" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Contract</SelectLabel>
                {contractTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>Select max price </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a contract" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Contract</SelectLabel>
                {contractTypes.map((item) => (
                  <SelectItem key={item.id} value={item.name}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* <div className="w-full flex items-end ">
          <Button
            onClick={() => clearFilters()}
            className="max-w-max cursor-pointer"
            type="button"
          >
            <Trash2 className="mr-2" />
            Clear filters
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default FilterProperties;
