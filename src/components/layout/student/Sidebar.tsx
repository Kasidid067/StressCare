"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  { title: "Dashboard", href: "/student/dashboard", icon: "🏠" },
  { title: "วัดชีพจร", href: "/student/pulse", icon: "❤️" },
  { title: "แบบประเมิน ST-5", href: "/student/assessment", icon: "📝" },
  { title: "ประวัติการประเมิน", href: "/student/assessment-history", icon: "📋" },
  { title: "กิจกรรมแนะนำ", href: "/student/activity", icon: "🎯" },
  { title: "ประวัติการทำกิจกรรม", href: "/student/history", icon: "📖" },
  { title: "โปรไฟล์", href: "/student/profile", icon: "👤" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="rounded-3xl bg-gradient-to-br from-teal-500 to-blue-500 p-5 text-white shadow-lg">
        <h2 className="text-2xl font-bold">StressCare</h2>
        <p className="mt-1 text-sm text-white/80">Student Portal</p>
      </div>

      <nav className="mt-4 flex-1 space-y-2">
        {menus.map((menu) => {
          const active = pathname.startsWith(menu.href);
          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-teal-500 text-white shadow"
                  : "text-[var(--foreground)] hover:bg-[var(--surface-muted)]"
              }`}
            >
              <span className="text-lg">{menu.icon}</span>
              {menu.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}