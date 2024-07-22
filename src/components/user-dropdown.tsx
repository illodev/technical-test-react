"use client";

import { LogOutIcon, UserCircleIcon } from "lucide-react";
import { DefaultSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface UserDropdownProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  user: DefaultSession["user"];
}

const UserDropdown = React.forwardRef<HTMLButtonElement, UserDropdownProps>(
  ({ user, className, ...props }, ref) => {
    const handleLogout = async () => {
      await signOut();
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn("relative h-8 w-8 rounded-full", className)}
            {...props}
          >
            <Avatar className="h-8 w-8">
              {user?.image ? (
                <AvatarImage
                  src={user?.image}
                  alt={user?.name ?? "User avatar"}
                />
              ) : (
                <AvatarFallback>SC</AvatarFallback>
              )}
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile/details">
                <UserCircleIcon className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={handleLogout}>
            <LogOutIcon className="h-4 w-4 mr-2" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

UserDropdown.displayName = "UserDropdown";

export { UserDropdown };
