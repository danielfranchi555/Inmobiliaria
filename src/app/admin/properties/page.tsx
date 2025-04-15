import TableProperties from "@/ui/Admin/TableProperties/TableProperties";
import { getProperties } from "./actions";

export default async function page() {
  const { data, error, message } = await getProperties();
  if (error) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold">Error</h1>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col w-full items-center justify-center h-screen">
        <div className="flex flex-col ">
          <h1 className="text-2xl font-bold">No Properties</h1>
          <p className="text-sm text-muted-foreground">
            You have not added any properties yet.
          </p>
        </div>
      </div>
    );
  }
  const totalItems = data.length;

  return (
    <>
      <TableProperties data={data} total={totalItems} />
    </>
  );
}
