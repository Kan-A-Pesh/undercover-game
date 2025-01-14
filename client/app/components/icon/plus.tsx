import { colorToTwClass } from "~/types/color";
import type { IconSvgProps } from ".";

export default function Plus({ size, color }: IconSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={colorToTwClass(color!, "text")}
    >
      <path d="M14 20H10V14H4V10H10V4H14V10H20V14H14V20Z" fill="currentColor" />
    </svg>
  );
}
