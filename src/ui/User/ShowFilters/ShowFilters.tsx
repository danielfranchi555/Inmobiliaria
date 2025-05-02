"use client";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

export const ShowFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<string[]>([]);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchParams) return;

    const entries = Array.from(searchParams.entries()).filter(
      ([key]) => !["page", "pagesize"].includes(key.toLowerCase())
    );

    const filtersArray = entries.map(
      ([key, value]) =>
        `${capitalizeFirstLetter(key)}: ${decodeURIComponent(value)}`
    );

    setFilters(filtersArray);
  }, [searchParams]);

  const deleteParams = (key: string) => {
    setDeletingKey(key); // ← Marcar cuál filtro se está eliminagitndo

    const params = new URLSearchParams(searchParams);
    params.delete(key);
    params.delete("page");

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    if (!isPending) {
      setDeletingKey(null); // ← Resetear cuando termine la transición
    }
  }, [isPending]);

  return (
    <div className="flex items-center gap-2 text-black h-20 rounded-md px-4">
      <div className="hidden md:flex md:items-center md:gap-4">
        <Filter size={25} strokeWidth={1} />
        <p className="whitespace-nowrap">Filters Activated: </p>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 md:flex md:gap-2 md:flex-wrap">
        {filters.length === 0 ? (
          <Badge
            variant="outline"
            className="flex items-center justify-center text-sm"
          >
            No filters
          </Badge>
        ) : (
          filters.map((item, index) => {
            const key = item.split(":")[0].trim();
            return (
              <div className="flex items-center gap-2" key={index}>
                <Badge
                  variant="secondary"
                  className="bg-green-200 w-full flex items-center  gap-1 h-10 px-3 text-green-800 md:w-40"
                >
                  <span className="text-xs ">{item}</span>
                  {deletingKey === key ? (
                    <div className="w-4 h-4 border-2 ml-1  border-green-700 p-0.5 border-t-transparent border-r-transparent rounded-full animate-spin" />
                  ) : (
                    <button
                      onClick={() => deleteParams(key)}
                      className="ml-1 rounded-full hover:bg-green-300 p-0.5 cursor-pointer"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </Badge>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
