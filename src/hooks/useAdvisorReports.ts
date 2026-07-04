"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getAdvisorReports,
} from "@/services/advisorReport.service";

export function useAdvisorReports() {

    const [

        reports,

        setReports,

    ] = useState<any[]>([]);

    const [

        loading,

        setLoading,

    ] = useState(true);

    async function load() {

        try {

            const data =
                await getAdvisorReports();

            setReports(data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        load();

    }, []);

    return {

        reports,

        loading,

        refresh: load,

    };

}