import Link from "next/link";
import type { StudentHistory } from "@/types/studentHistory";

interface Props {
    history: StudentHistory[];
}

export default function HistoryTable({
    history,
}: Props) {

    function badge(level: string) {

        switch (level) {

            case "LOW":
                return "bg-green-100 text-green-700";

            case "MEDIUM":
                return "bg-yellow-100 text-yellow-700";

            case "HIGH":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100";
        }
    }

    return (
        <div className="rounded-2xl bg-white shadow">
            <table className="w-full">
                <thead className="border-b">
                    <tr>
                        <th className="p-4 text-left">
                            วันที่
                        </th>

                        <th className="p-4">
                            คะแนน
                        </th>

                        <th className="p-4">
                            ระดับ
                        </th>

                        <th className="p-4">
                            รายละเอียด
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history.map(item => (
                            <tr
                                key={item.id}
                                className="border-b"
                            >
                                <td className="p-4">
                                    {
                                        new Date(
                                            item.createdAt
                                        ).toLocaleDateString(
                                            "th-TH"
                                        )
                                    }
                                </td>

                                <td className="text-center">
                                    {item.stressScore}
                                </td>

                                <td className="text-center">
                                    <span
                                        className={`rounded-full px-3 py-1 ${badge(item.stressLevel)}`}
                                    >
                                        {item.stressLevel}
                                    </span>
                                </td>

                                <td className="text-center">
                                    <Link
                                        href={`/student/result/${item.id}`}
                                        className="text-green-600"
                                    >
                                        ดูผล
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}