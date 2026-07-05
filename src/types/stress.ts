export type StressLevelType =
    | "LOW"
    | "MEDIUM"
    | "HIGH";

export interface StressConfig {
    emoji: string;
    text: string;
    color: string;
    bg: string;
}

export const STRESS_CONFIG:
Record<
    StressLevelType,
    StressConfig
> = {
    LOW: {
        emoji: "😊",
        text: "ความเครียดต่ำ",
        color: "text-emerald-600 dark:text-emerald-400",
        bg: "bg-emerald-500/10",
    },

    MEDIUM: {
        emoji: "😐",
        text: "ความเครียดปานกลาง",
        color: "text-amber-600 dark:text-amber-400",
        bg: "bg-amber-500/10",
    },

    HIGH: {
        emoji: "😟",
        text: "ความเครียดสูง",
        color: "text-rose-600 dark:text-rose-400",
        bg: "bg-rose-500/10",
    },
};