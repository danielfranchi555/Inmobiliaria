"use client";
import { Input } from "@/components/ui/input";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function FilterSearchAddress() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("Address", value);
      } else {
        params.delete("Address");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <Input
      type="text"
      placeholder="Filtrar por ciudad"
      onChange={handleChange}
      defaultValue={searchParams.get("address") || ""}
    />
  );
}
