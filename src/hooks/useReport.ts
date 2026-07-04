"use client";

import { useEffect, useState } from "react";
import { getReports } from "@/services/report.service";
import type { Report } from "@/types/report";
import type { ReportFilter } from "@/types/reportFilter";

export function useReport() {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<ReportFilter>({});

    useEffect(() => {
        async function load() {
            setLoading(true);
            try {
                const data =
                    await getReports(filter);
                setReports(data);
            }

            finally {
                setLoading(false);
            }

        }
        load();
    }, [filter]);

    return {
        reports,
        loading,
        filter,
        setFilter,
    };
}