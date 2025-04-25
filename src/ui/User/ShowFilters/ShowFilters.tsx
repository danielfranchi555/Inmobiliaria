"use client";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const ShowFilters = () => {
  const params = useSearchParams();
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    if (!params || params.get("page")) return;

    const entries = Array.from(params.entries());
    console.log({ entries });

    if (entries.length === 0) {
      setFilters([]);
      return;
    }
    const filtersArray = entries.map(
      ([key, value]) =>
        `${capitalizeFirstLetter(key)}: ${decodeURIComponent(capitalizeFirstLetter(value))}`
    );
    setFilters(filtersArray);
  }, [params]);

  const deleteParams = (key: string) => {
    const parseKey = capitalizeFirstLetter(key);
    if (key) {
      const params = new URLSearchParams(window.location.search);
      params.delete(parseKey);
      setTransition(async () => {
        router.replace(`?${params.toString()}`, { scroll: false });
      });
    }
  };

  return (
    <div className="flex items-center gap-2 text-black  h-20 rounded-md px-4">
      <div className="hidden md:flex md:items-center md:gap-4 ">
        <Filter size={25} strokeWidth={1} />
        <p className=" whitespace-nowrap">Filters Activated: </p>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 md:flex md:gap-2 md:flex-wrap ">
        {filters.length === 0 ? (
          <Badge
            variant="outline"
            className="flex items-center justify-center text-sm"
          >
            No filters
          </Badge>
        ) : (
          filters?.map((item, index) => (
            <div className="flex items-center gap-2" key={index}>
              <Badge
                variant="secondary"
                className="bg-green-100 w-full flex gap-1 h-10 text-green-800  md:w-35"
              >
                {item}
                <button
                  onClick={() => deleteParams(item.split(":")[0].trim())}
                  className="ml-1 rounded-full hover:bg-green-200 p-0.5 cursor-pointer"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
