import type { Major } from "@/types/major";

export async function getMajors(): Promise<Major[]> {
    const res = await fetch("/api/admin/majors");
    if (!res.ok) {
        throw new Error("โหลดสาขาไม่สำเร็จ");
    }
    return res.json();
}

export async function createMajor(
    data: {
        name: string;
        code: string;
    }
): Promise<Major> {
    const res = await fetch("/api/admin/majors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("เพิ่มสาขาไม่สำเร็จ");
    }
    return res.json();
}

export async function updateMajor(
    id: number,
    data: {
        name: string;
        code: string;
    }
): Promise<Major> {
    const res = await fetch(`/api/admin/majors/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error("แก้ไขสาขาไม่สำเร็จ");
    }
    return res.json();
}

export async function deleteMajor(
    id: number
): Promise<void> {
    const res = await fetch(`/api/admin/majors/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        throw new Error("ลบสาขาไม่สำเร็จ");
    }
}