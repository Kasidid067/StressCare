"use client";

import { Bell, Moon, Sun } from "lucide-react";
import LogoutButton from "@/components/common/LogoutButton";
import { useTheme } from "@/components/providers/ThemeProvider";

type NavbarProps = {
    name?: string;
    role?: string;
};

export default function Navbar({
    name = "Guest",
    role = "Viewer",
}: NavbarProps) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 px-6 py-4 shadow-sm backdrop-blur">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-[var(--accent-strong)]">
                        StressCare
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Wellness dashboard
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-2.5 transition hover:scale-105"
                        aria-label="Toggle theme"
                    >
                        {theme === "dark" ? (
                            <Sun size={18} />
                        ) : (
                            <Moon size={18} />
                        )}
                    </button>

                    <button className="relative rounded-full border border-[var(--border)] bg-[var(--surface-muted)] p-2.5">
                        <Bell size={18} />
                        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
                    </button>

                    <div className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface-muted)] px-3 py-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-teal-500 to-blue-500 font-semibold text-white">
                            {name.charAt(0).toUpperCase()}
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-semibold">{name}</p>
                            <p className="text-xs uppercase text-gray-500 dark:text-gray-400">
                                {role}
                            </p>
                        </div>
                    </div>

                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}