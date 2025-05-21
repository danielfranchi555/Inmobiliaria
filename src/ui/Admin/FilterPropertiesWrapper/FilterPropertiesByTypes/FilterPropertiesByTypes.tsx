"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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

type typesProps = {
  types: string[];
  contracts: string[];
};

export const FilterPropertiesByTypes = ({ types }: typesProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("Type", value.toLocaleUpperCase());
      router.replace(`?${params.toString()}`);
    } else {
      params.delete("City");
    }
  };

  return (
    <Select onValueChange={handleFilter}>
      <SelectTrigger className="border ">
        <SelectValue placeholder="Selecciona un tipo de propiedad" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos de propiedades</SelectLabel>
          {types?.map((item, index) => (
            <SelectItem key={index} value={item}>
              {capitalizeFirstLetter(item)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
