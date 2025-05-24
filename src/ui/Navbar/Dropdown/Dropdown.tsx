"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { deleteSession } from "@/app/auth/sessionActions";
import Link from "next/link";
import { usePathname } from "next/navigation";

type DropdownProps = {
  session: {
    userId: string;
    role: "ADMIN" | "USER";
    name?: string;
  } | null;
};

export const Dropdown = ({ session }: DropdownProps) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="group flex items-center gap-2 cursor-pointer hover:bg-[#4A60A1] px-3 py-2 rounded-md transition-colors">
              <Avatar>
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <span
                className={`transition-colors ${
                  session
                    ? "group-hover:text-white text-black" // Si hay sesión
                    : isHome
                      ? "text-white"
                      : "text-black"
                }`}
              >
                {session ? (
                  session.name
                ) : (
                  <Link
                    href={"/auth/login"}
                    className={`${isHome ? "text-white" : "text-black"}`}
                  >
                    Sign In
                  </Link>
                )}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await deleteSession();
              }}
              className="cursor-pointer"
            >
              <span className="flex items-center justify-between w-full">
                Sign Out
                <LogOut className="ml-2 h-4 w-4" />
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link
          href={"/auth/login"}
          className={`${isHome ? "text-white" : "text-black"} flex items-center gap-1 px-3 py-2   font-medium transition-all duration-300 border-b-1 border-transparent `}
        >
          <User />
          Sign in
        </Link>
      )}
    </>
  );
};
