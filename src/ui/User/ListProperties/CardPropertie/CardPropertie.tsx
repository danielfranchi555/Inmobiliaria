import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import imageTest from "../../../../image/test-image-1.webp";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { PropertyType } from "@/app/types/property";

type Props = {
  dataItem: PropertyType;
  widht: string;
};
export function CardPropertie({ dataItem, widht }: Props) {
  return (
    <Card
      className={` hover:scale-101 h-auto transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-5  ${widht}`}
    >
      <CardHeader className="p-0 relative">
        <div className="relative">
          <Image
            src={dataItem.images[0] || imageTest}
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
      <CardFooter className="grid  m-0">
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-sm text-gray-600">
            {dataItem.neighborhood}, {dataItem.city}
          </span>
        </div>
        <p className="text-xl font-bold">{dataItem.title}</p>
        <p className=" text-sm h-10 mb-4 text-gray-600">
          {dataItem.description}
        </p>
        <div className="flex items-center justify-between">
          <div className=" flex items-center gap-2 text-sm">
            <span>{dataItem.bedrooms} Habitaciones</span>
            <span>{dataItem.bathrooms} Baños</span>
            <span>{dataItem.squareMeters} m²</span>
          </div>
          <p className="text-1xl flex flex-col items-center gap-0 md:flex-row md:gap-1 md:text-lg font-bold text-[#4A60A1]">
            <span> {dataItem.currency === "USD" ? "$ USD " : " $ ARG "}</span>
            <span> {dataItem.price.toLocaleString("en-US")}</span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
