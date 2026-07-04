import type { StressLevel } from "@prisma/client";

export interface StudentHistory {
    id: number;
    stressScore: number;
    stressLevel: StressLevel;
    recommendation: string | null;
    createdAt: string;
}