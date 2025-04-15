"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SearchSeller = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("name", value);
    } else {
      params.delete("name");
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <>
      <Input
        placeholder="Search..."
        className="border-none pl-3 "
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Search className="text-gray-500 absolute right-2" size={18} />
    </>
  );
};
