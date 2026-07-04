import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-gray-300 bg-white p-3 text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none ${className}`}
    />
  );
}