"use client";

import { useEffect, useState } from "react";

import { getStaffStudent } from "@/services/staffStudentDetail.service";

import type { StaffStudentDetail } from "@/types/staffStudentDetail";

export function useStaffStudent(
    id: number
) {

    const [student, setStudent] =
        useState<StaffStudentDetail | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        async function load() {

            const data =
                await getStaffStudent(id);

            setStudent(data);

            setLoading(false);

        }

        if (id) {

            load();

        }

    }, [id]);

    return {

        student,

        loading,

    };

}