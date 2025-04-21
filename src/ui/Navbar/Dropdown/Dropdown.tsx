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
import { Button } from "@/components/ui/button";

type DropdownProps = {
  userData?: {
    name: string;
    email: string;
  };
};

export const Dropdown = ({ userData }: DropdownProps) => {
  return (
    <>
      {userData ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition-colors">
              <Avatar>
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <span>
                {userData ? (
                  userData.name
                ) : (
                  <Link href={"/auth/login"}>Sign In</Link>
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
        <Link href={"/auth/login"}>Sign in</Link>
      )}
    </>
  );
};
