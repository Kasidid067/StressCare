"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { PieChart as PieChartIcon } from "lucide-react";

interface Props {
    low: number;
    medium: number;
    high: number;
}

const COLORS = [
    "#22C55E",
    "#FACC15",
    "#EF4444",
];

export default function StressPieChart({
    low,
    medium,
    high,
}: Props) {

    const data = [
        {
            name: "ต่ำ",
            value: low,
        },
        {
            name: "ปานกลาง",
            value: medium,
        },
        {
            name: "สูง",
            value: high,
        },
    ];

    return (
        <div className="theme-card rounded-2xl p-6">
            <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
                <PieChartIcon className="text-[var(--accent-strong)]" size={22} />
                สัดส่วนระดับความเครียด
            </h2>
            <ResponsiveContainer
                width="100%"
                height={350}
            >
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={120}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={
                                    COLORS[index]
                                }
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}