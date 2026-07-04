import type { ReactNode } from "react";

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/admin/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-6">
          {children}
        </main>

      </div>

    </div>
  );
}