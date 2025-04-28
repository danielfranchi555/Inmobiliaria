import { Button } from "@/components/ui/button";
import { getUsers } from "./actions";
import TableUsers from "@/ui/Admin/TableUsers/TableUsers";
import SearchUser from "@/ui/Admin/SearchUser/SearchUser";

type searchParams = {
  //siempre se tiene que llamar searchParams
  searchParams: Promise<{
    query?: string;
  }>;
};
export default async function page({ searchParams }: searchParams) {
  const { data, error } = await getUsers();
  if (error || !data) {
    console.log(error);
    return;
  }

  const { query } = await searchParams;

  const users = data;

  const filteredData = query
    ? data.filter((user) =>
        user.name.toLocaleLowerCase().includes(query.toString())
      )
    : data;

  return (
    <>
      <div className="flex justify-end px-4 gap-2">
        <div className="">
          <SearchUser />
        </div>
        <Button>Add User</Button>
      </div>
      <TableUsers data={filteredData} />
    </>
  );
}
