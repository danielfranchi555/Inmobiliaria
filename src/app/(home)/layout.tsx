"use client";
import Footer from "@/ui/User/Footer/Footer";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      <main className={`flex-grow  `}>{children}</main>
      <Footer />
    </div>
  );
}
