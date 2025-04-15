import { UserType } from "@/app/types/UserType";
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

type TableProperty = {
  data: UserType[];
};

const TableSellers = ({ data }: TableProperty) => {
  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <h1 className="text-3xl">No Sellers Found</h1>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your recent Sellers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>CreatedAt</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell className="font-medium">{user.phone}</TableCell>
              <TableCell className="font-medium">{user.role}</TableCell>
              <TableCell className="font-medium">
                {user.createdAt.toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="">
              <div className="text-center ">Total Sellers: {data.length} </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default TableSellers;
