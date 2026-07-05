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
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-[var(--border)] bg-[var(--surface-muted)] text-[var(--content-muted)]">
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
                                className="border-b border-[var(--border)] hover:bg-[var(--surface-muted)]"
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
                                        className={`rounded-full px-3 py-1 text-sm font-medium
                                        ${
                                            item.stressLevel === "HIGH"
                                                ? "status-high"
                                                : item.stressLevel === "MEDIUM"
                                                    ? "status-medium"
                                                    : "status-low"
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
            </div>
        </DashboardSection>
    );
}