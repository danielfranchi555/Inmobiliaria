import Navbar from "@/ui/Navbar/Navbar";
import Footer from "@/ui/User/Footer/Footer";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <main className="flex-grow mb-20 ">{children}</main>
      <Footer />
    </div>
  );
};

export default layout;
