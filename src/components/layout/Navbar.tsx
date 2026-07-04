"use client";

import { Bell } from "lucide-react";
import { useSession } from "next-auth/react";
import LogoutButton from "@/components/common/LogoutButton";

export default function Navbar() {
    const { data: session } = useSession();
    const user = session?.user;
    return (

        <header className="flex h-16 items-center justify-between border-b bg-white px-8 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold text-green-700">
                    StressCare
                </h1>
            </div>

            <div className="flex items-center gap-6">
                <button
                    className="relative"
                >
                    <Bell size={22} />
                    <span
                        className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"
                    />
                </button>

                <div className="text-right">
                    <p className="font-semibold">
                        {user?.name}
                    </p>
                    <p className="text-sm uppercase text-gray-500">
                        {user?.role}
                    </p>
                </div>

                <div
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold"
                >
                    {user?.name?.charAt(0)}
                </div>
                <LogoutButton />
            </div>
        </header>
    );
}