import type { ReactNode } from "react";

interface DashboardSectionProps {
  title: string;
  children: ReactNode;
}

export default function DashboardSection({
  title,
  children,
}: DashboardSectionProps) {
  return (
    <section className="theme-card rounded-2xl p-6">

      <h2 className="mb-6 text-xl font-bold text-[var(--accent-strong)]">
        {title}
      </h2>

      {children}

    </section>
  );
}