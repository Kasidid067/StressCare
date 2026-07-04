"use client";

import { useActivityLog } from "@/hooks/useActivityLog";

export default function StudentHistoryPage() {

    const {
        logs,
        loading,
    } = useActivityLog();

    if (loading) {
        return (
            <main className="flex h-[70vh] items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-5xl">
                        ⏳
                    </div>
                    <p>
                        กำลังโหลดประวัติ...
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-green-700">
                    ประวัติการทำกิจกรรม
                </h1>
                <p className="mt-2 text-gray-500">
                    รายการกิจกรรมที่ทำเสร็จแล้ว
                </p>
            </div>
            {logs.length === 0 && (
                <div className="rounded-2xl bg-white p-10 text-center shadow">
                    <div className="text-6xl">
                        📋
                    </div>
                    <h2 className="mt-4 text-2xl font-bold">
                        ยังไม่มีประวัติ
                    </h2>
                    <p className="mt-2 text-gray-500">
                        เมื่อทำกิจกรรมแล้วจะปรากฏที่หน้านี้
                    </p>
                </div>
            )}

            {logs.length > 0 && (
                <div className="overflow-hidden rounded-2xl bg-white shadow">
                    <table className="w-full">
                        <thead className="bg-green-600 text-white">
                            <tr>
                                <th className="p-4 text-left">
                                    กิจกรรม
                                </th>
                                <th className="p-4">
                                    ประเภท
                                </th>
                                <th className="p-4">
                                    ระดับความเครียด
                                </th>
                                <th className="p-4">
                                    วันที่ทำ
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="border-b"
                                >
                                    <td className="p-4">
                                        {log.activity.title}
                                    </td>
                                    <td className="p-4 text-center">
                                        {log.activity.category}
                                    </td>
                                    <td className="p-4 text-center">
                                        {log.activity.stressLevel}
                                    </td>
                                    <td className="p-4 text-center">
                                        {log.completedAt
                                            ? new Date(
                                                log.completedAt
                                            ).toLocaleDateString(
                                                "th-TH"
                                            )
                                            : "-"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
}