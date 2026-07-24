"use client";
import NavLink from "@/types/navLink";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

export default function MobileNav({ links }: { links: NavLink[] }) {
  return (
    <div className="flex flex-col gap-2 md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu className="w-6 h-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {links.map((link) => (
            <DropdownMenuItem
              key={link.href}
              onClick={() => {
                link.href && window.location.assign(link.href.toString());
              }}
            >
              {link.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
