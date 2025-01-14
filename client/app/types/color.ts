export type Color = "primary" | "white" | "black";

export const colorToTwClass = (color: Color, twClass: "text" | "bg") => {
  return `${twClass}-${color}`;
};
