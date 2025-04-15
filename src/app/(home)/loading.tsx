import { Ellipsis } from "lucide-react";
import React from "react";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="mr-2">Loading</span>
      <Ellipsis size={30} className="animate-pulse text-gray-500" />
    </div>
  );
}
