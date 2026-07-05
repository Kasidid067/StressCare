"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { useAdminUser } from "@/hooks/useAdminUser";
import { useMajor } from "@/hooks/useMajor";
import { useAdvisor } from "@/hooks/useAdvisor";
import { updateUser } from "@/services/adminUserDetail.service";

export default function EditUserPage() {
    const params = useParams();
    const router = useRouter();

    const id = Number(params.id);

    const { user, loading } = useAdminUser(id);
    const { majors } = useMajor();
    const { advisors } = useAdvisor();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        role: "STUDENT",
        year: 1,
        majorId: 1,
        advisorId: "",
        status: "ACTIVE",
    });

    // eslint-disable-next-line react-hooks/set-state-in-effect
    useEffect(() => {
        if (!user) return;

        setForm({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone ?? "",
            password: "",
            role: user.role,
            year: user.year,
            majorId: user.majorId,
            advisorId: user.advisorId?.toString() ?? "",
            status: user.status,
        });
    }, [user]);

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            await updateUser(id, {
                ...form,
                advisorId: form.advisorId
                    ? Number(form.advisorId)
                    : null,
            });

            toast.success("บันทึกสำเร็จ");

            router.refresh();
        } catch {
            toast.error("เกิดข้อผิดพลาด");
        }
    }

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    if (!user) {
        return <div>ไม่พบข้อมูล</div>;
    }

    return (
        <main className="mx-auto max-w-3xl p-8">

            <h1 className="mb-8 text-3xl font-bold text-green-700">
                แก้ไขผู้ใช้งาน
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow" style={{ boxShadow: "var(--shadow)" }}
            >

                <input
                    className="w-full rounded-xl border p-3"
                    value={form.fullname}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            fullname: e.target.value,
                        })
                    }
                    placeholder="ชื่อ"
                />

                <input
                    className="w-full rounded-xl border p-3"
                    value={form.email}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            email: e.target.value,
                        })
                    }
                    placeholder="Email"
                />

                <input
                    className="w-full rounded-xl border p-3"
                    value={form.phone}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            phone: e.target.value,
                        })
                    }
                    placeholder="เบอร์โทร"
                />

                <label className="block">
                    <span className="mb-2 block font-medium">
                        สาขา
                    </span>

                    <select
                        value={form.majorId}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                majorId: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    >
                        {majors.map((major) => (
                            <option
                                key={major.id}
                                value={major.id}
                            >
                                {major.name}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block">
                    <span className="mb-2 block font-medium">
                        ชั้นปี
                    </span>

                    <input
                        type="number"
                        min={1}
                        max={8}
                        value={form.year}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                year: Number(e.target.value),
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    />
                </label>

                <label className="block">
                    <span className="mb-2 block font-medium">
                        สิทธิ์ผู้ใช้งาน
                    </span>

                    <select
                        value={form.role}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                role: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    >
                        <option value="STUDENT">Student</option>
                        <option value="ADVISOR">Advisor</option>
                        <option value="STAFF">Staff</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                </label>

                <label className="block">
                    <span className="mb-2 block font-medium">
                        สถานะ
                    </span>

                    <select
                        value={form.status}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                status: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="INACTIVE">INACTIVE</option>
                    </select>
                </label>

                <label className="block">
                    <span className="mb-2 block font-medium">
                        อาจารย์ที่ปรึกษา
                    </span>

                    <select
                        value={form.advisorId}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                advisorId: e.target.value,
                            })
                        }
                        className="w-full rounded-xl border p-3"
                    >

                        <option value="">
                            -- ไม่มี --
                        </option>

                        {advisors.map((advisor) => (

                            <option
                                key={advisor.id}
                                value={advisor.id}
                            >
                                {advisor.fullname}
                            </option>

                        ))}

                    </select>

                </label>

                <input
                    type="password"
                    className="w-full rounded-xl border p-3"
                    value={form.password}
                    onChange={(e) =>
                        setForm({
                            ...form,
                            password: e.target.value,
                        })
                    }
                    placeholder="รหัสผ่านใหม่ (เว้นว่างหากไม่เปลี่ยน)"
                />

                <button
                    className="rounded-xl bg-green-600 px-6 py-3 text-white"
                >
                    บันทึก
                </button>

            </form>

        </main>
    );
}