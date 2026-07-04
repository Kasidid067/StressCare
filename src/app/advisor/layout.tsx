import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/advisor/Sidebar";

export default function AdvisorLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">

          {children}

        </main>

      </div>

    </div>
  );
}