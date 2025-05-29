import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import imageTest from "../../../../image/test-image-1.webp";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/app/types/property";
import { capitalizeFirstLetter } from "@/app/utils/capitalizeFirstLetter";

type Props = {
  dataItem: PropertyType;
  widht: string;
};

export function CardPropertie({ dataItem, widht }: Props) {
  return (
    <Card
      className={`hover:scale-101 h-auto transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-5 ${widht}`}
    >
      <CardHeader className="p-0 relative">
        <div className="relative">
          <Image
            src={dataItem.images[0] || imageTest}
            width={400}
            height={250}
            alt="image"
            className="w-full h-[200px] sm:h-[220px] md:h-[250px] rounded-t-lg object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-1">
          <Badge
            className={`${
              dataItem.listingType === "RENT" ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {dataItem.listingType === "RENT" && "Alquiler"}
            {dataItem.listingType === "SALE" && "Venta"}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="grid gap-y-2 m-0">
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <div className="flex items-center gap-1 ">
            <span className="text-sm text-gray-600 space-x-1">
              {capitalizeFirstLetter(dataItem.neighborhood)}
            </span>
            <span className="text-sm text-gray-600 space-x-1">
              {capitalizeFirstLetter(dataItem.city)}
            </span>
          </div>
        </div>

        <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis md:text-1xl">
          {dataItem.title}
        </p>
        <p className="text-sm text-gray-600 line-clamp-2">
          {dataItem.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2 text-sm">
            <span>{dataItem.bedrooms} Habitaciones</span>
            <span>{dataItem.bathrooms} Baños</span>
            <span>{dataItem.squareMeters} m²</span>
          </div>
          <p className="text-sm sm:text-base md:text-lg font-bold text-[#4A60A1] text-right">
            <span>{dataItem.currency === "USD" ? "$ USD " : "$ ARG "}</span>
            <span>{dataItem.price.toLocaleString("en-US")}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
