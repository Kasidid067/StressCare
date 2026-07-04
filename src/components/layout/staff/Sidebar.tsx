"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/staff/dashboard",
    icon: "📊",
  },
  {
    title: "นักศึกษา",
    href: "/staff/students",
    icon: "👨‍🎓",
  },
  {
    title: "รายงาน",
    href: "/staff/reports",
    icon: "📄",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-orange-600 text-white">

      <div className="border-b border-orange-500 p-6">

        <h1 className="text-3xl font-bold">
          StressCare
        </h1>

        <p className="mt-2 text-orange-100">
          Staff
        </p>

      </div>

      <nav className="flex-1 space-y-2 p-4">

        {menus.map((menu) => (

          <Link
            key={menu.href}
            href={menu.href}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

            ${
              pathname.startsWith(menu.href)
                ? "bg-white font-semibold text-orange-700"
                : "hover:bg-orange-500"
            }
            `}
          >

            <span>{menu.icon}</span>

            {menu.title}

          </Link>

        ))}

      </nav>

    </aside>
  );
}