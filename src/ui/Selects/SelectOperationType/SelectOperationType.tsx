import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormSetValue } from "react-hook-form";
import {
  PropertyListingType,
  PropertyStatus,
  PropertyType,
} from "@prisma/client";
import { Inputs } from "@/ui/Admin/UpdateFormProperty/UpdateFormProperty";

type propertSelect = {
  defaultValue?: string;
  options: string[];
  setValue: UseFormSetValue<Inputs>;
};
const SelectOperationType = ({
  options,
  setValue,
  defaultValue,
}: propertSelect) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) =>
        setValue("listingType", value as PropertyListingType)
      }
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a operation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Type Property</SelectLabel>
          {options.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectOperationType;
