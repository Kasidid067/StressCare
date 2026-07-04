"use client";

import {
    useCallback,
    useEffect,
    useState,
} from "react";

import {
    getPulseHistory,
    measurePulse,
    PulseRecord,
} from "@/services/pulse.service";

export function usePulse() {
    const [
        records,
        setRecords,
    ] = useState<PulseRecord[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        measuring,
        setMeasuring,
    ] = useState(false);

    const refresh =
        useCallback(async () => {
            try {
                setLoading(true);
                const data =
                    await getPulseHistory();
                setRecords(data);
            } finally {
                setLoading(false);
            }
        }, []);
    useEffect(() => {
        void refresh();
    }, [refresh]);
    async function measure() {
        try {
            setMeasuring(true);
            await new Promise(resolve =>
                setTimeout(resolve, 2500)
            );
            const data =
                await measurePulse();
            await refresh();
            return data;
        } finally {
            setMeasuring(false);
        }
    }
    return {
        records,
        loading,
        measuring,
        measure,
        refresh,
    };
}