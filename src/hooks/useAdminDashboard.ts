"use client";

import { useEffect, useState } from "react";

import { getAdminDashboard } from "@/services/adminDashboard.service";

import type {
    AdminDashboard,
} from "@/types/adminDashboard";

export function useAdminDashboard() {

    const [dashboard, setDashboard] =
        useState<AdminDashboard | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            try {

                const data =
                    await getAdminDashboard();

                setDashboard(data);

            } finally {

                setLoading(false);

            }

        }

        load();

    }, []);

    return {

        dashboard,

        loading,

    };

}