import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import type { Report } from "@/types/report";

// โหลดฟอนต์เริ่มต้น
(pdfMake as any).vfs = pdfFonts.vfs;

export function exportReportsToPDF(
    reports: Report[]
) {

    const body = [

        [
            "รหัส",
            "ชื่อ",
            "สาขา",
            "คะแนน",
            "ระดับ",
            "วันที่",
        ],

        ...reports.map(report => ([
            report.user.studentId,
            report.user.fullname,
            report.user.major.name,
            report.stressScore,
            report.stressLevel,
            new Date(
                report.createdAt
            ).toLocaleDateString("th-TH"),
        ])),

    ];

    const docDefinition = {

        content: [

            {
                text: "รายงานผลการประเมินความเครียด",
                style: "header",
            },

            {
                table: {

                    headerRows: 1,

                    widths: [
                        "*",
                        "*",
                        "*",
                        "*",
                        "*",
                        "*",
                    ],

                    body,

                },
            },

        ],

        styles: {

            header: {

                fontSize: 18,

                bold: true,

                margin: [0, 0, 0, 20],

            },

        },

    };

    pdfMake.createPdf(docDefinition).download(
        "Stress_Report.pdf"
    );

}