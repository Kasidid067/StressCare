import type {
    StudentHistory,
} from "@/types/studentHistory";

export async function getStudentHistory():
Promise<StudentHistory[]> {

    const res = await fetch(
        "/api/student/history",
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(
            "โหลดประวัติไม่สำเร็จ"
        );
    }
    return res.json();
}