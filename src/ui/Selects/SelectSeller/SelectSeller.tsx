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
import { PropertyStatus } from "@prisma/client";
import {
  Inputs,
  Sellers,
} from "@/ui/Admin/UpdateFormProperty/UpdateFormProperty";

type propertSelect = {
  defaultValue?: string;
  options: Sellers[];
  setValue: UseFormSetValue<Inputs>;
};
const SelectSeller = ({ options, setValue, defaultValue }: propertSelect) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => setValue("userSellerId", value as string)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a operation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Operation</SelectLabel>
          {options.map((item, index) => (
            <SelectItem value={item.id} key={index}>
              {item.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectSeller;
