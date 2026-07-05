"use client";

import type { Activity } from "@/types/activity";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
    activities: Activity[];
    onEdit: (activity: Activity) => void;
    onDelete: (activity: Activity) => void;
}

function levelText(level: string) {
    switch (level) {
        case "LOW":
            return "ต่ำ";
        case "MEDIUM":
            return "ปานกลาง";
        case "HIGH":
            return "สูง";
        default:
            return "-";
    }
}

function levelColor(level: string) {
    switch (level) {
        case "LOW":
            return "status-low";
        case "MEDIUM":
            return "status-medium";
        case "HIGH":
            return "status-high";
        default:
            return "bg-[var(--surface-muted)] text-[var(--content-muted)] border border-[var(--border)]";
    }
}

export default function ActivityTable({
    activities,
    onEdit,
    onDelete,
}: Props) {

    if (activities.length === 0) {

        return (
            <div className="theme-card rounded-xl p-10 text-center">
                ยังไม่มีกิจกรรม
            </div>
        );

    }

    return (

        <div className="theme-card overflow-hidden rounded-xl">

            <table className="min-w-full">

                <thead className="bg-[var(--surface-muted)] text-[var(--content-muted)]">

                    <tr>

                        <th className="p-4 text-left">
                            ชื่อกิจกรรม
                        </th>

                        <th className="p-4 text-center">
                            ประเภท
                        </th>

                        <th className="p-4 text-center">
                            ระดับ
                        </th>

                        <th className="p-4 text-center">
                            ระยะเวลา
                        </th>

                        <th className="p-4 text-center">
                            จัดการ
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {activities.map((activity) => (

                        <tr
                            key={activity.id}
                            className="border-b border-[var(--border)] hover:bg-[var(--surface-muted)]"
                        >

                            <td className="p-4">

                                <div className="font-semibold">
                                    {activity.title}
                                </div>

                                <div className="text-sm text-[var(--content-muted)]">
                                    {activity.description}
                                </div>
                            </td>

                            <td className="p-4 text-center">
                                {activity.category}
                            </td>

                            <td className="p-4 text-center">
                                <span
                                    className={`rounded-full px-3 py-1 text-sm ${levelColor(
                                        activity.stressLevel
                                    )}`}
                                >
                                    {levelText(activity.stressLevel)}
                                </span>
                            </td>

                            <td className="p-4 text-center">
                                {activity.duration} นาที
                            </td>

                            <td className="p-4">
                                <div className="flex justify-center gap-2">
                                    <button
                                        onClick={() =>
                                            onEdit(activity)
                                        }
                                        className="rounded-lg bg-[var(--accent)] p-2 text-white"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() =>
                                            onDelete(activity)
                                        }
                                        className="rounded-lg bg-[var(--status-high-text)] p-2 text-white"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}