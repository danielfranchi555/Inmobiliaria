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
import { Inputs } from "@/ui/Admin/UpdateFormProperty/UpdateFormProperty";

type propertSelect = {
  defaultValue?: string;
  options: string[];
  setValue: UseFormSetValue<Inputs>;
};
const SelectStatus = ({ options, setValue, defaultValue }: propertSelect) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => setValue("status", value as PropertyStatus)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a operation" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Operation</SelectLabel>
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

export default SelectStatus;
