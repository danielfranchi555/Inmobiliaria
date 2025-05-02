import { House } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "./Dropdown/Dropdown";
import { getSession } from "@/app/auth/sessionActions";
import { MobileMenu } from "./MenuMobile/MenuMobile";

const navLinks = [{ href: "/properties", label: "Properties" }];

const Navbar = async () => {
  const session = await getSession();

  return (
    <nav className=" w-full top-0 z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl gap-2 font-bold text-gray-800 flex items-center">
              <House color="white" />
              <h1 className="text-white font-medium">RealState</h1>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href="#properties"
                className="text-white px-3 py-2 text-sm  font-medium transition-all duration-300 border-b-1 border-transparent hover:border-white"
              >
                {link.label}
              </a>
            ))}
            <Dropdown session={session} />
          </div>

          {/* Mobile menu toggle + content */}
          <div className="md:hidden">
            <MobileMenu navLinks={navLinks} session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
