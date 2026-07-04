"use client";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

interface Props {

    history: {

        score: number;

        createdAt: string;

    }[];

}

export default function StressHistoryChart({
    history,
}: Props) {

    const data = [...history]
        .reverse()
        .map((item) => ({
            date: new Date(
                item.createdAt
            ).toLocaleDateString(
                "th-TH",
                {
                    day: "2-digit",
                    month: "short",
                }
            ),
            score: item.score,
        }));

    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        📈 แนวโน้มคะแนนความเครียด
                    </h2>

                    <p className="text-sm text-gray-500">
                        คะแนนย้อนหลังของคุณ
                    </p>
                </div>
            </div>

            {data.length === 0 ? (
                <div className="flex h-72 items-center justify-center text-gray-400">
                    ยังไม่มีข้อมูลการประเมิน
                </div>
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height={320}
                >
                    <LineChart
                        data={data}
                    >
                        <CartesianGrid
                            strokeDasharray="3 3"
                        />
                        <XAxis
                            dataKey="date"
                        />
                        <YAxis
                            allowDecimals={false}
                            domain={[0, 15]}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="score"
                            stroke="#16A34A"
                            strokeWidth={4}
                            dot={{
                                r: 5,
                            }}
                            activeDot={{
                                r: 8,
                            }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}