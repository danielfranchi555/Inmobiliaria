import React from "react";
import { getUserSeller } from "../../sellers/actions";
import AddPropertyForm from "@/ui/Admin/AddPropertyForm/AddPropertyForm";

export default async function page() {
  const { data, error, message } = await getUserSeller();

  if (!data || error) {
    return message;
  }

  return (
    <div className="px-6 grid gap-6">
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">Add Property</h1>
        <p className="text-sm text-muted-foreground">
          Complete the form to make your property visible to buyers
        </p>
      </div>
      <AddPropertyForm data={data} />
    </div>
  );
}
