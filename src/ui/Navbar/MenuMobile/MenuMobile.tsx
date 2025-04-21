"use client";

import { LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteSession } from "@/app/auth/sessionActions";

export const MobileMenu = ({
  navLinks,
  userData,
}: {
  navLinks: { href: string; label: string }[];
  userData: any;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-700 hover:text-gray-900"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute bg-white shadow-lg top-16 left-0 w-full flex flex-col space-y-2 px-6 py-4 z-50">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 py-2 rounded-md text-base font-medium"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {userData && (
            <div className="border-t pt-4 mt-2 flex flex-col gap-2 text-gray-800">
              <span className="text-sm">Hello, {userData.name}</span>
              <Button
                onClick={async () => {
                  await deleteSession();
                  setOpen(false);
                }}
                variant="outline"
                className="flex items-center gap-2 justify-start w-full bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md"
              >
                <LogOut size={18} />
                Log Out
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
