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

                    <h1 className="text-4xl font-bold text-[var(--accent-strong)]">

                        รายงานทั้งหมด

                    </h1>

                    <p className="mt-2 text-[var(--content-muted)]">

                        รายงานภาพรวมของนักศึกษาทั้งมหาวิทยาลัย

                    </p>

                </div>

                <div className="flex gap-3">

                    <button

                        className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white transition hover:opacity-90"

                    >

                        <FileSpreadsheet size={18} />

                        Export Excel

                    </button>

                    <button

                        className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-5 py-3 font-semibold text-[var(--content-text)] transition hover:bg-[var(--surface-muted)]"

                    >

                        <FileText size={18} />

                        Export PDF

                    </button>

                </div>

            </div>

            <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow" style={{ boxShadow: "var(--shadow)" }}>

                <div className="mb-6 grid gap-4 md:grid-cols-3">

                    <div className="relative">

                        <Search
                            size={18}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)]"
                        />

                        <input

                            value={keyword}

                            onChange={(e) =>

                                setKeyword(
                                    e.target.value
                                )

                            }

                            placeholder="ค้นหา"

                            className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] py-3 pl-11 text-[var(--content-text)] placeholder:text-[var(--content-muted)] focus:border-[var(--accent)] focus:outline-none"

                        />

                    </div>

                    <select

                        value={major}

                        onChange={(e) =>

                            setMajor(
                                e.target.value
                            )

                        }

                        className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"

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

                        className="rounded-xl border border-[var(--border)] bg-[var(--surface-muted)] p-3 text-[var(--content-text)] focus:border-[var(--accent)] focus:outline-none"

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

                        <thead className="bg-[var(--surface-muted)] text-[var(--content-muted)]">

                            <tr>

                                <th className="p-4 text-left">

                                    รหัส

                                </th>

                                <th className="p-4">

                                    ชื่อ

                                </th>

                                <th className="p-4">

                                    สาขา

                                </th>

                                <th className="p-4">

                                    ปี

                                </th>

                                <th className="p-4">
                                    คะแนน
                                </th>
                                <th className="p-4">
                                    ระดับ
                                </th>
                                <th className="p-4">
                                    BPM
                                </th>
                                <th className="p-4">
                                    SpO₂
                                </th>
                                <th className="p-4">
                                    อาจารย์
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan={9}
                                        className="p-8 text-center text-[var(--content-muted)]"
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
                                                className="border-b border-[var(--border)] hover:bg-[var(--surface-muted)]"
                                            >

                                                <td className="p-4">

                                                    {student.studentId}

                                                </td>

                                                <td className="p-4">

                                                    {student.fullname}

                                                </td>

                                                <td className="p-4">

                                                    {student.major.name}

                                                </td>

                                                <td className="p-4 text-center">

                                                    ปี {student.year}

                                                </td>

                                                <td className="p-4 text-center font-bold">

                                                    {result?.stressScore ?? "-"}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {result?.stressLevel ===
                                                        "LOW" ? (

                                                        <span className="status-low rounded-full px-3 py-1 text-sm font-semibold">

                                                            ต่ำ

                                                        </span>

                                                    ) : result?.stressLevel ===
                                                        "MEDIUM" ? (

                                                        <span className="status-medium rounded-full px-3 py-1 text-sm font-semibold">

                                                            ปานกลาง

                                                        </span>

                                                    ) : result?.stressLevel ===
                                                        "HIGH" ? (

                                                        <span className="status-high rounded-full px-3 py-1 text-sm font-semibold">

                                                            สูง

                                                        </span>

                                                    ) : (

                                                        "-"

                                                    )}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {result?.pulse?.bpm ?? "-"}

                                                </td>

                                                <td className="p-4 text-center">

                                                    {result?.pulse?.spo2 ?? "-"}

                                                </td>

                                                <td className="p-4">

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

                    <p className="text-sm text-[var(--content-muted)]">

                        ทั้งหมด {filtered.length} รายการ

                    </p>

                    <div className="flex gap-3">

                        <button
                            className="rounded-lg border border-[var(--border)] px-4 py-2 text-[var(--content-text)] transition hover:bg-[var(--surface-muted)]"
                        >

                            Export Excel

                        </button>

                        <button
                            className="rounded-lg border border-[var(--border)] px-4 py-2 text-[var(--content-text)] transition hover:bg-[var(--surface-muted)]"
                        >

                            Export PDF

                        </button>

                    </div>

                </div>

            </div>

        </main>

    );

}