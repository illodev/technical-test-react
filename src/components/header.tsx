import { DefaultSession } from "next-auth";
import Link from "next/link";
import * as React from "react";

import { Logo } from "@/components/logo";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "@/components/user-dropdown";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { Drawer, DrawerClose, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { ScrollArea } from "./ui/scroll-area";

interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    user?: DefaultSession["user"];
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
    ({ user, className, ...props }, ref) => {
        return (
            <header
                ref={ref}
                className={cn("border-b bg-muted/20", className)}
                {...props}
            >
                <div className="flex items-center px-4 lg:px-8 py-4 gap-4">
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0 xl:hidden"
                            >
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle navigation menu
                                </span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="mt-0 flex h-dvh flex-col gap-2 p-0">
                            <div className="flex-grow overflow-hidden">
                                <ScrollArea className="h-full py-2">
                                    <DrawerClose asChild>
                                        <MainNav className="flex flex-col items-start gap-2 px-4" />
                                    </DrawerClose>
                                </ScrollArea>
                            </div>
                        </DrawerContent>
                    </Drawer>
                    <Link href={user ? "/dashboard" : "/"}>
                        <Logo className="h-10" />
                    </Link>
                    <MainNav className="mx-16" />

                    <div className="ml-auto flex items-center space-x-4">
                        <ThemeSwitcher />
                        <ModeToggle />
                        {user ? (
                            <UserDropdown user={user} />
                        ) : (
                            <Link href="/login" className={buttonVariants({})}>
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </header>
        );
    }
);

Header.displayName = "Header";

export { Header };
