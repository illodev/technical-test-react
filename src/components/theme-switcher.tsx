"use client";

import { CheckIcon, PaletteIcon } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { useCustomTheme } from "@/providers/custom-theme-provider";

interface ThemeSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof Button> {}

const ThemeSwitcher = React.forwardRef<HTMLButtonElement, ThemeSwitcherProps>(
  ({ className, ...props }, ref) => {
    const { setTheme: setMode, theme: resolvedTheme } = useTheme();
    const [config, setConfig] = useCustomTheme();

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="ghost"
            className={cn("h-8 w-8 px-0", className)}
            {...props}
          >
            <PaletteIcon className="h-5 w-5" />
            <span className="sr-only">Switch theme</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end">
          <div className="flex flex-col space-y-2">
            {themes.map((theme) => {
              const isActive = config.theme === theme.name;

              return (
                <Button
                  variant={"outline"}
                  size="lg"
                  key={theme.name}
                  onClick={() => {
                    setConfig({
                      ...config,
                      theme: theme.name,
                    });
                  }}
                  className={cn(
                    "h-auto justify-start px-3 py-3",
                    isActive && "ring ring-primary",
                  )}
                >
                  <span
                    className={cn(
                      "mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    )}
                    style={{
                      backgroundColor: `hsl(${
                        theme?.activeColor[
                          resolvedTheme === "dark" ? "dark" : "light"
                        ]
                      })`,
                    }}
                  >
                    {isActive && <CheckIcon className="h-5 w-5 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

ThemeSwitcher.displayName = "ThemeSwitcher";

export { ThemeSwitcher };
