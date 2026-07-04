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
    <section className="rounded-2xl bg-white p-6 shadow">

      <h2 className="mb-6 text-xl font-bold text-green-700">
        {title}
      </h2>

      {children}

    </section>
  );
}