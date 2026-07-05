"use client";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import type {
    MonthlyAssessment,
} from "@/types/adminDashboard";

interface Props {
    data: MonthlyAssessment[];
}

import DashboardSection from "./DashboardSection";

const MONTHS = [
    "",
    "ม.ค.",
    "ก.พ.",
    "มี.ค.",
    "เม.ย.",
    "พ.ค.",
    "มิ.ย.",
    "ก.ค.",
    "ส.ค.",
    "ก.ย.",
    "ต.ค.",
    "พ.ย.",
    "ธ.ค.",
];

export default function MonthlyChart({
    data,
}: Props) {

    const chartData = data.map(item => ({
        month: MONTHS[item.month],
        total: item.total,
    }));

    return (
        <DashboardSection title="จำนวนการประเมินรายเดือน">
            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="var(--border)"
                        />
                        <XAxis
                            dataKey="month"
                            stroke="var(--content-muted)"
                            tick={{ fill: "var(--content-muted)" }}
                        />
                        <YAxis
                            stroke="var(--content-muted)"
                            tick={{ fill: "var(--content-muted)" }}
                        />
                        <Tooltip
                            contentStyle={{
                                background: "var(--surface)",
                                border: "1px solid var(--border)",
                                borderRadius: "0.75rem",
                                color: "var(--content-text)",
                            }}
                        />
                        <Bar
                            dataKey="total"
                            fill="#14b8a6"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardSection>
    );
}