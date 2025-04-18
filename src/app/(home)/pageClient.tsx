"use client";

import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { Property } from "@prisma/client";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import { filteredData } from "../utils/dataFilter";
import dynamic from "next/dynamic";

type Props = {
  data: Property[];
};

function HomePageClient({ data }: Props) {
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
    <>
      {filtered.length === 0 ? (
        <div className="text-center text-muted-foreground">
          No properties found
        </div>
      ) : (
        <ListProperties data={filtered} />
      )}
    </>
  );
}

export default dynamic(async () => HomePageClient, {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Loading...</h1>
    </div>
  ),
});
