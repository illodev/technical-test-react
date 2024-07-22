"use client";

import { Provider, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import * as React from "react";

import { Theme } from "@/lib/themes";

type Config = {
  theme: Theme["name"];
  radius: number;
};

type CustomThemeProviderProps = {
  children: React.ReactNode;
};

const DEFAULT_CONFIG: Config = {
  theme: "base",
  radius: 0.5,
};

const configAtom = atomWithStorage<Config>(
  "theme-configuration",
  DEFAULT_CONFIG,
);

const ThemeSwitcher = ({ children }: { children: React.ReactNode }) => {
  const [config] = useCustomTheme();

  React.useLayoutEffect(() => {
    document.body.classList.forEach((className) => {
      if (className.match(/^theme.*/)) {
        document.body.classList.remove(className);
      }
    });

    if (config.theme) {
      document.body.classList.add(`theme-${config.theme}`);
    }
  }, [config]);

  return <div className={`theme-${config.theme}`}>{children}</div>;
};

export const CustomThemeProvider: React.FC<CustomThemeProviderProps> = ({
  children,
}) => {
  return (
    <Provider>
      <ThemeSwitcher>{children}</ThemeSwitcher>
    </Provider>
  );
};

export const useCustomTheme = () => {
  return useAtom(configAtom);
};
