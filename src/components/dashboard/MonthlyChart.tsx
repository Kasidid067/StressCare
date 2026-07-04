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
                        />
                        <XAxis
                            dataKey="month"
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="total"
                            fill="#16a34a"
                            radius={[6, 6, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </DashboardSection>
    );
}