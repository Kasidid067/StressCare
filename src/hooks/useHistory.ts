"use client";

import { useEffect, useState } from "react";

import { getHistory } from "@/services/history.service";
import type { HistoryData } from "@/types/history";

export function useHistory() {

    const [history, setHistory] = useState<HistoryData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function load() {

            const data =
                await getHistory();

            setHistory(data);

            setLoading(false);

        }

        load();

    }, []);

    return {

        history,

        loading,

    };

}