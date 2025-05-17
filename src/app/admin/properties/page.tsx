import TableProperties from "@/ui/Admin/TableProperties/TableProperties";
import { getPropertiesByAdmin } from "./actions";
import { FilterPropertiesByCity } from "@/ui/Admin/FilterProperties/FilterPropertiesByCity";

type Props = {
  searchParams: Promise<{
    Type: string;
    Contract: string;
    Minprice: string;
    Maxprice: string;
    Currency: string;
    City: string;
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

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold">No Properties</h1>
          <p className="text-sm text-muted-foreground">
            You have not added any properties yet.
          </p>
        </div>
      </div>
    );
  }

  const totalItems = data.length;

  return (
    <>
      <div className="  flex justify-end px-4">
        <FilterPropertiesByCity />
      </div>
      <TableProperties data={data} total={totalItems} />
    </>
  );
}
