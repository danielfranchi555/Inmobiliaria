import Footer from "@/ui/User/Footer/Footer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <main className="flex-grow mb-20 ">{children}</main>
      <Footer />
    </div>
  );
}
