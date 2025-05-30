import { PropertyType } from "@/app/types/property";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MapPin } from "lucide-react";
import Image from "next/image";

type props = {
  data: PropertyType[];
};

const CarouselSimilarProperties = ({ data }: props) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="hover:scale-101 w-full h-[400px] transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-2 flex flex-col">
                <CardHeader className="p-0 relative">
                  <div className="relative">
                    <Image
                      src={item.images[0]}
                      width={340}
                      height={250}
                      alt="image"
                      className="w-full h-[250px] rounded-t-lg object-cover"
                    />
                  </div>
                  <div className="absolute bottom-3 left-1">
                    <Badge
                      className={`${
                        item.listingType === "RENT"
                          ? "bg-blue-500"
                          : "bg-green-500"
                      }`}
                    >
                      {item.listingType === "RENT" && "Alquiler"}
                      {item.listingType === "SALE" && "Venta"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardFooter className=" grid p-2 m-0">
                  <div className="flex items-center gap-1">
                    <MapPin size={18} />
                    <span className="text-[10px] text-gray-600">
                      {item.neighborhood}, {item.city}
                    </span>
                  </div>
                  <p className="text-[14px] font-bold">{item.title}</p>
                  <p className="text-[12px] mb-2 text-gray-600 line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-[10px]">
                      <span>{item.bedrooms} dormitorios</span>
                      <span>{item.bathrooms} baños</span>
                      <span>{item.squareMeters} m²</span>
                    </div>
                    <p className="text-[14px] font-bold text-green-600">
                      {item.currency === "USD" ? "$ USD" : "$ ARS"}{" "}
                      {item.price.toLocaleString("en-US")}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="bottom-[-45px] left-4 top-auto translate-y-0" />
      <CarouselNext className="bottom-[-45px] right-4 top-auto translate-y-0" />
    </Carousel>
  );
};

export default CarouselSimilarProperties;
