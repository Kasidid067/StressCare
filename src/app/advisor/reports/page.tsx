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
    const safeReports = Array.isArray(reports) ? reports : [];
    const [keyword, setKeyword] =
        useState("");
    const filtered = useMemo(() => {
        const key =
            keyword.toLowerCase();
        return safeReports.filter(
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
        safeReports,
        keyword,
    ]);
    const totalStudent =
        safeReports.length;
    const high =
        safeReports.filter(
            (s: any) =>
                s.results[0]?.stressLevel ===
                "HIGH"
        ).length;
    const medium =
        safeReports.filter(
            (s: any) =>
                s.results[0]?.stressLevel ===
                "MEDIUM"
        ).length;
    const low =
        safeReports.filter(
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
                <h1 className="text-5xl font-bold text-[var(--accent-strong)]">
                    รายงานนักศึกษา
                </h1>
                <p className="mt-2 text-[var(--content-muted)]">
                    สรุปผลการประเมินของนักศึกษาในความดูแล
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-6 md:grid-cols-4">
                <div className="theme-card rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <Users
                            className="text-[var(--accent)]"
                            size={34}
                        />
                        <div>
                            <p className="text-[var(--content-muted)]">
                                นักศึกษาทั้งหมด
                            </p>
                            <h2 className="text-4xl font-bold">
                                {totalStudent}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="theme-card-soft rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <HeartPulse
                            className="text-[var(--status-high-text)]"
                            size={34}
                        />
                        <div>
                            <p className="text-[var(--content-muted)]">
                                ระดับสูง
                            </p>
                            <h2 className="text-4xl font-bold text-[var(--status-high-text)]">
                                {high}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="theme-card-soft rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <Activity
                            className="text-[var(--status-medium-text)]"
                            size={34}
                        />
                        <div>
                            <p className="text-[var(--content-muted)]">
                                ระดับปานกลาง
                            </p>
                            <h2 className="text-4xl font-bold text-[var(--status-medium-text)]">
                                {medium}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="theme-card-soft rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <ClipboardList
                            className="text-[var(--status-low-text)]"
                            size={34}
                        />
                        <div>
                            <p className="text-[var(--content-muted)]">
                                ระดับต่ำ
                            </p>
                            <h2 className="text-4xl font-bold text-[var(--status-low-text)]">
                                {low}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="theme-card rounded-2xl p-8">
                <div className="relative mb-8 max-w-md">
                    <Search
                        size={20}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)]"
                    />
                    <input
                        value={keyword}
                        onChange={(e) =>
                            setKeyword(
                                e.target.value
                            )
                        }
                        placeholder="ค้นหานักศึกษา..."
                        className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 pl-11 text-[var(--content-text)] placeholder:text-[var(--content-muted)] focus:border-[var(--accent)] focus:outline-none"
                    />
                </div>
            </div>
            <div className="theme-card overflow-x-auto rounded-2xl">
                <table className="w-full">
                    <thead className="bg-[var(--surface-muted)] text-[var(--content-muted)]">
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
                                    className="p-8 text-center text-[var(--content-muted)]"
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
                                        className="cursor-pointer border-b border-[var(--border)] transition hover:bg-[var(--surface-muted)]"
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
                                                <span className="status-high rounded-full px-3 py-1 text-sm font-semibold">
                                                    สูง
                                                </span>
                                            ) : result?.stressLevel ===
                                                "MEDIUM" ? (
                                                <span className="status-medium rounded-full px-3 py-1 text-sm font-semibold">
                                                    ปานกลาง
                                                </span>
                                            ) : result?.stressLevel ===
                                                "LOW" ? (
                                                <span className="status-low rounded-full px-3 py-1 text-sm font-semibold">
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
                                                className="rounded-lg bg-[var(--accent)] px-4 py-2 text-white transition hover:opacity-90"
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
            <div className="mt-6 text-right text-sm text-[var(--content-muted)]">
                พบทั้งหมด {filtered.length} รายการ
            </div>
        </main>
    );
}