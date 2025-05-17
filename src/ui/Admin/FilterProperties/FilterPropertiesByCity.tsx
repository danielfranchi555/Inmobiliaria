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
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function FilterPropertiesByCity() {
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
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="Cordoba">Cordoba</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
