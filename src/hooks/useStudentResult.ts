"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getStudentResult,
} from "@/services/studentResult.service";

import type {
    StudentResult,
} from "@/types/studentResult";

export function useStudentResult(
    id: number
) {

    const [
        data,
        setData,
    ] =
        useState<StudentResult | null>(null);

    const [
        loading,
        setLoading,
    ] =
        useState(true);
    useEffect(() => {
        if (!id) return;
        getStudentResult(id)
            .then(setData)
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return {
        data,
        loading,
    };
}