import type { Report } from "@/types/report";

interface Props {
    reports: Report[];
}

export default function ReportTable({
    reports,
}: Props) {

    return (
        <div className="rounded-2xl bg-white p-6 shadow">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="p-3">รหัส</th>
                        <th className="p-3">ชื่อ</th>
                        <th className="p-3">สาขา</th>
                        <th className="p-3">คะแนน</th>
                        <th className="p-3">ระดับ</th>
                        <th className="p-3">วันที่</th>
                    </tr>
                </thead>

                <tbody>
                    {reports.map(report => (
                        <tr
                            key={report.id}
                            className="border-b"
                        >
                            <td className="p-3">
                                {report.user.studentId}
                            </td>
                            <td className="p-3">
                                {report.user.fullname}
                            </td>
                            <td className="p-3">
                                {report.user.major.name}
                            </td>
                            <td className="p-3">
                                {report.stressScore}
                            </td>
                            <td className="p-3">
                                {report.stressLevel}
                            </td>
                            <td className="p-3">
                                {new Date(
                                    report.createdAt
                                ).toLocaleDateString("th-TH")}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}