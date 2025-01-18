export const Colors = {
  primary: "primary",
  secondary: "secondary",
  white: "white",
  black: "black",
  current: "current",
  transparent: "transparent",
} as const;

export type Color = keyof typeof Colors;
