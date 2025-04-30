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
    <Carousel className="w-full ">
      <CarouselContent>
        {data?.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card
                className={` hover:scale-101 h-auto transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-2 w-[340px]`}
              >
                <CardHeader className="p-0 relative">
                  <div className="relative">
                    <Image
                      src={item.images[0]}
                      width={100}
                      height={200}
                      alt="image"
                      className="w-full h-[250px] rounded-t-lg object-cover "
                    />
                  </div>
                  <div className="absolute bottom-3 left-1">
                    <Badge
                      className={`${item.listingType === "RENT" ? "bg-blue-500" : "bg-green-500"}`}
                    >
                      {item.listingType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardFooter className="grid p-2 m-0">
                  <div className="flex items-center gap-1">
                    <MapPin size={18} />
                    <span className="text-[10px] text-gray-600">
                      {item.neighborhood}, {item.city}
                    </span>
                  </div>
                  <p className="text-[14px] font-bold ">{item.title}</p>
                  <p className="text-[12px] mb-4 text-gray-600">
                    {item.description.length > 120
                      ? `${item.description.substring(0, 120)}...`
                      : item.description}
                  </p>
                  <div className="flex items-center justify-between ">
                    <div className=" flex items-center gap-2 text-[10px]">
                      <span>{item.bedrooms} bedrooms</span>
                      <span>{item.bathrooms} bathrooms</span>
                      <span>{item.squareMeters} m²</span>
                    </div>
                    <p className="text-1xl  flex flex-col items-center gap-0 md:flex-row md:gap-1 md:text-lg font-bold text-green-600">
                      <span className="text-[14px]">
                        {" "}
                        {item.currency === "USD" ? "$ USD " : " $ ARG "}
                      </span>
                      <span className="text-[14px]">
                        {" "}
                        {item.price.toLocaleString("en-US")}
                      </span>
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
