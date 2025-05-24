import TableProperties from "@/ui/Admin/TableProperties/TableProperties";
import { getPropertiesByAdmin } from "./actions";
import { FilterPropertiesWrapper } from "@/ui/Admin/FilterPropertiesWrapper/FilterPropertiesWrapper";

type Props = {
  searchParams: Promise<{
    Type: string;
    Contract: string;
    Minprice: string;
    Maxprice: string;
    Currency: string;
    City: string;
    Address: string;
    page?: string; // nuevo parámetro opcional para página
    pageSize?: string;
  }>;
};

export default async function page({ searchParams }: Props) {
  const { data, error, message } = await getPropertiesByAdmin(searchParams);

  if (error) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  const totalItems = data?.length || 0;

  return (
    <>
      <FilterPropertiesWrapper />
      {data && data.length > 0 ? (
        <TableProperties data={data} total={totalItems} />
      ) : (
        <div className="flex flex-col w-full items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">No hay propiedades</h1>
          <p className="text-sm text-muted-foreground">
            No se encontraron propiedades con los filtros aplicados.
          </p>
        </div>
      )}
    </>
  );
}
