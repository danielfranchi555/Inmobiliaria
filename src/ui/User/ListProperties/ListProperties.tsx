import { CardPropertie } from "./CardPropertie/CardPropertie";
import Link from "next/link";
import { PropertyType } from "@/app/types/property";
import { getProperties } from "@/app/(home)/actions";
import { PaginationWrapper } from "@/ui/Pagination/Pagination";

type Props = {
  searchParams: Promise<{
    Type: string;
    Contract: string;
    Minprice: string;
    Maxprice: string;
    Currency: string;
    City: string;
    page?: string;
    pageSize?: string;
  }>;
};

export async function ListProperties({ searchParams }: Props) {
  const { data, error, success, message, pagination } =
    await getProperties(searchParams);

  if (!data || error || !success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <h2 className="text-2xl font-semibold">No encontramos propiedades</h2>
        <p className="mt-2">Proba ajustando los filtros o volvé más tarde.</p>
      </div>
    );
  }

  return (
    <div id="properties" className="w-full flex flex-col gap-10">
      <h3 className="text-2xl font-bold">Propiedades Destacadas</h3>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {data.map((item: PropertyType) => (
          <Link href={`/propertie/${item.id}`} key={item.id}>
            <CardPropertie widht="w-full" dataItem={item} />
          </Link>
        ))}
      </div>
      <div className="py-5">
        <PaginationWrapper
          currentPage={pagination?.page || 1}
          totalPages={pagination.totalPages || 1}
        />
      </div>
    </div>
  );
}

export default ListProperties;
