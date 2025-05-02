import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import React from "react";

const SkeletonListProperties = () => {
  return (
    <div id="properties" className="w-full flex flex-col gap-8">
      <h3 className="text-2xl font-bold">List Properties</h3>
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="hover:scale-101 h-auto transition-all duration-300 ease-in-out shadow-md cursor-pointer p-0 pb-5 w-full animate-pulse"
          >
            <CardHeader className="p-0 relative">
              <div className="relative w-full h-[250px] bg-gray-300 rounded-t-lg" />
              <div className="absolute bottom-3 left-1">
                <Badge className="bg-gray-400 w-16 h-6 rounded-md" />
              </div>
            </CardHeader>
            <CardFooter className="grid m-0 gap-2 p-4">
              <div className="flex items-center gap-1">
                <MapPin size={18} className="text-gray-400" />
                <div className="h-4 w-2/3 bg-gray-300 rounded" />
              </div>
              <div className="h-5 bg-gray-300 rounded w-3/4" />
              <div className="h-4 bg-gray-300 rounded w-full mb-2" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                  <div className="h-4 w-16 bg-gray-300 rounded" />
                </div>
                <div className="h-6 w-24 bg-gray-300 rounded" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SkeletonListProperties;
