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
                        className="rounded-xl border p-4"
                    >

                        <h3 className="font-semibold">
                            {student.user.studentId}
                        </h3>

                        <p>
                            {student.user.fullname}
                        </p>

                        <div className="mt-2 flex justify-between">
                            <span>
                                คะแนน
                                {" "}
                                {student.stressScore}
                            </span>
                            <span
                                className="rounded-full bg-red-500 px-3 py-1 text-white"
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