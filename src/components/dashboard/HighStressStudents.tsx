import DashboardSection from "./DashboardSection";

import type {
    HighStressStudent,
} from "@/types/adminDashboard";

interface Props {

    students: HighStressStudent[];

}

export default function HighStressStudents({
    students,
}: Props) {
    return (
        <DashboardSection
            title="🚨 นักศึกษาที่มีความเครียดสูง"
        >
            <div className="space-y-4">
                {students.map(student => (
                    <div
                        key={student.id}
                        className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                    >

                        <h3 className="font-semibold text-[var(--content-text)]">
                            {student.user.studentId}
                        </h3>

                        <p className="text-[var(--content-muted)]">
                            {student.user.fullname}
                        </p>

                        <div className="mt-2 flex justify-between">
                            <span className="text-[var(--content-text)]">
                                คะแนน
                                {" "}
                                {student.stressScore}
                            </span>
                            <span
                                className="status-high rounded-full px-3 py-1 text-sm font-medium"
                            >
                                HIGH
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </DashboardSection>
    );
}