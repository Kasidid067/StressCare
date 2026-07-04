"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import { getAssessmentHistory }
    from "@/services/assessmentHistory.service";

export function useAssessmentHistory() {

    const [
        history,
        setHistory,
    ] = useState<any[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const refresh =
        useCallback(async () => {

            try {

                setLoading(true);

                const data =
                    await getAssessmentHistory();

                setHistory(data);

            } finally {

                setLoading(false);

            }

        }, []);

    useEffect(() => {

        void refresh();

    }, [refresh]);

    return {

        history,

        loading,

        refresh,

    };

}