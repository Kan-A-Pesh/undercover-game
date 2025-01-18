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

interface IconProps {
  name: IconName;
  size?: number;
  color?: Color;
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
  zzz: Zzz,
} as const;

export default function Icon({ name, size = 24, color = "current" }: IconProps) {
  const IconComponent = icons[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-${color}`}
    >
      <IconComponent />
    </svg>
  );
}
