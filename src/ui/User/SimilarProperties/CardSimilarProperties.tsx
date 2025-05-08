import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import imageTest from "../../../../image/test-image-1.webp";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/app/types/property";

type Props = {
  dataItem: PropertyType;
};

export function CardSimilarProperties({ dataItem }: Props) {
  return (
    <Card
      className={` hover:scale-101 h-auto transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-2 w-[340px]`}
    >
      <CardHeader className="p-0 relative">
        <div className="relative">
          <Image
            src={dataItem.images[0]}
            width={100}
            height={200}
            alt="image"
            className="w-full h-[250px] rounded-t-lg object-cover "
          />
        </div>
        <div className="absolute bottom-3 left-1">
          <Badge
            className={`${dataItem.listingType === "RENT" ? "bg-blue-500" : "bg-green-500"}`}
          >
            {dataItem.listingType}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="grid p-2 m-0">
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-[10px] text-gray-600">
            {dataItem.neighborhood}, {dataItem.city}
          </span>
        </div>
        <p className="text-[14px] font-bold ">{dataItem.title}</p>
        <p className="text-[12px] h-12 mb-4 text-gray-600">
          {dataItem.description.length > 120
            ? `${dataItem.description.substring(0, 120)}...`
            : dataItem.description}
        </p>
        <div className="flex items-center justify-between ">
          <div className=" flex items-center gap-2 text-[10px]">
            <span>{dataItem.bedrooms} bedrooms</span>
            <span>{dataItem.bathrooms} bathrooms</span>
            <span>{dataItem.squareMeters} m²</span>
          </div>
          <p className="text-1xl  flex flex-col items-center gap-0 md:flex-row md:gap-1 md:text-lg font-bold text-green-600">
            <span className="text-[14px]">
              {" "}
              {dataItem.currency === "USD" ? "$ USD " : " $ ARG "}
            </span>
            <span className="text-[14px]">
              {" "}
              {dataItem.price.toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
