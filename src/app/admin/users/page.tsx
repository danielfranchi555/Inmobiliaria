import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getUsers } from "./actions";
import TableUsers from "@/ui/Admin/TableUsers/TableUsers";

export default async function page() {
  const { data, error } = await getUsers();
  if (error || !data) {
    console.log(error);
    return;
  }

  const users = data;

  return (
    <>
      <div className="flex justify-end px-4 gap-2">
        <div className="flex max-w-max relative items-center border border-gray-300 rounded-lg">
          <Input placeholder="Search..." className="border-none pl-3 " />
          <Search className="text-gray-500 absolute right-2" size={18} />
        </div>
        <Button>Add User</Button>
      </div>
      <TableUsers data={users} />
    </>
  );
}
