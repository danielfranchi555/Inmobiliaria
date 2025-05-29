"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteSession } from "@/app/auth/sessionActions";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type SessionData = {
  userId: string;
  role: "ADMIN" | "USER";
  name?: string;
} | null;

const menuVariants = {
  closed: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
    },
  }),
};

export const MobileMenu = ({
  navLinks,
  session,
}: {
  navLinks: { href: string; label: string }[];
  session: SessionData;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Prevent scroll when menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div>
      <motion.button
        onClick={() => setOpen(!open)}
        className={`${
          isHome ? "text-white" : "text-gray-700"
        } p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 z-50 relative`}
        whileTap={{ scale: 0.95 }}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 bg-gradient-to-b from-gray-900/95 to-gray-900/98 backdrop-blur-xl flex flex-col min-h-screen z-40"
          >
            <motion.div
              className="flex-1 flex flex-col items-center justify-center space-y-8 text-center px-6 py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {/* User Info */}
              {session && (
                <motion.div
                  className="flex flex-col items-center gap-4 mb-8"
                  variants={itemVariants}
                  custom={0}
                >
                  <div className="relative w-24 h-24">
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-75 blur-lg"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                    <div className="relative w-full h-full rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
                      <span className="text-3xl font-semibold text-gray-800">
                        {session.name?.[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <motion.span
                    className="text-2xl font-medium text-white"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Hello, {session.name}
                  </motion.span>
                </motion.div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2  w-full">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    variants={itemVariants}
                    custom={session ? i + 1 : i}
                    onClick={() => setOpen(false)}
                    className="block w-full text-2xl font-medium text-white/90 hover:text-white py-3 px-6 rounded-xl hover:bg-white/5 transition-all duration-300"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Auth Buttons */}
              <motion.div
                className=" w-full px-6"
                variants={itemVariants}
                custom={navLinks.length + 1}
              >
                {session ? (
                  <Button
                    onClick={async () => {
                      await deleteSession();
                      setOpen(false);
                    }}
                    variant="outline"
                    className="w-full flex items-center gap-3 justify-center bg-red-500/90 hover:bg-red-600/90 text-white py-6 rounded-2xl text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <LogOut size={20} />
                    Log Out
                  </Button>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setOpen(false)}
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 rounded-2xl text-lg font-medium backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Log in
                  </Link>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
