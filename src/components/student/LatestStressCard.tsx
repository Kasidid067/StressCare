import {
    STRESS_CONFIG,
    StressLevelType,
} from "@/types/stress";

interface Props {
    latest: {
        stressScore: number;
        stressLevel: string;
        createdAt: string;
    } | null;
}

export default function LatestStressCard({
    latest,
}: Props) {
    if (!latest) {
        return (
            <div className="theme-card rounded-2xl p-6">
                <h2 className="mb-5 text-xl font-bold">
                    คะแนนล่าสุด
                </h2>
                <div className="flex h-48 items-center justify-center">
                    <div className="text-center">
                        <div className="mb-3 text-6xl">
                            📝
                        </div>
                        <p className="text-[var(--content-muted)]">
                            ยังไม่เคยทำแบบประเมิน
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const config =
    STRESS_CONFIG[
        latest.stressLevel as StressLevelType
    ];

    return (
        <div className="theme-card rounded-2xl p-6">
            <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">
                    คะแนนล่าสุด
                </h2>

                <div className="text-5xl">
                    {config.emoji}
                </div>
            </div>

            <div
                className={`rounded-2xl ${config.bg} p-6`}
            >
                <div
                    className={`text-5xl font-bold ${config.color}`}
                >
                    {latest.stressScore}
                </div>
                <div
                    className={`mt-3 text-lg font-semibold ${config.color}`}
                >
                    {config.text}
                </div>
            </div>

            <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm">
                    <span className="text-[var(--content-muted)]">
                        วันที่ประเมิน
                    </span>

                    <span className="font-medium">
                        {
                            new Date(
                                latest.createdAt
                            ).toLocaleDateString(
                                "th-TH",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )
                        }
                    </span>
                </div>
            </div>
        </div>
    );
}