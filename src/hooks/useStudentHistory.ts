"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStudentHistory,
} from "@/services/studentHistory.service";

import type {
    StudentHistory,
} from "@/types/studentHistory";

export function useStudentHistory() {

    const [
        history,
        setHistory,
    ] =
        useState<StudentHistory[]>([]);

    const [
        loading,
        setLoading,
    ] =
        useState(true);
    useEffect(() => {
        getStudentHistory()
            .then(setHistory)
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return {
        history,
        loading,
    };
}