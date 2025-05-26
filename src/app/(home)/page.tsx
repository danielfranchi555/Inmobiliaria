import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { ShowFilters } from "@/ui/User/ShowFilters/ShowFilters";
import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { Suspense } from "react";
import SkeletonListProperties from "../skeletons/SkeletonListProperties";
import { getCities } from "./actions";

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

export default async function Home({ searchParams }: Props) {
  const { data } = await getCities();

  return (
    <div className=" grid gap-4 w-full ">
      <header className="shadow-xl relative w-full flex flex-col justify-center text-center bg-[url('/bg-image.jpg')] bg-cover bg-center h-[700px] md:h-[600px]">
        <div className="absolute inset-0 bg-[#063053] opacity-40"></div>
        {/* <div className="absolute top-0 left-0 w-full z-20">
          <NavbarWrapper />
        </div> */}
        <section className="relative flex flex-col gap-4 z-10 mt-20 px-4">
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            Encuentra la casa de tus sueños{" "}
          </h1>
          <p className="text-gray-200 max-w-md md:max-w-2xl mx-auto text-sm md:text-base">
            Explora los listados mejor valorados en tu zona, cuidadosamente
            seleccionados para adaptarse a tu estilo de vida y presupuesto.
            Comienza hoy tu camino hacia el hogar perfecto
          </p>
        </section>

        <div className="relative z-10 flex justify-center items-center w-full mt-8 px-4 md:absolute md:bottom-[-50px]">
          <Suspense fallback={null}>
            <FilterProperties cities={data} />
          </Suspense>
        </div>
      </header>

      <main
        id="property-section"
        className="px-2 md:px-6 mt-20 min-h-[600px] flex flex-col gap-4"
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
