"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import {
    useStaffStudents,
} from "@/hooks/useStaffStudents";

export default function StaffStudentsPage() {

    const {
        students,
        loading,
    } = useStaffStudents();

    const [
        keyword,
        setKeyword,
    ] = useState("");

    const [
        major,
        setMajor,
    ] = useState("");

    const [
        year,
        setYear,
    ] = useState("");

    const filtered =
        useMemo(() => {

            return students.filter(
                (student: any) => {

                    const matchKeyword =
                        student.fullname
                            .toLowerCase()
                            .includes(
                                keyword.toLowerCase()
                            )

                        ||

                        student.studentId
                            .toLowerCase()
                            .includes(
                                keyword.toLowerCase()
                            );

                    const matchMajor =
                        major === ""

                        ||

                        student.major.name === major;

                    const matchYear =
                        year === ""

                        ||

                        String(student.year) === year;

                    return (
                        matchKeyword &&
                        matchMajor &&
                        matchYear
                    );

                }

            );

        }, [
            students,
            keyword,
            major,
            year,
        ]);

    if (loading) {

        return (
            <main className="p-8">
                กำลังโหลด...
            </main>
        );

    }

    const majors = [
        ...new Set(
            students.map(
                (s: any) =>
                    s.major.name
            )
        ),
    ];

    return (

        <main className="space-y-8 p-8">

            <div>

                <h1 className="text-4xl font-bold text-green-700">

                    นักศึกษาทั้งหมด

                </h1>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <div className="mb-6 grid gap-4 md:grid-cols-3">

                    <div className="relative">

                        <Search
                            className="absolute left-4 top-4 text-gray-400"
                            size={18}
                        />

                        <input
                            value={keyword}
                            onChange={(e) =>
                                setKeyword(
                                    e.target.value
                                )
                            }
                            placeholder="ค้นหา"
                            className="w-full rounded-xl border py-3 pl-11"
                        />

                    </div>

                    <select
                        value={major}
                        onChange={(e) =>
                            setMajor(
                                e.target.value
                            )
                        }
                        className="rounded-xl border p-3"
                    >

                        <option value="">
                            ทุกสาขา
                        </option>

                        {majors.map(
                            (m) => (

                                <option
                                    key={m}
                                    value={m}
                                >

                                    {m}

                                </option>

                            )
                        )}

                    </select>

                    <select
                        value={year}
                        onChange={(e) =>
                            setYear(
                                e.target.value
                            )
                        }
                        className="rounded-xl border p-3"
                    >

                        <option value="">
                            ทุกชั้นปี
                        </option>

                        {[1,2,3,4].map(
                            (y) => (

                                <option
                                    key={y}
                                    value={y}
                                >

                                    ปี {y}

                                </option>

                            )
                        )}

                    </select>

                </div>
                                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="p-4 text-left">

                                    รหัสนักศึกษา

                                </th>

                                <th>

                                    ชื่อ

                                </th>

                                <th>

                                    สาขา

                                </th>

                                <th>

                                    ชั้นปี

                                </th>

                                <th>

                                    อาจารย์ที่ปรึกษา

                                </th>

                                <th>

                                    คะแนนล่าสุด

                                </th>

                                <th>

                                    ระดับ

                                </th>

                                <th>

                                    BPM

                                </th>

                                <th>

                                    SpO₂

                                </th>

                                <th>

                                    รายละเอียด

                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {filtered.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={10}
                                        className="p-8 text-center text-gray-500"
                                    >

                                        ไม่พบข้อมูลนักศึกษา

                                    </td>

                                </tr>

                            ) : (

                                filtered.map(
                                    (
                                        student: any
                                    ) => {

                                        const result =
                                            student.results?.[0];

                                        return (

                                            <tr
                                                key={
                                                    student.id
                                                }
                                                className="border-b hover:bg-gray-50"
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

                                                <td className="text-center">

                                                    ปี {student.year}

                                                </td>

                                                <td>

                                                    {student.advisor
                                                        ?.fullname ??
                                                        "-"}

                                                </td>

                                                <td className="text-center font-bold">

                                                    {result?.stressScore ??
                                                        "-"}

                                                </td>

                                                <td className="text-center">

                                                    {result
                                                        ?.stressLevel ===
                                                    "LOW" ? (

                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                                            ต่ำ

                                                        </span>

                                                    ) : result
                                                          ?.stressLevel ===
                                                      "MEDIUM" ? (

                                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                                                            ปานกลาง

                                                        </span>

                                                    ) : result
                                                          ?.stressLevel ===
                                                      "HIGH" ? (

                                                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                                                            สูง

                                                        </span>

                                                    ) : (

                                                        "-"

                                                    )}

                                                </td>

                                                <td className="text-center">

                                                    {result
                                                        ?.pulse
                                                        ?.bpm ??
                                                        "-"}

                                                </td>

                                                <td className="text-center">

                                                    {result
                                                        ?.pulse
                                                        ?.spo2 ??
                                                        "-"}

                                                </td>

                                                <td className="text-center">

                                                    <button

                                                        className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"

                                                    >

                                                        ดูรายละเอียด

                                                    </button>

                                                </td>

                                            </tr>

                                        );

                                    }

                                )

                            )}

                        </tbody>
                    </table>
                </div>
                <div className="mt-6 text-right text-sm text-gray-500">
                    ทั้งหมด {filtered.length} รายการ
                </div>
            </div>
        </main>
    );
}