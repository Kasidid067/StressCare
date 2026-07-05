"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import type {
    StudentHistory,
} from "@/types/studentHistory";

interface Props {
    history: StudentHistory[];
}

export default function HistoryChart({
    history,
}: Props) {
    const data =
        [...history]
            .reverse()
            .map(item => ({
                date:
                    new Date(
                        item.createdAt
                    ).toLocaleDateString(
                        "th-TH",
                        {
                            day: "2-digit",
                            month: "2-digit",
                        }
                    ),
                score:
                    item.stressScore,
            }));
    return (

        <div className="theme-card rounded-2xl p-6">
            <h2 className="mb-6 text-2xl font-bold">
                กราฟคะแนนย้อนหลัง
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >

                <LineChart data={data}>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="score"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}