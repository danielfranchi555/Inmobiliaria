import { Property } from "@prisma/client";
import { CardPropertie } from "./CardPropertie/CardPropertie";
import Link from "next/link";

type Props = {
  data: Property[];
};

const ListProperties = ({ data }: Props) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <h1 className="text-2xl font-bold">No properties available</h1>
      </div>
    );
  }

  return (
    <div className="w-full  flex flex-col gap-8">
      <h3 className="text-2xl font-bold">List Properties</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {data.map((item: Property) => (
          <Link href={`/propertie/${item.id}`} key={item.id}>
            <CardPropertie widht="w-full" dataItem={item as Property} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListProperties;
