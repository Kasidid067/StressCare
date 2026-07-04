"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";
import { getStudentActivities }
    from "@/services/studentActivity.service";
import type { Activity }
    from "@/types/activity";

export function useStudentActivities() {

    const [
        activities,
        setActivities,
    ] =
        useState<Activity[]>([]);

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    const refresh =
        useCallback(async () => {
            try {
                setLoading(true);
                const data =
                    await getStudentActivities();
                setActivities(data);
            } finally {
             setLoading(false);
            }
        }, []);
    useEffect(() => {
        void refresh();
    }, [refresh]);
    return {
        activities,
        loading,
        refresh,
    };
}