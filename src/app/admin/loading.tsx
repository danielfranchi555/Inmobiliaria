import React from "react";
import { Loader } from "lucide-react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-center gap-2">
        <span>Loading</span> <Loader />
      </div>
    </div>
  );
};

export default loading;
