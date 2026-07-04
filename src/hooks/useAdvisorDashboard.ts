"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getAdvisorDashboard,
} from "@/services/advisorDashboard.service";

export function useAdvisorDashboard() {

    const [
        data,
        setData,
    ] = useState<any>(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const refresh =
        useCallback(async () => {

            try {

                setLoading(true);

                const res =
                    await getAdvisorDashboard();

                setData(res);

            } finally {

                setLoading(false);

            }

        }, []);

    useEffect(() => {

        void refresh();

    }, [refresh]);

    return {

        data,

        loading,

        refresh,

    };

}