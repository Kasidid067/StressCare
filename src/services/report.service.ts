import type { ReportFilter } from "@/types/reportFilter";

export async function getReports(
    filter?: ReportFilter
) {

    const params = new URLSearchParams();

    if (filter?.majorId) {
        params.append(
            "majorId",
            String(filter.majorId)
        );
    }

    if (filter?.stressLevel) {
        params.append(
            "stressLevel",
            filter.stressLevel
        );
    }

    if (filter?.startDate) {
        params.append(
            "startDate",
            filter.startDate
        );
    }

    if (filter?.endDate) {
        params.append(
            "endDate",
            filter.endDate
        );
    }

    if (filter?.search) {
        params.append(
            "search",
            filter.search
        );
    }

    const res = await fetch(
        `/api/admin/reports?${params.toString()}`
    );

    if (!res.ok) {
        throw new Error("โหลดข้อมูลไม่สำเร็จ");
    }

    return res.json();
}