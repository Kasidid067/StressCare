"use client";

"use client";

import { useState } from "react";
import { toast } from "sonner";

import { useMajor } from "@/hooks/useMajor";
import {
    createMajor,
    updateMajor,
    deleteMajor,
} from "@/services/major.service";

export default function MajorPage() {
    const { majors, loading } = useMajor();
    const [open, setOpen] = useState(false);

    const [editingId, setEditingId] = useState<number | null>(null);

    const [name, setName] = useState("");

    async function handleSave() {
        try {
            if (editingId) {
                await updateMajor(editingId, {
                    name,
                });

                toast.success("แก้ไขสาขาสำเร็จ");
            } else {
                await createMajor({
                    name,
                });

                toast.success("เพิ่มสาขาสำเร็จ");
            }

            setOpen(false);

            window.location.reload();

        } catch {

            toast.error("เกิดข้อผิดพลาด");

        }
    }

    async function handleDelete(id: number) {

        const confirmDelete = window.confirm(
            "ต้องการลบสาขานี้ใช่หรือไม่"
        );

        if (!confirmDelete) return;

        await deleteMajor(id);

        toast.success("ลบสาขาสำเร็จ");

        window.location.reload();
    }

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    return (
        <main className="p-8">

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold text-green-700">
                    จัดการสาขา
                </h1>

                <button
                    onClick={() => {

                        setEditingId(null);

                        setName("");

                        setOpen(true);

                    }}
                    className="rounded-xl bg-green-600 px-5 py-3 text-white"
                >
                    + เพิ่มสาขา
                </button>

            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow" style={{ boxShadow: "var(--shadow)" }}>

                <table className="w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="p-4">
                                ID
                            </th>

                            <th>
                                ชื่อสาขา
                            </th>

                            <th>
                                จัดการ
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {majors.map((major) => (

                            <tr
                                key={major.id}
                                className="border-b"
                            >

                                <td className="p-4">
                                    {major.id}
                                </td>

                                <td>
                                    {major.name}
                                </td>

                                <td>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => {

                                                setEditingId(major.id);

                                                setName(major.name);

                                                setOpen(true);

                                            }}
                                            className="text-blue-600"
                                        >
                                            ✏️
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(major.id)
                                            }
                                            className="text-red-600"
                                        >
                                            🗑️
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>
            {open && (

                <div className="fixed inset-0 flex items-center justify-center bg-black/40">

                    <div className="w-96 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl" style={{ boxShadow: "var(--shadow)" }}>

                        <h2 className="mb-4 text-xl font-bold">

                            {editingId
                                ? "แก้ไขสาขา"
                                : "เพิ่มสาขา"}

                        </h2>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            className="mb-5 w-full rounded-xl border p-3"
                            placeholder="ชื่อสาขา"
                        />

                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() =>
                                    setOpen(false)
                                }
                                className="rounded-xl border px-5 py-2"
                            >
                                ยกเลิก
                            </button>

                            <button
                                onClick={handleSave}
                                className="rounded-xl bg-green-600 px-5 py-2 text-white"
                            >
                                บันทึก
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </main>
    );
}