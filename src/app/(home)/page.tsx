import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { ShowFilters } from "@/ui/User/ShowFilters/ShowFilters";
import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { Suspense } from "react";
import SkeletonListProperties from "../skeletons/SkeletonListProperties";
import Navbar from "@/ui/Navbar/Navbar";

type Props = {
  searchParams: Promise<{
    Type: string;
    Contract: string;
    Minprice: string;
    Maxprice: string;
    Currency: string;
    page?: string; // nuevo parámetro opcional para página
    pageSize?: string;
  }>;
};

export default async function Home({ searchParams }: Props) {
  return (
    <div className=" grid gap-4 w-full ">
      <header className="shadow-xl relative w-full flex flex-col justify-center text-center bg-[url('/bg-image.jpg')] bg-cover bg-center h-[700px] md:h-[600px]">
        <div className="absolute inset-0 bg-[#063053] opacity-40"></div>

        <div className="absolute top-0 left-0 w-full z-20">
          <Navbar />
        </div>

        <section className="relative flex flex-col gap-4 z-10 mt-20 px-4">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Find Your Dream Home
          </h1>
          <p className="text-gray-200 max-w-md md:max-w-2xl mx-auto text-sm md:text-base">
            Explore top-rated listings in your area, carefully selected to match
            your lifestyle and budget. Start your journey toward the perfect
            home today.
          </p>
        </section>

        <div className="relative z-10 flex justify-center items-center w-full mt-8 px-4 md:absolute md:bottom-[-50px]">
          <Suspense fallback={null}>
            <FilterProperties />
          </Suspense>
        </div>
      </header>

      <main
        id="property-section"
        className="px-6 mt-20 min-h-[600px] flex flex-col gap-4"
      >
        <Suspense fallback={null}>
          <ShowFilters />
        </Suspense>
        <Suspense fallback={<SkeletonListProperties />}>
          <ListProperties searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
