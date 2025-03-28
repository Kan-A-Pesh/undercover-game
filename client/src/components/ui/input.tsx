import clsx from "clsx";

interface BaseInputProps {
  className?: string;
}

type InputProps = BaseInputProps & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx("border border-white/75 px-3 py-2 text-white bg-white/10 font-body text-paragraph", className)}
      {...props}
    />
  );
}
