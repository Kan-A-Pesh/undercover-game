import clsx from "clsx";

interface MessageProps {
  children: React.ReactNode;
  className?: string;
}

export default function Message({ children, className }: MessageProps) {
  return (
    <div className={clsx("flex items-end", className)}>
      <svg width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 0H8V10H6V14H4V16H2V18H0V16H2V12H4V6H6V0Z" fill="white" />
      </svg>

      <div className="p-2 bg-white flex items-center justify-center min-h-8">{children}</div>
    </div>
  );
}
