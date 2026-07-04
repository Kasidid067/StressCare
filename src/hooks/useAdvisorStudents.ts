"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    getAdvisorStudents,
} from "@/services/advisorStudent.service";

export function useAdvisorStudents() {

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

            const data =
                await getAdvisorStudents();

            setStudents(data);

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