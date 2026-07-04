"use client";

import Link from "next/link";
import { toast } from "sonner";

import { useAdminUsers } from "@/hooks/useAdminUsers";
import { deleteUser } from "@/services/adminUserDetail.service";

export default function UsersPage() {
    const { users, loading } = useAdminUsers();

    async function handleDelete(id: number, fullname: string) {
        const confirmDelete = window.confirm(
            `ต้องการลบ ${fullname} ใช่หรือไม่`
        );

        if (!confirmDelete) return;

        try {
            await deleteUser(id);

            toast.success("ลบผู้ใช้งานสำเร็จ");

            window.location.reload();
        } catch {
            toast.error("ไม่สามารถลบผู้ใช้งานได้");
        }
    }

    if (loading) {
        return <div>กำลังโหลด...</div>;
    }

    return (
        <main className="p-8">

            <div className="mb-6 flex items-center justify-between">

                <h1 className="text-3xl font-bold text-green-700">
                    จัดการผู้ใช้งาน
                </h1>

                <Link
                    href="/admin/users/create"
                    className="rounded-xl bg-green-600 px-5 py-3 text-white"
                >
                    + เพิ่มผู้ใช้
                </Link>

            </div>

            <div className="overflow-hidden rounded-xl bg-white shadow">

                <table className="w-full">

                    <thead className="bg-green-600 text-white">

                        <tr>

                            <th className="p-3">
                                รหัส
                            </th>

                            <th>
                                ชื่อ
                            </th>

                            <th>
                                Role
                            </th>

                            <th>
                                สาขา
                            </th>

                            <th>
                                Advisor
                            </th>

                            <th>
                                Status
                            </th>

                            <th>
                                จัดการ
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map((user) => (

                            <tr
                                key={user.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {user.studentId}
                                </td>

                                <td>
                                    {user.fullname}
                                </td>

                                <td>
                                    {user.role}
                                </td>

                                <td>
                                    {user.major.name}
                                </td>

                                <td>
                                    {user.advisor?.fullname ?? "-"}
                                </td>

                                <td>
                                    {user.status}
                                </td>

                                <td>

                                    <div className="flex gap-3">

                                        <Link
                                            href={`/admin/users/${user.id}`}
                                            className="text-green-700 hover:underline"
                                        >
                                            แก้ไข
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    user.id,
                                                    user.fullname
                                                )
                                            }
                                            className="text-red-600 hover:underline"
                                        >
                                            ลบ
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </main>
    );
}