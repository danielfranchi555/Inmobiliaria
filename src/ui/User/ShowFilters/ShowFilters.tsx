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
  City: "Ciudad",
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
    ARS: "ARS",
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
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-black min-h-[5rem] p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm">
      <div className="flex items-center gap-3 text-gray-600">
        <Filter size={20} strokeWidth={1.5} className="text-[#4A60A1]" />
        <p className="text-sm font-medium whitespace-nowrap">Filtros activos</p>
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap gap-2">
        {filters.length === 0 ? (
          <div className="col-span-full md:col-span-1">
            <Badge
              variant="outline"
              className="flex items-center justify-center text-sm text-gray-500 bg-gray-50/80 hover:bg-gray-50 transition-colors duration-200 py-2 px-4 border-gray-200"
            >
              No hay filtros aplicados
            </Badge>
          </div>
        ) : (
          filters.map((filter, index) => (
            <div
              className="transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
              key={index}
            >
              <Badge
                variant="secondary"
                className="bg-[#4A60A1]/90 hover:bg-[#4A60A1] w-full h-9 px-3 text-white flex items-center gap-2 transition-all duration-200 shadow-sm"
              >
                <span className="text-xs font-medium truncate max-w-[150px]">
                  {`${filter.label}: ${filter.value}`}
                </span>
                {deletingKey === filter.originalKey ? (
                  <div className="w-3.5 h-3.5 border-2 border-white/80 border-t-transparent border-r-transparent rounded-full animate-spin shrink-0" />
                ) : (
                  <button
                    onClick={() => deleteParams(filter.originalKey)}
                    className="shrink-0 rounded-full hover:bg-white/10 p-0.5 transition-colors duration-200"
                    aria-label="Eliminar filtro"
                  >
                    <X className="h-3.5 w-3.5" />
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
