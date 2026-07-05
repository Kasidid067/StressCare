"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { usePulse } from "@/hooks/usePulse";

export default function PulsePage() {
    const {
        records,
        loading,
        measuring,
        measure,
    } = usePulse();
    const [
        displayBpm,
        setDisplayBpm,
    ] = useState(0);
    const [
        result,
        setResult,
    ] = useState<{
        bpm: number;
        spo2: number | null;
    } | null>(null);
    useEffect(() => {
        if (!measuring) return;
        const timer = setInterval(() => {
            setDisplayBpm(
                Math.floor(
                    Math.random() * 41
                ) + 60
            );
        }, 150);
        return () => clearInterval(timer);
    }, [measuring]);
    async function startMeasure() {
        const data = await measure();
        if (data) {
            setResult({
                bpm: data.bpm,
                spo2: data.spo2,
            });
        }
    }
    function getStatus(bpm: number) {
        if (bpm < 60)
            return {
                text: "ชีพจรต่ำ",
                color: "text-blue-600",
            };
        if (bpm <= 100)
            return {
                text: "ปกติ",
                color: "text-green-600",
            };
        if (bpm <= 120)
            return {
                text: "ค่อนข้างสูง",
                color: "text-yellow-600",
            };
        return {
            text: "สูงผิดปกติ",
            color: "text-red-600",
        };
    }
    if (loading) {
        return (
            <main className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-3 text-5xl">
                        ❤️
                    </div>
                    <p>
                        กำลังโหลดข้อมูล...
                    </p>
                </div>
            </main>
        );
    }
    return (
        <main className="mx-auto max-w-5xl p-8">
            <h1 className="mb-8 text-3xl font-bold text-green-700">
                วัดชีพจร
            </h1>
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow" style={{ boxShadow: "var(--shadow)" }}>
                <div className="flex flex-col items-center">
                    <Heart
                        size={80}
                        className={`
                        mb-6
                        ${measuring
                            ? "animate-pulse text-red-500"
                            : "text-red-400"
                        }
                        `}
                    />
                    <div className="text-6xl font-bold">
                        {
                            measuring
                                ? displayBpm
                                : result?.bpm ?? "--"
                        }
                    </div>
                    <div className="mt-2 text-lg text-[var(--content-muted)]">
                        BPM
                    </div>
                    <button
                        disabled={measuring}
                        onClick={startMeasure}
                        className="mt-8 rounded-xl bg-green-600 px-8 py-3 font-semibold text-white hover:bg-green-700 disabled:bg-gray-400"
                    >
                        {
                            measuring
                                ? "กำลังวัด..."
                                : "เริ่มวัดชีพจร"
                        }
                    </button>
                    {result && (
                        <div className="mt-10 w-full rounded-2xl border border-[var(--border)] bg-[var(--surface-muted)] p-6">
                            <h2 className="mb-6 text-2xl font-bold text-green-700">
                                ผลการวัดล่าสุด
                            </h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow" style={{ boxShadow: "var(--shadow)" }}>
                                    <p className="text-[var(--content-muted)]">
                                        ชีพจร
                                    </p>
                                    <h3 className="mt-2 text-4xl font-bold">
                                        {result.bpm}
                                    </h3>
                                    <p className="mt-1 text-[var(--content-muted)]">
                                        BPM
                                    </p>
                                </div>
                                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow" style={{ boxShadow: "var(--shadow)" }}>
                                    <p className="text-[var(--content-muted)]">
                                        ค่าออกซิเจน
                                    </p>
                                    <h3 className="mt-2 text-4xl font-bold">
                                        {result.spo2 ?? "-"}
                                    </h3>
                                    <p className="mt-1 text-[var(--content-muted)]">
                                        %
                                    </p>
                                </div>
                                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow" style={{ boxShadow: "var(--shadow)" }}>
                                    <p className="text-[var(--content-muted)]">
                                        สถานะ
                                    </p>
                                    <h3
                                        className={`mt-2 text-2xl font-bold ${getStatus(result.bpm).color}`}
                                    >
                                        {getStatus(result.bpm).text}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow" style={{ boxShadow: "var(--shadow)" }}>
                <h2 className="mb-6 text-2xl font-bold text-green-700">
                    ประวัติการวัดชีพจร
                </h2>
                {records.length === 0 ? (
                    <div className="py-12 text-center text-[var(--content-muted)]">
                        ยังไม่มีข้อมูลการวัดชีพจร
                    </div>
                ) : (
                    <table className="w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="p-4 text-left">
                                    วันที่
                                </th>
                                <th className="p-4 text-center">
                                    BPM
                                </th>
                                <th className="p-4 text-center">
                                    SpO₂
                                </th>
                                <th className="p-4 text-center">
                                    สถานะ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((record) => (
                                <tr
                                    key={record.id}
                                    className="border-b"
                                >
                                    <td className="p-4">
                                        {new Date(
                                            record.recordedAt
                                        ).toLocaleString(
                                            "th-TH"
                                        )}
                                    </td>
                                    <td className="p-4 text-center font-semibold">
                                        {record.bpm}
                                    </td>
                                    <td className="p-4 text-center">
                                        {record.spo2}
                                    </td>
                                    <td
                                        className={`p-4 text-center font-semibold ${getStatus(record.bpm).color}`}
                                    >
                                        {getStatus(record.bpm).text}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </main>
    );
}