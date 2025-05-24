"use client";
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export const DeleteFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleDeleteFilters = () => {
    // Get the current pathname without search params
    startTransition(async () => {
      const pathname = window.location.pathname;
      // Navigate to the same page but without any search parameters
      router.push(pathname);
    });
  };

  return (
    <div>
      <Button
        disabled={!searchParams.toString() ? true : false}
        onClick={handleDeleteFilters}
        variant="outline"
      >
        {isPending ? (
          <span className="flex items-center gap-1">
            Eliminar filtros
            <Loader className="animate-spin text-primary" />
          </span>
        ) : (
          <span className="flex items-center gap-1">
            Eliminar Filtros
            <Trash2 />
          </span>
        )}
      </Button>
    </div>
  );
};
