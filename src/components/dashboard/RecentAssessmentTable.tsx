import type { LatestAssessment } from "@/types/adminDashboard";
import DashboardSection from "./DashboardSection";

interface Props {
    assessments: LatestAssessment[];
}

export default function RecentAssessmentTable({
    assessments,
}: Props) {

    return (
        <DashboardSection title="ผลการประเมินล่าสุด">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="p-3 text-left">
                            รหัส
                        </th>
                        <th className="p-3 text-left">
                            ชื่อ
                        </th>
                        <th className="p-3">
                            คะแนน
                        </th>
                        <th className="p-3">
                            ระดับ
                        </th>
                        <th className="p-3">
                            วันที่
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {assessments.map((item) => (
                        <tr
                            key={item.id}
                            className="border-b"
                        >
                            <td className="p-3">
                                {item.user.studentId}
                            </td>
                            <td className="p-3">
                                {item.user.fullname}
                            </td>
                            <td className="text-center">
                                {item.stressScore}
                            </td>
                            <td className="text-center">
                                <span
                                    className={`rounded-full px-3 py-1 text-white
                                    ${
                                        item.stressLevel === "HIGH"
                                            ? "bg-red-500"
                                            : item.stressLevel === "MEDIUM"
                                                ? "bg-yellow-500"
                                                : "bg-green-500"
                                    }`}
                                >
                                    {item.stressLevel}
                                </span>
                            </td>
                            <td className="text-center">
                                {new Date(
                                    item.createdAt
                                ).toLocaleDateString("th-TH")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </DashboardSection>
    );
}