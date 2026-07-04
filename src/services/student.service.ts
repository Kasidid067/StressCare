import type {
    StudentDashboard,
} from "@/types/studentDashboard";

export async function getStudentDashboard():
Promise<StudentDashboard> {

    const res =
        await fetch("/api/student/dashboard");

    if (!res.ok) {
        throw new Error(
            "โหลดข้อมูลไม่สำเร็จ"
        );

    }
    return res.json();
}