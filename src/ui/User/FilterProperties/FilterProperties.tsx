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
import { generatePriceRanges } from "@/app/utils/generatePriceRanges";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { set } from "zod";

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

type Props = {
  rangePrices?: Number[];
};

const FilterProperties = ({ rangePrices }: Props) => {
  const minPriceRef = useRef<HTMLInputElement>(null);
  const maxPriceRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const priceRanges = rangePrices
    ? generatePriceRanges(Number(rangePrices[0]), Number(rangePrices[1]))
    : [];

  const setFilter = (key: string, value: string) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  const setFilterPrice = (key: string, value: string) => {
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`?${params.toString()}`);
  };
  const clearFilters = () => {
    params.delete("maxPrice");
    params.delete("minPrice");
    if (minPriceRef.current) minPriceRef.current.value = "";
    if (maxPriceRef.current) maxPriceRef.current.value = "";
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
                <SelectItem value="all">All</SelectItem>
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
          <Label>Select price </Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select price" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Price</SelectLabel>
                <div className="grid gap-2 p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-2">
                      <Label>Min price</Label>
                      <Input
                        ref={minPriceRef}
                        type="number"
                        defaultValue={searchParams.get("minPrice") || ""}
                        onChange={(e) =>
                          setFilterPrice("minPrice", e.target.value)
                        }
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label>Max price</Label>
                      <Input
                        ref={maxPriceRef}
                        type="number"
                        defaultValue={searchParams.get("maxPrice") || ""}
                        onChange={(e) =>
                          setFilterPrice("maxPrice", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <Button
                    disabled={
                      !minPriceRef.current?.value && !maxPriceRef.current?.value
                    }
                    className="cursor-pointer"
                    onClick={() => clearFilters()}
                    variant="destructive"
                  >
                    {" "}
                    <Trash2 /> Delete Filters
                  </Button>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterProperties;
