export const Colors = {
  primary: "primary",
  secondary: "secondary",
  white: "white",
  black: "black",
} as const;

export type Color = keyof typeof Colors;
