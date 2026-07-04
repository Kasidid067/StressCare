"use client";

import { exportReportsToExcel } from "@/utils/exportExcel";

import { exportReportsToPDF } from "@/utils/exportPdf";

import type {
    Report,
} from "@/types/report";

interface Props {

    reports: Report[];

}

export default function ExportButtons({

    reports,

}: Props) {

    return (

        <div className="flex gap-3">

            <button

                onClick={() =>
                    exportReportsToExcel(
                        reports
                    )
                }

                className="rounded-xl bg-green-600 px-5 py-3 text-white"

            >

                📗 Export Excel

            </button>

            <button

                onClick={() =>
                    exportReportsToPDF(
                        reports
                    )
                }
                className="rounded-xl bg-red-600 px-5 py-3 text-white"
            >
                📄 Export PDF
            </button>
        </div>

    );

}