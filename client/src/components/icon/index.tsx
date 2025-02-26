import { Color } from "@/types/color";
import Plus from "./svgs/plus";
import Login from "./svgs/login";
import ChevronDown from "./svgs/chevron-down";
import Cross from "./svgs/cross";
import Crown from "./svgs/crown";
import Logout from "./svgs/logout";
import Message from "./svgs/message";
import Refresh from "./svgs/refresh";
import Scroll from "./svgs/scroll";
import Zzz from "./svgs/zzz";
import Sound from "./svgs/sound";
import Stars from "./svgs/stars";
import Target from "./svgs/target";
import Word from "./svgs/word";
import clsx from "clsx";

export interface IconProps {
  name: IconName;
  size?: number;
  color?: Color;
  className?: string;
}

export type IconName = keyof typeof icons;

export type IconSvgProps = Omit<IconProps, "name">;

const icons = {
  chevronDown: ChevronDown,
  cross: Cross,
  crown: Crown,
  login: Login,
  logout: Logout,
  message: Message,
  plus: Plus,
  refresh: Refresh,
  scroll: Scroll,
  sound: Sound,
  stars: Stars,
  target: Target,
  word: Word,
  zzz: Zzz,
} as const;

export default function Icon({ name, size = 24, color = "current", className }: IconProps) {
  const IconComponent = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={clsx(`text-${color}`, className)}
    >
      <IconComponent />
    </svg>
  );
}
