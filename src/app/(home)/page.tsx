import FilterProperties from "@/ui/User/FilterProperties/FilterProperties";
import { ShowFilters } from "@/ui/User/ShowFilters/ShowFilters";
import ListProperties from "@/ui/User/ListProperties/ListProperties";
import { getProperties } from "./actions";
import { PaginationWrapper } from "@/ui/Pagination/Pagination";

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
  const { data, error, success, message, pagination } =
    await getProperties(searchParams);

  if (!data || error || !success) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">{message}</h1>
      </div>
    );
  }

  return (
    <div className=" grid gap-4 w-full ">
      <header className="relative flex w-full flex-col p-4 gap-4 md:gap-8 md:p-20 justify-center text-center bg-[url('/bg-image.jpg')] bg-cover bg-top h-[630px]">
        {/* <!-- Capa de opacidad solo para la imagen --> */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* <!-- Contenido que no se ve afectado por la opacidad --> */}
        <section className="relative flex flex-col gap-4 z-10">
          <h1 className="text-5xl text-white font-bold">
            Find your ideal property
          </h1>
          <p className="text-gray-200">
            Discover the perfect property that suits your needs and lifestyle.
          </p>
        </section>

        <div className="relative z-10 w-auto  p-6 flex justify-center items-center shadow-md rounded-lg">
          <FilterProperties />
        </div>
      </header>

      <main
        id="property-section"
        className="px-6 min-h-[600px] flex flex-col gap-4"
      >
        <ShowFilters />
        <ListProperties data={data} />
        <PaginationWrapper
          currentPage={pagination?.page || 1}
          totalPages={pagination.totalPages || 1}
        />
      </main>
    </div>
  );
}
