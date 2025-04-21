import { House } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "./Dropdown/Dropdown";
import { cookies } from "next/headers";
import { decrypt } from "@/app/auth/sessionActions";
import { getUserData } from "@/app/auth/actions";
import { MobileMenu } from "./MenuMobile/MenuMobile";
// import { MobileMenu } from "./MobileMenu";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/contact", label: "Contact" },
];

const Navbar = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("session")?.value;
  const session = await decrypt(cookie);
  const id = session?.userId;
  const { message, success, user } = await getUserData(id as string);

  if (!success || !user) {
    return null; // Handle error or redirect
  }

  return (
    <nav className="bg-white shadow-md w-full top-0 z-50">
      <div className="w-full px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center">
            <span className="text-2xl gap-2 font-bold text-gray-800 flex items-center">
              <House color="green" />
              <h1 className="text-green-500">RealState</h1>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {user && (
              <div>
                {/* Render data */}Hello, {user.name}
              </div>
            )}
            <Dropdown />
          </div>

          {/* Mobile menu toggle + content */}
          <div className="md:hidden">
            <MobileMenu navLinks={navLinks} userData={user} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
