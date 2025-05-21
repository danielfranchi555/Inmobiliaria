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
import { useRouter } from "next/navigation";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { useSearchParams } from "next/navigation";

type contractsProps = {
  contracts: string[];
};

export const FilterPropertiesByContracts = ({ contracts }: contractsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("Contract", value.toLocaleUpperCase());
      router.replace(`?${params.toString()}`);
    } else {
      params.delete("Contract");
    }
  };
  return (
    <Select onValueChange={handleFilter}>
      <SelectTrigger className="border ">
        <SelectValue placeholder="Selecciona un tipo de contrato" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tipos de contratos</SelectLabel>
          {contracts?.map((item, index) => (
            <SelectItem key={index} value={item.toLocaleUpperCase()}>
              {capitalizeFirstLetter(item)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
