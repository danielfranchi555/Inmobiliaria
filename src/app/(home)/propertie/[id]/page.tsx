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
        <div className="grid grid-cols-4 gap-4 px-6 mt-10">
          <Link
            href={"/"}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors w-fit bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
          >
            <ArrowLeft size={20} />
            <span>Volver al inicio</span>
          </Link>
          <div className="col-span-4 grid grid-cols-4  gap-4 ">
            <div className="col-span-4 md:col-span-3">
              <Carousel images={data.images} />
            </div>
            <div className="w-full col-span-4  md:col-span-1">
              <FormSeller sellerData={data.User} />
            </div>
          </div>
          <div className="col-span-4 md:col-span-3 grid">
            <div className="flex  justify-between ">
              <h1 className="text-2xl font-bold text-center">{data.title}</h1>
              <p className="text-2xl font-bold text-green-500">${data.price}</p>
            </div>
            <div className="flex  justify-between ">
              <h1 className="text-sm text-gray-400 font-bold text-center">
                {data.address}, {data.city}
              </h1>
              <Badge
                className={`${data.listingType === "RENT" ? "bg-blue-500" : "bg-green-500"}`}
              >
                {data.listingType}
              </Badge>
            </div>
            <div className="grid md:grid md:grid-cols-6 gap-4  mt-4">
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Bed size={30} />
                <span className="font-bold">{data.bedrooms}</span>
                <span className="text-sm text-gray-400">Bedrooms</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Bath />
                <span className="font-bold">{data.bathrooms}</span>
                <span className="text-sm text-gray-400">Bathrooms</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Maximize />
                <span className="font-bold">{data.squareMeters}</span>
                <span className="text-sm text-gray-400">m²</span>
              </div>
              <div className="border rounded-md flex flex-col items-center justify-center gap-2 p-4">
                <Car />
                <span className="font-bold">{data.parkingSpaces}</span>
                <span className="text-sm text-gray-400">Parking Spaces</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 px-6  ">
          <h3 className="text-2xl font-bold py-4">Similar Properties</h3>
          {!similarProperties ? (
            "No similar properties"
          ) : (
            <>
              <div className="hidden md:grid md:grid-cols-4  md:gap-4 md:w-full">
                {similarProperties.map((item) => (
                  <Link key={item.id} href={`/propertie/${item.id}`}>
                    <CardSimilarProperties dataItem={item} />
                  </Link>
                ))}
              </div>

              {/* MOBILE */}
              <div className=" md:hidden ">
                <CarouselSimilarProperties data={similarProperties} />
                {/* {similarProperties.map((item) => (
                <Link key={item.id} href={`/propertie/${item.id}`}>
                  <CardSimilarProperties dataItem={item} />
                </Link>
              ))} */}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default page;
