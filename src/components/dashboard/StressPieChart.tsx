"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface Props {
    low: number;
    medium: number;
    high: number;
}

import DashboardSection from "./DashboardSection";

const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
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
        <DashboardSection title="สัดส่วนระดับความเครียด">
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            outerRadius={110}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </DashboardSection>
    );
}