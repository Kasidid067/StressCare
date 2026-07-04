"use client";

import { useMemo, useState } from "react";
import { Search, FileSpreadsheet, FileText } from "lucide-react";
import { useStaffReports } from "@/hooks/useStaffReports";

export default function StaffReportsPage() {

    const {
        reports,
        loading,
    } = useStaffReports();

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

            return reports.filter(
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

            reports,

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

            reports.map(
                (item: any) =>
                    item.major.name
            )

        ),

    ];

    return (

        <main className="space-y-8 p-8">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-bold text-green-700">

                        รายงานทั้งหมด

                    </h1>

                    <p className="mt-2 text-gray-500">

                        รายงานภาพรวมของนักศึกษาทั้งมหาวิทยาลัย

                    </p>

                </div>

                <div className="flex gap-3">

                    <button

                        className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white"

                    >

                        <FileSpreadsheet size={18} />

                        Export Excel

                    </button>

                    <button

                        className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white"

                    >

                        <FileText size={18} />

                        Export PDF

                    </button>

                </div>

            </div>

            <div className="rounded-2xl bg-white p-6 shadow">

                <div className="mb-6 grid gap-4 md:grid-cols-3">

                    <div className="relative">

                        <Search
                            size={18}
                            className="absolute left-4 top-4 text-gray-400"
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

                        {

                            majors.map(
                                (item) => (

                                    <option
                                        key={item}
                                        value={item}
                                    >

                                        {item}

                                    </option>

                                )
                            )

                        }

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

                        {

                            [1, 2, 3, 4].map(
                                (y) => (

                                    <option
                                        key={y}
                                        value={y}
                                    >

                                        ปี {y}

                                    </option>

                                )
                            )

                        }

                    </select>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-green-600 text-white">

                            <tr>

                                <th className="p-4">

                                    รหัส

                                </th>

                                <th>

                                    ชื่อ

                                </th>

                                <th>

                                    สาขา

                                </th>

                                <th>

                                    ปี

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
                                    SpO₂
                                </th>
                                <th>
                                    อาจารย์
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={9}
                                        className="p-8 text-center text-gray-500"
                                    >

                                        ไม่พบข้อมูล

                                    </td>

                                </tr>

                            ) : (

                                filtered.map(
                                    (student: any) => {

                                        const result =
                                            student.results?.[0];

                                        return (

                                            <tr
                                                key={student.id}
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

                                                <td className="text-center font-bold">

                                                    {result?.stressScore ?? "-"}

                                                </td>

                                                <td className="text-center">

                                                    {result?.stressLevel ===
                                                        "LOW" ? (

                                                        <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                                                            ต่ำ

                                                        </span>

                                                    ) : result?.stressLevel ===
                                                        "MEDIUM" ? (

                                                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                                                            ปานกลาง

                                                        </span>

                                                    ) : result?.stressLevel ===
                                                        "HIGH" ? (

                                                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                                                            สูง

                                                        </span>

                                                    ) : (

                                                        "-"

                                                    )}

                                                </td>

                                                <td className="text-center">

                                                    {result?.pulse?.bpm ?? "-"}

                                                </td>

                                                <td className="text-center">

                                                    {result?.pulse?.spo2 ?? "-"}

                                                </td>

                                                <td>

                                                    {student.advisor
                                                        ?.fullname ??
                                                        "-"}

                                                </td>

                                            </tr>

                                        );

                                    }

                                )

                            )}

                        </tbody>

                    </table>

                </div>

                <div className="mt-6 flex items-center justify-between">

                    <p className="text-sm text-gray-500">

                        ทั้งหมด {filtered.length} รายการ

                    </p>

                    <div className="flex gap-3">

                        <button
                            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                        >

                            Export Excel

                        </button>

                        <button
                            className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                        >

                            Export PDF

                        </button>

                    </div>

                </div>

            </div>

        </main>

    );

}