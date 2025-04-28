"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const SearchUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (input: string) => {
    const params = new URLSearchParams(searchParams);
    if (input) {
      params.set("query", input);
    } else {
      params.delete("query");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex max-w-max relative items-center border border-gray-300 rounded-lg">
      <Input
        defaultValue={searchParams.get("query") || ""}
        placeholder="Search..."
        className="border-none pl-3 "
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Search className="text-gray-500 absolute right-2" size={18} />
    </div>
  );
};

export default SearchUser;
