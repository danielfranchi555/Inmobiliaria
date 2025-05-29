import { getPropertieId } from "@/app/admin/properties/actions";
import Carousel from "@/ui/User/Carousel";
import { Badge } from "@/components/ui/badge";
import { Bath, Bed, Car, Maximize, ArrowLeft } from "lucide-react";
import { FormSeller } from "@/ui/User/FormSeller/FormSeller";
import { getSimilarProperties } from "../../actions";
import { CardPropertie } from "@/ui/User/ListProperties/CardPropertie/CardPropertie";
import Link from "next/link";
import { CardSimilarProperties } from "@/ui/User/SimilarProperties/CardSimilarProperties";
import CarouselSimilarProperties from "@/ui/User/CarouselSimilarProperties/CarouselSimilarProperties";
import Navbar from "@/ui/Navbar/Navbar";
import { Button } from "@/components/ui/button";

async function page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const { data, error, message, success } = await getPropertieId(id);

  if (!data || error || !success) {
    return (
      <div>
        <h1>Error fetching propertie</h1>
      </div>
    );
  }

  const { data: similarProperties, error: errorSimilarProperties } =
    await getSimilarProperties(data.propertyType, id);

  if (!data.User) {
    return;
  }
  return (
    <div>
      <section className="flex flex-col">
        <div className="grid grid-cols-4 gap-4 px-2 sm:px-6 mt-10">
          <Link
            href={"/"}
            // className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors w-fit bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg text-[14px] md:text-1xl"
          >
            <Button variant={"outline"} className="cursor-pointer">
              <ArrowLeft size={20} />
              <span>Volver al inicio</span>
            </Button>
          </Link>
          <div className="col-span-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-3/4">
                <div className="h-full">
                  <Carousel images={data.images} />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <div className="h-full">
                  <FormSeller sellerData={data.User} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 grid gap-4">
            <div className="flex flex-col md:flex-row  text-left justify-between">
              <h1 className="text-1xl md:text-2xl font-bold">{data.title}</h1>
              <p className="text-2xl font-bold text-green-500">${data.price}</p>
            </div>
            <div className=" flex justify-between">
              <h1 className="text-sm text-gray-400 font-bold text-center">
                {data.address}, {data.city}
              </h1>
              <Badge
                className={`${data.listingType === "RENT" ? "bg-blue-500" : "bg-green-500 text-1xl"}`}
              >
                {data.listingType === "RENT" && "Alquiler"}
                {data.listingType === "SALE" && "Venta"}
              </Badge>
            </div>
            <div className="grid md:grid-cols-4 gap-2">
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Bed size={30} />
                <span className="font-bold">{data.bedrooms}</span>
                <span className="text-sm text-gray-400">Habitaciones</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Bath />
                <span className="font-bold">{data.bathrooms}</span>
                <span className="text-sm text-gray-400">Baños</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Maximize />
                <span className="font-bold">{data.squareMeters}</span>
                <span className="text-sm text-gray-400">m²</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Car />
                <span className="font-bold">{data.parkingSpaces}</span>
                <span className="text-sm text-gray-400">Estacionamiento</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 px-2 sm:px-6">
          <h3 className="text-2xl font-bold py-4">Propiedades similares</h3>
          {!similarProperties ? (
            "No se encuentran propiedades similares"
          ) : (
            <>
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {similarProperties.slice(0, 5).map((item) => (
                  <Link key={item.id} href={`/propertie/${item.id}`}>
                    <CardSimilarProperties dataItem={item} />
                  </Link>
                ))}
              </div>
              {/* MOBILE */}
              <div className="sm:hidden w-full px-2">
                <CarouselSimilarProperties data={similarProperties} />
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default page;
