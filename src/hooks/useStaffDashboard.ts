"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStaffDashboard,
} from "@/services/staffDashboard.service";

export function useStaffDashboard() {
    const [
        data,
        setData,
    ] = useState<any>(null);
    const [
        loading,
        setLoading,
    ] = useState(true);
    async function load() {
        try {
            const result =
                await getStaffDashboard();
            setData(result);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        load();
    }, []);
    return {
        data,
        loading,
        refresh: load,
    };
}