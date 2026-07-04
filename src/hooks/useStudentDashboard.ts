"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStudentDashboard,
} from "@/services/student.service";

import type {
    StudentDashboard,
} from "@/types/studentDashboard";

export function useStudentDashboard() {

    const [
        dashboard,
        setDashboard,
    ] =
        useState<StudentDashboard | null>(null);

    const [
        loading,
        setLoading,
    ] =
        useState(true);

    useEffect(() => {
        getStudentDashboard()
            .then(setDashboard)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        dashboard,
        loading,
    };
}