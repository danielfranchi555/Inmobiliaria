"use client";
import { House } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "./Dropdown/Dropdown";
import { MobileMenu } from "./MenuMobile/MenuMobile";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navLinks = [{ href: "/properties", label: "Properties" }];

type sessionProps = {
  session: {
    userId: string;
    role: "ADMIN" | "USER";
    name?: string;
  } | null;
};

const Navbar = ({ session }: sessionProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full top-0 z-50 backdrop-blur-sm bg-opacity-80"
    >
      <div
        className={`w-full  ${!isHome ? "bg-white/80 shadow-lg" : "bg-transparent"} transition-all duration-300`}
      >
        <div className="px-6 mx-auto flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group">
            <motion.span className="text-2xl gap-3 font-bold flex items-center">
              <div
                className={`p-2 rounded-lg ${isHome ? "bg-white/10" : "bg-black/5"} transition-colors duration-300`}
              >
                <House
                  size={24}
                  color={`${isHome ? "white" : "black"}`}
                  // className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <h1
                className={`${
                  isHome ? "text-white drop-shadow-md" : "text-gray-800"
                } font-semibold tracking-tight transition-colors duration-300`}
              >
                RealState
              </h1>
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href="#properties"
                className={`
                  ${isHome ? "text-white" : "text-gray-800"}
               text-[18px]
                `}
              >
                {link.label}
              </motion.a>
            ))}
            <div className="pl-4">
              <Dropdown session={session} />
            </div>
          </div>

          {/* Mobile menu toggle + content */}
          <div className="md:hidden">
            <MobileMenu navLinks={navLinks} session={session} />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
