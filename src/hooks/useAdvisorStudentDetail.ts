"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getAdvisorStudentDetail,
} from "@/services/advisorStudentDetail.service";

export function useAdvisorStudentDetail(
    id: number
) {

    const [

        student,

        setStudent,

    ] = useState<any>(null);

    const [

        loading,

        setLoading,

    ] = useState(true);

    async function load() {

        try {

            const data =
                await getAdvisorStudentDetail(id);

            setStudent(data);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        if (!id) return;

        load();

    }, [id]);

    return {

        student,

        loading,

        refresh: load,

    };

}