import { CardPropertie } from "./CardPropertie/CardPropertie";
import Link from "next/link";
import { PropertyType } from "@/app/types/property";

type Props = {
  data: PropertyType[];
};

const ListProperties = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-cenvter justify-center h-[400px]">
        <h1 className="text-2xl font-bold">No properties available</h1>
      </div>
    );
  }

  return (
    <div id="properties" className="w-full  flex flex-col gap-8">
      <h3 className="text-2xl font-bold">List Properties</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((item: PropertyType) => (
          <Link href={`/propertie/${item.id}`} key={item.id}>
            <CardPropertie widht="w-full" dataItem={item as PropertyType} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListProperties;
