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
    "var(--status-low-text)",
    "var(--status-medium-text)",
    "var(--status-high-text)",
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
                            label={{ fill: "var(--content-text)" }}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                borderRadius: "0.75rem",
                                color: "var(--content-text)",
                            }}
                        />
                        <Legend
                            wrapperStyle={{ color: "var(--content-muted)" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </DashboardSection>
    );
}