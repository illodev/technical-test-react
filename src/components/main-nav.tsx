"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

interface MainNavProps extends React.ComponentPropsWithoutRef<"nav"> {}

const MainNav = React.forwardRef<HTMLDivElement, MainNavProps>(
    ({ className, onClick, ...props }, ref) => {
        const pathmame = usePathname();

        return (
            <nav
                ref={ref}
                className={cn(
                    "items-center gap-4 lg:gap-6 hidden lg:flex",
                    className
                )}
                {...props}
            >
                <Link
                    href="/dashboard"
                    className={cn(
                        "text-base font-medium",
                        pathmame === "/dashboard"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary transition-colors"
                    )}
                    onClick={onClick}
                >
                    Dashboard
                </Link>
                <Link
                    href="/dashboard/projects"
                    className={cn(
                        "text-base font-medium",
                        pathmame === "/dashboard/projects"
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary transition-colors"
                    )}
                    onClick={onClick}
                >
                    Projects
                </Link>
            </nav>
        );
    }
);

MainNav.displayName = "MainNav";

export { MainNav };
