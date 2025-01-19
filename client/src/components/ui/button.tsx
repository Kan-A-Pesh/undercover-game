import type { ReactNode } from "react";
import type { Color } from "@/types/color";
import type { IconName } from "../icon";
import Icon from "../icon";
import clsx from "clsx";
import Text from "./text";

type Size = "sm" | "md";
type Type = "filled" | "outlined";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  color?: Color;
  size?: Size;
  type?: Type;
  children: ReactNode;
  icon?: IconName;
  onClick?: () => void;
}

function getPaddingFromSize(size: Size) {
  switch (size) {
    case "sm":
      return "px-4 h-8";
    case "md":
      return "px-6 h-10";
  }
}

function getColorFromType(type: Type, color: Color) {
  switch (type) {
    case "filled":
      return clsx(`bg-${color}`, getTextColorFromType(color));
    case "outlined":
      return clsx(`border border-${color} text-${color}`, `hover:bg-${color} hover:${getTextColorFromType(color)}`);
  }
}

function getTextColorFromType(color: Color) {
  return color === "black" || color === "primary" ? "text-white" : "text-black";
}

export default function Button({
  className,
  disabled,
  color = "primary",
  size = "md",
  type = "filled",
  children,
  icon,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "group",
        icon && "ps-2",
        icon && !children && "pe-2",
        disabled && "opacity-50 pointer-events-none",
        getPaddingFromSize(size),
        getColorFromType(type, color),
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <span className="flex items-center gap-2 relative group-hover:left-1">
        {icon && <Icon name={icon} color="current" size={24} />}
        {typeof children === "string" ? <Text color="current">{children}</Text> : children}
      </span>
    </button>
  );
}
