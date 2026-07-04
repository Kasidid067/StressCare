import type { SelectHTMLAttributes, ReactNode } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}
export default function Select({
  children,
  className = "",
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-xl border border-gray-300 bg-white p-3 focus:border-green-500 focus:outline-none ${className}`}
    >
      {children}
    </select>
  );
}