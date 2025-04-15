import UpdateFormProperty from "@/ui/Admin/UpdateFormProperty/UpdateFormProperty";
import { getPropertieId } from "../../actions";
import { getUserSeller } from "@/app/admin/sellers/actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function page({ params }: PageProps) {
  const { id } = await params;

  const [propertieResult, sellersResult] = await Promise.all([
    getPropertieId(id),
    getUserSeller(),
  ]);

  if (!propertieResult.data || propertieResult.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error</h1>
        {propertieResult.message && (
          <p className="text-sm text-muted-foreground">
            {String(propertieResult?.message as string)}
          </p>
        )}
      </div>
    );
  }

  if (!sellersResult.data || sellersResult.error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Error</h1>
        {sellersResult.message && (
          <p className="text-sm text-muted-foreground">
            {String(sellersResult?.message as string)}
          </p>
        )}
      </div>
    );
  }
  const propertie = propertieResult.data;
  const sellers = sellersResult.data;

  return (
    <div className="px-6 grid gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Add Property</h1>
        <p className="text-sm text-muted-foreground">
          Complete the form to make your property visible to buyers
        </p>
      </div>
      <UpdateFormProperty id={id} propertie={propertie} sellers={sellers} />
    </div>
  );
}
