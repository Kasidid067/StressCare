"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/adminUser.service";
import type { AdminUser } from "@/types/adminUser";

export function useAdminUsers() {
    const [users, setUsers] =
        useState<AdminUser[]>([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function load() {
            const data = await getUsers();

            setUsers(data);

            setLoading(false);
        }

        load();
    }, []);

    return {
        users,
        loading,
    };
}