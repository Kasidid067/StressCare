"use client";

import { useCallback, useEffect, useState } from "react";
import { getActivities } from "@/services/activity.service";
import type { Activity } from "@/types/activity";

export function useActivities() {

    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getActivities();
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