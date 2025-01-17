import type { Color } from "~/types/color";
import Plus from "./plus";

interface IconProps {
  name: IconName;
  size?: number;
  color?: Color;
}

export type IconName = keyof typeof icons;

export type IconSvgProps = Omit<IconProps, "name">;

const icons = {
  plus: Plus,
} as const;

export default function Icon({ name, size = 24, color = "primary" }: IconProps) {
  const IconComponent = icons[name];
  return <IconComponent size={size} color={color} />;
}
