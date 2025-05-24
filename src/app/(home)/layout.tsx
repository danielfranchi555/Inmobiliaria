import NavbarWrapper from "@/ui/Navbar/NavBarWrapper/NavBarWrapper";
import Footer from "@/ui/User/Footer/Footer";

const Layout = function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWrapper />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
