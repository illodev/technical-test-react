"use client";

import {
  CheckIcon,
  ComputerIcon,
  MoonIcon,
  Redo2Icon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { themes } from "@/lib/themes";
import { cn } from "@/lib/utils";
import { useCustomTheme } from "@/providers/custom-theme-provider";

const modes = [
  {
    label: "Claro",
    value: "light",
    icon: SunIcon,
  },
  {
    label: "Oscuro",
    value: "dark",
    icon: MoonIcon,
  },
  {
    label: "Sistema",
    value: "system",
    icon: ComputerIcon,
  },
];

const ThemeCustomizer = () => {
  const { setTheme: setMode, theme: resolvedTheme } = useTheme();
  const [config, setConfig] = useCustomTheme();

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-1 flex-col space-y-4 md:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mode</CardTitle>
            <CardDescription>
              Select a mode to apply to the theme.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 lg:grid-cols-3">
            {modes.map((mode) => (
              <Button
                key={mode.value}
                variant={"outline"}
                size="lg"
                onClick={() => setMode(mode.value)}
                className={cn(
                  "px-3 py-3",
                  resolvedTheme === mode.value && "border-2 border-primary",
                )}
              >
                <mode.icon className="mr-1 -translate-x-1" />
                {mode.label}
              </Button>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
            <CardDescription>
              Select the theme you want to apply.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 lg:grid-cols-3">
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
                  style={
                    {
                      "--theme-primary": `hsl(${
                        theme?.activeColor[
                          resolvedTheme === "dark" ? "dark" : "light"
                        ]
                      })`,
                    } as React.CSSProperties
                  }
                >
                  <span
                    className={cn(
                      "mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[--theme-primary]",
                    )}
                  >
                    {isActive && <CheckIcon className="h-5 w-5 text-white" />}
                  </span>
                  {theme.label}
                </Button>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <div className="flex items-start">
        <Button
          variant="ghost"
          className="ml-auto rounded-lg"
          onClick={() => {
            setConfig({
              ...config,
              theme: "paper",
              radius: 0.5,
            });
          }}
        >
          <Redo2Icon className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export { ThemeCustomizer };
