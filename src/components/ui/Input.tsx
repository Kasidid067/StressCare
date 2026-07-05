import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[var(--content-text)] placeholder:text-[var(--content-muted)] focus:border-green-500 focus:outline-none ${className}`}
    />
  );
}