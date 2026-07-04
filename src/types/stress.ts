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
        color: "text-green-600",
        bg: "bg-green-50",
    },

    MEDIUM: {
        emoji: "😐",
        text: "ความเครียดปานกลาง",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
    },

    HIGH: {
        emoji: "😟",
        text: "ความเครียดสูง",
        color: "text-red-600",
        bg: "bg-red-50",
    },
};