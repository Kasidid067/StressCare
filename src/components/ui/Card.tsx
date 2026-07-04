import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      {children}
    </div>
  );
}