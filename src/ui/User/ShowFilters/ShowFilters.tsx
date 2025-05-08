"use client";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";
import { Badge } from "@/components/ui/badge";
import { Filter, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

// Traducciones para las claves de los filtros
const filterTranslations: Record<string, string> = {
  Type: "Tipo de propiedad",
  Contract: "Contrato",
  Currency: "Moneda",
  Minprice: "Precio mín",
  Maxprice: "Precio máx",
  Location: "Ubicación",
};

// Traducciones para los valores de los filtros
const valueTranslations: Record<string, Record<string, string>> = {
  Type: {
    HOUSE: "Casa",
    APARTMENT: "Departamento",
  },
  Contract: {
    RENT: "Alquiler",
    SALE: "Venta",
  },
  Currency: {
    ARG: "Peso Argentino",
    USD: "Dólar",
    EUR: "Euro",
  },
};

export const ShowFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<
    Array<{ originalKey: string; label: string; value: string }>
  >([]);
  const [deletingKey, setDeletingKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!searchParams) return;

    const entries = Array.from(searchParams.entries()).filter(
      ([key]) => !["page", "pagesize"].includes(key.toLowerCase())
    );

    const filtersArray = entries.map(([originalKey, value]) => {
      // Traducir la clave del filtro
      const label =
        filterTranslations[originalKey] || capitalizeFirstLetter(originalKey);

      // Traducir el valor del filtro
      const decodedValue = decodeURIComponent(value);
      const translatedValue =
        valueTranslations[originalKey]?.[decodedValue.toUpperCase()] ||
        capitalizeFirstLetter(decodedValue);

      return { originalKey, label, value: translatedValue };
    });

    setFilters(filtersArray);
  }, [searchParams]);

  const deleteParams = (originalKey: string) => {
    setDeletingKey(originalKey);
    const params = new URLSearchParams(searchParams);
    params.delete(originalKey);
    params.delete("page");

    startTransition(() => {
      router.replace(`?${params.toString()}`, { scroll: false });
    });
  };

  useEffect(() => {
    if (!isPending) {
      setDeletingKey(null);
    }
  }, [isPending]);

  return (
    <div className="flex items-center gap-2 text-black h-20 rounded-md px-0">
      <div className="hidden md:flex md:items-center md:gap-4">
        <Filter size={25} strokeWidth={1} />
        <p className="whitespace-nowrap">Filtros activados: </p>
      </div>
      <div className="grid grid-cols-2 w-full gap-2 md:flex md:gap-2 md:flex-wrap">
        {filters.length === 0 ? (
          <Badge
            variant="outline"
            className="flex items-center justify-center text-sm"
          >
            No hay filtros
          </Badge>
        ) : (
          filters.map((filter, index) => (
            <div
              className=" gap-4 md:flex md:items-center  md:gap-2"
              key={index}
            >
              <Badge
                variant="secondary"
                className="bg-[#4A60A1] w-full gap-1 h-10 px-3  text-white md:w-50"
              >
                <span className="text-xs truncate max-w-full">{`${filter.label}: ${filter.value}`}</span>{" "}
                {deletingKey === filter.originalKey ? (
                  <div className="w-4 h-4 border-2 ml-1 border-white p-0.5 border-t-transparent border-r-transparent rounded-full animate-spin" />
                ) : (
                  <button
                    onClick={() => deleteParams(filter.originalKey)}
                    className="ml-1 rounded-full hover:bg-[#4A60A1] p-0.5 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </Badge>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
