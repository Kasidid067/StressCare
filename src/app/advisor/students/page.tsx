"use client";

import { useMemo, useState } from "react";

import { Search } from "lucide-react";

import {
    useAdvisorStudents,
} from "@/hooks/useAdvisorStudents";
import Link from "next/link";

export default function AdvisorStudentsPage() {

    const {

        students,

        loading,

    } = useAdvisorStudents();

    const [

        keyword,

        setKeyword,

    ] = useState("");

    const filtered =
        useMemo(() => {

            const key =
                keyword.toLowerCase();

            return students.filter(

                student =>

                    student.fullname
                        .toLowerCase()
                        .includes(key)

                    ||

                    student.studentId
                        .toLowerCase()
                        .includes(key)

            );

        }, [

            students,

            keyword,

        ]);

    if (loading) {

        return (

            <main className="p-8">

                กำลังโหลด...

            </main>

        );

    }

    return (

        <main className="space-y-8 p-8">

            <div>

                <h1 className="text-4xl font-bold text-green-700">

                    นักศึกษาในความดูแล

                </h1>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <div className="relative mb-6 max-w-md">

                    <Search
                        size={18}
                        className="absolute left-4 top-4"
                    />

                    <input

                        value={keyword}

                        onChange={e =>
                            setKeyword(
                                e.target.value
                            )
                        }

                        className="w-full rounded-xl border py-3 pl-11"

                        placeholder="ค้นหา"

                    />

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-4 text-left">

                                รหัส

                            </th>

                            <th>

                                ชื่อ

                            </th>

                            <th>

                                สาขา

                            </th>

                            <th>

                                คะแนน

                            </th>

                            <th>

                                ระดับ

                            </th>

                            <th>

                                BPM

                            </th>

                            <th>

                                ดู

                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filtered.map(student => (

                                <tr
                                    key={student.id}
                                    className="border-b"
                                >

                                    <td className="p-4">

                                        {student.studentId}

                                    </td>

                                    <td>

                                        {student.fullname}

                                    </td>

                                    <td>

                                        {student.major.name}

                                    </td>

                                    <td>

                                        {

                                            student.results[0]
                                                ?.stressScore ?? "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            student.results[0]
                                                ?.stressLevel ?? "-"

                                        }

                                    </td>

                                    <td>

                                        {

                                            student.results[0]
                                                ?.pulse?.bpm ?? "-"

                                        }

                                    </td>

                                    <td>

                                        <Link
                                            href={`/advisor/students/${student.id}`}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-white"
                                        >
                                            ดูรายละเอียด
                                        </Link>
                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </main>

    );

}