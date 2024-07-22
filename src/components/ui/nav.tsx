"use client";

import { cva } from "class-variance-authority";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import * as React from "react";

import { cn } from "@/lib/utils";

const navListVariants = cva("hidden-scroll-bar gap-2", {
    variants: {
        direction: {
            vertical:
                "relative flex flex-col border-r lg:-ml-[max(env(safe-area-inset-left),1.5rem)]",
            horizontal:
                "sticky top-0 z-10 flex items-center h-14 overflow-x-auto border-b pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)] backdrop-blur-sm",
        },
    },
    defaultVariants: {
        direction: "horizontal",
    },
});

const showOnHoverVariants = cva(
    "pointer-events-none absolute rounded-lg bg-primary/10 data-[active=true]:opacity-100 data-[active=true]:transition-all data-[active=true]:duration-300 data-[active=true]:ease-in-out data-[active=false]:opacity-0 data-[active=false]:delay-75",
    {
        variants: {
            direction: {
                vertical: "left-2.5 right-2.5 bottom-0 top-0",
                horizontal: "bottom-2.5 left-0 right-0 top-2.5",
            },
        },
        defaultVariants: {
            direction: "horizontal",
        },
    }
);

interface NavListProps extends React.ComponentPropsWithoutRef<"div"> {
    direction?: "horizontal" | "vertical";
    matchBehavior?: "startsWith" | "exact";
}

const NavList = React.forwardRef<HTMLDivElement, NavListProps>(
    (
        {
            className,
            children,
            matchBehavior = "startsWith",
            direction = "horizontal",
            ...props
        },
        ref
    ) => {
        const pathname = usePathname();
        const params = useParams();
        const [hoveredElement, setHoveredElement] =
            React.useState<HTMLAnchorElement>();
        const [isActivedHovered, setIsActivedHovered] = React.useState(false);

        const refs = React.useRef<Record<string, HTMLAnchorElement>>({});

        const match = React.useCallback(
            (href: string, path: string) => {
                if (matchBehavior === "exact") {
                    return href === path;
                }

                if (matchBehavior === "startsWith") {
                    return path.startsWith(href);
                }

                return false;
            },
            [matchBehavior]
        );

        const triggers = React.useMemo(() => {
            return React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    const { href, ...props } = child.props;

                    const isActive = match(href, pathname);

                    return React.cloneElement(child, {
                        ref: (el: HTMLAnchorElement) => {
                            refs.current[href] = el;
                        },
                        onMouseEnter: () => {
                            setHoveredElement(refs.current[href]);
                            setIsActivedHovered(true);
                        },
                        onMouseLeave: () => {
                            setIsActivedHovered(false);
                        },
                        "aria-current": isActive ? "page" : undefined,
                        "data-state": isActive ? "active" : undefined,
                        direction,
                        href,
                        ...props,
                    });
                }
            });
        }, [children, pathname, params, direction, match]);

        React.useEffect(() => {
            const el = refs.current[pathname];

            if (el) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }, [pathname]);

        return (
            <nav
                ref={ref}
                className={cn(
                    navListVariants({
                        direction,
                        className,
                    })
                )}
                {...props}
            >
                {triggers}
                <div
                    className={cn(
                        showOnHoverVariants({
                            direction,
                            className,
                        })
                    )}
                    data-active={isActivedHovered ? "true" : "false"}
                    style={{
                        ...(direction === "vertical" && {
                            transform: `translateY(${hoveredElement?.offsetTop ?? 0}px)`,
                            height: `${hoveredElement?.offsetHeight ?? 0}px`,
                        }),
                        ...(direction === "horizontal" && {
                            transform: `translateX(${hoveredElement?.offsetLeft ?? 0}px)`,
                            width: `${hoveredElement?.offsetWidth ?? 0}px`,
                        }),
                    }}
                />
            </nav>
        );
    }
);

NavList.displayName = "NavList";

const navTriggerVariants = cva(
    "relative inline-flex items-center whitespace-nowrap rounded-lg text-sm font-medium text-muted-foreground/80 ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-foreground data-[state=active]:font-semibold",
    {
        variants: {
            direction: {
                vertical: "py-2 px-6",
                horizontal:
                    "px-3 py-4 justify-center data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-primary data-[state=active]:after:content-['']",
            },
        },
        defaultVariants: {
            direction: "horizontal",
        },
    }
);

interface NavTriggerProps extends React.ComponentPropsWithoutRef<typeof Link> {
    direction?: "horizontal" | "vertical";
}

const NavTrigger = React.forwardRef<HTMLAnchorElement, NavTriggerProps>(
    ({ className, direction, ...props }, ref) => {
        return (
            <Link
                ref={ref}
                className={cn(
                    navTriggerVariants({
                        direction,
                        className,
                    })
                )}
                {...props}
            />
        );
    }
);
NavTrigger.displayName = "NavTrigger";

export { NavList, NavTrigger };
