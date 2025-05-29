import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { UseFormSetValue } from "react-hook-form";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  data: SelectOption[] | null;
  value: string;
  setValue: UseFormSetValue<any>;
  placeholder: string;
  label: string;
  name: string;
};

export const UseSelect = ({
  data,
  setValue,
  value,
  placeholder,
  label,
  name,
}: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full md:border-r-1 md:pr-4 ">
      <Label>{label}</Label>
      <Select
        onValueChange={(value) => {
          setValue(name, value);
        }}
        value={value}
      >
        <SelectTrigger className="w-full border-none outline-none shadow-none px-0">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {data?.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
