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
            <div className="rounded-xl bg-white p-10 text-center shadow">
                <p className="text-gray-500">
                    ยังไม่มีประวัติการประเมิน
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead className="bg-green-600 text-white">

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
                            className="border-b hover:bg-gray-50"
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
                                            ? "bg-green-100 text-green-700"
                                            : item.stressLevel === "MEDIUM"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : "bg-red-100 text-red-700"
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

                                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"

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