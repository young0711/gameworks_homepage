"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Briefcase, FileText, LogOut } from "lucide-react";

export function UserDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full transition-opacity hover:opacity-80 focus:outline-none">
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarFallback className="bg-white/10 text-sm text-white">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium text-white md:inline">{user.name}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex cursor-pointer items-center">
            <User className="mr-2 h-4 w-4" />
            내 프로필
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/career" className="flex cursor-pointer items-center">
            <Briefcase className="mr-2 h-4 w-4" />
            커리어
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/board" className="flex cursor-pointer items-center">
            <FileText className="mr-2 h-4 w-4" />
            게시판
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive focus:text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          로그아웃
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
