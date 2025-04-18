"use client";

import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { Property } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { filteredData } from "../utils/dataFilter";

type Props = {
  data: Property[];
};

export default function HomePageClient({ data }: Props) {
  const searchParams = useSearchParams();

  const filters = {
    Type: searchParams.get("Type") || "",
    Contract: searchParams.get("Contract") || "",
    Minprice: searchParams.get("Minprice") || "",
    Maxprice: searchParams.get("Maxprice") || "",
    Currency: searchParams.get("Currency") || "",
  };

  const filtered = useMemo(() => filteredData(data, filters), [data, filters]);

  return (
    <Suspense fallback={<div>Loading properties...</div>}>
      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No properties found
        </div>
      ) : (
        <ListProperties data={filtered} />
      )}
    </Suspense>
  );
}
