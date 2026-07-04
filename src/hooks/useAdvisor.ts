"use client";

import { useEffect, useState } from "react";
import { getAdvisors } from "@/services/advisor.service";

export interface Advisor {
    id: number;
    fullname: string;
}

export function useAdvisor() {
    const [advisors, setAdvisors] =
        useState<Advisor[]>([]);
    useEffect(() => {
        async function load() {
            const data = await getAdvisors();
            setAdvisors(data);
        }
        load();
    }, []);
    return {
        advisors,
    };

}