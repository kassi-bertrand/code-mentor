"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { LogOut } from "lucide-react";
import Logo from "@/assets/logo-base-256x256.png";
import Image from "next/image";

interface AccountProps {
  isCollapsed: boolean;
}

export function AccountDropdown({ isCollapsed }: AccountProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 cursor-pointer ",
            isCollapsed &&
              "flex h-9 w-9 shrink-0 items-center justify-center p-0"
          )}
        >
          {/* Code mentor Icon */}
          <Image
            src={Logo}
            alt="Logo"
            width={36}
            height={36}
            className="mr-2"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2">
        <div
          className="flex items-center gap-2 cursor-pointer text-red-500"
          onClick={() => console.log("Log out clicked")} // Replace with actual logout logic
        >
          <LogOut className="h-4 w-4" />
          <span>Log out</span>
        </div>
      </PopoverContent>
    </Popover>
  );
}
