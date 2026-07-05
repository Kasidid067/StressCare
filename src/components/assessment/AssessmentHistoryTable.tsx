"use client";

import {
    Eye,
    HeartPulse,
} from "lucide-react";

interface Props {
    history: any[];
    onView: (item: any) => void;
}

export default function AssessmentHistoryTable({
    history,
    onView,
}: Props) {

    if (history.length === 0) {
        return (
            <div className="theme-card rounded-xl p-10 text-center">
                <p className="text-[var(--content-muted)]">
                    ยังไม่มีประวัติการประเมิน
                </p>
            </div>
        );
    }

    return (
        <div className="theme-card overflow-hidden rounded-2xl">

            <table className="w-full">

                <thead className="bg-[var(--accent)] text-white">

                    <tr>

                        <th className="p-4 text-left">
                            วันที่
                        </th>

                        <th className="text-center">
                            คะแนน
                        </th>

                        <th className="text-center">
                            ระดับ
                        </th>

                        <th className="text-center">
                            BPM
                        </th>

                        <th className="text-center">
                            SpO₂
                        </th>

                        <th className="text-center">
                            รายละเอียด
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {history.map((item) => (

                        <tr
                            key={item.id}
                            className="border-b border-[var(--border)] hover:bg-[var(--surface-muted)]"
                        >

                            <td className="p-4">

                                {new Date(
                                    item.createdAt
                                ).toLocaleString(
                                    "th-TH"
                                )}

                            </td>

                            <td className="text-center font-bold">

                                {item.stressScore}

                            </td>

                            <td className="text-center">

                                <span
                                    className={`rounded-full px-3 py-1 text-sm font-semibold

${item.stressLevel === "LOW"
                                            ? "status-low"
                                            : item.stressLevel === "MEDIUM"
                                                ? "status-medium"
                                                : "status-high"
                                        }

`}
                                >

                                    {item.stressLevel}

                                </span>

                            </td>

                            <td className="text-center">

                                {item.pulse?.bpm ?? "-"}

                            </td>

                            <td className="text-center">

                                {item.pulse?.spo2 ?? "-"}

                            </td>

                            <td className="text-center">

                                <button

                                    onClick={() =>
                                        onView(item)
                                    }

                                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2 text-white hover:opacity-90"

                                >

                                    <Eye size={18} />

                                    ดูผล

                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}