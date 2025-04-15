import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { getProperties } from "../admin/properties/actions";
import { filteredData } from "../utils/dataFilter";
import { PropertyType } from "@prisma/client";
import ListProperties from "@/ui/User/ListProperties/ListProperties";

type SearchParams = Promise<{
  propertyType?: string;
  contractType?: string;
  maxPrice?: string;
}>;
export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, error, success, message } = await getProperties();

  if (!data || error || !success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }
  const { contractType, maxPrice, propertyType } = await searchParams;

  const filters = {
    propertyType: propertyType as PropertyType,
    contractType: contractType as string,
    maxPrice: maxPrice as string,
  };

  const dataFiltered = filteredData(data, filters);

  return (
    <div className=" grid gap-8 w-full ">
      <main className="flex w-full flex-col h-full gap-10 p-20 justify-center text-center bg-gray-50 ">
        <section className="flex flex-col gap-4">
          <h1 className="text-5xl text-black font-bold">
            Find your ideal property
          </h1>
          <p className="text-gray-400">
            Discover the perfect property that suits your needs and lifestyle.
          </p>
        </section>
        <div className=" w-full bg-white p-6 flex justify-center items-center shadow-md rounded-lg">
          <FilterProperties />
        </div>
      </main>
      <section className="px-6">
        <ListProperties data={dataFiltered} />
      </section>
    </div>
  );
}
