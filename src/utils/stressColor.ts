import {
    STRESS_CONFIG,
    StressLevelType,
} from "@/types/stress";

export function getStressConfig(
    level: string
) {

    return (
        STRESS_CONFIG[
            level as StressLevelType
        ] ??
        STRESS_CONFIG.LOW
    );

}