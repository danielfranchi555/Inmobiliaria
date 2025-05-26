import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/app/types/property";

type Props = {
  dataItem: PropertyType;
};

export function CardSimilarProperties({ dataItem }: Props) {
  return (
    <Card className="hover:scale-[1.01] transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-2 w-full h-full">
      <CardHeader className="p-0 relative">
        <div className="relative">
          <Image
            src={dataItem.images[0]}
            width={340}
            height={250}
            alt="image"
            className="w-full h-[180px] sm:h-[220px] md:h-[250px] rounded-t-lg object-cover"
          />
        </div>
        <div className="absolute bottom-3 left-1">
          <Badge
            className={`${dataItem.listingType === "RENT" ? "bg-blue-500" : "bg-green-500"}`}
          >
            {dataItem.listingType === "RENT" && "Alquiler"}
            {dataItem.listingType === "SALE" && "Venta"}
          </Badge>
        </div>
      </CardHeader>
      <CardFooter className="grid p-2 m-0 gap-2 h-auto">
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-xs sm:text-sm text-gray-600">
            {dataItem.neighborhood}, {dataItem.city}
          </span>
        </div>
        <p className="font-semibold whitespace-nowrap overflow-hidden text-ellipsis  ">
          {dataItem.title}
        </p>
        <p className="line-clamp-2 overflow-hidden tex-sm">
          {dataItem.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-xs sm:text-sm">
            <span>{dataItem.bedrooms} Hab.</span>
            <span>{dataItem.bathrooms} Baños</span>
            <span>{dataItem.squareMeters} m²</span>
          </div>
          <p className="flex flex-col items-center gap-0 md:flex-row md:gap-1 font-bold text-green-600">
            <span className="text-xs sm:text-sm">
              {dataItem.currency === "USD" ? "$ USD " : "$ ARG "}
            </span>
            <span className="text-xs sm:text-sm">
              {dataItem.price.toLocaleString("en-US")}
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
