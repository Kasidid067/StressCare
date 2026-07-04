"use client";

import Link from "next/link";
import { use } from "react";
import { useStudentResult } from "@/hooks/useStudentResult";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export default function ResultPage({
    params,
}: Props) {

    const { id } = use(params);

    const {
        data,
        loading,
    } = useStudentResult(Number(id));

    if (loading) {
        return (
            <main className="flex min-h-[80vh] items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                    <p className="text-lg font-medium text-gray-600">
                        กำลังโหลดผลการประเมิน...
                    </p>
                </div>
            </main>
        );
    }

    if (!data) {
        return (
            <main className="flex min-h-[80vh] items-center justify-center">
                <div className="rounded-2xl bg-white p-10 shadow">
                    <h1 className="text-2xl font-bold text-red-600">
                        ไม่พบข้อมูล
                    </h1>

                    <Link
                        href="/student/dashboard"
                        className="mt-6 inline-block rounded-lg bg-green-600 px-6 py-3 text-white"
                    >
                        กลับ Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    const { result, activities } = data;

    const config = {
        LOW: {
            emoji: "😊",
            title: "ระดับต่ำ",
            bg: "bg-green-50",
            border: "border-green-500",
            text: "text-green-600",
        },
        MEDIUM: {
            emoji: "😐",
            title: "ระดับปานกลาง",
            bg: "bg-yellow-50",
            border: "border-yellow-500",
            text: "text-yellow-600",
        },
        HIGH: {
            emoji: "😟",
            title: "ระดับสูง",
            bg: "bg-red-50",
            border: "border-red-500",
            text: "text-red-600",
        },
    }[result.stressLevel];

    return (
        <main className="mx-auto max-w-6xl space-y-8 p-8">

            <div
                className={`rounded-3xl border-l-8 ${config.border} ${config.bg} p-8 shadow`}
            >
                <div className="flex items-center gap-6">

                    <div className="text-7xl">
                        {config.emoji}
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">
                            ผลการประเมินความเครียด
                        </h1>

                        <p className="mt-2 text-gray-500">
                            {new Date(
                                result.createdAt
                            ).toLocaleDateString(
                                "th-TH",
                                {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }
                            )}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">

                <div className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-xl font-bold">
                        คะแนนรวม
                    </h2>

                    <div className="text-6xl font-bold text-green-600">
                        {result.stressScore}
                    </div>

                    <div
                        className={`mt-6 text-2xl font-bold ${config.text}`}
                    >
                        {config.title}
                    </div>

                </div>

                <div className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-xl font-bold">
                        คำแนะนำ
                    </h2>

                    <p className="leading-8 text-gray-700">
                        {result.recommendation ??
                            "ไม่มีคำแนะนำ"}
                    </p>

                </div>

            </div>

            {result.aiSummary && (

                <div className="rounded-2xl bg-blue-50 p-8 shadow">

                    <h2 className="mb-5 text-xl font-bold">
                        🤖 AI Summary
                    </h2>

                    <p className="leading-8">
                        {result.aiSummary}
                    </p>

                </div>

            )}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">
                    กิจกรรมที่แนะนำ
                </h2>

                {activities.length === 0 ? (

                    <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
                        ไม่มีกิจกรรมแนะนำ
                    </div>

                ) : (

                    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                        {activities.map((activity) => (

                            <div
                                key={activity.id}
                                className="rounded-2xl border p-6 transition hover:-translate-y-1 hover:shadow-lg"
                            >

                                <h3 className="text-xl font-bold">
                                    {activity.title}
                                </h3>

                                <p className="mt-3 text-gray-600">
                                    {activity.description}
                                </p>

                                <div className="mt-5 flex items-center justify-between">

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                        {activity.duration} นาที
                                    </span>

                                    <span className="text-sm text-gray-400">
                                        {activity.category}
                                    </span>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

            <div className="flex flex-wrap gap-4">

                <Link
                    href="/student/dashboard"
                    className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                >
                    กลับ Dashboard
                </Link>

                <Link
                    href="/student/history"
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    ประวัติการประเมิน
                </Link>

                <Link
                    href="/student/assessment"
                    className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
                >
                    ประเมินใหม่
                </Link>

            </div>

        </main>
    );
}