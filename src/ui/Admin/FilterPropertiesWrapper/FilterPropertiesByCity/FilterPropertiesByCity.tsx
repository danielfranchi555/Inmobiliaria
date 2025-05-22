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

type cityProp = {
  label: string;
  value: string;
};
type Props = {
  cities: cityProp[] | null;
};
export function FilterPropertiesByCity({ cities }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("City", value);
      router.replace(`?${params.toString()}`, { scroll: false });
    } else {
      params.delete("City");
    }
  };

  return (
    <Select onValueChange={handleFilter}>
      <SelectTrigger className="border ">
        <SelectValue placeholder="Selecciona una ciudad" />
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
  );
}
