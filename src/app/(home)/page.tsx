import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { getProperties } from "../admin/properties/actions";
import { ShowFilters } from "@/ui/User/ShowFilters/ShowFilters";
import HomePageClient from "./pageClient";
import { Suspense } from "react";

export default async function Home() {
  const { data, error, success, message } = await getProperties();

  if (!data || error || !success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  return (
    <div className=" grid gap-8 w-full ">
      <header className="flex w-full flex-col  h-full p-4 gap-4 md:gap-8 md:p-20 justify-center text-center bg-gray-50 ">
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
      </header>
      <section
        id="property-list"
        className="px-6 min-h-[600px] flex flex-col gap-4"
      >
        <main>
          <Suspense fallback={<div>Loading properties...</div>}>
            <HomePageClient data={data} />
          </Suspense>
        </main>
      </section>
    </div>
  );
}
