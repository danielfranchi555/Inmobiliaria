import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { getProperties } from "../admin/properties/actions";
import { filteredData } from "../utils/dataFilter";
import { PropertyType } from "@prisma/client";
import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { getPriceRangeUSD } from "./actions";
import { ShowFilters } from "@/ui/User/ShowFilters/ShowFilters";

type SearchParams = Promise<{
  Type?: string;
  Contract?: string;
  Minprice?: string;
  Maxprice?: string;
  Currency?: string;
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
  const { Contract, Minprice, Type, Maxprice, Currency } = await searchParams;

  const filters = {
    Type: Type as PropertyType,
    Contract: Contract as string,
    Minprice: Minprice as string,
    Maxprice: Maxprice as string,
    Currency: Currency as string,
  };

  const dataFiltered = filteredData(data, filters);

  return (
    <div className=" grid gap-8 w-full ">
      <main className="flex w-full flex-col  h-full p-4 gap-4 md:gap-8 md:p-20 justify-center text-center bg-gray-50 ">
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
        <ShowFilters />
      </main>
      <section
        id="property-list"
        className="px-6 min-h-[600px] flex flex-col gap-4"
      >
        <ListProperties data={dataFiltered} />
      </section>
    </div>
  );
}
