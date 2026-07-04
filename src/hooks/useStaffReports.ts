"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStaffReports,
} from "@/services/staffReport.service";

export function useStaffReports() {

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
                await getStaffReports();

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