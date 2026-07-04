import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full rounded-xl bg-green-600 py-3 font-semibold text-white transition hover:bg-green-700 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
}