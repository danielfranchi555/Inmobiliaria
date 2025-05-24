"use client";
import { House, Search } from "lucide-react";
import Link from "next/link";
import { Dropdown } from "./Dropdown/Dropdown";
import { MobileMenu } from "./MenuMobile/MenuMobile";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#properties", label: "Propiedades" },
  { href: "/contact", label: "Contacto" },
];

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
      className="fixed w-full top-0 z-50"
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "w-full transition-all duration-300",
            !isHome
              ? "bg-white/95 backdrop-blur-md shadow-sm "
              : "bg-transparent"
          )}
        >
          <div className=" px-4 sm:px-6  flex justify-between items-center h-16 md:h-20 ">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center group relative"
              aria-label="Ir al inicio"
            >
              <motion.span
                className="text-2xl gap-3 font-bold flex items-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    isHome
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-[#4A60A1]/10 hover:bg-[#4A60A1]/20"
                  )}
                  whileHover={{ rotate: 12 }}
                >
                  <House
                    size={24}
                    className={cn(
                      "transition-colors duration-300",
                      isHome ? "text-white" : "text-[#4A60A1]"
                    )}
                  />
                </motion.div>
                <h1
                  className={cn(
                    "font-semibold tracking-tight transition-colors duration-300",
                    isHome ? "text-white drop-shadow-md" : "text-gray-800"
                  )}
                >
                  RealState
                </h1>
              </motion.span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex md:items-center md:space-x-1 ">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                      isHome
                        ? "text-white/90 hover:text-white"
                        : "text-gray-600 hover:text-[#4A60A1]",
                      isActive && !isHome && "text-[#4A60A1]"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4A60A1]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </Link>
                );
              })}
              <div className="pl-2">
                <Dropdown session={session} />
              </div>
            </div>

            {/* Mobile menu toggle + content */}
            <div className="md:hidden">
              <MobileMenu navLinks={navLinks} session={session} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
