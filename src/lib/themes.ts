export const themes = [
  {
    name: "base",
    label: "Base",
    activeColor: {
      light: "240 5.9% 10%",
      dark: "0 0% 98%",
    },
  },
  {
    name: "paper",
    label: "Paper",
    activeColor: {
      light: "0 0% 98%;",
      dark: "36 45% 70%",
    },
  },
  {
    name: "night",
    label: "Night",
    activeColor: {
      light: "240 0% 90%",
      dark: "240 0% 90%",
    },
  },
] as const;

export type Theme = (typeof themes)[number];
