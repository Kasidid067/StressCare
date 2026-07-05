"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/auth/login",
        })
      }
      className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2.5 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
    >
      <LogOut size={16} />
      ออกจากระบบ
    </button>
  );
}