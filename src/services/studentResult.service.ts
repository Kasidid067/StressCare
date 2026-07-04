import type {
    StudentResult,
} from "@/types/studentResult";

export async function getStudentResult(
    id: number
): Promise<StudentResult> {
    const res = await fetch(
        `/api/student/result/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!res.ok) {
        throw new Error(
            "โหลดผลการประเมินไม่สำเร็จ"
        );
    }
    return res.json();
}