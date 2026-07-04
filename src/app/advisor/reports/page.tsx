"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Users,
    HeartPulse,
    Activity,
    ClipboardList,
} from "lucide-react";
import { useAdvisorReports } from "@/hooks/useAdvisorReports";

export default function AdvisorReportsPage() {
    const router = useRouter();
    const {
        reports,
        loading,
    } = useAdvisorReports();
    const [keyword, setKeyword] =
        useState("");
    const filtered = useMemo(() => {
        const key =
            keyword.toLowerCase();
        return reports.filter(
            (student: any) =>
                student.fullname
                    ?.toLowerCase()
                    .includes(key)
                ||
                student.studentId
                    ?.toLowerCase()
                    .includes(key)
                ||
                student.major?.name
                    ?.toLowerCase()
                    .includes(key)
        );
    }, [
        reports,
        keyword,
    ]);
    const totalStudent =
        reports.length;
    const high =
        reports.filter(
            (s: any) =>
                s.results[0]?.stressLevel ===
                "HIGH"
        ).length;
    const medium =
        reports.filter(
            (s: any) =>
                s.results[0]?.stressLevel ===
                "MEDIUM"
        ).length;
    const low =
        reports.filter(
            (s: any) =>
                s.results[0]?.stressLevel ===
                "LOW"
        ).length;
    if (loading) {
        return (
            <main className="p-10">
                กำลังโหลด...
            </main>
        );
    }
    return (
        <main className="space-y-8 p-10">
            <div>
                <h1 className="text-5xl font-bold text-green-700">
                    รายงานนักศึกษา
                </h1>
                <p className="mt-2 text-gray-500">
                    สรุปผลการประเมินของนักศึกษาในความดูแล
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-6 md:grid-cols-4">
                <div className="rounded-2xl bg-white p-6 shadow">
                    <div className="flex items-center gap-4">
                        <Users
                            className="text-green-600"
                            size={34}
                        />
                        <div>
                            <p className="text-gray-500">
                                นักศึกษาทั้งหมด
                            </p>
                            <h2 className="text-4xl font-bold">
                                {totalStudent}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-red-50 p-6 shadow">
                    <div className="flex items-center gap-4">
                        <HeartPulse
                            className="text-red-600"
                            size={34}
                        />
                        <div>
                            <p>
                                ระดับสูง
                            </p>
                            <h2 className="text-4xl font-bold text-red-600">
                                {high}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-yellow-50 p-6 shadow">
                    <div className="flex items-center gap-4">
                        <Activity
                            className="text-yellow-600"
                            size={34}
                        />
                        <div>
                            <p>
                                ระดับปานกลาง
                            </p>
                            <h2 className="text-4xl font-bold text-yellow-600">
                                {medium}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="rounded-2xl bg-green-50 p-6 shadow">
                    <div className="flex items-center gap-4">
                        <ClipboardList
                            className="text-green-600"
                            size={34}
                        />
                        <div>
                            <p>
                                ระดับต่ำ
                            </p>
                            <h2 className="text-4xl font-bold text-green-700">
                                {low}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="rounded-2xl bg-white p-8 shadow">
                <div className="relative mb-8 max-w-md">
                    <Search
                        size={20}
                        className="absolute left-4 top-4 text-gray-400"
                    />
                    <input
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(
                                e.target.value
                            )
                        }
                        placeholder="ค้นหานักศึกษา..."
                        className="w-full rounded-xl border py-3 pl-11 pr-4"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-green-600 text-white">
                        <tr>
                            <th className="p-4">
                                รหัส
                            </th>
                            <th>
                                ชื่อ
                            </th>
                            <th>
                                สาขา
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
                            <th>
                                SpO₂
                            </th>
                            <th>
                                วันที่ล่าสุด
                            </th>
                            <th>
                                ดูข้อมูล
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={9}
                                    className="p-8 text-center text-gray-500"
                                >
                                    ไม่พบข้อมูลนักศึกษา
                                </td>
                            </tr>
                        ) : (
                            filtered.map((student: any) => {
                                const result =
                                    student.results?.[0];
                                return (
                                    <tr
                                        key={student.id}
                                        onClick={() =>
                                            router.push(
                                                `/advisor/students/${student.id}`
                                            )
                                        }
                                        className="cursor-pointer border-b transition hover:bg-green-50"
                                    >
                                        <td className="p-4">
                                            {student.studentId}
                                        </td>
                                        <td>
                                            {student.fullname}
                                        </td>
                                        <td>
                                            {student.major?.name}
                                        </td>
                                        <td className="text-center font-bold">
                                            {result?.stressScore ?? "-"}
                                        </td>
                                        <td className="text-center">
                                            {result?.stressLevel ===
                                                "HIGH" ? (
                                                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                                                    สูง
                                                </span>
                                            ) : result?.stressLevel ===
                                                "MEDIUM" ? (
                                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                                                    ปานกลาง
                                                </span>
                                            ) : result?.stressLevel ===
                                                "LOW" ? (
                                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                                                    ต่ำ
                                                </span>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="text-center">
                                            {result?.pulse?.bpm ?? "-"}
                                        </td>
                                        <td className="text-center">
                                            {result?.pulse?.spo2 ?? "-"}
                                        </td>
                                        <td className="text-center">
                                            {result
                                                ? new Date(
                                                    result.createdAt
                                                ).toLocaleDateString(
                                                    "th-TH"
                                                )
                                                : "-"}
                                        </td>
                                        <td className="text-center">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(
                                                        `/advisor/students/${student.id}`
                                                    );
                                                }}
                                                className="rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
                                            >
                                                ดูรายละเอียด
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-6 text-right text-sm text-gray-500">
                พบทั้งหมด {filtered.length} รายการ
            </div>
        </main>
    );
}