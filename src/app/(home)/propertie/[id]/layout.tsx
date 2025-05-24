import NavbarWrapper from "@/ui/Navbar/NavBarWrapper/NavBarWrapper";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen ">
      <NavbarWrapper />
      <main className="flex-grow mb-20 ">{children}</main>
    </div>
  );
}
