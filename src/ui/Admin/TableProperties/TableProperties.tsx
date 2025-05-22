"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteProperty } from "@/app/admin/properties/actions";
import Alert from "@/ui/Alert/Alert";
import { PropertyType } from "@/app/types/property";

type TablePropertiesProps = {
  data: PropertyType[];
  total: number;
};
const TableProperties = ({ data, total }: TablePropertiesProps) => {
  const handleDelete = async (id: string): Promise<string> => {
    const { message, success, error } = await deleteProperty(id);
    if (error || success === false) {
      return message;
    }
    return message;
  };

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Listing Type</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((prop) => (
          <TableRow key={prop.id}>
            <TableCell className="font-medium">{prop.id}</TableCell>
            <TableCell className="font-medium">{prop.status}</TableCell>
            <TableCell className="font-medium">{prop.propertyType}</TableCell>
            <TableCell>{prop.listingType}</TableCell>
            <TableCell>{prop.city}</TableCell>
            <TableCell className="">{prop.address}</TableCell>
            <TableCell className="">${prop.price}</TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link href={`/admin/properties/update-property/${prop.id}`}>
                  <Button>Edit</Button>
                </Link>
                <Alert onConfirm={() => handleDelete(prop.id)} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="w-full">
        <TableRow className=" w-full">
          <TableCell colSpan={8} className="text-center">
            Total Properties: {total}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default TableProperties;
