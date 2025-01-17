import type { ReactNode } from "react";
import type { Color } from "@/types/color";
import type { IconName } from "../icon";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  color?: Color;
  size?: "sm" | "md";
  type?: "filled" | "outlined";
  children: ReactNode;
  icon?: IconName;
}

export default function Button({ className }: ButtonProps) {
  return <button className={className} />;
  // TODO: implement
}
