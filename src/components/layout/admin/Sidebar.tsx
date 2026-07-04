"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "📊",
  },
  {
    title: "ผู้ใช้งาน",
    href: "/admin/users",
    icon: "👤",
  },
  {
    title: "สาขา",
    href: "/admin/majors",
    icon: "🎓",
  },
  {
    title: "กิจกรรม",
    href: "/admin/activities",
    icon: "🏃",
  },
  {
    title: "รายงาน",
    href: "/admin/reports",
    icon: "📄",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 flex-col bg-green-700 text-white">

      <div className="border-b border-green-600 p-6">

        <h1 className="text-3xl font-bold">
          StressCare
        </h1>

        <p className="mt-2 text-green-100">
          Admin Panel
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
                ? "bg-white font-semibold text-green-700"
                : "hover:bg-green-600"
            }
            `}
          >

            <span>
              {menu.icon}
            </span>

            {menu.title}

          </Link>

        ))}

      </nav>

    </aside>
  );
}