import { Color } from "@/types/color";
import clsx from "clsx";

type Font = "title" | "body";
type Type = "display" | "title" | "paragraph" | "caption";

interface TextProps {
  type?: Type;
  color?: Color;
  font?: Font;
  className?: string;
  children?: React.ReactNode;
}

const getCompFromType = (type: Type) => {
  switch (type) {
    case "display":
      return "h1";
    case "title":
      return "h2";
    case "paragraph":
      return "p";
    case "caption":
      return "span";
  }
};

const getFontFromType = (type: Type): Font => {
  switch (type) {
    case "display":
      return "title";
    case "title":
      return "title";
    case "paragraph":
      return "body";
    case "caption":
      return "body";
  }
};

export default function Text({ type = "paragraph", color = "white", font, className, children }: TextProps) {
  const Component = getCompFromType(type);
  const fontClass = font ?? getFontFromType(type);

  return (
    <Component className={clsx(`text-${type}`, `font-${fontClass}`, `text-${color}`, className)}>{children}</Component>
  );
}
