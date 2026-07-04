"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getActivityLogs,
} from "@/services/activityLog.service";

import type {
    ActivityLog,
} from "@/types/activityLog";

export function useActivityLog() {
    const [
        logs,
        setLogs,
    ] = useState<ActivityLog[]>([]);
    const [
        loading,
        setLoading,
    ] = useState(true);
    const refresh =
        useCallback(async () => {
            try {
                setLoading(true);
                const data = await getActivityLogs();
                setLogs(data);
            } finally {
                setLoading(false);
            }
        }, []);

    useEffect(() => {
        void refresh();
    }, [refresh]);

    return {
        logs,
        loading,
        refresh,
    };
}