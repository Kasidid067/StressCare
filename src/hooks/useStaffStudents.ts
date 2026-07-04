"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStaffStudents,
} from "@/services/staffStudent.service";

export function useStaffStudents() {

    const [
        students,
        setStudents,
    ] = useState<any[]>([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    async function load() {
        try {
            const result =
                await getStaffStudents();
            setStudents(result);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        load();
    }, []);
    return {
        students,
        loading,
        refresh: load,
    };
}