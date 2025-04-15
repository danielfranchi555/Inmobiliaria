"use client";
import { deleteUserSeller } from "@/app/admin/sellers/actions";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column = {
  key: string; // Adjusted to accept string keys
  label: string;
};

type UseTableProps = {
  columns: Column[];
  data: Record<string, any>[]; // Allow an array of objects
  total: number | undefined;
};
export default function UseTable<T>({ columns, data, total }: UseTableProps) {
  return (
    <Table>
      <TableCaption>{total} items</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead className="w-[100px]" key={index}>
              <span className="text-sm font-medium">{col.label}</span>
            </TableHead>
          ))}
          {/* Nueva columna de acciones */}
          <TableHead className="w-[150px] text-center">
            <span className="text-sm font-medium">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index: number) => (
          <TableRow key={index}>
            {columns.map((value, idx) => (
              <TableCell className="font-medium" key={idx}>
                {item[idx] as string}
              </TableCell>
            ))}
            <TableCell className="text-center space-x-2">
              <Button variant="outline">Update</Button>
              <Button
                variant="destructive"
                onClick={() => deleteUserSeller(item.id as string)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Removed duplicate default export
