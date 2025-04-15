import { getUserSeller } from "./actions";
import AddSeller from "@/ui/Admin/AddSeller/AddSeller";
import TableSellers from "@/ui/Admin/TableSellers/TableSellers";
import { SearchSeller } from "@/ui/Admin/SearchSeller/SearchSeller";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    name: string;
  }>;
}) {
  const { data, error, message } = await getUserSeller();

  if (!data || error) {
    console.log(message);
    return message;
  }

  const { name } = await searchParams;
  const nameParam = typeof name === "string" ? name.trim() : "";

  const filterData =
    typeof nameParam === "string"
      ? data.filter((seller) =>
          seller.name.toLowerCase().includes(nameParam.toLowerCase())
        )
      : data;

  return (
    <>
      <div className="flex justify-end px-4 gap-2">
        <div className="flex max-w-max relative items-center border border-gray-300 rounded-lg">
          <SearchSeller />
        </div>
        <AddSeller />
      </div>
      <TableSellers data={filterData} />
    </>
  );
}
