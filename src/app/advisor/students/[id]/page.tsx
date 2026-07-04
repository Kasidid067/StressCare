"use client";

import { useParams } from "next/navigation";

import {
    User,
    HeartPulse,
    Brain,
    Activity,
} from "lucide-react";

import {
    useAdvisorStudentDetail,
} from "@/hooks/useAdvisorStudentDetail";

export default function AdvisorStudentDetailPage() {

    const params = useParams();

    const {

        student,

        loading,

    } = useAdvisorStudentDetail(
        Number(params.id)
    );

    if (loading) {

        return (

            <main className="flex h-[70vh] items-center justify-center">

                กำลังโหลด...

            </main>

        );

    }

    if (!student) {

        return (

            <main className="flex h-[70vh] items-center justify-center">

                ไม่พบข้อมูล

            </main>

        );

    }

    const latest =
        student.results[0];

    return (

        <main className="space-y-8 p-8">

            {/* Header */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <div className="flex items-center gap-6">

                    <div className="rounded-full bg-green-100 p-6">

                        <User
                            size={45}
                            className="text-green-700"
                        />

                    </div>

                    <div>

                        <h1 className="text-3xl font-bold">

                            {student.fullname}

                        </h1>

                        <p className="mt-2 text-gray-500">

                            {student.studentId}

                        </p>

                        <p className="text-gray-500">

                            {student.major.name}

                        </p>

                    </div>

                </div>

            </div>

            {/* Summary */}

            <div className="grid gap-6 md:grid-cols-4">

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        คะแนนล่าสุด

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {

                            latest
                                ?.stressScore ?? "-"

                        }

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <div className="flex items-center gap-2">

                        <HeartPulse />

                        BPM

                    </div>

                    <h2 className="mt-3 text-4xl font-bold">

                        {

                            latest
                                ?.pulse?.bpm ?? "-"

                        }

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        ระดับ

                    </p>

                    <h2 className="mt-3 text-3xl font-bold">

                        {

                            latest
                                ?.stressLevel ?? "-"

                        }

                    </h2>

                </div>

                <div className="rounded-xl bg-white p-6 shadow">

                    <p className="text-gray-500">

                        SpO₂

                    </p>

                    <h2 className="mt-3 text-4xl font-bold">

                        {

                            latest
                                ?.pulse?.spo2 ?? "-"

                        }

                    </h2>

                </div>

            </div>

            {/* AI */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">

                    <Brain />

                    AI Summary

                </h2>

                <p>

                    {

                        latest
                            ?.aiSummary ??

                        "-"

                    }

                </p>

            </div>

            {/* Recommendation */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    Recommendation

                </h2>

                <p>

                    {

                        latest
                            ?.recommendation ??

                        "-"

                    }

                </p>

            </div>

            {/* ST5 History */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 text-2xl font-bold">

                    ประวัติการประเมิน ST-5

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                วันที่

                            </th>

                            <th>

                                คะแนน

                            </th>

                            <th>

                                ระดับ

                            </th>

                            <th>

                                BPM

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            student.results.map(
                                (
                                    item: any
                                ) => (

                                    <tr
                                        key={
                                            item.id
                                        }
                                        className="border-b"
                                    >

                                        <td className="p-4">

                                            {

                                                new Date(
                                                    item.createdAt
                                                ).toLocaleString(
                                                    "th-TH"
                                                )

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.stressScore

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.stressLevel

                                            }

                                        </td>

                                        <td>

                                            {

                                                item.pulse?.bpm ??
                                                "-"

                                            }

                                        </td>

                                    </tr>

                                )

                            )

                        }

                    </tbody>

                </table>

            </div>
                        {/* Pulse History */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">

                    <HeartPulse />

                    ประวัติการวัดชีพจร

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                วันที่

                            </th>

                            <th>

                                BPM

                            </th>

                            <th>

                                SpO₂

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {student.results.map((item: any) => (

                            <tr
                                key={`pulse-${item.id}`}
                                className="border-b"
                            >

                                <td className="p-4">

                                    {new Date(
                                        item.createdAt
                                    ).toLocaleString(
                                        "th-TH"
                                    )}

                                </td>

                                <td className="text-center">

                                    {item.pulse?.bpm ?? "-"}

                                </td>

                                <td className="text-center">

                                    {item.pulse?.spo2 ?? "-"}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Activity History */}

            <div className="rounded-2xl bg-white p-8 shadow">

                <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">

                    <Activity />

                    ประวัติการทำกิจกรรม

                </h2>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                วันที่

                            </th>

                            <th>

                                กิจกรรม

                            </th>

                            <th>

                                ระยะเวลา

                            </th>

                            <th>

                                สถานะ

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {student.activityLogs.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={4}
                                    className="p-8 text-center text-gray-500"
                                >

                                    ยังไม่มีประวัติการทำกิจกรรม

                                </td>

                            </tr>

                        ) : (

                            student.activityLogs.map((log: any) => (

                                <tr
                                    key={log.id}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {new Date(
                                            log.createdAt
                                        ).toLocaleString(
                                            "th-TH"
                                        )}

                                    </td>

                                    <td>

                                        {log.activity.title}

                                    </td>

                                    <td>

                                        {log.activity.duration} นาที

                                    </td>

                                    <td>

                                        {log.completed ? (

                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                                สำเร็จ

                                            </span>

                                        ) : (

                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                                                ยังไม่เสร็จ

                                            </span>

                                        )}

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

            {/* ST-5 Answers */}

            {latest?.assessment && (

                <div className="rounded-2xl bg-white p-8 shadow">

                    <h2 className="mb-6 text-2xl font-bold">

                        คะแนนแบบประเมิน ST-5 ล่าสุด

                    </h2>

                    <div className="grid gap-4 md:grid-cols-5">

                        {latest.assessment.answers.map(
                            (answer: any) => (

                                <div
                                    key={answer.id}
                                    className="rounded-xl border p-5 text-center"
                                >

                                    <p className="text-gray-500">

                                        ข้อ {answer.questionNo}

                                    </p>

                                    <h3 className="mt-3 text-4xl font-bold text-green-700">

                                        {answer.score}

                                    </h3>

                                </div>

                            )
                        )}

                    </div>

                </div>

            )}

        </main>

    );

}