import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

export default function Card({
  children,
}: CardProps) {
  return (
    <div className="theme-card rounded-3xl p-8">
      {children}
    </div>
  );
}